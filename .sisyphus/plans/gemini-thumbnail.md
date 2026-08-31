# Gemini 2.0 Flash 썸네일 자동 생성

## TL;DR

> **Quick Summary**: `/publish` 커맨드로 포스트 발행 시 Gemini 2.0 Flash 이미지 생성 모델("나노바나나")을 활용하여 썸네일을 자동 생성하고 `public/thumbnails/{slug}.png`로 저장한다.
>
> **Deliverables**:
>
> - `lib/thumbnail.ts` — Gemini API 호출 + 이미지 저장 유틸리티
> - `scripts/generate-thumbnail.ts` — CLI에서 단독 실행 가능한 스크립트
> - `.claude/commands/publish.md` 업데이트 — 썸네일 생성 단계 추가
> - `.env.example` 업데이트 — `GEMINI_API_KEY` 추가
>
> **Estimated Effort**: Short (2-3시간)
> **Parallel Execution**: YES — 2 waves
> **Critical Path**: Task 1 (SDK+유틸) → Task 3 (커맨드 연동) → Task 4 (검증)

---

## Context

### Original Request

포스트 발행 시 Gemini의 "나노바나나"(Gemini 2.0 Flash 이미지 생성)를 통해 썸네일 이미지를 자동 생성하는 로직 추가.

### Interview Summary

**Key Discussions**:

- **모델**: Gemini 2.0 Flash (이미지 생성) — 사용자가 "나노바나나"로 지칭
- **생성 시점**: `/publish` 커맨드 실행 시 자동
- **프롬프트 방식**: 포스트 타이틀 + 내용을 컨텍스트로 넘겨 자유롭게 생성
- **API 키**: 아직 없음 → Google AI Studio에서 발급 필요
- **적용 범위**: 새 포스트만 (기존 포스트 배치 생성 X)

**Research Findings**:

- **코드베이스 썸네일 인프라 이미 완비**:
  - `contentlayer.config.ts:48-51` — `thumbnail` 필드 존재 (optional string)
  - `post-card.tsx:11-28` — 커스텀 썸네일 vs OG 폴백 로직 이미 구현
  - `public/thumbnails/` — 62개 기존 PNG 파일
  - `app/posts/[slug]/page.tsx:101-110` — 상세 페이지 썸네일 렌더링
- **Gemini API**:
  - SDK: `@google/genai` (새 통합 SDK)
  - 반환 형식: base64 bytes → Buffer → PNG 저장
  - Aspect Ratio: `16:9` 지원 (1200x630 OG 이미지와 일치)
  - 무료 티어: 500 이미지/일

### Self Gap Analysis (Metis 대체)

**식별된 갭 (해결됨)**:

- `/write` 커맨드도 포스트 생성 → 현재 범위는 `/publish`만. `/write`는 추후 확장 가능
- API 에러/안전 필터 → 폴백으로 기존 OG 이미지 자동 사용 (이미 구현)
- `.env` 파일 `.gitignore` 확인 필요 → Task에 포함
- 이미지 파일 사이즈 → PNG 최적화 고려 (sharp 라이브러리 선택적)

---

## Work Objectives

### Core Objective

`/publish` 커맨드 실행 시 Gemini 2.0 Flash로 포스트 제목/내용 기반 썸네일을 자동 생성하여 `public/thumbnails/{slug}.png`에 저장하고, MDX frontmatter에 `thumbnail` 필드를 자동 포함시킨다.

### Concrete Deliverables

- `lib/thumbnail.ts` — Gemini API 연동 유틸리티 모듈
- `scripts/generate-thumbnail.ts` — 단독 실행 가능한 썸네일 생성 스크립트
- `.claude/commands/publish.md` — 썸네일 생성 단계가 추가된 커맨드
- `.env.example` — `GEMINI_API_KEY` 환경변수 문서화
- `package.json` — `@google/genai` 의존성 + `generate-thumbnail` 스크립트

