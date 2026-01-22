# Blog MVP Implementation Plan

## Project Summary

| Item | Value |
|------|-------|
| **Name** | Tom's Blog |
| **Domain** | `toms-blog.vercel.app` (무료) |
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS |
| **Content** | MDX (로컬 파일) |
| **Design** | Dark Minimal (Vercel/Toss 스타일) |
| **Cost** | $0 |

---

## Workflow (Semi-Manual)

```
1. 사용자: `pnpm fetch-news` 실행
2. 시스템: RSS에서 최신 뉴스 수집 → 터미널에 출력
3. 사용자: "이거 번역해줘" (Claude Code에게 요청)
4. Claude Code: 번역/요약 결과 제공
5. 사용자: 검토 후 "발행해줘"
6. 시스템: MDX 파일 생성 → Git push → Vercel 자동 배포
```

---

## Tech Stack Decisions

| Layer | Choice | Reason |
|-------|--------|--------|
| **Framework** | Next.js 15 | App Router, RSC, 최신 |
| **Language** | TypeScript | 타입 안정성 |
| **Styling** | Tailwind CSS | 빠른 개발, 유지보수 |
| **Content** | MDX + contentlayer | 마크다운 + React 컴포넌트 |
| **Package Manager** | pnpm | 빠름, 디스크 효율 |
| **Linting** | ESLint + Prettier | 코드 품질 |
| **Deployment** | Vercel | 무료, 자동 배포 |

---

## Feature Scope

### MVP (Must Have)
- [x] 프로젝트 셋업 (Next.js, TypeScript, Tailwind)
- [ ] 블로그 홈페이지 (포스트 목록)
- [ ] 포스트 상세 페이지
- [ ] RSS 뉴스 수집 CLI 스크립트
- [ ] MDX 콘텐츠 시스템
- [ ] 기본 SEO (메타 태그, OG 이미지)
- [ ] Vercel 배포

### Nice to Have (Later)
- [ ] 라이트 모드 토글 (다크 기본)
- [ ] RSS 피드 제공
- [ ] 검색 기능
- [ ] 태그 필터링
- [ ] 조회수 카운터

### Out of Scope
- [ ] 댓글 시스템
- [ ] 뉴스레터
- [ ] Google AdSense
- [ ] 다국어 지원

---

## Directory Structure

```
tom-project/
├── .github/
│   └── workflows/
│       └── ci.yml              # (optional) lint/type check
│
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home (post list)
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx        # Post detail
│   ├── about/
│   │   └── page.tsx            # About page
│   └── globals.css             # Global styles
│
├── components/
│   ├── Header.tsx              # Navigation
│   ├── Footer.tsx              # Footer
│   ├── PostCard.tsx            # Post preview card
│   ├── PostList.tsx            # Post list container
│   └── MDXComponents.tsx       # Custom MDX components
│
├── content/
│   └── posts/                  # MDX blog posts
│       └── example-post.mdx
│
├── lib/
│   ├── posts.ts                # Post CRUD utilities
│   └── rss.ts                  # RSS fetching
│
├── scripts/
│   └── fetch-news.ts           # CLI: Fetch RSS news
│
├── public/
│   ├── favicon.ico
│   └── og-image.png            # Default OG image
│
├── contentlayer.config.ts      # Contentlayer config
├── next.config.ts              # Next.js config
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json
├── package.json
└── .env.local                  # (empty for now)
```

---

## Task Breakdown

### Phase 1: Project Setup (Day 1)

| # | Task | Est. | Dependencies |
|---|------|------|--------------|
| 1.1 | Next.js 프로젝트 생성 (pnpm create next-app) | 5min | - |
| 1.2 | 불필요한 보일러플레이트 정리 | 10min | 1.1 |
| 1.3 | Tailwind CSS 설정 확인/커스텀 | 10min | 1.1 |
| 1.4 | ESLint + Prettier 설정 | 15min | 1.1 |
| 1.5 | 프로젝트 구조 생성 (폴더들) | 5min | 1.2 |

### Phase 2: Content System (Day 1-2)

| # | Task | Est. | Dependencies |
|---|------|------|--------------|
| 2.1 | Contentlayer 설치 및 설정 | 20min | 1.x |
| 2.2 | Post 스키마 정의 (frontmatter) | 15min | 2.1 |
| 2.3 | 샘플 MDX 포스트 작성 | 10min | 2.2 |
| 2.4 | lib/posts.ts 유틸리티 함수 | 20min | 2.2 |
| 2.5 | MDX 컴포넌트 커스텀 (코드 하이라이팅 등) | 30min | 2.2 |

### Phase 3: Pages & Components (Day 2-3)

| # | Task | Est. | Dependencies |
|---|------|------|--------------|
| 3.1 | Header 컴포넌트 | 20min | 1.x |
| 3.2 | Footer 컴포넌트 | 10min | 1.x |
| 3.3 | PostCard 컴포넌트 | 20min | 2.x |
| 3.4 | 홈페이지 (포스트 목록) | 30min | 3.3, 2.4 |
| 3.5 | 포스트 상세 페이지 | 30min | 2.x, 3.x |
| 3.6 | About 페이지 | 15min | 3.1, 3.2 |
| 3.7 | 404 페이지 | 10min | 3.x |

### Phase 4: RSS & CLI (Day 3)

| # | Task | Est. | Dependencies |
|---|------|------|--------------|
| 4.1 | lib/rss.ts - RSS 파싱 함수 | 30min | 1.x |
| 4.2 | scripts/fetch-news.ts CLI | 30min | 4.1 |
| 4.3 | package.json 스크립트 추가 | 5min | 4.2 |
| 4.4 | CLI 테스트 및 출력 포맷 정리 | 20min | 4.2 |

