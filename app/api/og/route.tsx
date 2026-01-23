import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const tagGradients: Record<string, { from: string; to: string }> = {
  AI: { from: "#7c3aed", to: "#2563eb" },
  Claude: { from: "#d946ef", to: "#7c3aed" },
  Anthropic: { from: "#d946ef", to: "#7c3aed" },
  OpenAI: { from: "#10b981", to: "#059669" },
  LLM: { from: "#8b5cf6", to: "#6366f1" },
  오픈소스: { from: "#22c55e", to: "#16a34a" },
  GitHub: { from: "#6366f1", to: "#4f46e5" },
  개발도구: { from: "#f59e0b", to: "#d97706" },
  리팩터링: { from: "#06b6d4", to: "#0891b2" },
  민주주의: { from: "#ef4444", to: "#dc2626" },
  사회: { from: "#f97316", to: "#ea580c" },
  default: { from: "#7c3aed", to: "#2563eb" },
};

function getGradient(tags: string[]): { from: string; to: string } {
  for (const tag of tags) {
    if (tagGradients[tag]) {
      return tagGradients[tag];
    }
  }
  return tagGradients.default;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Tom's Blog";
  const tags = searchParams.get("tags")?.split(",") || [];

  const gradient = getGradient(tags);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px",
        background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.1)",
        }}
      />

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {tags.slice(0, 3).map((tag, i) => (
          <div
            key={i}
            style={{
              padding: "8px 16px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "20px",
              color: "white",
              fontSize: "24px",
              fontWeight: 500,
            }}
          >
            {tag}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1
          style={{
            fontSize: title.length > 30 ? "48px" : "56px",
            fontWeight: 700,
            color: "white",
            lineHeight: 1.2,
            margin: 0,
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            wordBreak: "keep-all",
          }}
        >
          {title}
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          Tom&apos;s Blog
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          toms-blog.co.kr
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
