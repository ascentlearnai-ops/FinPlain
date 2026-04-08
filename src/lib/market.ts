import { getGlobalQuote } from '@/lib/alphaVantage'
import { getSerpApiMarketData, formatSerpApiIndices } from '@/lib/serpapi'
import { getEodhdQuote } from '@/lib/eodhd'

const INDICES = [
  { ticker: 'SPY', name: 'S&P 500', plainLabel: 'Tracks the top 500 US companies' },
  { ticker: 'QQQ', name: 'Nasdaq', plainLabel: 'Tracks the top tech companies' },
  { ticker: 'DIA', name: 'Dow Jones', plainLabel: 'Tracks 30 of the biggest US companies' },
]

export async function getMarketSummary() {
  try {
    const results = await Promise.allSettled(
      INDICES.map(async idx => {
        const eod = await getEodhdQuote(idx.ticker)
        if (eod) return { ...idx, ...eod }
        const quote = await getGlobalQuote(idx.ticker)
        return { ...idx, ...quote }
      })
    )

    let finalData = results.map((res) => {
      if (res.status === 'fulfilled') return res.value
      return null
    })

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

    return finalData.map((d, i) => d || INDICES[i])
  } catch (err) {
    console.error("GET_MARKET_SUMMARY_ERROR:", err)
    return INDICES
  }
}
