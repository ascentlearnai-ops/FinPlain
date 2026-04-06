import { NextRequest, NextResponse } from 'next/server'
import { getGlobalQuote, getCompanyOverview } from '@/lib/alphaVantage'
import { getRecommendationTrends, getEarnings } from '@/lib/finnhub'
import { getYahooChart } from '@/lib/yahooFinance'

export async function GET(req: NextRequest) {
  const ticker = req.nextUrl.searchParams.get('ticker')?.toUpperCase()
  const range = (req.nextUrl.searchParams.get('range') || '1M') as any

  if (!ticker) return NextResponse.json({ error: 'ticker required' }, { status: 400 })

  try {
    const [quoteResult, overviewResult, chartResult, recTrendsResult, earningsResult] = await Promise.allSettled([
      getGlobalQuote(ticker),
      getCompanyOverview(ticker),
      getYahooChart(ticker, range),
      getRecommendationTrends(ticker),
      getEarnings(ticker),
    ])

    const quote = quoteResult.status === 'fulfilled' ? quoteResult.value : null
    const overview = overviewResult.status === 'fulfilled' ? overviewResult.value : null
    const chartData = chartResult.status === 'fulfilled' ? chartResult.value : []
    const recTrends = recTrendsResult.status === 'fulfilled' ? recTrendsResult.value : []
    const earnings = earningsResult.status === 'fulfilled' ? earningsResult.value : []

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
