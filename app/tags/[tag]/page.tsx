import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, CollectionPageJsonLd, PostList } from "@/components";
import { getAllTags, getPostsByTag } from "@/lib/posts";

const BASE_URL = "https://toms-blog.co.kr";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    return {};
  }

  const title = `${decodedTag} 태그 글 모음`;
  const description = `${decodedTag} 태그가 포함된 글 ${posts.length}개를 모아보세요.`;
  const url = `${BASE_URL}/tags/${encodeURIComponent(decodedTag)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/tags/${encodeURIComponent(decodedTag)}`,
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

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  const title = `${decodedTag} 태그 글 모음`;
  const description = `${decodedTag} 태그가 포함된 글 ${posts.length}개를 한곳에서 볼 수 있습니다.`;
  const url = `${BASE_URL}/tags/${encodeURIComponent(decodedTag)}`;

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
          { name: "태그", url: `${BASE_URL}/tags` },
          { name: decodedTag, url },
        ]}
      />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <section className="mb-16">
          <p className="mb-3 text-sm tracking-[0.2em] text-zinc-500 uppercase">
            Tag
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          <p className="text-lg text-zinc-400">{description}</p>
        </section>

        <Suspense fallback={null}>
          <PostList posts={posts} />
        </Suspense>
      </div>
    </>
  );
}
