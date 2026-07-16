import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lightbulb } from 'lucide-react'
import { financialTips, FINANCIAL_TIPS_SOURCE } from '../../data/financialTips'

const INITIAL_COUNT = 5

/**
 * 금융 팁 — 오픈 섹션 (카드 최소화)
 */
export default function FinancialTips() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? financialTips : financialTips.slice(0, INITIAL_COUNT)

  return (
    <section id="tips" className="section-open section-rule scroll-mt-20 pt-10 sm:pt-12">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
          <Lightbulb className="h-5 w-5 text-navy" />
          금융·연봉 팁
        </h2>
        <p className="mt-1.5 text-xs text-ink-faint">{FINANCIAL_TIPS_SOURCE}</p>
      </div>
      <ul className="space-y-0">
        {visible.map((tip) => (
          <li key={tip.slug} className="border-b border-line/70 py-5 first:pt-0 last:border-0">
            <Link
              to={`/tips/${tip.slug}`}
              className="text-base font-semibold text-ink hover:text-navy hover:underline"
            >
              {tip.title}
            </Link>
            <p className="mt-2 text-sm leading-relaxed break-keep text-ink-soft">{tip.summary}</p>
            <p className="mt-2 text-xs text-ink-faint">{tip.date}</p>
          </li>
        ))}
      </ul>
      {financialTips.length > INITIAL_COUNT && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 text-sm font-semibold text-navy hover:underline"
        >
          {expanded ? '접기' : `더보기 (${financialTips.length - INITIAL_COUNT}건)`}
        </button>
      )}
    </section>
  )
}
