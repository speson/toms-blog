# Tom's Blog - Project Context

## Overview

AI 관련 뉴스와 개발 트렌드를 다루는 기술 블로그.
Geeknews 등에서 뉴스를 수집하고, 번역/요약하여 발행하는 Semi-Manual 워크플로우.

| 항목       | 값                |
| ---------- | ----------------- |
| **Name**   | Tom's Blog        |
| **Domain** | `toms-blog.co.kr` |
| **Owner**  | @sonhyowon        |

---

## Tech Stack

| Layer           | Technology              |
| --------------- | ----------------------- |
| Framework       | Next.js 15 (App Router) |
| Language        | TypeScript              |
| Styling         | Tailwind CSS            |
| Content         | MDX + Contentlayer      |
| Package Manager | pnpm                    |
| Deployment      | Vercel (무료 티어)      |

---

## Design System

**Theme**: Dark Minimal (Vercel/Toss 스타일)

### Colors

```
Background: #000000, #0a0a0a, #18181b
Text: #fafafa (primary), #a1a1aa (secondary)
Accent: purple-500 → blue-500 gradient
Border: rgba(255,255,255,0.1)
```

### Effects

- Glassmorphism: `bg-zinc-900/50 backdrop-blur-md`
- Card: `rounded-xl border border-zinc-800`
- Hover: `hover:border-zinc-700 transition-colors`

---

## Directory Structure

```
tom-project/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx            # Home (post list)
│   ├── posts/[slug]/       # Post detail
│   └── about/              # About page
├── components/             # React components
├── content/posts/          # MDX blog posts
├── lib/                    # Utilities
│   ├── posts.ts            # Post CRUD
│   └── rss.ts              # RSS fetching
├── scripts/                # CLI scripts
│   └── fetch-news.ts       # RSS news fetcher
└── public/                 # Static assets
```

---

## Workflow (Semi-Manual)

```
1. /fetch-news              # RSS 뉴스 수집 + 리스트 표시
2. "1, 3, 5번 선택"          # 뉴스 선택
3. /publish                 # 선택된 뉴스로 포스트 발행
4. /commit --push           # 커밋 및 배포
```

---

## Commands

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `pnpm dev`        | 개발 서버 실행                     |
| `pnpm build`      | 프로덕션 빌드                      |
| `pnpm fetch-news` | RSS 뉴스 수집 (CLI)                |
| `/fetch-news`     | 뉴스 수집 + 선택 UI                |
| `/publish`        | 선택된 뉴스로 포스트 발행          |
| `/commit`         | Conventional Commits 형식으로 커밋 |
| `/commit --push`  | 커밋 후 자동 push                  |

---

## Commit Convention

**Format**: `[type](scope): description`

| Type       | Description      |
| ---------- | ---------------- |
| `feat`     | 새로운 기능      |
| `fix`      | 버그 수정        |
| `docs`     | 문서 수정        |
| `style`    | 스타일/포맷 변경 |
| `refactor` | 리팩토링         |
| `chore`    | 빌드/설정 변경   |

상세 가이드: `.claude/commands/commit.md`

---

## Plans & Documentation

| Document                                      | Description            |
| --------------------------------------------- | ---------------------- |
| `.claude/plans/00-overview.md`                | 전체 프로젝트 개요     |
| `.claude/plans/01-blog-pipeline.md`           | 블로그 파이프라인 상세 |
| `.claude/plans/04-blog-mvp-implementation.md` | **MVP 구현 플랜**      |

---

## Important Notes

- **비용**: $0 (Vercel 무료 티어 + vercel.app 도메인)
- **다크 모드 기본**: 라이트 모드 토글은 MVP 이후
- **SEO**: 메타 태그, OG 이미지, sitemap.xml 필수
- **Font**: Geist 또는 Pretendard + Inter
