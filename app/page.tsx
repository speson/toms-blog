export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <main className="mx-auto max-w-4xl px-6 py-24">
        <section className="mb-16">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Tom&apos;s Blog
          </h1>
          <p className="text-lg text-zinc-400">
            AI 뉴스와 개발 트렌드를 다루는 기술 블로그
          </p>
        </section>

        <section>
          <h2 className="mb-8 text-2xl font-semibold text-white">
            최근 포스트
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700">
              <p className="text-zinc-500">포스트가 없습니다.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
