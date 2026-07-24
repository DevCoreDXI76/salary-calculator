import { useEffect, useRef, useState } from 'react'
import { ADSENSE_CLIENT } from '../../lib/site'

const SIZE_STYLES = {
  banner: 'min-h-[72px] w-full max-w-full sm:min-h-[90px]',
  sidebar: 'min-h-[250px] w-full max-w-full',
  feed: 'min-h-[88px] w-full max-w-full sm:min-h-[100px]',
  leaderboard: 'min-h-[72px] w-full max-w-full sm:min-h-[90px] sm:max-w-[728px]',
}

/** position → AdSense ad slot ID (승인 후 Vercel env 또는 아래 맵에 설정) */
const AD_SLOT_IDS = {
  top: import.meta.env.VITE_ADSENSE_SLOT_TOP || '',
  bottom: import.meta.env.VITE_ADSENSE_SLOT_BOTTOM || '',
  sidebar: import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR || '',
  feed: import.meta.env.VITE_ADSENSE_SLOT_FEED || '',
}

const ADSENSE_ENABLED = Boolean(ADSENSE_CLIENT)

/**
 * 광고 슬롯 — AdSense 미설정 시 플레이스홀더, 설정 시 ins.adsbygoogle
 */
export default function AdSlot({
  position = 'bottom',
  size = 'banner',
  label,
  className = '',
}) {
  const wrapRef = useRef(null)
  const insRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const displayLabel = label ?? `광고 · ${position}`
  const slotId = AD_SLOT_IDS[position] || ''

  // 부모가 breakpoint에 따라 display:none 처리되는 슬롯(예: xl 미만 사이드바)은 폭이 0이라
  // adsbygoogle.js가 "No slot size" 에러를 던진다. push()는 페이지 전체의 ins.adsbygoogle을
  // 훑기 때문에 우리 쪽 push 타이밍만 늦춰서는 못 막고, ins 자체를 실제로 보일 때까지 DOM에서 뺀다.
  useEffect(() => {
    if (!ADSENSE_ENABLED || !slotId || !wrapRef.current) return
    const el = wrapRef.current
    if (el.getBoundingClientRect().width > 0) {
      setVisible(true)
      return
    }
    const observer = new ResizeObserver((entries) => {
      if (entries[0].contentRect.width > 0) {
        observer.disconnect()
        setVisible(true)
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [slotId])

  useEffect(() => {
    if (!visible || !insRef.current) return
    const el = insRef.current
    if (el.dataset.pushed) return
    el.dataset.pushed = 'true'
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // ignore duplicate push
    }
  }, [visible])

  if (ADSENSE_ENABLED && slotId) {
    return (
      <aside
        ref={wrapRef}
        className={`flex max-w-full min-w-0 items-center justify-center overflow-hidden ${SIZE_STYLES[size] ?? SIZE_STYLES.banner} ${className}`}
        aria-label={displayLabel}
        data-ad-position={position}
      >
        {visible && (
          <ins
            ref={insRef}
            className="adsbygoogle block w-full"
            style={{ display: 'block' }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </aside>
    )
  }

  return (
    <aside
      className={`flex max-w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-line bg-paper ${SIZE_STYLES[size] ?? SIZE_STYLES.banner} ${className}`}
      aria-label={displayLabel}
      data-ad-position={position}
      data-ad-slot="placeholder"
    >
      <div className="px-3 py-3 text-center sm:px-4 sm:py-4">
        <p className="text-xs font-medium text-ink-faint">광고</p>
        <p className="mt-0.5 text-[11px] break-keep text-ink-faint/80">{displayLabel}</p>
      </div>
    </aside>
  )
}
