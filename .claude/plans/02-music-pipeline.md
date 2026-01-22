# Music Pipeline - Technical Specification (DEFERRED)

> **Status**: 보류 - 블로그 MVP 완료 후 재검토

---

## Overview

Suno AI로 Lo-fi 음악을 생성하고 YouTube 채널 + 스트리밍 플랫폼에 배포하는 자동화 시스템.

---

## Why Deferred

1. **Vercel 무료 티어 한계**: 10초 타임아웃 (Suno 생성 30초+)
2. **추가 인프라 필요**: Railway/Modal 등 별도 서버
3. **법적 불확실성**: AI 음악 저작권 소송 진행 중
4. **복잡도**: 블로그보다 기술적 난이도 높음

---

## Research Findings

### Suno API

- **공식 API**: 없음
- **비공식 옵션**:
  - `gcui-art/suno-api` (TypeScript) - 2.6k stars
  - `Malith-Rukshan/Suno-API` (Python) - 113 stars
- **요구사항**: Cookie 인증, 2Captcha
- **상업적 사용**: Pro 플랜 ($10/월) 필수

### YouTube Automation

- **Data API v3**: 업로드 가능 (100 units/upload)
- **일일 쿼터**: 10,000 units
- **주의**: 미인증 프로젝트는 private 전용

### Music Distribution

- **DistroKid**: API 없음 (수동만)
- **대안**: Symphonic ($19.99/년) - API 제공

---

## Proposed Architecture (When Ready)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Scheduler  │────▶│  Worker     │────▶│  YouTube    │
│  (Vercel    │     │  (Modal/    │     │  Upload     │
│   Cron)     │     │   Railway)  │     │             │
│             │     │             │     │             │
│  트리거만   │     │  - Suno     │     │  - API v3   │
│             │     │  - FFmpeg   │     │  - 메타데이터│
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## Cost Estimate (When Active)

| Item          | Monthly Cost |
| ------------- | ------------ |
| Suno Pro      | $10          |
| Modal/Railway | $5-10        |
| Symphonic     | $1.67        |
| **Total**     | **~$17-22**  |

---

## Options When Resuming

### Option A: Semi-Manual (Recommended Start)

- Suno 웹에서 수동 생성
- 로컬 FFmpeg로 영상 제작
- YouTube 수동 업로드
- **비용**: $10/월 (Suno Pro만)

### Option B: Partial Automation

- Suno API로 음악 생성 자동화
- 영상/업로드는 수동
- **비용**: $15/월

### Option C: Full Automation

- 전체 파이프라인 자동화
- Modal/Railway 서버 필요
- **비용**: $20-25/월

---

## Prerequisites Before Starting

1. [ ] 블로그 MVP 완료 & 안정화
2. [ ] YouTube 채널 생성 & 컨셉 확정
3. [ ] Suno Pro 가입 & 테스트
4. [ ] 법적 리스크 재검토

---

## Channel Concept Ideas

| Concept              | Target Audience | Differentiation      |
| -------------------- | --------------- | -------------------- |
| 코딩할 때 듣는 Lo-fi | 개발자          | 한국 개발자 특화     |
| 새벽 감성 Lo-fi      | 일반            | 한국 감성, 한글 가사 |
| AI News BGM          | 테크 팬         | 블로그와 연계        |

---

## Notes

- 24시간 스트리밍은 복잡도 높음 → 일반 영상부터 시작
- 저작권 수익(DistroKid)은 부수입 정도로만 기대
- YouTube 수익화 조건: 구독자 1,000명 + 시청시간 4,000시간
