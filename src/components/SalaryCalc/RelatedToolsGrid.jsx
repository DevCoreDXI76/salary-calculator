import { useNavigate } from 'react-router-dom'
import { Calculator, CalendarDays, PiggyBank, Wallet } from 'lucide-react'
import { TOOL_TABS } from '../Layout/Header'
import { pathFromView } from '../../lib/routes'

const ICONS = {
  salary: Wallet,
  severance: PiggyBank,
  unemployment: Calculator,
  leave: CalendarDays,
}

export default function RelatedToolsGrid({ activeView = 'salary' }) {
  const navigate = useNavigate()
  const tools = TOOL_TABS.filter((t) => t.id !== activeView)

  const go = (id) => {
    navigate(pathFromView(id))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="min-w-0" aria-labelledby="related-tools-heading">
      <h3 id="related-tools-heading" className="mb-3 text-sm font-bold text-ink">
        다른 계산기 더 보기
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {tools.map((tool) => {
          const Icon = ICONS[tool.id] || Calculator
          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => go(tool.id)}
              className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-3.5 py-3 text-left transition-colors hover:border-navy hover:bg-navy-soft"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-soft text-navy">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-ink">{tool.fullLabel}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
