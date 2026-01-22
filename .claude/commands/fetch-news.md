---
description: RSS 뉴스를 수집하고 체크리스트 파일 생성
scope: project
version: 2.0.0
---

# 뉴스 수집

RSS 피드에서 뉴스를 수집하고 `.claude/news/YYYYMMDD_news.md` 파일로 저장합니다.

## 사용 방법

```
/fetch-news              # 기본 (Geeknews + GitHub)
/fetch-news geeknews     # Geeknews만
/fetch-news github       # GitHub Releases만
```

인자: `${ARGUMENTS}`

---

## Step 1: 뉴스 수집

다음 명령어를 실행하여 RSS 뉴스를 수집합니다:

```bash
pnpm fetch-news
```

### 소스 필터링 (인자가 있는 경우)

- `geeknews`: `pnpm fetch-news --source=geeknews`
- `github`: `pnpm fetch-news --source=github`

---

## Step 2: 디렉토리 확인

`.claude/news` 디렉토리가 없으면 생성합니다:

```bash
mkdir -p .claude/news
```

---

## Step 3: 뉴스 파일 생성

수집된 뉴스를 `.claude/news/YYYYMMDD_news.md` 파일로 저장합니다.

### 파일명 규칙

- 형식: `YYYYMMDD_news.md`
- 예시: `20260123_news.md`
- 오늘 날짜 기준

### 파일 형식

```markdown
# 뉴스 수집 - YYYY년 MM월 DD일

수집 시간: HH:MM
총 N개 항목

---

## Geeknews

- [ ] **제목1**
  - 날짜: YYYY-MM-DD
  - URL: https://...
  - 요약: 내용 미리보기...

- [ ] **제목2**
  - 날짜: YYYY-MM-DD
  - URL: https://...
  - 요약: 내용 미리보기...

---

## GitHub Releases

- [ ] **[vercel/next.js] v16.2.0**
  - 날짜: YYYY-MM-DD
  - URL: https://...
  - 요약: 변경 내용...

- [ ] **[anthropics/anthropic-sdk-python] v0.76.0**
  - 날짜: YYYY-MM-DD
  - URL: https://...
  - 요약: 변경 내용...

---

## 사용법

1. 발행할 뉴스 앞의 `[ ]`를 `[x]`로 변경
2. `/publish` 명령으로 포스트 생성
```

---

## Step 4: 완료 메시지

파일 생성 후 다음 메시지를 표시합니다:

```
✅ 뉴스 파일 생성 완료!

📄 파일: .claude/news/YYYYMMDD_news.md
📰 항목: N개

다음 단계:
1. 파일에서 발행할 뉴스를 체크 [x]
2. /publish 명령으로 포스트 생성
```

---

## 데이터 구조

수집된 뉴스 아이템 형식:

```typescript
interface RSSItem {
  id: string;
  title: string;
  link: string;
  content: string;
  date: string;
  source: "geeknews" | "github";
}
```

---

## 참고

- 뉴스는 소스별로 그룹화하여 표시
- Geeknews: 기본 10개
- GitHub: vercel/next.js, anthropics/anthropic-sdk-python, openai/openai-node 각 3개
- 기존 같은 날짜 파일이 있으면 덮어씀
