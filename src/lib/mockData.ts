// lib/mockData.ts — Use when USE_MOCK_DATA=true so you don't burn API quota

export const MOCK_MARKET_SUMMARY = {
  indices: [
    { name: 'S&P 500', ticker: 'SPY', value: 5432.10, change: 12.50, changePercent: 0.23, plainLabel: 'Tracks the top 500 US companies' },
    { name: 'Nasdaq', ticker: 'QQQ', value: 18234.56, change: -45.20, changePercent: -0.25, plainLabel: 'Tech-heavy composite index' },
    { name: 'Dow Jones', ticker: 'DIA', value: 39456.78, change: 102.30, changePercent: 0.26, plainLabel: '30 blue-chip industrial leaders' },
  ]
}

export const MOCK_GAINERS = [
  { ticker: 'NVDA', price: 875.40, changePercent: 4.32 },
  { ticker: 'META', price: 512.30, changePercent: 3.21 },
  { ticker: 'TSLA', price: 245.67, changePercent: 2.89 },
  { ticker: 'AMD', price: 178.90, changePercent: 2.45 },
  { ticker: 'AAPL', price: 192.30, changePercent: 1.23 },
]

export const MOCK_LOSERS = [
  { ticker: 'PFE', price: 28.45, changePercent: -3.12 },
  { ticker: 'BA', price: 187.60, changePercent: -2.87 },
  { ticker: 'DIS', price: 112.34, changePercent: -2.45 },
  { ticker: 'INTC', price: 31.20, changePercent: -1.98 },
  { ticker: 'NFLX', price: 623.40, changePercent: -1.54 },
]

export const MOCK_AAPL_QUOTE = {
  ticker: 'AAPL', companyName: 'Apple Inc.', price: 192.30, change: 2.34,
  changePercent: 1.23, volume: 54234567, prevClose: 189.96, open: 190.10
}

export const MOCK_AAPL_OVERVIEW = {
  ticker: 'AAPL', companyName: 'Apple Inc.',
  description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company operates through Americas, Europe, Greater China, Japan, and Rest of Asia Pacific segments.',
  sector: 'Technology', industry: 'Consumer Electronics',
  marketCap: 2980000000000, peRatio: 31.4, dividendYield: 0.51,
  week52High: 199.62, week52Low: 164.08, avgVolume: 58000000, eps: 6.13,
  beta: 1.28, analystTarget: 210.50, ebitda: 130000000000, revenueTTM: 383000000000,
  grossProfitTTM: 170000000000, profitMargin: 0.262,
}
