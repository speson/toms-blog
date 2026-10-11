"use client";

import { useEffect, useRef } from "react";
import { AD_CLIENT, AD_IN_FEED_LAYOUT_KEY, AD_SLOTS } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdVariant = "display" | "in-article" | "in-feed" | "sidebar";

interface AdUnitProps {
  slot: string;
  className?: string;
  /** "display" (default) keeps the original responsive bottom-ad markup. */
  variant?: AdVariant;
  /** Tailwind classes for the reserved height on the <ins> (CLS guard). */
  reserveClassName?: string;
}

/**
 * Manual AdSense display unit. The adsbygoogle.js loader is injected once in
 * app/layout.tsx, so this component only renders the slot and requests a
 * fill. min-height reserves space up front so a late-loading ad doesn't
 * shift the content around it (CLS). Renders nothing outside production —
 * ads never fill on localhost and the empty frame just adds noise in dev.
 */
export function AdUnit({
  slot,
  className,
  variant = "display",
  reserveClassName,
}: AdUnitProps) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const ins = insRef.current;
    // data-ad-status is set by AdSense once a slot is processed; pushing
    // again for the same element throws, so skip if already handled.
    if (!ins || ins.getAttribute("data-ad-status")) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle throws on double-fill or blocked loader; never break the page over an ad
    }
  }, []);

  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <div className={className}>
      <p className="mb-1 text-center text-xs text-zinc-600">광고</p>
      <ins
        ref={insRef}
        className={`adsbygoogle ${reserveClassName ?? ""}`.trim()}
        style={
          reserveClassName
            ? { display: "block" }
            : { display: "block", minHeight: 280 }
        }
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        {...adFormatProps(variant, slot)}
      />
    </div>
  );
}

/**
 * Format attributes per placement. Dedicated formats (fluid in-article /
 * in-feed) are only used once a matching unit id is configured; while the
 * slot still falls back to the display unit we keep display markup, since
 * a display unit can't serve the fluid in-article/in-feed formats.
 */
function adFormatProps(variant: AdVariant, slot: string) {
  const display = {
    "data-ad-format": "auto",
    "data-full-width-responsive": "true",
  };
  if (variant === "in-article" && slot !== AD_SLOTS.bottom) {
    return {
      "data-ad-format": "fluid",
      "data-ad-layout": "in-article",
      style: { display: "block", textAlign: "center" as const },
    };
  }
  if (
    variant === "in-feed" &&
    slot !== AD_SLOTS.bottom &&
    AD_IN_FEED_LAYOUT_KEY
  ) {
    return {
      "data-ad-format": "fluid",
      "data-ad-layout-key": AD_IN_FEED_LAYOUT_KEY,
    };
  }
  if (variant === "sidebar") {
    // fixed-width column: let AdSense pick a size that fits 300px
    return { "data-ad-format": "rectangle, vertical" };
  }
  return display;
}

/** In-body ad inserted by lib/rehype/in-article-ads.ts (via MDX components). */
export function InArticleAd() {
  return (
    <AdUnit
      slot={AD_SLOTS.inArticle}
      variant="in-article"
      className="not-prose my-10"
      reserveClassName="min-h-[280px] md:min-h-[250px]"
    />
  );
}

/** Desktop-only sticky right-gutter ad (rendered inside the xl aside). */
export function SidebarAd() {
  return (
    <AdUnit
      slot={AD_SLOTS.sidebar}
      variant="sidebar"
      className="hidden w-[300px] xl:block"
      reserveClassName="min-h-[250px] w-[300px]"
    />
  );
}

/** In-feed ad between post cards on list/category pages. */
export function InFeedAd() {
  return (
    <AdUnit
      slot={AD_SLOTS.inFeed}
      variant="in-feed"
      className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
      reserveClassName="min-h-[250px] sm:min-h-[160px]"
    />
  );
}
