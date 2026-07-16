import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SeoHead from '../components/Layout/SeoHead'
import Footer from '../components/Layout/Footer'
import CookieConsent from '../components/Layout/CookieConsent'
import { financialTips } from '../data/financialTips'

export default function TipPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const tip = financialTips.find((t) => t.slug === slug)

  useEffect(() => {
    if (!tip) {
      navigate('/', { replace: true })
    }
  }, [tip, navigate])

  if (!tip) return null

  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-canvas">
      <SeoHead mode="tip" tip={tip} />

      <main className="mx-auto w-full min-w-0 max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <Link
          to="/#tips"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          금융·연봉 팁 목록
        </Link>

        <article>
          <p className="text-xs text-ink-faint">{tip.date}</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {tip.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">{tip.summary}</p>
          {tip.body && (
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
              {tip.body.split('\n\n').map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          )}
        </article>
      </main>

      <Footer />
      <CookieConsent />
    </div>
  )
}
