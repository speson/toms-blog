# /commit

Conventional Commits 형식으로 커밋 생성

## 사용법

```
/commit           # 커밋만 생성
/commit --push    # 커밋 후 자동 push
```

## 실행 단계

1. `git status`로 변경 사항 확인
2. `git diff --staged`로 스테이징된 변경 분석
3. 변경 내용 기반 커밋 메시지 생성
4. `git add .` 후 커밋
5. `--push` 플래그 있으면 `git push`

## 커밋 메시지 형식

```
[type](scope): description
```

| Type | 설명 |
|------|------|
| feat | 새로운 기능 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| style | 스타일/포맷 변경 |
| refactor | 리팩토링 |
| chore | 빌드/설정 변경 |
| content | 블로그 포스트 추가/수정 |

## 예시

```
feat(news): add Anthropic news scraping
content(posts): add Claude new constitution post
fix(rss): handle 404 errors gracefully
chore(deps): add cheerio for HTML parsing
```

## 주의사항

- `.env`, `credentials.json` 등 민감 파일 커밋 금지
- 커밋 전 `pnpm build` 성공 확인 권장
