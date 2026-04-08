import { Suspense } from 'react'
import StockHeader from '@/components/stock/StockHeader'
import StockChart from '@/components/stock/StockChart'
import StockStats from '@/components/stock/StockStats'
import AIExplainer from '@/components/stock/AIExplainer'
import RelatedNews from '@/components/stock/RelatedNews'
import AnalystConsensus from '@/components/stock/AnalystConsensus'
import WatchlistButton from '@/components/watchlist/WatchlistButton'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { getGlobalQuote, getCompanyOverview, getTimeSeries } from '@/lib/alphaVantage'
import { getRecommendationTrends } from '@/lib/finnhub'

interface Props { params: Promise<{ ticker: string }> | { ticker: string } }

export async function generateMetadata({ params }: Props) {
  const p = await params
  return { title: `${p.ticker.toUpperCase()} | Finplain` }
}

import { getSerpApiStockData } from '@/lib/serpapi'
import { getYahooQuote, getYahooOverview, getYahooChart } from '@/lib/yahooFinance'
import { getEodhdQuote, getEodhdChart } from '@/lib/eodhd'

export default async function StockPage({ params }: Props) {
  const p = await params
  const ticker = p.ticker.toUpperCase()
  
  let stockData: any = null
  try {
    const [eodQuote, eodChart, serpQuote, yahooQuote, yahooOverview, yahooChart] = await Promise.all([
      getEodhdQuote(ticker),
      getEodhdChart(ticker, '1M'),
      getSerpApiStockData(ticker).catch(() => null),
      getYahooQuote(ticker).catch(() => null),
      getYahooOverview(ticker).catch(() => null),
      getYahooChart(ticker, '1M').catch(() => []),
    ])

    // Final resolution
    const finalQuote = eodQuote || serpQuote || yahooQuote || await getGlobalQuote(ticker).catch(() => null)
    const finalOverview = yahooOverview || await getCompanyOverview(ticker).catch(() => null)
    const finalChart = (eodChart && eodChart.length > 0) ? eodChart : (yahooChart && yahooChart.length > 0) ? yahooChart : await getTimeSeries(ticker, '1M').catch(() => [])
    
    const recTrends = await getRecommendationTrends(ticker).catch(() => [])

    if (finalQuote && finalQuote.price) {
      stockData = { 
        quote: finalQuote, 
        overview: finalOverview || { ticker, companyName: ticker, sector: 'Equity', industry: 'Market' }, 
        chartData: finalChart, 
        recTrends 
      }
    }
  } catch (err: any) {
    console.error("STOCK_PAGE_LOAD_ERROR:", err.message);
  }

  if (!stockData?.quote || !stockData?.quote.price) return notFound()
  const { quote, overview, chartData, recTrends } = stockData

  return (
    <>
      {/* Navbar spacer already handled by layout — just a subtle hero */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="container-full">
          <div className="container-inner">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent mb-5 transition-colors">
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <StockHeader quote={quote} overview={overview} />
              <WatchlistButton ticker={ticker} />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="section-soft py-10">
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
            <StockStats overview={overview} />
            <div>
              <p className="text-label mb-4">Related News</p>
              <Suspense fallback={<SkeletonCard />}>
                <RelatedNews ticker={ticker} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
