import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components";
import { getAllEntities, getEntityHref } from "@/lib/wiki";
import { formatDate } from "@/lib/posts";

const BASE_URL = "https://toms-blog.co.kr";

export const metadata: Metadata = {
  title: "엔티티 허브 - 기업/제품별 AI 소식 모아보기",
  description:
    "OpenAI, Anthropic, Google 등 주요 AI 기업과 제품별로 관련 포스트를 모아 볼 수 있습니다.",
  alternates: { canonical: "/entities" },
  openGraph: {
    title: "엔티티 허브 - 기업/제품별 AI 소식 모아보기",
    description:
      "OpenAI, Anthropic, Google 등 주요 AI 기업과 제품별로 관련 포스트를 모아 볼 수 있습니다.",
    url: `${BASE_URL}/entities`,
    siteName: "Tom's Blog",
    locale: "ko_KR",
    type: "website",
  },
};

export default function EntitiesPage() {
  const entities = getAllEntities();

  return (
    <>
      <CollectionPageJsonLd
        name="엔티티 허브"
        description="기업/제품별 AI 소식 모아보기"
        url={`${BASE_URL}/entities`}
        items={entities.map((e) => ({
          name: e.name,
          url: `${BASE_URL}${getEntityHref(e.id)}`,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: BASE_URL },
          { name: "엔티티", url: `${BASE_URL}/entities` },
        ]}
      />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <section className="mb-16">
          <p className="mb-3 text-sm tracking-[0.2em] text-zinc-500 uppercase">
            Entity Hub
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            기업/제품별 AI 소식
          </h1>
          <p className="text-lg text-zinc-400">
            주요 AI 기업과 제품별로 관련 포스트를 모아 타임라인으로 볼 수
            있습니다.
          </p>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entities.map((entity) => (
            <Link
              key={entity.id}
              href={getEntityHref(entity.id)}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md transition-all hover:border-zinc-700 hover:bg-zinc-900/80"
            >
              <h2 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-purple-400">
                {entity.name}
              </h2>
              <div className="mb-4 flex flex-wrap gap-2">
                {entity.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-purple-500/10 px-2 py-1 text-xs text-purple-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-zinc-500">
                <span>포스트 {entity.postCount}개</span>
                <span>
                  {entity.lastCovered ? formatDate(entity.lastCovered) : ""}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
