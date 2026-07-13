import type { Metadata } from "next";
import { PostArchive } from "@/components/post-archive";

export const metadata: Metadata = {
  title: "전체 글",
  description:
    "Tom's Blog의 모든 글을 최신순으로 모아봅니다. AI 뉴스 분석, 개발 도구 릴리스, 칼럼을 한곳에서 볼 수 있습니다.",
  alternates: {
    canonical: "/posts",
  },
};

export default function PostsArchivePage() {
  return <PostArchive page={1} />;
}
