'use client'
import { useEffect, useState } from 'react'
import StockCard from './StockCard'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface Stock { ticker: string; price: number; changePercent: number }
interface Movers { gainers: Stock[]; losers: Stock[] }

export default function GainersLosers() {
  const [movers, setMovers] = useState<Movers | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/gainers-losers')
      .then(res => res.json())
      .then(data => { if (!data.error) setMovers(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading || !movers) return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[0,1].map(i => <div key={i} className="glass-card h-64 animate-pulse" />)}
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
          <TrendingUp size={15} className="text-up" />
          <p className="font-semibold text-xs tracking-widest uppercase text-up">Top Gainers</p>
        </div>
        <div className="p-2">
          {movers.gainers.slice(0, 5).map(s => <StockCard key={s.ticker} {...s} />)}
        </div>
      </div>
      <div className="glass-card overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
          <TrendingDown size={15} className="text-down" />
          <p className="font-semibold text-xs tracking-widest uppercase text-down">Top Losers</p>
        </div>
        <div className="p-2">
          {movers.losers.slice(0, 5).map(s => <StockCard key={s.ticker} {...s} />)}
        </div>
      </div>
    </div>
  )
}
