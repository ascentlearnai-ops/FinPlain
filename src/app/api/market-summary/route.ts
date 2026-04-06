import { NextResponse } from 'next/server'
import { getGlobalQuote } from '@/lib/alphaVantage'

const INDICES = [
  { ticker: 'SPY', name: 'S&P 500', plainLabel: 'Tracks the top 500 US companies' },
  { ticker: 'QQQ', name: 'Nasdaq', plainLabel: 'Tracks the top tech companies' },
  { ticker: 'DIA', name: 'Dow Jones', plainLabel: 'Tracks 30 of the biggest US companies' },
]

export async function GET() {
  try {
    const data = await Promise.all(
      INDICES.map(async idx => {
        const quote = await getGlobalQuote(idx.ticker)
        return { ...idx, ...quote }
      })
    )
    return NextResponse.json({ indices: data }, { headers: { 'Cache-Control': 's-maxage=300' } })
  } catch (err: any) {
    if (err.message === 'RATE_LIMITED') {
      return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 })
    }
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
