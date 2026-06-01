import Link from "next/link";
import type { Metadata } from "next";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components";
import {
  CATEGORY_LABELS,
  SUBCATEGORY_LABELS,
  getAllCategories,
  getCategoryCount,
  getCategoryHref,
  getSubcategories,
  getSubcategoryCount,
  getSubcategoryHref,
} from "@/lib/posts";

const BASE_URL = "https://toms-blog.co.kr";

const TITLE = "카테고리 전체보기";
const DESCRIPTION =
  "Tom's Blog의 모든 카테고리와 세부 주제를 한곳에서 살펴보세요. AI 뉴스, 릴리스 추적, 분석, 가이드까지 주제별로 글을 모았습니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${BASE_URL}/categories`,
    siteName: "Tom's Blog",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  const subcategories = getSubcategories();

  const collectionItems = categories.map((category) => ({
    name: CATEGORY_LABELS[category],
    url: `${BASE_URL}${getCategoryHref(category)}`,
  }));

  return (
    <>
      <CollectionPageJsonLd
        name={TITLE}
        description={DESCRIPTION}
        url={`${BASE_URL}/categories`}
        items={collectionItems}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: BASE_URL },
          { name: "카테고리", url: `${BASE_URL}/categories` },
        ]}
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <section className="mb-12">
          <p className="mb-3 text-sm tracking-[0.2em] text-zinc-500 uppercase">
            Categories
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {TITLE}
          </h1>
          <p className="max-w-3xl text-lg text-zinc-400">{DESCRIPTION}</p>
        </section>

        <div className="space-y-6">
          {categories.map((category) => (
            <section
              key={category}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <Link
                  href={getCategoryHref(category)}
                  className="text-xl font-semibold text-white transition-colors hover:text-purple-400"
                >
                  {CATEGORY_LABELS[category]}
                </Link>
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400">
                  {getCategoryCount(category)}개
                </span>
              </div>

              {category === "ai-news" && (
                <div className="mt-4 flex flex-wrap gap-2 border-t border-zinc-800 pt-4">
                  {subcategories.map((sub) => (
                    <Link
                      key={sub}
                      href={getSubcategoryHref("ai-news", sub)}
                      className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/50 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
                    >
                      <span>{SUBCATEGORY_LABELS[sub]}</span>
                      <span className="text-xs text-zinc-500">
                        {getSubcategoryCount(sub)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
