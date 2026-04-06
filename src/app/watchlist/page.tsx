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
      <div className="hero-gradient py-16">
        <div className="container-full"><div className="container-inner">
          <p className="text-label text-accent mb-3">Portfolio</p>
          <h1 className="text-headline text-primary mb-3"><span className="gradient-text">Watchlist</span></h1>
          <p className="text-body">{tickers.length > 0 ? `${tickers.length} ticker${tickers.length !== 1 ? 's' : ''} tracked.` : 'Add tickers to track them here.'}</p>
        </div></div>
      </div>

      <div className="section-soft py-10">
        <div className="container-full"><div className="container-inner pb-16">
          {tickers.length === 0 ? (
            <div className="glass-card p-14 text-center max-w-md mx-auto">
              <div className="w-14 h-14 bg-accent-bg border border-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star size={22} className="text-accent" />
              </div>
              <h2 className="font-bold text-xl text-primary mb-2">No tracked positions</h2>
              <p className="text-sm text-muted mb-6">Search for a ticker and add it to your watchlist to begin tracking.</p>
              <Link href="/" className="btn-primary inline-flex items-center gap-2 text-sm px-5 py-2.5">
                <Search size={14} /> Find Tickers
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
