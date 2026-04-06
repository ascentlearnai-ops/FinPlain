'use client'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const TRENDING = [
  { ticker: 'AAPL', label: 'Apple' }, { ticker: 'TSLA', label: 'Tesla' },
  { ticker: 'NVDA', label: 'Nvidia' }, { ticker: 'AMZN', label: 'Amazon' },
  { ticker: 'MSFT', label: 'Microsoft' }, { ticker: 'META', label: 'Meta' },
  { ticker: 'GOOGL', label: 'Alphabet' }, { ticker: 'AMD', label: 'AMD' },
  { ticker: 'SPY', label: 'S&amp;P 500 ETF' }, { ticker: 'QQQ', label: 'Nasdaq ETF' },
]

export default function TrendingTickers() {
  return (
    <div className="flex flex-wrap gap-3">
      {TRENDING.map(stock => (
        <Link key={stock.ticker} href={`/stock/${stock.ticker}`}
          className="group flex items-center gap-2.5 glass-card px-5 py-3">
          <span className="font-mono font-bold text-sm text-primary group-hover:text-accent transition-colors">{stock.ticker}</span>
          <span className="text-xs text-muted">{stock.label}</span>
          <ArrowUpRight size={12} className="text-muted group-hover:text-accent transition-colors" />
        </Link>
      ))}
    </div>
  )
}
