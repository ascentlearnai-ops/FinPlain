import { Suspense } from 'react'
import StockHeader from '@/components/stock/StockHeader'
import StockChart from '@/components/stock/StockChart'
import StockStats from '@/components/stock/StockStats'
import AIExplainer from '@/components/stock/AIExplainer'
import RelatedNews from '@/components/stock/RelatedNews'
import AnalystConsensus from '@/components/stock/AnalystConsensus'
import WatchlistButton from '@/components/watchlist/WatchlistButton'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getEodhdQuote, getEodhdChart } from '@/lib/eodhd'
import { getSerpApiStockData } from '@/lib/serpapi'
import { getYahooQuote, getYahooChart, getYahooOverview } from '@/lib/yahooFinance'
import { getCompanyOverview, getGlobalQuote } from '@/lib/alphaVantage'
import { getRecommendationTrends } from '@/lib/finnhub'

interface Props { params: { ticker: string } }

export async function generateMetadata({ params }: Props) {
  return { title: `${params.ticker.toUpperCase()} | Finplain` }
}

export default async function StockPage({ params }: Props) {
  const ticker = params.ticker.toUpperCase()

  // Fetch all data sources in parallel — direct lib calls, no HTTP roundtrip
  const [eodQuote, eodChart, serpQuote, yahooQuote, avOverview, yahooOverview, yahooChartResult, recTrendsResult] = await Promise.allSettled([
    getEodhdQuote(ticker),
    getEodhdChart(ticker, '1M'),
    getSerpApiStockData(ticker).catch(() => null),
    getYahooQuote(ticker).catch(() => null),
    getCompanyOverview(ticker).catch(() => null),
    getYahooOverview(ticker).catch(() => null),
    getYahooChart(ticker, '1M'),
    getRecommendationTrends(ticker),
    // getEarnings(ticker), — removed as unused
  ])

  const eodQ = eodQuote.status === 'fulfilled' ? eodQuote.value : null
  const serpQ = serpQuote.status === 'fulfilled' ? serpQuote.value : null
  const yahooQ = yahooQuote.status === 'fulfilled' ? yahooQuote.value : null
  const avQ = await getGlobalQuote(ticker).catch(() => null)

  // Multi-source quote fallback
  const quote = eodQ || serpQ || yahooQ || avQ
  if (!quote) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-10 text-center max-w-md">
          <p className="text-3xl font-bold mb-3 text-primary">Stock Not Found</p>
          <p className="text-secondary mb-6">We couldn&apos;t load data for <span className="font-mono text-accent">{ticker}</span>. The symbol may be invalid or all data providers are temporarily unavailable.</p>
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // Multi-source chart fallback
  const eodC = eodChart.status === 'fulfilled' ? eodChart.value : null
  const yahooC = yahooChartResult.status === 'fulfilled' ? yahooChartResult.value : null
  const chartData = (eodC && eodC.length > 0) ? eodC : (yahooC && yahooC.length > 0) ? yahooC : []

  // Multi-source overview fallback
  const avOv = avOverview.status === 'fulfilled' ? avOverview.value : null
  const yahooOv = yahooOverview.status === 'fulfilled' ? yahooOverview.value : null
  const overview: any = avOv || yahooOv || { ticker, companyName: ticker, description: '', sector: 'Equity', industry: 'Market', marketCap: 0, peRatio: null, eps: null, week52High: 0, week52Low: 0, avgVolume: 0, dividendYield: null }

  const recTrends = recTrendsResult.status === 'fulfilled' ? recTrendsResult.value : []

  return (
    <div className="relative overflow-hidden min-h-screen">
      <div className="hero-glow !opacity-10" />
      <div className="side-glow-blue !opacity-5" />
      <div className="side-glow-pink !opacity-5" />
      
      {/* Stock Header */}
      <div className="border-b border-white/[0.04] py-12 relative z-10">
        <div className="container-full">
          <div className="container-inner">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-accent mb-5 transition-colors">
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <StockHeader quote={quote as any} overview={overview as any} />
              <WatchlistButton ticker={ticker} />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="section-soft py-8">
        <div className="container-full">
          <div className="container-inner space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                <AIExplainer ticker={ticker} companyName={overview.companyName} changePercent={quote.changePercent} />
                <StockChart ticker={ticker} initialData={chartData} initialRange="1M" />
              </div>
              <div className="lg:col-span-4 space-y-6">
                 <AnalystConsensus trends={recTrends} />
              </div>
            </div>
            <StockStats overview={overview as any} />
            <div>
              <p className="text-label mb-4">Related News</p>
              <Suspense fallback={<SkeletonCard />}>
                <RelatedNews ticker={ticker} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
