import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Tom's Blog 소개",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-white">
        About
      </h1>

      <div className="space-y-6 text-zinc-400">
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Tom&apos;s Blog
          </h2>
          <p className="leading-relaxed">
            AI 뉴스와 개발 트렌드를 다루는 기술 블로그입니다. Geeknews, GitHub
            Releases 등에서 수집한 최신 기술 소식을 번역하고 요약하여
            전달합니다.
          </p>
        </section>

        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Tech Stack</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Next.js 15 (App Router)</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>MDX + Contentlayer</li>
            <li>Vercel</li>
          </ul>
        </section>

        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Contact</h2>
          <p className="leading-relaxed">
            GitHub:{" "}
            <a
              href="https://github.com/speson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              @speson
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
