'use client'
import { useEffect, useState } from 'react'
import WatchlistRow from '@/components/watchlist/WatchlistRow'
import { getWatchlist } from '@/lib/localStorage'
import { Star, Search, Bell, BookOpen, LineChart, NotebookPen } from 'lucide-react'
import Link from 'next/link'

export default function WatchlistPage() {
  const [tickers, setTickers] = useState<string[]>([])

  useEffect(() => { setTickers(getWatchlist()) }, [])

  return (
    <>
      <section className="pro-page-hero">
        <div className="container-full"><div className="container-inner">
          <div className="pro-hero-grid">
            <div className="max-w-3xl">
              <p className="text-label mb-3">Student watchlist</p>
              <h1 className="text-display text-primary mb-5">Track stocks like Yahoo Finance, study them like a class.</h1>
              <p className="text-body text-lg max-w-2xl">{tickers.length > 0 ? `${tickers.length} ticker${tickers.length !== 1 ? 's' : ''} tracked with context.` : 'Add stocks and ETFs you want to understand better, then connect them to news, filings, notes, and plain-English explanations.'}</p>
            </div>
            <div className="watchlist-command-panel">
              {[
                [LineChart, 'Prices', 'Follow the moves'],
                [BookOpen, 'Study', 'Decode the terms'],
                [NotebookPen, 'Notes', 'Build your thesis'],
                [Bell, 'Alerts', 'Watch catalysts'],
              ].map(([Icon, title, body]) => {
                const CommandIcon = Icon as typeof LineChart
                return (
                  <div key={title as string} className="watchlist-command-row">
                    <CommandIcon size={16} />
                    <div><strong>{title as string}</strong><span>{body as string}</span></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div></div>
      </section>

      <div className="section-soft py-10">
        <div className="container-full"><div className="container-inner pb-16">
          <div className="pro-section-header">
            <div>
              <p className="text-label mb-2">Saved companies</p>
              <h2 className="text-headline">Your research queue</h2>
            </div>
            <div className="pro-status-pill">{tickers.length} saved</div>
          </div>
          {tickers.length === 0 ? (
            <div className="empty-state-pro">
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