### Definition of Done

- [ ] `GEMINI_API_KEY` 환경변수 설정 후 `pnpm generate-thumbnail --title "테스트" --slug "test"` 실행 시 `public/thumbnails/test.png` 생성
- [ ] `/publish`로 포스트 발행 시 자동으로 썸네일 생성 + frontmatter에 `thumbnail` 필드 포함
- [ ] 썸네일이 `post-card.tsx`와 `posts/[slug]/page.tsx`에서 정상 렌더링
- [ ] API 키 미설정 또는 생성 실패 시 에러 없이 OG 폴백 정상 작동
- [ ] `pnpm build` 성공

### Must Have

- Gemini 2.0 Flash 이미지 생성 API 호출
- 포스트 제목+내용 기반 프롬프트로 컨텍스트 전달
- `public/thumbnails/{slug}.png` 저장 패턴 준수
- API 키 미설정 시 graceful skip (에러 없이 진행)
- 생성 실패 시 기존 OG 이미지 폴백 유지

### Must NOT Have (Guardrails)

- ❌ 기존 62개 썸네일 수정/재생성 금지
- ❌ `/write` 커맨드 수정 (현재 범위 외)
- ❌ 이미지 편집/재생성 UI 금지
- ❌ 갤러리/이미지 관리 시스템 금지
- ❌ 과도한 추상화 (단순 유틸 함수면 충분)
- ❌ 기존 `post-card.tsx`, `page.tsx` 렌더링 로직 변경 금지 (이미 작동 중)

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision

- **Infrastructure exists**: YES (pnpm build)
- **Automated tests**: None (CLI 유틸 + Claude 커맨드 — 통합 테스트 부적합)
- **Framework**: N/A
- **QA 방식**: Agent가 직접 스크립트 실행 + 빌드 검증 + 파일 존재 확인

### QA Policy

Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **CLI 스크립트**: Bash — 스크립트 실행, 파일 생성 확인, 에러 핸들링 검증
- **빌드 검증**: Bash — `pnpm build` 성공 확인
- **렌더링 확인**: Playwright — 로컬 dev 서버에서 썸네일 표시 확인

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — SDK 설치 + 핵심 유틸):
├── Task 1: @google/genai SDK 설치 + lib/thumbnail.ts 유틸리티 [quick]
├── Task 2: scripts/generate-thumbnail.ts CLI 스크립트 [quick]
└── Task 3: .env.example 업데이트 + .gitignore 확인 [quick]

Wave 2 (After Wave 1 — 커맨드 연동 + 검증):
├── Task 4: /publish 커맨드 업데이트 [quick]
└── Task 5: 통합 검증 — 빌드 + 렌더링 QA [quick]

