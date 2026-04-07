"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getSubcategories,
  getCategoryCount,
  getSubcategoryCount,
  getAllPosts,
  getCategoryHref,
  getSubcategoryHref,
  CATEGORY_LABELS,
  SUBCATEGORY_LABELS,
} from "@/lib/posts";

export function CategorySidebar() {
  const pathname = usePathname();

  const subcategories = getSubcategories();
  const totalPosts = getAllPosts().length;
  const isHome = pathname === "/";
  const isByTom = pathname === getCategoryHref("by-tom");
  const isAiNews = pathname === getCategoryHref("ai-news");

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
            <li>
              <Link href="/" className={btnClass(isHome)}>
                <span>전체</span>
                <span className={badgeClass(isHome)}>{totalPosts}</span>
              </Link>
            </li>

            <li>
              <Link
                href={getCategoryHref("by-tom")}
                className={btnClass(isByTom)}
              >
                <span>{CATEGORY_LABELS["by-tom"]}</span>
                <span className={badgeClass(isByTom)}>
                  {getCategoryCount("by-tom")}
                </span>
              </Link>
            </li>

            <li>
              <Link href={getCategoryHref("ai-news")} className={btnClass(isAiNews)}>
                <span>{CATEGORY_LABELS["ai-news"]}</span>
                <span className={badgeClass(isAiNews)}>
                  {getCategoryCount("ai-news")}
                </span>
              </Link>

              <ul className="mt-1 ml-3 space-y-0.5 border-l border-zinc-800 pl-3">
                {subcategories.map((sub) => {
                  const href = getSubcategoryHref("ai-news", sub);
                  const subActive = pathname === href;
                  return (
                    <li key={sub}>
                      <Link
                        href={href}
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
                      </Link>
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
          <Link href="/" className={pillClass(isHome)}>
            <span>전체</span>
            <span className={pillBadgeClass(isHome)}>{totalPosts}</span>
          </Link>

          <Link href={getCategoryHref("by-tom")} className={pillClass(isByTom)}>
            <span>{CATEGORY_LABELS["by-tom"]}</span>
            <span className={pillBadgeClass(isByTom)}>
              {getCategoryCount("by-tom")}
            </span>
          </Link>

          <Link href={getCategoryHref("ai-news")} className={pillClass(isAiNews)}>
            <span>{CATEGORY_LABELS["ai-news"]}</span>
            <span className={pillBadgeClass(isAiNews)}>
              {getCategoryCount("ai-news")}
            </span>
          </Link>

          {subcategories.map((sub) => {
            const href = getSubcategoryHref("ai-news", sub);
            const subActive = pathname === href;
            return (
              <Link
                key={sub}
                href={href}
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
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
