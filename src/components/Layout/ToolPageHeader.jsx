import { VIEW_META } from '../../lib/seo'

export default function ToolPageHeader({ activeView }) {
  const meta = VIEW_META[activeView] ?? VIEW_META.salary

  return (
    <header className="mb-8 min-w-0 scroll-mt-20 sm:mb-10">
      <p className="mb-2 text-sm font-semibold text-navy">SalaryFit</p>
      <h1 className="text-2xl font-bold tracking-tight break-keep text-ink sm:text-3xl md:text-[2rem] md:leading-tight">
        {meta.title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed break-keep text-ink-soft sm:text-base">
        {meta.description}
      </p>
    </header>
  )
}
