import { Suspense } from "react";
import { CategorySidebar, PostList } from "@/components";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Tom&apos;s Blog
        </h1>
        <p className="text-lg text-zinc-400">
          AI 뉴스와 개발 트렌드를 다루는 기술 블로그
        </p>
      </section>

      <div className="flex flex-col lg:flex-row lg:gap-8">
        <section className="min-w-0 flex-1">
          <h2 className="mb-8 text-2xl font-semibold text-white">
            최근 포스트
          </h2>
          <Suspense
            fallback={
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <p className="text-zinc-500">로딩 중...</p>
              </div>
            }
          >
            <PostList />
          </Suspense>
        </section>

        <Suspense fallback={null}>
          <CategorySidebar />
        </Suspense>
      </div>
    </div>
  );
}
