"use client";

import { useSearchParams } from "next/navigation";
import { PostCard } from "./post-card";
import type { Post } from "contentlayer/generated";
import type { Category, Subcategory } from "@/lib/posts";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") as Category | null;
  const currentSub = searchParams.get("sub") as Subcategory | null;

  const filtered = posts.filter((post) => {
    if (!currentCategory) return true;
    if (post.category !== currentCategory) return false;
    if (currentSub && post.subcategory !== currentSub) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <p className="text-zinc-500">포스트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filtered.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
