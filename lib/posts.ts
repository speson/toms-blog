import { allPosts, type Post } from "contentlayer/generated";

export function getAllPosts(): Post[] {
  return allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug && !post.draft);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tags = allPosts.flatMap((post) => post.tags);
  return [...new Set(tags)].sort();
}

export type Category = "news" | "releases" | "analysis" | "guide";

export const CATEGORY_LABELS: Record<Category, string> = {
  news: "뉴스",
  releases: "릴리스",
  analysis: "분석",
  guide: "가이드",
};

export function getPostsByCategory(category: Category): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getAllCategories(): Category[] {
  const categories = allPosts
    .filter((post) => !post.draft)
    .map((post) => post.category as Category);
  return [...new Set(categories)];
}

export function getCategoryCount(category: Category): number {
  return getPostsByCategory(category).length;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
