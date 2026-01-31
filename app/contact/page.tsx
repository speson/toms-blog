import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "연락처",
  description: "Tom's Blog 연락처 및 문의",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-white">
        연락처
      </h1>

      <div className="space-y-6 text-zinc-400">
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">이메일</h2>
          <a
            href="mailto:speson2@gmail.com"
            className="text-purple-400 transition-colors hover:text-purple-300"
          >
            speson2@gmail.com
          </a>
        </section>

        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">소개</h2>
          <p className="leading-relaxed">
            AI 뉴스와 개발 트렌드를 다루는 기술 블로그입니다. 궁금하신 점이나
            제안 사항이 있으시면 언제든지 연락 주세요.
          </p>
        </section>

        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">소셜 미디어</h2>
          <p className="leading-relaxed">
            GitHub:{" "}
            <a
              href="https://github.com/speson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 transition-colors hover:text-purple-300"
            >
              @speson
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