Critical Path: Task 1 → Task 2 → Task 4 → Task 5
Parallel Speedup: Wave 1에서 Task 1, 3 병렬 실행
Max Concurrent: 3 (Wave 1)
```

### Dependency Matrix

| Task | Depends On | Blocks  |
| ---- | ---------- | ------- |
| 1    | —          | 2, 4, 5 |
| 2    | 1          | 4, 5    |
| 3    | —          | 4       |
| 4    | 1, 2, 3    | 5       |
| 5    | 4          | —       |

### Agent Dispatch Summary

- **Wave 1**: 3 tasks — T1 → `quick`, T2 → `quick`, T3 → `quick`
- **Wave 2**: 2 tasks — T4 → `quick`, T5 → `unspecified-high` (+ `playwright` skill)

---

## TODOs

- [x] 1. `@google/genai` SDK 설치 + `lib/thumbnail.ts` 유틸리티 생성

  **What to do**:
  - `pnpm add @google/genai` 실행하여 SDK 설치
  - `lib/thumbnail.ts` 파일 생성:
    - `generateThumbnail(options: { title: string; description: string; slug: string; tags?: string[] }): Promise<string | null>` 함수 구현
    - Gemini 2.0 Flash 모델 (`gemini-2.0-flash-preview-image-generation`) 사용
    - 프롬프트 구성: 포스트 타이틀 + 설명을 기반으로 블로그 썸네일 생성 요청
    - `responseModalities: ["TEXT", "IMAGE"]` 설정
    - 반환된 base64 이미지를 Buffer로 변환 → `public/thumbnails/{slug}.png` 저장
    - 성공 시 `"/thumbnails/{slug}.png"` 경로 반환, 실패 시 `null` 반환
    - `GEMINI_API_KEY` 환경변수 미설정 시 경고 로그 출력 후 `null` 반환 (에러 throw 금지)
    - API 호출 실패, 안전 필터 차단 등 모든 에러를 catch하여 `null` 반환

  **Must NOT do**:
  - 기존 파일 수정 금지
  - 복잡한 retry 로직이나 큐 시스템 금지
  - 이미지 후처리/리사이즈 금지 (Gemini가 직접 적절한 크기로 생성)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 파일 생성 + SDK 설치. 명확한 API 스펙 기반 구현.
  - **Skills**: []
    - 외부 브라우저나 특수 도구 불필요
  - **Skills Evaluated but Omitted**:
    - `playwright`: 파일 생성 단계에서는 브라우저 불필요

  **Parallelization**:
  - **Can Run In Parallel**: YES (Task 3와 병렬)
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Tasks 2, 4, 5
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `lib/posts.ts` — 기존 lib 모듈 구조/패턴 참고 (export 스타일, 타입 정의 방식)
  - `lib/rss.ts` — 외부 API 호출 패턴 참고 (fetch, 에러 핸들링)

  **API/Type References**:
  - `contentlayer.config.ts:48-51` — `thumbnail` 필드 정의 (`string`, 경로 형식 예: `/thumbnails/my-post.png`)
  - `components/post-card.tsx:11-13` — 썸네일 경로가 어떻게 사용되는지 확인 (`post.thumbnail || ogUrl`)

  **External References**:
  - `@google/genai` SDK — Gemini 이미지 생성 API:
    ```typescript
    import { GoogleGenAI } from "@google/genai";
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { responseModalities: ["TEXT", "IMAGE"] },
    });
    // response.candidates[0].content.parts에서 inlineData.data (base64) 추출
    ```

  **WHY Each Reference Matters**:
  - `lib/posts.ts` — 동일 디렉토리에 유틸 추가하므로 export/naming 컨벤션 일치 필요
  - `contentlayer.config.ts` — 반환할 경로 형식이 이 스키마와 정확히 일치해야 함
  - `post-card.tsx` — 생성된 경로가 이 컴포넌트에서 올바르게 로드되는지 확인

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: SDK 설치 확인
    Tool: Bash
    Preconditions: 프로젝트 루트 디렉토리
    Steps:
      1. `pnpm list @google/genai` 실행
      2. 출력에 `@google/genai` 버전이 표시되는지 확인
    Expected Result: 패키지가 dependencies에 존재
    Failure Indicators: "not found" 또는 빈 출력
    Evidence: .sisyphus/evidence/task-1-sdk-installed.txt

  Scenario: lib/thumbnail.ts 모듈 로드 확인
    Tool: Bash
    Preconditions: SDK 설치 완료
    Steps:
      1. `npx tsx -e "import { generateThumbnail } from './lib/thumbnail'; console.log(typeof generateThumbnail)"` 실행
      2. 출력이 "function"인지 확인
    Expected Result: "function" 출력
    Failure Indicators: import 에러, "undefined" 출력
    Evidence: .sisyphus/evidence/task-1-module-loads.txt

  Scenario: API 키 미설정 시 graceful skip
    Tool: Bash
    Preconditions: GEMINI_API_KEY 미설정
    Steps:
      1. `GEMINI_API_KEY="" npx tsx -e "import { generateThumbnail } from './lib/thumbnail'; generateThumbnail({ title: 'test', description: 'test', slug: 'test' }).then(r => console.log('result:', r))"` 실행
      2. 에러 throw 없이 `null` 반환 확인
    Expected Result: "result: null" 출력, 프로세스 정상 종료 (exit 0)
    Failure Indicators: uncaught error, non-zero exit code
    Evidence: .sisyphus/evidence/task-1-no-apikey-graceful.txt
  ```

  **Commit**: YES
  - Message: `feat(thumbnail): add Gemini image generation utility`
  - Files: `lib/thumbnail.ts`, `package.json`, `pnpm-lock.yaml`
  - Pre-commit: `pnpm build`

