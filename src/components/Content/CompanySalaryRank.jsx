import { useMemo, useState } from 'react'
import { Building2, ChevronDown, ChevronUp } from 'lucide-react'
import { companySalaries, COMPANY_SALARY_SOURCE } from '../../data/companySalaries'
import { formatWon, toKoreanAmount } from '../../utils/format'

/**
 * 회사별 평균 연봉 순위 — 오픈 테이블
 */
export default function CompanySalaryRank({ onSelectSalary }) {
  const [sortKey, setSortKey] = useState('rank')
  const [sortAsc, setSortAsc] = useState(true)

  const sorted = useMemo(() => {
    const list = [...companySalaries]
    list.sort((a, b) => {
      if (sortKey === 'company') {
        return sortAsc ? a.company.localeCompare(b.company) : b.company.localeCompare(a.company)
      }
      const diff = a[sortKey] - b[sortKey]
      return sortAsc ? diff : -diff
    })
    return list
  }, [sortKey, sortAsc])

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortAsc((v) => !v)
    } else {
      setSortKey(key)
      setSortAsc(key === 'company')
    }
  }

  const SortIcon = ({ column }) => {
    if (sortKey !== column) return null
    return sortAsc ? (
      <ChevronUp className="inline h-3 w-3" />
    ) : (
      <ChevronDown className="inline h-3 w-3" />
    )
  }

  return (
    <section id="salary-rank" className="section-open section-rule scroll-mt-20 pt-10 sm:pt-12">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
          <Building2 className="h-5 w-5 text-navy" />
          회사별 평균 연봉 순위
        </h2>
        <p className="mt-1.5 text-xs break-keep text-ink-faint">
          {COMPANY_SALARY_SOURCE} · 행을 클릭하면 해당 연봉으로 계산합니다
        </p>
      </div>
      <div className="overflow-x-auto rounded-2xl bg-paper/70">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="text-xs text-ink-soft">
              <th className="px-3 py-3 font-semibold sm:px-4">
                <button type="button" onClick={() => toggleSort('rank')} className="hover:text-ink">
                  순위 <SortIcon column="rank" />
                </button>
              </th>
              <th className="px-3 py-3 font-semibold sm:px-4">
                <button
                  type="button"
                  onClick={() => toggleSort('company')}
                  className="hover:text-ink"
                >
                  회사 <SortIcon column="company" />
                </button>
              </th>
              <th className="hidden px-3 py-3 font-semibold sm:table-cell sm:px-4">업종</th>
              <th className="px-3 py-3 font-semibold sm:px-4">
                <button
                  type="button"
                  onClick={() => toggleSort('avgSalary')}
                  className="hover:text-ink"
                >
                  평균연봉 <SortIcon column="avgSalary" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr
                key={row.company}
                className="cursor-pointer border-t border-line/60 transition-colors hover:bg-navy-soft/60"
                onClick={() => onSelectSalary(row.avgSalary)}
                title={`${row.company} ${toKoreanAmount(row.avgSalary)} — 클릭하여 계산`}
              >
                <td className="px-3 py-3 tabular-nums text-ink-faint sm:px-4">{row.rank}</td>
                <td className="px-3 py-3 font-medium text-ink sm:px-4">{row.company}</td>
                <td className="hidden px-3 py-3 text-ink-soft sm:table-cell sm:px-4">
                  {row.industry}
                </td>
                <td className="px-3 py-3 font-mono tabular-nums text-navy sm:px-4">
                  {formatWon(row.avgSalary)}원
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
