// 2026년 기준 4대 보험 및 세금 요율 정의 (근로자 부담분 기준)
export const TAX_RATES = {
    NATIONAL_PENSION: 0.0475,     // 국민연금 근로자 4.75% (총 9.5%)
    HEALTH_INSURANCE: 0.03595,    // 건강보험 (3.595%)
    LONG_TERM_CARE: 0.1314,       // 장기요양보험 (건강보험료의 13.14%)
    EMPLOYMENT_INSURANCE: 0.009,  // 고용보험 (0.9%)
  };
  
  // 국민연금 보정 기준값 (2026 예상 기준치 조정 가능하도록 상수로 관리)
  export const PENSION_LIMITS = {
    MIN_MONTHLY: 390000,
    MAX_MONTHLY: 6170000,
  };
  
  /**
   * 월 급여액 기준 실수령액 및 공제액 계산 함수
   * @param {number} monthlySalary - 세전 월급 (퇴직금 제외 기준)
   * @param {number} nonTaxable - 비과세 수당 (식대 등)
   * @param {number} householdMembers - 본인 포함 부양가족 수 (기본 1)
   * @param {number} children - 20세 이하 자녀 수 (기본 0)
   */
  export function calculateSalary(monthlySalary, nonTaxable = 200000, householdMembers = 1, children = 0) {
    const targetSalary = monthlySalary - nonTaxable; // 세금 산정 대상 소득
    
    if (targetSalary <= 0) {
      return {
        netPay: monthlySalary,
        totalDeductions: 0,
        insuranceTotal: 0,
        taxTotal: 0,
        insurancePct: 0,
        taxPct: 0,
        netPct: 100,
        deductions: {},
      };
    }
  
    // 1. 국민연금 계산 (상하한선 적용)
    let pensionBase = Math.max(PENSION_LIMITS.MIN_MONTHLY, Math.min(targetSalary, PENSION_LIMITS.MAX_MONTHLY));
    const nationalPension = Math.floor((pensionBase * TAX_RATES.NATIONAL_PENSION) / 10) * 10;
  
    // 2. 건강보험 계산
    const healthInsurance = Math.floor((targetSalary * TAX_RATES.HEALTH_INSURANCE) / 10) * 10;
  
    // 3. 장기요양보험 계산
    const longTermCare = Math.floor((healthInsurance * TAX_RATES.LONG_TERM_CARE) / 10) * 10;
  
    // 4. 고용보험 계산
    const employmentInsurance = Math.floor((targetSalary * TAX_RATES.EMPLOYMENT_INSURANCE) / 10) * 10;
  
    // 5. 근로소득세 (간이세액표 근사 공식 적용)
    // *실제 개발 시에는 간소화된 누진세율 테이블 또는 근사 연산식을 구현합니다.
    const incomeTax = calculateIncomeTax(targetSalary, householdMembers, children);
    const localIncomeTax = Math.floor((incomeTax * 0.1) / 10) * 10;
  
    const insuranceTotal =
      nationalPension + healthInsurance + longTermCare + employmentInsurance;
    const taxTotal = incomeTax + localIncomeTax;
    const totalDeductions = insuranceTotal + taxTotal;
    const netPay = monthlySalary - totalDeductions;

    const pct = (amount) =>
      monthlySalary > 0 ? Math.round((amount / monthlySalary) * 1000) / 10 : 0;

    return {
      netPay,
      totalDeductions,
      insuranceTotal,
      taxTotal,
      insurancePct: pct(insuranceTotal),
      taxPct: pct(taxTotal),
      netPct: pct(netPay),
      deductions: {
        nationalPension,
        healthInsurance,
        longTermCare,
        employmentInsurance,
        incomeTax,
        localIncomeTax,
      },
    };
  }
  
  // 근로소득세 과세표준 및 누진공제액 간이식 (단순화 버전)
  function calculateIncomeTax(taxableMonthly, members, children) {
    const annualTaxable = taxableMonthly * 12;
    let baseTax = 0;
  
    // 과세표준 구간별 세율 및 누진공제액 적용 (간이 계산식)
    if (annualTaxable <= 14000000) {
      baseTax = annualTaxable * 0.06;
    } else if (annualTaxable <= 50000000) {
      baseTax = annualTaxable * 0.15 - 1260000;
    } else if (annualTaxable <= 88000000) {
      baseTax = annualTaxable * 0.24 - 576000;
    } else {
      baseTax = annualTaxable * 0.35 - 15440000;
    }
  
    let monthlyTax = Math.floor(baseTax / 12);
    
    // 부양가족 및 자녀 수에 따른 대략적인 인적공제 보정율 적용
    const reductionFactor = 1 - (members - 1) * 0.1 - children * 0.15;
    monthlyTax = Math.max(0, Math.floor(monthlyTax * Math.max(0.4, reductionFactor)));
  
    return Math.floor(monthlyTax / 10) * 10;
  }