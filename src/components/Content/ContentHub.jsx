import PolicySection from './PolicySection'
import FinancialTips from './FinancialTips'
import FinancialNews from './FinancialNews'
import CompanySalaryRank from './CompanySalaryRank'
import DeductionBracketTable from './DeductionBracketTable'
import AdSlot from '../Layout/AdSlot'
import { FAQ_ITEMS } from '../../data/faq'

/**
 * 하단 콘텐츠 허브 — 오픈 레이아웃
 */
export default function ContentHub({ onSelectSalary }) {
  return (
    <div className="mt-12 min-w-0 sm:mt-16">
      <DeductionBracketTable />

      {onSelectSalary && <CompanySalaryRank onSelectSalary={onSelectSalary} />}

      <div className="flex w-full min-w-0 justify-center py-10 sm:py-12">
        <AdSlot position="feed" size="feed" label="콘텐츠 광고" className="w-full max-w-2xl" />
      </div>

      <FinancialTips />
      <FinancialNews />

      <section id="faq" className="section-open section-rule scroll-mt-20 pt-10 sm:pt-12">
        <h2 className="mb-6 text-xl font-bold text-ink">자주 묻는 질문</h2>
        <ul>
          {FAQ_ITEMS.map((item) => (
            <li key={item.q} className="border-b border-line/70 py-5 first:pt-0 last:border-0">
              <p className="text-base font-semibold text-ink">{item.q}</p>
              <p className="mt-2 text-sm leading-relaxed break-keep text-ink-soft">{item.a}</p>
            </li>
          ))}
        </ul>
      </section>

      <PolicySection />
    </div>
  )
}