---

- [x] 2. `scripts/generate-thumbnail.ts` CLI 스크립트 생성

  **What to do**:
  - `scripts/generate-thumbnail.ts` 파일 생성:
    - CLI 인자 파싱: `--title`, `--slug`, `--description` (선택), `--tags` (선택)
    - `lib/thumbnail.ts`의 `generateThumbnail()` 호출
    - 결과 출력: 성공 시 저장 경로, 실패 시 에러 메시지
    - 사용법 안내 (`--help`)
  - `package.json`에 스크립트 추가: `"generate-thumbnail": "tsx scripts/generate-thumbnail.ts"`

  **Must NOT do**:
  - 복잡한 CLI 프레임워크 (commander, yargs 등) 사용 금지 — `process.argv` 직접 파싱
  - 인터랙티브 프롬프트 금지

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 스크립트 파일 생성. lib/thumbnail.ts를 감싸는 얇은 CLI 래퍼.
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `playwright`: CLI 스크립트에 브라우저 불필요

  **Parallelization**:
  - **Can Run In Parallel**: NO (Task 1 필요)
  - **Parallel Group**: Wave 1 (Task 1 이후 순차)
  - **Blocks**: Tasks 4, 5
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `scripts/fetch-news.ts` — 기존 CLI 스크립트 구조 참고 (인자 파싱, 실행 흐름, 출력 형식)

  **API/Type References**:
  - `lib/thumbnail.ts` — Task 1에서 생성한 `generateThumbnail()` 함수 시그니처

  **WHY Each Reference Matters**:
  - `scripts/fetch-news.ts` — 동일 디렉토리의 기존 스크립트와 일관된 구조/스타일 유지

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: 스크립트 help 출력
    Tool: Bash
    Preconditions: 스크립트 파일 존재
    Steps:
      1. `pnpm generate-thumbnail --help` 실행
      2. 사용법 안내 출력 확인 (--title, --slug 등)
    Expected Result: 사용법이 포함된 텍스트 출력
    Failure Indicators: 에러 또는 빈 출력
    Evidence: .sisyphus/evidence/task-2-help-output.txt

  Scenario: 필수 인자 누락 시 에러 메시지
    Tool: Bash
    Preconditions: 스크립트 파일 존재
    Steps:
      1. `pnpm generate-thumbnail` 실행 (인자 없이)
      2. 에러 메시지에 필수 인자 안내 포함 확인
    Expected Result: "--title과 --slug는 필수" 같은 안내 메시지 + non-zero exit
    Failure Indicators: 무한 대기, 크래시, 또는 에러 없는 빈 실행
    Evidence: .sisyphus/evidence/task-2-missing-args.txt

  Scenario: 실제 썸네일 생성 (API 키 있을 때)
    Tool: Bash
    Preconditions: GEMINI_API_KEY 설정됨, public/thumbnails/ 존재
    Steps:
      1. `pnpm generate-thumbnail --title "AI 기술의 미래" --slug "ai-future-test" --description "AI 기술 트렌드 테스트"` 실행
      2. `ls -la public/thumbnails/ai-future-test.png` 로 파일 존재 확인
      3. `file public/thumbnails/ai-future-test.png` 로 PNG 형식 확인
      4. 테스트 파일 삭제: `rm public/thumbnails/ai-future-test.png`
    Expected Result: PNG 파일이 생성되고, file 명령이 "PNG image data" 출력
    Failure Indicators: 파일 미생성, PNG 아닌 형식, 에러 로그
    Evidence: .sisyphus/evidence/task-2-thumbnail-generated.txt
  ```

  **Commit**: YES (Task 1과 함께)
  - Message: `feat(thumbnail): add CLI script for thumbnail generation`
  - Files: `scripts/generate-thumbnail.ts`, `package.json`
  - Pre-commit: `pnpm build`

---

- [x] 3. `.env.example` 업데이트 + `.gitignore` 확인

  **What to do**:
  - `.env.example` 파일에 `GEMINI_API_KEY=your_gemini_api_key_here` 추가 (파일 없으면 생성)
  - `.gitignore`에 `.env` 포함 확인 (없으면 추가)
  - `.env`에 실제 키 설정 안내 주석 추가

  **Must NOT do**:
  - 실제 API 키를 코드/커밋에 포함 금지
  - `.env` 파일 자체를 생성/수정하지 않음 (사용자가 직접 설정)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 설정 파일 1-2줄 추가
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (Task 1과 병렬)
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Task 4
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `.gitignore` — 기존 무시 패턴 확인
  - `.env.example` (있다면) — 기존 환경변수 형식 참고

  **WHY Each Reference Matters**:
  - API 키가 git에 커밋되는 것을 반드시 방지해야 함

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: .env.example에 GEMINI_API_KEY 존재
    Tool: Bash
    Preconditions: 파일 존재
    Steps:
      1. `grep "GEMINI_API_KEY" .env.example` 실행
      2. 해당 라인 존재 확인
    Expected Result: "GEMINI_API_KEY=your_gemini_api_key_here" 출력
    Failure Indicators: grep 빈 출력
    Evidence: .sisyphus/evidence/task-3-env-example.txt

  Scenario: .gitignore에 .env 포함
    Tool: Bash
    Preconditions: .gitignore 존재
    Steps:
      1. `grep "^\.env" .gitignore` 실행
      2. .env 패턴 존재 확인
    Expected Result: ".env" 또는 ".env*" 패턴 출력
    Failure Indicators: grep 빈 출력
    Evidence: .sisyphus/evidence/task-3-gitignore.txt
  ```

  **Commit**: YES (Task 1, 2와 함께)
  - Message: `chore(config): add GEMINI_API_KEY to env example`
  - Files: `.env.example`, `.gitignore` (변경 시)
  - Pre-commit: N/A

