---
name: AI 에이전트
type: topic
post_count: 19
key_entities:
  ["OpenAI Agents SDK", "Codex", "oh-my-agent", "Praktika", "OpenAI Harness팀"]
tags: ["에이전트", "AI"]
---

# AI 에이전트

## 개요

단순 챗봇을 넘어 자율적으로 작업을 계획하고 실행하는 AI 에이전트 아키텍처를 다루는 주제. Codex 에이전트 루프 해부, 멀티 에이전트 시스템, 에이전트 프로토콜(MCP, A2A 등), 그리고 Agentic Engine Optimization(AEO) 같은 새로운 개념까지 8개 포스트가 다룬다.

## 핵심 포인트

- OpenAI Codex의 에이전트 루프는 프롬프트 구성, 모델 추론, 도구 호출 세 단계로 구성되며 반복 실행 구조를 가짐
- OpenAI Harness팀은 5개월간 수동 코드 0줄, 100% Codex만으로 제품을 만들어 에이전트 퍼스트 개발의 가능성을 실증
- Praktika는 GPT-4.1과 GPT-5.2를 결합한 멀티 에이전트 아키텍처로 실시간 적응형 언어 학습 튜터를 구현
- oh-my-agent는 Clarification Debt 스코어링과 역할 기반 팀 구조로 에이전트를 제어하는 오픈소스 하네스 프레임워크
- AI 에이전트 프로토콜이 6가지(MCP, A2A, UCP, AP2, A2UI, AG-UI)로 분화됨. 각 프로토콜은 도구-에이전트, 에이전트-에이전트, 에이전트-UI 연결 등 다른 문제를 해결
- OpenAI Agents SDK는 오케스트레이션 레이어(하네스)와 코드 실행 환경(샌드박스)을 분리하는 방향으로 진화. 재시도, 인증, 상태 관리를 SDK가 내부적으로 처리
- AEO(Agentic Engine Optimization)는 AI 코딩 에이전트가 문서를 읽는 방식에 맞춰 최적화하는 새로운 개념으로 SEO의 에이전트 시대 후속 전략
- Gemini 3.5 Flash가 "frontier intelligence with action"을 표방하며 Terminal-Bench 76.2%·MCP Atlas 83.6% 점수로 에이전트 실행력에 무게중심을 옮김. 시장이 "더 똑똑한 모델"에서 "일을 끝내는 모델"로 평가 기준을 옮기는 흐름과 일치
- 도메인 특화 팀 모드 스킬 등장: Oh My OpenCode /security-research가 5인 보안 전문가 에이전트를 한 명령으로 띄움. 멀티 에이전트가 "팀을 띄울 수 있다"에서 "역할 분담과 산업 표준 채택까지 결합된 도메인 솔루션"으로 진보
- 엔터프라이즈 케이스 본격화: Virgin Atlantic이 휴가 시즌 절대 마감일에 Codex를 일정 전제로 두고 모바일 앱을 출시, P1 0건 달성. 에이전트가 도구가 아니라 팀원으로 다뤄지는 패턴
- Claude Code v2.1.198이 서브에이전트를 '기본 백그라운드'로 전환(옵션→기본값). 완료 알림(Notification 훅 agent_needs_input/agent_completed), worktree 자동 커밋·푸시·드래프트 PR, 서브에이전트의 메인 모델·확장사고 상속이 겹치며, 에이전트를 '기다리는 동기 대화'가 아니라 '보내 놓고 알림으로 회수하는 비동기 동료'로 다루는 방식이 기본값이 됨. 6/15 '무인 실행' 트렌드가 제품 기본 동작으로 굳어진 지점
- 자율 기본값화 이후 '정지 능력'이 제품 표면으로: Claude Code Auto 모드 분류기 폴백(3연속/20회 차단 시 자동 해제), Gemini Interactions의 cancel 엔드포인트, OMO의 WHEN TO STOP·서브에이전트 정지 계약(GOAL/STOP WHEN/EVIDENCE) — 시작하는 능력에서 멈추는 능력으로 경쟁축 이동
- 폭주의 실물 물증 등장: Codex 부모 세션 1개가 서브에이전트 2,393개·로그 731.5GiB 생성(#34061). 같은 주 3사가 자원 상한 도입 — OpenCode 중첩 서브에이전트 기본 차단(subagent_depth), Claude Code 세션당 스폰 캡 200, OMO 대기 규율. 정지 조건 다음 단계로 '자원 상한(budget)'이 제품 표면에 등장

## 관련 포스트

| 날짜       | 제목                                                    | 관점                                                                    |
| ---------- | ------------------------------------------------------- | ----------------------------------------------------------------------- |
| 2026-01-25 | [[2026-01-25-openai-codex-agent-loop]]                  | OpenAI Codex 에이전트 루프 기술적 해부                                  |
| 2026-01-26 | [[2026-01-26-praktika-ai-language-learning]]            | Praktika의 멀티 에이전트 언어 튜터 시스템                               |
| 2026-01-29 | [[2026-01-29-openai-in-house-data-agent]]               | OpenAI 내부 데이터 에이전트 - GPT-5, Codex, Memory 활용                 |
| 2026-02-12 | [[2026-02-12-harness-engineering-codex]]                | OpenAI Harness팀의 100% Codex 개발 실험                                 |
| 2026-03-16 | [[2026-03-16-oh-my-agent]]                              | oh-my-agent - Clarification Debt 스코어링 기반 에이전트 제어            |
| 2026-03-23 | [[2026-03-23-ai-agent-protocols-guide]]                 | AI 에이전트 프로토콜 6가지 완벽 가이드                                  |
| 2026-04-16 | [[2026-04-16-agentic-engine-optimization]]              | AEO - AI 에이전트 시대의 새로운 최적화 전략                             |
| 2026-04-16 | [[2026-04-16-openai-agents-sdk-evolution]]              | OpenAI Agents SDK 진화 - 네이티브 샌드박스, 모델 네이티브 하네스        |
| 2026-05-11 | [[2026-05-11-openai-codex-security-operations]]         | Codex 보안 운영 전략 — 에이전트 보안 관리                               |
| 2026-05-11 | [[2026-05-11-oh-my-opencode-v400]]                      | Oh My OpenCode v4.0.0 — 팀 모드 멀티에이전트 협업                       |
| 2026-05-11 | [[2026-05-11-anthropic-sdk-managed-agents]]             | Anthropic SDK Managed Agents — SDK 레벨 에이전트 관리                   |
| 2026-05-19 | [[2026-05-19-anthropic-sdk-self-hosted-sandbox]]        | Anthropic SDK 셀프 호스팅 샌드박스 — 에이전트 실행 환경 자체 구축       |
| 2026-05-19 | [[2026-05-19-anthropic-acquires-stainless]]             | Stainless 인수 — SDK 자동 생성·MCP 커넥터 생성 내재화                   |
| 2026-05-20 | [[2026-05-20-gemini-3-5-frontier]]                      | Gemini 3.5 — 에이전트 작업에 초점을 맞춘 frontier 모델                  |
| 2026-05-22 | [[2026-05-22-virgin-atlantic-codex]]                    | Virgin Atlantic Codex 케이스 — 에이전트를 일정 전제로 두는 패턴         |
| 2026-05-24 | [[2026-05-24-oh-my-opencode-v440-security-research]]    | OMOC /security-research — 도메인 특화 멀티 에이전트 팀 모드             |
| 2026-07-03 | [[2026-07-03-claude-code-subagents-background-default]] | 서브에이전트 기본 백그라운드화 — 에이전트를 비동기 동료로 다루는 기본값 |
| 2026-07-14 | [[2026-07-14-agents-learn-to-stop]] | 자율 기본값화 이후 경쟁축은 '멈추는 능력' — 3사 정지 장치 비교 |
| 2026-07-21 | [[2026-07-21-agent-runaway-receipts]] | 폭주 물증(731.5GiB)과 3사의 자원 상한 — 깊이·횟수·대기의 budget화 |

## 관련 토픽

- [[ai-coding-tools]]
- [[mcp]]
- [[open-source-ai]]
- [[llm-models]]

## 관련 엔티티

- [[openai]]
- [[anthropic]]
- [[claude-code]]
