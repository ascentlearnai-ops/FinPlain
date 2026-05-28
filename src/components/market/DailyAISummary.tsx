'use client'
import { useEffect, useState } from 'react'
import { BookOpen, RefreshCw } from 'lucide-react'
import { getCachedAISummary, setCachedAISummary } from '@/lib/localStorage'

export default function DailyAISummary() {
  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchSummary = async (force = false) => {
    if (!force) {
      const cached = getCachedAISummary()
      if (cached) { setSummary(cached); setLoading(false); return }
    }
    setLoading(true); setError(false)
    try {
      const res = await fetch('/api/ai-explain', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'Write a clear 5-sentence market recap for 8th-grade students. Sentence 1 explains what moved. Sentence 2 explains why it matters. Sentence 3 names the strongest stock, sector, or market signal. Sentence 4 defines one useful market word. Sentence 5 gives one research question to watch next. Use common words. No investment advice. Max 160 words.' })
      })
      const data = await res.json()
      if (data.explanation) { setSummary(data.explanation); setCachedAISummary(data.explanation) }
      else setError(true)
    } catch { setError(true) }
    setLoading(false)
  }

  useEffect(() => { fetchSummary() }, [])

  return (
    <div className="glass-card p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-white text-black rounded-lg flex items-center justify-center">
            <BookOpen size={22} />
          </div>
          <div>
            <p className="font-['Outfit'] font-black text-lg text-primary">Student market recap</p>
            <p className="text-xs text-muted font-medium">What moved, why it matters, and what to watch</p>
          </div>
        </div>
        <button onClick={() => fetchSummary(true)} className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.12] text-muted hover:text-primary hover:bg-white/[0.08] transition-colors" aria-label="Refresh recap">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="h-4 bg-white/[0.06] rounded w-full skeleton-shimmer" />
          <div className="h-4 bg-white/[0.06] rounded w-11/12 skeleton-shimmer" />
          <div className="h-4 bg-white/[0.06] rounded w-4/5 skeleton-shimmer" />
        </div>
      ) : error ? (
        <p className="text-secondary text-base font-medium">The recap is unavailable right now. Try again in a moment.</p>
      ) : (
        <p className="text-secondary text-base sm:text-lg leading-relaxed font-medium">
          {summary}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t border-white/[0.08]">
        <p className="text-[10px] text-muted font-bold uppercase">Daily context</p>
        <p className="text-[10px] text-muted font-bold uppercase">{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}
