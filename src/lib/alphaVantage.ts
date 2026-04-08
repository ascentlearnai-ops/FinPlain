// src/lib/alphaVantage.ts

const BASE = 'https://www.alphavantage.co/query'
// Removed top-level KEY
const USE_MOCK = process.env.USE_MOCK_DATA === 'true'
import { MOCK_AAPL_QUOTE, MOCK_AAPL_OVERVIEW, MOCK_GAINERS, MOCK_LOSERS } from './mockData'
// In-memory server cache (resets on cold start, good enough for MVP)
type CacheEntry = { data: unknown; ts: number }
const cache = new Map<string, CacheEntry>()
const TTL = 5 * 60 * 1000 // 5 minutes default

async function fetchAV(params: Record<string, string>, ttl = TTL): Promise<unknown> {
  if (USE_MOCK) return null // caller handles mock fallback

  const cacheKey = JSON.stringify(params)
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.ts < ttl) return cached.data

  const url = new URL(BASE)
  const KEY = process.env.ALPHA_VANTAGE_KEY
  Object.entries({ ...params, apikey: KEY! }).forEach(([k, v]) =>
    url.searchParams.set(k, v)
  )

  const res = await fetch(url.toString(), { next: { revalidate: ttl / 1000 } })
  const data = await res.json()

  // Check for rate limit
  if (data['Note'] || data['Information']) {
    throw new Error('RATE_LIMITED')
  }

  cache.set(cacheKey, { data, ts: Date.now() })
  return data
}

export async function getGlobalQuote(ticker: string) {
  if (USE_MOCK) return { ...MOCK_AAPL_QUOTE, ticker }
  const data: any = await fetchAV({ function: 'GLOBAL_QUOTE', symbol: ticker })
  const q = data?.['Global Quote']
  if (!q) throw new Error('No data')
  return {
    ticker,
    price: parseFloat(q['05. price']),
    change: parseFloat(q['09. change']),
    changePercent: parseFloat(q['10. change percent'].replace('%', '')),
    volume: parseInt(q['06. volume']),
    prevClose: parseFloat(q['08. previous close']),
    open: parseFloat(q['02. open']),
  }
}

export async function getCompanyOverview(ticker: string) {
  if (USE_MOCK) return { ...MOCK_AAPL_OVERVIEW, ticker, companyName: ticker + ' Corp' }
  const data: any = await fetchAV({ function: 'OVERVIEW', symbol: ticker }, 60 * 60 * 1000) // 1hr cache
  return {
    ticker,
    companyName: data['Name'],
    description: data['Description'],
    sector: data['Sector'],
    industry: data['Industry'],
    marketCap: parseFloat(data['MarketCapitalization']),
    peRatio: data['PERatio'] !== 'None' ? parseFloat(data['PERatio']) : null,
    dividendYield: data['DividendYield'] !== 'None' ? parseFloat(data['DividendYield']) * 100 : null,
    week52High: parseFloat(data['52WeekHigh']),
    week52Low: parseFloat(data['52WeekLow']),
    avgVolume: parseInt(data['10DayAverageTradingVolume']),
    eps: data['EPS'] !== 'None' ? parseFloat(data['EPS']) : null,
  }
}

export async function getTimeSeries(ticker: string, range: string) {
  if (USE_MOCK) {
    // Generate dummy time series data
    return Array.from({ length: 30 }).map((_, i) => ({
      time: `2024-03-${(i + 1).toString().padStart(2, '0')}`, open: 150 + i, high: 155 + i, low: 145 + i, close: 152 + i, volume: 1000000
    }))
  }
  const isIntraday = range === '1D'
  const params = isIntraday
    ? { function: 'TIME_SERIES_INTRADAY', symbol: ticker, interval: '5min', outputsize: 'compact' }
    : { function: 'TIME_SERIES_DAILY', symbol: ticker, outputsize: range === '1Y' ? 'full' : 'compact' }

  const data: any = await fetchAV(params as Record<string, string>)

  const key = isIntraday ? 'Time Series (5min)' : 'Time Series (Daily)'
  const series = data?.[key]
  if (!series) throw new Error('No series data')

  const allPoints = Object.entries(series)
    .map(([time, vals]: [string, any]) => ({
      time,
      open: parseFloat(vals['1. open']),
      high: parseFloat(vals['2. high']),
      low: parseFloat(vals['3. low']),
      close: parseFloat(vals['4. close']),
      volume: parseInt(vals['5. volume']),
    }))
    .sort((a, b) => a.time.localeCompare(b.time))

  // Slice based on range
  const sliceMap: Record<string, number> = {
    '1D': 78, '1W': 35, '1M': 22, '3M': 65, '1Y': 252
  }
  return allPoints.slice(-(sliceMap[range] || 30))
}

export async function getTopMovers() {
  if (USE_MOCK) return { gainers: MOCK_GAINERS, losers: MOCK_LOSERS }
  const data: any = await fetchAV({ function: 'TOP_GAINERS_LOSERS' })
  return {
    gainers: (data?.top_gainers || []).slice(0, 5).map((s: any) => ({
      ticker: s.ticker,
      price: parseFloat(s.price),
      changePercent: parseFloat(s.change_percentage.replace('%', '')),
    })),
    losers: (data?.top_losers || []).slice(0, 5).map((s: any) => ({
      ticker: s.ticker,
      price: parseFloat(s.price),
      changePercent: parseFloat(s.change_percentage.replace('%', '')),
    })),
  }
}

export async function searchSymbol(query: string) {
  if (USE_MOCK) return [{ ticker: 'AAPL', name: 'Apple', type: 'Equity', region: 'US' }]
  const data: any = await fetchAV({ function: 'SYMBOL_SEARCH', keywords: query }, 60000)
  return (data?.bestMatches || []).slice(0, 6).map((m: any) => ({
    ticker: m['1. symbol'],
    name: m['2. name'],
    type: m['3. type'],
    region: m['4. region'],
  }))
}
