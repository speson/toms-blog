# Blog Pipeline - Technical Specification

## Overview

AI 관련 뉴스와 라이브러리 업데이트를 자동으로 수집, 번역, 발행하는 기술 블로그.

---

## Data Sources

### 1. Geeknews (GeekNews)

- **URL**: `https://news.hada.io/rss/news`
- **Method**: Atom RSS Feed (ToS 준수)
- **Fields**: title, link, author, published, content (summary)
- **Frequency**: 매일 수집

### 2. GitHub Releases (Library Updates)

- **URL**: `https://github.com/{owner}/{repo}/releases.atom`
- **Method**: Atom RSS Feed
- **Target Repos**:
  - anthropics/anthropic-sdk-python
  - openai/openai-python
  - langchain-ai/langchain
  - vercel/next.js
  - (추가 가능)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS APP (VERCEL)                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   /app (Blog Frontend)                                      │
│   ├── page.tsx              # 홈 (포스트 목록)              │
│   ├── posts/[slug]/page.tsx # 개별 포스트                   │
│   └── feed.xml/route.ts     # RSS 피드 제공                 │
│                                                             │
│   /app/api (Automation)                                     │
│   ├── cron/blog/route.ts    # 매일 실행 (Vercel Cron)       │
│   └── generate/route.ts     # 수동 트리거용                 │
│                                                             │
│   /lib (Core Logic)                                         │
│   ├── rss.ts                # RSS 파싱                      │
│   ├── claude.ts             # 번역/요약                     │
│   ├── content.ts            # MDX 생성                      │
│   └── db.ts                 # Vercel KV                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Pipeline Flow

```
1. COLLECT (RSS Fetcher)
   ├── Fetch Geeknews RSS
   ├── Fetch GitHub Release feeds
   ├── Deduplicate against KV (processed IDs)
   └── Output: Array<RawArticle>

2. PROCESS (Claude API)
   ├── Translate title → Korean
   ├── Summarize content (2-3 paragraphs)
   ├── Add Korean developer perspective/insight
   ├── Generate SEO metadata
   └── Output: Array<ProcessedArticle>

3. PUBLISH (Content Generator)
   ├── Generate MDX file
   ├── Save to /content/posts/
   ├── Git commit & push (or direct to Vercel KV)
   └── Output: Published post URLs

4. INDEX (SEO)
   ├── Update sitemap.xml
   ├── Ping Google Search Console
   └── Output: Indexed URLs
```

---

## Data Models

```typescript
// Raw article from RSS
interface RawArticle {
  id: string;
  source: "geeknews" | "github";
  title: string;
  link: string;
  content: string;
  author?: string;
  published: Date;
}

// Processed article after Claude
interface ProcessedArticle {
  slug: string;
  title: string; // Korean
  originalTitle: string; // Original
  summary: string; // Korean, 2-3 paragraphs
  insight: string; // Korean developer perspective
  sourceUrl: string;
  source: "geeknews" | "github";
  tags: string[];
  publishedAt: Date;
  createdAt: Date;
}

// Stored in Vercel KV
interface KVSchema {
  "processed:{id}": boolean; // Dedup
  "post:{slug}": ProcessedArticle; // Post data
  "posts:list": string[]; // All slugs
}
```

---

## Claude Prompt Template

```markdown
You are a Korean tech blogger translating and summarizing AI/dev news.

## Input

- Title: {title}
- Content: {content}
- Source: {source}

## Output (JSON)

{
"title": "한국어 제목 (SEO 최적화)",
"summary": "2-3 문단 요약. 핵심 내용 + 왜 중요한지.",
"insight": "한국 개발자 관점의 인사이트 1-2문장",
"tags": ["AI", "LLM", ...] // 3-5개
}

## Rules

- 자연스러운 한국어 사용
- 기술 용어는 원문 유지 (예: LLM, API, Claude)
- 과장 없이 팩트 중심
- 한국 개발자에게 유용한 관점 추가
```

---

## Vercel Cron Configuration

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/blog",
      "schedule": "0 0 * * *" // 매일 00:00 UTC (09:00 KST)
    }
  ]
}
```

---

## Environment Variables

```env
# .env.local
ANTHROPIC_API_KEY=sk-ant-...
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
BLOB_READ_WRITE_TOKEN=...
CRON_SECRET=...  # Vercel Cron 인증용
```

---

## MVP Scope (Week 1-2)

### Must Have

- [ ] RSS 수집 (Geeknews)
- [ ] Claude 번역/요약
- [ ] 블로그 UI (기본)
- [ ] Vercel Cron 자동 실행
- [ ] 중복 방지 (KV)

### Nice to Have

- [ ] GitHub Releases 수집
- [ ] RSS 피드 제공
- [ ] 다크 모드
- [ ] 검색 기능

### Out of Scope (Later)

- [ ] 댓글 시스템
- [ ] 뉴스레터
- [ ] Google AdSense

---

## File Structure

```
tom-project/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── api/
│   │   ├── cron/
│   │   │   └── blog/
│   │   │       └── route.ts
│   │   └── generate/
│   │       └── route.ts
│   └── feed.xml/
│       └── route.ts
├── lib/
│   ├── rss.ts
│   ├── claude.ts
│   ├── content.ts
│   └── db.ts
├── components/
│   ├── PostCard.tsx
│   ├── PostList.tsx
│   └── Header.tsx
├── content/
│   └── posts/
│       └── *.mdx
├── vercel.json
├── package.json
└── .env.local
```

---

## Success Metrics

| Metric            | Target (Month 1) |
| ----------------- | ---------------- |
| Posts/week        | 7+ (daily)       |
| Page views        | 1,000+           |
| Bounce rate       | < 70%            |
| Avg. time on page | > 1 min          |

---

## Risks & Mitigations

| Risk                 | Impact      | Mitigation                |
| -------------------- | ----------- | ------------------------- |
| Claude API 비용 초과 | 예산 초과   | 일일 한도 설정, 캐싱      |
| Geeknews RSS 변경    | 수집 실패   | 에러 알림, 백업 소스      |
| Vercel 10초 타임아웃 | 생성 실패   | 배치 크기 제한 (3개/실행) |
| 저품질 번역          | 신뢰도 하락 | 프롬프트 튜닝, 수동 검수  |
