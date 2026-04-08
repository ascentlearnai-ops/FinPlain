import { NextRequest, NextResponse } from 'next/server'
import { getGlobalQuote, getCompanyOverview } from '@/lib/alphaVantage'
import { getRecommendationTrends } from '@/lib/finnhub'
import { getYahooChart, getYahooQuote } from '@/lib/yahooFinance'
import { getEodhdChart, getEodhdQuote } from '@/lib/eodhd'
import { getSerpApiStockData } from '@/lib/serpapi'

export async function GET(req: NextRequest) {
  const ticker = req.nextUrl.searchParams.get('ticker')?.toUpperCase()
  const range = (req.nextUrl.searchParams.get('range') || '1M') as any

  if (!ticker) return NextResponse.json({ error: 'ticker required' }, { status: 400 })

  try {
    const [eodQuote, eodChart, serpQuote, yahooQuote, overviewResult, yahooChartResult, recTrendsResult] = await Promise.allSettled([
      getEodhdQuote(ticker),
      getEodhdChart(ticker, range),
      getSerpApiStockData(ticker).catch(() => null),
      getYahooQuote(ticker).catch(() => null),
      getCompanyOverview(ticker),
      getYahooChart(ticker, range),
      getRecommendationTrends(ticker),
    ])

    const eodQ = eodQuote.status === 'fulfilled' ? eodQuote.value : null
    const eodC = eodChart.status === 'fulfilled' ? eodChart.value : null
    const serpQ = serpQuote.status === 'fulfilled' ? serpQuote.value : null
    const yahooQ = yahooQuote.status === 'fulfilled' ? yahooQuote.value : null

    // Multiple backups for everything
    const quote = eodQ || serpQ || yahooQ || await getGlobalQuote(ticker).catch(() => null)
    
    let chartData = (eodC && eodC.length > 0) ? eodC : []
    if (chartData.length === 0 && yahooChartResult.status === 'fulfilled' && yahooChartResult.value?.length > 0) {
      chartData = yahooChartResult.value
    }
    
    const overview = overviewResult.status === 'fulfilled' ? overviewResult.value : { ticker, companyName: ticker, sector: 'Equity', industry: 'Market' }
    const recTrends = recTrendsResult.status === 'fulfilled' ? recTrendsResult.value : []
    const earnings: any[] = []

    if (!quote) {
      // If we don't even have a quote, we can't show much
      return NextResponse.json({ error: 'Quote unavailable' }, { status: 404 })
    }

    return NextResponse.json({ quote, overview, chartData, recTrends, earnings })
  } catch (err: any) {
    console.error("STOCK_API_ERROR_CRITICAL:", err.message || err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
