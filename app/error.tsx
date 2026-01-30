"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
      <h1 className="mb-4 text-4xl font-bold text-white">
        오류가 발생했습니다
      </h1>
      <p className="mb-8 text-lg text-zinc-400">
        죄송합니다. 페이지를 불러오는 중 오류가 발생했습니다.
      </p>
      <button
        onClick={reset}
        className="inline-block rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
      >
        다시 시도
      </button>
    </div>
  );
}
