# Tom's Blog - Writing Style Guide

## 포지셔닝

**"풀스택 개발자 (with frontend lean)의 AI 툴링 실험실"**

- 직접 사용한 도구의 실전 인사이트
- React + Java/Spring + DevOps + DB 전체 스택 커버
- 개발 워크플로우에 영향을 미치는 것만 선택적 큐레이션

---

## 콘텐츠 믹스

| 타입        | 비율 | 설명                                  |
| ----------- | ---- | ------------------------------------- |
| 뉴스 + 해설 | 50%  | AI 뉴스를 개발자 관점으로 해석        |
| 도구 리뷰   | 30%  | claude-code vs Cursor, 실사용 비교 등 |
| 빌드 로그   | 20%  | "이 블로그를 AI로 만든 과정" 등       |

---

## Frontmatter 필드

```yaml
---
title: "제목"
description: "SEO 설명"
date: 2026-01-30
category: ai-news | updates | opensource
tags: [relevant, tags]

# Persona 필드
perspective: "개발자 관점"
handsOn: true
stackContext: [react, typescript, spring-boot, postgresql]
tldrVerdict: "핵심 판단 한 줄 요약"
relevanceFrontend: high | medium | low
relevanceBackend: high | medium | low
relevanceDevops: high | medium | low
relevanceTooling: high | medium | low
relevanceDatabase: high | medium | low

source: openai | google | anthropic | github | geeknews | original
sourceUrl: "https://..."
---
```

---

## 포스트 구조

### 기본 템플릿

```markdown
---
[frontmatter]
---

## [요약 - 무엇이 변했고 왜 중요한가]

1-2 문단: 핵심 내용 요약

## [주요 내용]

### 기능 1

기술적 세부사항

### 기능 2

기술적 세부사항

<DeveloperPerspective>

**실무에서 이게 왜 중요한가:**
[풀스택 개발자 워크플로우와의 연관성]

**내가 테스트한 결과:**

- ✅ 잘 작동한 것
- ⚠️ 주의할 점
- ❌ 안 된 것 (있다면)

**언제 사용하면 좋은가:**

- 시나리오 1
- 시나리오 2

**언제 사용하지 말아야 하나:**

- 안티 패턴

</DeveloperPerspective>

## [기술 스택 / 구현 세부사항]

## [관련 링크]

- 원문: [Link]
- 공식 문서: [Link]
```

---

## 톤 & 목소리

### 톤 스펙트럼: Conversational Professional

**❌ 너무 격식있게:**

> "본 기고자는 해당 도구를 2주간 테스트한 결과, 생산성 향상을 확인하였다."

**❌ 너무 캐주얼:**

> "ㅋㅋ 이거 진짜 미쳤음 ㅋㅋ 써보셈"

**✅ 적절:**

> "2주 써보니 확실히 반복 작업이 줄었다. 다만 복잡한 로직은 여전히 수동 검토가 필요하다."

### 1인칭 사용

**항상 사용:**

- `<DeveloperPerspective>` 섹션
- 빌드 로그
- 도구 리뷰

**최소화:**

- 기술 설명 (객관적 유지)
- 기능 소개

---

## DeveloperPerspective 섹션 작성 가이드

### 필수 포함 요소

1. **실무 연관성**
   - "이게 왜 개발자에게 중요한가?"
   - 풀스택 컨텍스트 (프론트엔드 + 백엔드 관점)

2. **실전 경험**
   - `handsOn: true` → 구체적 테스트 결과
   - `handsOn: false` → 문서 기반 분석 + 예상

3. **사용 가이드**
   - 언제 사용? (Use cases)
   - 언제 피해야? (Anti-patterns)

4. **명확한 판단**
   - 추상적 "좋다" 대신 구체적 메트릭
   - 한계점 솔직히 공유

### 예시

