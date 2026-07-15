import { Percent } from 'lucide-react'
import {
  INCOME_TAX_BRACKETS_2026,
  INSURANCE_RATES_2026,
  OFFICIAL_SOURCE_NOTE,
} from '../../data/deductionBrackets'

/**
 * 2026년 공식 소득 구간·세율 / 4대보험 요율 (간략)
 */
export default function DeductionBracketTable() {
  return (
    <section id="deduction-brackets" className="section-open section-rule scroll-mt-20 pt-10 sm:pt-12">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
          <Percent className="h-5 w-5 text-navy" />
          2026년 소득 구간별 세율·보험 요율
        </h2>
        <p className="mt-1.5 text-sm break-keep text-ink-soft">
          공식 기관이 공시한 과세표준 구간과 4대보험 요율만 정리했습니다.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="mb-3 text-sm font-bold text-ink">소득세 (과세표준 구간)</h3>
          <div className="overflow-x-auto rounded-xl border border-line bg-paper">
            <table className="w-full min-w-[280px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-ink-soft">
                  <th className="px-4 py-3 font-semibold">과세표준</th>
                  <th className="px-4 py-3 text-right font-semibold">세율</th>
                </tr>
              </thead>
              <tbody>
                {INCOME_TAX_BRACKETS_2026.map((row) => (
                  <tr key={row.bracket} className="border-t border-line/70">
                    <td className="px-4 py-3 break-keep text-ink">{row.bracket}</td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums text-navy">
                      {row.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">국세청 · 지방소득세는 소득세의 10%</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-ink">4대보험 (근로자 부담)</h3>
          <div className="overflow-x-auto rounded-xl border border-line bg-paper">
            <table className="w-full min-w-[280px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-ink-soft">
                  <th className="px-4 py-3 font-semibold">항목</th>
                  <th className="px-4 py-3 text-right font-semibold">요율</th>
                </tr>
              </thead>
              <tbody>
                {INSURANCE_RATES_2026.map((row) => (
                  <tr key={row.name} className="border-t border-line/70">
                    <td className="px-4 py-3 text-ink">
                      {row.name}
                      {row.note && (
                        <span className="mt-0.5 block text-xs font-normal text-ink-faint">
                          {row.note}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums text-navy">
                      {row.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed break-keep text-ink-faint">{OFFICIAL_SOURCE_NOTE}</p>
    </section>
  )
}
