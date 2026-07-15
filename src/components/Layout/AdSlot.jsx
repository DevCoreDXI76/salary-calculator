import { useEffect, useRef } from 'react'
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
  const insRef = useRef(null)
  const displayLabel = label ?? `광고 · ${position}`
  const slotId = AD_SLOT_IDS[position] || ''

  useEffect(() => {
    if (!ADSENSE_ENABLED || !slotId || !insRef.current) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // ignore duplicate push
    }
  }, [slotId])

  if (ADSENSE_ENABLED && slotId) {
    return (
      <aside
        className={`flex max-w-full min-w-0 items-center justify-center overflow-hidden ${SIZE_STYLES[size] ?? SIZE_STYLES.banner} ${className}`}
        aria-label={displayLabel}
        data-ad-position={position}
      >
        <ins
          ref={insRef}
          className="adsbygoogle block w-full"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
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
