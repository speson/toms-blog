import { withContentlayer } from "next-contentlayer2";
import type { NextConfig } from "next";

const TRACKER = "/posts/2026-02-19-claude-code-one-month-tracker";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async redirects() {
    // Consolidated early single-version Claude Code posts -> one-month tracker
    // (the tracker covers v2.1.16–v2.1.47). 308 permanent, so link equity and
    // crawl history fold into the canonical roundup instead of competing.
    return [
      "2026-01-23-claude-code-v2116",
      "2026-01-25-claude-code-v2119",
      "2026-02-13-claude-code-v2141",
    ].map((slug) => ({
      source: `/posts/${slug}`,
      destination: TRACKER,
      permanent: true,
    }));
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  turbopack: {},
};

export default withContentlayer(nextConfig);
