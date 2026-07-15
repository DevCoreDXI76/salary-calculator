import { formatWon } from '../../utils/format'

const ITEMS = [
  { id: 'coffee', label: '스타벅스 아메리카노', unit: '잔', price: 4500 },
  { id: 'chicken', label: '치킨', unit: '마리', price: 22000 },
  { id: 'netflix', label: '넷플릭스', unit: '개월', price: 17000 },
  { id: 'lunch', label: '점심 도시락', unit: '끼', price: 9000 },
  { id: 'subway', label: '지하철 1회', unit: '번', price: 1550 },
  { id: 'tesla', label: '테슬라 모델Y', unit: '대', price: 52990000, isDream: true },
]

export default function Consumption({ netPay }) {
  const hasPay = netPay > 0

  const cards = ITEMS.map((item) => {
    if (item.isDream) {
      const months = hasPay ? Math.ceil(item.price / netPay) : 0
      const years = months > 0 ? (months / 12).toFixed(1) : '—'
      return {
        ...item,
        count: months,
        copy: hasPay
          ? `한 푼도 안 쓰고 ${months}개월(${years}년) 모아야 해요`
          : '연봉을 입력하면 계산됩니다',
      }
    }
    const count = hasPay ? Math.floor(netPay / item.price) : 0
    return {
      ...item,
      count,
      copy: hasPay
        ? `이번 달 실수령으로 ${formatWon(count)}${item.unit} 가능`
        : '연봉을 입력하면 계산됩니다',
    }
  })

  return (
    <section className="section-open section-rule pt-8 sm:pt-10">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-ink sm:text-xl">이 돈으로 뭐 살까?</h2>
        <p className="mt-1.5 text-sm break-keep text-ink-soft">
          {hasPay
            ? `월 실수령 ${formatWon(netPay)}원 기준으로 일상 소비를 환산해 봤어요.`
            : '연봉을 입력하면 실수령액으로 살 수 있는 것들이 표시됩니다.'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {cards.map((item) => (
          <div
            key={item.id}
            className={`min-w-0 rounded-2xl border border-line p-4 sm:p-5 ${
              item.isDream ? 'border-navy/25 bg-navy-soft' : 'bg-paper'
            }`}
          >
            <p className="text-xs font-medium text-ink-faint sm:text-sm">{item.label}</p>
            <p className="font-mono amount-text mt-2 text-xl font-bold tabular-nums text-ink sm:text-2xl">
              {hasPay ? formatWon(item.count) : '—'}
              <span className="ml-0.5 text-sm font-medium text-ink-soft">{item.unit}</span>
            </p>
            <p className="mt-2 text-xs leading-snug break-keep text-ink-soft">{item.copy}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
