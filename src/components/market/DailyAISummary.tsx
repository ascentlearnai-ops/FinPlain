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
    <div className="dark-card p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/[0.06] rounded-full blur-3xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Sparkles size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-sm text-white">AI Market Brief</p>
              <p className="text-xs text-blue-300/60">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={() => fetchSummary(true)} className="text-white/40 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/[0.05]">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-white/[0.06] rounded w-full" />
            <div className="h-4 bg-white/[0.06] rounded w-5/6" />
            <div className="h-4 bg-white/[0.06] rounded w-4/6" />
          </div>
        ) : error ? (
          <p className="text-blue-200/60 text-sm">AI analysis currently unavailable. Retry in a moment.</p>
        ) : (
          <p className="text-blue-50 text-sm leading-relaxed">{summary}</p>
        )}
        <p className="text-[10px] text-white/20 mt-5 uppercase tracking-wider">AI-generated — not financial advice</p>
      </div>
    </div>
  )
}
