import { Newspaper } from 'lucide-react'
import { financialNews, FINANCIAL_NEWS_SOURCE } from '../../data/financialNews'

/**
 * 금융 뉴스 — 오픈 리스트
 */
export default function FinancialNews() {
  return (
    <section id="news" className="section-open section-rule scroll-mt-20 pt-10 sm:pt-12">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
          <Newspaper className="h-5 w-5 text-navy" />
          금융·노동 뉴스
        </h2>
        <p className="mt-1.5 text-xs text-ink-faint">{FINANCIAL_NEWS_SOURCE}</p>
      </div>
      <ul>
        {financialNews.map((item) => (
          <li key={item.id} className="border-b border-line/70 py-5 first:pt-0 last:border-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block rounded-full bg-navy-soft px-2.5 py-0.5 text-xs font-semibold text-navy">
                {item.category}
              </span>
              <span className="text-xs text-ink-faint">{item.date}</span>
            </div>
            <p className="mt-2 text-base font-semibold text-ink">{item.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed break-keep text-ink-soft">{item.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
