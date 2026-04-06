import { NextRequest, NextResponse } from 'next/server'
import { getGlobalQuote, getCompanyOverview, getTimeSeries } from '@/lib/alphaVantage'
import { getRecommendationTrends, getEarnings } from '@/lib/finnhub'

export async function GET(req: NextRequest) {
  const ticker = req.nextUrl.searchParams.get('ticker')?.toUpperCase()
  const range = req.nextUrl.searchParams.get('range') || '1M'

  if (!ticker) return NextResponse.json({ error: 'ticker required' }, { status: 400 })

  try {
    const [quote, overview, chartData, recTrends, earnings] = await Promise.all([
      getGlobalQuote(ticker),
      getCompanyOverview(ticker),
      getTimeSeries(ticker, range),
      getRecommendationTrends(ticker),
      getEarnings(ticker),
    ])
    return NextResponse.json({ quote, overview, chartData, recTrends, earnings })
  } catch (err: any) {
    if (err.message === 'RATE_LIMITED') return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 })
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
