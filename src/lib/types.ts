// src/lib/types.ts — All shared types used across the app

export interface MarketIndex {
  name: string           // "S&P 500"
  ticker: string         // "SPY"
  value: number          // 5432.10
  change: number         // +12.50
  changePercent: number  // +0.23
  plainLabel: string     // "Tracks the top 500 US companies"
}

export interface StockQuote {
  ticker: string
  companyName: string
  price: number
  change: number
  changePercent: number
  volume: number
  prevClose: number
  open: number
}

export interface StockOverview {
  ticker: string
  companyName: string
  description: string
  sector: string
  industry: string
  marketCap: number
  peRatio: number | null
  dividendYield: number | null
  week52High: number
  week52Low: number
  avgVolume: number
  eps: number | null
}

export interface ChartDataPoint {
  time: string         // "2024-01-15" for daily, unix for intraday
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface NewsArticle {
  id: string
  headline: string
  source: string
  url: string
  publishedAt: string       // ISO string
  relatedTickers: string[]
  simpleSummary: string     // Gemini-generated 1-sentence plain summary
  category: 'tech' | 'energy' | 'finance' | 'economy' | 'general'
  imageUrl?: string
}

export interface GlossaryTerm {
  id: string
  term: string
  category: 'stocks' | 'markets' | 'numbers' | 'basics'
  definition: string        // Plain English, 1 sentence max
  example: string           // "Think of it like..."
  emoji: string
}

export interface WatchlistItem {
  ticker: string
  addedAt: string           // ISO string
}

export type ChartRange = '1D' | '1W' | '1M' | '3M' | '1Y'
export type ChartType = 'line' | 'candlestick'
