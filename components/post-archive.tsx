import Link from "next/link";
import { BreadcrumbJsonLd, PostList } from "@/components";
import {
  getAllPosts,
  getArchivePageCount,
  getArchivePagePosts,
} from "@/lib/posts";

const BASE_URL = "https://toms-blog.co.kr";

export function archivePageHref(page: number): string {
  return page <= 1 ? "/posts" : `/posts/page/${page}`;
}

/**
 * Server component: shared renderer for /posts and /posts/page/[n]. Every
 * pagination control is a real <a href> so crawlers can reach all posts
 * within two clicks of the homepage.
 */
export function PostArchive({ page }: { page: number }) {
  const totalPosts = getAllPosts().length;
  const totalPages = getArchivePageCount();
  const posts = getArchivePagePosts(page);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: BASE_URL },
          { name: "전체 글", url: `${BASE_URL}/posts` },
          ...(page > 1
            ? [
                {
                  name: `${page}페이지`,
                  url: `${BASE_URL}${archivePageHref(page)}`,
                },
              ]
            : []),
        ]}
      />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <section className="mb-16">
          <p className="mb-3 text-sm tracking-[0.2em] text-zinc-500 uppercase">
            Archive
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            전체 글
          </h1>
          <p className="text-lg text-zinc-400">
            발행된 글 {totalPosts}개를 최신순으로 모아봅니다.
            {totalPages > 1 && ` (${page}/${totalPages} 페이지)`}
          </p>
        </section>

        <PostList posts={posts} />

        {totalPages > 1 && (
          <nav
            aria-label="페이지네이션"
            className="mt-12 flex flex-wrap items-center justify-center gap-2"
          >
            {page > 1 && (
              <Link
                href={archivePageHref(page - 1)}
                rel="prev"
                className="rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
              >
                이전
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
              n === page ? (
                <span
                  key={n}
                  aria-current="page"
                  className="rounded-lg border border-purple-500/50 bg-purple-500/10 px-3 py-1.5 text-sm text-purple-300"
                >
                  {n}
                </span>
              ) : (
                <Link
                  key={n}
                  href={archivePageHref(n)}
                  className="rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
                >
                  {n}
                </Link>
              )
            )}
            {page < totalPages && (
              <Link
                href={archivePageHref(page + 1)}
                rel="next"
                className="rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
              >
                다음
              </Link>
            )}
          </nav>
        )}
      </div>
    </>
  );
}
