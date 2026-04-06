'use client'
import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

interface Props { ticker: string; companyName: string; changePercent: number }

export default function AIExplainer({ ticker, companyName, changePercent }: Props) {
  const [explanation, setExplanation] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const trend = changePercent >= 0 ? `up ${changePercent.toFixed(2)}%` : `down ${Math.abs(changePercent).toFixed(2)}%`
    fetch('/api/ai-explain', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `3-sentence institutional analysis of ${companyName} (${ticker}). Business model. Today's ${trend} price action with catalyst context. Competitive positioning. Max 80 words.` })
    }).then(r => r.json()).then(d => { setExplanation(d.explanation); setLoading(false) }).catch(() => setLoading(false))
  }, [ticker, companyName, changePercent])

  return (
    <div className="dark-card p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/[0.08] rounded-full blur-3xl" />
      <div className="relative z-10 flex gap-4">
        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Sparkles size={18} className="text-blue-400" />
        </div>
        <div>
          <p className="font-semibold text-xs text-blue-400 mb-2 uppercase tracking-widest">AI Analysis</p>
          {loading ? (
            <div className="space-y-2.5 animate-pulse">
              <div className="h-4 bg-white/[0.06] rounded w-full" />
              <div className="h-4 bg-white/[0.06] rounded w-5/6" />
            </div>
          ) : <p className="text-sm text-blue-50 leading-relaxed font-sans">{explanation}</p>}
        </div>
      </div>
    </div>
  )
}
