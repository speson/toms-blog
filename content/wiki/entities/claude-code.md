---
name: Claude Code
type: entity
aliases: []
first_covered: "2026-01-23"
last_covered: "2026-08-31"
post_count: 34
related_entities: [anthropic, opencode, oh-my-opencode, codex]
tags: [AI, Claude Code, 개발도구, Anthropic, 릴리스]
---

# Claude Code

## 개요

Anthropic이 개발한 AI 코딩 에이전트. 블로그에서 가장 많은 릴리스 노트가 작성된 도구로, v2.1.16(2026-01-23)부터 v2.1.251(2026-08-28)까지 꾸준히 추적·분석되고 있다. 한 달 추적기, HTTP Hooks, Skills 가이드 등 심층 분석 포스트도 다수 발행됐다.

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
- K자형 생산성 분석: AI 도구 도입으로 개발자 생산성이 K자형으로 분화되는 현상 — [[2026-05-06-claude-code-k-shaped-productivity]]
- v2.1.128~131: 최신 릴리스 누적 개선 사항 — [[2026-05-06-claude-code-v21128-131]]
- Claude 사용량 한도 2배 인상, SpaceX 파트너십으로 인프라 확장 — [[2026-05-11-claude-usage-limits-spacex]]
- v2.1.142~144: 에이전트 플래그와 백그라운드 세션 기능 추가 — [[2026-05-19-claude-code-v21142-144]]
- v2.1.149: /usage 카테고리별 분석(스킬·서브에이전트·플러그인·MCP), /diff 키보드 내비게이션, GFM 체크박스 렌더링 — [[2026-05-23-claude-code-v21149]]
- v2.1.157~159: `.claude/skills` 플러그인 자동 로드·`plugin init` 스캐폴딩, Auto 모드 Bedrock/Vertex/Foundry 확장(Opus 4.7/4.8) — [[2026-06-01-claude-code-v21157-159]]
- v2.1.175~177: enforceAvailableModels 모델 거버넌스 + 백그라운드 에이전트 다수 수정, '무인 실행' 다이제스트의 일부 — [[2026-06-15-coding-agents-background-autonomy]]
- v2.1.198: 서브에이전트 기본 백그라운드 실행 + worktree 자동 커밋·푸시·드래프트 PR, 서브에이전트·압축의 모델/확장사고 상속 — '대화 상대에서 비동기 동료로' 칼럼 — [[2026-07-03-claude-code-subagents-background-default]]
- v2.1.207~209: Auto 모드가 Bedrock·Vertex·Foundry에서 옵트인 없이 기본 제공(분류기 사전 검토, 3연속/20회 차단 시 폴백, 저장소 설정의 자기 승격 차단) — '멈추는 능력이 제품' 칼럼 — [[2026-07-14-agents-learn-to-stop]]
- v2.1.210~215: 세션당 서브에이전트 스폰 캡(기본 200, runaway delegation loop 차단)·웹서치 캡, /verify·/code-review 자발 실행 중단, 백그라운드 결과 날조 대신 실제 완료 대기, fail-closed 권한 수정 — '폭주의 청구서' 칼럼 — [[2026-07-21-agent-runaway-receipts]]

## 타임라인

