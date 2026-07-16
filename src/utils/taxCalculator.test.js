import { describe, expect, it } from 'vitest'
import { calculateSalary, PENSION_LIMITS, TAX_RATES } from './taxCalculator'

/** 연봉 4천만 → 월 3,333,333원 (퇴직금 미포함) */
const MONTHLY_40M = Math.floor(40_000_000 / 12)

describe('calculateSalary', () => {
  it('연봉 4천만·비과세 20만·부양 1명 — 실수령·공제 골든 케이스', () => {
    const result = calculateSalary(MONTHLY_40M, 200_000, 1, 0)

    expect(result.netPay).toBeGreaterThan(2_500_000)
    expect(result.netPay).toBeLessThan(2_700_000)
    expect(result.totalDeductions).toBeGreaterThan(600_000)
    expect(result.totalDeductions).toBeLessThan(750_000)
    expect(result.insuranceTotal).toBeGreaterThan(280_000)
    expect(result.taxTotal).toBeGreaterThan(350_000)

    const { deductions } = result
    expect(deductions.nationalPension).toBe(148_830)
    expect(deductions.healthInsurance).toBe(112_640)
    expect(deductions.employmentInsurance).toBe(28_190)
  })

  it('비과세가 월급 이상이면 공제 없이 전액 실수령', () => {
    const result = calculateSalary(3_000_000, 3_500_000, 1, 0)

    expect(result.netPay).toBe(3_000_000)
    expect(result.totalDeductions).toBe(0)
  })

  it('국민연금 상한 적용 — 고액 월급', () => {
    const monthly = 8_000_000
    const result = calculateSalary(monthly, 0, 1, 0)
    const maxPension = Math.floor(
      (PENSION_LIMITS.MAX_MONTHLY * TAX_RATES.NATIONAL_PENSION) / 10,
    ) * 10

    expect(result.deductions.nationalPension).toBe(maxPension)
    expect(result.deductions.nationalPension).toBeLessThan(
      Math.floor((monthly * TAX_RATES.NATIONAL_PENSION) / 10) * 10,
    )
  })

  it('자녀 1명 — 소득세 공제 반영', () => {
    const withoutChild = calculateSalary(MONTHLY_40M, 200_000, 1, 0)
    const withChild = calculateSalary(MONTHLY_40M, 200_000, 1, 1)

    expect(withChild.deductions.incomeTax).toBeLessThan(withoutChild.deductions.incomeTax)
    expect(withChild.netPay).toBeGreaterThan(withoutChild.netPay)
  })

  it('부양가족 추가 — 소득세 감소', () => {
    const single = calculateSalary(MONTHLY_40M, 200_000, 1, 0)
    const withDependent = calculateSalary(MONTHLY_40M, 200_000, 2, 0)

    expect(withDependent.deductions.incomeTax).toBeLessThan(single.deductions.incomeTax)
    expect(withDependent.netPay).toBeGreaterThan(single.netPay)
  })
})
