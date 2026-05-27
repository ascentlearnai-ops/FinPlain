// src/lib/localStorage.ts

const WATCHLIST_KEY = 'macroliberium_watchlist'
const RECENTS_KEY = 'macroliberium_recents'
const AI_CACHE_KEY = 'macroliberium_ai_cache'
const NOTES_KEY = 'macroliberium_research_notes'
const ALERTS_KEY = 'macroliberium_keyword_alerts'

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

// AI SUMMARY CACHE (keyed by date so it re-fetches each new day)
export function getCachedAISummary(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = JSON.parse(localStorage.getItem(AI_CACHE_KEY) || 'null')
    const today = new Date().toDateString()
    if (stored?.date === today) return stored.summary
    return null
  } catch { return null }
}

export function setCachedAISummary(summary: string): void {
  localStorage.setItem(AI_CACHE_KEY, JSON.stringify({
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
