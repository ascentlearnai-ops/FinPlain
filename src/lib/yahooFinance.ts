import yahooFinance from 'yahoo-finance2'
import type { ChartDataPoint, ChartRange } from './types'

export async function getYahooChart(ticker: string, range: ChartRange): Promise<ChartDataPoint[]> {
  try {
    const period1 = getPeriod1(range)
    const interval = range === '1D' ? '1m' : '1d'

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
    console.error('YAHOO_CHART_ERROR:', err)
    return []
  }
}

function getPeriod1(range: ChartRange): string {
  const now = new Date()
  if (range === '1D') return new Date(now.setDate(now.getDate() - 1)).toISOString()
  if (range === '1W') return new Date(now.setDate(now.getDate() - 7)).toISOString()
  if (range === '1M') return new Date(now.setMonth(now.getMonth() - 1)).toISOString()
  if (range === '3M') return new Date(now.setMonth(now.getMonth() - 3)).toISOString()
  if (range === '1Y') return new Date(now.setFullYear(now.getFullYear() - 1)).toISOString()
  return new Date(now.setDate(now.getDate() - 30)).toISOString()
}
