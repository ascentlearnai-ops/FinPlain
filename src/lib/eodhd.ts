export const EODHD_KEY = process.env.EODHD_API_KEY;

export async function getEodhdQuote(ticker: string) {
  const KEY = process.env.EODHD_API_KEY;
  if (!KEY) return null;

  try {
    const url = `https://eodhd.com/api/real-time/${ticker}.US?api_token=${KEY}&fmt=json`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    
    if (data.close === 'NA' || !data.close) return null;
    
    return {
      ticker,
      price: data.close,
      change: data.change,
      changePercent: data.change_p,
      volume: data.volume,
      prevClose: data.previousClose,
      open: data.open,
      high: data.high,
      low: data.low,
    };
  } catch (err) {
    console.error("EODHD_QUOTE_ERROR:", err);
    return null;
  }
}

export async function getEodhdChart(ticker: string, range: string) {
  const KEY = process.env.EODHD_API_KEY;
  if (!KEY) return [];

  try {
    // Determine the period (d: daily, w: weekly, m: monthly)
    let limit = 30;
    let period = 'd';
    
    if (range === '1D') { period = '1m'; limit = 390; } // Intraday 1min
    else if (range === '1W') { period = 'd'; limit = 7; }
    else if (range === '1M') { period = 'd'; limit = 30; }
    else if (range === '3M') { period = 'd'; limit = 90; }
    else if (range === '1Y') { period = 'd'; limit = 252; }
    else { period = 'w'; limit = 300; }

    const url = period === '1m'
      ? `https://eodhd.com/api/intraday/${ticker}.US?interval=5m&api_token=${KEY}&fmt=json`
      : `https://eodhd.com/api/eod/${ticker}.US?period=${period}&limit=${limit}&api_token=${KEY}&fmt=json`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    
    if (!Array.isArray(data)) return [];

    return data.map((q: any) => ({
      time: period === '1m' ? q.timestamp : q.date,
      open: q.open || 0,
      high: q.high || 0,
      low: q.low || 0,
      close: q.close || 0,
      volume: q.volume || 0,
    }));
  } catch (err) {
    console.error("EODHD_CHART_ERROR:", err);
    return [];
  }
}
