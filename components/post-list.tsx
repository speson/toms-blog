"use client";

import { useSearchParams } from "next/navigation";
import { PostCard } from "./post-card";
import {
  getAllPosts,
  getPostsByCategory,
  getPostsByCategoryAndSub,
  type Category,
  type Subcategory,
} from "@/lib/posts";

export function PostList() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") as Category | null;
  const currentSub = searchParams.get("sub") as Subcategory | null;

  let posts;
  if (!currentCategory) {
    posts = getAllPosts();
  } else if (currentSub) {
    posts = getPostsByCategoryAndSub(currentCategory, currentSub);
  } else {
    posts = getPostsByCategory(currentCategory);
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <p className="text-zinc-500">포스트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
