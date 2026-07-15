import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { formatWon, parseAmount, toKoreanAmount } from '../../utils/format'
import QuickAmountPad, {
  NON_TAXABLE_QUICK_OPTIONS,
  SALARY_QUICK_OPTIONS,
} from './QuickAmountPad'
import StepperField from './StepperField'

/**
 * 급여 조건 입력 폼 (이지론 UX + 밝은 핀테크)
 */
export default function InputSection({ values, onChange }) {
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const {
    payType,
    amount,
    includesSeverance,
    nonTaxable,
    householdMembers,
    children,
  } = values

  const handleAmountChange = (e) => {
    onChange({ amount: parseAmount(e.target.value) })
  }

  const addAmount = (delta) => {
    onChange({ amount: (amount || 0) + delta })
  }

  const addNonTaxable = (delta) => {
    onChange({ nonTaxable: (nonTaxable || 0) + delta })
  }

  return (
    <section
      className="sheet sheet-shadow min-w-0 p-5 sm:p-6 md:p-7"
      aria-labelledby="input-heading"
    >
      <h2 id="input-heading" className="mb-5 text-lg font-bold text-ink sm:mb-6">
        연봉 계산기
      </h2>

      <div className="space-y-5 sm:space-y-6">
        <fieldset className="min-w-0">
          <legend className="mb-2.5 text-sm font-semibold text-ink">급여선택</legend>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'annual', label: '연봉' },
              { id: 'monthly', label: '월급' },
            ].map((option) => {
              const active = payType === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onChange({ payType: option.id })}
                  className={`min-w-0 rounded-xl px-2 py-2.5 text-sm font-semibold transition-colors sm:px-3 ${
                    active
                      ? 'bg-navy text-white'
                      : 'border border-line bg-canvas text-ink-soft hover:border-navy hover:text-navy'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="min-w-0">
          <label htmlFor="salary-amount" className="mb-2.5 block text-sm font-semibold text-ink">
            금액
          </label>
          <div className="relative min-w-0">
            <input
              id="salary-amount"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={amount ? formatWon(amount) : ''}
              onChange={handleAmountChange}
              placeholder={payType === 'annual' ? '예: 40,000,000' : '예: 3,333,333'}
              className="amount-text w-full min-w-0 rounded-xl border border-line bg-canvas px-4 py-3.5 pr-10 font-mono text-base font-semibold text-ink outline-none transition-shadow focus:border-navy focus:ring-2 focus:ring-navy/20 sm:text-lg"
            />
            <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-ink-faint">
              원
            </span>
          </div>
          <p className="mt-2 text-xs break-keep text-ink-faint">
            {amount > 0 ? toKoreanAmount(amount) : '숫자만 입력하세요'}
          </p>
          <QuickAmountPad options={SALARY_QUICK_OPTIONS} onAdd={addAmount} className="mt-3" />
        </div>

        <StepperField
          id="household"
          label="부양가족수"
          hint="본인, 자녀 포함 최대 11명"
          value={householdMembers}
          min={1}
          max={11}
          presets={[1, 2, 3, 4, 5]}
          onChange={(v) => onChange({ householdMembers: v })}
        />

        <StepperField
          id="children"
          label="8세 이상 20세 이하 자녀수"
          hint="최대 10명"
          value={children}
          min={0}
          max={10}
          presets={[1, 2, 3, 4, 5]}
          onChange={(v) => onChange({ children: v })}
        />

        <div className="min-w-0">
          <label htmlFor="non-taxable" className="mb-2.5 block text-sm font-semibold text-ink">
            비과세액
          </label>
          <div className="relative min-w-0">
            <input
              id="non-taxable"
              type="text"
              inputMode="numeric"
              value={nonTaxable ? formatWon(nonTaxable) : ''}
              onChange={(e) => onChange({ nonTaxable: parseAmount(e.target.value) })}
              className="amount-text w-full min-w-0 rounded-xl border border-line bg-canvas px-4 py-3 pr-10 font-mono text-base text-ink outline-none focus:border-navy focus:ring-2 focus:ring-navy/20"
            />
            <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-ink-faint">
              원
            </span>
          </div>
          <QuickAmountPad
            options={NON_TAXABLE_QUICK_OPTIONS}
            onAdd={addNonTaxable}
            className="mt-3"
          />
        </div>

        {payType === 'annual' && (
          <div className="overflow-hidden rounded-2xl border border-line bg-canvas">
            <button
              type="button"
              onClick={() => setAdvancedOpen((v) => !v)}
              className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-ink-soft hover:text-ink"
            >
              고급 설정 (퇴직금 포함 여부)
              {advancedOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {advancedOpen && (
              <div className="border-t border-line/70 px-4 py-4">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: false, label: '별도 (÷12)' },
                    { value: true, label: '포함 (÷13)' },
                  ].map((option) => {
                    const active = includesSeverance === option.value
                    return (
                      <button
                        key={String(option.value)}
                        type="button"
                        onClick={() => onChange({ includesSeverance: option.value })}
                        className={`min-w-0 rounded-xl px-2 py-2.5 text-xs font-semibold sm:text-sm ${
                          active
                            ? 'bg-navy-soft text-navy'
                            : 'bg-paper text-ink-soft hover:text-ink'
                        }`}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
                <p className="mt-2.5 text-xs text-ink-faint">
                  연봉에 퇴직금이 포함되면 월급을 13으로 나눕니다.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
