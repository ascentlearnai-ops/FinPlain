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
      body: JSON.stringify({ prompt: `Explain ${companyName} (${ticker}) to a teenager in 3 concise sentences. Cover what the company does, today's ${trend} move, and one simple market concept. No investment advice. Max 85 words.` })
    }).then(r => r.json()).then(d => { setExplanation(d.explanation); setLoading(false) }).catch(() => setLoading(false))
  }, [ticker, companyName, changePercent])

  return (
    <div className="glass-card p-6">
      <div className="flex gap-4">
        <div className="w-11 h-11 bg-white text-black rounded-lg flex items-center justify-center flex-shrink-0">
          <Brain size={20} />
        </div>
        <div>
          <div className="mb-2">
            <p className="font-semibold text-xs text-primary uppercase leading-none">Explain it simply</p>
            <p className="text-[10px] text-muted uppercase mt-1">Learning summary</p>
          </div>
          {loading ? (
            <div className="space-y-2.5">
              <div className="h-4 bg-white/[0.06] rounded w-full skeleton-shimmer" />
              <div className="h-4 bg-white/[0.06] rounded w-5/6 skeleton-shimmer" />
            </div>
          ) : (
            <p className="text-sm text-secondary leading-relaxed font-medium">
              {explanation || 'Simple analysis is unavailable for this ticker right now.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
