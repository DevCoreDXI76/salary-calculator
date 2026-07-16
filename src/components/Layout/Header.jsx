import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { pathFromView } from '../../lib/routes'

export const TOOL_TABS = [
  { id: 'salary', label: '연봉', fullLabel: '연봉 계산기' },
  { id: 'severance', label: '퇴직금', fullLabel: '퇴직금 계산기' },
  { id: 'unemployment', label: '실업급여', fullLabel: '실업급여 계산기' },
  { id: 'leave', label: '연차', fullLabel: '연차 계산기' },
]

/**
 * 상단 네비게이션 — 4탭 멀티툴 헤더
 * @param {{ activeView?: string }} props
 */
export default function Header({ activeView = 'salary' }) {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const go = (id) => {
    navigate(pathFromView(id))
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full min-w-0 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-navy text-xs font-bold text-white">
            SF
          </span>
          <span className="truncate text-base font-bold tracking-tight text-ink">
            샐러리핏
          </span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-end gap-1 overflow-x-auto md:flex"
          aria-label="주요 메뉴"
        >
          {TOOL_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => go(tab.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors lg:px-3.5 ${
                activeView === tab.id
                  ? 'bg-navy-soft text-navy'
                  : 'text-ink-soft hover:bg-canvas hover:text-ink'
              }`}
            >
              <span className="lg:hidden">{tab.label}</span>
              <span className="hidden lg:inline">{tab.fullLabel}</span>
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-canvas text-ink md:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <nav
        className="flex gap-1.5 overflow-x-auto border-t border-line/60 px-4 py-2.5 md:hidden"
        aria-label="모바일 탭"
      >
        {TOOL_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => go(tab.id)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
              activeView === tab.id
                ? 'bg-navy text-white'
                : 'bg-paper text-ink-soft ring-1 ring-line'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {mobileOpen && (
        <nav className="border-t border-line bg-paper px-4 py-2 md:hidden" aria-label="모바일 메뉴">
          {TOOL_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => go(tab.id)}
              className={`block w-full border-b border-line/60 py-3 text-left text-sm font-medium last:border-0 ${
                activeView === tab.id ? 'text-navy' : 'text-ink-soft'
              }`}
            >
              {tab.fullLabel}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
