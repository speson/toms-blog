import Link from "next/link";
import { Suspense } from "react";
import { CategorySidebar, PostList } from "@/components";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const dynamic = "force-static";

const HOME_POST_LIMIT = 30;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const allPosts = getAllPosts();
  const posts = allPosts.slice(0, HOME_POST_LIMIT);
  const hasMore = allPosts.length > HOME_POST_LIMIT;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Tom&apos;s Blog
        </h1>
        <p className="text-lg text-zinc-400">
          AI 뉴스와 개발 트렌드를 다루는 기술 블로그
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-zinc-500">
          Claude Code, OpenAI, Anthropic, Gemini, 개발 도구 릴리스, 실전
          가이드와 같은 주제를 개발자 관점에서 정리합니다. 단순 링크 모음이
          아니라 직접 사용해본 경험, 비교, 해석을 함께 남기는 AI 기술
          블로그입니다.
        </p>
      </section>

      <div className="flex flex-col lg:flex-row lg:gap-8">
        <section className="min-w-0 flex-1">
          <h2 className="mb-8 text-2xl font-semibold text-white">
            최근 포스트
          </h2>
          <PostList posts={posts} />
          {hasMore && (
            <div className="mt-8 text-center">
              <Link
                href="/categories/ai-news"
                className="inline-block rounded-lg border border-zinc-800 bg-zinc-900/50 px-5 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
              >
                전체 글 보기 ({allPosts.length}개)
              </Link>
            </div>
          )}
        </section>

        <Suspense fallback={null}>
          <CategorySidebar />
        </Suspense>
      </div>
    </div>
  );
}
