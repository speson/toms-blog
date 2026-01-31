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

## 글쓰기 스타일

모든 포스트는 `.claude/writing-style.md`의 **Tom 스타일 가이드**를 따릅니다:

- **개인적 인사로 시작**: "안녕하세요, Tom입니다."
- **대화체 한국어 사용**: "~입니다" 대신 "~예요/해요"
- **개인 경험과 의견을 자연스럽게 녹여내기**: "제가 써본 결과", "이 부분이 특히 좋았어요"
- **이모지 마커 활용**: 💡 팁, 🎯 핵심, ⚠️ 주의

## MDX 포스트 형식 (Updated)

```mdx
---
title: "[주제] 사용 후기: [한 줄 요약]"
description: "[개인적 경험을 담은 2-3문장]"
date: "YYYY-MM-DD"
tags: ["AI", "적절한태그"]
category: "ai-news" # ai-news | updates | opensource
source: "openai" # openai | anthropic | google | geeknews | original
sourceUrl: "https://..."
draft: false
---

안녕하세요, Tom입니다.

[이번에 소개할 것]은 제가 [기간] 동안 [어떻게 사용]하고 있는 [도구/서비스]입니다.
[배경/문제상황] 때문에 찾게 되었는데, 꽤 괜찮더라고요.

## [주제]란? (그리고 제가 선택한 이유)

[간단한 설명]. [경쟁자/대안]와 비슷하지만 [차별점]이 가장 큰 장점입니다.

💡 **제가 [주제]를 선택한 이유:**

- [이유 1]
- [이유 2]

## 실제 사용해보니

### 좋았던 점

**1. [장점 1]**

[구체적인 설명 + 개인적 경험]

🎯 **팁:** [실용적인 팁]

### 아쉬웠던 점

**1. [단점 1]**

[구체적인 설명]

## 총평

[주제]는 [한 줄 평가].

💰 **[비용/효율 관련 팁]:** [구체적인 조언]

[마무리 인사/독려]

---

**원문**: [원문 제목](원문URL)

## 태그 가이드

| Source               | 기본 태그              |
| -------------------- | ---------------------- |
| openai               | AI, OpenAI             |
| anthropic            | AI, Anthropic, Claude  |
| google               | AI, Google             |
| github (claude-code) | AI, Claude, 개발도구   |
| github (opencode)    | AI, 개발도구, 오픈소스 |
| github (sdk)         | AI, SDK, 개발          |

## 완료 후 안내
```

포스트 생성 완료:

- content/posts/2024-01-23-post-slug.mdx

`pnpm dev`로 확인하거나 `/commit --push`로 배포하세요.

```

```
