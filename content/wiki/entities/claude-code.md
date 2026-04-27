---
name: Claude Code
type: entity
aliases: []
first_covered: "2026-01-23"
last_covered: "2026-04-27"
post_count: 21
related_entities: [anthropic, opencode, oh-my-opencode, codex]
tags: [AI, Claude Code, 개발도구, Anthropic, 릴리스]
---

# Claude Code

## 개요

Anthropic이 개발한 AI 코딩 에이전트. 블로그에서 가장 많은 릴리스 노트가 작성된 도구로, v2.1.16(2026-01-23)부터 v2.1.110(2026-04-16)까지 꾸준히 추적·분석되고 있다. 한 달 추적기, HTTP Hooks, Skills 가이드 등 심층 분석 포스트도 다수 발행됐다.

## 주요 다룬 내용

- v2.1.16: 태스크 관리 시스템, VSCode 플러그인 관리 추가 — [[2026-01-23-claude-code-v2116]]
- v2.1.19: 태스크 관리 환경변수, VSCode 세션 포크 — [[2026-01-25-claude-code-v2119]]
- v2.1.30: PDF 페이지 범위 지정 읽기 — [[2026-02-05-claude-code-v2130]]
- v2.1.31: 세션 재개 힌트, 일본어 입력 지원 — [[2026-02-05-claude-code-v2131]]
- v2.1.39: 터미널 렌더링 성능 개선 — [[2026-02-12-claude-code-v2139]]
- v2.1.41: `claude auth` 명령어, Windows ARM64 지원 — [[2026-02-13-claude-code-v2141]]
- v2.1.47: 역대 최대 규모 버그 수정(60개 이상) — [[2026-02-19-claude-code-v2147]]
- 한 달 추적기(v2.1.16→v2.1.47): 7번 릴리스, 100개 이상 버그 수정 분석 — [[2026-02-19-claude-code-one-month-tracker]]
- HTTP Hooks: 웹앱으로 에이전트 상태 확인·권한 관리 — [[2026-03-05-claude-code-http-hooks]]
- v2.1.71~72: /loop 커맨드, Tool Search — [[2026-03-10-claude-code-v2172]]
- v2.1.74~76: MCP Elicitation, /effort 커맨드, 메모리 릭 수정 — [[2026-03-16-claude-code-v2174-76]]
- Skills 실전 가이드: 수백 개 스킬 운용 노하우 — [[2026-03-23-claude-code-skills]]
- v2.1.77~79: Opus 4.6 기본 토큰 64k, 메모리 최적화 — [[2026-03-23-claude-code-v2177-79]]
- v2.1.83~85: 조건부 훅, PowerShell 프리뷰, 드롭인 팀 정책 — [[2026-03-30-claude-code-v2183-85]]
- v2.1.86~87: 대규모 버그 수정, 토큰 절약 개선 — [[2026-04-01-claude-code-v2186-87]]
- v2.1.90~92: /powerup 인터랙티브 레슨, MCP 500K 결과 지원 — [[2026-04-06-claude-code-v2190-92]]
- v2.1.94~104: Mantle 지원, NO_FLICKER 포커스 뷰, /team-onboarding — [[2026-04-14-claude-code-v2194-104]]
- v2.1.108~110: /tui 풀스크린 모드, 세션 리캡, 모바일 푸시 알림 — [[2026-04-16-claude-code-v21108-110]]
- v2.1.118~120: vim visual mode, /config persist, custom themes — [[2026-04-27-claude-code-v21118-120]]

## 타임라인

| 날짜       | 내용                                                          | 포스트                                       |
| ---------- | ------------------------------------------------------------- | -------------------------------------------- |
| 2026-01-23 | v2.1.16: 태스크 관리 시스템, VSCode 플러그인 관리             | [[2026-01-23-claude-code-v2116]]             |
| 2026-01-25 | v2.1.19: 태스크 관리 환경변수, VSCode 세션 포크               | [[2026-01-25-claude-code-v2119]]             |
| 2026-02-05 | v2.1.30: PDF 페이지 범위 지정                                 | [[2026-02-05-claude-code-v2130]]             |
| 2026-02-05 | v2.1.31: 세션 재개 힌트, 일본어 지원                          | [[2026-02-05-claude-code-v2131]]             |
| 2026-02-12 | v2.1.39: 터미널 렌더링 성능 개선                              | [[2026-02-12-claude-code-v2139]]             |
| 2026-02-13 | v2.1.41: auth 명령어, Windows ARM64 지원                      | [[2026-02-13-claude-code-v2141]]             |
| 2026-02-19 | v2.1.47: 역대 최대 규모 버그 수정                             | [[2026-02-19-claude-code-v2147]]             |
| 2026-02-19 | 한 달 추적기(v2.1.16→v2.1.47) 분석                            | [[2026-02-19-claude-code-one-month-tracker]] |
| 2026-03-05 | HTTP Hooks 기능 추가                                          | [[2026-03-05-claude-code-http-hooks]]        |
| 2026-03-10 | v2.1.71~72: /loop, Tool Search                                | [[2026-03-10-claude-code-v2172]]             |
| 2026-03-16 | v2.1.74~76: MCP Elicitation, /effort                          | [[2026-03-16-claude-code-v2174-76]]          |
| 2026-03-23 | Skills 실전 가이드 발행                                       | [[2026-03-23-claude-code-skills]]            |
| 2026-03-23 | v2.1.77~79: 64K 토큰, 메모리 최적화                           | [[2026-03-23-claude-code-v2177-79]]          |
| 2026-03-30 | v2.1.83~85: 조건부 훅, PowerShell, 팀 정책                    | [[2026-03-30-claude-code-v2183-85]]          |
| 2026-04-01 | v2.1.86~87: 버그 수정, 토큰 절약                              | [[2026-04-01-claude-code-v2186-87]]          |
| 2026-04-06 | v2.1.90~92: /powerup, MCP 500K 지원                           | [[2026-04-06-claude-code-v2190-92]]          |
| 2026-04-14 | v2.1.94~104: Mantle, NO_FLICKER, 팀 온보딩                    | [[2026-04-14-claude-code-v2194-104]]         |
| 2026-04-16 | v2.1.108~110: /tui 풀스크린, 세션 리캡, 푸시 알림             | [[2026-04-16-claude-code-v21108-110]]        |
| 2026-04-27 | v2.1.118~120: vim visual mode, /config persist, custom themes | [[2026-04-27-claude-code-v21118-120]]        |

## 관련 엔티티

- [[anthropic]]
- [[opencode]]
- [[oh-my-opencode]]
- [[codex]]
