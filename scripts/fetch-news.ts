import {
  fetchGeeknews,
  fetchAllAINews,
  formatRSSItem,
} from "../lib/rss";
import type { RSSItem } from "../lib/rss";

type SourceType = "all" | "geeknews" | "ai";

async function main() {
  const args = process.argv.slice(2);
  const sourceArg = args.find((arg) => arg.startsWith("--source="))?.split("=")[1];
  const source: SourceType = (sourceArg as SourceType) || "all";
  const limitArg = args.find((arg) => arg.startsWith("--limit="))?.split("=")[1];
  const limit = limitArg ? parseInt(limitArg, 10) : 10;

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

  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  console.log(`\n📋 총 ${items.length}개 항목 수집됨\n`);
  console.log("=".repeat(70));

  items.forEach((item, index) => {
    console.log(formatRSSItem(item, index));
  });

  console.log("\n💡 사용 가능한 옵션:");
  console.log("   --source=all      전체 (기본값)");
  console.log("   --source=geeknews Geeknews만");
  console.log("   --source=ai       AI 블로그 + GitHub만");
  console.log("   --limit=N         소스당 N개씩 (기본 10)\n");
  console.log('💡 번역할 항목을 선택하세요: "1, 3, 5번 선택"\n');
}

main();
