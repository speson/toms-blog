"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdUnitProps {
  slot: string;
  className?: string;
}

/**
 * Manual AdSense display unit. The adsbygoogle.js loader is injected once in
 * app/layout.tsx, so this component only renders the slot and requests a
 * fill. min-height reserves space up front so a late-loading ad doesn't
 * shift the content around it (CLS). Renders nothing outside production —
 * ads never fill on localhost and the empty frame just adds noise in dev.
 */
export function AdUnit({ slot, className }: AdUnitProps) {
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
        className="adsbygoogle"
        style={{ display: "block", minHeight: 280 }}
        data-ad-client="ca-pub-4618270821118962"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
