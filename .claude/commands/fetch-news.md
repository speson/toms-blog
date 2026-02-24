# /fetch-news

AI 뉴스 및 릴리스 수집 후 선택 가능한 목록 생성

## 실행 단계

1. `pnpm fetch-news --source=ai --limit=5` 실행
2. 기존 포스트의 `sourceUrl`과 비교하여 이미 발행된 뉴스 자동 제거
3. 수집된 뉴스 목록을 `.claude/news/YYYYMMDD_news.md` 파일로 저장
4. 각 항목에 체크박스 `[ ]` 추가
5. 사용자에게 목록 표시 및 선택 안내

## 옵션

| 옵션                | 설명                   |
| ------------------- | ---------------------- |
| `--source=all`      | 전체 (기본값)          |
| `--source=geeknews` | Geeknews만             |
| `--source=ai`       | AI 블로그 + GitHub만   |
| `--limit=N`         | 소스당 N개씩 (기본 10) |
| `--no-dedup`        | 중복 제거 비활성화     |

## 뉴스 파일 형식

```markdown
# AI 뉴스 - YYYY-MM-DD

## 선택된 항목

아래 항목 중 발행할 뉴스를 선택하세요. `[ ]`를 `[x]`로 변경하면 됩니다.

---

- [ ] **1. [제목]**
  - Source: github | openai | anthropic | google
  - Date: YYYY-MM-DD
  - URL: https://...
  - 내용 미리보기...

- [ ] **2. [제목]**
      ...
```

## 사용자 안내

목록 표시 후 다음 메시지 출력:

```
발행할 항목을 선택해주세요.
예: "1, 3, 5번 선택" 또는 직접 파일에서 [x] 체크

선택 후 `/publish` 명령으로 포스트를 생성합니다.
```
