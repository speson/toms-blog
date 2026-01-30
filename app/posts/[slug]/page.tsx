import { notFound } from "next/navigation";
import Image from "next/image";
import { allPosts } from "contentlayer/generated";
import { MDXContent } from "@/components/mdx-content";
import { ArticleJsonLd, BreadcrumbJsonLd, TableOfContents } from "@/components";
import { getPostBySlug, formatDate } from "@/lib/posts";
import { calculateReadingTime } from "@/lib/reading-time";
import type { Metadata } from "next";

const BASE_URL = "https://toms-blog.co.kr";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
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

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
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
      images: [ogImageUrl],
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
  const thumbnailUrl = `/api/og?title=${encodeURIComponent(post.title)}&tags=${encodeURIComponent(post.tags.join(","))}`;
  const postUrl = `${BASE_URL}/posts/${post.slug}`;
  const fullImageUrl = `${BASE_URL}${thumbnailUrl}`;

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        url={postUrl}
        imageUrl={fullImageUrl}
        datePublished={post.date}
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
                unoptimized
              />
            </div>
            <header className="mb-12">
              <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
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
                  <span
                    key={tag}
                    className="rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="prose prose-invert max-w-none">
              <MDXContent code={post.body.code} />
            </div>
          </article>

          <aside className="hidden lg:block">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </>
  );
}
