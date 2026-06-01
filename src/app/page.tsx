import { Suspense } from 'react'
import MarketCard from '@/components/market/MarketCard'
import DailyAISummary from '@/components/market/DailyAISummary'
import TrendingTickers from '@/components/market/TrendingTickers'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import GainersLosers from '@/components/market/GainersLosers'
import IntroVideo from '@/components/landing/IntroVideo'
import GoogleLoginButton from '@/components/auth/GoogleLoginButton'
import { ArrowRight, Bell, BookOpen, FileText, Globe, NotebookPen, ShieldCheck, Sparkles } from 'lucide-react'
import { getMarketSummary } from '@/lib/market'

export const metadata = { title: 'MacroLibrium - Markets, Explained' }

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <section className="landing-hero landing-hero-cinematic border-b border-white/[0.08]">
        <div className="landing-scene-wrap">
          <IntroVideo />
        </div>

        <div className="container-full landing-hero-content">
          <div className="container-inner">
            <div className="landing-copy">
              <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/[0.14] bg-black/40 px-3 py-2 backdrop-blur-md">
                <span className="w-2 h-2 bg-white rounded-full" />
                <span className="text-[11px] font-bold uppercase text-secondary">Yahoo Finance for teenagers, rebuilt for study</span>
              </div>

              <h1 className="landing-title text-primary">
                The market, translated before it starts speaking Wall Street.
              </h1>

              <p className="mt-6 max-w-2xl text-balance text-base font-medium leading-relaxed text-secondary sm:text-lg md:text-xl">
                MacroLibrium gives students the useful parts of Yahoo Finance, prices, news, charts, filings, and watchlists, then explains what everything means in clear language.
              </p>

              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <a href="#dashboard" className="btn-primary inline-flex items-center justify-center gap-2 group">
                  Open the market desk <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a href="/learn" className="btn-secondary inline-flex items-center justify-center gap-2">
                  <BookOpen size={18} /> Start studying
                </a>
                <GoogleLoginButton />
              </div>
            </div>

            <div className="landing-bottom-dock">
              <div className="landing-proof-strip" aria-label="Product capabilities">
                {['Yahoo Finance', 'SEC EDGAR', 'FMP', 'Finnhub', 'NewsAPI', 'Alpha Vantage'].map(source => (
                  <span key={source}>{source}</span>
                ))}
              </div>

              <div className="landing-feature-grid">
                {[
                  [Sparkles, 'Headlines made readable', 'Market news rewritten so students can understand the actual takeaway.'],
                  [FileText, 'Company research timeline', 'Earnings, filings, and important events organized by ticker.'],
                  [NotebookPen, 'Your research notebook', 'Save thoughts beside charts, articles, and companies you follow.'],
                  [Bell, 'Catalyst alerts', 'Watch keywords, guidance changes, and events that move prices.'],
                ].map(([Icon, title, body]) => {
                  const FeatureIcon = Icon as typeof Sparkles
                  return (
                    <div key={title as string} className="landing-feature">
                      <FeatureIcon size={17} />
                      <div>
                        <p>{title as string}</p>
                        <span>{body as string}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard" className="py-12 sm:py-14">
        <div className="container-full">
          <div className="container-inner">
            <div className="mb-12 sm:mb-16">
              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-label mb-2">Market pulse</p>
                  <h2 className="text-headline">Major indices</h2>
                </div>
                <div className="hidden md:flex items-center gap-4 text-xs text-muted font-bold uppercase">
                  <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> Verified feeds</span>
                  <span className="flex items-center gap-1.5"><Globe size={14} /> Multi-source</span>
                </div>
              </div>

              <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-3 gap-5">{[0,1,2].map(i => <SkeletonCard key={i} />)}</div>}>
                <MarketSummaryRow />
              </Suspense>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 mb-12 sm:mb-16">
              <div className="lg:col-span-8">
                <DailyAISummary />
              </div>
              <div className="lg:col-span-4">
                <div className="glass-card p-7 h-full flex flex-col justify-between">
                  <div>
                    <p className="text-label mb-3">Why it matters</p>
                    <h3 className="text-2xl font-bold mb-4">The useful parts of finance media, without the noise.</h3>
                    <p className="text-secondary text-sm leading-relaxed">
                      Think Yahoo Finance for teenagers: real market data, real sources, and explanations that help you study without feeling behind.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-8">
                    {['Real data', 'Plain English', 'Built to study'].map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-3 py-1 bg-white/[0.04] rounded-md text-secondary uppercase border border-white/[0.08]">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12 sm:mb-16">
              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-label mb-2">Market movers</p>
                  <h2 className="text-headline">What is moving today</h2>
                </div>
                <a href="/news" className="text-primary text-sm font-bold hover:text-secondary flex items-center gap-2">
                  Read news <ArrowRight size={16} />
                </a>
              </div>
              <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 gap-5"><SkeletonCard className="h-64" /><SkeletonCard className="h-64" /></div>}>
                <GainersLosers />
              </Suspense>
            </div>

            <div className="pt-10 border-t border-white/[0.08]">
              <p className="text-label mb-6 text-center">Common searches</p>
              <TrendingTickers />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/[0.08]">
        <div className="container-full">
          <div className="container-inner">
            <div className="max-w-3xl">
              <p className="text-label mb-4">Yahoo Finance for teenagers</p>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Build a watchlist, then study what every move actually means.
              </h2>
              <p className="text-lg text-secondary max-w-xl mb-8">
                Save tickers, read related headlines, check filings, and use the glossary when market language gets weird.
              </p>
              <a href="/watchlist" className="btn-primary inline-flex">
                Launch watchlist
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

async function MarketSummaryRow() {
  const indices = await getMarketSummary()
  if (indices.length === 0) return <div className="grid grid-cols-1 md:grid-cols-3 gap-5">{[0,1,2].map(i => <SkeletonCard key={i} />)}</div>
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {indices.map((index: any) => <MarketCard key={index.ticker} {...index} />)}
    </div>
  )
}
