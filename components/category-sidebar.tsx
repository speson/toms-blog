"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  getAllCategories,
  getCategoryCount,
  getAllPosts,
  CATEGORY_LABELS,
  type Category,
} from "@/lib/posts";

export function CategorySidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentCategory = searchParams.get("category") as Category | null;

  const categories = getAllCategories();
  const totalPosts = getAllPosts().length;

  const handleCategoryClick = (category: Category | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === null) {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : "/", { scroll: false });
  };

  return (
    <aside className="w-full shrink-0 lg:w-56">
      <div className="sticky top-24 hidden lg:block">
        <nav className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-md">
          <h3 className="mb-4 text-sm font-medium tracking-wider text-zinc-500 uppercase">
            카테고리
          </h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => handleCategoryClick(null)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all ${
                  currentCategory === null
                    ? "bg-purple-500/10 font-medium text-purple-400"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                }`}
              >
                <span>전체</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    currentCategory === null
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {totalPosts}
                </span>
              </button>
            </li>

            {categories.map((category) => {
              const isActive = currentCategory === category;
              const count = getCategoryCount(category);

              return (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all ${
                      isActive
                        ? "bg-purple-500/10 font-medium text-purple-400"
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                    }`}
                  >
                    <span>{CATEGORY_LABELS[category]}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        isActive
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="scrollbar-hide -mx-2 mb-8 overflow-x-auto px-2 lg:hidden">
        <div className="flex gap-2 pb-2">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
              currentCategory === null
                ? "border-purple-500/30 bg-purple-500/10 font-medium text-purple-400"
                : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
            }`}
          >
            <span>전체</span>
            <span
              className={`text-xs ${
                currentCategory === null
                  ? "text-purple-400/70"
                  : "text-zinc-500"
              }`}
            >
              {totalPosts}
            </span>
          </button>

          {categories.map((category) => {
            const isActive = currentCategory === category;
            const count = getCategoryCount(category);

            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                  isActive
                    ? "border-purple-500/30 bg-purple-500/10 font-medium text-purple-400"
                    : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                <span>{CATEGORY_LABELS[category]}</span>
                <span
                  className={`text-xs ${
                    isActive ? "text-purple-400/70" : "text-zinc-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
