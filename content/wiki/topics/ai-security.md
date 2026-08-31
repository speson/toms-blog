---
name: AI 보안
type: topic
post_count: 18
key_entities:
  [
    "Promptfoo",
    "Codex Security",
    "Anthropic Mythos",
    "OpenAI Safety Bug Bounty",
    "Cloudflare Turnstile",
  ]
tags: ["보안", "프롬프트 인젝션", "AI 안전"]
---

# AI 보안

## 개요

LLM을 겨냥한 신종 공격 벡터(프롬프트 인젝션, 에이전트 하이재킹)부터 AI를 활용한 공격 자동화까지, 이 블로그에서 집중적으로 다루는 주제. 방어 측(Promptfoo 인수, Safety Bug Bounty, Codex Security)과 공격 측(Mythos 사이버보안 시연) 모두를 포괄하며, 보안이 토큰 투입량 경쟁으로 변모하는 패러다임 전환을 추적한다.

## 핵심 포인트

- 프롬프트 인젝션은 SQL 인젝션의 AI 버전으로, 사용자가 AI에게 원래 의도와 다른 동작을 유도하는 공격. 완벽한 방어가 불가능하다는 점이 SQL 인젝션과 결정적으로 다름
- Anthropic의 비공개 LLM Mythos는 32단계 기업 네트워크 공격 시뮬레이션을 10회 중 3회 완전 성공(경쟁 모델은 0회). 시도당 1억 토큰(약 $12,500) 소모 — 보안이 "토큰 예산 경쟁(Proof of Work)"으로 변하고 있다는 신호
- OpenAI는 Promptfoo를 인수하여 LLM 레드팀 테스트 역량을 내재화. Fortune 500의 25% 이상이 사용하던 오픈소스 도구가 OpenAI Frontier에 통합
- OpenAI Codex Security는 프로젝트 컨텍스트 전체를 분석해 복잡한 취약점을 탐지·검증·패치까지 제안하는 AI 보안 에이전트. AI가 만든 코드의 보안 구멍을 AI가 찾는 시대를 공식화
- OpenAI Safety Bug Bounty는 기존 보안 취약점 바운티와 별개로, 프롬프트 인젝션·에이전트 하이재킹·데이터 유출 등 AI 특유의 리스크를 신고하면 최대 $7,500 지급
- Cloudflare Turnstile이 ChatGPT 입력 시 브라우저 지문 28개, 네트워크 정보 5개, React 앱 상태 3개 등 총 55개 속성을 수집한다는 사실이 보안 연구자에 의해 공개. 봇 방어와 프라이버시의 경계 문제를 재조명
- Claude Code v2.1.92 엔터프라이즈 보안 강화 릴리스에서 PowerShell 취약점 4가지와 원격 정책 강제(fail-closed) 기능이 추가됨. AI 코딩 도구에 대한 엔터프라이즈 보안 요구가 구체화되고 있음
- Oh My OpenCode v4.4.0의 /security-research가 5인 적대적 보안팀(취약점 헌터 3 + PoC 엔지니어 2)을 한 명령으로 띄우는 첫 도메인 특화 팀 모드 스킬. CWE/OWASP WSTG·ASVS/CVSS v4.0 채택, "실제 익스플로잇 경로 없는 심각도는 보고하지 않음" 원칙으로 오탐 최소화
- 거버넌스가 보안 담론의 전면으로: OpenAI(Frontier Governance Framework·서드파티 평가 플레이북·선거 안전 S.1213/S.2346)와 Anthropic('대화 확대'·도덕적 형성)이 EU AI Act·캘리포니아 TFAIA 발효 직전 동시 발표. "안전 확보"보다 "안전을 누가 정의하느냐(평가 표준 선점)"의 협상 신호로 읽힘
- 위험 능력의 '거부' 대신 '격리 배포': Claude Fable 5(Mythos급, 일반 안전 버전)는 문제 요청을 거부하지 않고 Opus 4.8로 라우팅(세션 5% 미만), 사이버·생물화학·디스틸레이션 3대 영역 차단. 무방비 Mythos 5는 Project Glasswing 파트너 전용. 외부 버그바운티 1,000시간+에서 universal jailbreak 0건. 능력 경쟁이 '능력을 어떻게 가둬 배포하느냐' 설계 경쟁으로 이동
- AI가 공격의 '천장'이 아니라 '바닥'을 바꾼다: Anthropic의 832개 악성 계정 1년 분석(MITRE ATT&CK 매핑) — 67.3%가 멀웨어 개발에 AI 사용, medium+ 위험 비율 33%→56%(1.7배), 공격이 초기침투에서 post-compromise로 이동. 핵심 빈틈은 ATT&CK에 칸이 없는 'agentic orchestration'(모델이 공격 단계를 자율 연결). 스킬 기반 위험 평가 프레임의 한계
- 자율 안전의 한계 — 미 정부가 6/12 Fable 5·Mythos 5 전 고객 접근 중단 지시. 거부→라우팅·frontier_llm refusal 카테고리 등 안전 레이어가 SDK까지 내려와 있었지만 배포 권한 결정에선 변수가 아니었음. 첫 Anthropic Public Record: 71% 정부 규제 지지·15%만 AI 기업 신뢰. 잘 설계된 자율 안전은 필요조건이되 충분조건은 아님

