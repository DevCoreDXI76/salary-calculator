import { useState } from 'react'
import { ChevronDown, ChevronUp, Info } from 'lucide-react'
import { PENSION_LIMITS, TAX_RATES } from '../../utils/taxCalculator'
import { formatWon } from '../../utils/format'

const GUIDE_ITEMS = [
  {
    title: '국민연금 (2026)',
    body: `총 요율 9.5%, 근로자 부담 4.75%. 월 소득 기준 하한 ${formatWon(PENSION_LIMITS.MIN_MONTHLY)}원, 상한 ${formatWon(PENSION_LIMITS.MAX_MONTHLY)}원이 적용됩니다.`,
  },
  {
    title: '건강보험 + 장기요양 (2026)',
    body: `건강보험 총 7.19% 중 근로자 3.595%. 장기요양보험은 건강보험료의 ${(TAX_RATES.LONG_TERM_CARE * 100).toFixed(2)}%를 추가 부담합니다.`,
  },
  {
    title: '고용보험 (2026)',
    body: `총 1.8% 중 근로자 부담 0.9%. 실업급여·육아휴직 등 고용 안전망 재원으로 사용됩니다.`,
  },
  {
    title: '근로소득세·지방소득세',
    body: '2026년 간이세액표를 근사 적용합니다. 부양가족·자녀 수에 따라 인적공제가 반영되며, 지방소득세는 소득세의 10%입니다.',
  },
  {
    title: '계산 결과 안내',
    body: '본 계산기는 근로자 부담분만 표시합니다. 회사별 비과세·상여·4대보험 산정 방식 차이로 실제 급여명세서와 오차가 있을 수 있습니다.',
  },
]

export default function RateGuideSection() {
  const [open, setOpen] = useState(true)

  return (
    <section className="section-open section-rule pt-8 sm:pt-10" aria-labelledby="rate-guide-heading">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-2 text-left"
      >
        <h3
          id="rate-guide-heading"
          className="flex items-center gap-2 text-base font-bold text-ink sm:text-lg"
        >
          <Info className="h-4 w-4 text-navy" />
          연봉 계산기 안내사항
        </h3>
        {open ? (
          <ChevronUp className="h-4 w-4 text-ink-faint" />
        ) : (
          <ChevronDown className="h-4 w-4 text-ink-faint" />
        )}
      </button>
      {open && (
        <ul className="mt-2">
          {GUIDE_ITEMS.map((item) => (
            <li key={item.title} className="border-b border-line/60 py-4 last:border-0">
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed break-keep text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
