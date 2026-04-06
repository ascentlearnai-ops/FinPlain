import { Suspense } from 'react'
import MarketCard from '@/components/market/MarketCard'
import DailyAISummary from '@/components/market/DailyAISummary'
import TrendingTickers from '@/components/market/TrendingTickers'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import GainersLosers from '@/components/market/GainersLosers'
import { Activity, BarChart3, Brain, Globe } from 'lucide-react'

export const metadata = { title: 'Finplain — Market Intelligence, Simplified' }

export default function HomePage() {
  return (
    <>
      {/* === HERO === */}
      <section className="hero-gradient pt-20 pb-28">
        <div className="container-full">
          <div className="container-inner text-center">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-blue-100 rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-secondary">Markets are open &bull; Live data</span>
            </div>

            <h1 className="text-display text-primary mb-6">
              Market intelligence,<br />
              <span className="gradient-text">simplified.</span>
            </h1>

            <p className="text-lg text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              Real-time stock data from Alpha Vantage, Yahoo Finance, Finnhub & TradingView — 
              paired with AI-powered analysis to decode every market move.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="#dashboard" className="btn-primary text-sm flex items-center gap-2">
                <BarChart3 size={16} /> Explore Markets
              </a>
              <a href="/learn" className="btn-secondary text-sm flex items-center gap-2">
                <Brain size={16} /> Financial Glossary
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === FEATURE PILLS === */}
      <section className="section-light -mt-14 relative z-10">
        <div className="container-full">
          <div className="container-inner">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Activity, label: 'Real-Time Quotes', desc: 'Live market data feeds' },
                { icon: BarChart3, label: 'Pro Charts', desc: 'TradingView candlestick' },
                { icon: Brain, label: 'AI Analysis', desc: 'Powered by Gemini' },
                { icon: Globe, label: 'Multi-Source', desc: '4 data providers' },
              ].map((f, i) => (
                <div key={i} className="glass-card p-5 text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-accent-bg flex items-center justify-center">
                    <f.icon size={18} className="text-accent" />
                  </div>
                  <p className="font-semibold text-sm text-primary mb-1">{f.label}</p>
                  <p className="text-xs text-muted">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === DASHBOARD === */}
      <section id="dashboard" className="section-light py-20">
        <div className="container-full">
          <div className="container-inner">
            {/* Market Overview */}
            <div className="mb-12">
              <p className="text-label mb-2">Market Overview</p>
              <h2 className="text-headline text-primary mb-8">Today&rsquo;s indices at a glance</h2>
              <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[0,1,2].map(i => <SkeletonCard key={i} />)}</div>}>
                <MarketSummaryRow />
              </Suspense>
            </div>

            {/* AI Summary */}
            <div className="mb-12">
              <DailyAISummary />
            </div>

            {/* Movers */}
            <div className="mb-12">
              <p className="text-label mb-2">Top Movers</p>
              <h2 className="text-headline text-primary mb-8">Biggest gainers &amp; losers</h2>
              <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 gap-6"><SkeletonCard className="h-64" /><SkeletonCard className="h-64" /></div>}>
                <GainersLosers />
              </Suspense>
            </div>

            {/* Trending */}
            <div>
              <p className="text-label mb-2">Popular Tickers</p>
              <h2 className="text-headline text-primary mb-8">Explore top stocks</h2>
              <TrendingTickers />
            </div>
          </div>
        </div>
      </section>

      {/* === CTA SECTION (dark) === */}
      <section className="section-dark py-24">
        <div className="container-full">
          <div className="container-inner text-center">
            <h2 className="text-headline text-white mb-4">
              Intelligence that helps during the trade, not after.
            </h2>
            <p className="text-base text-blue-200 max-w-lg mx-auto mb-8">
              Add tickers to your watchlist, track real-time price action, and get AI-powered market briefs — all in one place.
            </p>
            <a href="/watchlist" className="btn-primary text-sm inline-flex items-center gap-2">
              Start Tracking
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

async function MarketSummaryRow() {
  let indices = []
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/market-summary`, { next: { revalidate: 300 } })
    const data = await res.json()
    indices = data.indices || []
  } catch {}

  if (indices.length === 0) return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[0,1,2].map(i => <SkeletonCard key={i} />)}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {indices.map((index: any) => <MarketCard key={index.ticker} {...index} />)}
    </div>
  )
}
