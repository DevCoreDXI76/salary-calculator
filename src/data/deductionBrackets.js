/**
 * 2026년 공식 기관 공시 구간·요율 (정적 참고)
 * - 소득세: 국세청 종합소득 과세표준 기본세율
 * - 4대보험: 국민연금공단·국민건강보험공단·고용보험 요율 (근로자 부담분)
 */

/** @type {{ bracket: string, rate: string }[]} */
export const INCOME_TAX_BRACKETS_2026 = [
  { bracket: '1,400만 원 이하', rate: '6%' },
  { bracket: '1,400만 원 초과 ~ 5,000만 원 이하', rate: '15%' },
  { bracket: '5,000만 원 초과 ~ 8,800만 원 이하', rate: '24%' },
  { bracket: '8,800만 원 초과 ~ 1억 5,000만 원 이하', rate: '35%' },
  { bracket: '1억 5,000만 원 초과 ~ 3억 원 이하', rate: '38%' },
  { bracket: '3억 원 초과 ~ 5억 원 이하', rate: '40%' },
  { bracket: '5억 원 초과 ~ 10억 원 이하', rate: '42%' },
  { bracket: '10억 원 초과', rate: '45%' },
]

/** @type {{ name: string, rate: string, note?: string }[]} */
export const INSURANCE_RATES_2026 = [
  { name: '국민연금', rate: '4.75%', note: '총 9.5% 중 근로자 부담' },
  { name: '건강보험', rate: '3.595%', note: '총 7.19% 중 근로자 부담' },
  { name: '장기요양보험', rate: '건강보험료의 13.14%', note: '근로자·사업주 각 절반' },
  { name: '고용보험(실업급여)', rate: '0.9%', note: '총 1.8% 중 근로자 부담' },
]

export const OFFICIAL_SOURCE_NOTE =
  '출처: 국세청 근로소득·기본세율, 국민연금공단·국민건강보험공단·고용보험 2026년 요율. 과세표준은 총급여가 아닌 공제 후 금액입니다.'
