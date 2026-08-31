---
name: Model Hardware Standard
type: entity
aliases: [MHS]
first_covered: "2026-08-31"
last_covered: "2026-08-31"
post_count: 1
related_entities: [anthropic]
tags: [AI, Anthropic, AI for Science, MCP, 로보틱스]
---

# Model Hardware Standard (MHS)

## 개요

Anthropic이 2026-08-27 연구 프리뷰로 공개한, AI 에이전트가 실험실·제조 장비(현미경, 액체 핸들러, 로봇 팔 등)를 안전하게 병렬 조작하기 위한 공유 규격. HHMI Janelia Research Campus와의 협업에서 시작했다. 블로그는 과학자 지원 비교 글에서 '장비를 다루는 사람'에게 가장 실질적인 발표로 다뤘다([[ai-for-science]] 토픽).

블로그가 기록한 구조: 운영체제와 장비 사이를 번역하는 표준 드라이버, "온도 읽기/설정" 같은 read/write 프리미티브, 표준 형식의 장비 검색, 측정·조정 가능 항목과 안전 한계를 담은 참조 파일 자동 생성, 자연어 태그로 적는 암묵지(에이전트가 사용자를 인터뷰해 채울 수 있음), 에이전트 접근 경로 세 가지(MCP·명령줄·코드 파일 — [[mcp]]), 장비 수준 안전 한계 강제. 프로그래밍 인터페이스가 있는 장비면 모델 무관하게 지원하지만 인터페이스 없는 장비는 아직 안 된다. 참여는 신청제이며, 파트너와 안전 평가를 만든 뒤 오픈소스로 공개할 예정이나 날짜는 없다.

파트너 사례로 기록된 수치(모두 파트너 보고값, 독립 검증 없음): QuEra 레이저 재고정 58%·150초 → 96%·6초, 블라인드 700회 중 695회(99.3%), 19시간 무인 운전 잠금 해제 0회; 카네기멜런 용량-반응 실험 약 3배, 셋업 8시간, 유도 고장 6건 사전 차단(Opus 4.8 에이전트); 워싱턴대 베이커 랩 장비 6대 연결 일주일 미만; HHMI Janelia 카메라 추가 며칠→몇 분; Tetsuwan Scientific 분주 9,143회·제조사 스펙 대비 약 12% 정밀; Genentech BCA assay(기포 대응은 사람 안내 필요). 생태계 명단에 Universal Robots, Tecan, QIAGEN, AWS Strands Robots, Hugging Face LeRobot, Raspberry Pi, 두산로보틱스.

블로그의 관찰: Genentech의 신약 개발 워크플로우가 MHS로 돌아가는 같은 날 Fable은 분자 설계 질의를 Opus 5로 폴백한다는 대비, 그리고 안전 평가를 파트너와 함께 만드는 방식이 웰빙 평가 지원금($5M, 독립 연구)과 같은 '평가를 밖에 두는' 패턴에 속한다는 점.

## 주요 다룬 내용

- 연구자 유형 4종 비교 안에서 MHS의 구조·파트너 사례·한계·신청 조건 정리 — [[2026-08-31-anthropic-scientists-opened-and-locked]]

## 타임라인

| 날짜       | 내용 | 포스트 |
| ---------- | ---- | ------ |
| 2026-08-31 | 연구 프리뷰(8/27) — 표준 드라이버·MCP 경로·파트너 사례, 신청제·오픈소스 시점 미정 (비교 프레임) | [[2026-08-31-anthropic-scientists-opened-and-locked]] |

## 관련 엔티티

- [[anthropic]]
