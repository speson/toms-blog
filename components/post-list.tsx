import { Fragment } from "react";
import { PostCard } from "./post-card";
import { InFeedAd } from "./ad-unit";
import { IN_FEED_EVERY_N_POSTS } from "@/lib/ads";
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
      {posts.map((post, i) => (
        <Fragment key={post.slug}>
          <PostCard post={post} />
          {(i + 1) % IN_FEED_EVERY_N_POSTS === 0 && i < posts.length - 1 && (
            <InFeedAd />
          )}
        </Fragment>
      ))}
    </div>
  );
}
