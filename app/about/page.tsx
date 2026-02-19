import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tom's Blog — AI 뉴스와 개발 트렌드를 다루는 기술 블로그. 직접 사용해보고 경험을 바탕으로 작성합니다.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
          About
        </h1>
        <p className="text-lg text-zinc-400">
          AI 뉴스와 개발 트렌드를 다루는 기술 블로그
        </p>
      </div>

      <div className="space-y-8">
        {/* Tom 소개 */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <h2 className="mb-4 text-xl font-semibold text-white">
            안녕하세요, Tom입니다
          </h2>
          <div className="space-y-3 leading-relaxed text-zinc-400">
            <p>
              AI 코딩 도구와 함께 일하는 개발자예요. 매일 Claude Code, OpenCode,
              Oh My OpenCode 같은 도구들을 사용하면서 AI가 개발 워크플로우를
              어떻게 바꾸는지 직접 경험하고 있습니다.
            </p>
            <p>
              2026년 1월부터 이 블로그를 운영하며, AI 업계의 빠른 변화를
              추적하고 개발자 관점에서 분석하고 있어요. 단순한 뉴스 전달이
              아니라, 직접 써보고 느낀 점을 솔직하게 공유하는 걸 중요하게
              생각합니다.
            </p>
          </div>
        </section>

        {/* 블로그 소개 */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <h2 className="mb-4 text-xl font-semibold text-white">
            이 블로그에 대해
          </h2>
          <div className="space-y-3 leading-relaxed text-zinc-400">
            <p>
              Tom&apos;s Blog는 AI 뉴스와 개발 트렌드를 다루는 기술 블로그예요.
              GeekNews, GitHub Releases, OpenAI, Anthropic, Google AI 등의 공식
              소스에서 뉴스를 수집하고, 개발자 관점에서 분석하여 전달합니다.
            </p>
            <p>
              이 블로그의 특징은 단순 번역/요약이 아니라{" "}
              <span className="font-medium text-zinc-300">
                직접 사용해본 경험과 개인적인 분석
              </span>
              을 담는다는 점이에요. Claude Code 릴리스를 한 달간 추적하며 분석한
              글, AI 코딩 도구 가격 비교 가이드, 프롬프트 인젝션 방어 가이드
              같은 오리지널 콘텐츠를 발행하고 있습니다.
            </p>
          </div>
        </section>

        {/* 콘텐츠 카테고리 */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <h2 className="mb-6 text-xl font-semibold text-white">
            콘텐츠 카테고리
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
              <div className="mb-2 text-2xl">{"📰"}</div>
              <h3 className="mb-1 font-medium text-zinc-200">뉴스</h3>
              <p className="text-sm text-zinc-500">
                AI 업계 최신 소식을 빠르게 전달합니다
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
              <div className="mb-2 text-2xl">{"🚀"}</div>
              <h3 className="mb-1 font-medium text-zinc-200">릴리스</h3>
              <p className="text-sm text-zinc-500">
                개발 도구 업데이트를 추적하고 분석합니다
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
              <div className="mb-2 text-2xl">{"🔍"}</div>
              <h3 className="mb-1 font-medium text-zinc-200">분석</h3>
              <p className="text-sm text-zinc-500">
                트렌드 분석, 모델 비교, 종합 정리
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
              <div className="mb-2 text-2xl">{"📖"}</div>
              <h3 className="mb-1 font-medium text-zinc-200">가이드</h3>
              <p className="text-sm text-zinc-500">
                실용적인 개발자 가이드와 튜토리얼
              </p>
            </div>
          </div>
        </section>

        {/* 전문 분야 */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <h2 className="mb-4 text-xl font-semibold text-white">전문 분야</h2>
          <div className="space-y-3 text-zinc-400">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
              <div>
                <span className="font-medium text-zinc-300">AI 코딩 도구</span>{" "}
                — Claude Code, Cursor, GitHub Copilot, OpenCode 등 주요 도구를
                직접 사용하며 비교 분석
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
              <div>
                <span className="font-medium text-zinc-300">
                  멀티 에이전트 시스템
                </span>{" "}
                — Oh My OpenCode의 오케스트레이션 구조와 에이전트 협업 패턴 추적
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
              <div>
                <span className="font-medium text-zinc-300">AI 모델 비교</span>{" "}
                — GPT, Claude, Gemini 등 주요 모델의 실사용 관점 비교와 활용
                가이드
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
              <div>
                <span className="font-medium text-zinc-300">LLM 활용 개발</span>{" "}
                — 프롬프트 엔지니어링, AI 보안, API 통합 등 실무 개발 지식
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <h2 className="mb-4 text-xl font-semibold text-white">Tech Stack</h2>
          <p className="mb-4 text-sm text-zinc-500">
            이 블로그는 다음 기술로 만들어졌어요.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js 15",
              "TypeScript",
              "Tailwind CSS",
              "MDX",
              "Contentlayer",
              "Vercel",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-sm text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <h2 className="mb-4 text-xl font-semibold text-white">Contact</h2>
          <p className="leading-relaxed text-zinc-400">
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
