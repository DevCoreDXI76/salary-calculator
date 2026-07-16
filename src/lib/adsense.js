import { ADSENSE_CLIENT } from './site'

let initialized = false

/**
 * AdSense — VITE_ADSENSE_CLIENT가 있을 때만 adsbygoogle.js 로드
 */
export function initAdsense() {
  if (initialized || !ADSENSE_CLIENT || typeof window === 'undefined') return
  if (document.querySelector('script[data-adsense]')) {
    initialized = true
    return
  }
  initialized = true

  const script = document.createElement('script')
  script.async = true
  script.crossOrigin = 'anonymous'
  script.dataset.adsense = 'true'
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`
  document.head.appendChild(script)
}
