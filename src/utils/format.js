/**
 * 금액을 천 단위 콤마 문자열로 변환
 * @param {number} value
 * @returns {string}
 */
export function formatWon(value) {
  if (value == null || Number.isNaN(value)) return '0'
  return Math.round(value).toLocaleString('ko-KR')
}

/**
 * 큰 금액을 한글 단위로 요약 (예: 50,000,000 → 5,000만 원)
 * @param {number} value
 * @returns {string}
 */
export function toKoreanAmount(value) {
  const n = Math.round(Number(value) || 0)
  if (n === 0) return '0원'
  if (n < 10000) return `${formatWon(n)}원`

  const eok = Math.floor(n / 100000000)
  const man = Math.floor((n % 100000000) / 10000)
  const rest = n % 10000

  const parts = []
  if (eok > 0) parts.push(`${formatWon(eok)}억`)
  if (man > 0) parts.push(`${formatWon(man)}만`)
  if (rest > 0 && eok === 0) parts.push(`${formatWon(rest)}`)

  return `${parts.join(' ')} 원`
}

/**
 * 숫자만 남긴 뒤 number로 변환
 * @param {string | number} raw
 * @returns {number}
 */
export function parseAmount(raw) {
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : 0
  const digits = String(raw).replace(/[^\d]/g, '')
  return digits ? Number(digits) : 0
}
