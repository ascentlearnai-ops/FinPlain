import { Suspense } from 'react'
import MarketCard from '@/components/market/MarketCard'
import DailyAISummary from '@/components/market/DailyAISummary'
import TrendingTickers from '@/components/market/TrendingTickers'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import GainersLosers from '@/components/market/GainersLosers'
import { Activity, BarChart3, Brain, Globe } from 'lucide-react'
import { getGlobalQuote } from '@/lib/alphaVantage'

const INDICES_DEFS = [
  { ticker: 'SPY', name: 'S&P 500', plainLabel: 'Tracks the top 500 US companies' },
  { ticker: 'QQQ', name: 'Nasdaq', plainLabel: 'Tracks the top tech companies' },
  { ticker: 'DIA', name: 'Dow Jones', plainLabel: 'Tracks 30 of the biggest US companies' },
]

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

            <p className="text-lg text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
              Real-time stock data from Alpha Vantage, Yahoo Finance, Finnhub &amp; TradingView — 
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

      {/* === CTA SECTION (Clean) === */}
      <section className="bg-blue-50/50 py-24 mb-20 rounded-[40px] mx-4 md:mx-10 border border-blue-100/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/20 rounded-full blur-[100px] -ml-48 -mb-48" />
        
        <div className="container-full relative z-10">
          <div className="container-inner text-center">
            <h2 className="text-headline text-primary mb-6 max-w-2xl mx-auto">
              Intelligence that helps during the trade, not after.
            </h2>
            <p className="text-lg text-secondary max-w-xl mx-auto mb-10 leading-relaxed">
              Add tickers to your watchlist, track real-time price action, and get AI-powered market briefs — all in one place.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="/watchlist" className="btn-primary px-10 py-5 text-base shadow-xl shadow-blue-500/20">
                Start Tracking Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

import { getSerpApiMarketData, formatSerpApiIndices } from '@/lib/serpapi'
import { getYahooQuote } from '@/lib/yahooFinance'

async function MarketSummaryRow() {
  let indices: any[] = []
  
  try {
    // Try SerpApi first as requested by user
    const serpData = await getSerpApiMarketData()
    const formatted = formatSerpApiIndices(serpData)

    if (formatted) {
      indices = INDICES_DEFS.map(idx => {
        const data = (formatted as any)[idx.ticker]
        return { ...idx, ...data }
      })
    }
  } catch (err) {
    console.error("SERPAPI_ERROR_IN_HOME:", err)
  }

  // Fallback or fill in missing data with Yahoo Finance
  if (indices.length === 0 || indices.some(idx => !idx.price)) {
    try {
      const fallbackIndices = await Promise.all(
        INDICES_DEFS.map(async idx => {
          try {
            const quote = await getYahooQuote(idx.ticker)
            return { ...idx, ...quote }
          } catch {
            return idx
          }
        })
      )
      indices = fallbackIndices
    } catch (err) {
      console.error("YAHOO_FALLBACK_ERROR:", err);
    }
  }

  if (indices.length === 0 || indices.every(idx => !idx.price)) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[0,1,2].map(i => <SkeletonCard key={i} />)}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {indices.map((index: any) => <MarketCard key={index.ticker} {...index} />)}
    </div>
  )
}
