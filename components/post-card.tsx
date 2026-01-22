import Link from "next/link";
import type { Post } from "contentlayer/generated";
import { formatDate } from "@/lib/posts";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/80">
      <Link href={post.url}>
        <h2 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-purple-400">
          {post.title}
        </h2>
        <p className="mb-4 line-clamp-2 text-zinc-400">{post.description}</p>
        <div className="flex items-center justify-between">
          <time className="text-sm text-zinc-500">{formatDate(post.date)}</time>
          <div className="flex gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-purple-500/10 px-2 py-1 text-xs text-purple-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
