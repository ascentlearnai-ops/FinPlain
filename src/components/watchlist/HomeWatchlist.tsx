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

    // Fetch data for the first 3 items in watchlist
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
          <p className="text-label mb-2">My Portfolio</p>
          <h2 className="text-headline text-primary">Your Watchlist</h2>
        </div>
        <Link href="/watchlist" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors group">
          View All <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          [0, 1, 2].map(i => (
            <div key={i} className="glass-card p-5 animate-pulse flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-lg" />
                <div className="h-4 bg-slate-100 rounded w-16" />
              </div>
              <div className="h-6 bg-slate-100 rounded w-24" />
            </div>
          ))
        ) : (
          watchlist.slice(0, 3).map(ticker => {
            const stock = data[ticker]
            if (!stock) return null
            const isUp = stock.quote.changePercent >= 0
            return (
              <Link key={ticker} href={`/stock/${ticker}`} className="glass-card p-5 hover:border-blue-200 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-accent-bg border border-blue-50 rounded-xl flex items-center justify-center font-mono font-bold text-xs text-blue-600">
                      {ticker.slice(0, 2)}
                    </div>
                    <span className="font-mono font-bold text-sm text-primary group-hover:text-blue-600 transition-colors">{ticker}</span>
                  </div>
                  {isUp ? <TrendingUp size={16} className="text-green-500" /> : <TrendingDown size={16} className="text-red-500" />}
                </div>
                <div className="flex items-end justify-between">
                  <p className="font-mono font-bold text-xl text-primary">{formatPrice(stock.quote.price)}</p>
                  <p className={`font-mono text-xs font-bold ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                    {isUp ? '+' : ''}{formatPercent(stock.quote.changePercent)}
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
