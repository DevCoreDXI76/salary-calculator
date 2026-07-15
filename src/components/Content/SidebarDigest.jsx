import { ArrowRight, Lightbulb, Newspaper } from 'lucide-react'
import { financialTips } from '../../data/financialTips'
import { financialNews } from '../../data/financialNews'

const PREVIEW_COUNT = 3

export default function SidebarDigest() {
  const tips = financialTips.slice(0, PREVIEW_COUNT)
  const news = financialNews.slice(0, PREVIEW_COUNT)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="space-y-6">
      <section className="min-w-0">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-sm font-bold text-ink">
            <Lightbulb className="h-4 w-4 text-navy" />
            금융 팁
          </h3>
          <button
            type="button"
            onClick={() => scrollTo('tips')}
            className="flex items-center gap-0.5 text-xs font-semibold text-navy hover:underline"
          >
            더보기 <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <ul className="space-y-1">
          {tips.map((tip) => (
            <li key={tip.slug}>
              <button
                type="button"
                onClick={() => scrollTo('tips')}
                className="w-full rounded-xl px-2 py-2 text-left hover:bg-paper"
              >
                <p className="line-clamp-2 text-xs font-medium leading-snug text-ink">{tip.title}</p>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="min-w-0">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-sm font-bold text-ink">
            <Newspaper className="h-4 w-4 text-navy" />
            금융 뉴스
          </h3>
          <button
            type="button"
            onClick={() => scrollTo('news')}
            className="flex items-center gap-0.5 text-xs font-semibold text-navy hover:underline"
          >
            더보기 <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <ul className="space-y-1">
          {news.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollTo('news')}
                className="w-full rounded-xl px-2 py-2 text-left hover:bg-paper"
              >
                <p className="line-clamp-2 text-xs font-medium leading-snug text-ink">{item.title}</p>
                <p className="mt-0.5 text-[10px] text-ink-faint">{item.date}</p>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
