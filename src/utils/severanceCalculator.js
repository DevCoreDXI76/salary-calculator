/**
 * 두 날짜 사이 일수 (퇴사일 포함)
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 */
export function getDaysBetween(startDate, endDate) {
  if (!startDate || !endDate) return 0
  const start = new Date(startDate)
  const end = new Date(endDate)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0
  if (end < start) return 0
  const diff = end.getTime() - start.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1
}

/**
 * 퇴직금 근사 계산 (근로기준법: 평균임금 × 재직연수)
 * @param {string} startDate
 * @param {string} endDate
 * @param {number} avgDailyWage - 1일 평균임금
 */
export function calculateSeverance(startDate, endDate, avgDailyWage) {
  const days = getDaysBetween(startDate, endDate)
  if (days <= 0 || !avgDailyWage || avgDailyWage <= 0) {
    return { days: 0, years: 0, months: 0, severancePay: 0 }
  }

  const years = days / 365
  const months = Math.floor((days % 365) / 30)
  const fullYears = Math.floor(days / 365)
  const severancePay = Math.floor(avgDailyWage * 30 * years)

  return {
    days,
    years: Number(years.toFixed(2)),
    months,
    fullYears,
    severancePay,
  }
}

/**
 * 월 급여로부터 1일 평균임금 근사 (÷30)
 * @param {number} monthlySalary
 */
export function monthlyToDailyWage(monthlySalary) {
  if (!monthlySalary || monthlySalary <= 0) return 0
  return Math.floor(monthlySalary / 30)
}
