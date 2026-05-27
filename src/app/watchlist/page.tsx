'use client'
import { useEffect, useState } from 'react'
import WatchlistRow from '@/components/watchlist/WatchlistRow'
import { getWatchlist } from '@/lib/localStorage'
import { Star, Search } from 'lucide-react'
import Link from 'next/link'

export default function WatchlistPage() {
  const [tickers, setTickers] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => { setTickers(getWatchlist()); setLoaded(true) }, [])
  if (!loaded) return null

  return (
    <>
      <div className="py-14 border-b border-white/[0.08]">
        <div className="container-full"><div className="container-inner">
          <p className="text-label mb-3">Student watchlist</p>
          <h1 className="text-headline text-primary mb-3">Track stocks like Yahoo Finance, learn them like a class</h1>
          <p className="text-body">{tickers.length > 0 ? `${tickers.length} ticker${tickers.length !== 1 ? 's' : ''} tracked with context.` : 'Add stocks and ETFs you want to understand better, then connect them to news, filings, and plain-English notes.'}</p>
        </div></div>
      </div>

      <div className="section-soft py-10">
        <div className="container-full"><div className="container-inner pb-16">
          {tickers.length === 0 ? (
            <div className="glass-card p-12 text-center max-w-md mx-auto">
              <div className="w-14 h-14 bg-white text-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star size={22} />
              </div>
              <h2 className="font-bold text-xl text-primary mb-2">Nothing saved yet</h2>
              <p className="text-sm text-muted mb-6">Search for a ticker, open the stock page, and build your personal market study list.</p>
              <Link href="/" className="btn-primary inline-flex items-center gap-2">
                <Search size={14} /> Find tickers
              </Link>
            </div>
          ) : (
            <div className="space-y-3 max-w-2xl">
              {tickers.map(t => <WatchlistRow key={t} ticker={t} onRemove={ticker => setTickers(p => p.filter(x => x !== ticker))} />)}
            </div>
          )}
        </div></div>
      </div>
    </>
  )
}
