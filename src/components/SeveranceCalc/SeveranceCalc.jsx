import { useState } from 'react'
import { formatWon, parseAmount } from '../../utils/format'
import {
  calculateSeverance,
  monthlyToDailyWage,
} from '../../utils/severanceCalculator'

export default function SeveranceCalc() {
  const [startDate, setStartDate] = useState('2020-01-02')
  const [endDate, setEndDate] = useState('2026-07-15')
  const [monthlySalary, setMonthlySalary] = useState(3500000)

  const dailyWage = monthlyToDailyWage(monthlySalary)
  const result = calculateSeverance(startDate, endDate, dailyWage)

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:items-start">
      <section className="sheet sheet-shadow min-w-0 p-5 sm:p-6 md:p-7">
        <h2 className="text-lg font-bold text-ink">퇴직 조건 입력</h2>
        <p className="mt-1 text-sm text-ink-soft">
          입사일·퇴사일과 평균임금(월급 기준)을 입력하세요.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="sev-start" className="mb-2 block text-sm font-semibold text-ink">
              입사일
            </label>
            <input
              id="sev-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full min-w-0 rounded-xl bg-canvas px-3 py-2.5 text-sm text-ink outline-none focus:bg-paper focus:ring-2 focus:ring-navy/30"
            />
          </div>
          <div>
            <label htmlFor="sev-end" className="mb-2 block text-sm font-semibold text-ink">
              퇴사일
            </label>
            <input
              id="sev-end"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full min-w-0 rounded-xl bg-canvas px-3 py-2.5 text-sm text-ink outline-none focus:bg-paper focus:ring-2 focus:ring-navy/30"
            />
          </div>
          <div>
            <label htmlFor="sev-salary" className="mb-2 block text-sm font-semibold text-ink">
              평균임금 (월, 세전)
            </label>
            <div className="relative">
              <input
                id="sev-salary"
                type="text"
                inputMode="numeric"
                value={monthlySalary ? formatWon(monthlySalary) : ''}
                onChange={(e) => setMonthlySalary(parseAmount(e.target.value))}
                className="amount-text w-full min-w-0 rounded-xl bg-canvas px-3 py-2.5 pr-10 font-mono text-sm text-ink outline-none focus:bg-paper focus:ring-2 focus:ring-navy/30"
              />
              <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-ink-faint">
                원
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-faint">
              1일 평균임금 근사: {formatWon(dailyWage)}원 (÷30)
            </p>
          </div>
        </div>
      </section>

      <section className="sheet sheet-shadow flex min-w-0 flex-col overflow-hidden">
        <div className="bg-navy-soft px-5 py-5 sm:px-6">
          <p className="text-xs font-semibold text-navy">예상 퇴직금</p>
          <p className="font-mono amount-text mt-1.5 text-2xl font-bold tabular-nums text-ink sm:text-3xl">
            {result.severancePay > 0 ? formatWon(result.severancePay) : '—'}
            <span className="ml-1 text-base font-semibold text-ink-soft sm:text-lg">원</span>
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-2 border-b border-line pb-2">
              <dt className="text-ink-soft">재직일수</dt>
              <dd className="font-mono font-semibold tabular-nums text-ink">
                {result.days > 0 ? `${formatWon(result.days)}일` : '—'}
              </dd>
            </div>
            <div className="flex justify-between gap-2 border-b border-line pb-2">
              <dt className="text-ink-soft">재직연수 (근사)</dt>
              <dd className="font-mono font-semibold tabular-nums text-ink">
                {result.years > 0 ? `${result.years}년` : '—'}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-ink-soft">1일 평균임금</dt>
              <dd className="font-mono font-semibold tabular-nums text-ink">
                {dailyWage > 0 ? `${formatWon(dailyWage)}원` : '—'}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs leading-relaxed break-keep text-ink-faint">
            평균임금 × 재직연수 기준 참고용 근사치입니다. 실제 퇴직금은 최근 3개월
            임금·수당·연차수당 등을 반영해 달라질 수 있습니다.
          </p>
        </div>
      </section>
    </div>
  )
}
