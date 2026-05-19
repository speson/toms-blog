---
name: MCP (Model Context Protocol)
type: topic
post_count: 15
key_entities:
  [
    "Anthropic",
    "MCP Elicitation",
    "MCP OAuth",
    "Linear Agent Skill",
    "TideSurf",
  ]
tags: ["MCP", "프로토콜", "에이전트", "도구 연결"]
---

# MCP (Model Context Protocol)

## 개요

AI 모델이 외부 도구·데이터에 접근하는 방식을 표준화한 프로토콜. Anthropic이 제안했고 현재 가장 널리 채택된 에이전트 연결 표준. 이 블로그는 Claude Code, OpenCode, Oh My OpenCode의 릴리스 추적을 통해 MCP의 진화를 지속적으로 기록하며, OAuth 인증 표준화·메모리 누수 수정·대용량 결과 지원 등 생산 안정성 이슈를 집중 조명한다. 동시에 "MCP가 만능은 아니다"는 반론(CLI + Agent Skill 패턴)도 다룬다.

## 핵심 포인트

- MCP 이전에는 DB·Notion 등 각 서비스마다 전용 코드가 필요했으나, MCP는 표준화된 디스커버리 패턴으로 한 번 서버를 만들면 어떤 AI 클라이언트에서도 동일하게 사용 가능
- MCP Elicitation(v2.1.76)은 서버가 작업 중간에 사용자에게 추가 입력을 요청할 수 있는 기능. AI-도구-사용자 간 실시간 소통이 가능한 인터랙티브 워크플로우의 첫 구현
- MCP HTTP/SSE 연결의 메모리 누수(시간당 ~50MB)가 v2.1.97에서 수정됨. MCP 서버를 장시간 연결하는 운영 환경에서 필수 업데이트
- MCP v2.1.91에서 도구 결과 최대 500K 지원 추가. DB 스키마 같은 대용량 결과를 잘림 없이 전달 가능해짐
- Linear의 MCP 서버를 CLI + SKILL.md 조합으로 대체한 사례에서 토큰 45% 절감. MCP 프로토콜 오버헤드(JSON-RPC 메타데이터, 도구 디스커버리, 스키마 교환)가 실질적인 비용임을 시사
- Oh My OpenCode v3.1.7에서 OAuth 2.1(RFC 7591, RFC 9728) 완전 구현. 이전에 복잡했던 MCP 서버 인증 설정이 CLI 한 줄로 단순화
- AI 에이전트 프로토콜 6가지(MCP, A2A, UCP, AP2, A2UI, AG-UI) 중 MCP는 "도구-모델 연결"에 특화. 에이전트 간 통신(A2A), 결제(AP2), UI(AG-UI)는 별도 프로토콜이 담당하는 방향으로 분화
- GPT-5.4는 MCP Atlas 기준으로 36개 MCP 서버 연결 시에도 토큰 사용량 47% 절감. 수십 개 도구 중 필요한 도구만 정확히 호출하는 선택적 활용 능력을 벤치마크로 평가

## 관련 포스트

| 날짜       | 제목                                        | 관점                                                                   |
| ---------- | ------------------------------------------- | ---------------------------------------------------------------------- |
| 2026-01-29 | [[2026-01-29-oh-my-opencode-v317]]          | Oh My OpenCode v3.1.7 — MCP OAuth 2.1 완전 구현                        |
| 2026-02-05 | [[2026-02-05-claude-code-v2130]]            | Claude Code v2.1.30 — MCP OAuth Dynamic Client Registration 개선       |
| 2026-02-05 | [[2026-02-05-xcode-claude-agent-sdk]]       | Xcode + Claude Code MCP 통합 실전 가이드                               |
| 2026-03-10 | [[2026-03-10-gpt-5-4]]                      | GPT-5.4의 MCP Atlas 벤치마크 — 36개 서버 연결 시 토큰 47% 절감         |
| 2026-03-16 | [[2026-03-16-claude-code-v2174-76]]         | Claude Code v2.1.76 — MCP Elicitation 도입, 인터랙티브 워크플로우 가능 |
| 2026-03-16 | [[2026-03-16-tidesurf]]                     | TideSurf 웹 에이전트의 MCP 서버 지원                                   |
| 2026-03-23 | [[2026-03-23-linear-agent-skill]]           | Linear MCP를 CLI + Agent Skill로 대체 — 토큰 45% 절감                  |
| 2026-03-23 | [[2026-03-23-ai-agent-protocols-guide]]     | MCP부터 AG-UI까지 6가지 에이전트 프로토콜 완벽 가이드                  |
| 2026-03-30 | [[2026-03-30-openai-safety-bug-bounty]]     | OpenAI Safety Bug Bounty의 MCP 리스크 항목                             |
| 2026-03-30 | [[2026-03-30-claude-code-v2183-85]]         | Claude Code v2.1.83~85 — MCP 서버 환경변수 지원                        |
| 2026-04-06 | [[2026-04-06-claude-code-v2190-92]]         | Claude Code v2.1.91 — MCP 500K 대용량 결과 지원                        |
| 2026-04-14 | [[2026-04-14-claude-code-v2194-104]]        | Claude Code v2.1.97 — MCP 메모리 누수(시간당 50MB) 수정                |
| 2026-04-14 | [[2026-04-14-opencode-v140-143]]            | OpenCode v1.4.0 — MCP OAuth 리다이렉트 URI 설정 지원                   |
| 2026-04-16 | [[2026-04-16-claude-code-v21108-110]]       | Claude Code v2.1.110 — MCP 서버 연결 끊김 시 무한 대기 버그 수정       |
| 2026-05-19 | [[2026-05-19-anthropic-acquires-stainless]] | Stainless 인수 — MCP 커넥터 자동 생성 역량 내재화                      |

## 관련 토픽

- [[ai-agents]]
- [[ai-coding-tools]]
- [[ai-security]]

## 관련 엔티티

- [[anthropic]]
- [[claude-code]]
- [[openai]]
