import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { formatWon, toKoreanAmount } from '../../utils/format'

const INSURANCE_ITEMS = [
  { key: 'nationalPension', label: '국민연금' },
  { key: 'healthInsurance', label: '건강보험' },
  { key: 'longTermCare', label: '장기요양보험' },
  { key: 'employmentInsurance', label: '고용보험' },
]

const TAX_ITEMS = [
  { key: 'incomeTax', label: '소득세' },
  { key: 'localIncomeTax', label: '지방소득세' },
]

function pctOf(amount, base) {
  if (!base || base <= 0) return 0
  return Math.round((amount / base) * 1000) / 10
}

/**
 * 실수령액 및 공제 내역 — 4대보험 / 세금 분리 + %
 */
export default function ResultSection({ monthlyGross, result, meta }) {
  const [copied, setCopied] = useState(false)

  const netPay = result?.netPay ?? 0
  const totalDeductions = result?.totalDeductions ?? 0
  const insuranceTotal = result?.insuranceTotal ?? 0
  const taxTotal = result?.taxTotal ?? 0
  const insurancePct = result?.insurancePct ?? 0
  const taxPct = result?.taxPct ?? 0
  const netPct = result?.netPct ?? 0
  const deductions = result?.deductions ?? {}
  const hasAmount = monthlyGross > 0

  const handleCopy = async () => {
    if (!hasAmount || !result) return

    const lines = [
      '[샐러리핏 연봉 계산 결과]',
      `세전 월급: ${formatWon(monthlyGross)}원`,
      `월 실수령액: ${formatWon(netPay)}원 (${netPct}%)`,
      `4대보험: ${formatWon(insuranceTotal)}원 (${insurancePct}%)`,
      `세금: ${formatWon(taxTotal)}원 (${taxPct}%)`,
      `공제 합계: ${formatWon(totalDeductions)}원`,
      '',
      '— 4대보험 —',
      ...INSURANCE_ITEMS.map(
        (item) => `${item.label}: ${formatWon(deductions[item.key] ?? 0)}원`,
      ),
      '',
      '— 세금 —',
      ...TAX_ITEMS.map((item) => `${item.label}: ${formatWon(deductions[item.key] ?? 0)}원`),
      '',
      '※ 2026년 요율 기준 참고용 근사치입니다.',
    ]

    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="sheet flex h-full min-w-0 flex-col" aria-labelledby="result-heading">
      <div className="border-b border-line px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-navy">월 실수령액</p>
            <h2 id="result-heading" className="sr-only">
              계산 결과
            </h2>
            <p className="font-mono amount-text mt-1.5 text-3xl font-bold tracking-tight text-ink tabular-nums sm:text-4xl">
              {hasAmount ? formatWon(netPay) : '—'}
              <span className="ml-1 text-lg font-semibold text-ink-soft sm:text-xl">원</span>
            </p>
            <p className="mt-1.5 text-sm break-keep text-ink-soft">
              {hasAmount
                ? `${toKoreanAmount(netPay)} · 세전 대비 ${netPct}%`
                : '연봉을 입력하면 결과가 표시됩니다'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!hasAmount}
            className="inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-full bg-navy px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? '복사됨' : '결과 복사'}
          </button>
        </div>

        {/* 급여 대비 비율 바 */}
        {hasAmount && (
          <div className="mt-5">
            <div className="flex h-2.5 overflow-hidden rounded-full bg-line">
              <div
                className="bg-navy transition-all"
                style={{ width: `${Math.min(100, insurancePct)}%` }}
                title={`4대보험 ${insurancePct}%`}
              />
              <div
                className="bg-danger/80 transition-all"
                style={{ width: `${Math.min(100 - insurancePct, taxPct)}%` }}
                title={`세금 ${taxPct}%`}
              />
              <div
                className="bg-ink/15 transition-all"
                style={{ width: `${Math.max(0, 100 - insurancePct - taxPct)}%` }}
                title={`실수령 ${netPct}%`}
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-navy" />
                보험 {insurancePct}%
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-danger/80" />
                세금 {taxPct}%
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-ink/20" />
                실수령 {netPct}%
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <dl className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="min-w-0 border-b border-line pb-3 sm:border-0 sm:pb-0">
            <dt className="text-xs font-medium text-ink-faint">세전 월급</dt>
            <dd className="font-mono amount-text mt-1 text-sm font-semibold tabular-nums text-ink">
              {hasAmount ? `${formatWon(monthlyGross)}원` : '—'}
            </dd>
          </div>
          <div className="min-w-0 border-b border-line pb-3 sm:border-0 sm:pb-0">
            <dt className="text-xs font-medium text-ink-faint">4대보험</dt>
            <dd className="font-mono amount-text mt-1 text-sm font-semibold tabular-nums text-navy">
              {hasAmount ? `${formatWon(insuranceTotal)}원` : '—'}
              {hasAmount && (
                <span className="ml-1 text-xs font-medium text-ink-faint">({insurancePct}%)</span>
              )}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-xs font-medium text-ink-faint">세금</dt>
            <dd className="font-mono amount-text mt-1 text-sm font-semibold tabular-nums text-danger">
              {hasAmount ? `${formatWon(taxTotal)}원` : '—'}
              {hasAmount && (
                <span className="ml-1 text-xs font-medium text-ink-faint">({taxPct}%)</span>
              )}
            </dd>
          </div>
        </dl>

        {meta.payType === 'annual' && hasAmount && (
          <p className="mb-4 text-xs break-keep text-ink-faint">
            연 환산 기준 {formatWon(meta.annualEquivalent)}원
          </p>
        )}

        {/* 4대보험 */}
        <DeductionGroup
          title="4대보험"
          subtitle={hasAmount ? `세전 대비 ${insurancePct}%` : null}
          items={INSURANCE_ITEMS}
          deductions={deductions}
          monthlyGross={monthlyGross}
          hasAmount={hasAmount}
          total={insuranceTotal}
          accent="navy"
        />

        {/* 세금 */}
        <DeductionGroup
          title="세금"
          subtitle={hasAmount ? `세전 대비 ${taxPct}%` : null}
          items={TAX_ITEMS}
          deductions={deductions}
          monthlyGross={monthlyGross}
          hasAmount={hasAmount}
          total={taxTotal}
          accent="danger"
          className="mt-5"
        />

        <p className="mt-5 text-xs leading-relaxed break-keep text-ink-faint">
          2026년 요율 기준 참고용 근사치입니다. 실제 급여명세서와 다를 수 있습니다. 비율은
          세전 월급 대비입니다.
        </p>
      </div>
    </section>
  )
}

function DeductionGroup({
  title,
  subtitle,
  items,
  deductions,
  monthlyGross,
  hasAmount,
  total,
  accent,
  className = '',
}) {
  const titleColor = accent === 'danger' ? 'text-danger' : 'text-navy'

  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <h3 className={`text-sm font-bold ${titleColor}`}>{title}</h3>
        {subtitle && <span className="text-xs text-ink-faint">{subtitle}</span>}
      </div>
      <div className="min-w-0 overflow-x-auto">
        <table className="w-full min-w-[280px] text-sm">
          <thead>
            <tr className="text-left text-xs text-ink-soft">
              <th className="pb-2 font-medium">항목</th>
              <th className="pb-2 text-right font-medium">금액</th>
              <th className="pb-2 text-right font-medium">비율</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const amount = deductions[item.key] ?? 0
              return (
                <tr key={item.key} className="border-t border-line/70">
                  <td className="py-2.5 whitespace-nowrap text-ink-soft">{item.label}</td>
                  <td className="font-mono amount-text py-2.5 text-right tabular-nums text-ink">
                    {hasAmount ? `${formatWon(amount)}원` : '—'}
                  </td>
                  <td className="font-mono py-2.5 text-right tabular-nums text-ink-faint">
                    {hasAmount ? `${pctOf(amount, monthlyGross)}%` : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="border-t border-line">
              <td className={`py-2.5 text-sm font-bold ${titleColor}`}>합계</td>
              <td
                className={`font-mono amount-text py-2.5 text-right text-sm font-bold tabular-nums ${titleColor}`}
              >
                {hasAmount ? `${formatWon(total)}원` : '—'}
              </td>
              <td
                className={`font-mono py-2.5 text-right text-sm font-bold tabular-nums ${titleColor}`}
              >
                {hasAmount ? `${pctOf(total, monthlyGross)}%` : '—'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
