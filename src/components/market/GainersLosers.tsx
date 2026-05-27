'use client'
import { useEffect, useState } from 'react'
import StockCard from './StockCard'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface Stock { ticker: string; price: number; changePercent: number }
interface Movers { gainers: Stock[]; losers: Stock[] }

export default function GainersLosers() {
  const [movers, setMovers] = useState<Movers | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchMovers = () => {
    setLoading(true)
    fetch('/api/gainers-losers')
      .then(res => res.json())
      .then(data => { if (!data.error) setMovers(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchMovers() }, [])

  if (loading || !movers) return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {[0, 1].map(i => <div key={i} className="glass-card h-80 skeleton-shimmer" />)}
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-white text-black flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
            <p className="font-['Outfit'] font-black text-sm uppercase text-primary">Top gainers</p>
          </div>
          <span className="text-[10px] font-bold text-muted uppercase">5 stocks</span>
        </div>
        <div className="p-2">
          {movers.gainers.slice(0, 5).map((s, i) => (
            <div key={s.ticker} className={i !== 4 ? 'mb-1' : ''}>
              <StockCard {...s} />
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-white/[0.08] text-white flex items-center justify-center border border-white/[0.12]">
              <TrendingDown size={16} />
            </div>
            <p className="font-['Outfit'] font-black text-sm uppercase text-primary">Top losers</p>
          </div>
          <span className="text-[10px] font-bold text-muted uppercase">5 stocks</span>
        </div>
        <div className="p-2">
          {movers.losers.slice(0, 5).map((s, i) => (
            <div key={s.ticker} className={i !== 4 ? 'mb-1' : ''}>
              <StockCard {...s} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
