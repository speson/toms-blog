import Link from "next/link";
import type { Metadata } from "next";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components";
import { formatDate, getAllPosts, getTagHref } from "@/lib/posts";

const BASE_URL = "https://toms-blog.co.kr";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() || "";
  const title = query ? `"${query}" 검색 결과` : "사이트 검색";
  const description = query
    ? `Tom's Blog에서 "${query}" 관련 글을 검색한 결과입니다.`
    : "Tom's Blog에서 AI 뉴스와 개발 관련 글을 검색해 보세요.";

  return {
    title,
    description,
    alternates: {
      canonical: query ? `/search?q=${encodeURIComponent(query)}` : "/search",
    },
    openGraph: {
      title,
      description,
      url: query
        ? `${BASE_URL}/search?q=${encodeURIComponent(query)}`
        : `${BASE_URL}/search`,
      siteName: "Tom's Blog",
      locale: "ko_KR",
      type: "website",
      images: ["/images/toms-blog-main-og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/toms-blog-main-og.png"],
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() || "";
  const normalizedQuery = query.toLocaleLowerCase("ko-KR");
  const posts = query
    ? getAllPosts().filter((post) => {
        const haystack = [
          post.title,
          post.description,
          ...post.tags,
          post.category,
          post.subcategory || "",
        ]
          .join(" ")
          .toLocaleLowerCase("ko-KR");

        return haystack.includes(normalizedQuery);
      })
    : [];

  const pageTitle = query ? `"${query}" 검색 결과` : "사이트 검색";
  const description = query
    ? `"${query}"와 관련된 글 ${posts.length}개를 찾았습니다.`
    : "키워드로 포스트 제목, 설명, 태그를 검색할 수 있습니다.";

  return (
    <>
      <CollectionPageJsonLd
        name={pageTitle}
        description={description}
        url={
          query
            ? `${BASE_URL}/search?q=${encodeURIComponent(query)}`
            : `${BASE_URL}/search`
        }
        items={posts.map((post) => ({
          name: post.title,
          url: `${BASE_URL}${post.url}`,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: BASE_URL },
          { name: "검색", url: `${BASE_URL}/search` },
        ]}
      />
      <div className="mx-auto max-w-5xl px-6 py-16">
        <section className="mb-10">
          <p className="mb-3 text-sm tracking-[0.2em] text-zinc-500 uppercase">
            Search
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {pageTitle}
          </h1>
          <p className="text-lg text-zinc-400">{description}</p>
        </section>

        <form action="/search" className="mb-10">
          <label htmlFor="q" className="mb-3 block text-sm text-zinc-400">
            키워드
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="q"
              name="q"
              defaultValue={query}
              placeholder="예: Claude Code, MCP, OpenAI"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-zinc-700"
            />
            <button
              type="submit"
              className="rounded-xl bg-white px-5 py-3 font-medium text-black transition-colors hover:bg-zinc-200"
            >
              검색
            </button>
          </div>
        </form>

        {query ? (
          posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
                >
                  <div className="mb-3 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Link
                        key={tag}
                        href={getTagHref(tag)}
                        className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                  <Link href={post.url} className="block">
                    <h2 className="mb-2 text-xl font-semibold text-white transition-colors hover:text-purple-400">
                      {post.title}
                    </h2>
                    <p className="mb-4 text-zinc-400">{post.description}</p>
                    <time className="text-sm text-zinc-500">
                      {formatDate(post.date)}
                    </time>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-zinc-400">
              검색 결과가 없습니다. 다른 키워드나 태그 이름으로 다시 시도해 보세요.
            </div>
          )
        ) : (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-zinc-400">
            제목, 설명, 태그를 기준으로 글을 검색할 수 있습니다.
          </div>
        )}
      </div>
    </>
  );
}
