import { PostCard } from "./post-card";
import type { Post } from "contentlayer/generated";

interface PostListProps {
  posts: Post[];
}

/**
 * Server component: renders post links directly into static HTML so crawlers
 * (and AdSense review) see real <a href="/posts/..."> links, not a client-only
 * shell. Callers pass already-filtered posts (by category/subcategory/tag), so
 * no client-side searchParams filtering is needed here.
 */
export function PostList({ posts }: PostListProps) {
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
