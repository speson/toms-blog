---
description: 선택된 뉴스로 블로그 포스트 작성
scope: project
version: 1.0.0
---

# 포스트 발행

선택된 뉴스를 기반으로 MDX 블로그 포스트를 작성합니다.

## 사용 방법

```
/publish              # 대화에서 선택된 뉴스로 발행
/publish --draft      # 초안으로 저장 (draft: true)
```

인자: `${ARGUMENTS}`

---

## 전제 조건

**반드시 `/fetch-news`로 뉴스를 선택한 후 실행해야 합니다.**

선택된 뉴스가 없으면:
```
⚠️ 선택된 뉴스가 없습니다.
먼저 /fetch-news를 실행하고 뉴스를 선택하세요.
```

---

## Step 1: 선택된 뉴스 확인

대화 컨텍스트에서 선택된 뉴스 항목들을 확인합니다.

---

## Step 2: 포스트 유형 결정

### 단일 뉴스 (1개 선택)
- 해당 뉴스의 번역/요약 포스트 작성
- 제목: 원문 제목 번역

### 복수 뉴스 (2개 이상 선택)
- 뉴스 모음 형식의 포스트 작성
- 제목: "AI 뉴스 모음 - YYYY년 M월 D일" 형식

---

## Step 3: 포스트 내용 작성

### 단일 뉴스 포스트 템플릿

```mdx
---
title: "번역된 제목"
description: "1-2문장 요약"
date: "YYYY-MM-DD"
tags: ["AI", "관련태그"]
source: "geeknews" 또는 "github"
sourceUrl: "원문 URL"
draft: false
---

## 요약

핵심 내용 3-5문장 요약

## 주요 내용

### 섹션 1
내용...

### 섹션 2
내용...

## 원문 링크

- [원문 제목](원문URL)
```

### 복수 뉴스 포스트 템플릿

```mdx
---
title: "AI 뉴스 모음 - YYYY년 M월 D일"
description: "오늘의 AI/개발 뉴스 N개를 정리했습니다."
date: "YYYY-MM-DD"
tags: ["AI", "뉴스", "정리"]
source: "curated"
draft: false
---

오늘의 AI/개발 관련 뉴스를 정리했습니다.

## 1. 첫 번째 뉴스 제목

> 원문 요약 또는 핵심 내용

### 주요 포인트
- 포인트 1
- 포인트 2

[원문 보기](URL)

---

## 2. 두 번째 뉴스 제목

> 원문 요약

### 주요 포인트
- 포인트 1
- 포인트 2

[원문 보기](URL)

---

(반복...)
```

---

## Step 4: 파일명 생성

파일명 규칙:
- 형식: `content/posts/{slug}.mdx`
- slug: 날짜-키워드 조합 (영문, kebab-case)

예시:
- 단일: `2026-01-23-openai-gpt-5-release.mdx`
- 복수: `2026-01-23-ai-news-roundup.mdx`

---

## Step 5: 파일 저장

```bash
# 파일 경로 확인
ls content/posts/
```

MDX 파일을 `content/posts/` 디렉토리에 저장합니다.

---

## Step 6: 빌드 검증

```bash
pnpm build
```

빌드가 성공하면 완료 메시지:

```
✅ 포스트 발행 완료!

📄 파일: content/posts/{slug}.mdx
🔗 URL: /posts/{slug}

다음 단계:
- pnpm dev 로 미리보기
- /commit 으로 커밋
- /commit --push 로 배포
```

---

## Step 7: 커밋 제안

발행 후 자동으로 커밋 여부를 묻습니다:

```
💾 커밋할까요? (y/n)
```

`y` 응답 시 `/commit` 명령 실행과 동일하게 처리합니다.

---

## 옵션

| 옵션 | 설명 |
|------|------|
| `--draft` | 초안으로 저장 (draft: true), 사이트에 노출되지 않음 |

---

## 작성 가이드라인

### 번역 원칙
- 자연스러운 한국어로 의역
- 기술 용어는 영문 병기 (예: "대규모 언어 모델(LLM)")
- 고유명사는 원문 유지 (예: OpenAI, Claude)

### 태그 규칙
- 최대 5개
- 소문자, 한글 또는 영문
- 일관된 태그 사용: AI, LLM, OpenAI, 오픈소스, 개발도구 등

### 내용 구성
- 핵심 먼저 (inverted pyramid)
- 불릿 포인트 적극 활용
- 코드 블록은 필요한 경우만
