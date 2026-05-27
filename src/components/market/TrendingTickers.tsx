'use client'
import Link from 'next/link'
import { ArrowUpRight, Search } from 'lucide-react'

const TRENDING = [
  { ticker: 'AAPL', label: 'Apple' }, { ticker: 'TSLA', label: 'Tesla' },
  { ticker: 'NVDA', label: 'Nvidia' }, { ticker: 'AMZN', label: 'Amazon' },
  { ticker: 'MSFT', label: 'Microsoft' }, { ticker: 'META', label: 'Meta' },
  { ticker: 'GOOGL', label: 'Alphabet' }, { ticker: 'AMD', label: 'AMD' },
  { ticker: 'SPY', label: 'S&P 500 ETF' }, { ticker: 'QQQ', label: 'Nasdaq ETF' },
]

export default function TrendingTickers() {
  return (
    <div className="flex flex-wrap justify-center gap-3 px-2">
      {TRENDING.map(stock => (
        <Link key={stock.ticker} href={`/stock/${stock.ticker}`}
          className="group flex items-center gap-3 glass-card px-4 py-3 transition-colors active:scale-95">
          <div className="w-8 h-8 rounded-md bg-white text-black flex items-center justify-center">
            <Search size={14} />
          </div>
          <div className="text-left">
            <p className="font-mono font-black text-sm text-primary">{stock.ticker}</p>
            <p className="text-[10px] text-muted font-bold uppercase leading-none mt-1">{stock.label.slice(0, 12)}</p>
          </div>
          <ArrowUpRight size={14} className="text-muted group-hover:text-primary transition-colors" />
        </Link>
      ))}
    </div>
  )
}
