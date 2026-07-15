import PolicySection from './PolicySection'
import FinancialTips from './FinancialTips'
import FinancialNews from './FinancialNews'
import CompanySalaryRank from './CompanySalaryRank'
import DeductionBracketTable from './DeductionBracketTable'
import AdSlot from '../Layout/AdSlot'

const FAQ_ITEMS = [
  {
    q: '입력한 연봉 정보가 저장되나요?',
    a: '아니요. 모든 계산은 브라우저에서만 이루어지며 서버에 저장하지 않습니다. 최근 계산은 기기 localStorage에만 저장됩니다.',
  },
  {
    q: '계산 결과가 실제 급여명세서와 다른 이유는?',
    a: '회사별 비과세·상여·추가 공제, 연말정산 구조에 따라 달라질 수 있습니다. 참고용 근사치입니다.',
  },
  {
    q: '다른 계산기 탭은 어떻게 쓰나요?',
    a: '상단 탭에서 퇴직금·실업급여·연차 계산기로 전환하면 같은 페이지에서 바로 이용할 수 있습니다.',
  },
]

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
