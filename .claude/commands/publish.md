# /publish

선택된 뉴스 항목을 MDX 포스트로 발행

## 실행 단계

1. `.claude/news/` 디렉토리에서 가장 최근 뉴스 파일 찾기
2. `[x]` 체크된 항목 파싱
3. 각 항목에 대해:
   - 원문 URL에서 내용 가져오기
   - 한글로 번역 및 요약
   - MDX 포스트 생성 (`content/posts/YYYY-MM-DD-slug.mdx`)
   - 썸네일 생성 (선택사항, 실패 시 자동 skip):
     - `generateThumbnail({ title, description, slug, tags })` 호출
     - 성공 시: frontmatter에 `thumbnail` 필드 추가
     - 실패 시: `thumbnail` 필드 생략 (OG 폴백 사용)
4. 생성된 포스트 목록 표시
5. **위키 업데이트** (자동):
   - `content/wiki/index.md` 읽어서 전체 위키 구조 파악
   - 새 포스트의 태그/소스/주제와 관련된 엔티티/토픽 위키 페이지 식별
   - 관련 위키 페이지 업데이트:
     - 엔티티 페이지: 타임라인에 새 항목 추가, `last_covered` 날짜 갱신, `post_count` 증가
     - 토픽 페이지: 관련 포스트 테이블에 추가, 핵심 포인트에 새 인사이트 반영
   - 기존 위키에 없는 새로운 엔티티/토픽이 감지되면:
     - 사용자에게 새 위키 페이지 생성 여부 확인
     - 승인 시 새 페이지 생성 + index.md에 추가
   - `content/wiki/log.md`에 인제스트 기록 추가:
     - 형식: `## [YYYY-MM-DD] ingest | [포스트 제목]`
     - 업데이트된 위키 페이지 목록
   - `content/wiki/index.md`의 포스트 수 갱신

## 글쓰기 스타일

모든 포스트는 `.claude/writing-style.md`의 Tom 스타일 가이드를 따릅니다:

- 개인적 인사로 시작: "안녕하세요, Tom입니다."
- 대화체 한국어 사용: "~입니다" 대신 "~예요/해요"
- 개인 경험과 의견을 자연스럽게 녹여내기: "제가 써본 결과", "이 부분이 특히 좋았어요"
- 이모지 절대 금지: 본문/헤딩/리스트 어디에도 이모지를 넣지 않음
- 팁/주의는 평문으로: "팁:", "주의:", "참고:" 같은 텍스트로 명시

## 이모지 금지 규칙 (필수)

포스트 본문, 헤딩, 리스트 어디에도 이모지를 절대 넣지 마세요.

- 금지: 💡 🎯 ⚠️ ✅ ❌ 🤔 💰 🚀 🔍 📝 🛠 🤖 ⚡ 🌐 (그 외 모든 이모지)
- 대신 평문으로: "팁:", "주의:", "참고:", "핵심:" 같은 텍스트 사용

이모지는 AI가 쓴 느낌을 주는 가장 큰 원인이에요. 반드시 제거하세요.

## 볼드 처리 규칙 (필수)

`**text**` 구조는 절대 사용하지 마세요. 한국어에서는 MDX 파서가 제대로 치환하지 못하는 경우가 많아요.

볼드가 필요하면 반드시 `<strong>text</strong>` HTML 태그를 사용하세요.

- ❌ `**핵심 기능**`
- ✅ `<strong>핵심 기능</strong>`

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
thumbnail: "/thumbnails/{slug}.png" # Optional: AI-generated thumbnail, omitted if generation fails
draft: false
---

안녕하세요, Tom입니다.

[이번에 소개할 것]은 제가 [기간] 동안 [어떻게 사용]하고 있는 [도구/서비스]입니다.
[배경/문제상황] 때문에 찾게 되었는데, 꽤 괜찮더라고요.

## [주제]란? (그리고 제가 선택한 이유)

[간단한 설명]. [경쟁자/대안]와 비슷하지만 [차별점]이 가장 큰 장점입니다.

제가 [주제]를 선택한 이유:

- [이유 1]
- [이유 2]

## 실제 사용해보니

### 좋았던 점

<strong>1. [장점 1]</strong>

[구체적인 설명 + 개인적 경험]

팁: [실용적인 팁]

### 아쉬웠던 점

<strong>1. [단점 1]</strong>

[구체적인 설명]

## 총평

[주제]는 [한 줄 평가].

참고: [비용/효율 관련 조언]

[마무리 인사/독려]

---

원문: [원문 제목](원문URL)

## 태그 가이드

| Source               | 기본 태그              |
| -------------------- | ---------------------- |
| openai               | AI, OpenAI             |
| anthropic            | AI, Anthropic, Claude  |
| google               | AI, Google             |
| github (claude-code) | AI, Claude, 개발도구   |
| github (opencode)    | AI, 개발도구, 오픈소스 |
| github (sdk)         | AI, SDK, 개발          |

## 위키 업데이트 규칙

- 위키 페이지는 `content/wiki/` 디렉토리에 위치
- 엔티티 페이지 (`entities/`): 기업, 제품, 서비스별 페이지
- 토픽 페이지 (`topics/`): 기술 트렌드, 개념별 페이지
- 새 포스트 발행 시 반드시 관련 위키 페이지를 업데이트할 것
- 위키 내용은 블로그에서 실제 다룬 내용만 기록 (추측/외부 정보 X)
- 교차참조: 관련 엔티티/토픽 간 `[[링크]]` 유지

## 완료 후 안내
```

포스트 생성 완료:

- content/posts/2024-01-23-post-slug.mdx

위키 업데이트:

- entities/openai.md (타임라인 추가)
- topics/ai-coding-tools.md (관련 포스트 추가)

`pnpm dev`로 확인하거나 `/commit --push`로 배포하세요.

```

```