---

- [x] 4. `/publish` 커맨드 업데이트

  **What to do**:
  - `.claude/commands/publish.md` 수정:
    - MDX 파일 생성 단계 이후, 커밋 전에 **썸네일 생성 단계** 추가
    - 단계 내용:
      1. `lib/thumbnail.ts`의 `generateThumbnail()` 호출 (또는 `pnpm generate-thumbnail` 실행)
      2. 포스트 title, description, slug, tags를 인자로 전달
      3. 성공 시: MDX frontmatter에 `thumbnail: "/thumbnails/{slug}.png"` 추가
      4. 실패 시: `thumbnail` 필드 생략 (OG 폴백 자동 사용) + 경고 로그
    - 프론트매터 템플릿에 `thumbnail` 필드 추가
  - `.claude/commands/write.md`는 수정하지 않음 (범위 외)

  **Must NOT do**:
  - `/write` 커맨드 수정 금지
  - `/publish` 커맨드의 기존 로직 변경 금지 (썸네일 단계만 추가)
  - 썸네일 생성을 blocking 필수로 만들지 않음 (실패해도 publish 계속 진행)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 마크다운 파일 1개에 단계 추가
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (순차)
  - **Blocks**: Task 5
  - **Blocked By**: Tasks 1, 2, 3

  **References**:

  **Pattern References**:
  - `.claude/commands/publish.md` — 현재 /publish 커맨드 전체 구조 (수정 대상)
  - `.claude/commands/write.md` — 비교 참고용 (수정하지 않음)
  - `.claude/commands/fetch-news.md` — 커맨드 작성 스타일 참고

  **API/Type References**:
  - `lib/thumbnail.ts` — `generateThumbnail()` 함수 시그니처
  - `contentlayer.config.ts:48-51` — `thumbnail` 필드 형식

  **WHY Each Reference Matters**:
  - `publish.md` — 기존 단계 흐름에 자연스럽게 삽입해야 하므로 전체 구조 파악 필수
  - `lib/thumbnail.ts` — 커맨드에서 어떻게 호출하는지 안내 작성에 필요

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: publish.md에 썸네일 생성 단계 존재
    Tool: Bash
    Preconditions: 파일 수정 완료
    Steps:
      1. `grep -c "thumbnail" .claude/commands/publish.md` 실행
      2. "thumbnail" 언급이 2회 이상인지 확인 (단계 설명 + 프론트매터 템플릿)
      3. `grep -A5 "썸네일" .claude/commands/publish.md` 로 단계 내용 확인
    Expected Result: 썸네일 생성 단계가 명확히 기술됨
    Failure Indicators: thumbnail 언급 0회, 단계 누락
    Evidence: .sisyphus/evidence/task-4-publish-updated.txt

  Scenario: 프론트매터 템플릿에 thumbnail 필드 포함
    Tool: Bash
    Preconditions: 파일 수정 완료
    Steps:
      1. `grep "thumbnail:" .claude/commands/publish.md` 실행
      2. frontmatter 템플릿 내에 thumbnail 필드가 있는지 확인
    Expected Result: `thumbnail: "/thumbnails/{slug}.png"` 형식 존재
    Failure Indicators: grep 빈 출력
    Evidence: .sisyphus/evidence/task-4-frontmatter-template.txt
  ```

  **Commit**: YES
  - Message: `feat(publish): integrate Gemini thumbnail generation into publish command`
  - Files: `.claude/commands/publish.md`
  - Pre-commit: N/A

---

- [x] 5. 통합 검증 — 빌드 + 렌더링 QA

  **What to do**:
  - `pnpm build` 실행하여 전체 빌드 성공 확인
  - 로컬 dev 서버 실행 후:
    - 기존 썸네일 있는 포스트가 정상 렌더링되는지 확인
    - 썸네일 없는 포스트가 OG 폴백으로 정상 작동하는지 확인
  - API 키가 있다면: 테스트 썸네일 생성 → 빌드 → 렌더링 확인
  - 테스트 파일 정리

  **Must NOT do**:
  - 기존 코드 수정 금지
  - 프로덕션 데이터 변경 금지

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 빌드 + dev 서버 + Playwright 브라우저 검증을 조합하는 통합 QA
  - **Skills**: [`playwright`]
    - `playwright`: 로컬 dev 서버에서 썸네일 렌더링 확인에 필요
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: UI 변경이 아닌 기능 검증이므로 불필요

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (최종)
  - **Blocks**: None
  - **Blocked By**: Tasks 1, 2, 3, 4

  **References**:

  **Pattern References**:
  - `components/post-card.tsx:11-28` — 썸네일 vs OG 폴백 렌더링 로직
  - `app/posts/[slug]/page.tsx:101-110` — 상세 페이지 썸네일 렌더링

  **WHY Each Reference Matters**:
  - 기존 렌더링 로직이 변경 없이 새 썸네일과 호환되는지 확인

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: pnpm build 성공
    Tool: Bash
    Preconditions: 모든 코드 변경 완료
    Steps:
      1. `pnpm build` 실행
      2. exit code 0 확인
      3. 빌드 출력에 에러/워닝 없는지 확인
    Expected Result: 빌드 성공, exit 0
    Failure Indicators: non-zero exit, 에러 메시지
    Evidence: .sisyphus/evidence/task-5-build-success.txt

  Scenario: 기존 썸네일 포스트 렌더링 확인
    Tool: Playwright (playwright skill)
    Preconditions: `pnpm dev` 실행 중
    Steps:
      1. http://localhost:3000 접속
      2. 썸네일이 있는 포스트 카드에서 `img[src*="/thumbnails/"]` 셀렉터 존재 확인
      3. 이미지가 로드되었는지 확인 (naturalWidth > 0)
      4. 스크린샷 캡처
    Expected Result: 썸네일 이미지가 정상 렌더링됨
    Failure Indicators: img 태그 없음, 이미지 깨짐 (naturalWidth === 0)
    Evidence: .sisyphus/evidence/task-5-existing-thumbnail.png

  Scenario: OG 폴백 정상 작동 확인
    Tool: Playwright (playwright skill)
    Preconditions: `pnpm dev` 실행 중
    Steps:
      1. http://localhost:3000 접속
      2. 썸네일 없는 포스트 카드에서 `img[src*="/api/og"]` 셀렉터 존재 확인
      3. 이미지가 로드되었는지 확인
      4. 스크린샷 캡처
    Expected Result: OG 이미지가 폴백으로 정상 렌더링됨
    Failure Indicators: img 태그 없음, /api/og 경로 미포함
    Evidence: .sisyphus/evidence/task-5-og-fallback.png
  ```

  **Commit**: NO (검증 전용)

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 이 프로젝트는 소규모(5 tasks)이므로 Final Wave는 경량화된 2-agent 검증으로 진행.

