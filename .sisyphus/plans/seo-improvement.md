# SEO Improvement Strategy for Tom's Blog

## TL;DR

> **Quick Summary**: Tom's Blog의 SEO를 최대화하여 검색 엔진 노출과 트래픽을 증가시킵니다. 현재 기본 SEO 인프라(OG, Twitter Cards, RSS, Sitemap)는 잘 구현되어 있으나, 한국 검색엔진 최적화(Naver/Daum)와 기술적 SEO가 부족합니다.
>
> **Deliverables**:
>
> - Naver/Google Search Console 등록 준비
> - Canonical URLs 추가
> - BlogPosting 스키마로 전환
> - 404/Error 페이지 생성
> - next.config.ts 최적화
> - Vercel Analytics 통합
> - robots.txt 한국 검색엔진 대응
>
> **Estimated Effort**: Medium (8-12개 태스크, 각 15-45분)
> **Parallel Execution**: YES - 4 Waves
> **Critical Path**: Wave 1 (메타데이터) → Wave 2 (기술 SEO) → Wave 3 (콘텐츠 SEO) → Wave 4 (Analytics)

---

## Context

### Original Request

사용자가 Tom's Blog (toms-blog.co.kr)의 SEO를 최대화하여 검색 엔진 노출 및 트래픽 증가를 요청함. 우선순위 기반 병렬 실행 가능한 태스크 그래프 설계 요청.

### Interview Summary

**Key Discussions**:

- 현재 SEO 기반 양호 (OG, Twitter, RSS, Sitemap, JSON-LD 구현됨)
- 한국 검색엔진 최적화 전무 (Naver, Daum 미등록)
- Analytics 없음 (트래픽 측정 불가)
- 404/Error 페이지 미구현

**Research Findings**:

- Next.js 15 Metadata API에서 verification 태그 지원
- viewport는 metadata와 별도 export 필요
- BlogPosting이 Article보다 블로그에 적합
- Naver는 모바일 우선 (90%+ 모바일 트래픽)
- 한국 사용자는 2초 미만 로드 타임 기대
- `<meta name="naver-site-verification" content="CODE" />` 형식

### Self-Review (Metis 대체)

**Identified Gaps** (addressed):

- Analytics 선택 미확정 → 기본값: Vercel Analytics (Next.js 네이티브)
- Search Console 등록 방식 → 기본값: 메타태그 자리 준비, 실제 코드는 환경변수로
- Reading time 추가 여부 → 기본값: 추가 (SEO 및 UX 개선)
- Related posts → 범위 외 (별도 작업으로 분리)

---

## Work Objectives

### Core Objective

Tom's Blog의 검색 엔진 가시성을 극대화하여 한국 시장(Naver, Daum)과 글로벌 검색(Google)에서 트래픽 증가

### Concrete Deliverables

1. `app/layout.tsx` - viewport export 추가, verification 메타태그
2. `app/posts/[slug]/page.tsx` - canonical URL, keywords 메타태그
3. `components/json-ld.tsx` - Article → BlogPosting 스키마 전환
4. `app/not-found.tsx` - SEO 최적화된 404 페이지
5. `app/error.tsx` - 에러 페이지
6. `next.config.ts` - 헤더, 캐싱, 보안 설정
7. `app/robots.ts` - Naver/Daum 봇 대응
8. `components/mdx-components.tsx` - 외부 링크 rel 속성 수정
9. `lib/reading-time.ts` - 읽기 시간 계산 유틸리티
10. Analytics 통합 (Vercel Analytics)

### Definition of Done

- [ ] `pnpm build` 성공 (빌드 에러 없음)
- [ ] `pnpm dev` 후 브라우저에서 SEO 메타태그 확인
- [ ] Lighthouse SEO 점수 95+ 달성
- [ ] 모든 페이지에 canonical URL 존재
- [ ] JSON-LD 스키마 Rich Results Test 통과

### Must Have

- Naver/Google verification 메타태그 자리
- Canonical URLs (모든 포스트)
- 404 페이지 (SEO 메타데이터 포함)
- BlogPosting 스키마
- viewport 명시적 export

