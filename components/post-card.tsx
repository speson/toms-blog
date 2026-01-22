import Link from "next/link";
import Image from "next/image";
import type { Post } from "contentlayer/generated";
import { formatDate } from "@/lib/posts";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const thumbnailUrl = `/api/og?title=${encodeURIComponent(post.title)}&tags=${encodeURIComponent(post.tags.join(","))}`;

  return (
    <article className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900/80">
      <Link href={post.url} className="flex flex-col sm:flex-row">
        <div className="relative aspect-[1200/630] w-full sm:aspect-[4/3] sm:w-48 md:w-64 flex-shrink-0">
          <Image
            src={thumbnailUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 256px"
            unoptimized
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
          <div>
            <h2 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-purple-400 sm:text-xl">
              {post.title}
            </h2>
            <p className="mb-4 line-clamp-2 text-sm text-zinc-400 sm:text-base">
              {post.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <time className="text-sm text-zinc-500">{formatDate(post.date)}</time>
            <div className="flex gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-purple-500/10 px-2 py-1 text-xs text-purple-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
