import { withContentlayer } from "next-contentlayer2";
import type { NextConfig } from "next";

const TRACKER = "/posts/2026-02-19-claude-code-one-month-tracker";
const OMO_EVOLUTION = "/posts/2026-02-19-oh-my-opencode-evolution";
const OPENCODE_ROUNDUP = "/posts/2026-02-19-opencode-releases-roundup";

// Unpublished (draft:true) posts -> canonical hub for the same subject.
// 308 permanent, so link equity and crawl history fold into the roundup,
// entity, or category page instead of going 404.
const POST_REDIRECTS: Record<string, string> = {
  // Single-version Claude Code posts within the one-month tracker's range
  // (v2.1.16–v2.1.47).
  "2026-01-23-claude-code-v2116": TRACKER,
  "2026-01-25-claude-code-v2119": TRACKER,
  "2026-02-05-claude-code-v2130": TRACKER,
  "2026-02-05-claude-code-v2131": TRACKER,
  "2026-02-12-claude-code-v2139": TRACKER,
  "2026-02-13-claude-code-v2141": TRACKER,
  "2026-02-19-claude-code-v2147": TRACKER,
  // Later serial version-bump posts -> entity hubs.
  "2026-03-30-claude-code-v2183-85": "/entities/claude-code",
  "2026-04-01-claude-code-v2186-87": "/entities/claude-code",
  "2026-04-06-claude-code-v2190-92": "/entities/claude-code",
  "2026-04-16-claude-code-v21108-110": "/entities/claude-code",
  "2026-04-27-claude-code-v21118-120": "/entities/claude-code",
  "2026-06-01-claude-code-v21157-159": "/entities/claude-code",
  "2026-01-25-oh-my-opencode-v3": OMO_EVOLUTION,
  "2026-01-28-oh-my-opencode-v314": OMO_EVOLUTION,
  "2026-01-29-oh-my-opencode-v317": OMO_EVOLUTION,
  "2026-02-03-oh-my-opencode-v3-2-2": OMO_EVOLUTION,
  "2026-02-05-oh-my-opencode-v323": OMO_EVOLUTION,
  "2026-02-12-oh-my-opencode-v350": OMO_EVOLUTION,
  "2026-02-03-opencode-v1-1-49": OPENCODE_ROUNDUP,
  "2026-02-12-opencode-v1160": OPENCODE_ROUNDUP,
  "2026-03-30-opencode-v132-133": "/entities/opencode",
  "2026-04-01-opencode-v135-137": "/entities/opencode",
  "2026-04-06-opencode-v1315-1317": "/entities/opencode",
  "2026-04-14-opencode-v140-143": "/entities/opencode",
  // Thin single-source news posts -> the entity/category their topic belongs to.
  "2026-01-23-ai-codemod-refactoring": "/categories/ai-news",
  "2026-01-23-ai-destroys-institutions": "/categories/ai-news",
  "2026-01-23-claude-new-constitution": "/entities/anthropic",
  "2026-01-23-nano-banana-naming": "/entities/gemini",
  "2026-01-23-openai-postgresql-scaling": "/entities/openai",
  "2026-01-23-tldraw-closes-external-prs": "/categories/ai-news",
  "2026-01-25-google-personal-intelligence": "/entities/google",
  "2026-01-25-openai-codex-agent-loop": "/entities/codex",
  "2026-01-26-gpt5-for-work-report": "/entities/gpt-5",
  "2026-01-26-praktika-ai-language-learning": "/categories/ai-news",
  "2026-01-28-google-ai-plus-global": "/entities/google",
  "2026-01-28-google-search-ai-mode": "/entities/google",
  "2026-01-28-openai-eu-blueprint": "/entities/openai",
  "2026-01-29-openai-in-house-data-agent": "/entities/openai",
  "2026-01-30-google-project-genie": "/entities/google",
  "2026-02-03-openai-codex-app": "/entities/codex",
  "2026-02-13-gemini-3-deep-think": "/entities/gemini",
  "2026-02-13-gpt53-codex-spark": "/entities/codex",
  "2026-02-19-gpt52-theoretical-physics": "/entities/gpt-5",
  "2026-02-23-archy-ai-meeting-notes": "/categories/ai-news",
  "2026-03-30-gemini-31-flash-live": "/entities/gemini",
  "2026-03-30-google-lyria-3": "/entities/google",
  "2026-03-30-openai-model-spec": "/entities/openai",
  "2026-03-30-openai-safety-bug-bounty": "/entities/openai",
  "2026-04-01-neovim-012": "/categories/ai-news",
  "2026-04-06-roach-pi": "/categories/ai-news",
  "2026-04-27-gpt-5-5": "/entities/gpt-5",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async redirects() {
    return [
      ...Object.entries(POST_REDIRECTS).map(([slug, destination]) => ({
        source: `/posts/${slug}`,
        destination,
        permanent: true,
      })),
      // The near-universal "AI" tag was removed from all posts; its tag page
      // duplicated the whole-site listing.
      {
        source: "/tags/AI",
        destination: "/categories/ai-news",
        permanent: true,
      },
    ];
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
