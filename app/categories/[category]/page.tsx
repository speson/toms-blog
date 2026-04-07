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
  getAllCategories,
  getPostsByCategory,
  isCategory,
} from "@/lib/posts";

const BASE_URL = "https://toms-blog.co.kr";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!isCategory(category)) {
    return {};
  }

  const label = CATEGORY_LABELS[category];
  const title = `${label} 글 모음`;
  const description = `${label} 카테고리의 AI 뉴스와 개발 관련 글을 모아보세요.`;
  const url = `${BASE_URL}/categories/${category}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/categories/${category}`,
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!isCategory(category)) {
    notFound();
  }

  const posts = getPostsByCategory(category);
  const label = CATEGORY_LABELS[category];
  const title = `${label} 글 모음`;
  const description = `${label} 카테고리의 글 ${posts.length}개를 한곳에서 볼 수 있습니다.`;
  const url = `${BASE_URL}/categories/${category}`;

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
          { name: label, url },
        ]}
      />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <section className="mb-16">
          <p className="mb-3 text-sm tracking-[0.2em] text-zinc-500 uppercase">
            Category
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          <p className="text-lg text-zinc-400">{description}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-zinc-500">
            {label} 카테고리에서는 AI 뉴스, 개발 도구 업데이트, 실사용 분석처럼
            서로 연결된 글을 한곳에서 탐색할 수 있습니다. 검색엔진과 사용자 모두
            주제별 맥락을 쉽게 파악할 수 있도록 관련 포스트를 모았습니다.
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
