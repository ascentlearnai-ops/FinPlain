import { NextResponse } from 'next/server'
import { getGlobalQuote } from '@/lib/alphaVantage'
import { getSerpApiMarketData, formatSerpApiIndices } from '@/lib/serpapi'

const INDICES = [
  { ticker: 'SPY', name: 'S&P 500', plainLabel: 'Tracks the top 500 US companies' },
  { ticker: 'QQQ', name: 'Nasdaq', plainLabel: 'Tracks the top tech companies' },
  { ticker: 'DIA', name: 'Dow Jones', plainLabel: 'Tracks 30 of the biggest US companies' },
]

export async function GET() {
  try {
    const results = await Promise.allSettled(
      INDICES.map(async idx => {
        const quote = await getGlobalQuote(idx.ticker)
        return { ...idx, ...quote }
      })
    )

    let finalData = results.map((res) => {
      if (res.status === 'fulfilled') return res.value
      return null
    })

    // If any indices are missing, try SerpApi as a fallback
    if (finalData.some(d => d === null)) {
      try {
        const serpRes = await getSerpApiMarketData()
        const formatted = formatSerpApiIndices(serpRes)
        if (formatted) {
          finalData = finalData.map((d, i) => {
            if (d !== null) return d
            const ticker = INDICES[i].ticker
            const fallback = (formatted as any)[ticker]
            if (fallback) return { ...INDICES[i], ...fallback }
            return INDICES[i]
          })
        }
      } catch (err) {
        console.error("SERPAPI_FALLBACK_ERROR:", err)
      }
    }

    // Ensure we always return at least the static info
    const data = finalData.map((d, i) => d || INDICES[i])

    return NextResponse.json({ indices: data }, { headers: { 'Cache-Control': 's-maxage=300' } })
  } catch (err: any) {
    console.error("MARKET_SUMMARY_API_ERROR:", err.message || err);
    return NextResponse.json({ indices: INDICES })
  }
}
