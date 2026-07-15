/** 푸터 — 면책조항 및 정책 링크 */
import { CONTACT_EMAIL } from '../../lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-line bg-canvas">
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-bold text-ink">샐러리핏</p>
            <p className="mt-1 text-sm leading-relaxed break-keep text-ink-soft">
              연봉·퇴직금·실업급여·연차 계산기 & 급여 유틸리티
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              문의:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-navy hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-soft">
            <a href="#about" className="hover:text-navy">
              소개
            </a>
            <a href="#faq" className="hover:text-navy">
              FAQ
            </a>
            <a href="#disclaimer" className="hover:text-navy">
              면책조항
            </a>
            <a href="#privacy" className="hover:text-navy">
              개인정보
            </a>
            <a href="#terms" className="hover:text-navy">
              이용약관
            </a>
          </div>
        </div>

        <div
          id="disclaimer"
          className="mt-6 scroll-mt-20 rounded-2xl border border-line bg-paper px-4 py-4 sm:px-5"
        >
          <p className="text-xs leading-relaxed break-keep text-ink-soft sm:text-sm">
            <span className="font-semibold text-ink">면책조항</span>
            {' — '}
            본 계산 결과는 2026년 요율 기준 참고용 정보이며, 실제
            급여명세서·국세청·공단 고지 금액과 다를 수 있습니다. 세무·법률·취업에
            관한 최종 판단은 전문가 상담을 권장합니다. 입력값은 브라우저에서만
            처리되며 서버에 저장되지 않습니다.
          </p>
        </div>

        <p className="mt-5 text-xs text-ink-faint">© {year} SalaryFit</p>
      </div>
    </footer>
  )
}
