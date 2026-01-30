import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - 페이지를 찾을 수 없습니다",
  description: "요청하신 페이지를 찾을 수 없습니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
      <h1 className="mb-4 text-6xl font-bold text-white">404</h1>
      <p className="mb-8 text-xl text-zinc-400">
        요청하신 페이지를 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        className="inline-block rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