### Must NOT Have (Guardrails)

- 기존 MDX 콘텐츠 수정 금지
- 불필요한 third-party 스크립트 추가 금지
- 과도한 메타태그 (keyword stuffing) 금지
- 사용자 계정 없이 실제 verification 코드 입력 금지
- Analytics 동의 UI 없이 tracking 금지 (GDPR/개인정보)

---

## Verification Strategy (MANDATORY)

### Test Decision

- **Infrastructure exists**: YES (Next.js build system)
- **User wants tests**: Automated verification only
- **Framework**: Build verification + Lighthouse

### Automated Verification (Agent-Executable)

**For all tasks:**

```bash
# Build verification
pnpm build

# Type checking
pnpm tsc --noEmit

# Lint
pnpm lint
```

**For SEO verification:**

```bash
# Start dev server
pnpm dev &

# Check meta tags with curl
curl -s http://localhost:3000 | grep -E "(viewport|naver-site-verification|canonical)"

# Check JSON-LD
curl -s http://localhost:3000/posts/[slug] | grep "application/ld+json"
```

**For 404 page:**

```bash
curl -s http://localhost:3000/non-existent-page-12345 | grep -E "(404|Not Found)"
```

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately) - Quick Wins:
├── Task 1: viewport export 추가 (app/layout.tsx)
├── Task 2: verification 메타태그 준비 (app/layout.tsx)
├── Task 3: canonical URL 추가 (app/posts/[slug]/page.tsx)
└── Task 4: Article → BlogPosting 스키마 전환

Wave 2 (After Wave 1) - Technical SEO:
├── Task 5: 404 not-found.tsx 생성
├── Task 6: error.tsx 생성
├── Task 7: next.config.ts 최적화
└── Task 8: robots.ts 한국 검색엔진 대응

Wave 3 (After Wave 2) - Content SEO:
├── Task 9: 외부 링크 rel 속성 수정 (mdx-components.tsx)
├── Task 10: 읽기 시간 유틸리티 추가
└── Task 11: 포스트에 읽기 시간 표시

Wave 4 (After Wave 3) - Analytics:
└── Task 12: Vercel Analytics 통합

Critical Path: Task 1-4 → Task 5-8 → Task 9-11 → Task 12
Parallel Speedup: ~60% faster than sequential
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
| ---- | ---------- | ------ | -------------------- |
| 1    | None       | 5-8    | 2, 3, 4              |
| 2    | None       | 12     | 1, 3, 4              |
| 3    | None       | None   | 1, 2, 4              |
| 4    | None       | None   | 1, 2, 3              |
| 5    | 1          | 12     | 6, 7, 8              |
| 6    | 1          | None   | 5, 7, 8              |
| 7    | 1          | 9      | 5, 6, 8              |
| 8    | 1          | None   | 5, 6, 7              |
| 9    | 7          | None   | 10, 11               |
| 10   | None       | 11     | 9                    |
| 11   | 10         | None   | 9                    |
| 12   | 2, 5       | None   | None (final)         |

### Agent Dispatch Summary

| Wave | Tasks      | Recommended Approach         |
| ---- | ---------- | ---------------------------- |
| 1    | 1, 2, 3, 4 | 병렬 실행, 각 파일 독립 수정 |
| 2    | 5, 6, 7, 8 | 병렬 실행, 새 파일 생성      |
| 3    | 9, 10, 11  | 9와 10 병렬, 11은 10 완료 후 |
| 4    | 12         | Analytics 통합 (최종)        |

---

## TODOs

### Wave 1: Quick Wins (병렬 실행)

---

