---
name: LLM 모델
type: topic
post_count: 22
key_entities:
  [
    "GPT-5.2",
    "GPT-5.3",
    "GPT-5.4",
    "Claude Opus 4.6",
    "Claude Opus 4.7",
    "Claude Opus 4.8",
    "Claude Sonnet 4.6",
    "Gemini 3",
    "Gemini 3.1",
    "Gemini 3.5",
    "Gemini Omni",
    "Claude Fable 5",
    "Claude Mythos 5",
    "Claude Sonnet 5",
    "Meta 새 모델",
  ]
tags: ["LLM", "모델 릴리스", "모델비교", "언어 모델"]
---

# LLM 모델

## 개요

OpenAI(GPT-5.x 시리즈), Anthropic(Claude 4.6 라인), Google(Gemini 3.x 시리즈), Meta(새 모델 패밀리)의 모델 릴리스와 비교를 다루는 주제. 벤치마크 점수 대신 실제 사용 관점의 비교와 아키텍처 분석에 초점을 맞추며, 모델 출시 속도가 빨라지면서 "어떤 모델을 언제 쓸 것인가"라는 실용적 판단 기준을 제공한다.

## 핵심 포인트

- 2026년 초 기준 GPT-5.2(수학/논리), Claude Sonnet 4.6(코딩/한국어), Gemini 2.0 Pro(초대형 컨텍스트/멀티모달)로 용도별 분화가 정착. 단일 최강 모델은 없고 작업에 따라 선택해야 함
- Claude Opus 4.6은 GDPval-AA(경제적 가치 있는 업무) 벤치마크에서 GPT-5.2 대비 +144 Elo. 사이버보안 능력 강화에 맞춘 6개 새 보안 프로브 도입
- Claude Sonnet 4.6은 Opus급 성능을 Sonnet 가격에 제공. 프롬프트 인젝션 방어가 Sonnet 4.5 대비 크게 개선되어 Opus 4.6 수준에 근접
- GPT-5.3-Codex-Spark는 OpenAI 최초의 실시간 코딩 모델로, 스트리밍 편집 중 지연 없이 코드 완성을 제공
- GPT-5.4는 코딩·컴퓨터 사용·도구 검색을 한 모델에 통합. MCP Atlas 기준 토큰 47% 절감, 36개 MCP 서버 연결에서도 필요한 도구만 선택적 호출
- GPT-5.4 mini와 nano는 각각 더 작고 빠른 스펙트럼을 추가하며 OpenAI의 모델 티어 다변화를 완성
- Gemini 3 Deep Think는 과학·공학 전문 추론 모드를 탑재. 2M 토큰 컨텍스트 윈도우는 초대형 코드베이스나 문서 처리에서 독보적
- Gemini 3.1 Flash-Lite는 Gemini 3 라인 중 가장 빠르고 저렴한 선택지. 비용 대비 성능이 핵심 포지셔닝
- LLM 아키텍처는 Dense → MoE(Mixture of Experts) → Hybrid 구조로 진화. Sebastian Raschka의 182메가픽셀 갤러리가 2024~2026년 주요 모델 구조 차이를 시각화
- Meta가 Llama와 별개로 완전히 새로운 모델 패밀리를 '부분 오픈소스' 전략으로 준비 중. Scale AI 인수 후 Alexandr Wang이 주도하는 프로젝트
- MoE(Mixture of Experts) 아키텍처가 대형 언어 모델의 사실상 표준으로 자리잡는 중. GPT-4, Gemini 1.5, DeepSeek 등 주요 모델이 MoE를 채택하며 Dense 모델 대비 파라미터 효율을 대폭 향상
- Gemini 3.5는 "frontier intelligence with action"을 전면에 내세우며 에이전트 작업 실행력에 집중. Flash가 먼저 출시되어 경쟁 프런티어 모델 대비 4배 빠른 출력·50% 저렴한 가격으로 포지셔닝. Terminal-Bench 76.2%·MCP Atlas 83.6% 등 에이전트 중심 벤치마크 강조
- OpenAI 모델이 80년 묵은 unit distance problem 관련 추측을 반증하며 AI가 수학적 발견의 주체로 등장. 추론 모델의 활용처가 학술 연구까지 확장
- Claude Opus 4.8은 벤치마크 점수보다 신뢰성에 초점. Opus 4.7 대비 코드 결함을 놓칠 확률 약 4배 감소, 모르는 것을 정직하게 표시, 도구 호출 효율 개선. 가격은 동일($5/$25)하되 Fast 모드가 3배 저렴해짐($10/$50). 정렬 평가에서 친사회성 최고치·오정렬 행동 감소를 동시 달성하며 "성능과 안전성 동시 개선" 서사 강화
- Gemini Omni는 Google의 새 영상 생성 모델로, 이미지·오디오·비디오·텍스트 등 어떤 입력이든 영상으로 변환. 캐릭터·물리·장면 연속성 일관성 유지와 대화형 편집이 차별점. 모델 경쟁이 텍스트·코딩을 넘어 멀티모달 생성으로 확장되는 흐름을 보여줌
- Claude Sonnet 5는 Opus 4.8에 근접한 성능을 프로모션 $2/$10(정가 $3/$15)에 제공하며 전 플랜 기본 모델이 됨. 2월 Sonnet 4.6의 'Opus급을 Sonnet 가격에' 서사를 이어받되, 이번엔 성능뿐 아니라 가격까지 내리며 티어를 가르는 축이 '성능'에서 '가격·먼저 도달한 시간'으로 이동. 위험 능력(사이버)은 현재 Opus보다 의도적으로 낮춰, 능력과 배포 범위를 분리하는 설계