| 날짜       | 내용                                                                    | 포스트                                                  |
| ---------- | ----------------------------------------------------------------------- | ------------------------------------------------------- |
| 2026-01-23 | v2.1.16: 태스크 관리 시스템, VSCode 플러그인 관리                       | [[2026-01-23-claude-code-v2116]]                        |
| 2026-01-25 | v2.1.19: 태스크 관리 환경변수, VSCode 세션 포크                         | [[2026-01-25-claude-code-v2119]]                        |
| 2026-02-05 | v2.1.30: PDF 페이지 범위 지정                                           | [[2026-02-05-claude-code-v2130]]                        |
| 2026-02-05 | v2.1.31: 세션 재개 힌트, 일본어 지원                                    | [[2026-02-05-claude-code-v2131]]                        |
| 2026-02-12 | v2.1.39: 터미널 렌더링 성능 개선                                        | [[2026-02-12-claude-code-v2139]]                        |
| 2026-02-13 | v2.1.41: auth 명령어, Windows ARM64 지원                                | [[2026-02-13-claude-code-v2141]]                        |
| 2026-02-19 | v2.1.47: 역대 최대 규모 버그 수정                                       | [[2026-02-19-claude-code-v2147]]                        |
| 2026-02-19 | 한 달 추적기(v2.1.16→v2.1.47) 분석                                      | [[2026-02-19-claude-code-one-month-tracker]]            |
| 2026-03-05 | HTTP Hooks 기능 추가                                                    | [[2026-03-05-claude-code-http-hooks]]                   |
| 2026-03-10 | v2.1.71~72: /loop, Tool Search                                          | [[2026-03-10-claude-code-v2172]]                        |
| 2026-03-16 | v2.1.74~76: MCP Elicitation, /effort                                    | [[2026-03-16-claude-code-v2174-76]]                     |
| 2026-03-23 | Skills 실전 가이드 발행                                                 | [[2026-03-23-claude-code-skills]]                       |
| 2026-03-23 | v2.1.77~79: 64K 토큰, 메모리 최적화                                     | [[2026-03-23-claude-code-v2177-79]]                     |
| 2026-03-30 | v2.1.83~85: 조건부 훅, PowerShell, 팀 정책                              | [[2026-03-30-claude-code-v2183-85]]                     |
| 2026-04-01 | v2.1.86~87: 버그 수정, 토큰 절약                                        | [[2026-04-01-claude-code-v2186-87]]                     |
| 2026-04-06 | v2.1.90~92: /powerup, MCP 500K 지원                                     | [[2026-04-06-claude-code-v2190-92]]                     |
| 2026-04-14 | v2.1.94~104: Mantle, NO_FLICKER, 팀 온보딩                              | [[2026-04-14-claude-code-v2194-104]]                    |
| 2026-04-16 | v2.1.108~110: /tui 풀스크린, 세션 리캡, 푸시 알림                       | [[2026-04-16-claude-code-v21108-110]]                   |
| 2026-04-27 | v2.1.118~120: vim visual mode, /config persist, custom themes           | [[2026-04-27-claude-code-v21118-120]]                   |
| 2026-05-06 | K자형 생산성 분석 — AI 도구로 인한 개발자 생산성 양극화                 | [[2026-05-06-claude-code-k-shaped-productivity]]        |
| 2026-05-06 | v2.1.128~131: 최신 릴리스 누적 개선                                     | [[2026-05-06-claude-code-v21128-131]]                   |
| 2026-05-11 | Claude 사용량 한도 2배 인상 + SpaceX 파트너십                           | [[2026-05-11-claude-usage-limits-spacex]]               |
| 2026-05-19 | v2.1.142~144: 에이전트 플래그, 백그라운드 세션                          | [[2026-05-19-claude-code-v21142-144]]                   |
| 2026-05-23 | v2.1.149: /usage 카테고리별 분석, /diff 키보드 내비게이션               | [[2026-05-23-claude-code-v21149]]                       |
| 2026-06-01 | v2.1.157~159: skills 플러그인 자동 로드, Auto 모드 클라우드 확장        | [[2026-06-01-claude-code-v21157-159]]                   |
| 2026-06-15 | v2.1.175~177: enforceAvailableModels 거버넌스, 백그라운드 에이전트 수정 | [[2026-06-15-coding-agents-background-autonomy]]        |
| 2026-07-03 | v2.1.198: 서브에이전트 기본 백그라운드화 + worktree 자동 PR (칼럼)      | [[2026-07-03-claude-code-subagents-background-default]] |
| 2026-07-14 | v2.1.207~209: Auto 모드 기본화(서드파티 클라우드), 분류기 폴백 (칼럼)   | [[2026-07-14-agents-learn-to-stop]] |
| 2026-07-21 | v2.1.210~215: 스폰 캡·자발 스킬 실행 중단 (폭주 청구서 칼럼)            | [[2026-07-21-agent-runaway-receipts]] |
| 2026-07-27 | v2.1.219: Opus 5 기본 편입(1M ctx), /fast Opus5·4.8, strictAllowlist    | [[2026-07-27-claude-opus-5]] |
| 2026-07-28 | Auto 모드 완전 가이드 — 분류기·3/20 폴백·disableAutoMode      | [[2026-07-28-claude-code-auto-mode-guide]] |
| 2026-08-31 | v2.1.248~251: --restricted 플래그, PreModelSwitch/PostModelSwitch 훅, /usage 지출 한도 바, 캐시 라인 — 121항목 분류·제한 모드 실측 (Q&A) | [[2026-08-31-claude-code-v21248-251-restrictions-first]] |

## 관련 엔티티

- [[anthropic]]
- [[opencode]]
- [[oh-my-opencode]]
- [[codex]]