- [ ] 1. viewport export 추가

  **What to do**:
  - `app/layout.tsx`에 viewport 설정 별도 export
  - themeColor, colorScheme, width, initialScale 설정
  - 기존 metadata export와 분리

  **Must NOT do**:
  - metadata 객체 내에 viewport 포함 (deprecated in Next.js 15)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 파일, 10줄 미만 변경
  - **Skills**: []
    - Reason: 기본 TypeScript 편집만 필요

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4)
  - **Blocks**: Tasks 5-8 (Wave 2)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `app/layout.tsx:16-54` - 기존 metadata export 패턴

  **External References**:
  - Next.js docs: https://nextjs.org/docs/app/api-reference/functions/generate-viewport

  **WHY Each Reference Matters**:
  - 기존 layout.tsx 구조를 유지하면서 viewport만 분리 추가

  **Acceptance Criteria**:

  ```bash
  # Agent runs:
  pnpm build
  # Assert: Exit code 0

  curl -s http://localhost:3000 | grep -o 'viewport.*width=device-width'
  # Assert: Output contains "viewport" with "width=device-width"
  ```

  **Evidence to Capture:**
  - [ ] Build 성공 로그
  - [ ] HTML head에서 viewport meta 태그 확인

  **Commit**: YES (groups with 2)
  - Message: `feat(seo): add viewport export to layout`
  - Files: `app/layout.tsx`
  - Pre-commit: `pnpm build`

---

- [ ] 2. verification 메타태그 준비

  **What to do**:
  - `app/layout.tsx` metadata에 verification 객체 추가
  - Google, Naver, Bing verification 자리 준비
  - 실제 코드는 환경변수로 (process.env.NEXT*PUBLIC*\*)
  - other 메타태그에 naver-site-verification 추가

  **Must NOT do**:
  - 하드코딩된 verification 코드 입력 (보안)
  - 없는 환경변수로 빌드 실패

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 파일, 20줄 미만 변경
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4)
  - **Blocks**: Task 12 (Analytics)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `app/layout.tsx:16-54` - 기존 metadata 구조

  **External References**:
  - Next.js Metadata verification: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#verification

  **WHY Each Reference Matters**:
  - Next.js 15 Metadata API의 verification 필드 사용법 확인

  **Acceptance Criteria**:

  ```bash
  pnpm build
  # Assert: Exit code 0 (환경변수 없어도 빌드 성공)

  curl -s http://localhost:3000 | grep -c "verification"
  # Assert: verification 관련 코드가 metadata에 존재
  ```

  **Evidence to Capture:**
  - [ ] Build 성공
  - [ ] 환경변수 설정 시 메타태그 출력 확인

  **Commit**: YES (groups with 1)
  - Message: `feat(seo): add search console verification metadata`
  - Files: `app/layout.tsx`
  - Pre-commit: `pnpm build`

---

- [ ] 3. canonical URL 추가 (포스트)

  **What to do**:
  - `app/posts/[slug]/page.tsx`의 generateMetadata에 alternates.canonical 추가
  - 포스트 URL을 canonical로 명시
  - RSS feed alternates도 추가

  **Must NOT do**:
  - 상대 경로 사용 (항상 절대 URL)
  - metadataBase 없이 절대 URL 생성

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 파일, 15줄 미만 변경
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `app/posts/[slug]/page.tsx:21-58` - 기존 generateMetadata 함수

  **External References**:
  - Next.js alternates: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#alternates

  **WHY Each Reference Matters**:
  - 기존 metadata 구조에 alternates 필드만 추가

  **Acceptance Criteria**:

  ```bash
  pnpm build
  # Assert: Exit code 0

  # 임의의 포스트 slug로 확인
  curl -s http://localhost:3000/posts/hello-world | grep -o 'rel="canonical"'
  # Assert: canonical link 태그 존재
  ```

  **Evidence to Capture:**
  - [ ] Build 성공
  - [ ] 포스트 페이지에서 canonical 태그 확인

  **Commit**: YES
  - Message: `feat(seo): add canonical URLs to posts`
  - Files: `app/posts/[slug]/page.tsx`
  - Pre-commit: `pnpm build`

---