## 관련 포스트

| 날짜       | 제목                                                | 관점                                                                        |
| ---------- | --------------------------------------------------- | --------------------------------------------------------------------------- |
| 2026-02-12 | [[2026-02-12-claude-opus-46]]                       | Claude Opus 4.6 출시 — GDPval-AA +144 Elo, 보안 프로브 6개 신규             |
| 2026-02-13 | [[2026-02-13-gemini-3-deep-think]]                  | Gemini 3 Deep Think — 과학/공학 전문 추론 모드 업그레이드                   |
| 2026-02-13 | [[2026-02-13-gpt53-codex-spark]]                    | GPT-5.3-Codex-Spark — OpenAI 최초 실시간 코딩 모델                          |
| 2026-02-19 | [[2026-02-19-claude-sonnet-46]]                     | Claude Sonnet 4.6 — Opus급 성능을 Sonnet 가격에                             |
| 2026-02-19 | [[2026-02-19-ai-model-comparison-2026]]             | 2026년 2월 주요 모델 실사용 비교 — GPT-5.2 vs Claude Sonnet 4.6 vs Gemini 2 |
| 2026-02-19 | [[2026-02-19-gemini-ecosystem-guide]]               | 개발자를 위한 Gemini 생태계 완전 가이드 2026                                |
| 2026-03-05 | [[2026-03-05-gemini-3-1-flash-lite]]                | Gemini 3.1 Flash-Lite — 가장 빠르고 저렴한 Gemini 3 모델                    |
| 2026-03-05 | [[2026-03-05-gpt-5-3-instant]]                      | GPT-5.3 Instant — 더 자연스럽고 덜 거부하는 ChatGPT                         |
| 2026-03-10 | [[2026-03-10-gpt-5-4]]                              | GPT-5.4 — 코딩·컴퓨터 사용·도구 검색 통합 모델                              |
| 2026-03-16 | [[2026-03-16-llm-architecture-gallery]]             | LLM 아키텍처 갤러리 — Dense/MoE/Hybrid 구조 진화 시각화                     |
| 2026-03-23 | [[2026-03-23-gpt-5-4-mini-nano]]                    | GPT-5.4 mini·nano — 더 작고 빠르고 저렴한 티어 추가                         |
| 2026-03-30 | [[2026-03-30-gemini-31-flash-live]]                 | Gemini 3.1 Flash Live — 실시간 음성 AI 새 기준                              |
| 2026-04-14 | [[2026-04-14-meta-new-ai-model]]                    | Meta 새 AI 모델 패밀리 — Llama 아닌 부분 오픈소스 전략                      |
| 2026-04-16 | [[2026-04-16-gemini-31-flash-tts]]                  | Gemini 3.1 Flash TTS — AI 음성 생성 세밀 제어                               |
| 2026-04-20 | [[2026-04-20-claude-opus-4-7]]                      | Claude Opus 4.7 출시 — 시스템 프롬프트 변경 사항 포함                       |
| 2026-04-27 | [[2026-04-27-gpt-5-5]]                              | GPT-5.5 출시                                                                |
| 2026-04-27 | [[2026-04-27-moe-architecture-explained]]           | MoE 아키텍처 해설 — Mixture of Experts 표준화 분석                          |
| 2026-05-20 | [[2026-05-20-gemini-3-5-frontier]]                  | Gemini 3.5 — frontier intelligence with action, 에이전트 작업 최적화        |
| 2026-05-20 | [[2026-05-20-openai-disproves-geometry-conjecture]] | OpenAI 모델, 80년 묵은 이산기하학 추측 반증 — AI가 발견자로 등장            |
| 2026-06-01 | [[2026-06-01-claude-opus-4-8]]                      | Claude Opus 4.8 — 코드 결함 4배 감소, Fast 모드 3배 저렴, 정렬 최고치       |
| 2026-06-01 | [[2026-06-01-gemini-omni-3-5-io-2026]]              | Gemini Omni & 3.5 Flash — 영상 생성 모델과 에이전트 모델의 두 갈래          |
| 2026-06-10 | [[2026-06-10-claude-fable-5-mythos-5]]              | Claude Fable 5 / Mythos 5 — 역대 최강 모델을 '거부 대신 격리'로 안전 배포   |
| 2026-07-03 | [[2026-07-03-claude-sonnet-5]]                      | Claude Sonnet 5 — Opus 4.8 근접 성능을 프로모션 $2/$10에, 전 플랜 기본 모델 |

## 관련 토픽

- [[ai-agents]]
- [[ai-coding-tools]]
- [[ai-security]]
- [[open-source-ai]]

## 관련 엔티티

- [[openai]]
- [[anthropic]]
- [[google]]
