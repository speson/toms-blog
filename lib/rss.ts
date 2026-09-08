import Parser from "rss-parser";
import * as cheerio from "cheerio";

/** 모든 네트워크 요청의 상한. 응답이 없으면 실패 처리하고 다음 소스로 넘어간다. */
export const FETCH_TIMEOUT_MS = 20_000;

const parser = new Parser({ timeout: FETCH_TIMEOUT_MS });

export type RSSSource =
  | "geeknews"
  | "github"
  | "openai"
  | "anthropic"
  | "google"
  | "xai"
  | "cursor"
  | "deepseek"
  | "kimi"
  | "glm";

export interface RSSItem {
  id: string;
  title: string;
  link: string;
  content: string;
  date: string;
  source: RSSSource;
}

/** GeekNews / 제목·본문에서 Grok·Cursor·xAI 관련 신호를 잡기 위한 키워드 */
export const GROK_CURSOR_KEYWORDS = [
  "grok",
  "xai",
  "x.ai",
  "x-ai",
  "cursor",
] as const;

const GROK_CURSOR_RE = new RegExp(
  `\\b(${GROK_CURSOR_KEYWORDS.map((k) => k.replace(".", "\\.")).join("|")})\\b`,
  "i"
);

export function matchesGrokOrCursor(text: string): boolean {
  return GROK_CURSOR_RE.test(text);
}

function itemMentionsGrokOrCursor(item: {
  title?: string;
  content?: string;
  link?: string;
}): boolean {
  return matchesGrokOrCursor(
    `${item.title || ""} ${item.content || ""} ${item.link || ""}`
  );
}

/**
 * GeekNews 피드에서 Grok/Cursor 관련 항목을 우선 포함해 반환한다.
 * 최신순 기본 수집에 더해, 더 넓은 윈도우를 훑어 키워드 매칭 항목을 빠뜨리지 않는다.
 */
export async function fetchGeeknews(limit = 10): Promise<RSSItem[]> {
  const feed = await parser.parseURL("https://news.hada.io/rss/news");
  const raw = feed.items || [];
  const scanLimit = Math.max(limit * 5, 40);
  const window = raw.slice(0, scanLimit);

  const mapped: RSSItem[] = window.map((item) => ({
    id: item.guid || item.link || "",
    title: item.title || "",
    link: item.link || "",
    content: item.contentSnippet || item.content || "",
    date: item.isoDate || item.pubDate || new Date().toISOString(),
    source: "geeknews" as const,
  }));

  const highlighted = mapped.filter(itemMentionsGrokOrCursor);
  const rest = mapped.filter((item) => !itemMentionsGrokOrCursor(item));

  // 키워드 히트를 앞에 두고, 나머지는 최신순으로 limit까지 채운다.
  const merged: RSSItem[] = [];
  const seen = new Set<string>();
  for (const item of [...highlighted, ...rest]) {
    const key = item.id || item.link;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
    if (merged.length >= limit) break;
  }

  if (highlighted.length > 0) {
    console.log(
      `   ✓ GeekNews Grok/Cursor 관련 ${highlighted.length}개 우선 포함`
    );
  }

  return merged;
}

export async function fetchGitHubReleases(
  repo: string,
  limit = 5
): Promise<RSSItem[]> {
  const url = `https://github.com/${repo}/releases.atom`;
  const feed = await parser.parseURL(url);

  return (feed.items || []).slice(0, limit).map((item) => ({
    id: item.guid || item.link || "",
    title: `[${repo}] ${item.title || ""}`,
    link: item.link || "",
    content: item.contentSnippet || item.content || "",
    date: item.isoDate || item.pubDate || new Date().toISOString(),
    source: "github" as const,
  }));
}

export function formatRSSItem(item: RSSItem, index: number): string {
  const date = new Date(item.date).toLocaleDateString("ko-KR");
  const contentPreview =
    item.content.slice(0, 150) + (item.content.length > 150 ? "..." : "");

  return `
┌─────────────────────────────────────────────────────────────────
│ [${index + 1}] ${item.title}
│ Source: ${item.source}
│ Date: ${date}
│ URL: ${item.link}
│ 
│ ${contentPreview}
└─────────────────────────────────────────────────────────────────`;
}

// AI Service Blog / changelog RSS Feeds
const AI_BLOG_FEEDS: Record<string, { url: string; source: RSSSource }> = {
  openai: {
    url: "https://openai.com/blog/rss.xml",
    source: "openai",
  },
  google: {
    url: "https://blog.google/technology/ai/rss/",
    source: "google",
  },
  // Cursor official changelog (blog atom.xml is often stale)
  cursor: {
    url: "https://cursor.com/changelog/rss.xml",
    source: "cursor",
  },
  // xAI / Grok release notes aggregate (official HTML has no stable RSS)
  xai: {
    url: "https://releases.sh/xai.atom",
    source: "xai",
  },
};

export async function fetchAIBlog(
  blogKey: keyof typeof AI_BLOG_FEEDS,
  limit = 5
): Promise<RSSItem[]> {
  const config = AI_BLOG_FEEDS[blogKey];
  if (!config) return [];

  try {
    const feed = await parser.parseURL(config.url);
    return (feed.items || []).slice(0, limit).map((item) => ({
      id: item.guid || item.link || "",
      title: item.title || "",
      link: item.link || "",
      content: item.contentSnippet || item.content || "",
      date: item.isoDate || item.pubDate || new Date().toISOString(),
      source: config.source,
    }));
  } catch (error) {
    console.error(`Failed to fetch ${blogKey} blog:`, error);
    return [];
  }
}

