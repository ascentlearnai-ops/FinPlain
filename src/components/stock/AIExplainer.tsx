'use client'
import { useState, useEffect } from 'react'
import { Brain } from 'lucide-react'

interface Props { ticker: string; companyName: string; changePercent: number }

export default function AIExplainer({ ticker, companyName, changePercent }: Props) {
  const [explanation, setExplanation] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const trend = (changePercent || 0) >= 0 ? `up ${Math.abs(changePercent || 0).toFixed(2)}%` : `down ${Math.abs(changePercent || 0).toFixed(2)}%`
    fetch('/api/ai-explain', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `3-sentence institutional analysis of ${companyName} (${ticker}). Business model. Today's ${trend} price action with catalyst context. Competitive positioning. Max 80 words.` })
    }).then(r => r.json()).then(d => { setExplanation(d.explanation); setLoading(false) }).catch(() => setLoading(false))
  }, [ticker, companyName, changePercent])

  return (
    <div className="glass-card p-6 relative overflow-hidden z-10" style={{ background: 'linear-gradient(135deg, #1b2028, #111418)' }}>
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent/[0.04] rounded-full blur-3xl" />
      <div className="relative z-10 flex gap-4">
        <div className="w-12 h-12 bg-accent/15 border border-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Brain size={20} className="text-accent" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="font-semibold text-xs text-accent uppercase tracking-widest leading-none">Market Intelligence</p>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <p className="text-[10px] text-muted uppercase tracking-wider">Gemini 2.0</p>
          </div>
          {loading ? (
            <div className="space-y-2.5">
              <div className="h-4 bg-white/[0.04] rounded w-full skeleton-shimmer" />
              <div className="h-4 bg-white/[0.04] rounded w-5/6 skeleton-shimmer" />
            </div>
          ) : (
            <p className="text-sm text-secondary leading-relaxed font-medium">
              {explanation || 'Strategic analysis currently unavailable for this ticker.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
