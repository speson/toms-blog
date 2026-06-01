import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { allPosts } from "contentlayer/generated";
import { MDXContent } from "@/components/mdx-content";
import {
  ArticleJsonLd,
  AuthorBox,
  BreadcrumbJsonLd,
  TableOfContents,
} from "@/components";
import {
  CATEGORY_LABELS,
  SUBCATEGORY_LABELS,
  formatDate,
  getCategoryHref,
  getPostBySlug,
  getRelatedPosts,
  getTagHref,
  getSubcategoryHref,
} from "@/lib/posts";
import { calculateReadingTime } from "@/lib/reading-time";
import type { Metadata } from "next";

const BASE_URL = "https://toms-blog.co.kr";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPosts
    .filter((post) => !post.draft)
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}&tags=${encodeURIComponent(post.tags.join(","))}`;
  const metaImageUrl = post.thumbnail || ogImageUrl;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/posts/${post.slug}`,
      siteName: "Tom's Blog",
      locale: "ko_KR",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: ["Tom"],
      section: post.subcategory || post.category,
      tags: post.tags,
      images: [
        {
          url: metaImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [metaImageUrl],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.body.raw);
  const ogUrl = `/api/og?title=${encodeURIComponent(post.title)}&tags=${encodeURIComponent(post.tags.join(","))}`;
  const thumbnailUrl = post.thumbnail || ogUrl;
  const isCustomThumbnail = !!post.thumbnail;
  const postUrl = `${BASE_URL}/posts/${post.slug}`;
  const fullImageUrl = post.thumbnail
    ? `${BASE_URL}${post.thumbnail}`
    : `${BASE_URL}${ogUrl}`;
  const relatedPosts = getRelatedPosts(post, 3);

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        url={postUrl}
        imageUrl={fullImageUrl}
        datePublished={post.date}
        dateModified={post.updatedAt || post.date}
        tags={post.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: BASE_URL },
          { name: post.title, url: postUrl },
        ]}
      />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <article>
            <div className="relative mb-8 aspect-[1200/630] w-full overflow-hidden rounded-xl">
              <Image
                src={thumbnailUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
                unoptimized={!isCustomThumbnail}
              />
            </div>
            <header className="mb-12">
              <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                {post.title}
              </h1>
              <div className="mb-4 flex flex-wrap gap-2 text-sm">
                <Link
                  href={getCategoryHref(post.category)}
                  className="rounded-full bg-zinc-800 px-3 py-1 text-zinc-300 transition-colors hover:text-white"
                >
                  {CATEGORY_LABELS[post.category]}
                </Link>
                {post.subcategory && (
                  <Link
                    href={getSubcategoryHref(post.category, post.subcategory)}
                    className="rounded-full bg-zinc-800 px-3 py-1 text-zinc-300 transition-colors hover:text-white"
                  >
                    {SUBCATEGORY_LABELS[post.subcategory]}
                  </Link>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                <Link
                  href="/about"
                  rel="author"
                  className="font-medium text-zinc-300 transition-colors hover:text-white"
                >
                  Tom
                </Link>
                <span>•</span>
                <time>{formatDate(post.date)}</time>
                <span>•</span>
                <span>{readingTime}분 읽기</span>
                {post.sourceUrl && (
                  <>
                    <span>•</span>
                    <a
                      href={post.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline"
                    >
                      원문 보기
                    </a>
                  </>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={getTagHref(tag)}
                    className="rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-400"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </header>

            {post.tldrVerdict && (
              <div className="mb-10 rounded-xl border border-purple-500/20 bg-purple-500/5 p-5">
                <p className="mb-1 text-xs font-semibold tracking-wider text-purple-400 uppercase">
                  한줄평
                </p>
                <p className="leading-relaxed text-zinc-200">
                  {post.tldrVerdict}
                </p>
              </div>
            )}

            <div className="prose prose-invert max-w-none">
              <MDXContent code={post.body.code} />
            </div>

            <AuthorBox />

            {relatedPosts.length > 0 && (
              <section className="mt-16 border-t border-zinc-800 pt-10">
                <h2 className="mb-6 text-2xl font-semibold text-white">
                  관련 글
                </h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={relatedPost.url}
                      className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900/80"
                    >
                      <div className="mb-3 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-zinc-800 px-2 py-1 text-zinc-400">
                          {CATEGORY_LABELS[relatedPost.category]}
                        </span>
                        {relatedPost.subcategory && (
                          <span className="rounded-full bg-zinc-800 px-2 py-1 text-zinc-400">
                            {SUBCATEGORY_LABELS[relatedPost.subcategory]}
                          </span>
                        )}
                      </div>
                      <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-white">
                        {relatedPost.title}
                      </h3>
                      <p className="mb-4 line-clamp-3 text-sm text-zinc-400">
                        {relatedPost.description}
                      </p>
                      <time className="text-sm text-zinc-500">
                        {formatDate(relatedPost.date)}
                      </time>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="hidden lg:block">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </>
  );
}
