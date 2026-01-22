import Parser from "rss-parser";

const parser = new Parser();

export interface RSSItem {
  id: string;
  title: string;
  link: string;
  content: string;
  date: string;
  source: "geeknews" | "github";
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
