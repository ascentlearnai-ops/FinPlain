// Removed top-level KEY

export async function getSerpApiMarketData() {
  const KEY = process.env.SERPAPI_KEY;
  if (!KEY) {
    console.warn("SERPAPI_KEY is not defined.");
    return null;
  }

  try {
    const url = `https://serpapi.com/search.json?engine=google_finance_markets&trend=indexes&api_key=${KEY}`
    const res = await fetch(url, { next: { revalidate: 300 } }) // 5 min cache
    const data = await res.json()
    return data
  } catch (err) {
    console.error("SERPAPI_FETCH_ERROR:", err)
    return null
  }
}

export function formatSerpApiIndices(data: any) {
  if (!data?.markets?.us) return null

  // Map US indices to our internal format
  // S&P 500: .INX:INDEXSP
  // Dow Jones: .DJI:INDEXDJX
  // Nasdaq: .IXIC:INDEXNASDAQ
  
  const us = data.markets.us
  const find = (ticker: string) => us.find((x: any) => x.stock === ticker)

  const spy = find('.INX:INDEXSP')
  const dji = find('.DJI:INDEXDJX')
  const nas = find('.IXIC:INDEXNASDAQ')

  return {
    SPY: spy ? {
      price: spy.price,
      changePercent: spy.price_movement?.percentage || 0,
      change: spy.price_movement?.value || 0,
      isUp: spy.price_movement?.movement === 'Up'
    } : null,
    DIA: dji ? {
      price: dji.price,
      changePercent: dji.price_movement?.percentage || 0,
      change: dji.price_movement?.value || 0,
      isUp: dji.price_movement?.movement === 'Up'
    } : null,
    QQQ: nas ? {
      price: nas.price,
      changePercent: nas.price_movement?.percentage || 0,
      change: nas.price_movement?.value || 0,
      isUp: nas.price_movement?.movement === 'Up'
    } : null
  }
}

export async function getSerpApiStockData(ticker: string) {
  const KEY = process.env.SERPAPI_KEY;
  if (!KEY) return null
  
  try {
    const url = `https://serpapi.com/search.json?engine=google_finance&q=${ticker}&api_key=${KEY}`
    const res = await fetch(url, { next: { revalidate: 300 } })
    const data = await res.json()
    
    if (data.summary) {
      const s = data.summary
      return {
        ticker: s.stock || ticker,
        price: s.price,
        change: s.price_movement?.value || 0,
        changePercent: s.price_movement?.percentage || 0,
        volume: null,
        prevClose: null,
        open: null,
        high: null,
        low: null,
      }
    }
    return null
  } catch (err) {
    console.error(`SERPAPI_STOCK_ERROR (${ticker}):`, err)
    return null
  }
}

export async function getSerpApiMovers() {
  const KEY = process.env.SERPAPI_KEY;
  if (!KEY) return null
  try {
    const url = `https://serpapi.com/search.json?engine=google_finance_markets&trend=indexes&api_key=${KEY}`
    const res = await fetch(url, { next: { revalidate: 300 } })
    const data = await res.json()
    
    const us = data.markets?.us || []
    return {
      gainers: us.filter((x: any) => x.price_movement?.movement === 'Up').slice(0, 5).map((x: any) => ({
        ticker: x.stock,
        price: x.price,
        changePercent: x.price_movement?.percentage || 0
      })),
      losers: us.filter((x: any) => x.price_movement?.movement === 'Down').slice(0, 5).map((x: any) => ({
        ticker: x.stock,
        price: x.price,
        changePercent: x.price_movement?.percentage || 0
      })),
    }
  } catch (err) {
    console.error("SERPAPI_MOVERS_ERROR:", err)
    return null
  }
}
