'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react'
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

  const navigate = (ticker: string) => { 
    addRecentSearch(ticker)
    setQuery('')
    setFocused(false)
    router.push(`/stock/${ticker}`) 
  }
  
  const recents = getRecentSearches()

  return (
    <div className={`relative transition-all duration-300 ${fullWidth ? 'w-full' : 'w-64 focus-within:w-80'}`}>
      <div className="relative group">
        <Search size={14} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focused ? 'text-accent' : 'text-muted'}`} />
        <input 
          ref={inputRef} 
          type="text" 
          placeholder="Market search..."
          value={query} 
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)} 
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          className="w-full bg-[#0d1017]/60 backdrop-blur-md border border-white/10 rounded-[14px] pl-10 pr-10 py-2.5 text-xs text-primary placeholder:text-muted focus:outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all font-mono tracking-tight" 
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors">
            <X size={14} />
          </button>
        )}
      </div>

      {focused && (query || recents.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-3 glass-card border-white/10 shadow-2xl overflow-hidden z-[110] animate-fadeInUp">
          {loading && (
            <div className="p-6 text-center">
              <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          )}
          {!loading && results.length > 0 && (
            <div className="py-2">
              {results.slice(0, 6).map((r: any) => (
                <button 
                  key={r.ticker} 
                  onClick={() => navigate(r.ticker)} 
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors text-left group/item"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center font-mono font-black text-[10px] text-accent group-hover/item:bg-accent/20 transition-all">
                      {r.ticker.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-mono font-black text-sm text-primary tracking-tighter">{r.ticker}</p>
                      <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{r.name.slice(0, 24)}</p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-muted opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}
          {!loading && !query && recents.length > 0 && (
            <div className="py-2">
              <div className="px-5 py-2.5 flex items-center gap-2">
                <TrendingUp size={10} className="text-accent" />
                <p className="text-[10px] uppercase font-black text-muted tracking-[0.2em]">Recent activity</p>
              </div>
              {recents.map((t: string) => (
                <button key={t} onClick={() => navigate(t)} className="w-full flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors text-left group/recent">
                  <span className="font-mono font-bold text-sm text-secondary group-hover/recent:text-primary">{t}</span>
                  <ArrowRight size={14} className="text-muted opacity-0 group-hover/recent:opacity-100 transition-all" />
                </button>
              ))}
            </div>
          )}
          {!loading && query && results.length === 0 && (
             <div className="p-8 text-center">
               <p className="text-sm text-muted font-medium">No assets found for &ldquo;{query}&rdquo;</p>
             </div>
          )}
        </div>
      )}
    </div>
  )
}
