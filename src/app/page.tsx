import { Suspense } from 'react'
import MarketCard from '@/components/market/MarketCard'
import DailyAISummary from '@/components/market/DailyAISummary'
import TrendingTickers from '@/components/market/TrendingTickers'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import GainersLosers from '@/components/market/GainersLosers'
import { BarChart3, Brain, Zap, ArrowRight, ShieldCheck, Globe } from 'lucide-react'
import { getMarketSummary } from '@/lib/market'

export const metadata = { title: 'Finplain — Trading Intelligence' }

export default function HomePage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Orbs */}
      <div className="hero-glow" />
      <div className="side-glow-blue" />
      <div className="side-glow-pink" />

      {/* === HERO === */}
      <section className="pt-24 pb-32 relative z-10">
        <div className="container-full">
          <div className="container-inner text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-md border border-accent/20 rounded-full px-5 py-2 mb-10 animate-float">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse-dot shadow-[0_0_10px_#d946ef]" />
              <span className="text-[11px] font-bold text-accent uppercase tracking-widest">System Active &bull; Real Time</span>
            </div>

            <h1 className="text-display text-primary mb-8 px-4">
              The next gen of<br />
              <span className="gradient-text">trading intelligence.</span>
            </h1>

            <p className="text-xl text-secondary max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Advanced market analytics simplified for everyone. Powered by 
              multi-source feeds and neural AI briefers.
            </p>

            <div className="flex items-center justify-center gap-6 flex-wrap">
              <a href="#dashboard" className="btn-primary flex items-center gap-2 group">
                Open Terminal <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="/news" className="btn-secondary flex items-center gap-2">
                <Brain size={18} className="text-accent" /> News Feed
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === DASHBOARD === */}
      <section id="dashboard" className="pb-32 relative z-10">
        <div className="container-full">
          <div className="container-inner">
            
            {/* Market Summary Row */}
            <div className="mb-20">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-label mb-2">Market Pulse</p>
                  <h2 className="text-headline">Global Indices</h2>
                </div>
                <div className="hidden md:flex items-center gap-4 text-xs text-muted font-bold tracking-widest uppercase">
                  <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-up" /> Verified</span>
                  <span className="flex items-center gap-1.5"><Globe size={14} className="text-blue-400" /> Multi-Source</span>
                </div>
              </div>
              
              <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-3 gap-8">{[0,1,2].map(i => <SkeletonCard key={i} />)}</div>}>
                <MarketSummaryRow />
              </Suspense>
            </div>

            {/* Middle Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
              <div className="lg:col-span-8">
                <DailyAISummary />
              </div>
              <div className="lg:col-span-4">
                <div className="glass-card p-8 h-full flex flex-col justify-center border-accent/10">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 border border-accent/20">
                    <Zap size={24} className="text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Neural Data</h3>
                  <p className="text-secondary text-sm leading-relaxed mb-6">
                    Our AI models process thousands of data points every minute to give you the signal, not the noise.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['60 TPS', 'Neural Nets', 'LTSM Base'].map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-3 py-1 bg-white/5 rounded-full text-muted uppercase tracking-widest border border-white/10">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Movers */}
            <div className="mb-20">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-label mb-2">High Volatility</p>
                  <h2 className="text-headline">Market Movers</h2>
                </div>
                <a href="/news" className="text-accent text-sm font-bold hover:underline flex items-center gap-2">
                  View Heatmap <ArrowRight size={16} />
                </a>
              </div>
              <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 gap-8"><SkeletonCard className="h-64" /><SkeletonCard className="h-64" /></div>}>
                <GainersLosers />
              </Suspense>
            </div>

            {/* Trending */}
            <div className="pt-10 border-t border-white/5">
              <p className="text-label mb-6 text-center">Trending Assets</p>
              <TrendingTickers />
            </div>
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="py-32 relative z-10">
        <div className="container-full">
          <div className="container-inner text-center">
            <div className="glass-card py-20 px-10 border-accent/20 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight relative z-10">
                Ready to trade smarter?
              </h2>
              <p className="text-lg text-secondary max-w-lg mx-auto mb-10 relative z-10">
                Join thousands of traders using Finplain for institutional-grade market data and AI analysis.
              </p>
              <a href="/watchlist" className="btn-primary inline-flex relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                Launch My Watchlist
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
  if (indices.length === 0) return <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{[0,1,2].map(i => <SkeletonCard key={i} />)}</div>
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {indices.map((index: any) => <MarketCard key={index.ticker} {...index} />)}
    </div>
  )
}
