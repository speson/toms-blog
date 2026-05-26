---
name: Oh My OpenCode
type: entity
aliases: [OMOC]
first_covered: "2026-01-24"
last_covered: "2026-05-24"
post_count: 11
related_entities: [opencode, claude-code, anthropic]
tags: [AI, Oh My OpenCode, 오픈소스, 개발도구, 오케스트레이션]
---

# Oh My OpenCode

## 개요

GitHub 스타 22K 이상의 오픈소스 AI 에이전트 오케스트레이션 레이어. OpenCode 위에서 동작하며 멀티 에이전트 병렬 처리, LSP/AST 도구, Claude Code 호환성 등을 제공한다. 블로그에서는 소개 글부터 v3.0~v3.5까지의 릴리스를 꾸준히 추적했으며, 3주간 진화 분석 글도 발행됐다.

## 주요 다룬 내용

- 소개: OpenCode 위의 오케스트레이션 레이어, 멀티 에이전트·LSP/AST 도구 — [[2026-01-24-oh-my-opencode]]
- v3.0.0: 동적 에이전트 구성, Prometheus 플래너, Atlas 오케스트레이터 — [[2026-01-25-oh-my-opencode-v3]]
- v3.1.4: Provider Cache 경고 토스트, npm 글로벌 설치 버그 수정 — [[2026-01-28-oh-my-opencode-v314]]
- v3.1.7: MCP 서버 OAuth 2.1 완전 지원, LSP 클라이언트 마이그레이션 — [[2026-01-29-oh-my-opencode-v317]]
- v3.2.2: GPT-5.2 프롬프트 최적화, 모델 기반 라우팅 — [[2026-02-03-oh-my-opencode-v3-2-2]]
- v3.2.3: Exa·Tavily 웹서치 프로바이더 선택, 스킬 파일 폴더 정리 — [[2026-02-05-oh-my-opencode-v323]]
- v3.5.0: Atlas Trusts No One, 서브에이전트 결과 수동 검증, 645개 파일 리팩토링 — [[2026-02-12-oh-my-opencode-v350]]
- v3.0→v3.5 3주간 진화 종합 분석 — [[2026-02-19-oh-my-opencode-evolution]]
- v4.0.0: 팀 모드로 멀티에이전트 협업 지원 — [[2026-05-11-oh-my-opencode-v400]]
- v4.2.0: 안정성 기초 개선, 신뢰도 향상 릴리스 — [[2026-05-19-oh-my-opencode-v420]]
- v4.4.0: /security-research 팀 모드 스킬 — 5인 적대적 보안팀(취약점 헌터 3 + PoC 엔지니어 2), CWE/OWASP/CVSS v4.0 표준 채택, 실제 익스플로잇 경로 기반 검증 — [[2026-05-24-oh-my-opencode-v440-security-research]]

## 타임라인

| 날짜       | 내용                                     | 포스트                                               |
| ---------- | ---------------------------------------- | ---------------------------------------------------- |
| 2026-01-24 | 소개 및 사용 후기 발행                   | [[2026-01-24-oh-my-opencode]]                        |
| 2026-01-25 | v3.0.0: 오케스트레이션 혁명              | [[2026-01-25-oh-my-opencode-v3]]                     |
| 2026-01-28 | v3.1.4: 버그 수정 릴리스                 | [[2026-01-28-oh-my-opencode-v314]]                   |
| 2026-01-29 | v3.1.7: OAuth 2.1 완전 지원              | [[2026-01-29-oh-my-opencode-v317]]                   |
| 2026-02-03 | v3.2.2: GPT-5.2 최적화, 모델 기반 라우팅 | [[2026-02-03-oh-my-opencode-v3-2-2]]                 |
| 2026-02-05 | v3.2.3: 웹서치 프로바이더 선택 기능      | [[2026-02-05-oh-my-opencode-v323]]                   |
| 2026-02-12 | v3.5.0: Atlas Trusts No One              | [[2026-02-12-oh-my-opencode-v350]]                   |
| 2026-02-19 | v3.0→v3.5 3주간 진화 종합 분석           | [[2026-02-19-oh-my-opencode-evolution]]              |
| 2026-05-11 | v4.0.0: 팀 모드 멀티에이전트 협업        | [[2026-05-11-oh-my-opencode-v400]]                   |
| 2026-05-19 | v4.2.0: 안정성 기초 개선                 | [[2026-05-19-oh-my-opencode-v420]]                   |
| 2026-05-24 | v4.4.0: /security-research 팀 모드 스킬  | [[2026-05-24-oh-my-opencode-v440-security-research]] |

## 관련 엔티티

- [[opencode]]
- [[claude-code]]
- [[anthropic]]
