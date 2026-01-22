---
description: Conventional Commits 형식으로 자동 커밋 메시지 생성
scope: project
version: 1.5.0
lastUpdated: 2026-01-22
changelog:
  - version: 1.5.0
    date: 2026-01-22
    changes: 한글 기본값 설정
  - version: 1.4.0
    date: 2026-01-22
    changes: --push 옵션 추가 (커밋 후 자동 push)
  - version: 1.3.0
    date: 2025-12-30
    changes: 커밋 타입을 대괄호 형식으로 변경 ([type](scope) 형식)
  - version: 1.2.0
    date: 2025-12-22
    changes: 인자 없이 실행 시 자동 분석 기능 추가
  - version: 1.1.0
    date: 2025-12-08
    changes: ARGUMENTS 힌트 추가, 빈 커밋 방지, Pre-commit hook 처리, Co-Author 수정
  - version: 1.0.0
    date: 2025-12-08
    changes: 초기 버전 작성
---

# 자동 커밋

변경 사항을 분석하여 Conventional Commits 형식으로 커밋을 수행합니다.

## 사용 방법

### 인자가 있는 경우

사용자 힌트: `${ARGUMENTS}`

힌트를 참고하여 커밋 타입과 메시지를 결정합니다.

> 예: `/commit fix 버튼 클릭 버그` → `[fix](Button): 클릭 버그 수정`

### 인자가 없는 경우 (자동 분석)

`${ARGUMENTS}`가 비어있으면 git 변경사항을 자동으로 분석하여:

1. 변경된 파일들의 패턴 분석 (컴포넌트, API, 설정 등)
2. diff 내용을 기반으로 커밋 타입 자동 결정
3. 변경 내용 요약하여 커밋 메시지 자동 생성

> 예: `/commit` → 변경사항 분석 후 적절한 커밋 메시지 자동 생성

### 옵션

| 옵션     | 단축 | 설명                                |
| -------- | ---- | ----------------------------------- |
| `--push` | `-p` | 커밋 후 자동으로 원격 저장소에 push |

> 예: `/commit --push` → 커밋 후 자동 push
> 예: `/commit -p fix 버그 수정` → 커밋 및 push

---

## 사전 조건

**중요**: staged 또는 untracked 변경사항이 없으면 커밋하지 마세요. 빈 커밋은 생성하지 않습니다.

---

## Step 1: Git 상태 및 변경 내용 확인

다음 명령어를 **병렬로** 실행하여 변경 사항을 확인하세요:

```bash
git status
```

```bash
git diff --stat
```

```bash
git diff
```

```bash
git log --oneline -5
```

staged 변경사항이 있다면:

```bash
git diff --cached
```

### 확인 사항

1. **Untracked 파일**: 새로 생성된 파일 목록
2. **Modified 파일**: 수정된 파일 목록
3. **Deleted 파일**: 삭제된 파일 목록
4. **최근 커밋 스타일**: 기존 프로젝트의 커밋 메시지 형식 참고

---

## Step 2: 변경 내용 분석

### 자동 타입 결정 로직 (인자가 없는 경우)

변경된 파일과 diff 내용을 분석하여 다음 규칙으로 타입을 자동 결정:

| 파일 패턴                                | diff 내용                              | 결정 타입  |
| ---------------------------------------- | -------------------------------------- | ---------- |
| 새 파일 생성 (components/, pages/)       | 새 컴포넌트/페이지                     | `feat`     |
| 기존 파일 수정                           | 버그 수정 패턴 (if/null check 추가 등) | `fix`      |
| `*.css.ts`, `*.scss`, styles/            | 스타일 변경                            | `style`    |
| `*.md`, docs/                            | 문서 수정                              | `docs`     |
| `*.test.ts`, `*.spec.ts`                 | 테스트 추가/수정                       | `test`     |
| package.json, 설정 파일                  | 의존성/설정 변경                       | `chore`    |
| 기존 코드 구조 변경                      | 기능 변경 없이 리팩토링                | `refactor` |
| 성능 관련 키워드 (memo, useMemo, 최적화) | 성능 개선                              | `perf`     |

