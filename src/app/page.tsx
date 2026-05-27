import { Suspense } from 'react'
import MarketCard from '@/components/market/MarketCard'
import DailyAISummary from '@/components/market/DailyAISummary'
import TrendingTickers from '@/components/market/TrendingTickers'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import GainersLosers from '@/components/market/GainersLosers'
import { ArrowRight, BookOpen, Globe, ShieldCheck } from 'lucide-react'
import { getMarketSummary } from '@/lib/market'

export const metadata = { title: 'macroliberium - Markets, Explained' }

export default function HomePage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <section className="pt-20 pb-12 border-b border-white/[0.08]">
        <div className="container-full">
          <div className="container-inner">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 border border-white/[0.14] rounded-lg px-3 py-2 mb-8">
                  <span className="w-2 h-2 bg-white rounded-full" />
                  <span className="text-[11px] font-bold text-secondary uppercase">Live market literacy</span>
                </div>

                <h1 className="text-display text-primary mb-7 max-w-4xl">
                  Yahoo Finance energy, built for teenagers.
                </h1>

                <p className="text-xl text-secondary max-w-2xl mb-9 leading-relaxed font-medium">
                  Track stocks, read market headlines, and learn the language of money without the noise. Minimal data, simple explanations, useful context.
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                  <a href="#dashboard" className="btn-primary flex items-center gap-2 group">
                    Open overview <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="/learn" className="btn-secondary flex items-center gap-2">
                    <BookOpen size={18} /> Start learning
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="glass-card p-6">
                  <p className="text-label mb-4">Today at a glance</p>
                  <div className="space-y-4">
                    {[
                      ['Markets', 'Prices and movers in one view'],
                      ['News', 'Headlines translated into plain English'],
                      ['Learn', 'Finance terms without Wall Street fog'],
                    ].map(([title, body]) => (
                      <div key={title} className="border-t border-white/[0.08] pt-4">
                        <p className="font-bold text-primary">{title}</p>
                        <p className="text-sm text-secondary mt-1">{body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard" className="py-14">
        <div className="container-full">
          <div className="container-inner">
            <div className="mb-16">
              <div className="flex items-end justify-between mb-8 gap-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-16">
              <div className="lg:col-span-8">
                <DailyAISummary />
              </div>
              <div className="lg:col-span-4">
                <div className="glass-card p-7 h-full flex flex-col justify-between">
                  <div>
                    <p className="text-label mb-3">Why it matters</p>
                    <h3 className="text-2xl font-bold mb-4">A calmer way to follow markets.</h3>
                    <p className="text-secondary text-sm leading-relaxed">
                      macroliberium keeps the interface sparse so the important thing stays visible: what moved, why people care, and what the words mean.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-8">
                    {['No hype', 'Plain English', 'Live context'].map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-3 py-1 bg-white/[0.04] rounded-md text-secondary uppercase border border-white/[0.08]">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <div className="flex items-center justify-between mb-8 gap-6">
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
              <p className="text-label mb-4">For students</p>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Build a watchlist, then learn what you are watching.
              </h2>
              <p className="text-lg text-secondary max-w-xl mb-8">
                Save tickers, check related headlines, and use the glossary when market language gets weird.
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
