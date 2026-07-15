import { Clock, Trash2 } from 'lucide-react'
import { formatWon } from '../../utils/format'

export default function RecentCalculations({ entries, onRestore, onRemove, onClear }) {
  if (!entries || entries.length === 0) return null

  const formatLabel = (entry) => {
    const typeLabel = entry.payType === 'annual' ? '연봉' : '월급'
    return `${typeLabel} ${formatWon(entry.amount)}원`
  }

  const formatTime = (ts) => {
    const d = new Date(ts)
    const now = new Date()
    const diffMs = now - d
    const diffMin = Math.floor(diffMs / 60000)
    if (diffMin < 1) return '방금'
    if (diffMin < 60) return `${diffMin}분 전`
    const diffHr = Math.floor(diffMin / 60)
    if (diffHr < 24) return `${diffHr}시간 전`
    return d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
  }

  const handleRestore = (entry) => {
    onRestore({
      payType: entry.payType,
      amount: entry.amount,
      householdMembers: entry.householdMembers,
      children: entry.children,
      nonTaxable: entry.nonTaxable,
      includesSeverance: entry.includesSeverance,
    })
  }

  return (
    <section className="sheet sheet-shadow min-w-0 overflow-hidden" aria-labelledby="recent-heading">
      <div className="flex items-center justify-between px-4 py-3.5">
        <h3 id="recent-heading" className="flex items-center gap-1.5 text-sm font-bold text-ink">
          <Clock className="h-4 w-4 text-navy" />
          최근 계산
        </h3>
        <button type="button" onClick={onClear} className="text-xs text-ink-faint hover:text-ink">
          전체 삭제
        </button>
      </div>
      <ul className="max-h-64 overflow-y-auto border-t border-line/60">
        {entries.map((entry) => (
          <li key={entry.id} className="border-b border-line/50 last:border-0">
            <button
              type="button"
              onClick={() => handleRestore(entry)}
              className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left transition-colors hover:bg-navy-soft/40"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{formatLabel(entry)}</p>
                <p className="mt-0.5 text-xs text-ink-faint">
                  실수령 {formatWon(entry.netPay)}원 · {formatTime(entry.timestamp)}
                </p>
              </div>
              <Trash2
                className="h-3.5 w-3.5 shrink-0 text-ink-faint hover:text-danger"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove(entry.id)
                }}
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
