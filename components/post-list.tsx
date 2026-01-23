"use client";

import { useSearchParams } from "next/navigation";
import { PostCard } from "./post-card";
import { getAllPosts, getPostsByCategory, type Category } from "@/lib/posts";

export function PostList() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") as Category | null;

  const posts =
    currentCategory &&
    ["ai-news", "updates", "opensource"].includes(currentCategory)
      ? getPostsByCategory(currentCategory)
      : getAllPosts();

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
