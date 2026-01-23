import Parser from "rss-parser";
import * as cheerio from "cheerio";

const parser = new Parser();

export type RSSSource =
  | "geeknews"
  | "github"
  | "openai"
  | "anthropic"
  | "google"
  | "xai";

export interface RSSItem {
  id: string;
  title: string;
  link: string;
  content: string;
  date: string;
  source: RSSSource;
}

export async function fetchGeeknews(limit = 10): Promise<RSSItem[]> {
  const feed = await parser.parseURL("https://news.hada.io/rss/news");

  return (feed.items || []).slice(0, limit).map((item) => ({
    id: item.guid || item.link || "",
    title: item.title || "",
    link: item.link || "",
    content: item.contentSnippet || item.content || "",
    date: item.isoDate || item.pubDate || new Date().toISOString(),
    source: "geeknews" as const,
  }));
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

// AI Service Blog RSS Feeds
const AI_BLOG_FEEDS: Record<string, { url: string; source: RSSSource }> = {
  openai: {
    url: "https://openai.com/blog/rss.xml",
    source: "openai",
  },
  google: {
    url: "https://blog.google/technology/ai/rss/",
    source: "google",
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
  const items: RSSItem[] = [];

  // Fetch from AI blogs (RSS)
  console.log("🤖 AI 블로그 수집 중...");
  for (const blogKey of Object.keys(AI_BLOG_FEEDS) as Array<
    keyof typeof AI_BLOG_FEEDS
  >) {
    try {
      const blogItems = await fetchAIBlog(blogKey, limit);
      items.push(...blogItems);
      console.log(`   ✓ ${blogKey}: ${blogItems.length}개`);
    } catch {
      console.log(`   ⚠ ${blogKey}: 수집 실패`);
    }
  }

  // Fetch from Anthropic (web scraping)
  try {
    const anthropicItems = await fetchAnthropicNews(limit);
    items.push(...anthropicItems);
    console.log(`   ✓ anthropic: ${anthropicItems.length}개`);
  } catch {
    console.log(`   ⚠ anthropic: 수집 실패`);
  }

  // Fetch from GitHub releases
  console.log("🐙 AI 도구 GitHub Releases 수집 중...");
  for (const repo of AI_GITHUB_REPOS) {
    try {
      const releases = await fetchGitHubReleases(repo, 3);
      items.push(...releases);
      console.log(`   ✓ ${repo}: ${releases.length}개`);
    } catch {
      console.log(`   ⚠ ${repo}: 수집 실패`);
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
        const date = dateText ? new Date(dateText).toISOString() : new Date().toISOString();
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
