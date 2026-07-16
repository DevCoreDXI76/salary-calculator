import { useState } from 'react'

const STORAGE_KEY = 'salaryfit-cookie-consent'

/**
 * GA4·AdSense 쿠키 사용 안내 (한국 기본, EU 대비 최소 배너)
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== 'accepted'
    } catch {
      return true
    }
  })

  if (!visible) return null

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-label="쿠키 및 광고 안내"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-paper/95 px-4 py-4 shadow-lg backdrop-blur-md sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink-soft">
          샐러리핏은 서비스 개선(GA4)과 광고(AdSense)를 위해 쿠키를 사용할 수 있습니다.
          최근 계산은 브라우저 localStorage에 저장됩니다.{' '}
          <a href="/#privacy" className="font-medium text-navy hover:underline">
            개인정보 처리방침
          </a>
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy/90"
        >
          확인
        </button>
      </div>
    </div>
  )
}