- [x] F1. **Plan Compliance Audit** — `quick`
      플랜의 모든 "Must Have"가 구현되었는지 확인. 모든 "Must NOT Have"가 위반되지 않았는지 확인. evidence 파일 존재 여부 확인.
      Output: `Must Have [N/N] | Must NOT Have [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Scope Fidelity Check** — `quick`
      각 Task의 "What to do"와 실제 변경 사항을 비교. 범위 외 변경 (post-card.tsx, page.tsx 등 기존 파일 수정) 감지. git diff 기반 검증.
      Output: `Tasks [N/N compliant] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

| Order | Message                                                                     | Files                                                                                 |
| ----- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1     | `feat(thumbnail): add Gemini image generation utility and CLI script`       | `lib/thumbnail.ts`, `scripts/generate-thumbnail.ts`, `package.json`, `pnpm-lock.yaml` |
| 2     | `chore(config): add GEMINI_API_KEY to env example`                          | `.env.example`, `.gitignore`                                                          |
| 3     | `feat(publish): integrate Gemini thumbnail generation into publish command` | `.claude/commands/publish.md`                                                         |

---

## Success Criteria

### Verification Commands

```bash
pnpm build                    # Expected: exit 0, no errors
pnpm generate-thumbnail --help  # Expected: usage info output
grep "GEMINI_API_KEY" .env.example  # Expected: key template present
grep "thumbnail" .claude/commands/publish.md  # Expected: 2+ matches
```

### Final Checklist

- [ ] `lib/thumbnail.ts` 존재 + `generateThumbnail()` export
- [ ] `scripts/generate-thumbnail.ts` 존재 + CLI 동작
- [ ] `.env.example`에 `GEMINI_API_KEY` 포함
- [ ] `.gitignore`에 `.env` 포함
- [ ] `/publish` 커맨드에 썸네일 생성 단계 추가
- [ ] `pnpm build` 성공
- [ ] 기존 썸네일 렌더링 정상
- [ ] OG 폴백 정상
- [ ] 기존 파일 (`post-card.tsx`, `page.tsx`, `contentlayer.config.ts`) 미변경
