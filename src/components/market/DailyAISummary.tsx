'use client'
import { useEffect, useState } from 'react'
import { Sparkles, RefreshCw } from 'lucide-react'
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
        body: JSON.stringify({ prompt: 'Write a concise 3-sentence professional market recap. Institutional analyst tone. Max 80 words.' })
      })
      const data = await res.json()
      if (data.explanation) { setSummary(data.explanation); setCachedAISummary(data.explanation) }
      else setError(true)
    } catch { setError(true) }
    setLoading(false)
  }

  useEffect(() => { fetchSummary() }, [])

  return (
    <div className="glass-card p-8 relative overflow-hidden z-10" style={{ background: 'linear-gradient(135deg, #1b2028, #161a1e)' }}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/[0.03] rounded-full blur-3xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/15 rounded-xl flex items-center justify-center border border-accent/20">
              <Sparkles size={18} className="text-accent" />
            </div>
            <div>
              <p className="font-semibold text-sm text-primary">AI Market Brief</p>
              <p className="text-xs text-muted">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={() => fetchSummary(true)} className="text-muted hover:text-accent transition-colors p-2 rounded-lg hover:bg-white/[0.04]">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 bg-white/[0.04] rounded w-full skeleton-shimmer" />
            <div className="h-4 bg-white/[0.04] rounded w-5/6 skeleton-shimmer" />
            <div className="h-4 bg-white/[0.04] rounded w-4/6 skeleton-shimmer" />
          </div>
        ) : error ? (
          <p className="text-secondary text-sm">AI analysis currently unavailable. Retry in a moment.</p>
        ) : (
          <p className="text-secondary text-sm leading-relaxed">{summary}</p>
        )}
        <p className="text-[10px] text-muted mt-5 uppercase tracking-wider">AI-generated — not financial advice</p>
      </div>
    </div>
  )
}
