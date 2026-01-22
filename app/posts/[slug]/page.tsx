import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { MDXContent } from "@/components/mdx-content";
import { getPostBySlug, formatDate } from "@/lib/posts";
import type { Metadata } from "next";

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

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12">
        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <time>{formatDate(post.date)}</time>
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
  );
}