### Scope 자동 결정

- 단일 컴포넌트 변경: 컴포넌트명 (예: `Button`, `Header`)
- 단일 기능 영역: 영역명 (예: `auth`, `api`, `hooks`)
- 다중 영역 변경: scope 생략

### 변경 타입 결정

| 타입       | 설명               | 예시                       | Breaking?        |
| ---------- | ------------------ | -------------------------- | ---------------- |
| `feat`     | 새로운 기능 추가   | 새 컴포넌트, API, 페이지   | `feat!` 가능     |
| `fix`      | 버그 수정          | 에러 수정, 동작 오류 해결  | `fix!` 가능      |
| `refactor` | 코드 리팩토링      | 구조 변경 (기능 변경 없음) | `refactor!` 가능 |
| `style`    | 스타일/포맷 변경   | CSS, 코드 포맷팅           | -                |
| `docs`     | 문서 수정          | README, 주석, JSDoc        | -                |
| `test`     | 테스트 추가/수정   | 단위 테스트, E2E 테스트    | -                |
| `chore`    | 빌드/설정 변경     | package.json, 설정 파일    | -                |
| `perf`     | 성능 개선          | 최적화, 메모리 개선        | -                |
| `ci`       | CI 설정 변경       | GitHub Actions, Jenkins    | -                |
| `build`    | 빌드 시스템 변경   | webpack, vite 설정         | -                |
| `revert`   | 이전 커밋 되돌리기 | revert: feat(xxx)          | -                |

### Breaking Change 판단

다음 경우 타입 뒤에 느낌표(!)를 추가하거나 BREAKING CHANGE: footer 사용:

- API 시그니처 변경
- Props 인터페이스 변경 (required 추가, 타입 변경)
- 기존 동작 방식 변경
- 의존성 major 버전 업그레이드

### Scope 결정 (선택사항)

변경된 주요 영역:

- **컴포넌트**: `Button`, `Header`, `Modal`
- **기능 영역**: `auth`, `api`, `hooks`, `utils`
- **페이지**: `home`, `dashboard`, `settings`
- **설정**: `config`, `build`, `ci`
- **생략 가능**: 여러 영역에 걸친 변경이면 scope 생략

---

## Step 3: 커밋 메시지 작성

### 메시지 형식

```
[type][optional scope][!]: <description>

[optional body]

[optional footer(s)]

🤖 Generated with [Claude Code]
```

### 작성 규칙

1. **Header (제목줄)**
   - 전체 72자 이내 (권장 50자)
   - 마침표 없음
   - 명령형 현재 시제 사용
   - **한글 사용**

2. **Body (본문)** - 선택
   - 각 변경 사항을 `-`로 나열
   - "무엇"과 "왜"를 설명
   - 72자 줄바꿈
   - **한글 사용**

3. **Footer** - 선택
   - `BREAKING CHANGE: <description>` - 호환성 깨지는 변경
   - `Closes #<issue>` - 이슈 종료
   - `Refs #<issue>` - 관련 이슈 참조
   - `Co-authored-by:` - 공동 작성자

---

## Step 4: 예시

### 기본 기능 추가

```
[feat](Button): add vanilla-extract migration

- Migrate Button component from Emotion to vanilla-extract
- Add buttonRecipe with theme and size variants
- Create comprehensive test suite with 80%+ coverage
- Update component exports in features/components/index.ts

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### 버그 수정

```
[fix](api): resolve undefined error in useUserData hook

- Add null check before accessing user properties
- Handle loading state properly

Closes #123

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Breaking Change

```
[feat](Button)!: change size prop type from string to enum

- Change size prop from string to 'sm' | 'md' | 'lg'
- Update all usages across the codebase

BREAKING CHANGE: size prop no longer accepts arbitrary strings.
Use 'sm', 'md', or 'lg' instead.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Scope 없는 경우

```
[chore]: update dependencies to latest versions

- Bump react to 18.2.0
- Bump typescript to 5.0.0
- Update peer dependencies

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### 한글 커밋 (프로젝트 컨벤션에 따라)

