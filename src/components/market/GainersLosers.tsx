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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[0, 1].map(i => <div key={i} className="glass-card h-80 skeleton-shimmer" />)}
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Gainers */}
      <div className="glass-card overflow-hidden group/movers relative z-10 border-white/[0.03]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-up/[0.03] rounded-full blur-2xl group-hover/movers:bg-up/[0.06] transition-all" />
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.04] bg-white/[0.01]">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-up/10 flex items-center justify-center border border-up/20">
               <TrendingUp size={16} className="text-up" />
             </div>
             <p className="font-['Outfit'] font-black text-sm tracking-widest uppercase text-up">Top Gainers</p>
          </div>
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">5 Stocks</span>
        </div>
        <div className="p-3 bg-background/20 backdrop-blur-sm">
          {movers.gainers.slice(0, 5).map((s, i) => (
            <div key={s.ticker} className={i !== 4 ? 'mb-1' : ''}>
               <StockCard {...s} />
            </div>
          ))}
        </div>
      </div>

      {/* Losers */}
      <div className="glass-card overflow-hidden group/movers-alt relative z-10 border-white/[0.03]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-down/[0.03] rounded-full blur-2xl group-hover/movers-alt:bg-down/[0.06] transition-all" />
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.04] bg-white/[0.01]">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-down/10 flex items-center justify-center border border-down/20">
               <TrendingDown size={16} className="text-down" />
             </div>
             <p className="font-['Outfit'] font-black text-sm tracking-widest uppercase text-down">Top Losers</p>
          </div>
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">5 Stocks</span>
        </div>
        <div className="p-3 bg-background/20 backdrop-blur-sm">
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
