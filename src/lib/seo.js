import { SITE_URL } from './site'
import { pathFromView } from './routes'

export const VIEW_META = {
  salary: {
    title: '연봉 실수령액 계산기',
    pageTitle: '샐러리핏 | 연봉 실수령액 계산기',
    description:
      '계약 연봉을 입력하면 월 실수령액과 세금·4대보험 공제 내역이 자동으로 계산됩니다.',
  },
  severance: {
    title: '퇴직금 계산기',
    pageTitle: '샐러리핏 | 퇴직금 계산기',
    description: '입사일·퇴사일과 평균임금으로 예상 퇴직금을 계산합니다.',
  },
  unemployment: {
    title: '실업급여 계산기',
    pageTitle: '샐러리핏 | 실업급여 계산기',
    description: '고용보험 가입기간·연령·임금으로 예상 실업급여를 참고합니다.',
  },
  leave: {
    title: '연차 계산기',
    pageTitle: '샐러리핏 | 연차 계산기',
    description: '입사일 기준 발생·사용·잔여 연차 일수를 계산합니다.',
  },
}

/** @param {string} view */
export function getViewSeo(view) {
  const meta = VIEW_META[view] ?? VIEW_META.salary
  const path = pathFromView(view)
  return {
    ...meta,
    canonical: `${SITE_URL}${path === '/' ? '/' : path}`,
    ogImage: `${SITE_URL}/og.png`,
  }
}

/** @param {{ title: string, summary: string, slug: string }} tip */
export function getTipSeo(tip) {
  return {
    pageTitle: `${tip.title} | 샐러리핏`,
    description: tip.summary,
    canonical: `${SITE_URL}/tips/${tip.slug}`,
    ogImage: `${SITE_URL}/og.png`,
  }
}
