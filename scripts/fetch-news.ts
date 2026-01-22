import { fetchGeeknews, fetchGitHubReleases, formatRSSItem } from "../lib/rss";
import type { RSSItem } from "../lib/rss";

const GITHUB_REPOS = [
  "vercel/next.js",
  "anthropics/anthropic-sdk-python",
  "openai/openai-node",
];

async function main() {
  const args = process.argv.slice(2);
  const source = args.find((arg) => arg.startsWith("--source="))?.split("=")[1];
  const limitArg = args.find((arg) => arg.startsWith("--limit="))?.split("=")[1];
  const limit = limitArg ? parseInt(limitArg, 10) : 10;

  console.log("\n🔍 RSS 뉴스 수집 중...\n");

  const items: RSSItem[] = [];

  try {
    if (!source || source === "geeknews") {
      console.log("📰 Geeknews 수집 중...");
      const geeknewsItems = await fetchGeeknews(limit);
      items.push(...geeknewsItems);
      console.log(`   ✓ ${geeknewsItems.length}개 수집 완료`);
    }

    if (!source || source === "github") {
      console.log("🐙 GitHub Releases 수집 중...");
      for (const repo of GITHUB_REPOS) {
        try {
          const releases = await fetchGitHubReleases(repo, 3);
          items.push(...releases);
          console.log(`   ✓ ${repo}: ${releases.length}개`);
        } catch {
          console.log(`   ⚠ ${repo}: 수집 실패`);
        }
      }
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

  console.log("\n💡 번역하고 싶은 항목이 있으면 알려주세요!");
  console.log('   예: "1번 번역해줘" 또는 "첫 번째 기사 번역해줘"\n');
}

main();
