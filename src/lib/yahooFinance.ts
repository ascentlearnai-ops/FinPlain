import yahooFinance from 'yahoo-finance2'
import type { ChartDataPoint, ChartRange } from './types'

export async function getYahooQuote(ticker: string) {
  try {
    const result: any = await yahooFinance.quote(ticker)
    if (!result) return null

    return {
      ticker,
      price: result.regularMarketPrice,
      change: result.regularMarketChange,
      changePercent: result.regularMarketChangePercent,
      volume: result.regularMarketVolume,
      prevClose: result.regularMarketPreviousClose,
      open: result.regularMarketOpen,
      high: result.regularMarketDayHigh,
      low: result.regularMarketDayLow,
    }
  } catch (err) {
    console.error(`YAHOO_QUOTE_ERROR (${ticker}):`, err)
    return null
  }
}

export async function getYahooOverview(ticker: string) {
  try {
    const result: any = await yahooFinance.quoteSummary(ticker, { modules: ['summaryProfile', 'summaryDetail', 'price'] })
    if (!result) return null

    const profile = result.summaryProfile || {}
    const detail = result.summaryDetail || {}
    const price = result.price || {}

    return {
      ticker,
      companyName: price.longName || price.shortName || ticker,
      description: profile.longBusinessSummary || '',
      sector: profile.sector || '',
      industry: profile.industry || '',
      marketCap: detail.marketCap || 0,
      peRatio: detail.forwardPE || detail.trailingPE || null,
      dividendYield: (detail.dividendYield || 0) * 100,
      week52High: detail.fiftyTwoWeekHigh || 0,
      week52Low: detail.fiftyTwoWeekLow || 0,
      avgVolume: detail.averageVolume || 0,
      eps: detail.trailingEps || null,
    }
  } catch (err) {
    console.error(`YAHOO_OVERVIEW_ERROR (${ticker}):`, err)
    return null
  }
}

export async function getYahooChart(ticker: string, range: ChartRange): Promise<ChartDataPoint[]> {
  try {
    const period1 = getPeriod1(range)
    const interval = range === '1D' ? '5m' : '1d'

    // Use any as a workaround for current library type definition issues in this environment
    const result: any = await yahooFinance.chart(ticker, {
      period1,
      interval: interval as any,
    })

    if (!result || !result.quotes) return []

    return result.quotes
      .filter((q: any) => q.date && q.close !== null)
      .map((q: any) => ({
        time: range === '1D' 
          ? Math.floor(new Date(q.date).getTime() / 1000) 
          : new Date(q.date).toISOString().split('T')[0],
        open: q.open || 0,
        high: q.high || 0,
        low: q.low || 0,
        close: q.close || 0,
        volume: q.volume || 0,
      })) as ChartDataPoint[]
  } catch (err) {
    console.error(`YAHOO_CHART_ERROR (${ticker}):`, err)
    return []
  }
}

function getPeriod1(range: ChartRange): string {
  const now = new Date()
  if (range === '1D') {
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 2) // Yahoo chart needs a broader window for intraday sometimes
    return yesterday.toISOString()
  }
  if (range === '1W') return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString()
  if (range === '1M') return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString()
  if (range === '3M') return new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()).toISOString()
  if (range === '1Y') return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30).toISOString()
}

