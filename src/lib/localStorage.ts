// src/lib/localStorage.ts

const WATCHLIST_KEY = 'macroliberium_watchlist'
const RECENTS_KEY = 'macroliberium_recents'
const SUMMARY_CACHE_KEY = 'macroliberium_summary_cache'
const NOTES_KEY = 'macroliberium_research_notes'
const ALERTS_KEY = 'macroliberium_keyword_alerts'
const STUDY_PROGRESS_KEY = 'macroliberium_study_progress'
const SAVED_TERMS_KEY = 'macroliberium_saved_study_terms'

// WATCHLIST
export function getWatchlist(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '[]')
  } catch { return [] }
}

export function addToWatchlist(ticker: string): void {
  const list = getWatchlist()
  if (!list.includes(ticker)) {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...list, ticker]))
  }
}

export function removeFromWatchlist(ticker: string): void {
  const list = getWatchlist().filter(t => t !== ticker)
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list))
}

export function isInWatchlist(ticker: string): boolean {
  return getWatchlist().includes(ticker)
}

// RECENT SEARCHES
export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(RECENTS_KEY) || '[]')
  } catch { return [] }
}

export function addRecentSearch(ticker: string): void {
  const recents = getRecentSearches().filter((t: string) => t !== ticker)
  localStorage.setItem(RECENTS_KEY, JSON.stringify([ticker, ...recents].slice(0, 5)))
}

// SUMMARY CACHE (keyed by date so it re-fetches each new day)
export function getCachedAISummary(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = JSON.parse(localStorage.getItem(SUMMARY_CACHE_KEY) || 'null')
    const today = new Date().toDateString()
    if (stored?.date === today) return stored.summary
    return null
  } catch { return null }
}

export function setCachedAISummary(summary: string): void {
  localStorage.setItem(SUMMARY_CACHE_KEY, JSON.stringify({
    date: new Date().toDateString(),
    summary,
  }))
}

export function getResearchNote(ticker: string): string {
  if (typeof window === 'undefined') return ''
  try {
    const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}')
    return notes[ticker.toUpperCase()] || ''
  } catch { return '' }
}

export function setResearchNote(ticker: string, note: string): void {
  if (typeof window === 'undefined') return
  try {
    const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}')
    notes[ticker.toUpperCase()] = note
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
  } catch {}
}

export function getKeywordAlerts(ticker: string): string[] {
  if (typeof window === 'undefined') return []
  try {
    const alerts = JSON.parse(localStorage.getItem(ALERTS_KEY) || '{}')
    return alerts[ticker.toUpperCase()] || []
  } catch { return [] }
}

export function setKeywordAlerts(ticker: string, alerts: string[]): void {
  if (typeof window === 'undefined') return
  try {
    const allAlerts = JSON.parse(localStorage.getItem(ALERTS_KEY) || '{}')
    allAlerts[ticker.toUpperCase()] = alerts
    localStorage.setItem(ALERTS_KEY, JSON.stringify(allAlerts))
  } catch {}
}

function readStringArray(key: string): string[] {
  if (typeof window === 'undefined') return []
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(value) ? value.filter(item => typeof item === 'string') : []
  } catch {
    return []
  }
}

function writeStringArray(key: string, value: string[]): string[] {
  const next = Array.from(new Set(value))
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(next))
  }
  return next
}

export function getStudyProgress(): string[] {
  return readStringArray(STUDY_PROGRESS_KEY)
}

export function setStudyModuleCompleted(moduleId: string, completed: boolean): string[] {
  const current = getStudyProgress()
  const next = completed
    ? [...current, moduleId]
    : current.filter(id => id !== moduleId)
  return writeStringArray(STUDY_PROGRESS_KEY, next)
}

export function getSavedStudyTerms(): string[] {
  return readStringArray(SAVED_TERMS_KEY)
}

export function setStudyTermSaved(termId: string, saved: boolean): string[] {
  const current = getSavedStudyTerms()
  const next = saved
    ? [...current, termId]
    : current.filter(id => id !== termId)
  return writeStringArray(SAVED_TERMS_KEY, next)
}
