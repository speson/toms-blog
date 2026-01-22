# Research Findings

리서치 에이전트를 통해 수집한 기술 조사 결과.

---

## 1. Suno AI API

### API Availability

- **공식 API**: 없음 (2026년 1월 기준)
- **3rd Party**: `docs.sunoapi.org` (비공식 래퍼 서비스)

### Unofficial Libraries

| Project                                                               | Language   | Stars | License  |
| --------------------------------------------------------------------- | ---------- | ----- | -------- |
| [gcui-art/suno-api](https://github.com/gcui-art/suno-api)             | TypeScript | 2.6k  | LGPL-3.0 |
| [Malith-Rukshan/Suno-API](https://github.com/Malith-Rukshan/Suno-API) | Python     | 113   | MIT      |

### Technical Requirements

- Suno 계정 쿠키 (브라우저에서 추출)
- 2Captcha/ruCaptcha 서비스 (hCaptcha 해결)
- Headless 브라우저 자동화

### Pricing & Commercial Use

| Plan    | Price  | Credits/mo | Commercial |
| ------- | ------ | ---------- | ---------- |
| Free    | $0     | 50/day     | No         |
| Pro     | $10/mo | 2,500      | Yes        |
| Premier | $30/mo | 10,000     | Yes        |

### Legal Considerations

- 상업적 사용권 ≠ 저작권 소유
- AI 생성 콘텐츠는 미국 저작권 등록 어려울 수 있음
- Major 레이블 vs Suno 소송 진행 중

---

## 2. Geeknews Data Access

### Available Methods

| Method        | URL                             | Recommended |
| ------------- | ------------------------------- | ----------- |
| RSS/Atom      | `https://news.hada.io/rss/news` | **Yes**     |
| HTML Scraping | `https://news.hada.io/`         | No          |
| Official API  | N/A                             | N/A         |

### RSS Feed Structure (Atom)

```xml
<entry>
  <title>제목</title>
  <link rel='alternate' href='https://news.hada.io/topic?id=XXXXX' />
  <id>https://news.hada.io/topic?id=XXXXX</id>
  <published>2026-01-22T15:17:24+09:00</published>
  <author>
    <name>username</name>
    <uri>https://news.hada.io/user?id=username</uri>
  </author>
  <content type='html'>HTML 요약...</content>
</entry>
```

### ToS Considerations

- robots.txt: `/topic`, `/new`, `/comments` 허용
- 자동화 접속 부하 금지 조항 있음
- **RSS 사용은 ToS 준수로 판단됨**

---

## 3. Context7 (Library Update Monitoring)

### What Context7 Does

- MCP 서버로 실시간 문서 검색
- 라이브러리 버전별 문서 제공
- **업데이트 모니터링 기능은 없음**

### Alternatives for Update Monitoring

| Tool                 | Use Case                                              |
| -------------------- | ----------------------------------------------------- |
| GitHub Releases Atom | `https://github.com/{owner}/{repo}/releases.atom`     |
| Dependabot           | GitHub PR 자동 생성                                   |
| Renovate             | 더 유연한 설정                                        |
| PyPI RSS             | `https://pypi.org/rss/project/{package}/releases.xml` |

### Recommended Strategy

1. GitHub Releases Atom 피드 구독
2. RSS-to-Webhook 도구로 알림
3. 필요시 Context7로 문서 fetch

---

## 4. YouTube & Music Distribution

### YouTube Data API v3

| Feature             | Details                     |
| ------------------- | --------------------------- |
| Video Upload        | `videos.insert` - 100 units |
| Daily Quota         | 10,000 units (무료)         |
| Max File Size       | 256GB                       |
| Unverified Projects | Private 전용 (audit 필요)   |

### YouTube Live Streaming

- `liveBroadcast` + `liveStream` API
- 24시간 세션 제한 (Google Cloud Live Stream API)
- 1 스트림 = 최대 3 브로드캐스트

### Music Distribution Platforms

| Platform  | API        | Price        |
| --------- | ---------- | ------------ |
| DistroKid | No         | $22.99/yr    |
| Symphonic | Yes        | $19.99/yr    |
| Revelator | Yes (Full) | Custom       |
| CD Baby   | Yes        | $9.95/single |

### AI Music Policies

**DistroKid**:

- AI 음악 허용
- 100% 권리 소유 필요
- 타인 모방 금지
- 스팸성 대량 생성 금지

**YouTube (2025.07 업데이트)**:

- "inauthentic content" 정책
- 반복적/대량 생산 콘텐츠 수익화 제한
- Faceless/AI 채널 심사 강화

---

## 5. Vercel Free Tier Limits

| Resource           | Limit          |
| ------------------ | -------------- |
| Serverless Timeout | 10 seconds     |
| Edge Timeout       | 30 seconds     |
| KV Storage         | 256MB          |
| KV Requests        | 30k/month      |
| Blob Storage       | 1GB            |
| Bandwidth          | 100GB/month    |
| Cron Jobs          | 2 (daily only) |

### Implications

- 블로그 파이프라인: 충분
- 음악 파이프라인: 타임아웃 문제 (외부 서버 필요)

---

## Sources

- Suno Help Center: https://help.suno.com/
- Geeknews: https://news.hada.io/
- Context7 Docs: https://context7.com/docs/
- YouTube API Docs: https://developers.google.com/youtube/v3
- Vercel Limits: https://vercel.com/docs/limits