```
[feat](Button): vanilla-extract 마이그레이션 추가

- Emotion에서 vanilla-extract로 Button 컴포넌트 마이그레이션
- theme, size variants를 포함한 buttonRecipe 추가
- 80% 이상 커버리지의 테스트 스위트 작성

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Step 5: 커밋 실행

### 5-1. 민감 파일 확인

다음 파일은 **절대 커밋하지 마세요**:

- `.env`, `.env.local`, `.env.*.local`
- `credentials.json`, `secrets.json`
- `*.pem`, `*.key`
- `node_modules/`

### 5-2. 파일 스테이징

```bash
# 특정 파일만 스테이징 (권장)
git add <file1> <file2>

# 또는 모든 변경사항 (주의해서 사용)
git add -A
```

### 5-3. 커밋 명령어 실행

```bash
git commit -m "$(cat <<'EOF'
[type](scope): <description>

- 변경사항 1
- 변경사항 2

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

---

## Step 6: 커밋 확인

```bash
git log -1
```

```bash
git status
```

---

## Step 7: 자동 Push (--push 옵션 사용 시)

`${ARGUMENTS}`에 `--push` 또는 `-p`가 포함된 경우에만 실행합니다.

### 7-1. 원격 브랜치 확인

```bash
git branch -vv
```

### 7-2. Push 실행

```bash
# 현재 브랜치를 원격에 push
git push

# 원격 브랜치가 없는 경우 (새 브랜치)
git push -u origin $(git branch --show-current)
```

### 7-3. Push 결과 확인

```bash
git status
```

**확인 사항:**

- "Your branch is up to date with 'origin/...'" 메시지 확인
- Push 실패 시 오류 메시지를 사용자에게 전달

### 7-4. Push 실패 시

| 실패 원인        | 해결 방법                          |
| ---------------- | ---------------------------------- |
| 권한 없음        | 사용자에게 권한 확인 요청          |
| 원격 브랜치 충돌 | `git pull --rebase` 후 재시도 권유 |
| 네트워크 오류    | 재시도 권유                        |

**주의**: `--force` 옵션은 절대 사용하지 마세요.

---

## Step 8: Pre-commit Hook 실패 처리

Pre-commit hook으로 인해 커밋이 실패하거나 파일이 수정된 경우:

### 8-1. 재시도 (1회만)

Hook이 파일을 수정했다면 다시 커밋을 시도하세요.

### 8-2. Amend 여부 판단

수정된 파일을 기존 커밋에 추가해야 하는 경우:

```bash
# HEAD 커밋 확인
git log -1 --format='[%h] (%an <%ae>) %s'
```

**Amend 조건** (모두 충족해야 함):

1. HEAD 커밋이 방금 내가 만든 커밋임
2. `git status`에서 "Your branch is ahead" 상태 (아직 push 안 됨)

```bash
# 조건 충족 시 amend
git add .
git commit --amend --no-edit

# 조건 불충족 시 새 커밋
git add .
git commit -m "$(cat <<'EOF'
[style]: apply pre-commit hook fixes

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### 8-3. 주의사항

- **절대 다른 개발자의 커밋을 amend하지 마세요**
- **이미 push된 커밋은 amend하지 마세요**
- Hook 실패가 2회 이상 반복되면 사용자에게 알리세요

---

## 체크리스트

커밋 전 확인:

- [ ] 민감 정보 파일 제외 확인
- [ ] 커밋 타입이 변경 내용과 일치
- [ ] Breaking Change 여부 확인 및 표기
- [ ] 관련 이슈 번호 연결 (있는 경우)
- [ ] 테스트 통과 확인 (필요시)
- [ ] 빌드 성공 확인 (필요시)

Push 전 확인 (`--push` 옵션 사용 시):

- [ ] 원격 브랜치와 충돌 없음
- [ ] CI/CD 파이프라인 영향 인지

---

## 참고 자료

- [Conventional Commits 공식 사이트](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [commitlint](https://commitlint.js.org/)
