import { Metadata } from "next";
import { BreadcrumbJsonLd, ProfilePageJsonLd } from "@/components";

const BASE_URL = "https://toms-blog.co.kr";
const DESCRIPTION =
  "Tom's Blog 소개 — Codex·ChatGPT·Claude Code·OpenCode 설정과 가격, 문제 해결 가이드를 공식 문서로 확인해 쓰는 블로그예요. 운영자, 글 만드는 방식, 광고 정책, 연락처를 안내해요.";

export const metadata: Metadata = {
  title: "소개",
  description: DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "소개",
    description: DESCRIPTION,
    url: `${BASE_URL}/about`,
    siteName: "Tom's Blog",
    locale: "ko_KR",
    type: "profile",
    images: ["/images/toms-blog-main-og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "소개",
    description: DESCRIPTION,
    images: ["/images/toms-blog-main-og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <>
      <ProfilePageJsonLd
        url={`${BASE_URL}/about`}
        name="Tom 소개"
        description={DESCRIPTION}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: BASE_URL },
          { name: "소개", url: `${BASE_URL}/about` },
        ]}
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
            소개
          </h1>
          <p className="text-lg text-zinc-400">
            Codex, ChatGPT, Claude Code, OpenCode 같은 AI 코딩 도구의 설정, 가격,
            문제 해결을 쉽게 정리하는 개발자 Tom의 블로그예요.
          </p>
        </div>

        <div className="space-y-8">
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
            <h2 className="mb-4 text-xl font-semibold text-white">안녕하세요, Tom입니다</h2>
            <div className="space-y-3 leading-relaxed text-zinc-400">
              <p>AI 코딩 도구와 함께 일하는 개발자예요. Codex, Claude Code, Grok을 매일 쓰면서 겪은 일을 기록해요.</p>
              <p>2026년 1월부터 이 블로그를 운영하고 있어요. 처음엔 AI 뉴스를 빠르게 전하는 데 집중했어요. 지금은 시간이 지나도 쓸모 있는 가이드를 더 많이 써요.</p>
            </div>
          </section>
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
            <h2 className="mb-4 text-xl font-semibold text-white">이 블로그는 무엇을 다루나요?</h2>
            <div className="space-y-3 leading-relaxed text-zinc-400">
              <p>Tom&apos;s Blog는 AI 코딩 도구를 쓰다가 막히는 순간에 바로 답을 찾을 수 있게 만든 블로그예요. Codex, ChatGPT, Claude·Claude Code, OpenCode를 주로 다뤄요.</p>
              <ul className="list-disc space-y-2 pl-5">
                <li><b className="text-zinc-300">설정 가이드</b> — config.toml, 메모리, 데이터 학습 끄기처럼 &quot;어디서 어떻게 바꾸나&quot;에 답하는 글</li>
                <li><b className="text-zinc-300">요금·가격 정리</b> — 요금제 차이, 크레딧 단가, 한도를 넘었을 때 할 일</li>
                <li><b className="text-zinc-300">문제 해결</b> — 버전 차이, 업그레이드, 자주 막히는 오류</li>
                <li><b className="text-zinc-300">개념 풀이</b> — 하네스 엔지니어링처럼 처음 듣는 용어를 예시로 설명하는 글</li>
                <li><b className="text-zinc-300">by Tom 칼럼</b> — 제 관점에서 쓰는 의견 글</li>
              </ul>
              <p>새 글은 매주 월요일과 목요일에 올려요. 글은 <a href="/categories" className="text-purple-400 transition-colors hover:text-purple-300">카테고리</a>에서 &quot;by Tom&quot;과 &quot;AI 소식&quot;으로 나눠 볼 수 있어요.</p>
            </div>
          </section>
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
            <h2 className="mb-4 text-xl font-semibold text-white">글은 이렇게 만들어요</h2>
            <div className="space-y-3 leading-relaxed text-zinc-400">
              <p>이 블로그는 AI 도구의 도움을 받아 만들어요. 숨기지 않고 과정을 공개할게요.</p>
              <ul className="list-disc space-y-2 pl-5">
                <li><b className="text-zinc-300">주제 고르기</b> — 독자가 실제로 검색하는 질문을 보고 제가 주제와 관점을 정해요.</li>
                <li><b className="text-zinc-300">초안</b> — AI(Claude Code 등)가 제 글쓰기 가이드에 맞춰 초안을 써요.</li>
                <li><b className="text-zinc-300">사실 확인</b> — 가격, 설정 경로, 버전은 각 회사 공식 문서로 다시 확인해요. 바뀌기 쉬운 정보에는 &quot;(2026년 10월 기준)&quot;처럼 기준 날짜를 붙여요.</li>
                <li><b className="text-zinc-300">발행과 수정</b> — 제가 검토한 뒤 발행해요. 모든 글에 출처 링크를 남기고, 내용이 바뀌면 글을 고치고 수정일을 표시해요.</li>
              </ul>
              <p>원칙은 세 가지예요. 사실과 의견을 나눠 써요. 직접 해보지 않은 걸 해본 것처럼 쓰지 않아요. 틀린 걸 알면 확인하고 바로 고쳐요. 잘못된 내용을 보시면 아래 연락처로 알려 주세요.</p>
            </div>
          </section>
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
            <h2 className="mb-4 text-xl font-semibold text-white">광고는 어떻게 붙나요?</h2>
            <div className="space-y-3 leading-relaxed text-zinc-400">
              <p>블로그 운영비를 위해 Google AdSense 광고를 넣고 있어요. 광고는 글 본문과 목록 사이, 데스크톱 사이드바에 표시돼요. 팝업이나 화면 전체를 덮는 광고는 쓰지 않아요.</p>
              <p>광고와 글 내용은 관계없어요. 쿠키 등 자세한 내용은 <a href="/privacy" className="text-purple-400 transition-colors hover:text-purple-300">개인정보처리방침</a>에 있어요.</p>
            </div>
          </section>
          {/* Tech Stack */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Tech Stack
            </h2>
            <p className="mb-4 text-sm text-zinc-500">
              이 블로그는 다음 기술로 만들어졌어요.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js 16",
                "TypeScript",
                "Tailwind CSS 4",
                "MDX",
                "Contentlayer2",
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

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
            <h2 className="mb-4 text-xl font-semibold text-white">연락은 어디로 하나요?</h2>
            <div className="space-y-3 leading-relaxed text-zinc-400">
              <p>오류 제보, 질문, 제안 모두 환영해요. 이메일이 가장 빨라요.</p>
              <p>Email: <a href="mailto:speson2@gmail.com" className="text-purple-400 transition-colors hover:text-purple-300">speson2@gmail.com</a><br />
              GitHub: <a href="https://github.com/speson" target="_blank" rel="noopener noreferrer" className="text-purple-400 transition-colors hover:text-purple-300">@speson</a><br />
              <a href="/contact" className="text-purple-400 transition-colors hover:text-purple-300">연락처 페이지</a></p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
