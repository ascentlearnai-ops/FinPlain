'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'
import { getWatchlist } from '@/lib/localStorage'
import { formatPrice, formatPercent } from '@/lib/formatters'

export default function HomeWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([])
  const [data, setData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const list = getWatchlist()
    setWatchlist(list)
    if (list.length === 0) {
      setLoading(false)
      return
    }

    Promise.all(
      list.slice(0, 3).map(ticker =>
        fetch(`/api/stock?ticker=${ticker}&range=1D`)
          .then(r => r.json())
          .then(d => ({ ticker, d }))
      )
    ).then(results => {
      const newData: Record<string, any> = {}
      results.forEach(r => {
        if (!r.d.error) newData[r.ticker] = r.d
      })
      setData(newData)
      setLoading(false)
    })
  }, [])

  if (watchlist.length === 0) return null

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-label mb-2">Saved tickers</p>
          <h2 className="text-headline text-primary">Your watchlist</h2>
        </div>
        <Link href="/watchlist" className="text-sm font-bold text-primary hover:text-secondary flex items-center gap-1.5 transition-colors group">
          View all <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {loading ? (
          [0, 1, 2].map(i => (
            <div key={i} className="glass-card p-5 animate-pulse flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/[0.08] rounded-md" />
                <div className="h-4 bg-white/[0.08] rounded w-16" />
              </div>
              <div className="h-6 bg-white/[0.08] rounded w-24" />
            </div>
          ))
        ) : (
          watchlist.slice(0, 3).map(ticker => {
            const stock = data[ticker]
            if (!stock) return null
            const isUp = stock.quote.changePercent >= 0
            return (
              <Link key={ticker} href={`/stock/${ticker}`} className="glass-card p-5 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white text-black rounded-md flex items-center justify-center font-mono font-bold text-xs">
                      {ticker.slice(0, 2)}
                    </div>
                    <span className="font-mono font-bold text-sm text-primary">{ticker}</span>
                  </div>
                  {isUp ? <TrendingUp size={16} className="text-primary" /> : <TrendingDown size={16} className="text-muted" />}
                </div>
                <div className="flex items-end justify-between">
                  <p className="font-mono font-bold text-xl text-primary">{formatPrice(stock.quote.price)}</p>
                  <p className={`font-mono text-xs font-bold ${isUp ? 'text-primary' : 'text-muted'}`}>
                    {formatPercent(stock.quote.changePercent)}
                  </p>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
