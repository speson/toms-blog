import * as fs from "fs";
import * as path from "path";

// Load .env.local manually (not in Next.js runtime)
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2].trim();
    }
  }
}

import { generateThumbnail } from "../lib/thumbnail";

const posts = [
  {
    title: "Anthropic, Vercept 인수: Claude의 컴퓨터 사용 능력 강화",
    slug: "anthropic-acquires-vercept",
    description:
      "Anthropic이 AI 비전 및 인터랙션 전문 스타트업 Vercept를 인수했습니다. Claude의 컴퓨터 사용 기능이 15%에서 72.5%로 향상된 비결과 앞으로의 계획.",
    tags: ["Anthropic", "Claude", "Vercept", "인수", "컴퓨터 사용"],
  },
  {
    title: "Gemini 3.1 Flash-Lite: 가장 빠르고 저렴한 Gemini 3 모델",
    slug: "gemini-3-1-flash-lite",
    description:
      "입력 $0.25/1M 토큰, 출력 $1.50/1M 토큰. 2.5 Flash보다 2.5배 빠른 TTFT, 45% 빠른 출력 속도. 대규모 워크로드를 위한 Google의 새 AI 모델.",
    tags: ["Google", "Gemini", "AI", "언어 모델", "가격"],
  },
  {
    title: "GPT-5.3 Instant: 더 자연스럽고 덜 거부하는 ChatGPT",
    slug: "gpt-5-3-instant",
    description:
      "GPT-5.3 Instant는 불필요한 거부를 26.8% 줄이고, 오버형(cringe) 톤을 개선하며, 환각을 22.5% 감소시켰습니다. 벤치마크가 아닌 실제 사용 경험에 집중한 업데이트.",
    tags: ["OpenAI", "GPT-5.3", "ChatGPT", "AI", "언어 모델"],
  },
  {
    title: "Vercel agent-browser --native: Rust로 다시 쓴 AI 브라우저 자동화",
    slug: "vercel-agent-browser-native",
    description:
      "Node.js + Playwright를 버리고 Rust 바이너리가 직접 CDP를 제어합니다. 메모리 사용량 감소, 속도 향상, AI 에이전트를 위한 최적화된 헤드리스 브라우저 CLI.",
    tags: ["Vercel", "Rust", "브라우저 자동화", "AI", "CDP"],
  },
  {
    title: "Claude Code HTTP Hooks: 웹앱으로 AI 에이전트 제어하기",
    slug: "claude-code-http-hooks",
    description:
      "Claude Code가 HTTP Hook 기능을 추가했습니다. 커맨드 훅보다 쉽고 안전하게, 웹앱으로 AI 에이전트의 상태를 보고 권한을 관리할 수 있습니다.",
    tags: ["Claude Code", "AI", "개발도구", "Hook", "웹앱"],
  },
];

async function main() {
  console.log(`\n🎨 Generating thumbnails for ${posts.length} posts...\n`);

  for (const post of posts) {
    console.log(`⏳ ${post.slug}...`);
    const result = await generateThumbnail(post);
    if (result) {
      console.log(`   ✅ ${result}`);
    } else {
      console.log(`   ❌ Failed`);
    }
  }

  console.log("\n🎉 Done!\n");
}

main();
