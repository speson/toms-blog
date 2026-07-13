import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { PostArchive } from "@/components/post-archive";
import { getArchivePageCount } from "@/lib/posts";

interface ArchivePageProps {
  params: Promise<{ n: string }>;
}

export function generateStaticParams() {
  const totalPages = getArchivePageCount();
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    n: String(i + 2),
  }));
}

function parsePage(n: string): number | null {
  return /^\d+$/.test(n) ? Number(n) : null;
}

export async function generateMetadata({
  params,
}: ArchivePageProps): Promise<Metadata> {
  const { n } = await params;
  const page = parsePage(n);

  if (!page || page < 2 || page > getArchivePageCount()) {
    return {};
  }

  return {
    title: `전체 글 ${page}페이지`,
    description: `Tom's Blog 전체 글 목록의 ${page}페이지입니다. AI 뉴스 분석, 개발 도구 릴리스, 칼럼을 최신순으로 볼 수 있습니다.`,
    alternates: {
      canonical: `/posts/page/${page}`,
    },
  };
}

export default async function PostsArchivePagedPage({
  params,
}: ArchivePageProps) {
  const { n } = await params;
  const page = parsePage(n);

  if (page === 1) {
    permanentRedirect("/posts");
  }
  if (!page || page < 2 || page > getArchivePageCount()) {
    notFound();
  }

  return <PostArchive page={page} />;
}
