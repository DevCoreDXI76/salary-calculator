/**
 * 입사일 기준 경과 개월 수
 * @param {string} hireDate - YYYY-MM-DD
 * @param {string} [asOfDate]
 */
export function getMonthsEmployed(hireDate, asOfDate = new Date().toISOString().slice(0, 10)) {
  if (!hireDate) return 0
  const hire = new Date(hireDate)
  const asOf = new Date(asOfDate)
  if (Number.isNaN(hire.getTime()) || asOf < hire) return 0

  let months =
    (asOf.getFullYear() - hire.getFullYear()) * 12 +
    (asOf.getMonth() - hire.getMonth())
  if (asOf.getDate() < hire.getDate()) months -= 1
  return Math.max(0, months)
}

/**
 * 근로기준법 기준 연차 발생일수 근사 (1년 미만: 월 1일, 1년 이상: 15일 + 2년마다 1일)
 * @param {number} monthsEmployed
 */
export function getAnnualLeaveDays(monthsEmployed) {
  if (monthsEmployed < 1) return 0
  if (monthsEmployed < 12) return monthsEmployed // 월 1일

  const fullYears = Math.floor(monthsEmployed / 12)
  let days = 15
  if (fullYears >= 3) {
    days += Math.floor((fullYears - 1) / 2)
  }
  return Math.min(days, 25) // 최대 25일 근사
}

/**
 * @param {{ hireDate: string, usedDays: number, asOfDate?: string }} params
 */
export function calculateLeave({ hireDate, usedDays = 0, asOfDate }) {
  const monthsEmployed = getMonthsEmployed(hireDate, asOfDate)
  const accrued = getAnnualLeaveDays(monthsEmployed)
  const used = Math.max(0, usedDays)
  const remaining = Math.max(0, accrued - used)

  return {
    monthsEmployed,
    accrued,
    used,
    remaining,
  }
}
