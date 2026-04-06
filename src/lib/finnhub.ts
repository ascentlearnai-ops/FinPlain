// src/lib/finnhub.ts - Finnhub API integration
const FINNHUB_KEY = process.env.FINNHUB_API_KEY || ''
const USE_MOCK = process.env.USE_MOCK_DATA === 'true'

export async function getRecommendationTrends(symbol: string) {
  if (USE_MOCK || !FINNHUB_KEY) {
    return [
      { buy: 23, hold: 5, sell: 1, strongBuy: 12, strongSell: 0, period: '2026-03-01' },
      { buy: 21, hold: 6, sell: 2, strongBuy: 10, strongSell: 0, period: '2026-02-01' },
      { buy: 20, hold: 8, sell: 1, strongBuy: 11, strongSell: 0, period: '2026-01-01' },
      { buy: 25, hold: 4, sell: 0, strongBuy: 15, strongSell: 0, period: '2025-12-01' },
    ]
  }

  const url = `https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=${FINNHUB_KEY}`
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    return await res.json()
  } catch (err) {
    console.error('Finnhub Trends Error:', err)
    return []
  }
}

export async function getEarnings(symbol: string) {
  if (USE_MOCK || !FINNHUB_KEY) {
    return [
      { actual: 2.18, estimate: 2.10, period: '2025-12-31', symbol: symbol },
      { actual: 1.46, estimate: 1.39, period: '2025-09-30', symbol: symbol },
      { actual: 1.26, estimate: 1.20, period: '2025-06-30', symbol: symbol },
      { actual: 1.53, estimate: 1.50, period: '2025-03-31', symbol: symbol },
    ]
  }

  const url = `https://finnhub.io/api/v1/stock/earnings?symbol=${symbol}&token=${FINNHUB_KEY}`
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    return await res.json()
  } catch (err) {
    console.error('Finnhub Earnings Error:', err)
    return []
  }
}