- [ ] 4. Article → BlogPosting 스키마 전환

  **What to do**:
  - `components/json-ld.tsx`의 ArticleJsonLd를 BlogPostingJsonLd로 변경
  - @type을 "Article"에서 "BlogPosting"으로 변경
  - mainEntityOfPage, inLanguage 추가
  - articleSection (카테고리) 추가

  **Must NOT do**:
  - 기존 ArticleJsonLd 컴포넌트 삭제 (호환성)
  - 필수 필드 누락 (headline, datePublished, author)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 파일, 30줄 이내 변경
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `components/json-ld.tsx:41-79` - 기존 ArticleJsonLd 구조

  **External References**:
  - Schema.org BlogPosting: https://schema.org/BlogPosting
  - Google Rich Results Test: https://search.google.com/test/rich-results

  **WHY Each Reference Matters**:
  - BlogPosting은 Article의 하위 타입, 추가 필드 확인 필요

  **Acceptance Criteria**:

  ```bash
  pnpm build
  # Assert: Exit code 0

  curl -s http://localhost:3000/posts/hello-world | grep -o '"@type":"BlogPosting"'
  # Assert: BlogPosting 타입 존재
  ```

  **Evidence to Capture:**
  - [ ] Build 성공
  - [ ] JSON-LD에서 BlogPosting 타입 확인
  - [ ] Rich Results Test 통과 (수동 검증)

  **Commit**: YES
  - Message: `feat(seo): change Article to BlogPosting schema`
  - Files: `components/json-ld.tsx`, `app/posts/[slug]/page.tsx`
  - Pre-commit: `pnpm build`

---

### Wave 2: Technical SEO (병렬 실행)

---

- [ ] 5. 404 not-found.tsx 생성

  **What to do**:
  - `app/not-found.tsx` 생성
  - SEO 메타데이터 포함 (title, description, robots: noindex)
  - 사용자 친화적 UI (홈으로 돌아가기 링크)
  - 디자인 시스템 일관성 (dark theme)

  **Must NOT do**:
  - robots: index (404 페이지는 noindex)
  - 복잡한 로직 (단순 정적 페이지)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 새 파일 1개, 50줄 이내
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8)
  - **Blocks**: Task 12
  - **Blocked By**: Wave 1

  **References**:

  **Pattern References**:
  - `app/about/page.tsx:1-56` - 페이지 구조 및 스타일링 패턴
  - `app/layout.tsx:56-75` - 레이아웃 구조

  **External References**:
  - Next.js not-found: https://nextjs.org/docs/app/api-reference/file-conventions/not-found

  **WHY Each Reference Matters**:
  - about 페이지의 스타일링 패턴 재사용

  **Acceptance Criteria**:

  ```bash
  pnpm build
  # Assert: Exit code 0

  curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/non-existent-12345
  # Assert: HTTP 404

  curl -s http://localhost:3000/non-existent-12345 | grep -o 'noindex'
  # Assert: noindex 존재
  ```

  **Evidence to Capture:**
  - [ ] Build 성공
  - [ ] 404 상태 코드 반환
  - [ ] noindex 메타태그 확인

  **Commit**: YES (groups with 6)
  - Message: `feat(seo): add 404 not-found page with SEO metadata`
  - Files: `app/not-found.tsx`
  - Pre-commit: `pnpm build`

---

- [ ] 6. error.tsx 생성

  **What to do**:
  - `app/error.tsx` 생성 (Client Component)
  - 에러 복구 UI (다시 시도 버튼)
  - 사용자 친화적 메시지
  - 개발 모드에서 에러 상세 표시

  **Must NOT do**:
  - Server Component로 작성 (error.tsx는 Client)
  - 민감한 에러 정보 노출 (production)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 새 파일 1개, 40줄 이내
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 7, 8)
  - **Blocks**: None
  - **Blocked By**: Wave 1

  **References**:

  **Pattern References**:
  - `app/about/page.tsx` - 스타일링 패턴

  **External References**:
  - Next.js error handling: https://nextjs.org/docs/app/building-your-application/routing/error-handling

  **WHY Each Reference Matters**:
  - error.tsx는 'use client' 필수

  **Acceptance Criteria**:

  ```bash
  pnpm build
  # Assert: Exit code 0

  # error.tsx 파일 존재 확인
  ls app/error.tsx
  # Assert: 파일 존재

  grep -c "'use client'" app/error.tsx
  # Assert: 1 (use client 선언 존재)
  ```

  **Evidence to Capture:**
  - [ ] Build 성공
  - [ ] 'use client' 선언 확인

  **Commit**: YES (groups with 5)
  - Message: `feat(seo): add error boundary page`
  - Files: `app/error.tsx`
  - Pre-commit: `pnpm build`

