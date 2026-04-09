'use client'
import { useEffect, useState } from 'react'
import { Brain, RefreshCw, Zap } from 'lucide-react'
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
    <div className="glass-card p-6 sm:p-10 relative overflow-hidden z-10 border-white/[0.03]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/[0.04] rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/[0.03] rounded-full blur-[60px]" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/15 rounded-2xl flex items-center justify-center border border-accent/20 shadow-neon-pink">
              <Brain size={24} className="text-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-['Outfit'] font-black text-lg text-primary">Neural Market Recap</p>
                <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded-md text-[8px] font-black text-muted uppercase tracking-widest border border-white/5">v2.0</span>
              </div>
              <p className="text-xs text-muted font-medium flex items-center gap-1.5">
                <Zap size={10} className="text-accent" /> Generated via Gemini 2.0 Flash
              </p>
            </div>
          </div>
          <button onClick={() => fetchSummary(true)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-muted hover:text-accent hover:bg-accent/10 transition-all">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="h-4 bg-white/[0.03] rounded-lg w-full skeleton-shimmer" />
            <div className="h-4 bg-white/[0.03] rounded-lg w-11/12 skeleton-shimmer" />
            <div className="h-4 bg-white/[0.03] rounded-lg w-4/5 skeleton-shimmer" />
          </div>
        ) : error ? (
          <div className="py-2">
            <p className="text-secondary text-base font-medium">Neural processing interrupted. Please synchronize again.</p>
          </div>
        ) : (
          <div className="relative p-1">
             <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-accent rounded-full opacity-40 hidden sm:block" />
             <p className="text-secondary text-base sm:text-lg leading-relaxed font-medium italic">
               &ldquo;{summary}&rdquo;
             </p>
          </div>
        )}
        
        <div className="mt-10 flex items-center gap-4 pt-8 border-t border-white/[0.03]">
           <div className="flex -space-x-2">
             {[0,1,2].map(i => <div key={i} className="w-6 h-6 rounded-full border border-background bg-card flex items-center justify-center text-[8px] font-bold text-muted">AI</div>)}
           </div>
           <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em]">Institutional Analysis Feed &bull; {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
