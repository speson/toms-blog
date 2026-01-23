# /publish

선택된 뉴스 항목을 MDX 포스트로 발행

## 실행 단계

1. `.claude/news/` 디렉토리에서 가장 최근 뉴스 파일 찾기
2. `[x]` 체크된 항목 파싱
3. 각 항목에 대해:
   - 원문 URL에서 내용 가져오기
   - 한글로 번역 및 요약
   - MDX 포스트 생성 (`content/posts/YYYY-MM-DD-slug.mdx`)
4. 생성된 포스트 목록 표시

## MDX 포스트 형식

```mdx
---
title: "번역된 제목"
date: "YYYY-MM-DD"
summary: "1-2문장 요약"
tags: ["AI", "적절한태그"]
---

## 요약

핵심 내용 3-5문장 요약

## 주요 내용

### 섹션 1
...

### 섹션 2
...

## 원문 링크

- [원문 제목](원문URL)
```

## 태그 가이드

| Source | 기본 태그 |
|--------|----------|
| openai | AI, OpenAI |
| anthropic | AI, Anthropic, Claude |
| google | AI, Google |
| github (claude-code) | AI, Claude, 개발도구 |
| github (opencode) | AI, 개발도구, 오픈소스 |
| github (sdk) | AI, SDK, 개발 |

## 완료 후 안내

```
포스트 생성 완료:
- content/posts/2024-01-23-post-slug.mdx

`pnpm dev`로 확인하거나 `/commit --push`로 배포하세요.
```
