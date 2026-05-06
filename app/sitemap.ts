import { MetadataRoute } from "next";
import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  getCategoryHref,
  getLatestPostDateForCategory,
  getLatestPostDateForSubcategory,
  getLatestPostDateForTag,
  getSubcategories,
  getSubcategoryHref,
  getTagPostCount,
} from "@/lib/posts";
import { getAllEntities, getEntityHref } from "@/lib/wiki";

const BASE_URL = "https://toms-blog.co.kr";

/** Minimum number of posts for a tag page to be included in sitemap */
const MIN_TAG_POSTS_FOR_SITEMAP = 3;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const latestPostDate =
    posts.length > 0 ? new Date(posts[0].date) : new Date("2026-01-01");

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = getAllCategories().map(
    (category) => ({
      url: `${BASE_URL}${getCategoryHref(category)}`,
      lastModified: getLatestPostDateForCategory(category),
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const subcategoryEntries: MetadataRoute.Sitemap = getSubcategories().map(
    (subcategory) => ({
      url: `${BASE_URL}${getSubcategoryHref("ai-news", subcategory)}`,
      lastModified: getLatestPostDateForSubcategory(subcategory),
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  // Only include tags with enough posts to be meaningful
  const tagEntries: MetadataRoute.Sitemap = getAllTags()
    .filter((tag) => getTagPostCount(tag) >= MIN_TAG_POSTS_FOR_SITEMAP)
    .map((tag) => ({
      url: `${BASE_URL}/tags/${encodeURIComponent(tag)}`,
      lastModified: getLatestPostDateForTag(tag),
      changeFrequency: "weekly",
      priority: 0.5,
    }));

  const entityEntries: MetadataRoute.Sitemap = getAllEntities().map(
    (entity) => ({
      url: `${BASE_URL}${getEntityHref(entity.id)}`,
      lastModified: entity.lastCovered
        ? new Date(entity.lastCovered)
        : latestPostDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  return [
    {
      url: BASE_URL,
      lastModified: latestPostDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/tags`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...categoryEntries,
    ...subcategoryEntries,
    ...tagEntries,
    ...entityEntries,
    ...postEntries,
  ];
}
