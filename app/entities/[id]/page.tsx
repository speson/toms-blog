import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, CollectionPageJsonLd, PostList } from "@/components";
import {
  getAllEntities,
  getEntityById,
  getEntityHref,
  getPostsForEntity,
} from "@/lib/wiki";
import { formatDate } from "@/lib/posts";

const BASE_URL = "https://toms-blog.co.kr";

interface EntityPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllEntities().map((entity) => ({ id: entity.id }));
}

export async function generateMetadata({
  params,
}: EntityPageProps): Promise<Metadata> {
  const { id } = await params;
  const entity = getEntityById(id);

  if (!entity) return {};

  const title = `${entity.name} - 관련 포스트 모아보기`;
  const description = `${entity.name} 관련 AI 뉴스와 분석을 ${entity.postCount}개 포스트로 모아 볼 수 있습니다.`;
  const url = `${BASE_URL}${getEntityHref(id)}`;

  return {
    title,
    description,
    alternates: { canonical: getEntityHref(id) },
    openGraph: {
      title,
      description,
      url,
      siteName: "Tom's Blog",
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EntityPage({ params }: EntityPageProps) {
  const { id } = await params;
  const entity = getEntityById(id);

  if (!entity) notFound();

  const posts = getPostsForEntity(entity);
  const relatedEntities = entity.relatedEntities
    .map((rid) => getEntityById(rid))
    .filter(Boolean);

  const title = `${entity.name} 관련 포스트`;
  const url = `${BASE_URL}${getEntityHref(id)}`;

  // Parse timeline from wiki content
  const timelineLines = entity.content
    .split("\n")
    .filter((line) => line.startsWith("|") && line.includes("2026"))
    .map((line) => {
      const cols = line
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);
      if (cols.length >= 2) {
        return { date: cols[0], event: cols[1] };
      }
      return null;
    })
    .filter(Boolean) as { date: string; event: string }[];

  // Parse overview from wiki content
  const overviewMatch = entity.content.match(
    /## 개요\s*\n\n([\s\S]*?)(?=\n## )/
  );
  const overview = overviewMatch ? overviewMatch[1].trim() : "";

  return (
    <>
      <CollectionPageJsonLd
        name={title}
        description={`${entity.name} 관련 포스트 모음`}
        url={url}
        items={posts.map((post) => ({
          name: post.title,
          url: `${BASE_URL}${post.url}`,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: BASE_URL },
          { name: "엔티티", url: `${BASE_URL}/entities` },
          { name: entity.name, url },
        ]}
      />
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <section className="mb-12">
          <p className="mb-3 text-sm tracking-[0.2em] text-zinc-500 uppercase">
            Entity
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {entity.name}
          </h1>
          {overview && (
            <p className="max-w-3xl text-lg leading-relaxed text-zinc-400">
              {overview}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {entity.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 flex gap-6 text-sm text-zinc-500">
            <span>포스트 {posts.length}개</span>
            {entity.firstCovered && (
              <span>첫 보도: {formatDate(entity.firstCovered)}</span>
            )}
            {entity.lastCovered && (
              <span>최근: {formatDate(entity.lastCovered)}</span>
            )}
          </div>
        </section>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-8">
          {/* Main: Posts */}
          <section className="min-w-0 flex-1">
            <h2 className="mb-6 text-2xl font-bold text-white">관련 포스트</h2>
            <Suspense fallback={null}>
              <PostList posts={posts} />
            </Suspense>
          </section>

          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-72">
            {/* Timeline */}
            {timelineLines.length > 0 && (
              <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  타임라인
                </h3>
                <div className="space-y-3">
                  {timelineLines.slice(0, 10).map((item, i) => (
                    <div key={i} className="border-l-2 border-zinc-700 pl-3">
                      <time className="text-xs text-zinc-500">{item.date}</time>
                      <p className="text-sm text-zinc-300">{item.event}</p>
                    </div>
                  ))}
                  {timelineLines.length > 10 && (
                    <p className="text-xs text-zinc-500">
                      외 {timelineLines.length - 10}건
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Related Entities */}
            {relatedEntities.length > 0 && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  관련 엔티티
                </h3>
                <div className="flex flex-wrap gap-2">
                  {relatedEntities.map((re) =>
                    re ? (
                      <Link
                        key={re.id}
                        href={getEntityHref(re.id)}
                        className="rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
                      >
                        {re.name}
                      </Link>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
