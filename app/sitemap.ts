import { MetadataRoute } from "next";
import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  getCategoryHref,
  getSubcategories,
  getSubcategoryHref,
} from "@/lib/posts";

const BASE_URL = "https://toms-blog.co.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const latestPostDate = posts.length > 0 ? new Date(posts[0].date) : new Date("2026-01-01");

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = getAllCategories().map(
    (category) => ({
      url: `${BASE_URL}${getCategoryHref(category)}`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const subcategoryEntries: MetadataRoute.Sitemap = getSubcategories().map(
    (subcategory) => ({
      url: `${BASE_URL}${getSubcategoryHref("ai-news", subcategory)}`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  const tagEntries: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${BASE_URL}/tags/${encodeURIComponent(tag)}`,
    lastModified: latestPostDate,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

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
    ...postEntries,
  ];
}
