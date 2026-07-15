/** 사이트 공통 설정 (Vite env) */
export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || 'https://salaryfit.vercel.app'

export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || 'contact@salaryfit.example.com'

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''

export const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || ''
