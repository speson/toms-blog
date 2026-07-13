import { allPosts, type Post } from "contentlayer/generated";

export const POSTS_PER_PAGE = 20;

export function getArchivePageCount(): number {
  return Math.max(1, Math.ceil(getAllPosts().length / POSTS_PER_PAGE));
}

export function getArchivePagePosts(page: number): Post[] {
  const start = (page - 1) * POSTS_PER_PAGE;
  return getAllPosts().slice(start, start + POSTS_PER_PAGE);
}

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
  const tags = getAllPosts().flatMap((post) => post.tags);
  return [...new Set(tags)].sort();
}

export type Category = "by-tom" | "ai-news";
export type Subcategory =
  | "news"
  | "releases"
  | "column"
  | "tools"
  | "dev-tools"
  | "industry";

export const CATEGORY_LABELS: Record<Category, string> = {
  "by-tom": "by Tom",
  "ai-news": "AI 소식",
};

export const SUBCATEGORY_LABELS: Record<Subcategory, string> = {
  news: "뉴스",
  releases: "릴리스",
  column: "칼럼",
  tools: "도구",
  "dev-tools": "개발 도구",
  industry: "업계 동향",
};

export function getPostsByCategory(category: Category): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getPostsBySubcategory(subcategory: Subcategory): Post[] {
  return getAllPosts().filter(
    (post) => (post.subcategory as string | undefined) === subcategory
  );
}

export function getPostsByCategoryAndSub(
  category: Category,
  subcategory?: Subcategory
): Post[] {
  return getAllPosts().filter((post) => {
    if (post.category !== category) return false;
    if (
      subcategory &&
      (post.subcategory as string | undefined) !== subcategory
    ) {
      return false;
    }
    return true;
  });
}

export function getAllCategories(): Category[] {
  return ["by-tom", "ai-news"];
}

export function getSubcategories(): Subcategory[] {
  const subcategories = getAllPosts()
    .map((post) => post.subcategory as string | undefined)
    .filter((subcategory): subcategory is string => Boolean(subcategory))
    .filter(isSubcategory);

  return [...new Set(subcategories)];
}

export function getCategoryCount(category: Category): number {
  return getPostsByCategory(category).length;
}

export function getSubcategoryCount(subcategory: Subcategory): number {
  return getPostsBySubcategory(subcategory).length;
}

export function isCategory(value: string): value is Category {
  return value === "by-tom" || value === "ai-news";
}

export function isSubcategory(value: string): value is Subcategory {
  return [
    "news",
    "releases",
    "column",
    "tools",
    "dev-tools",
    "industry",
  ].includes(value);
}

export function getCategoryHref(category: Category): string {
  return `/categories/${category}`;
}

export function getSubcategoryHref(
  category: Category,
  subcategory: Subcategory
): string {
  return `${getCategoryHref(category)}/${subcategory}`;
}

export function getTagHref(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}`;
}

export function getTopTags(limit = 30): Array<{ tag: string; count: number }> {
  const counts = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ko"))
    .slice(0, limit);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) =>
        post.tags.includes(tag)
      ).length;
      const sameCategory = candidate.category === post.category ? 1 : 0;
      const sameSubcategory =
        candidate.subcategory &&
        post.subcategory &&
        candidate.subcategory === post.subcategory
          ? 1
          : 0;

      return {
        candidate,
        score: sharedTags * 3 + sameSubcategory * 2 + sameCategory,
      };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (
        new Date(b.candidate.date).getTime() -
        new Date(a.candidate.date).getTime()
      );
    })
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getTagPostCount(tag: string): number {
  return getPostsByTag(tag).length;
}

export function getLatestPostDateForTag(tag: string): Date {
  const posts = getPostsByTag(tag);
  return posts.length > 0 ? new Date(posts[0].date) : new Date("2026-01-01");
}

export function getLatestPostDateForCategory(category: Category): Date {
  const posts = getPostsByCategory(category);
  return posts.length > 0 ? new Date(posts[0].date) : new Date("2026-01-01");
}

export function getLatestPostDateForSubcategory(
  subcategory: Subcategory
): Date {
  const posts = getPostsBySubcategory(subcategory);
  return posts.length > 0 ? new Date(posts[0].date) : new Date("2026-01-01");
}
