/** 도구 뷰 ID ↔ URL 경로 */
export const VIEW_PATHS = {
  salary: '/',
  severance: '/severance',
  unemployment: '/unemployment',
  leave: '/leave',
}

export const TOOL_PATHS = new Set(Object.values(VIEW_PATHS))

/** @param {string} pathname */
export function viewFromPath(pathname) {
  if (pathname === '/severance') return 'severance'
  if (pathname === '/unemployment') return 'unemployment'
  if (pathname === '/leave') return 'leave'
  return 'salary'
}

/** @param {string} view */
export function pathFromView(view) {
  return VIEW_PATHS[view] ?? '/'
}
