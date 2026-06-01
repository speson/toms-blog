import Link from "next/link";

/**
 * Visible author identity rendered at the bottom of every post. Ties each
 * article to a traceable author (E-E-A-T) and links to the full /about profile
 * and GitHub, matching the ProfilePage JSON-LD and ArticleJsonLd author.sameAs.
 */
export function AuthorBox() {
  return (
    <section className="mt-16 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-xl font-bold text-white">
          T
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/about"
              className="text-base font-semibold text-white transition-colors hover:text-purple-400"
            >
              Tom
            </Link>
            <span className="text-sm text-zinc-500">
              AI 코딩 도구를 매일 쓰는 개발자
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Claude Code, OpenCode 같은 AI 코딩 도구를 직접 쓰면서 AI 업계의
            변화를 개발자 관점에서 기록합니다. 단순 번역이 아니라 써본 경험과
            해석을 함께 남기려고 해요.
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <Link
              href="/about"
              className="text-purple-400 transition-colors hover:text-purple-300"
            >
              소개 더 보기
            </Link>
            <a
              href="https://github.com/speson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 transition-colors hover:text-purple-300"
            >
              GitHub @speson
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
