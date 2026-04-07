import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BreadcrumbJsonLd,
  CategorySidebar,
  CollectionPageJsonLd,
  PostList,
} from "@/components";
import {
  CATEGORY_LABELS,
  SUBCATEGORY_LABELS,
  getPostsByCategoryAndSub,
  getSubcategories,
  isCategory,
  isSubcategory,
} from "@/lib/posts";

const BASE_URL = "https://toms-blog.co.kr";

interface SubcategoryPageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

export function generateStaticParams() {
  return getSubcategories().map((subcategory) => ({
    category: "ai-news",
    subcategory,
  }));
}

export async function generateMetadata({
  params,
}: SubcategoryPageProps): Promise<Metadata> {
  const { category, subcategory } = await params;

  if (!isCategory(category) || !isSubcategory(subcategory)) {
    return {};
  }

  const label = `${CATEGORY_LABELS[category]} / ${SUBCATEGORY_LABELS[subcategory]}`;
  const title = `${label} 글 모음`;
  const description = `${SUBCATEGORY_LABELS[subcategory]} 주제의 글을 모아보세요.`;
  const url = `${BASE_URL}/categories/${category}/${subcategory}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/categories/${category}/${subcategory}`,
    },
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

export default async function SubcategoryPage({
  params,
}: SubcategoryPageProps) {
  const { category, subcategory } = await params;

  if (!isCategory(category) || !isSubcategory(subcategory)) {
    notFound();
  }

  const posts = getPostsByCategoryAndSub(category, subcategory);

  if (category !== "ai-news" || posts.length === 0) {
    notFound();
  }

  const title = `${CATEGORY_LABELS[category]} / ${SUBCATEGORY_LABELS[subcategory]} 글 모음`;
  const description = `${SUBCATEGORY_LABELS[subcategory]} 관련 글 ${posts.length}개를 한곳에서 볼 수 있습니다.`;
  const url = `${BASE_URL}/categories/${category}/${subcategory}`;

  return (
    <>
      <CollectionPageJsonLd
        name={title}
        description={description}
        url={url}
        items={posts.map((post) => ({
          name: post.title,
          url: `${BASE_URL}${post.url}`,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: BASE_URL },
          {
            name: CATEGORY_LABELS[category],
            url: `${BASE_URL}/categories/${category}`,
          },
          { name: SUBCATEGORY_LABELS[subcategory], url },
        ]}
      />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <section className="mb-16">
          <p className="mb-3 text-sm tracking-[0.2em] text-zinc-500 uppercase">
            Subcategory
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          <p className="text-lg text-zinc-400">{description}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-zinc-500">
            {SUBCATEGORY_LABELS[subcategory]} 주제에 해당하는 글만 모아, 비슷한
            키워드와 문제의식을 가진 콘텐츠를 연속해서 읽을 수 있게
            구성했습니다. 릴리스 추적, 도구 분석, 업계 동향을 세부 주제로 나눠
            탐색할 수 있습니다.
          </p>
        </section>

        <div className="flex flex-col lg:flex-row lg:gap-8">
          <section className="min-w-0 flex-1">
            <Suspense fallback={null}>
              <PostList posts={posts} />
            </Suspense>
          </section>
          <Suspense fallback={null}>
            <CategorySidebar />
          </Suspense>
        </div>
      </div>
    </>
  );
}