// Chinese open-model labs — no blog RSS, so new Hugging Face model repos
// serve as the release signal (repo creation = model release).
export const HF_MODEL_ORGS: Array<{
  org: string;
  source: RSSSource;
}> = [
  { org: "deepseek-ai", source: "deepseek" },
  { org: "moonshotai", source: "kimi" },
  { org: "zai-org", source: "glm" },
];

export async function fetchHuggingFaceModels(
  org: string,
  source: RSSSource,
  limit = 5
): Promise<RSSItem[]> {
  try {
    const res = await fetch(
      `https://huggingface.co/api/models?author=${org}&sort=createdAt&direction=-1&limit=${limit}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const models = (await res.json()) as Array<{
      id: string;
      createdAt?: string;
      pipeline_tag?: string;
      likes?: number;
      downloads?: number;
    }>;

    return models.map((m) => ({
      id: `hf-${m.id}`,
      title: `[HF] ${m.id}`,
      link: `https://huggingface.co/${m.id}`,
      content: [
        m.pipeline_tag ? `종류: ${m.pipeline_tag}` : null,
        typeof m.likes === "number" ? `likes ${m.likes}` : null,
        typeof m.downloads === "number" ? `downloads ${m.downloads}` : null,
      ]
        .filter(Boolean)
        .join(" · "),
      date: m.createdAt || new Date().toISOString(),
      source,
    }));
  } catch (error) {
    console.error(`Failed to fetch HF models for ${org}:`, error);
    return [];
  }
}

// AI Coding Tool GitHub Repos
export const AI_GITHUB_REPOS = [
  "sst/opencode",
  "code-yeongyu/oh-my-opencode",
  "anthropics/claude-code",
  "openai/openai-node",
  "anthropics/anthropic-sdk-python",
  "anthropics/anthropic-sdk-typescript",
  "xai-org/xai-sdk-python",
  "xai-org/grok-prompts",
] as const;

export async function fetchAllAINews(limit = 5): Promise<RSSItem[]> {
  console.log("🤖 AI 블로그 + Anthropic + Cursor/Grok 수집 중...");

  // 블로그 RSS + Anthropic 스크래핑 병렬 실행
  const blogKeys = Object.keys(AI_BLOG_FEEDS) as Array<
    keyof typeof AI_BLOG_FEEDS
  >;
  const blogPromises = blogKeys.map((key) =>
    fetchAIBlog(key, limit).then((items) => ({ name: key, items }))
  );
  const anthropicPromise = fetchAnthropicNews(limit).then((items) => ({
    name: "anthropic" as const,
    items,
  }));
  const hfPromises = HF_MODEL_ORGS.map(({ org, source }) =>
    fetchHuggingFaceModels(org, source, limit).then((items) => ({
      name: `${source} (HF ${org})`,
      items,
    }))
  );

  const blogResults = await Promise.allSettled([
    ...blogPromises,
    anthropicPromise,
    ...hfPromises,
  ]);

  const items: RSSItem[] = [];
  for (const result of blogResults) {
    if (result.status === "fulfilled") {
      items.push(...result.value.items);
      console.log(`   ✓ ${result.value.name}: ${result.value.items.length}개`);
    } else {
      console.log(`   ⚠ 수집 실패: ${result.reason}`);
    }
  }

  // GitHub Releases 병렬 실행
  console.log("🐙 AI 도구 GitHub Releases 수집 중...");
  const ghResults = await Promise.allSettled(
    AI_GITHUB_REPOS.map((repo) =>
      fetchGitHubReleases(repo, 3).then((releases) => ({
        name: repo,
        items: releases,
      }))
    )
  );

  for (const result of ghResults) {
    if (result.status === "fulfilled") {
      items.push(...result.value.items);
      console.log(`   ✓ ${result.value.name}: ${result.value.items.length}개`);
    } else {
      console.log(`   ⚠ 수집 실패: ${result.reason}`);
    }
  }

  // Sort by date (newest first)
  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function fetchAnthropicNews(limit = 10): Promise<RSSItem[]> {
  try {
    const response = await fetch("https://www.anthropic.com/news", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const items: RSSItem[] = [];

    $("ul li a[href^='/news/']").each((_, el) => {
      if (items.length >= limit) return false;

      const $el = $(el);
      const href = $el.attr("href") || "";
      const title = $el.find("span").last().text().trim();
      const dateText = $el.find("time").text().trim();
      const category = $el.find("span").first().text().trim();

      if (title && href) {
        const date = dateText
          ? new Date(dateText).toISOString()
          : new Date().toISOString();
        items.push({
          id: `anthropic-${href}`,
          title: title,
          link: `https://www.anthropic.com${href}`,
          content: category ? `[${category}] ` : "",
          date,
          source: "anthropic",
        });
      }
    });

    return items;
  } catch (error) {
    console.error("Failed to fetch Anthropic news:", error);
    return [];
  }
}