### Phase 5: SEO & Polish (Day 3-4)

| # | Task | Est. | Dependencies |
|---|------|------|--------------|
| 5.1 | 메타데이터 설정 (title, description) | 20min | 3.x |
| 5.2 | OG 이미지 기본값 설정 | 15min | 5.1 |
| 5.3 | sitemap.xml 생성 | 20min | 3.x |
| 5.4 | robots.txt 설정 | 5min | - |
| 5.5 | 반응형 디자인 점검 | 30min | 3.x |
| 5.6 | Lighthouse 점수 체크 | 20min | 5.x |

### Phase 6: Deployment (Day 4)

| # | Task | Est. | Dependencies |
|---|------|------|--------------|
| 6.1 | Vercel 프로젝트 연결 | 10min | 5.x |
| 6.2 | 환경변수 설정 (필요시) | 5min | 6.1 |
| 6.3 | 첫 배포 및 확인 | 15min | 6.2 |
| 6.4 | 도메인 확인 (toms-blog.vercel.app) | 5min | 6.3 |

---

## Estimated Timeline

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Phase 1: Setup | 0.5 day | Day 1 |
| Phase 2: Content | 1 day | Day 2 |
| Phase 3: Pages | 1 day | Day 3 |
| Phase 4: RSS/CLI | 0.5 day | Day 3 |
| Phase 5: SEO | 0.5 day | Day 4 |
| Phase 6: Deploy | 0.5 day | Day 4 |
| **Total** | **~4 days** | |

---

## Post Schema (Frontmatter)

```yaml
---
title: "포스트 제목"
description: "포스트 설명 (SEO)"
date: "2026-01-22"
tags: ["AI", "LLM", "번역"]
source: "geeknews"  # geeknews | github | original
sourceUrl: "https://..."  # 원문 링크 (번역글인 경우)
draft: false
---
```

---

## RSS Sources

### Geeknews
- URL: `https://news.hada.io/rss/news`
- Format: Atom
- Fields: title, link, content, published, author

### GitHub Releases (Phase 2)
- URL Pattern: `https://github.com/{owner}/{repo}/releases.atom`
- Target repos (예시):
  - vercel/next.js
  - anthropics/anthropic-sdk-python
  - openai/openai-node

---

## CLI Usage

```bash
# RSS 뉴스 수집
pnpm fetch-news

# 특정 소스만
pnpm fetch-news --source geeknews
pnpm fetch-news --source github

# 최근 N개만
pnpm fetch-news --limit 5

# 출력 예시
┌─────────────────────────────────────────────────────────────┐
│ [1] Show GN: 전자책 검색기                                   │
│     Source: geeknews                                        │
│     Date: 2026-01-22                                        │
│     URL: https://news.hada.io/topic?id=26039                │
│     Summary: 전자책 검색과 대출이 불편해서 만들었습니다...     │
└─────────────────────────────────────────────────────────────┘
```

---

## Design Guidelines

### Design Style
- **Theme**: Dark Minimal (Vercel/Toss 스타일)
- **Concept**: 모던 SaaS, 글래스모피즘, 서틀 그라데이션

### Typography
- Font: Geist (Vercel 공식) 또는 Pretendard (한글) + Inter (영문)
- Heading: Bold, large, clear hierarchy
- Body: 16px, line-height 1.8 (가독성 강화)

### Colors (Dark Mode)
```
Background
- Primary: #000000 (순수 검정)
- Secondary: #0a0a0a (약간 밝은 검정)
- Card: #18181b (zinc-900)

Text
- Primary: #fafafa (zinc-50) - 제목
- Secondary: #a1a1aa (zinc-400) - 본문
- Muted: #71717a (zinc-500) - 부가 정보

Accent
- Primary: #a855f7 → #3b82f6 (purple-500 → blue-500 그라데이션)
- Hover: #c084fc (purple-400)

Border
- Default: rgba(255, 255, 255, 0.1)
- Hover: rgba(255, 255, 255, 0.2)
```

### Effects
- **Glassmorphism**: `bg-zinc-900/50 backdrop-blur-md`
- **Card border**: `border border-zinc-800 hover:border-zinc-700`
- **Gradient text**: `bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent`
- **Subtle glow**: `shadow-[0_0_15px_rgba(168,85,247,0.15)]`
- **Transitions**: `transition-all duration-200`

### Layout
- Max width: 768px (content), 1200px (full width sections)
- Padding: 16px (mobile), 24px (tablet), 48px (desktop)
- Card style: rounded-xl, subtle border, backdrop-blur
- Spacing: generous whitespace (Vercel 스타일)

### Component Examples

```tsx
// Card 스타일
<div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-6 hover:border-zinc-700 transition-colors">

// Gradient heading
<h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">

// Subtle button
<button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors">

// Tag/Badge
<span className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
```

---

## Tailwind Configuration Notes

```ts
// tailwind.config.ts
export default {
  darkMode: 'class', // 나중에 토글 추가 시 필요
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Pretendard', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        // 필요시 커스텀 색상 추가
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom right, #a855f7, #3b82f6)',
      },
    },
  },
}
```

---

## Success Criteria

| Criteria | Target |
|----------|--------|
| 빌드 성공 | ✅ No errors |
| Lighthouse Performance | > 90 |
| Lighthouse SEO | > 90 |
| 반응형 | Mobile + Desktop |
| RSS 수집 | Geeknews 동작 |
| 배포 | Vercel live |

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Contentlayer 호환성 | 대안: next-mdx-remote |
| 폰트 로딩 느림 | next/font 사용 |
| OG 이미지 생성 복잡 | 기본 이미지로 시작 |
