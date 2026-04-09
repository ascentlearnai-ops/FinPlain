'use client'
import Link from 'next/link'
import { ArrowUpRight, Flame } from 'lucide-react'

const TRENDING = [
  { ticker: 'AAPL', label: 'Apple' }, { ticker: 'TSLA', label: 'Tesla' },
  { ticker: 'NVDA', label: 'Nvidia' }, { ticker: 'AMZN', label: 'Amazon' },
  { ticker: 'MSFT', label: 'Microsoft' }, { ticker: 'META', label: 'Meta' },
  { ticker: 'GOOGL', label: 'Alphabet' }, { ticker: 'AMD', label: 'AMD' },
  { ticker: 'SPY', label: 'S&P 500 ETF' }, { ticker: 'QQQ', label: 'Nasdaq ETF' },
]

export default function TrendingTickers() {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-2">
      {TRENDING.map(stock => (
        <Link key={stock.ticker} href={`/stock/${stock.ticker}`}
          className="group flex items-center gap-3 glass-card px-5 py-3.5 border-white/[0.04] hover:border-accent/30 transition-all active:scale-95">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent/20 transition-all">
             <Flame size={14} className="text-accent" />
          </div>
          <div className="text-left">
            <p className="font-mono font-black text-sm text-primary tracking-tighter group-hover:text-accent transition-colors">{stock.ticker}</p>
            <p className="text-[10px] text-muted font-bold uppercase tracking-widest leading-none mt-1">{stock.label.slice(0, 10)}</p>
          </div>
          <ArrowUpRight size={14} className="text-muted group-hover:text-accent transition-all opacity-20 group-hover:opacity-100 group-hover:-translate-y-0.5" />
        </Link>
      ))}
    </div>
  )
}
