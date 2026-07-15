import { useState } from 'react'
import { calculateLeave } from '../../utils/leaveCalculator'

export default function LeaveCalc() {
  const [hireDate, setHireDate] = useState('2023-03-01')
  const [usedDays, setUsedDays] = useState(5)

  const result = calculateLeave({ hireDate, usedDays })

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:items-start">
      <section className="sheet sheet-shadow min-w-0 p-5 sm:p-6 md:p-7">
        <h2 className="text-base font-bold text-ink">연차 조건 입력</h2>
        <p className="mt-1 text-sm text-ink-soft">
          입사일과 사용한 연차 일수를 입력하세요.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="leave-hire" className="mb-2 block text-sm font-semibold text-ink">
              입사일
            </label>
            <input
              id="leave-hire"
              type="date"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
              className="w-full min-w-0 rounded-xl bg-canvas px-3 py-2.5 text-sm text-ink outline-none focus:bg-paper focus:ring-2 focus:ring-navy/30"
            />
          </div>
          <div>
            <label htmlFor="leave-used" className="mb-2 block text-sm font-semibold text-ink">
              사용한 연차 (일)
            </label>
            <input
              id="leave-used"
              type="number"
              min={0}
              max={30}
              value={usedDays}
              onChange={(e) => setUsedDays(Math.max(0, Number(e.target.value) || 0))}
              className="w-full min-w-0 rounded-xl bg-canvas px-3 py-2.5 font-mono text-sm text-ink outline-none focus:bg-paper focus:ring-2 focus:ring-navy/30"
            />
          </div>
        </div>
      </section>

      <section className="sheet sheet-shadow flex min-w-0 flex-col">
        <div className="bg-navy-soft px-5 py-5 sm:px-6">
          <p className="text-xs font-semibold text-navy">잔여 연차</p>
          <p className="font-mono mt-1.5 text-2xl font-bold tabular-nums text-ink sm:text-3xl">
            {result.accrued > 0 ? `${result.remaining}일` : '—'}
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-2 border-b border-line pb-2">
              <dt className="text-ink-soft">근속 개월</dt>
              <dd className="font-mono font-semibold tabular-nums text-ink">
                {result.monthsEmployed > 0 ? `${result.monthsEmployed}개월` : '—'}
              </dd>
            </div>
            <div className="flex justify-between gap-2 border-b border-line pb-2">
              <dt className="text-ink-soft">발생 연차</dt>
              <dd className="font-mono font-semibold tabular-nums text-ink">
                {result.accrued > 0 ? `${result.accrued}일` : '—'}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-ink-soft">사용 연차</dt>
              <dd className="font-mono font-semibold tabular-nums text-ink">
                {result.used}일
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs leading-relaxed break-keep text-ink-faint">
            근로기준법 기준 단순 규칙 적용 참고치입니다. 회사 취업규칙·회계연도 기준에
            따라 달라질 수 있습니다.
          </p>
        </div>
      </section>
    </div>
  )
}