```markdown
<DeveloperPerspective>

**실무에서 이게 왜 중요한가:**

API 스펙 하나 바꾸려면 백엔드 Controller → Service → Repository →
프론트엔드 API 클라이언트 → 컴포넌트를 수동으로 하나씩 수정해야 했다.
이제는 한 번에 처리된다.

**내가 테스트한 결과:**

✅ **단순 필드 추가**: 거의 완벽

- User 엔티티 phoneNumber 추가 → 8개 파일 일괄 수정
- 소요 시간: 30분 → 2분

⚠️ **타입 변경**: 검토 필요

- string → Date 변경 시 timezone 처리 확인 필수

**언제 사용하면 좋은가:**

- API 스펙 변경
- 공통 타입 변경
- 의존성 교체

**언제 조심해야 하나:**

- 복잡한 비즈니스 로직
- 테스트 없는 레거시

</DeveloperPerspective>
```

---

## 선택 기준

### ✅ 다룰 것

- AI 코딩 어시스턴트 업데이트
- 프레임워크/라이브러리 AI 통합
- DevOps/인프라 AI 도구
- 데이터베이스 AI 툴링
- 직접 테스트 가능한 도구
- 개발 워크플로우에 영향

### ❌ 건너뛸 것

- 순수 ML 연구 (개발자 툴링 없음)
- 엔터프라이즈 전용 (테스트 불가)
- 너무 니치 (<5% 개발자)
- 워크플로우 무관

---

## 체크리스트

모든 포스트는 다음을 만족해야 함:

- [ ] Frontmatter에 persona 필드 포함
- [ ] `<DeveloperPerspective>` 섹션 있음
- [ ] "왜 개발자에게 중요한가" 명시
- [ ] `handsOn` 상태 명확히 표시
- [ ] 구체적 메트릭/예시 포함
- [ ] 사용/비사용 시나리오 제시
- [ ] 풀스택 컨텍스트 (프론트엔드만 아님)

---

## 차별화 포인트

| 일반 AI 뉴스 블로그 | Tom's Blog                        |
| ------------------- | --------------------------------- |
| "X가 Y를 발표함"    | "내가 Y를 써본 결과 Z에 유용함"   |
| 모든 뉴스 커버      | 워크플로우 관련만 선택적 큐레이션 |
| 문서 기반           | 직접 테스트 우선                  |
| 중립적 톤           | 개발자 관점 + 명확한 판단         |
| 프론트 OR 백엔드    | 풀스택 컨텍스트                   |

---

## 예시: Before/After

### Before (중립적 번역)

```markdown
## Claude Code, 새로운 멀티파일 편집 기능 출시

Anthropic이 Claude Code에 멀티파일 편집 기능을 추가했다.
최대 10개 파일을 동시에 수정할 수 있다.

주요 기능:

- 파일 간 의존성 자동 추적
- 충돌 감지 및 해결 제안

출처: Anthropic Blog
```

### After (페르소나 반영)

```markdown
---
title: "Claude Code 멀티파일 편집: 대규모 리팩토링이 실용적으로"
handsOn: true
stackContext: [react, typescript, java, spring-boot]
tldrVerdict: "간단한 리팩토링은 놀랍도록 빠름. 복잡한 아키텍처는 검토 필수"
relevanceFrontend: high
relevanceBackend: high
---

## Claude Code 멀티파일 편집으로 리팩토링 게임 체인저

가장 중요한 변화: **API 변경 연쇄 작업을 한 번에 지시 가능**

예: "User 모델에 email 추가하고 관련 컴포넌트/API 수정"
→ 프론트엔드 폼, 백엔드 Entity, 마이그레이션까지 일괄 처리

<DeveloperPerspective>

**실무에서 이게 왜 중요한가:**

기존: API 스펙 변경 → 7-8개 파일 수동 수정 (30분)
지금: 한 번에 처리 (2분)

**내가 테스트한 결과:**

실제 Next.js + Spring Boot 프로젝트 테스트:

✅ **단순 필드 추가**: 거의 완벽

- phoneNumber 추가 → 8개 파일 일괄 수정
- 30분 → 2분

⚠️ **타입 변경**: 검토 필요

- timezone 처리 확인 필수

**언제 사용:**

- API 스펙 변경
- 타입 변경
- 의존성 교체

</DeveloperPerspective>
```

---

**마지막 업데이트**: 2026-01-30