---

- [ ] 7. next.config.ts 최적화

  **What to do**:
  - Security headers 추가 (X-Frame-Options, HSTS 등)
  - 캐싱 헤더 설정 (static, images)
  - poweredByHeader: false
  - compress: true
  - images 최적화 설정

  **Must NOT do**:
  - contentlayer 설정 제거
  - 기존 turbopack 설정 제거
  - 과도한 실험적 기능 활성화

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 파일, config 추가
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 8)
  - **Blocks**: Task 9
  - **Blocked By**: Wave 1

  **References**:

  **Pattern References**:
  - `next.config.ts:1-9` - 기존 config 구조

  **External References**:
  - Next.js config: https://nextjs.org/docs/app/api-reference/next-config-js

  **WHY Each Reference Matters**:
  - withContentlayer 래퍼 유지 필수

  **Acceptance Criteria**:

  ```bash
  pnpm build
  # Assert: Exit code 0

  curl -sI http://localhost:3000 | grep -i "x-frame-options"
  # Assert: X-Frame-Options 헤더 존재
  ```

  **Evidence to Capture:**
  - [ ] Build 성공
  - [ ] Security headers 확인

  **Commit**: YES
  - Message: `feat(seo): optimize next.config with headers and caching`
  - Files: `next.config.ts`
  - Pre-commit: `pnpm build`

---

- [ ] 8. robots.ts 한국 검색엔진 대응

  **What to do**:
  - Naver bot (Yeti) 규칙 추가
  - Daum bot (Daumoa) 규칙 추가
  - /api/ 경로 disallow
  - host 필드 추가

  **Must NOT do**:
  - 기존 규칙 삭제
  - sitemap URL 변경

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 파일, 20줄 추가
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 7)
  - **Blocks**: None
  - **Blocked By**: Wave 1

  **References**:

  **Pattern References**:
  - `app/robots.ts:1-12` - 기존 robots 구조

  **External References**:
  - Naver bot user-agent: "Yeti"
  - Daum bot user-agent: "Daumoa"

  **WHY Each Reference Matters**:
  - 한국 검색엔진 봇 이름 정확히 지정

  **Acceptance Criteria**:

  ```bash
  pnpm build
  # Assert: Exit code 0

  curl -s http://localhost:3000/robots.txt | grep -i "yeti"
  # Assert: Yeti (Naver) 규칙 존재
  ```

  **Evidence to Capture:**
  - [ ] Build 성공
  - [ ] robots.txt에서 Yeti, Daumoa 규칙 확인

  **Commit**: YES
  - Message: `feat(seo): add Korean search engine bot rules to robots.txt`
  - Files: `app/robots.ts`
  - Pre-commit: `pnpm build`

---

### Wave 3: Content SEO (부분 병렬)

---

- [ ] 9. 외부 링크 rel 속성 수정

  **What to do**:
  - `components/mdx-components.tsx`의 링크 컴포넌트 수정
  - 외부 링크 감지 로직 추가 (http로 시작하거나 다른 도메인)
  - 외부 링크에 rel="noopener noreferrer" 추가
  - target="\_blank" 추가

  **Must NOT do**:
  - 내부 링크에 noopener 적용
  - 기존 스타일 변경

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 파일, 15줄 수정
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 10)
  - **Blocks**: None
  - **Blocked By**: Task 7

  **References**:

  **Pattern References**:
  - `components/mdx-components.tsx:44-51` - 기존 링크 컴포넌트

  **WHY Each Reference Matters**:
  - 기존 Link 컴포넌트 구조 유지하면서 외부 링크 처리 추가

  **Acceptance Criteria**:

  ```bash
  pnpm build
  # Assert: Exit code 0

  # 외부 링크 처리 로직 확인
  grep -c "noopener" components/mdx-components.tsx
  # Assert: 1 이상
  ```

  **Evidence to Capture:**
  - [ ] Build 성공
  - [ ] 외부 링크에 noopener 적용 확인

  **Commit**: YES
  - Message: `fix(seo): add rel="noopener noreferrer" to external links`
  - Files: `components/mdx-components.tsx`
  - Pre-commit: `pnpm build`

