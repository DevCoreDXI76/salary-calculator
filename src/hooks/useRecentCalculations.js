import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'salaryfit:recent-calcs'
const MAX_ITEMS = 10
const DEBOUNCE_MS = 500

/**
 * @typedef {Object} RecentCalcEntry
 * @property {string} id
 * @property {'annual'|'monthly'} payType
 * @property {number} amount
 * @property {number} netPay
 * @property {number} householdMembers
 * @property {number} children
 * @property {number} nonTaxable
 * @property {boolean} includesSeverance
 * @property {number} timestamp
 */

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ITEMS)))
  } catch {
    // ignore quota errors
  }
}

/**
 * 최근 계산 localStorage 저장·복원
 * @param {{ values: object, result: object|null, netPay: number }} params
 */
export function useRecentCalculations({ values, result, netPay }) {
  const [entries, setEntries] = useState(loadEntries)
  const timerRef = useRef(null)

  const saveCurrent = useCallback(() => {
    if (!result || !values.amount || values.amount <= 0) return

    const entry = {
      id: `${Date.now()}-${values.amount}`,
      payType: values.payType,
      amount: values.amount,
      netPay,
      householdMembers: values.householdMembers,
      children: values.children,
      nonTaxable: values.nonTaxable,
      includesSeverance: values.includesSeverance,
      timestamp: Date.now(),
    }

    setEntries((prev) => {
      const filtered = prev.filter(
        (e) =>
          !(
            e.payType === entry.payType &&
            e.amount === entry.amount &&
            e.householdMembers === entry.householdMembers &&
            e.children === entry.children &&
            e.nonTaxable === entry.nonTaxable &&
            e.includesSeverance === entry.includesSeverance
          ),
      )
      const next = [entry, ...filtered].slice(0, MAX_ITEMS)
      saveEntries(next)
      return next
    })
  }, [values, result, netPay])

  useEffect(() => {
    if (!result || !values.amount) return

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(saveCurrent, DEBOUNCE_MS)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [values, result, netPay, saveCurrent])

  const removeEntry = useCallback((id) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id)
      saveEntries(next)
      return next
    })
  }, [])

  const clearAll = useCallback(() => {
    saveEntries([])
    setEntries([])
  }, [])

  return { entries, removeEntry, clearAll }
}

export { loadEntries as loadRecentCalculations, MAX_ITEMS as RECENT_CALC_MAX }
