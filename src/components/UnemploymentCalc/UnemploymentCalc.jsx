import { useState } from 'react'
import { formatWon, parseAmount } from '../../utils/format'
import { calculateUnemployment } from '../../utils/unemploymentCalculator'
import { monthlyToDailyWage } from '../../utils/severanceCalculator'

export default function UnemploymentCalc() {
  const [months, setMonths] = useState(36)
  const [ageGroup, setAgeGroup] = useState('under50')
  const [monthlySalary, setMonthlySalary] = useState(3200000)

  const dailyWage = monthlyToDailyWage(monthlySalary)
  const result = calculateUnemployment({ months, ageGroup, dailyWage })

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:items-start">
      <section className="sheet sheet-shadow min-w-0 p-5 sm:p-6 md:p-7">
        <h2 className="text-base font-bold text-ink">실업급여 조건 입력</h2>
        <p className="mt-1 text-sm text-ink-soft">
          고용보험 가입기간·연령·퇴직 전 임금을 입력하세요.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="unemp-months" className="mb-2 block text-sm font-semibold text-ink">
              고용보험 가입기간 (개월)
            </label>
            <input
              id="unemp-months"
              type="number"
              min={0}
              max={600}
              value={months}
              onChange={(e) => setMonths(Math.max(0, Number(e.target.value) || 0))}
              className="w-full min-w-0 rounded-xl bg-canvas px-3 py-2.5 font-mono text-sm text-ink outline-none focus:bg-paper focus:ring-2 focus:ring-navy/30"
            />
            <p className="mt-1 text-xs text-ink-faint">1년 6개월(18개월) 미만이면 수급 불가</p>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-ink">연령</legend>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'under50', label: '만 50세 미만' },
                { id: '50plus', label: '만 50세 이상' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAgeGroup(opt.id)}
                  className={`min-w-0 rounded-xl px-2 py-2.5 text-xs font-semibold sm:text-sm ${
                    ageGroup === opt.id
                      ? 'bg-navy text-white'
                      : 'bg-canvas text-ink-soft hover:bg-navy-soft hover:text-navy'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="unemp-salary" className="mb-2 block text-sm font-semibold text-ink">
              퇴직 전 평균임금 (월)
            </label>
            <div className="relative">
              <input
                id="unemp-salary"
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
          </div>
        </div>
      </section>

      <section className="sheet sheet-shadow flex min-w-0 flex-col">
        <div className="bg-navy-soft px-5 py-5 sm:px-6">
          <p className="text-xs font-semibold text-navy">예상 실업급여 총액</p>
          <p className="font-mono amount-text mt-1.5 text-2xl font-bold tabular-nums text-ink sm:text-3xl">
            {result.eligible ? formatWon(result.totalBenefit) : '—'}
            <span className="ml-1 text-base font-semibold text-ink-soft sm:text-lg">원</span>
          </p>
        </div>
        <div className="p-4 sm:p-6">
          {!result.eligible && months < 18 && (
            <p className="mb-4 text-sm text-danger">
              가입기간 1년 6개월 미만은 실업급여 수급 대상이 아닐 수 있습니다.
            </p>
          )}
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-2 border-b border-line pb-2">
              <dt className="text-ink-soft">소정급여일수</dt>
              <dd className="font-mono font-semibold tabular-nums text-ink">
                {result.benefitDays > 0 ? `${result.benefitDays}일` : '—'}
              </dd>
            </div>
            <div className="flex justify-between gap-2 border-b border-line pb-2">
              <dt className="text-ink-soft">1일 급여액 (근사)</dt>
              <dd className="font-mono font-semibold tabular-nums text-ink">
                {result.dailyBenefit > 0 ? `${formatWon(result.dailyBenefit)}원` : '—'}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs leading-relaxed break-keep text-ink-faint">
            고용24·고용보험법에 따른 참고용 근사치입니다. 실제 수급 여부·일수·금액은
            관할 고용센터에서 확인하세요.
          </p>
        </div>
      </section>
    </div>
  )
}
