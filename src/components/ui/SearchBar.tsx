'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, ArrowRight } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { getRecentSearches, addRecentSearch } from '@/lib/localStorage'

interface Props { fullWidth?: boolean }

export default function SearchBar({ fullWidth }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [focused, setFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 1) { setResults([]); return }
    setLoading(true)
    fetch(`/api/stock-search?q=${encodeURIComponent(debouncedQuery)}`)
      .then(res => res.json()).then(data => { setResults(data.results || []); setLoading(false) }).catch(() => setLoading(false))
  }, [debouncedQuery])

  const navigate = (ticker: string) => { addRecentSearch(ticker); setQuery(''); setFocused(false); router.push(`/stock/${ticker}`) }
  const recents = getRecentSearches()

  return (
    <div className={`relative ${fullWidth ? 'w-full' : 'w-60'}`}>
      <div className="relative">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input ref={inputRef} type="text" placeholder="Search ticker..."
          value={query} onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 200)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-8 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all font-mono" />
        {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"><X size={13} /></button>}
      </div>

      {focused && (query || recents.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50">
          {loading && <div className="p-3 text-center"><div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" /></div>}
          {!loading && results.length > 0 && results.map((r: any) => (
            <button key={r.ticker} onClick={() => navigate(r.ticker)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0">
              <div>
                <span className="font-mono font-bold text-sm text-primary">{r.ticker}</span>
                <span className="text-xs text-muted ml-2">{r.name}</span>
              </div>
              <ArrowRight size={12} className="text-muted" />
            </button>
          ))}
          {!loading && !query && recents.length > 0 && (
            <>
              <p className="px-4 py-2 text-[10px] uppercase tracking-wider text-muted font-semibold border-b border-gray-50">Recent</p>
              {recents.map((t: string) => (
                <button key={t} onClick={() => navigate(t)} className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left">
                  <span className="font-mono text-sm text-secondary">{t}</span>
                  <ArrowRight size={12} className="text-muted" />
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
