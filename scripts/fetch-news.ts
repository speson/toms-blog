import * as fs from "fs";
import * as path from "path";
import { fetchGeeknews, fetchAllAINews, formatRSSItem } from "../lib/rss";
import type { RSSItem } from "../lib/rss";
import {
  sendTelegramMessage,
  formatTelegramMessage,
  type TelegramNewsItem,
} from "../lib/telegram";

type SourceType = "all" | "geeknews" | "ai";

function getExistingSourceUrls(): Set<string> {
  const postsDir = path.join(process.cwd(), "content", "posts");
  const urls = new Set<string>();

  if (!fs.existsSync(postsDir)) return urls;

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const content = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const match = content.match(/^sourceUrl:\s*"(.+)"/m);
    if (match && match[1]) {
      urls.add(normalizeUrl(match[1]));
    }
  }

  return urls;
}

function normalizeUrl(url: string): string {
  return url
    .replace(/\/+$/, "")
    .replace(/^https?:\/\/(www\.)?/, "")
    .toLowerCase();
}

/** 결과를 .claude/news/YYYYMMDD_news.md 파일로 저장 */
function saveNewsFile(items: RSSItem[], dupCount: number): string {
  const newsDir = path.join(process.cwd(), ".claude", "news");
  fs.mkdirSync(newsDir, { recursive: true });

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const filePath = path.join(newsDir, `${today}_news.md`);

  const lines = [
    `# AI 뉴스 - ${new Date().toISOString().slice(0, 10)}`,
    "",
    `> 수집 ${items.length + dupCount}개, 중복 제거 ${dupCount}개, 최종 ${items.length}개`,
    "",
    "## 글 후보 (각도 제안)",
    "",
    "_(비어 있음 — `/fetch-news` 커맨드가 아래 원자료를 묶어 채웁니다. 선택 단위는 뉴스가 아니라 글: `.claude/content-model.md`)_",
    "",
    "---",
    "",
    "## 수집 항목 (원자료)",
    "",
    "원자료 목록이에요. 위 글 후보를 고르면 구성 항목이 자동으로 `[x]` 처리됩니다. 후보에 없는 항목으로 쓰고 싶으면 직접 `[x]` 표시하세요.",
    "",
    "---",
    "",
  ];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const date = new Date(item.date).toLocaleDateString("ko-KR");
    const preview =
      item.content.slice(0, 150) + (item.content.length > 150 ? "..." : "");

    lines.push(`- [ ] **${i + 1}. ${item.title}**`);
    lines.push(`  - Source: ${item.source}`);
    lines.push(`  - Date: ${date}`);
    lines.push(`  - URL: ${item.link}`);
    lines.push(`  - ${preview}`);
    lines.push("");
  }

  fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
  return filePath;
}

async function main() {
  const args = process.argv.slice(2);
  const sourceArg = args
    .find((arg) => arg.startsWith("--source="))
    ?.split("=")[1];
  const source: SourceType = (sourceArg as SourceType) || "all";
  const limitArg = args
    .find((arg) => arg.startsWith("--limit="))
    ?.split("=")[1];
  const limit = limitArg ? parseInt(limitArg, 10) : 10;
  const skipDedup = args.includes("--no-dedup");
  const shouldNotify = args.includes("--notify");
  const shouldSave = args.includes("--save");

  console.log("\n🔍 RSS 뉴스 수집 중...\n");
  console.log(`   소스: ${source === "all" ? "전체" : source}`);
  console.log(`   제한: ${limit}개씩\n`);

  const items: RSSItem[] = [];

  try {
    if (source === "all" || source === "geeknews") {
      console.log("📰 Geeknews 수집 중...");
      const geeknewsItems = await fetchGeeknews(limit);
      items.push(...geeknewsItems);
      console.log(`   ✓ ${geeknewsItems.length}개 수집 완료\n`);
    }

    if (source === "all" || source === "ai") {
      const aiItems = await fetchAllAINews(limit);
      items.push(...aiItems);
      console.log(`\n   ✓ AI 뉴스 총 ${aiItems.length}개 수집 완료`);
    }
  } catch (error) {
    console.error("❌ 수집 중 오류 발생:", error);
    process.exit(1);
  }

  items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let filtered = items;
  let dupCount = 0;

  if (!skipDedup) {
    const existingUrls = getExistingSourceUrls();
    console.log(
      `\n🔎 기존 포스트 ${existingUrls.size}개의 sourceUrl과 중복 체크 중...`
    );

    filtered = items.filter((item) => {
      const isDup = existingUrls.has(normalizeUrl(item.link));
      if (isDup) dupCount++;
      return !isDup;
    });

    if (dupCount > 0) {
      console.log(`   ✂️  ${dupCount}개 중복 제거됨 (이미 발행된 뉴스)`);
    } else {
      console.log(`   ✅ 중복 없음`);
    }
  }

  console.log(
    `\n📋 총 ${filtered.length}개 항목 (수집 ${items.length}개 - 중복 ${dupCount}개)\n`
  );
  console.log("=".repeat(70));

  filtered.forEach((item, index) => {
    console.log(formatRSSItem(item, index));
  });

  // --save: 결과를 마크다운 파일로 저장
  if (shouldSave) {
    const savedPath = saveNewsFile(filtered, dupCount);
    console.log(`\n💾 저장됨: ${savedPath}`);
  }

  // --notify: Telegram으로 결과 전송
  if (shouldNotify) {
    if (filtered.length === 0) {
      console.log("\n📭 새 뉴스가 없어 Telegram 알림을 건너뜁니다.");
    } else {
      const telegramItems: TelegramNewsItem[] = filtered.map((item, i) => ({
        index: i + 1,
        title: item.title,
        link: item.link,
        source: item.source,
        date: new Date(item.date).toLocaleDateString("ko-KR"),
      }));

      const today = new Date().toISOString().slice(0, 10);
      const message = formatTelegramMessage(telegramItems, {
        total: items.length,
        duplicates: dupCount,
        date: today,
      });

      await sendTelegramMessage(message);
    }
  }

  if (!shouldNotify) {
    console.log("\n💡 사용 가능한 옵션:");
    console.log("   --source=all      전체 (기본값)");
    console.log("   --source=geeknews Geeknews만");
    console.log("   --source=ai       AI 블로그 + GitHub만");
    console.log("   --limit=N         소스당 N개씩 (기본 10)");
    console.log("   --no-dedup        중복 제거 비활성화");
    console.log("   --notify          Telegram으로 결과 전송");
    console.log("   --save            .claude/news/ 에 파일 저장\n");
    console.log(
      "💡 다음: /fetch-news 커맨드가 위 원자료를 글 후보(각도)로 묶어 제안합니다. 항목 1건을 번역·요약하는 글은 만들지 않아요.\n"
    );
  }
}

/**
 * stdout를 비운 뒤 종료한다. Node 19+의 keep-alive http 에이전트가 유휴 소켓을
 * 풀에 남겨 이벤트 루프를 붙잡기 때문에, 작업이 끝나면 명시적으로 종료해야 한다.
 * (2026-08-31: openai.com 소켓 하나가 남아 프로세스가 55일간 살아 있던 사례)
 */
function exitAfterFlush(code: number): void {
  process.stdout.write("", () => process.exit(code));
}

main()
  .then(() => exitAfterFlush(0))
  .catch((error) => {
    console.error("❌ 실행 중 오류:", error);
    exitAfterFlush(1);
  });
