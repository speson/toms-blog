import Link from "next/link";
import type { Metadata } from "next";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components";
import { getTagHref, getTopTags } from "@/lib/posts";

const BASE_URL = "https://toms-blog.co.kr";

export const metadata: Metadata = {
  title: "태그 모음",
  description: "Tom's Blog의 주요 태그를 주제별로 탐색해 보세요.",
  alternates: {
    canonical: "/tags",
  },
  openGraph: {
    title: "태그 모음",
    description: "Tom's Blog의 주요 태그를 주제별로 탐색해 보세요.",
    url: `${BASE_URL}/tags`,
    siteName: "Tom's Blog",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "태그 모음",
    description: "Tom's Blog의 주요 태그를 주제별로 탐색해 보세요.",
  },
};

export default function TagsPage() {
  const tags = getTopTags(60);

  return (
    <>
      <CollectionPageJsonLd
        name="태그 모음"
        description="Tom's Blog의 주요 태그를 주제별로 탐색해 보세요."
        url={`${BASE_URL}/tags`}
        items={tags.map(({ tag }) => ({
          name: tag,
          url: `${BASE_URL}${getTagHref(tag)}`,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: BASE_URL },
          { name: "태그", url: `${BASE_URL}/tags` },
        ]}
      />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <section className="mb-16">
          <p className="mb-3 text-sm tracking-[0.2em] text-zinc-500 uppercase">
            Tags
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            태그 모음
          </h1>
          <p className="text-lg text-zinc-400">
            자주 다루는 주제를 태그별로 탐색할 수 있습니다.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-zinc-500">
            모델명, 제품명, 프로토콜, 개발 주제 같은 핵심 키워드를 태그 허브로
            묶었습니다. 특정 기술이나 회사 이슈를 따라가고 싶을 때 가장 빠르게
            관련 글을 찾을 수 있는 진입점입니다.
          </p>
        </section>

        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={getTagHref(tag)}
              className="rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
            >
              {tag}
              <span className="ml-2 text-zinc-500">{count}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