## 관련 포스트

| 날짜       | 제목                                                 | 관점                                                                 |
| ---------- | ---------------------------------------------------- | -------------------------------------------------------------------- |
| 2026-02-19 | [[2026-02-19-prompt-injection-guide]]                | 프롬프트 인젝션 유형·방어 전략 완전 가이드                           |
| 2026-03-10 | [[2026-03-10-openai-acquires-promptfoo]]             | OpenAI의 AI 보안 테스트 내재화 — Promptfoo 인수                      |
| 2026-03-10 | [[2026-03-10-codex-security-preview]]                | Codex Security 리서치 프리뷰 — AI 취약점 탐지·패치 에이전트          |
| 2026-03-30 | [[2026-03-30-openai-safety-bug-bounty]]              | OpenAI Safety Bug Bounty — AI 전용 취약점 신고 프로그램              |
| 2026-04-01 | [[2026-04-01-chatgpt-cloudflare-react-state]]        | Cloudflare Turnstile의 55개 속성 수집 실태 — 프라이버시 vs 봇 방어   |
| 2026-04-06 | [[2026-04-06-claude-code-v2190-92]]                  | Claude Code v2.1.92 엔터프라이즈 보안 강화 릴리스                    |
| 2026-04-16 | [[2026-04-16-mythos-cybersecurity]]                  | Anthropic Mythos의 32단계 공격 시뮬레이션 — 사이버보안 패러다임 전환 |
| 2026-05-11 | [[2026-05-11-running-codex-safely]]      | Codex 보안 운영 전략 — 프로덕션 에이전트 보안 가이드                 |
| 2026-05-11 | [[2026-05-11-gpt55-cyber-trusted-access]]                         | GPT-5.5-Cyber — 보안 연구자를 위한 특화 모델                         |
| 2026-05-19 | [[2026-05-19-openai-dell-codex-enterprise]]          | OpenAI + Dell Codex 온프레미스 — 엔터프라이즈 보안 환경 배포         |
| 2026-05-24 | [[2026-05-24-oh-my-opencode-v440-security-research]] | OMOC /security-research — 5인 적대적 보안팀 스킬                     |
| 2026-06-02 | [[2026-06-02-frontier-ai-governance-signals]]        | 프론티어 거버넌스 동시 발표 = 규제 전야 표준 선점 (칼럼)             |
| 2026-06-10 | [[2026-06-10-claude-fable-5-mythos-5]]               | Fable 5 — 위험 능력의 '거부' 대신 '격리 배포' 설계 (칼럼)            |
| 2026-06-10 | [[2026-06-10-ai-cyber-threats-mitre]]                | AI 사이버 위협 832건 MITRE 매핑 — agentic orchestration 빈틈 (칼럼)  |
| 2026-06-15 | [[2026-06-15-fable-5-government-suspension]]         | 정부가 Fable 5 접근 중단 — 자율 안전 설계의 한계 (칼럼)              |

## 관련 토픽

- [[ai-agents]]
- [[llm-models]]
- [[mcp]]

## 관련 엔티티

- [[openai]]
- [[anthropic]]
- [[claude-code]]
