import { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "Tom's Blog의 개인정보 처리방침",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-white">
        개인정보 처리방침
      </h1>

      <div className="space-y-6 text-zinc-400">
        <p className="text-sm text-zinc-500">최종 수정일: 2026년 1월 31일</p>

        {/* 1. 수집하는 정보 */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            1. 수집하는 정보
          </h2>
          <div className="space-y-4 leading-relaxed">
            <p>Tom's Blog는 다음과 같은 정보를 자동으로 수집합니다:</p>
            <ul className="ml-2 list-inside list-disc space-y-2">
              <li>
                <strong className="text-white">Google AdSense 쿠키</strong>
                <p className="ml-6 text-sm text-zinc-500">
                  광고 맞춤화 및 성능 측정을 위해 Google에서 설정하는 쿠키
                </p>
              </li>
              <li>
                <strong className="text-white">Vercel Analytics</strong>
                <p className="ml-6 text-sm text-zinc-500">
                  웹사이트 방문 통계 및 성능 분석을 위한 익명화된 데이터
                </p>
              </li>
              <li>
                <strong className="text-white">브라우저 정보</strong>
                <p className="ml-6 text-sm text-zinc-500">
                  브라우저 종류, 운영체제, 화면 해상도 등 (익명화)
                </p>
              </li>
              <li>
                <strong className="text-white">IP 주소</strong>
                <p className="ml-6 text-sm text-zinc-500">
                  지역 기반 통계 분석용 (익명화)
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* 2. 정보 사용 목적 */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            2. 정보 사용 목적
          </h2>
          <div className="space-y-2 leading-relaxed">
            <p>수집된 정보는 다음의 목적으로만 사용됩니다:</p>
            <ul className="ml-2 list-inside list-disc space-y-2">
              <li>웹사이트 성능 개선 및 사용자 경험 향상</li>
              <li>관련성 높은 광고 제공</li>
              <li>방문 통계 및 트래픽 분석</li>
              <li>서비스 보안 및 부정 행위 방지</li>
            </ul>
          </div>
        </section>

        {/* 3. 제3자 제공 */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            3. 제3자 제공
          </h2>
          <div className="space-y-4 leading-relaxed">
            <p>개인정보는 다음의 제3자와 공유될 수 있습니다:</p>
            <ul className="ml-2 list-inside list-disc space-y-2">
              <li>
                <strong className="text-white">Google AdSense</strong>
                <p className="ml-6 text-sm text-zinc-500">
                  광고 제공 및 성능 측정
                </p>
              </li>
              <li>
                <strong className="text-white">Vercel</strong>
                <p className="ml-6 text-sm text-zinc-500">
                  웹사이트 호스팅 및 분석
                </p>
              </li>
            </ul>
            <p className="mt-4 text-sm text-zinc-500">
              각 제3자는 자신의 개인정보 처리방침에 따라 정보를 처리합니다.
            </p>
          </div>
        </section>

        {/* 4. 쿠키 및 추적 기술 */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            4. 쿠키 및 추적 기술
          </h2>
          <div className="space-y-4 leading-relaxed">
            <p>Tom's Blog는 쿠키 및 유사한 추적 기술을 사용합니다.</p>
            <div className="rounded-lg border border-zinc-700 bg-zinc-800/30 p-4">
              <h3 className="mb-2 font-semibold text-white">쿠키 차단 방법:</h3>
              <ul className="ml-2 list-inside list-disc space-y-1 text-sm">
                <li>브라우저 설정에서 쿠키 비활성화</li>
                <li>
                  <a
                    href="https://myaccount.google.com/data-and-privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 transition-colors hover:text-purple-300"
                  >
                    Google 계정 설정
                  </a>
                  에서 광고 개인화 비활성화
                </li>
                <li>
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 transition-colors hover:text-purple-300"
                  >
                    Google 광고 설정
                  </a>
                  에서 관심 기반 광고 관리
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. 사용자 권리 */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            5. 사용자 권리
          </h2>
          <div className="space-y-2 leading-relaxed">
            <p>사용자는 다음의 권리를 가집니다:</p>
            <ul className="ml-2 list-inside list-disc space-y-2">
              <li>개인정보 접근 및 확인</li>
              <li>부정확한 정보의 정정 요청</li>
              <li>정보 삭제 요청</li>
              <li>정보 처리 제한 요청</li>
              <li>정보 이동권 행사</li>
            </ul>
            <p className="mt-4 text-sm text-zinc-500">
              이러한 권리를 행사하려면 아래 연락처로 문의하시기 바랍니다.
            </p>
          </div>
        </section>

        {/* 6. 데이터 보안 */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            6. 데이터 보안
          </h2>
          <div className="space-y-2 leading-relaxed">
            <p>
              Tom's Blog는 수집된 정보를 보호하기 위해 적절한 기술적, 관리적
              조치를 취합니다:
            </p>
            <ul className="ml-2 list-inside list-disc space-y-2">
              <li>HTTPS 암호화 통신</li>
              <li>정기적인 보안 업데이트</li>
              <li>접근 제어 및 권한 관리</li>
            </ul>
          </div>
        </section>

        {/* 7. 정보 보유 기간 */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            7. 정보 보유 기간
          </h2>
          <div className="space-y-2 leading-relaxed">
            <p>수집된 정보는 다음과 같이 보유됩니다:</p>
            <ul className="ml-2 list-inside list-disc space-y-2">
              <li>
                <strong className="text-white">Google AdSense 쿠키:</strong>{" "}
                브라우저 설정에 따라 (일반적으로 최대 2년)
              </li>
              <li>
                <strong className="text-white">Vercel Analytics:</strong> 30일
                (자동 삭제)
              </li>
              <li>
                <strong className="text-white">기타 분석 데이터:</strong> 통계
                목적으로 필요한 기간
              </li>
            </ul>
          </div>
        </section>

        {/* 8. 연락처 */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">8. 연락처</h2>
          <div className="space-y-3 leading-relaxed">
            <p>
              개인정보 처리방침에 대한 문의 또는 권리 행사는 아래로 연락주시기
              바랍니다:
            </p>
            <div className="space-y-2 rounded-lg border border-zinc-700 bg-zinc-800/30 p-4">
              <p>
                <strong className="text-white">이메일:</strong>{" "}
                <a
                  href="mailto:contact@toms-blog.co.kr"
                  className="text-purple-400 transition-colors hover:text-purple-300"
                >
                  contact@toms-blog.co.kr
                </a>
              </p>
              <p>
                <strong className="text-white">웹사이트:</strong>{" "}
                <a
                  href="https://toms-blog.co.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 transition-colors hover:text-purple-300"
                >
                  toms-blog.co.kr
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* 9. 정책 변경 */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            9. 정책 변경
          </h2>
          <div className="space-y-2 leading-relaxed">
            <p>
              이 개인정보 처리방침은 법률 변경 또는 서비스 개선에 따라 변경될 수
              있습니다. 변경 사항은 이 페이지에 게시되며, 중요한 변경의 경우
              별도 공지를 드립니다.
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              최종 수정일: 2026년 1월 31일
            </p>
          </div>
        </section>

        {/* 10. 추가 정보 */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            10. 외부 링크
          </h2>
          <div className="space-y-3 leading-relaxed">
            <p>제3자 서비스의 개인정보 처리방침:</p>
            <ul className="ml-2 list-inside list-disc space-y-2">
              <li>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 transition-colors hover:text-purple-300"
                >
                  Google 개인정보 처리방침
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 transition-colors hover:text-purple-300"
                >
                  Vercel 개인정보 처리방침
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
