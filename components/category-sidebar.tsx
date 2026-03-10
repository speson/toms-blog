"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  getAllCategories,
  getSubcategories,
  getCategoryCount,
  getSubcategoryCount,
  getAllPosts,
  CATEGORY_LABELS,
  SUBCATEGORY_LABELS,
  type Category,
  type Subcategory,
} from "@/lib/posts";

export function CategorySidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentCategory = searchParams.get("category") as Category | null;
  const currentSub = searchParams.get("sub") as Subcategory | null;

  const categories = getAllCategories();
  const subcategories = getSubcategories();
  const totalPosts = getAllPosts().length;

  const navigate = (category: Category | null, sub?: Subcategory | null) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (sub) params.set("sub", sub);
    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : "/", { scroll: false });
  };

  const isActive = (category: Category | null, sub?: Subcategory | null) => {
    if (category === null) return currentCategory === null;
    if (sub) return currentCategory === category && currentSub === sub;
    return currentCategory === category && !currentSub;
  };

  const btnClass = (active: boolean) =>
    `flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all ${
      active
        ? "bg-purple-500/10 font-medium text-purple-400"
        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
    }`;

  const badgeClass = (active: boolean) =>
    `rounded-full px-2 py-0.5 text-xs ${
      active ? "bg-purple-500/20 text-purple-400" : "bg-zinc-800 text-zinc-500"
    }`;

  const pillClass = (active: boolean) =>
    `flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
      active
        ? "border-purple-500/30 bg-purple-500/10 font-medium text-purple-400"
        : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
    }`;

  const pillBadgeClass = (active: boolean) =>
    `text-xs ${active ? "text-purple-400/70" : "text-zinc-500"}`;

  // Desktop sidebar
  return (
    <aside className="w-full shrink-0 lg:w-56">
      <div className="sticky top-24 hidden lg:block">
        <nav className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-md">
          <h3 className="mb-4 text-sm font-medium tracking-wider text-zinc-500 uppercase">
            카테고리
          </h3>
          <ul className="space-y-1">
            {/* 전체 */}
            <li>
              <button
                onClick={() => navigate(null)}
                className={btnClass(isActive(null))}
              >
                <span>전체</span>
                <span className={badgeClass(isActive(null))}>{totalPosts}</span>
              </button>
            </li>

            {/* by Tom */}
            <li>
              <button
                onClick={() => navigate("by-tom")}
                className={btnClass(isActive("by-tom"))}
              >
                <span>{CATEGORY_LABELS["by-tom"]}</span>
                <span className={badgeClass(isActive("by-tom"))}>
                  {getCategoryCount("by-tom")}
                </span>
              </button>
            </li>

            {/* AI 소식 (top-level) */}
            <li>
              <button
                onClick={() => navigate("ai-news")}
                className={btnClass(
                  currentCategory === "ai-news" && !currentSub
                )}
              >
                <span>{CATEGORY_LABELS["ai-news"]}</span>
                <span
                  className={badgeClass(
                    currentCategory === "ai-news" && !currentSub
                  )}
                >
                  {getCategoryCount("ai-news")}
                </span>
              </button>

              {/* Subcategories — always visible */}
              <ul className="mt-1 ml-3 space-y-0.5 border-l border-zinc-800 pl-3">
                {subcategories.map((sub) => {
                  const subActive = isActive("ai-news", sub);
                  return (
                    <li key={sub}>
                      <button
                        onClick={() => navigate("ai-news", sub)}
                        className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs transition-all ${
                          subActive
                            ? "font-medium text-purple-400"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        <span>{SUBCATEGORY_LABELS[sub]}</span>
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                            subActive
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-zinc-800/50 text-zinc-600"
                          }`}
                        >
                          {getSubcategoryCount(sub)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile horizontal pills */}
      <div className="scrollbar-hide -mx-2 mb-8 overflow-x-auto px-2 lg:hidden">
        <div className="flex gap-2 pb-2">
          <button
            onClick={() => navigate(null)}
            className={pillClass(isActive(null))}
          >
            <span>전체</span>
            <span className={pillBadgeClass(isActive(null))}>{totalPosts}</span>
          </button>

          <button
            onClick={() => navigate("by-tom")}
            className={pillClass(isActive("by-tom"))}
          >
            <span>{CATEGORY_LABELS["by-tom"]}</span>
            <span className={pillBadgeClass(isActive("by-tom"))}>
              {getCategoryCount("by-tom")}
            </span>
          </button>

          <button
            onClick={() => navigate("ai-news")}
            className={pillClass(currentCategory === "ai-news" && !currentSub)}
          >
            <span>{CATEGORY_LABELS["ai-news"]}</span>
            <span
              className={pillBadgeClass(
                currentCategory === "ai-news" && !currentSub
              )}
            >
              {getCategoryCount("ai-news")}
            </span>
          </button>

          {/* Mobile subcategory pills */}
          {subcategories.map((sub) => {
            const subActive = isActive("ai-news", sub);
            return (
              <button
                key={sub}
                onClick={() => navigate("ai-news", sub)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all ${
                  subActive
                    ? "border-purple-500/30 bg-purple-500/10 font-medium text-purple-400"
                    : "border-zinc-800/50 bg-zinc-900/30 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                <span>{SUBCATEGORY_LABELS[sub]}</span>
                <span className={pillBadgeClass(subActive)}>
                  {getSubcategoryCount(sub)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
