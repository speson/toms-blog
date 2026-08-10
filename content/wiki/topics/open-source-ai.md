---
name: 오픈소스 AI
type: topic
post_count: 24
key_entities:
  [
    "OpenCode",
    "Oh My OpenCode",
    "tldraw",
    "TideSurf",
    "Neovim",
    "ROACH PI",
    "GitButler",
    "Meta",
  ]
tags: ["오픈소스", "AI", "개발도구"]
---

# 오픈소스 AI

## 개요

오픈소스로 공개된 AI 도구, 모델, 프레임워크를 다루는 주제. OpenCode와 Oh My OpenCode처럼 상용 도구의 무료 대안이 되는 프로젝트부터, AI 시대의 오픈소스 생태계 변화(AI 생성 PR 문제, Meta의 새 모델 공개 예고 등)까지 21개 포스트가 이 주제를 다룬다.

## 핵심 포인트

- OpenCode(GitHub 스타 85K)는 Claude Code의 완전 무료 오픈소스 대안. v1.1.49부터 v1.4.3까지 빠르게 성장하며 데스크톱 앱, Azure, Cloudflare Workers AI, OTLP 관측성, Fast Mode까지 추가
- Oh My OpenCode는 OpenCode를 위한 에이전트 하네스 오픈소스 프로젝트. v3.0의 오케스트레이션 아키텍처부터 v3.5의 신뢰 경계 설계까지 커뮤니티 주도로 빠르게 진화
- tldraw(스타 44.7K)는 AI 생성 무분별 PR 대응으로 외부 기여를 자동으로 닫는 정책을 도입 - 오픈소스 유지 비용 문제를 드러냄
- OpenAI가 Promptfoo(Fortune 500 기업 25% 이상 사용)를 인수해 오픈소스 AI 보안 테스트 도구가 상업 플랫폼으로 흡수됨
- Meta가 Llama와 다른 새로운 AI 모델 패밀리를 '부분 오픈소스' 전략으로 공개 예고 - Scale AI 인수 후 Alexandr Wang 주도 개발
- ROACH PI는 Claude Code 위에서 Worker-Validator를 분리해 AI 에이전트에 공학적 규율을 부여하는 오픈소스 확장
- GitButler는 GitHub 공동창업자 Scott Chacon이 AI 에이전트와의 협업을 고려해 Git을 처음부터 재설계한 오픈소스 프로젝트
- TideSurf는 비전 모델 없이 CDP와 DOM 압축만으로 웹 탐색 에이전트를 구현, 84K→2.5K 토큰(32배) 압축률 달성
- Oh My OpenCode v4.4.0의 /security-research가 오픈소스 멀티 에이전트 프레임워크에서 도메인 특화 스킬을 본격적으로 시도. 산업 표준(CWE/OWASP/CVSS v4.0) 채택과 실제 익스플로잇 검증 원칙으로 보안 도구의 신뢰성 확보

## 관련 포스트

| 날짜       | 제목                                                 | 관점                                                         |
| ---------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| 2026-01-23 | [[2026-01-23-tldraw-closes-external-prs]]            | tldraw의 AI 생성 PR 차단 정책 - 오픈소스 유지 비용 문제      |
| 2026-01-24 | [[2026-01-24-oh-my-opencode]]                        | Oh My OpenCode - OpenCode용 에이전트 하네스 소개             |
| 2026-01-24 | [[2026-01-24-opencode-introduction]]                 | OpenCode 한 달 사용 후기                                     |
| 2026-01-25 | [[2026-01-25-oh-my-opencode-v3]]                     | Oh My OpenCode v3.0.0 - 오케스트레이션 혁명                  |
| 2026-01-28 | [[2026-01-28-oh-my-opencode-v314]]                   | Oh My OpenCode v3.1.4 버그 수정                              |
| 2026-01-29 | [[2026-01-29-oh-my-opencode-v317]]                   | Oh My OpenCode v3.1.7 - OAuth 2.1, MCP 지원                  |
| 2026-02-12 | [[2026-02-12-oh-my-opencode-v350]]                   | Oh My OpenCode v3.5.0 - 서브에이전트 신뢰 경계 설계          |
| 2026-02-12 | [[2026-02-12-opencode-v1160]]                        | OpenCode v1.1.60 - 구조화 출력 지원                          |
| 2026-02-19 | [[2026-02-19-oh-my-opencode-evolution]]              | Oh My OpenCode v3.0→v3.5 3주 진화 정리                       |
| 2026-02-19 | [[2026-02-19-opencode-releases-roundup]]             | OpenCode v1.1.49→v1.1.60 릴리스 정리                         |
| 2026-03-10 | [[2026-03-10-openai-acquires-promptfoo]]             | OpenAI의 Promptfoo 인수 - 오픈소스 AI 보안 도구의 상업화     |
| 2026-03-16 | [[2026-03-16-oh-my-agent]]                           | oh-my-agent - 오픈소스 에이전트 하네스 프레임워크            |
| 2026-03-16 | [[2026-03-16-opencode-v1227]]                        | OpenCode v1.2.27 안정성 개선                                 |
| 2026-03-16 | [[2026-03-16-tidesurf]]                              | TideSurf - DOM 압축으로 토큰 93% 절감한 오픈소스 웹 에이전트 |
| 2026-03-30 | [[2026-03-30-opencode-v132-133]]                     | OpenCode v1.3.2~1.3.3 - 데스크톱 앱, 이벤트 소싱             |
| 2026-04-01 | [[2026-04-01-neovim-012]]                            | Neovim 0.12.0 - 빌트인 플러그인 매니저, LSP 인라인 완성      |
| 2026-04-01 | [[2026-04-01-opencode-v135-137]]                     | OpenCode v1.3.5~1.3.7 - PowerShell 지원                      |
| 2026-04-06 | [[2026-04-06-opencode-v1315-1317]]                   | OpenCode v1.3.15~1.3.17 - Azure, Cloudflare Workers AI       |
| 2026-04-06 | [[2026-04-06-roach-pi]]                              | ROACH PI - Worker-Validator 분리 오픈소스 에이전트 확장      |
| 2026-04-14 | [[2026-04-14-gitbutler]]                             | GitButler - a16z 투자 유치, AI 시대용 Git 클라이언트         |
| 2026-04-14 | [[2026-04-14-meta-new-ai-model]]                     | Meta의 새 AI 모델 패밀리 - 부분 오픈소스 전략                |
| 2026-04-14 | [[2026-04-14-opencode-v140-143]]                     | OpenCode v1.4.0~1.4.3 메이저 업데이트                        |
| 2026-05-24 | [[2026-05-24-oh-my-opencode-v440-security-research]] | Oh My OpenCode v4.4.0 — /security-research 5인 보안팀 스킬   |
| 2026-08-10 | [[2026-08-10-4b-model-search-claim]]                 | 4B 모델이 검색에서 GPT-5.6 이겼다는 주장 검증 (Q&A) |

## 관련 토픽

- [[ai-coding-tools]]
- [[ai-agents]]
- [[mcp]]
- [[llm-models]]

## 관련 엔티티

- [[opencode]]
- [[anthropic]]
- [[openai]]
- [[meta]]
