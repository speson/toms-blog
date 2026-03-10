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

export type Category = "by-tom" | "ai-news";
export type Subcategory = "news" | "releases" | "column";

export const CATEGORY_LABELS: Record<Category, string> = {
  "by-tom": "by Tom",
  "ai-news": "AI 소식",
};

export const SUBCATEGORY_LABELS: Record<Subcategory, string> = {
  news: "뉴스",
  releases: "릴리스",
  column: "칼럼",
};

export function getPostsByCategory(category: Category): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getPostsBySubcategory(subcategory: Subcategory): Post[] {
  return getAllPosts().filter((post) => post.subcategory === subcategory);
}

export function getPostsByCategoryAndSub(category: Category, subcategory?: Subcategory): Post[] {
  return getAllPosts().filter((post) => {
    if (post.category !== category) return false;
    if (subcategory && post.subcategory !== subcategory) return false;
    return true;
  });
}

export function getAllCategories(): Category[] {
  return ["by-tom", "ai-news"];
}

export function getSubcategories(): Subcategory[] {
  return ["news", "releases", "column"];
}

export function getCategoryCount(category: Category): number {
  return getPostsByCategory(category).length;
}

export function getSubcategoryCount(subcategory: Subcategory): number {
  return getPostsBySubcategory(subcategory).length;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
