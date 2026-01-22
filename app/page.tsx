import { PostCard } from "@/components";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Tom&apos;s Blog
        </h1>
        <p className="text-lg text-zinc-400">
          AI 뉴스와 개발 트렌드를 다루는 기술 블로그
        </p>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-semibold text-white">최근 포스트</h2>
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <p className="text-zinc-500">포스트가 없습니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}
