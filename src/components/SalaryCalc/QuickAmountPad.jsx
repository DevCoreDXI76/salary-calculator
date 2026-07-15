/**
 * 금액 빠른 추가 칩 (이지론 패턴)
 */
export default function QuickAmountPad({ options, onAdd, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.label}
          type="button"
          onClick={() => onAdd(opt.value)}
              className="rounded-full border border-line bg-canvas px-2.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-navy hover:bg-navy-soft hover:text-navy sm:px-3 sm:text-sm"
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export const SALARY_QUICK_OPTIONS = [
  { label: '+10만', value: 100_000 },
  { label: '+50만', value: 500_000 },
  { label: '+100만', value: 1_000_000 },
  { label: '+300만', value: 3_000_000 },
  { label: '+500만', value: 5_000_000 },
  { label: '+1000만', value: 10_000_000 },
  { label: '+1억', value: 100_000_000 },
]

export const NON_TAXABLE_QUICK_OPTIONS = [
  { label: '+1만', value: 10_000 },
  { label: '+3만', value: 30_000 },
  { label: '+5만', value: 50_000 },
  { label: '+10만', value: 100_000 },
  { label: '+30만', value: 300_000 },
  { label: '+50만', value: 500_000 },
]