---

- [ ] 10. 읽기 시간 유틸리티 추가

  **What to do**:
  - `lib/reading-time.ts` 생성
  - 한국어 기준 분당 500자 (영어는 200단어)
  - MDX 콘텐츠에서 읽기 시간 계산
  - 분 단위 반환

  **Must NOT do**:
  - 외부 라이브러리 설치 (직접 구현)
  - 과도하게 복잡한 계산

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 새 파일 1개, 20줄 이내
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 9)
  - **Blocks**: Task 11
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `lib/posts.ts` - 유틸리티 함수 패턴

  **WHY Each Reference Matters**:
  - 기존 lib 구조와 일관성 유지

  **Acceptance Criteria**:

  ```bash
  pnpm build
  # Assert: Exit code 0

  # 파일 존재 확인
  ls lib/reading-time.ts
  # Assert: 파일 존재
  ```

  **Evidence to Capture:**
  - [ ] Build 성공
  - [ ] calculateReadingTime 함수 export 확인

  **Commit**: YES (groups with 11)
  - Message: `feat(seo): add reading time utility`
  - Files: `lib/reading-time.ts`
  - Pre-commit: `pnpm build`

---

- [ ] 11. 포스트에 읽기 시간 표시

  **What to do**:
  - `app/posts/[slug]/page.tsx`에 읽기 시간 표시
  - 날짜 옆에 "X분 읽기" 형식으로 추가
  - JSON-LD schema에 timeRequired 추가 (선택)

  **Must NOT do**:
  - 기존 레이아웃 크게 변경
  - 읽기 시간 0분 표시 (최소 1분)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 파일, 10줄 수정
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (after Task 10)
  - **Blocks**: None
  - **Blocked By**: Task 10

  **References**:

  **Pattern References**:
  - `app/posts/[slug]/page.tsx:105-107` - 날짜 표시 영역

  **WHY Each Reference Matters**:
  - 날짜 옆에 자연스럽게 읽기 시간 추가

  **Acceptance Criteria**:

  ```bash
  pnpm build
  # Assert: Exit code 0

  curl -s http://localhost:3000/posts/hello-world | grep -o "[0-9]분 읽기"
  # Assert: 읽기 시간 표시 존재
  ```

  **Evidence to Capture:**
  - [ ] Build 성공
  - [ ] 포스트 페이지에서 읽기 시간 표시 확인

  **Commit**: YES (groups with 10)
  - Message: `feat(seo): display reading time on posts`
  - Files: `app/posts/[slug]/page.tsx`
  - Pre-commit: `pnpm build`

---

### Wave 4: Analytics (순차 실행)

---

- [ ] 12. Vercel Analytics 통합

  **What to do**:
  - `@vercel/analytics` 패키지 설치
  - `app/layout.tsx`에 Analytics 컴포넌트 추가
  - Web Vitals 자동 수집 활성화

  **Must NOT do**:
  - Google Analytics 동시 설치 (중복 트래킹)
  - 사용자 동의 없이 PII 수집

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 패키지 설치 + 5줄 코드
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (final)
  - **Blocks**: None
  - **Blocked By**: Tasks 2, 5

  **References**:

  **Pattern References**:
  - `app/layout.tsx:56-75` - 레이아웃 body 구조

  **External References**:
  - Vercel Analytics: https://vercel.com/docs/analytics

  **WHY Each Reference Matters**:
  - Analytics 컴포넌트는 body 내에 추가

  **Acceptance Criteria**:

  ```bash
  # 패키지 설치 확인
  grep -c "@vercel/analytics" package.json
  # Assert: 1

  pnpm build
  # Assert: Exit code 0
  ```

  **Evidence to Capture:**
  - [ ] 패키지 설치 확인
  - [ ] Build 성공
  - [ ] Vercel 대시보드에서 Analytics 활성화 확인 (배포 후)

  **Commit**: YES
  - Message: `feat(analytics): integrate Vercel Analytics`
  - Files: `package.json`, `app/layout.tsx`
  - Pre-commit: `pnpm build`

