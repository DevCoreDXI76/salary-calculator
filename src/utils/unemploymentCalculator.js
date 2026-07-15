/**
 * 고용보험 가입기간(개월)에 따른 소정급여일수 근사 (2026 기준 단순화)
 * 실제는 고용24·고용보험법에 따라 달라짐
 * @param {number} months - 가입 개월 수
 * @param {'under50' | '50plus'} ageGroup
 */
export function getBenefitDays(months, ageGroup) {
  if (months < 18) return 0 // 1년 6개월 미만

  let days = 0
  if (months < 24) days = 120
  else if (months < 30) days = 150
  else if (months < 36) days = 180
  else if (months < 42) days = 210
  else if (months < 48) days = 240
  else days = 270

  if (ageGroup === '50plus' && days > 0) {
    days = Math.min(days + 60, 330)
  }
  return days
}

/**
 * 실업급여 일액 근사 (퇴직 전 평균임금의 60%, 상·하한 적용)
 * @param {number} dailyWage - 1일 평균임금
 */
export function getDailyBenefit(dailyWage) {
  if (!dailyWage || dailyWage <= 0) return 0
  const raw = Math.floor(dailyWage * 0.6)
  const minDaily = 63104 // 2026 1구간 하한 근사
  const maxDaily = 66000 // 상한 근사
  return Math.min(Math.max(raw, minDaily), maxDaily)
}

/**
 * @param {{ months: number, ageGroup: 'under50' | '50plus', dailyWage: number }} params
 */
export function calculateUnemployment({ months, ageGroup, dailyWage }) {
  const benefitDays = getBenefitDays(months, ageGroup)
  const dailyBenefit = getDailyBenefit(dailyWage)
  const totalBenefit = benefitDays * dailyBenefit

  return {
    benefitDays,
    dailyBenefit,
    totalBenefit,
    eligible: benefitDays > 0 && dailyBenefit > 0,
  }
}
