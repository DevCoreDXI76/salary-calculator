import { useEffect } from 'react'
import { FAQ_ITEMS } from '../../data/faq'
import { getViewSeo, getTipSeo } from '../../lib/seo'
import { SITE_URL } from '../../lib/site'

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * @param {{ mode?: 'view' | 'tip', view?: string, tip?: { title: string, summary: string, slug: string } }} props
 */
export default function SeoHead({ mode = 'view', view = 'salary', tip }) {
  useEffect(() => {
    const seo = mode === 'tip' && tip ? getTipSeo(tip) : getViewSeo(view)

    document.title = seo.pageTitle ?? seo.title
    setMeta('name', 'description', seo.description)
    setLink('canonical', seo.canonical)

    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:locale', 'ko_KR')
    setMeta('property', 'og:site_name', '샐러리핏 SalaryFit')
    setMeta('property', 'og:title', seo.pageTitle ?? seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:url', seo.canonical)
    setMeta('property', 'og:image', seo.ogImage)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', seo.pageTitle ?? seo.title)
    setMeta('name', 'twitter:description', seo.description)
    setMeta('name', 'twitter:image', seo.ogImage)

    if (mode === 'view') {
      setJsonLd('salaryfit-webapp-ld', {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: '샐러리핏 SalaryFit',
        url: SITE_URL,
        description:
          '연봉 실수령액·퇴직금·실업급여·연차 계산기. 브라우저에서 바로 계산하는 무료 급여 도구.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
      })

      setJsonLd('salaryfit-faq-ld', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      })
    } else {
      document.getElementById('salaryfit-webapp-ld')?.remove()
      document.getElementById('salaryfit-faq-ld')?.remove()
    }
  }, [mode, view, tip])

  return null
}
