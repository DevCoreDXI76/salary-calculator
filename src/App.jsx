import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ToolPageHeader from './components/Layout/ToolPageHeader'
import SeoHead from './components/Layout/SeoHead'
import AdSlot from './components/Layout/AdSlot'
import InputSection from './components/SalaryCalc/InputSection'
import ResultSection from './components/SalaryCalc/ResultSection'
import RecentCalculations from './components/SalaryCalc/RecentCalculations'
import RateGuideSection from './components/SalaryCalc/RateGuideSection'
import RelatedToolsGrid from './components/SalaryCalc/RelatedToolsGrid'
import SeveranceCalc from './components/SeveranceCalc/SeveranceCalc'
import UnemploymentCalc from './components/UnemploymentCalc/UnemploymentCalc'
import LeaveCalc from './components/LeaveCalc/LeaveCalc'
import Consumption from './components/FunContent/Consumption'
import NegotiationQuiz from './components/FunContent/NegotiationQuiz'
import ContentHub from './components/Content/ContentHub'
import SidebarDigest from './components/Content/SidebarDigest'
import CookieConsent from './components/Layout/CookieConsent'
import { useRecentCalculations } from './hooks/useRecentCalculations'
import { calculateSalary } from './utils/taxCalculator'
import { pathFromView, TOOL_PATHS, viewFromPath } from './lib/routes'

const INITIAL_VALUES = {
  payType: 'annual',
  amount: 40000000,
  includesSeverance: false,
  nonTaxable: 200000,
  householdMembers: 1,
  children: 0,
}

function getMonthlyGross({ payType, amount, includesSeverance }) {
  if (!amount || amount <= 0) return 0
  if (payType === 'monthly') return amount
  const divisor = includesSeverance ? 13 : 12
  return Math.floor(amount / divisor)
}

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeView = viewFromPath(location.pathname)

  const [values, setValues] = useState(INITIAL_VALUES)

  useEffect(() => {
    if (!TOOL_PATHS.has(location.pathname)) {
      navigate('/', { replace: true })
    }
  }, [location.pathname, navigate])

  const handleChange = (patch) => {
    setValues((prev) => ({ ...prev, ...patch }))
  }

  const handleRestore = (restored) => {
    setValues((prev) => ({ ...prev, ...restored }))
  }

  const handleSelectSalary = (amount) => {
    navigate(pathFromView('salary'))
    setValues((prev) => ({ ...prev, payType: 'annual', amount }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const monthlyGross = getMonthlyGross(values)
  const result =
    monthlyGross > 0
      ? calculateSalary(
          monthlyGross,
          values.nonTaxable,
          values.householdMembers,
          values.children,
        )
      : null

  const netPay = result?.netPay ?? 0

  const { entries, removeEntry, clearAll } = useRecentCalculations({
    values,
    result,
    netPay,
  })

  const annualEquivalent =
    values.payType === 'annual'
      ? values.amount
      : monthlyGross * (values.includesSeverance ? 13 : 12)

  const salarySidebar = (
    <div className="space-y-5">
      <RecentCalculations
        entries={entries}
        onRestore={handleRestore}
        onRemove={removeEntry}
        onClear={clearAll}
      />
      <RelatedToolsGrid activeView="salary" />
      <SidebarDigest />
      <AdSlot position="sidebar" size="sidebar" label="사이드 광고" />
    </div>
  )

  const renderTool = () => {
    switch (activeView) {
      case 'severance':
        return <SeveranceCalc />
      case 'unemployment':
        return <UnemploymentCalc />
      case 'leave':
        return <LeaveCalc />
      default:
        return (
          <>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:items-start">
              <InputSection values={values} onChange={handleChange} />
              <ResultSection
                monthlyGross={monthlyGross}
                result={result}
                meta={{ payType: values.payType, annualEquivalent }}
              />
            </div>

            <div className="xl:hidden">
              <RecentCalculations
                entries={entries}
                onRestore={handleRestore}
                onRemove={removeEntry}
                onClear={clearAll}
              />
            </div>

            <RateGuideSection />

            <div className="space-y-2">
              <Consumption netPay={netPay} />
              <NegotiationQuiz netPay={netPay} />
            </div>
          </>
        )
    }
  }

  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-canvas">
      <SeoHead view={activeView} />
      <Header activeView={activeView} />

      <main className="mx-auto w-full min-w-0 max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6 flex w-full min-w-0 justify-center sm:mb-8">
          <AdSlot position="top" size="leaderboard" label="상단 광고" className="w-full" />
        </div>

        <ToolPageHeader activeView={activeView} />

        <div className="grid grid-cols-1 gap-6 sm:gap-8 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0 space-y-6 sm:space-y-8">
            {renderTool()}

            {activeView !== 'salary' && (
              <div className="xl:hidden">
                <AdSlot position="feed" size="feed" label="피드 광고" />
              </div>
            )}
          </div>

          <aside className="hidden min-w-0 xl:block">
            <div className="sticky top-24 space-y-6">
              {activeView === 'salary' ? (
                salarySidebar
              ) : (
                <>
                  <RelatedToolsGrid activeView={activeView} />
                  <AdSlot position="sidebar" size="sidebar" label="사이드 광고" />
                </>
              )}
            </div>
          </aside>
        </div>

        <ContentHub onSelectSalary={handleSelectSalary} />

        <div className="mt-10 flex w-full min-w-0 justify-center sm:mt-14">
          <AdSlot position="bottom" size="leaderboard" label="하단 광고" className="w-full" />
        </div>
      </main>

      <Footer />
      <CookieConsent />
    </div>
  )
}