---

## Commit Strategy

| After Task | Message                                             | Files                                          | Verification |
| ---------- | --------------------------------------------------- | ---------------------------------------------- | ------------ |
| 1, 2       | `feat(seo): add viewport and verification metadata` | app/layout.tsx                                 | pnpm build   |
| 3          | `feat(seo): add canonical URLs to posts`            | app/posts/[slug]/page.tsx                      | pnpm build   |
| 4          | `feat(seo): change Article to BlogPosting schema`   | components/json-ld.tsx                         | pnpm build   |
| 5, 6       | `feat(seo): add 404 and error pages`                | app/not-found.tsx, app/error.tsx               | pnpm build   |
| 7          | `feat(seo): optimize next.config`                   | next.config.ts                                 | pnpm build   |
| 8          | `feat(seo): add Korean bot rules`                   | app/robots.ts                                  | pnpm build   |
| 9          | `fix(seo): add rel to external links`               | components/mdx-components.tsx                  | pnpm build   |
| 10, 11     | `feat(seo): add reading time`                       | lib/reading-time.ts, app/posts/[slug]/page.tsx | pnpm build   |
| 12         | `feat(analytics): integrate Vercel Analytics`       | package.json, app/layout.tsx                   | pnpm build   |

---

## Success Criteria

### Verification Commands

```bash
# Full build verification
pnpm build                    # Expected: Exit code 0

# Type checking
pnpm tsc --noEmit             # Expected: No errors

# Lint
pnpm lint                     # Expected: No errors

# Dev server test
pnpm dev &
sleep 5
curl -s http://localhost:3000 | grep "viewport"           # Expected: viewport 존재
curl -s http://localhost:3000 | grep "BlogPosting"        # Expected: BlogPosting 스키마
curl -sI http://localhost:3000 | grep "X-Frame-Options"   # Expected: 보안 헤더
curl -s http://localhost:3000/robots.txt | grep "Yeti"    # Expected: Naver bot 규칙
```

### Final Checklist

- [ ] All "Must Have" present
  - [ ] viewport export
  - [ ] verification 메타태그 자리
  - [ ] canonical URLs
  - [ ] 404 페이지
  - [ ] BlogPosting 스키마
- [ ] All "Must NOT Have" absent
  - [ ] 하드코딩된 verification 코드 없음
  - [ ] 과도한 메타태그 없음
- [ ] pnpm build 성공
- [ ] Lighthouse SEO 95+ (수동 검증)
- [ ] Rich Results Test 통과 (수동 검증)

---

## Decisions Needed from User

### 1. Analytics 선택 (Default Applied: Vercel Analytics)

현재 계획: Vercel Analytics만 통합

- 대안 1: Google Analytics 4도 함께 설치
- 대안 2: Analytics 완전히 제외

**기본값 적용 이유**: Vercel Analytics는 Next.js 네이티브이며 무료 티어에서 사용 가능

### 2. Search Console 등록 방식 (Default Applied: 환경변수)

현재 계획: verification 코드를 환경변수(NEXT*PUBLIC*\*)로 관리

- 대안: 하드코딩 (보안 위험)

**기본값 적용 이유**: 코드 공개 저장소에서 verification 코드 노출 방지

### 3. Reading Time 추가 (Default Applied: 추가)

현재 계획: 읽기 시간 표시

- 대안: 제외

**기본값 적용 이유**: SEO (timeRequired schema) 및 UX 개선

---

## Notes

- 모든 태스크는 `pnpm build` 성공을 기본 검증으로 사용
- Wave 구조를 따라 병렬 실행 시 ~60% 시간 단축 예상
- Naver Search Advisor 등록은 사용자가 직접 진행 필요 (계정 필요)
- Lighthouse 점수는 배포 후 수동 검증 권장
