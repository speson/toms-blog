/**
 * AdSense placement config. Every manual placement reads its slot id from a
 * NEXT_PUBLIC_* env var (inlined at build time) and falls back to the
 * original bottom-of-post display slot until a dedicated unit is created in
 * AdSense. Auto ads are intentionally NOT enabled anywhere.
 */
export const AD_CLIENT = "ca-pub-4618270821118962";

/** Original bottom-of-post display unit. Never changes. */
export const DEFAULT_AD_SLOT = "9202055798";

export const AD_SLOTS = {
  bottom: DEFAULT_AD_SLOT,
  inArticle: process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE || DEFAULT_AD_SLOT,
  sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || DEFAULT_AD_SLOT,
  inFeed: process.env.NEXT_PUBLIC_AD_SLOT_IN_FEED || DEFAULT_AD_SLOT,
} as const;

/** In-feed layout key AdSense issues with an In-feed unit (data-ad-layout-key). */
export const AD_IN_FEED_LAYOUT_KEY =
  process.env.NEXT_PUBLIC_AD_IN_FEED_LAYOUT_KEY || "";

/** Max in-body (in-article) ads per post, excluding the bottom ad. */
export const MAX_IN_ARTICLE_ADS = 3;
/** After the intro ad, one more ad before every Nth H2 (H2 #3, #5, ...). */
export const IN_ARTICLE_H2_INTERVAL = 2;
/** Insert one in-feed ad after every N post cards on list pages. */
export const IN_FEED_EVERY_N_POSTS = 6;
