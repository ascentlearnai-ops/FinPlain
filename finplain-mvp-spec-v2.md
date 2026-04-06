# Finplain — Ultra-Detailed MVP Build Spec v2.0
**For Claude Code | Next.js 14 | Student Finance Dashboard**

---

## SECTION 1 — Project Vision & Design Philosophy

### What is Finplain?
Finplain is a student-first stock market dashboard. It takes everything Yahoo Finance does and makes it readable for a 7th grader without dumbing down the data. Every number has a plain-English label. Every jargon term has a tooltip. Every page has an AI summary that explains what's happening like a smart older friend — not a Wall Street analyst.

### Who is it for?
- Middle schoolers (6th–8th grade) discovering money for the first time
- High schoolers in finance/trading clubs wanting real data in simpler language
- Teachers and parents who want a safe, educational market tool

### Core Philosophy
1. **No orphan jargon** — Every financial term must be explained. P/E Ratio is never shown without a plain label.
2. **AI as translator** — Gemini 2.0 Flash is the bridge between Wall Street speak and student speak.
3. **Data first, decoration second** — The chart and numbers are always the hero. Design enhances, never distracts.
4. **Fast and snappy** — Students won't wait. Skeleton loaders everywhere. Cache everything.
5. **No login friction** — localStorage only for MVP. Students can use it in 3 seconds.

---

## SECTION 2 — Design System: "Obsidian & Citrus"

I'm picking the theme. This is called **Obsidian & Citrus** — a near-black dark base with electric neon-yellow/citrus accents. Think Pika Labs, Arc Browser, modern Bloomberg Terminal vibes but friendly. It's the most Gen-Z-coded fintech aesthetic right now and nobody else is doing it in student finance.

### Color Palette

```css
/* globals.css — paste this at the top */

@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');

:root {
  /* Core Colors */
  --bg-base: #0F0F11;           /* Near-black page background */
  --bg-card: #1A1A1F;           /* Card backgrounds */
  --bg-card-hover: #22222A;     /* Card hover state */
  --bg-elevated: #252530;       /* Elevated surfaces, modals */
  --bg-subtle: #1E1E26;         /* Subtle section backgrounds */

  /* Citrus Accent */
  --citrus: #D4FF47;            /* Primary neon yellow-green accent */
  --citrus-dim: #B8E03A;        /* Slightly dimmer citrus */
  --citrus-glow: rgba(212, 255, 71, 0.15); /* Glow effect */
  --citrus-border: rgba(212, 255, 71, 0.25); /* Border with citrus tint */

  /* Status Colors */
  --green-up: #22C55E;          /* Stock up — classic green */
  --green-up-bg: rgba(34, 197, 94, 0.12);
  --red-down: #EF4444;          /* Stock down — classic red */
  --red-down-bg: rgba(239, 68, 68, 0.12);

  /* Text */
  --text-primary: #F0F0F5;      /* Main text — off-white */
  --text-secondary: #A0A0B0;    /* Muted labels */
  --text-tertiary: #606070;     /* Very muted, timestamps */
  --text-on-citrus: #0F0F11;    /* Text ON citrus buttons */

  /* Borders */
  --border-subtle: rgba(255,255,255,0.06);
  --border-default: rgba(255,255,255,0.10);
  --border-strong: rgba(255,255,255,0.18);

  /* Shadows */
  --shadow-card: 0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06);
  --shadow-citrus: 0 0 20px rgba(212, 255, 71, 0.2);
  --shadow-hover: 0 4px 24px rgba(0,0,0,0.5);

  /* Border radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  /* Spacing scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
}
```

### Typography

```css
/* Fonts */
/* Syne 700/800 — Display headlines, logo, section titles */
/* Plus Jakarta Sans 400/500/600 — Body copy, labels, UI text */
/* JetBrains Mono 400/600 — All numbers: prices, percentages, market values */

/* Type Scale */
.text-display     { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 3rem; line-height: 1.1; letter-spacing: -0.02em; }
.text-headline    { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.75rem; line-height: 1.2; }
.text-title       { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.25rem; }
.text-body        { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 400; font-size: 0.9375rem; line-height: 1.6; }
.text-label       { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 0.75rem; letter-spacing: 0.06em; text-transform: uppercase; }
.text-price       { font-family: 'JetBrains Mono', monospace; font-weight: 600; font-size: 1.5rem; }
.text-price-sm    { font-family: 'JetBrains Mono', monospace; font-weight: 400; font-size: 0.875rem; }
.text-change      { font-family: 'JetBrains Mono', monospace; font-weight: 600; font-size: 0.875rem; }
```

### Tailwind Config Extension

```js
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0F0F11',
        card: '#1A1A1F',
        elevated: '#252530',
        subtle: '#1E1E26',
        citrus: '#D4FF47',
        'citrus-dim': '#B8E03A',
        'text-primary': '#F0F0F5',
        'text-secondary': '#A0A0B0',
        'text-muted': '#606070',
        'up': '#22C55E',
        'down': '#EF4444',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
        citrus: '0 0 20px rgba(212, 255, 71, 0.2)',
        hover: '0 4px 24px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

### Reusable Component Class Patterns

```tsx
// Standard card — use this everywhere
const cardClass = "bg-card rounded-2xl border border-white/[0.06] shadow-card hover:bg-[#22222A] hover:border-white/[0.10] transition-all duration-200"

// Citrus pill badge (for positive changes, labels, CTAs)
const citrusBadge = "bg-citrus text-base font-jakarta font-semibold text-sm px-3 py-1 rounded-full"

// Up badge (stock going up)
const upBadge = "bg-[rgba(34,197,94,0.12)] text-up font-mono text-sm font-semibold px-2.5 py-1 rounded-lg"

// Down badge (stock going down)
const downBadge = "bg-[rgba(239,68,68,0.12)] text-down font-mono text-sm font-semibold px-2.5 py-1 rounded-lg"

// Primary button (citrus)
const btnPrimary = "bg-citrus text-base font-jakarta font-semibold px-5 py-2.5 rounded-xl hover:bg-citrus-dim transition-colors duration-150 cursor-pointer"

// Ghost button
const btnGhost = "border border-white/10 text-text-secondary font-jakarta font-medium px-5 py-2.5 rounded-xl hover:border-white/20 hover:text-text-primary transition-all duration-150"

// Section label
const sectionLabel = "font-jakarta font-semibold text-xs tracking-widest uppercase text-text-muted"

// Page section title
const sectionTitle = "font-syne font-bold text-xl text-text-primary"
```

---

## SECTION 3 — Tech Stack (Full Details)

| Layer | Tool | Version | Why |
|---|---|---|---|
| Framework | Next.js | 14.2.x (App Router) | SSR, API routes, file-based routing |
| Language | TypeScript | 5.x | Type safety throughout |
| Styling | Tailwind CSS | 3.4.x | Utility-first, fast iteration |
| Charts | lightweight-charts | 4.1.x | TradingView's open-source lib, best-in-class |
| Stock Data | Alpha Vantage | Free API | Quote, overview, time series |
| News | yahoo-finance2 | 2.11.x | npm package wrapping Yahoo Finance |
| AI | Google Gemini 2.0 Flash | REST API | Plain-English explanations |
| State | React useState/useEffect | Built-in | No Redux needed for MVP |
| Storage | localStorage | Browser | Watchlist persistence, no backend |
| Animations | CSS + Tailwind | Built-in | Fade-up, shimmer skeleton |
| Deploy | Vercel | Latest | Free tier, instant CI/CD |
| Icons | Lucide React | Latest | Lightweight, consistent icon set |

### Install Commands (Run in Order)
```bash
npx create-next-app@14 finplain --typescript --tailwind --app --src-dir false
cd finplain
npm install lightweight-charts yahoo-finance2 lucide-react
npm install -D @types/node
```

---

## SECTION 4 — Environment Variables

```bash
# .env.local — NEVER commit this file

ALPHA_VANTAGE_KEY=your_key_here
GEMINI_API_KEY=your_key_here

# Optional: set to "true" to use mock data (preserves API quota while building)
USE_MOCK_DATA=false
```

Get Alpha Vantage key: https://www.alphavantage.co/support/#api-key (free, instant)
Get Gemini key: https://aistudio.google.com/app/apikey (free, instant)

**Important:** Alpha Vantage free = 25 requests/day. Premium = 500/min. For dev, set USE_MOCK_DATA=true.

---

## SECTION 5 — Full File Structure

```
finplain/
├── app/
│   ├── layout.tsx                    # Root layout — Navbar, fonts, metadata
│   ├── page.tsx                      # Home / Dashboard
│   ├── globals.css                   # Color vars, font imports, base styles
│   │
│   ├── stock/
│   │   └── [ticker]/
│   │       ├── page.tsx              # Stock detail page
│   │       └── loading.tsx           # Stock page skeleton
│   │
│   ├── news/
│   │   ├── page.tsx                  # News feed
│   │   └── loading.tsx
│   │
│   ├── learn/
│   │   ├── page.tsx                  # Glossary
│   │   └── loading.tsx
│   │
│   ├── watchlist/
│   │   ├── page.tsx                  # Watchlist
│   │   └── loading.tsx
│   │
│   └── api/
│       ├── market-summary/
│       │   └── route.ts              # GET /api/market-summary
│       ├── gainers-losers/
│       │   └── route.ts              # GET /api/gainers-losers
│       ├── stock/
│       │   └── route.ts              # GET /api/stock?ticker=AAPL&range=1M
│       ├── stock-search/
│       │   └── route.ts              # GET /api/stock-search?q=apple
│       ├── news/
│       │   └── route.ts              # GET /api/news?ticker=AAPL (optional ticker)
│       └── ai-explain/
│           └── route.ts              # POST /api/ai-explain { prompt }
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Top navigation bar
│   │   ├── Footer.tsx                # Simple footer
│   │   └── PageWrapper.tsx           # Page max-width + padding wrapper
│   │
│   ├── ui/
│   │   ├── SkeletonCard.tsx          # Generic shimmer skeleton
│   │   ├── SkeletonLine.tsx          # Single line skeleton
│   │   ├── Badge.tsx                 # Up/Down/Neutral badge
│   │   ├── GlossaryTooltip.tsx       # Hover tooltip with definition
│   │   ├── SearchBar.tsx             # Ticker search with dropdown
│   │   ├── EmptyState.tsx            # Friendly empty states
│   │   └── ErrorState.tsx            # API error friendly display
│   │
│   ├── market/
│   │   ├── MarketCard.tsx            # S&P/Nasdaq/Dow index card
│   │   ├── StockCard.tsx             # Gainer/loser stock card
│   │   ├── MiniSparkline.tsx         # 7-day mini chart (SVG)
│   │   ├── DailyAISummary.tsx        # "What happened today" AI box
│   │   └── TrendingTickers.tsx       # Trending pill tags
│   │
│   ├── stock/
│   │   ├── StockHeader.tsx           # Company name, price, change
│   │   ├── StockChart.tsx            # Line/Candlestick chart
│   │   ├── StockStats.tsx            # 6-stat grid with tooltips
│   │   ├── AIExplainer.tsx           # Gemini plain-English box
│   │   └── RelatedNews.tsx           # 3 news cards for this stock
│   │
│   ├── news/
│   │   ├── NewsCard.tsx              # Individual news article card
│   │   └── CategoryFilter.tsx        # Filter pill tabs
│   │
│   ├── learn/
│   │   ├── GlossaryCard.tsx          # Individual glossary term card
│   │   └── GlossarySearch.tsx        # Search input for glossary
│   │
│   └── watchlist/
│       ├── WatchlistRow.tsx          # Single watched stock row
│       └── WatchlistButton.tsx       # Add/remove toggle button
│
├── lib/
│   ├── alphaVantage.ts               # AV API helper + cache
│   ├── yahooFinance.ts               # Yahoo Finance news helper
│   ├── gemini.ts                     # Gemini API helper
│   ├── glossary.ts                   # 40+ glossary terms data
│   ├── localStorage.ts               # Watchlist + recents helpers
│   ├── mockData.ts                   # Mock data for dev (saves API quota)
│   ├── formatters.ts                 # Format price, percent, market cap
│   └── types.ts                      # All TypeScript interfaces
│
├── public/
│   ├── logo.svg                      # Finplain logo mark
│   └── og-image.png                  # Open Graph image for sharing
│
├── .env.local                        # API keys (never commit)
├── .env.example                      # Template (safe to commit)
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## SECTION 6 — TypeScript Types (`lib/types.ts`)

```ts
// lib/types.ts — All shared types used across the app

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
```

---

## SECTION 7 — Data Formatters (`lib/formatters.ts`)

```ts
// lib/formatters.ts — All number/string formatting

export function formatPrice(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)
}

export function formatChange(n: number): string {
  const sign = n >= 0 ? '+' : ''
  return `${sign}${n.toFixed(2)}`
}

export function formatPercent(n: number): string {
  const sign = n >= 0 ? '+' : ''
  return `${sign}${n.toFixed(2)}%`
}

export function formatMarketCap(n: number): string {
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  return `$${n.toLocaleString()}`
}

export function formatVolume(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toString()
}

export function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function getChangeColor(change: number): string {
  return change >= 0 ? 'text-up' : 'text-down'
}

export function getChangeBg(change: number): string {
  return change >= 0 ? 'bg-[rgba(34,197,94,0.12)]' : 'bg-[rgba(239,68,68,0.12)]'
}

export function getChangeArrow(change: number): string {
  return change >= 0 ? '▲' : '▼'
}
```

---

## SECTION 8 — Alpha Vantage API Helper (`lib/alphaVantage.ts`)

```ts
// lib/alphaVantage.ts

const BASE = 'https://www.alphavantage.co/query'
const KEY = process.env.ALPHA_VANTAGE_KEY
const USE_MOCK = process.env.USE_MOCK_DATA === 'true'

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
  const isIntraday = range === '1D'
  const params = isIntraday
    ? { function: 'TIME_SERIES_INTRADAY', symbol: ticker, interval: '5min', outputsize: 'compact' }
    : { function: 'TIME_SERIES_DAILY', symbol: ticker, outputsize: range === '1Y' ? 'full' : 'compact' }

  const data: any = await fetchAV(params)

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
  const data: any = await fetchAV({ function: 'SYMBOL_SEARCH', keywords: query }, 60000)
  return (data?.bestMatches || []).slice(0, 6).map((m: any) => ({
    ticker: m['1. symbol'],
    name: m['2. name'],
    type: m['3. type'],
    region: m['4. region'],
  }))
}
```

---

## SECTION 9 — Gemini AI Helper (`lib/gemini.ts`)

```ts
// lib/gemini.ts

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
const KEY = process.env.GEMINI_API_KEY

const SYSTEM_INSTRUCTION = `You explain the stock market and finance to middle school and high school students.
Rules you always follow:
1. Use simple words a 7th grader would understand. Avoid jargon.
2. If you must use a finance term, immediately explain it in parentheses.
3. Keep responses short — never more than what's asked.
4. Be friendly and clear, like a smart older sibling explaining things.
5. Never give investment advice. Stick to explaining facts.`

export async function askGemini(prompt: string): Promise<string> {
  const res = await fetch(`${GEMINI_URL}?key=${KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
      },
    }),
  })

  if (!res.ok) throw new Error('Gemini API error')
  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Could not generate explanation.'
}

// Specific prompt builders

export async function explainStock(ticker: string, companyName: string, changePercent: number): Promise<string> {
  const trend = changePercent >= 0 ? `up ${changePercent.toFixed(2)}%` : `down ${Math.abs(changePercent).toFixed(2)}%`
  return askGemini(
    `Explain ${companyName} (${ticker}) to a middle school student in exactly 3 sentences.
     Sentence 1: What does this company do in plain, everyday words?
     Sentence 2: How has the stock been doing today — it is ${trend}?
     Sentence 3: One interesting fact about this company that a student might find cool.
     Max 70 words total. Do not use any financial jargon without explaining it.`
  )
}

export async function explainMarketDay(sp500Change: number, topGainer: string, topLoser: string): Promise<string> {
  const trend = sp500Change >= 0 ? `up ${sp500Change.toFixed(2)}%` : `down ${Math.abs(sp500Change).toFixed(2)}%`
  return askGemini(
    `Write a 3-sentence summary of today's stock market for a 7th grader.
     The S&P 500 (which tracks the top 500 US companies) is ${trend} today.
     The biggest winner was ${topGainer} and the biggest loser was ${topLoser}.
     Keep it under 70 words. Make it conversational and easy to understand.`
  )
}

export async function simplifyNewsHeadline(headline: string): Promise<string> {
  return askGemini(
    `Rewrite this news headline in plain English for a middle schooler, in one sentence (max 20 words):
     "${headline}"
     Just write the simplified sentence. No intro, no explanation, just the sentence.`
  )
}
```

---

## SECTION 10 — localStorage Helper (`lib/localStorage.ts`)

```ts
// lib/localStorage.ts

const WATCHLIST_KEY = 'finplain_watchlist'
const RECENTS_KEY = 'finplain_recents'
const AI_CACHE_KEY = 'finplain_ai_cache'

// WATCHLIST
export function getWatchlist(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '[]')
  } catch { return [] }
}

export function addToWatchlist(ticker: string): void {
  const list = getWatchlist()
  if (!list.includes(ticker)) {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...list, ticker]))
  }
}

export function removeFromWatchlist(ticker: string): void {
  const list = getWatchlist().filter(t => t !== ticker)
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list))
}

export function isInWatchlist(ticker: string): boolean {
  return getWatchlist().includes(ticker)
}

// RECENT SEARCHES
export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(RECENTS_KEY) || '[]')
  } catch { return [] }
}

export function addRecentSearch(ticker: string): void {
  const recents = getRecentSearches().filter(t => t !== ticker)
  localStorage.setItem(RECENTS_KEY, JSON.stringify([ticker, ...recents].slice(0, 5)))
}

// AI SUMMARY CACHE (keyed by date so it re-fetches each new day)
export function getCachedAISummary(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = JSON.parse(localStorage.getItem(AI_CACHE_KEY) || 'null')
    const today = new Date().toDateString()
    if (stored?.date === today) return stored.summary
    return null
  } catch { return null }
}

export function setCachedAISummary(summary: string): void {
  localStorage.setItem(AI_CACHE_KEY, JSON.stringify({
    date: new Date().toDateString(),
    summary,
  }))
}
```

---

## SECTION 11 — Navbar Component (`components/layout/Navbar.tsx`)

```tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import SearchBar from '@/components/ui/SearchBar'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'News' },
  { href: '/learn', label: 'Learn' },
  { href: '/watchlist', label: 'Watchlist' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-base/95 backdrop-blur-md border-b border-white/[0.06]' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-citrus rounded-lg flex items-center justify-center">
              <span className="font-syne font-black text-base text-sm leading-none">F</span>
            </div>
            <span className="font-syne font-bold text-lg text-text-primary group-hover:text-citrus transition-colors">
              Finplain
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-jakarta font-medium text-sm transition-all duration-150 ${
                  pathname === link.href
                    ? 'text-citrus bg-citrus/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Search + Mobile Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-card border-b border-white/[0.06] px-4 py-4 space-y-1">
            <div className="mb-3">
              <SearchBar fullWidth />
            </div>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl font-jakarta font-medium text-sm ${
                  pathname === link.href
                    ? 'text-citrus bg-citrus/10'
                    : 'text-text-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
```

---

## SECTION 12 — Root Layout (`app/layout.tsx`)

```tsx
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: { default: 'Finplain', template: '%s | Finplain' },
  description: 'The stock market, finally explained. Real market data in plain English for students.',
  openGraph: {
    title: 'Finplain',
    description: 'The stock market, finally explained.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-base text-text-primary font-jakarta antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

## SECTION 13 — SearchBar Component (`components/ui/SearchBar.tsx`)

```tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Clock, TrendingUp } from 'lucide-react'
import { getRecentSearches, addRecentSearch } from '@/lib/localStorage'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchResult { ticker: string; name: string }

export default function SearchBar({ fullWidth = false }: { fullWidth?: boolean }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [recents, setRecents] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  // Load recent searches on focus
  useEffect(() => {
    setRecents(getRecentSearches())
  }, [open])

  // Fetch search results
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 1) {
      setResults([])
      return
    }
    setLoading(true)
    fetch(`/api/stock-search?q=${encodeURIComponent(debouncedQuery)}`)
      .then(r => r.json())
      .then(data => { setResults(data.results || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [debouncedQuery])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navigate = (ticker: string) => {
    addRecentSearch(ticker)
    setQuery('')
    setOpen(false)
    router.push(`/stock/${ticker}`)
  }

  const showDropdown = open && (results.length > 0 || recents.length > 0 || loading)

  return (
    <div ref={ref} className={`relative ${fullWidth ? 'w-full' : 'w-64'}`}>
      {/* Input */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="Search stocks... (AAPL, TSLA)"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-sm font-jakarta text-text-primary placeholder:text-text-muted focus:outline-none focus:border-citrus/40 focus:bg-white/[0.08] transition-all"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 border border-citrus border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-elevated border border-white/[0.10] rounded-xl shadow-hover overflow-hidden z-50">
          {/* Recent searches (shown when query is empty) */}
          {!query && recents.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-jakarta font-semibold text-text-muted tracking-wider uppercase flex items-center gap-1.5">
                <Clock size={11} /> Recent
              </div>
              {recents.map(ticker => (
                <button key={ticker} onClick={() => navigate(ticker)}
                  className="w-full px-3 py-2.5 text-left hover:bg-white/[0.05] flex items-center gap-2 text-sm">
                  <TrendingUp size={14} className="text-text-muted" />
                  <span className="font-mono font-semibold text-text-primary">{ticker}</span>
                </button>
              ))}
            </div>
          )}

          {/* Search results */}
          {results.map(r => (
            <button key={r.ticker} onClick={() => navigate(r.ticker)}
              className="w-full px-3 py-2.5 text-left hover:bg-white/[0.05] flex items-center justify-between transition-colors">
              <div>
                <span className="font-mono font-semibold text-text-primary text-sm">{r.ticker}</span>
                <p className="text-text-muted text-xs mt-0.5 truncate max-w-[180px]">{r.name}</p>
              </div>
              <span className="text-text-muted text-xs">→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## SECTION 14 — GlossaryTooltip Component (`components/ui/GlossaryTooltip.tsx`)

```tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { HelpCircle } from 'lucide-react'

interface Props {
  term: string
  definition: string
  example: string
}

export default function GlossaryTooltip({ term, definition, example }: Props) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState<'top' | 'bottom'>('top')
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (visible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition(rect.top < 200 ? 'bottom' : 'top')
    }
  }, [visible])

  return (
    <span className="relative inline-flex items-center">
      <button
        ref={triggerRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        onClick={() => setVisible(!visible)}
        className="ml-1 text-text-muted hover:text-citrus transition-colors focus:outline-none"
        aria-label={`Explain: ${term}`}
      >
        <HelpCircle size={13} />
      </button>

      {visible && (
        <div className={`absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 -translate-x-1/2 z-50 w-64 bg-elevated border border-white/[0.12] rounded-xl p-3.5 shadow-hover pointer-events-none`}>
          {/* Arrow */}
          <div className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-elevated border border-white/[0.12] rotate-45 ${
            position === 'top' ? '-bottom-1 border-t-0 border-l-0' : '-top-1 border-b-0 border-r-0'
          }`} />
          
          <p className="font-syne font-bold text-sm text-citrus mb-1">{term}</p>
          <p className="font-jakarta text-xs text-text-secondary leading-relaxed">{definition}</p>
          <p className="font-jakarta text-xs text-text-muted mt-2 italic leading-relaxed">{example}</p>
        </div>
      )}
    </span>
  )
}
```

---

## SECTION 15 — Skeleton Components (`components/ui/SkeletonCard.tsx`)

```tsx
// components/ui/SkeletonCard.tsx
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-card rounded-2xl border border-white/[0.06] p-5 ${className}`}>
      <div className="animate-pulse space-y-3">
        <div className="h-3 bg-white/[0.06] rounded-full w-1/3" />
        <div className="h-8 bg-white/[0.08] rounded-lg w-2/3" />
        <div className="h-3 bg-white/[0.06] rounded-full w-1/4" />
      </div>
    </div>
  )
}

export function SkeletonLine({ width = 'w-full', height = 'h-4' }: { width?: string; height?: string }) {
  return (
    <div className={`${height} ${width} bg-white/[0.06] rounded-full animate-pulse`} />
  )
}

export function SkeletonNewsCard() {
  return (
    <div className="bg-card rounded-2xl border border-white/[0.06] p-5 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-3 w-16 bg-white/[0.06] rounded-full" />
        <div className="h-3 w-12 bg-white/[0.06] rounded-full" />
      </div>
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-white/[0.08] rounded w-full" />
        <div className="h-4 bg-white/[0.08] rounded w-4/5" />
      </div>
      <div className="h-3 bg-white/[0.05] rounded w-full" />
      <div className="h-3 bg-white/[0.05] rounded w-2/3 mt-1" />
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="bg-card rounded-2xl border border-white/[0.06] p-5 animate-pulse">
      <div className="flex gap-2 mb-4">
        {['1D','1W','1M','3M','1Y'].map(r => (
          <div key={r} className="h-8 w-10 bg-white/[0.06] rounded-lg" />
        ))}
      </div>
      <div className="h-64 bg-white/[0.04] rounded-xl flex items-end gap-1 px-2 pb-2">
        {Array.from({length: 30}).map((_, i) => (
          <div key={i} className="flex-1 bg-white/[0.06] rounded-t"
            style={{ height: `${20 + Math.random() * 60}%` }} />
        ))}
      </div>
    </div>
  )
}
```

---

## SECTION 16 — API Routes (Full Code)

### `/app/api/market-summary/route.ts`
```ts
import { NextResponse } from 'next/server'
import { getGlobalQuote } from '@/lib/alphaVantage'

const INDICES = [
  { ticker: 'SPY', name: 'S&P 500', plainLabel: 'Tracks the top 500 US companies' },
  { ticker: 'QQQ', name: 'Nasdaq', plainLabel: 'Tracks the top tech companies' },
  { ticker: 'DIA', name: 'Dow Jones', plainLabel: 'Tracks 30 of the biggest US companies' },
]

export async function GET() {
  try {
    const data = await Promise.all(
      INDICES.map(async idx => {
        const quote = await getGlobalQuote(idx.ticker)
        return { ...idx, ...quote }
      })
    )
    return NextResponse.json({ indices: data }, { headers: { 'Cache-Control': 's-maxage=300' } })
  } catch (err: any) {
    if (err.message === 'RATE_LIMITED') {
      return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 })
    }
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
```

### `/app/api/gainers-losers/route.ts`
```ts
import { NextResponse } from 'next/server'
import { getTopMovers } from '@/lib/alphaVantage'

export async function GET() {
  try {
    const data = await getTopMovers()
    return NextResponse.json(data, { headers: { 'Cache-Control': 's-maxage=300' } })
  } catch (err: any) {
    if (err.message === 'RATE_LIMITED') return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 })
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
```

### `/app/api/stock/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server'
import { getGlobalQuote, getCompanyOverview, getTimeSeries } from '@/lib/alphaVantage'

export async function GET(req: NextRequest) {
  const ticker = req.nextUrl.searchParams.get('ticker')?.toUpperCase()
  const range = req.nextUrl.searchParams.get('range') || '1M'

  if (!ticker) return NextResponse.json({ error: 'ticker required' }, { status: 400 })

  try {
    const [quote, overview, chartData] = await Promise.all([
      getGlobalQuote(ticker),
      getCompanyOverview(ticker),
      getTimeSeries(ticker, range),
    ])
    return NextResponse.json({ quote, overview, chartData })
  } catch (err: any) {
    if (err.message === 'RATE_LIMITED') return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 })
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
```

### `/app/api/stock-search/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server'
import { searchSymbol } from '@/lib/alphaVantage'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  if (!q) return NextResponse.json({ results: [] })
  try {
    const results = await searchSymbol(q)
    return NextResponse.json({ results })
  } catch {
    return NextResponse.json({ results: [] })
  }
}
```

### `/app/api/news/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server'
import yahooFinance from 'yahoo-finance2'
import { simplifyNewsHeadline } from '@/lib/gemini'

// Server-side cache for 30 minutes
let newsCache: { data: any; ts: number } | null = null
const NEWS_TTL = 30 * 60 * 1000

export async function GET(req: NextRequest) {
  const ticker = req.nextUrl.searchParams.get('ticker')

  // Check cache
  if (!ticker && newsCache && Date.now() - newsCache.ts < NEWS_TTL) {
    return NextResponse.json(newsCache.data)
  }

  try {
    let articles: any[] = []

    if (ticker) {
      // News for specific ticker
      const result = await yahooFinance.search(ticker, { newsCount: 6, quotesCount: 0 })
      articles = result.news || []
    } else {
      // General market news
      const result = await yahooFinance.search('market news', { newsCount: 12, quotesCount: 0 })
      articles = result.news || []
    }

    // Simplify headlines with Gemini (batch, limit to 6 to save quota)
    const simplified = await Promise.all(
      articles.slice(0, 6).map(async (article: any) => {
        let simpleSummary = ''
        try {
          simpleSummary = await simplifyNewsHeadline(article.title)
        } catch {
          simpleSummary = 'Read the full article to learn what happened.'
        }
        return {
          id: article.uuid,
          headline: article.title,
          source: article.publisher,
          url: article.link,
          publishedAt: new Date(article.providerPublishTime * 1000).toISOString(),
          relatedTickers: article.relatedTickers || [],
          simpleSummary,
          category: categorize(article.title),
        }
      })
    )

    const response = { articles: simplified }
    if (!ticker) newsCache = { data: response, ts: Date.now() }
    return NextResponse.json(response)
  } catch (err) {
    console.error('News fetch error:', err)
    return NextResponse.json({ articles: [] })
  }
}

function categorize(headline: string): string {
  const h = headline.toLowerCase()
  if (/apple|google|meta|microsoft|amazon|nvidia|ai|tech/.test(h)) return 'tech'
  if (/oil|energy|gas|solar|exxon/.test(h)) return 'energy'
  if (/bank|fed|interest|rate|loan|jpmorgan|goldman/.test(h)) return 'finance'
  if (/inflation|gdp|jobs|economy|recession/.test(h)) return 'economy'
  return 'general'
}
```

### `/app/api/ai-explain/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server'
import { askGemini } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    if (!prompt) return NextResponse.json({ error: 'prompt required' }, { status: 400 })
    const explanation = await askGemini(prompt)
    return NextResponse.json({ explanation })
  } catch {
    return NextResponse.json({ error: 'AI unavailable' }, { status: 500 })
  }
}
```

---

## SECTION 17 — Home Page (`app/page.tsx`) — Full Layout

```tsx
import { Suspense } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import MarketCard from '@/components/market/MarketCard'
import DailyAISummary from '@/components/market/DailyAISummary'
import TrendingTickers from '@/components/market/TrendingTickers'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import GainersLosers from '@/components/market/GainersLosers'

export const metadata = { title: 'Market Dashboard' }

export default function HomePage() {
  return (
    <PageWrapper>
      {/* HERO */}
      <section className="pt-12 pb-10">
        <div className="inline-flex items-center gap-2 bg-citrus/10 border border-citrus/20 rounded-full px-3 py-1 mb-5">
          <span className="w-1.5 h-1.5 bg-citrus rounded-full animate-pulse" />
          <span className="font-jakarta font-semibold text-citrus text-xs">Markets Open</span>
        </div>
        <h1 className="font-syne font-black text-4xl md:text-5xl text-text-primary leading-tight mb-3">
          The stock market,<br />
          <span className="text-citrus">finally explained.</span>
        </h1>
        <p className="font-jakarta text-text-secondary text-lg max-w-lg">
          Real market data. Plain English. No finance degree required.
        </p>
      </section>

      {/* MARKET SUMMARY */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <p className="font-jakarta font-semibold text-xs tracking-widest uppercase text-text-muted">Today's Markets</p>
        </div>
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0,1,2].map(i => <SkeletonCard key={i} />)}
          </div>
        }>
          <MarketSummaryRow />
        </Suspense>
      </section>

      {/* AI DAILY SUMMARY */}
      <section className="mb-10">
        <DailyAISummary />
      </section>

      {/* GAINERS & LOSERS */}
      <section className="mb-10">
        <p className="font-jakarta font-semibold text-xs tracking-widest uppercase text-text-muted mb-4">
          Today's Big Movers
        </p>
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonCard className="h-64" />
            <SkeletonCard className="h-64" />
          </div>
        }>
          <GainersLosers />
        </Suspense>
      </section>

      {/* TRENDING */}
      <section className="mb-12">
        <p className="font-jakarta font-semibold text-xs tracking-widest uppercase text-text-muted mb-4">
          Trending Right Now
        </p>
        <TrendingTickers />
      </section>
    </PageWrapper>
  )
}

// Server component that fetches market summary
async function MarketSummaryRow() {
  let indices = []
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/market-summary`, {
      next: { revalidate: 300 }
    })
    const data = await res.json()
    indices = data.indices || []
  } catch {}

  if (indices.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0,1,2].map(i => <SkeletonCard key={i} />)}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {indices.map((index: any) => <MarketCard key={index.ticker} {...index} />)}
    </div>
  )
}
```

---

## SECTION 18 — MarketCard Component (`components/market/MarketCard.tsx`)

```tsx
import Link from 'next/link'
import { formatPrice, formatChange, formatPercent, getChangeColor, getChangeBg, getChangeArrow } from '@/lib/formatters'

interface Props {
  name: string
  ticker: string
  price: number
  change: number
  changePercent: number
  plainLabel: string
}

export default function MarketCard({ name, ticker, price, change, changePercent, plainLabel }: Props) {
  const isUp = change >= 0
  const color = getChangeColor(change)
  const bg = getChangeBg(change)
  const arrow = getChangeArrow(change)

  return (
    <Link href={`/stock/${ticker}`}
      className="bg-card rounded-2xl border border-white/[0.06] p-5 hover:border-white/[0.12] hover:bg-[#22222A] transition-all duration-200 group block">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-jakarta font-semibold text-xs tracking-widest uppercase text-text-muted">{name}</p>
          <p className="font-jakarta text-xs text-text-muted mt-1">{plainLabel}</p>
        </div>
        <span className={`font-mono font-semibold text-xs px-2.5 py-1.5 rounded-lg ${bg} ${color}`}>
          {arrow} {formatPercent(changePercent)}
        </span>
      </div>

      {/* Price */}
      <div>
        <p className="font-mono font-semibold text-2xl text-text-primary">{formatPrice(price)}</p>
        <p className={`font-mono text-sm mt-1 ${color}`}>
          {arrow} {formatChange(change)} today
        </p>
      </div>

      {/* Mini indicator bar */}
      <div className="mt-4 h-1 bg-white/[0.05] rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${isUp ? 'bg-up' : 'bg-down'}`}
          style={{ width: `${Math.min(Math.abs(changePercent) * 20, 100)}%` }} />
      </div>
    </Link>
  )
}
```

---

## SECTION 19 — DailyAISummary Component (`components/market/DailyAISummary.tsx`)

```tsx
'use client'
import { useEffect, useState } from 'react'
import { Sparkles, RefreshCw } from 'lucide-react'
import { getCachedAISummary, setCachedAISummary } from '@/lib/localStorage'

export default function DailyAISummary() {
  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchSummary = async (force = false) => {
    // Check localStorage cache first (unless forced)
    if (!force) {
      const cached = getCachedAISummary()
      if (cached) { setSummary(cached); setLoading(false); return }
    }

    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/ai-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Write a 3-sentence summary of today's US stock market for a middle school student.
          Include: how the S&P 500 is doing today, one sector that did well or poorly, and why it matters to regular people.
          Keep it under 70 words. Use simple language — no jargon.`
        })
      })
      const data = await res.json()
      if (data.explanation) {
        setSummary(data.explanation)
        setCachedAISummary(data.explanation)
      } else setError(true)
    } catch { setError(true) }
    setLoading(false)
  }

  useEffect(() => { fetchSummary() }, [])

  return (
    <div className="bg-card border border-citrus/20 rounded-2xl p-5 relative overflow-hidden">
      {/* Citrus glow background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-citrus/[0.04] rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-citrus/10 rounded-lg flex items-center justify-center">
            <Sparkles size={14} className="text-citrus" />
          </div>
          <p className="font-jakarta font-semibold text-xs tracking-widest uppercase text-citrus">
            Today in Plain English
          </p>
        </div>
        <button onClick={() => fetchSummary(true)}
          className="text-text-muted hover:text-citrus transition-colors p-1"
          title="Refresh summary">
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-4 bg-white/[0.06] rounded w-full" />
          <div className="h-4 bg-white/[0.06] rounded w-5/6" />
          <div className="h-4 bg-white/[0.06] rounded w-4/6" />
        </div>
      ) : error ? (
        <p className="font-jakarta text-text-secondary text-sm">
          AI summary unavailable right now. Check back in a moment.
        </p>
      ) : (
        <p className="font-jakarta text-text-primary text-sm leading-relaxed">{summary}</p>
      )}

      <p className="font-jakarta text-xs text-text-muted mt-3">
        ✦ Generated by AI — not financial advice
      </p>
    </div>
  )
}
```

---

## SECTION 20 — Stock Page (`app/stock/[ticker]/page.tsx`)

```tsx
import { Suspense } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import StockHeader from '@/components/stock/StockHeader'
import StockChart from '@/components/stock/StockChart'
import StockStats from '@/components/stock/StockStats'
import AIExplainer from '@/components/stock/AIExplainer'
import RelatedNews from '@/components/stock/RelatedNews'
import WatchlistButton from '@/components/watchlist/WatchlistButton'
import { SkeletonCard, SkeletonChart } from '@/components/ui/SkeletonCard'
import { notFound } from 'next/navigation'

interface Props { params: { ticker: string } }

export async function generateMetadata({ params }: Props) {
  return { title: params.ticker.toUpperCase() }
}

export default async function StockPage({ params }: Props) {
  const ticker = params.ticker.toUpperCase()

  let stockData: any = null
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/stock?ticker=${ticker}&range=1M`,
      { next: { revalidate: 60 } }
    )
    stockData = await res.json()
    if (stockData.error === 'RATE_LIMITED') stockData = null
  } catch {}

  if (!stockData?.quote) return notFound()

  const { quote, overview, chartData } = stockData

  return (
    <PageWrapper>
      {/* Back link */}
      <a href="/" className="inline-flex items-center gap-1.5 text-text-muted text-sm font-jakarta hover:text-text-primary mb-6 transition-colors">
        ← Back to Dashboard
      </a>

      {/* Header + Watchlist */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <StockHeader quote={quote} overview={overview} />
        <WatchlistButton ticker={ticker} />
      </div>

      {/* AI Explainer */}
      <div className="mb-6">
        <AIExplainer ticker={ticker} companyName={overview.companyName} changePercent={quote.changePercent} />
      </div>

      {/* Chart */}
      <div className="mb-6">
        <StockChart ticker={ticker} initialData={chartData} initialRange="1M" />
      </div>

      {/* Stats Grid */}
      <div className="mb-6">
        <StockStats overview={overview} />
      </div>

      {/* Related News */}
      <div className="mb-10">
        <p className="font-jakarta font-semibold text-xs tracking-widest uppercase text-text-muted mb-4">
          Related News
        </p>
        <Suspense fallback={<SkeletonCard />}>
          <RelatedNews ticker={ticker} />
        </Suspense>
      </div>
    </PageWrapper>
  )
}
```

---

## SECTION 21 — StockChart Component (`components/stock/StockChart.tsx`)

```tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { createChart, ColorType, LineStyle } from 'lightweight-charts'
import type { ChartRange, ChartType, ChartDataPoint } from '@/lib/types'
import { SkeletonChart } from '@/components/ui/SkeletonCard'

const RANGES: ChartRange[] = ['1D', '1W', '1M', '3M', '1Y']

interface Props {
  ticker: string
  initialData: ChartDataPoint[]
  initialRange: ChartRange
}

export default function StockChart({ ticker, initialData, initialRange }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<any>(null)
  const seriesRef = useRef<any>(null)

  const [range, setRange] = useState<ChartRange>(initialRange)
  const [chartType, setChartType] = useState<ChartType>('line')
  const [data, setData] = useState<ChartDataPoint[]>(initialData)
  const [loading, setLoading] = useState(false)

  // Init chart
  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: { background: { type: ColorType.Solid, color: 'transparent' }, textColor: '#A0A0B0' },
      grid: { vertLines: { color: 'rgba(255,255,255,0.04)' }, horzLines: { color: 'rgba(255,255,255,0.04)' } },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: 'rgba(255,255,255,0.08)' },
      timeScale: { borderColor: 'rgba(255,255,255,0.08)', timeVisible: true },
      handleScroll: { mouseWheel: false },
      width: chartContainerRef.current.clientWidth,
      height: 280,
    })

    chartRef.current = chart

    // Determine if price went up over period
    const isUp = data.length > 0 && data[data.length - 1].close >= data[0].close
    const lineColor = isUp ? '#22C55E' : '#EF4444'

    if (chartType === 'line') {
      const series = chart.addLineSeries({
        color: lineColor,
        lineWidth: 2,
        crosshairMarkerVisible: true,
        lastValueVisible: true,
        priceLineVisible: false,
      })
      series.setData(data.map(d => ({ time: d.time, value: d.close })))
      seriesRef.current = series
    } else {
      const series = chart.addCandlestickSeries({
        upColor: '#22C55E', downColor: '#EF4444',
        borderUpColor: '#22C55E', borderDownColor: '#EF4444',
        wickUpColor: '#22C55E', wickDownColor: '#EF4444',
      })
      series.setData(data.map(d => ({ time: d.time, open: d.open, high: d.high, low: d.low, close: d.close })))
      seriesRef.current = series
    }

    chart.timeScale().fitContent()

    const resizeObserver = new ResizeObserver(() => {
      if (chartContainerRef.current) chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    })
    resizeObserver.observe(chartContainerRef.current)

    return () => { chart.remove(); resizeObserver.disconnect() }
  }, [data, chartType])

  // Fetch new data when range changes
  const changeRange = async (newRange: ChartRange) => {
    setRange(newRange)
    setLoading(true)
    try {
      const res = await fetch(`/api/stock?ticker=${ticker}&range=${newRange}`)
      const result = await res.json()
      if (result.chartData) setData(result.chartData)
    } catch {}
    setLoading(false)
  }

  return (
    <div className="bg-card rounded-2xl border border-white/[0.06] p-5">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        {/* Range tabs */}
        <div className="flex gap-1">
          {RANGES.map(r => (
            <button key={r} onClick={() => changeRange(r)}
              className={`px-3 py-1.5 rounded-lg font-mono font-semibold text-xs transition-all ${
                range === r
                  ? 'bg-citrus text-base'
                  : 'text-text-muted hover:text-text-primary hover:bg-white/[0.05]'
              }`}>
              {r}
            </button>
          ))}
        </div>
        {/* Chart type toggle */}
        <div className="flex gap-1 bg-white/[0.04] rounded-lg p-1">
          {(['line', 'candlestick'] as ChartType[]).map(t => (
            <button key={t} onClick={() => setChartType(t)}
              className={`px-3 py-1 rounded-md font-jakarta text-xs font-semibold capitalize transition-all ${
                chartType === t ? 'bg-white/[0.10] text-text-primary' : 'text-text-muted'
              }`}>
              {t === 'line' ? 'Line' : 'Candle'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart container */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-card/80 backdrop-blur-sm rounded-xl z-10 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-citrus border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <div ref={chartContainerRef} />
      </div>
    </div>
  )
}
```

---

## SECTION 22 — StockStats Grid (`components/stock/StockStats.tsx`)

```tsx
import GlossaryTooltip from '@/components/ui/GlossaryTooltip'
import type { StockOverview } from '@/lib/types'
import { formatMarketCap, formatPrice, formatVolume } from '@/lib/formatters'

interface Props { overview: StockOverview }

export default function StockStats({ overview }: Props) {
  const stats = [
    {
      label: 'Company Size',
      value: formatMarketCap(overview.marketCap),
      term: 'Market Cap',
      definition: 'Market cap is the total dollar value of a company — how much it would cost to buy every single share of stock.',
      example: 'Think of it like: if the company were a house, market cap is the price tag on the whole house.',
    },
    {
      label: 'Price vs Earnings',
      value: overview.peRatio ? overview.peRatio.toFixed(1) : 'N/A',
      term: 'P/E Ratio',
      definition: 'The P/E ratio shows how much investors pay for every $1 a company earns. A high P/E means people expect it to grow a lot.',
      example: 'Think of it like: if a lemonade stand earns $10/day and someone offers to buy it for $200, that\'s a P/E of 20.',
    },
    {
      label: 'Highest Price This Year',
      value: formatPrice(overview.week52High),
      term: '52-Week High',
      definition: 'The most expensive this stock has been in the past 12 months.',
      example: 'Think of it like: the peak price on a rollercoaster ride over the past year.',
    },
    {
      label: 'Lowest Price This Year',
      value: formatPrice(overview.week52Low),
      term: '52-Week Low',
      definition: 'The cheapest this stock has been in the past 12 months.',
      example: 'Think of it like: the lowest dip on the rollercoaster. If the stock is near this number, it might be "on sale."',
    },
    {
      label: 'Shares Traded Today',
      value: formatVolume(overview.avgVolume),
      term: 'Volume',
      definition: 'Volume is how many shares of this stock were bought or sold today. High volume means lots of people are active.',
      example: 'Think of it like: how busy a store is. High volume = packed store. Low volume = nearly empty.',
    },
    {
      label: 'Money Back %',
      value: overview.dividendYield ? `${overview.dividendYield.toFixed(2)}%` : 'None',
      term: 'Dividend Yield',
      definition: 'Some companies pay you money just for owning their stock. Dividend yield shows how much they pay per year as a percentage.',
      example: 'Think of it like: a landlord who pays you rent for owning the building. The dividend is your rent.',
    },
  ]

  return (
    <div className="bg-card rounded-2xl border border-white/[0.06] p-5">
      <p className="font-jakarta font-semibold text-xs tracking-widest uppercase text-text-muted mb-4">
        Key Numbers
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map(stat => (
          <div key={stat.term} className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.04]">
            <div className="flex items-center gap-1 mb-2">
              <p className="font-jakarta text-xs text-text-muted">{stat.label}</p>
              <GlossaryTooltip term={stat.term} definition={stat.definition} example={stat.example} />
            </div>
            <p className="font-mono font-semibold text-lg text-text-primary">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## SECTION 23 — Glossary Data (`lib/glossary.ts`) — 40 Terms

```ts
import type { GlossaryTerm } from './types'

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'stock', term: 'Stock', category: 'stocks', emoji: '📈',
    definition: 'A small piece of ownership in a company. When you buy a stock, you own a tiny slice of that business.',
    example: 'Think of it like: if a pizza is a company, buying a stock is like buying one slice.',
  },
  {
    id: 'share', term: 'Share', category: 'stocks', emoji: '🧩',
    definition: 'One unit of stock. When a company splits ownership into pieces, each piece is called a share.',
    example: 'Think of it like: one piece in a puzzle. The whole puzzle is the company.',
  },
  {
    id: 'dividend', term: 'Dividend', category: 'stocks', emoji: '💰',
    definition: 'Money a company pays to stockholders just for owning their stock, usually every 3 months.',
    example: 'Think of it like: a landlord paying you rent because you own part of the building.',
  },
  {
    id: 'market-cap', term: 'Market Cap', category: 'numbers', emoji: '🏷️',
    definition: 'The total dollar value of all a company\'s shares combined — basically its price tag.',
    example: 'Think of it like: the sticker price on the entire company, not just one share.',
  },
  {
    id: 'pe-ratio', term: 'P/E Ratio', category: 'numbers', emoji: '🔢',
    definition: 'Price-to-Earnings ratio — how much investors pay for every $1 a company earns. High P/E means high expectations.',
    example: 'Think of it like: paying $30 for a lemonade stand that earns $1/day — P/E of 30.',
  },
  {
    id: 'bull-market', term: 'Bull Market', category: 'markets', emoji: '🐂',
    definition: 'When stock prices are going up for a long time and investors feel confident.',
    example: 'Think of it like: a bull thrusts its horns UP — prices going up.',
  },
  {
    id: 'bear-market', term: 'Bear Market', category: 'markets', emoji: '🐻',
    definition: 'When stock prices fall 20% or more from recent highs and investors feel scared.',
    example: 'Think of it like: a bear swipes its claws DOWN — prices going down.',
  },
  {
    id: 'ipo', term: 'IPO', category: 'stocks', emoji: '🚀',
    definition: 'Initial Public Offering — the first time a private company sells its stock to regular people on the stock market.',
    example: 'Think of it like: a restaurant that was family-only opening its doors to the public for the first time.',
  },
  {
    id: 'index', term: 'Index', category: 'markets', emoji: '📊',
    definition: 'A measurement that tracks a group of stocks together to show how the overall market is doing.',
    example: 'Think of it like: a class average. Instead of one student\'s grade, it shows how the whole class did.',
  },
  {
    id: 'etf', term: 'ETF', category: 'basics', emoji: '🗂️',
    definition: 'Exchange-Traded Fund — a bundle of many stocks that you can buy as if it were one stock.',
    example: 'Think of it like: buying a variety pack of chips instead of picking one flavor.',
  },
  {
    id: 'portfolio', term: 'Portfolio', category: 'basics', emoji: '💼',
    definition: 'All the investments a person owns put together — their collection of stocks, ETFs, and other assets.',
    example: 'Think of it like: your investment backpack. Everything you own is inside it.',
  },
  {
    id: 'broker', term: 'Broker', category: 'basics', emoji: '🤝',
    definition: 'A platform or person that lets you buy and sell stocks. Apps like Robinhood or Fidelity are brokers.',
    example: 'Think of it like: a middleman at a farmers market who handles your transactions.',
  },
  {
    id: 'volume', term: 'Volume', category: 'numbers', emoji: '📦',
    definition: 'The number of shares bought and sold in a given day. High volume means lots of trading activity.',
    example: 'Think of it like: foot traffic in a store. High volume = packed. Low volume = empty.',
  },
  {
    id: 'volatility', term: 'Volatility', category: 'numbers', emoji: '🎢',
    definition: 'How much a stock\'s price jumps around. High volatility = big swings up and down. Low volatility = steady.',
    example: 'Think of it like: a rollercoaster (high volatility) vs. an escalator (low volatility).',
  },
  {
    id: '52wk-high', term: '52-Week High', category: 'numbers', emoji: '⛰️',
    definition: 'The highest price a stock has reached in the last 12 months.',
    example: 'Think of it like: the highest point on a hike over the past year.',
  },
  {
    id: '52wk-low', term: '52-Week Low', category: 'numbers', emoji: '🕳️',
    definition: 'The lowest price a stock has reached in the last 12 months.',
    example: 'Think of it like: the lowest valley on that same hike. Some people buy stocks near their lows hoping they bounce back.',
  },
  {
    id: 'earnings', term: 'Earnings', category: 'numbers', emoji: '🧾',
    definition: 'How much profit a company made in a set period (usually 3 months). Companies report earnings 4 times a year.',
    example: 'Think of it like: a report card for the company\'s money — did it make more than it spent?',
  },
  {
    id: 'revenue', term: 'Revenue', category: 'numbers', emoji: '💵',
    definition: 'The total amount of money a company brings in from selling its products or services, before paying any expenses.',
    example: 'Think of it like: all the money your lemonade stand collected — before buying more lemons.',
  },
  {
    id: 'profit', term: 'Profit', category: 'numbers', emoji: '✅',
    definition: 'What\'s left after a company pays all its bills. Revenue minus expenses equals profit.',
    example: 'Think of it like: what you actually keep from the lemonade stand after buying supplies.',
  },
  {
    id: 'inflation', term: 'Inflation', category: 'markets', emoji: '🎈',
    definition: 'When prices of things (food, gas, rent) rise over time, which means your money buys less.',
    example: 'Think of it like: a $1 candy bar slowly costing $1.25 a few years later.',
  },
  {
    id: 'interest-rate', term: 'Interest Rate', category: 'markets', emoji: '🏦',
    definition: 'The percentage the government charges banks to borrow money. It affects everything from loans to the stock market.',
    example: 'Think of it like: the price of borrowing money. High rates = expensive loans = people spend less.',
  },
  {
    id: 'sp500', term: 'S&P 500', category: 'markets', emoji: '🇺🇸',
    definition: 'A list of the 500 biggest US companies by market cap. It\'s the most watched stock index in the world.',
    example: 'Think of it like: the top 500 players in the US business league.',
  },
  {
    id: 'nasdaq', term: 'Nasdaq', category: 'markets', emoji: '💻',
    definition: 'A stock exchange known for tech companies. The Nasdaq Composite tracks over 3,000 stocks listed there.',
    example: 'Think of it like: the tech school of stock exchanges — Apple, Google, and Meta all live here.',
  },
  {
    id: 'dow', term: 'Dow Jones', category: 'markets', emoji: '🏛️',
    definition: 'An index tracking 30 of the most important US companies. One of the oldest stock market measures.',
    example: 'Think of it like: the Hall of Fame for US companies — only the most established get in.',
  },
  {
    id: 'blue-chip', term: 'Blue Chip Stock', category: 'stocks', emoji: '💎',
    definition: 'Stock of a very large, stable, well-known company that has been around for a long time.',
    example: 'Think of it like: in poker, blue chips are worth the most. Blue chip stocks are the safest, most valuable companies.',
  },
  {
    id: 'penny-stock', term: 'Penny Stock', category: 'stocks', emoji: '🪙',
    definition: 'A very cheap stock (usually under $5) from a small or struggling company. Very risky.',
    example: 'Think of it like: buying a ticket to an unknown band. Could blow up — or might just be bad.',
  },
  {
    id: 'short-selling', term: 'Short Selling', category: 'basics', emoji: '📉',
    definition: 'Borrowing a stock and selling it, hoping the price drops so you can buy it back cheaper and keep the difference.',
    example: 'Think of it like: borrowing your friend\'s sneakers, selling them for $100, waiting for the price to drop to $60, buying them back, and pocketing $40.',
  },
  {
    id: 'options', term: 'Options', category: 'basics', emoji: '🎫',
    definition: 'A contract giving you the right to buy or sell a stock at a set price before a certain date. Very complex — high risk.',
    example: 'Think of it like: a coupon that lets you buy something at yesterday\'s price, even if it costs more today.',
  },
  {
    id: 'bonds', term: 'Bonds', category: 'basics', emoji: '📜',
    definition: 'When you lend money to a company or government, they give you a bond — a promise to pay you back with interest.',
    example: 'Think of it like: giving your friend $100 and they promise to pay you back $110 in a year.',
  },
  {
    id: 'yield', term: 'Yield', category: 'numbers', emoji: '🌾',
    definition: 'How much income an investment produces per year, shown as a percentage.',
    example: 'Think of it like: how much your investment "harvests" each year — like crop yield on a farm.',
  },
  {
    id: 'bid-ask', term: 'Bid & Ask', category: 'markets', emoji: '↔️',
    definition: 'The bid is the highest price a buyer will pay. The ask is the lowest price a seller will accept. Trades happen when they match.',
    example: 'Think of it like: haggling at a garage sale. Buyer offers $5 (bid), seller wants $7 (ask). Deal happens somewhere in between.',
  },
  {
    id: 'diversification', term: 'Diversification', category: 'basics', emoji: '🌈',
    definition: 'Spreading investments across many different stocks or assets so one bad investment doesn\'t wipe you out.',
    example: 'Think of it like: not putting all your eggs in one basket.',
  },
  {
    id: 'sector', term: 'Sector', category: 'markets', emoji: '🏭',
    definition: 'A group of companies that do similar things. Examples: Technology, Healthcare, Energy, Finance.',
    example: 'Think of it like: different departments in a mall — tech is the electronics store, healthcare is the pharmacy.',
  },
  {
    id: 'recession', term: 'Recession', category: 'markets', emoji: '😬',
    definition: 'When the economy shrinks for at least two quarters (6 months) in a row. Usually comes with more unemployment.',
    example: 'Think of it like: the whole economy catching a cold — fewer jobs, less spending, slower growth.',
  },
  {
    id: 'bull-run', term: 'Bull Run', category: 'markets', emoji: '🏃',
    definition: 'An extended period where stock prices keep rising, often driven by investor excitement.',
    example: 'Think of it like: a hot streak in sports — everything is clicking and going up.',
  },
  {
    id: 'correction', term: 'Market Correction', category: 'markets', emoji: '📐',
    definition: 'When stock prices drop 10–20% from a recent high. It\'s normal and happens regularly.',
    example: 'Think of it like: a balloon that got too big letting out a little air — not popping, just adjusting.',
  },
  {
    id: 'roe', term: 'ROE', category: 'numbers', emoji: '🔄',
    definition: 'Return on Equity — how efficiently a company uses shareholder money to make profit. Higher is better.',
    example: 'Think of it like: how much profit a business squeezes from every dollar investors gave it.',
  },
  {
    id: 'eps', term: 'EPS', category: 'numbers', emoji: '🍰',
    definition: 'Earnings Per Share — how much profit the company made divided by the number of shares. Higher EPS = more profitable.',
    example: 'Think of it like: splitting a pizza. EPS shows your slice size — how much profit each share "owns."',
  },
  {
    id: 'day-trading', term: 'Day Trading', category: 'basics', emoji: '⚡',
    definition: 'Buying and selling stocks within the same day to profit from short-term price moves. Very risky.',
    example: 'Think of it like: flipping sneakers in one day — buy in the morning, sell in the afternoon, hope you made money.',
  },
  {
    id: 'candlestick', term: 'Candlestick Chart', category: 'basics', emoji: '🕯️',
    definition: 'A type of chart that shows the open, high, low, and close price of a stock for each time period.',
    example: 'Think of it like: a scorecard for each moment in the day — where the stock started, how high it went, how low, and where it ended.',
  },
]
```

---

## SECTION 24 — NewsCard Component (`components/news/NewsCard.tsx`)

```tsx
import { ExternalLink } from 'lucide-react'
import type { NewsArticle } from '@/lib/types'
import { formatRelativeTime } from '@/lib/formatters'

interface Props { article: NewsArticle }

const CATEGORY_STYLES: Record<string, string> = {
  tech: 'bg-blue-500/10 text-blue-400',
  energy: 'bg-green-500/10 text-green-400',
  finance: 'bg-yellow-500/10 text-yellow-400',
  economy: 'bg-purple-500/10 text-purple-400',
  general: 'bg-white/[0.06] text-text-muted',
}

export default function NewsCard({ article }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-white/[0.06] p-5 hover:border-white/[0.12] hover:bg-[#22222A] transition-all duration-200 flex flex-col gap-3">
      {/* Top row: source + time + category */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-jakarta font-semibold text-xs text-text-muted">{article.source}</span>
        <span className="text-text-muted text-xs">·</span>
        <span className="font-jakarta text-xs text-text-muted">{formatRelativeTime(article.publishedAt)}</span>
        <span className={`ml-auto font-jakarta font-semibold text-xs px-2 py-0.5 rounded-full capitalize ${CATEGORY_STYLES[article.category]}`}>
          {article.category}
        </span>
      </div>

      {/* Headline */}
      <h3 className="font-syne font-bold text-sm text-text-primary leading-snug line-clamp-2">
        {article.headline}
      </h3>

      {/* Plain English summary */}
      <div className="bg-citrus/[0.05] border border-citrus/[0.10] rounded-xl p-3">
        <p className="font-jakarta text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">✦ Plain English</p>
        <p className="font-jakarta text-sm text-text-secondary leading-relaxed">{article.simpleSummary}</p>
      </div>

      {/* Footer: tickers + read more */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-1 flex-wrap">
          {article.relatedTickers.slice(0, 3).map(t => (
            <a key={t} href={`/stock/${t}`}
              className="font-mono text-xs font-semibold bg-white/[0.05] hover:bg-citrus/10 hover:text-citrus px-2 py-0.5 rounded-md transition-colors">
              {t}
            </a>
          ))}
        </div>
        <a href={article.url} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-jakarta font-semibold text-text-muted hover:text-citrus transition-colors">
          Full story <ExternalLink size={11} />
        </a>
      </div>
    </div>
  )
}
```

---

## SECTION 25 — Learn / Glossary Page (`app/learn/page.tsx`)

```tsx
'use client'
import { useState, useMemo } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import GlossaryCard from '@/components/learn/GlossaryCard'
import { glossaryTerms } from '@/lib/glossary'
import { Search } from 'lucide-react'

const CATEGORIES = ['all', 'stocks', 'markets', 'numbers', 'basics'] as const

export default function LearnPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('all')

  const filtered = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = !query || 
        term.term.toLowerCase().includes(query.toLowerCase()) ||
        term.definition.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'all' || term.category === category
      return matchesSearch && matchesCategory
    })
  }, [query, category])

  return (
    <PageWrapper>
      {/* Header */}
      <div className="pt-8 pb-10">
        <p className="font-jakarta font-semibold text-xs tracking-widest uppercase text-citrus mb-3">Finance 101</p>
        <h1 className="font-syne font-black text-4xl text-text-primary mb-3">
          Words, explained.
        </h1>
        <p className="font-jakarta text-text-secondary text-lg max-w-lg">
          Every finance term you'll ever see on Finplain, explained like you're in 7th grade.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="Search any term..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full bg-card border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 font-jakarta text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-citrus/40 transition-all"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full font-jakarta font-semibold text-sm capitalize transition-all ${
              category === cat
                ? 'bg-citrus text-base'
                : 'bg-card border border-white/[0.08] text-text-muted hover:text-text-primary hover:border-white/[0.16]'
            }`}>
            {cat === 'all' ? `All (${glossaryTerms.length})` : cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      {query && (
        <p className="font-jakarta text-sm text-text-muted mb-4">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{query}"
        </p>
      )}

      {/* Glossary grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-16">
        {filtered.map((term, i) => (
          <GlossaryCard key={term.id} term={term} style={{ animationDelay: `${i * 30}ms` }} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-16">
            <p className="font-syne font-bold text-xl text-text-muted mb-2">No matches</p>
            <p className="font-jakarta text-text-muted text-sm">Try a different search term</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
```

---

## SECTION 26 — GlossaryCard Component (`components/learn/GlossaryCard.tsx`)

```tsx
import type { GlossaryTerm } from '@/lib/types'

const CATEGORY_COLORS: Record<string, string> = {
  stocks: 'bg-blue-500/10 text-blue-400',
  markets: 'bg-green-500/10 text-green-400',
  numbers: 'bg-yellow-500/10 text-yellow-400',
  basics: 'bg-purple-500/10 text-purple-400',
}

interface Props {
  term: GlossaryTerm
  style?: React.CSSProperties
}

export default function GlossaryCard({ term, style }: Props) {
  return (
    <div
      className="bg-card rounded-2xl border border-white/[0.06] p-5 hover:border-white/[0.12] hover:bg-[#22222A] transition-all duration-200 animate-fade-up opacity-0 fill-mode-forwards"
      style={style}
    >
      <div className="flex items-start gap-4">
        {/* Emoji circle */}
        <div className="w-11 h-11 bg-citrus/10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
          {term.emoji}
        </div>

        <div className="flex-1 min-w-0">
          {/* Term + category */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className="font-syne font-bold text-base text-text-primary">{term.term}</h3>
            <span className={`font-jakarta font-semibold text-xs px-2 py-0.5 rounded-full capitalize ${CATEGORY_COLORS[term.category]}`}>
              {term.category}
            </span>
          </div>

          {/* Definition */}
          <p className="font-jakarta text-sm text-text-secondary leading-relaxed mb-2">
            {term.definition}
          </p>

          {/* Example */}
          <p className="font-jakarta text-xs text-text-muted italic leading-relaxed">
            {term.example}
          </p>
        </div>
      </div>
    </div>
  )
}
```

---

## SECTION 27 — Watchlist Page (`app/watchlist/page.tsx`)

```tsx
'use client'
import { useEffect, useState } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import WatchlistRow from '@/components/watchlist/WatchlistRow'
import { getWatchlist } from '@/lib/localStorage'
import { Star, Search } from 'lucide-react'
import Link from 'next/link'

export default function WatchlistPage() {
  const [tickers, setTickers] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTickers(getWatchlist())
    setLoaded(true)
  }, [])

  const handleRemove = (ticker: string) => {
    setTickers(prev => prev.filter(t => t !== ticker))
  }

  if (!loaded) return null

  return (
    <PageWrapper>
      <div className="pt-8 pb-10">
        <p className="font-jakarta font-semibold text-xs tracking-widest uppercase text-citrus mb-3">My Stocks</p>
        <h1 className="font-syne font-black text-4xl text-text-primary mb-3">Watchlist</h1>
        <p className="font-jakarta text-text-secondary">
          Stocks you're keeping an eye on. {tickers.length > 0 && `${tickers.length} stock${tickers.length !== 1 ? 's' : ''} tracked.`}
        </p>
      </div>

      {tickers.length === 0 ? (
        // Empty state
        <div className="text-center py-20 bg-card rounded-2xl border border-white/[0.06]">
          <div className="w-16 h-16 bg-citrus/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Star size={24} className="text-citrus" />
          </div>
          <h2 className="font-syne font-bold text-xl text-text-primary mb-2">Nothing here yet</h2>
          <p className="font-jakarta text-text-muted text-sm mb-6 max-w-xs mx-auto">
            Search for a stock and hit "Add to Watchlist" to track it here.
          </p>
          <Link href="/"
            className="inline-flex items-center gap-2 bg-citrus text-base font-jakarta font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-citrus-dim transition-colors">
            <Search size={14} />
            Find Stocks
          </Link>
        </div>
      ) : (
        // Watchlist items
        <div className="space-y-3 pb-16">
          {tickers.map(ticker => (
            <WatchlistRow key={ticker} ticker={ticker} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </PageWrapper>
  )
}
```

---

## SECTION 28 — WatchlistRow Component (`components/watchlist/WatchlistRow.tsx`)

```tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react'
import { removeFromWatchlist } from '@/lib/localStorage'
import { formatPrice, formatPercent } from '@/lib/formatters'

interface Props { ticker: string; onRemove: (ticker: string) => void }

export default function WatchlistRow({ ticker, onRemove }: Props) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/stock?ticker=${ticker}&range=1W`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [ticker])

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    removeFromWatchlist(ticker)
    onRemove(ticker)
  }

  const isUp = data?.quote?.changePercent >= 0

  if (loading) {
    return (
      <div className="bg-card rounded-2xl border border-white/[0.06] p-4 animate-pulse flex items-center gap-4">
        <div className="w-10 h-10 bg-white/[0.06] rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/[0.06] rounded w-1/4" />
          <div className="h-3 bg-white/[0.04] rounded w-1/3" />
        </div>
        <div className="h-6 bg-white/[0.06] rounded w-20" />
      </div>
    )
  }

  return (
    <Link href={`/stock/${ticker}`}
      className="bg-card rounded-2xl border border-white/[0.06] p-4 hover:border-white/[0.12] hover:bg-[#22222A] transition-all duration-200 flex items-center gap-4 group">
      
      {/* Ticker circle */}
      <div className="w-10 h-10 bg-citrus/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <span className="font-mono font-bold text-xs text-citrus">
          {ticker.slice(0, 2)}
        </span>
      </div>

      {/* Name + ticker */}
      <div className="flex-1 min-w-0">
        <p className="font-mono font-semibold text-sm text-text-primary">{ticker}</p>
        <p className="font-jakarta text-xs text-text-muted truncate">
          {data?.overview?.companyName || 'Loading...'}
        </p>
      </div>

      {/* Price + change */}
      {data?.quote && (
        <div className="text-right">
          <p className="font-mono font-semibold text-sm text-text-primary">
            {formatPrice(data.quote.price)}
          </p>
          <p className={`font-mono text-xs ${isUp ? 'text-up' : 'text-down'}`}>
            {isUp ? '▲' : '▼'} {formatPercent(Math.abs(data.quote.changePercent))}
          </p>
        </div>
      )}

      {/* Remove button */}
      <button
        onClick={handleRemove}
        className="p-2 text-text-muted hover:text-down opacity-0 group-hover:opacity-100 transition-all"
        title="Remove from watchlist"
      >
        <Trash2 size={15} />
      </button>
    </Link>
  )
}
```

---

## SECTION 29 — TrendingTickers Component (`components/market/TrendingTickers.tsx`)

```tsx
'use client'
import Link from 'next/link'

const TRENDING = [
  { ticker: 'AAPL', label: 'Apple' },
  { ticker: 'TSLA', label: 'Tesla' },
  { ticker: 'NVDA', label: 'Nvidia' },
  { ticker: 'AMZN', label: 'Amazon' },
  { ticker: 'MSFT', label: 'Microsoft' },
  { ticker: 'META', label: 'Meta' },
  { ticker: 'GOOGL', label: 'Google' },
  { ticker: 'AMD', label: 'AMD' },
  { ticker: 'SPY', label: 'S&P 500 ETF' },
  { ticker: 'QQQ', label: 'Nasdaq ETF' },
]

export default function TrendingTickers() {
  return (
    <div className="flex flex-wrap gap-2">
      {TRENDING.map((stock, i) => (
        <Link
          key={stock.ticker}
          href={`/stock/${stock.ticker}`}
          className="group flex items-center gap-2 bg-card border border-white/[0.06] hover:border-citrus/30 hover:bg-citrus/[0.05] px-4 py-2.5 rounded-xl transition-all duration-200"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <span className="font-mono font-bold text-sm text-text-primary group-hover:text-citrus transition-colors">
            {stock.ticker}
          </span>
          <span className="font-jakarta text-xs text-text-muted">{stock.label}</span>
        </Link>
      ))}
    </div>
  )
}
```

---

## SECTION 30 — Error & Rate Limit Handling

### RateLimitError Component
```tsx
// components/ui/ErrorState.tsx
import { AlertCircle, RefreshCw } from 'lucide-react'

interface Props {
  type: 'rate_limit' | 'not_found' | 'generic'
  onRetry?: () => void
}

const MESSAGES = {
  rate_limit: {
    title: "We're taking a quick break",
    body: "We're fetching so much data that our free API is asking us to slow down. Try again in about a minute.",
    emoji: '⏳'
  },
  not_found: {
    title: "Stock not found",
    body: "We couldn't find that ticker symbol. Double-check it and try again.",
    emoji: '🔍'
  },
  generic: {
    title: "Something went wrong",
    body: "We had trouble loading this data. Check your connection and try again.",
    emoji: '😅'
  }
}

export default function ErrorState({ type, onRetry }: Props) {
  const msg = MESSAGES[type]
  return (
    <div className="bg-card rounded-2xl border border-white/[0.06] p-8 text-center">
      <p className="text-4xl mb-4">{msg.emoji}</p>
      <h3 className="font-syne font-bold text-lg text-text-primary mb-2">{msg.title}</h3>
      <p className="font-jakarta text-text-muted text-sm max-w-xs mx-auto mb-5">{msg.body}</p>
      {onRetry && (
        <button onClick={onRetry}
          className="inline-flex items-center gap-2 bg-citrus text-base font-jakarta font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-citrus-dim transition-colors">
          <RefreshCw size={14} /> Try Again
        </button>
      )}
    </div>
  )
}
```

---

## SECTION 31 — PageWrapper Component (`components/layout/PageWrapper.tsx`)

```tsx
interface Props { children: React.ReactNode; className?: string }

export default function PageWrapper({ children, className = '' }: Props) {
  return (
    <div className={`max-w-7xl mx-auto px-4 md:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
```

---

## SECTION 32 — Footer Component (`components/layout/Footer.tsx`)

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-citrus rounded-md flex items-center justify-center">
            <span className="font-syne font-black text-xs text-base">F</span>
          </div>
          <span className="font-syne font-bold text-text-primary">Finplain</span>
        </div>
        <p className="font-jakarta text-xs text-text-muted text-center">
          Data from Alpha Vantage & Yahoo Finance. Not financial advice. Made for students. 📚
        </p>
        <div className="flex gap-4">
          {['Home', 'News', 'Learn', 'Watchlist'].map(link => (
            <a key={link} href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
              className="font-jakarta text-xs text-text-muted hover:text-text-primary transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
```

---

## SECTION 33 — Animations (globals.css additions)

```css
/* Add to globals.css */

/* Fade up animation for cards */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-up {
  animation: fadeUp 0.4s ease forwards;
}

.fill-mode-forwards {
  animation-fill-mode: forwards;
}

/* Shimmer for skeletons */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.04) 25%,
    rgba(255,255,255,0.08) 50%,
    rgba(255,255,255,0.04) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Smooth page transitions */
main {
  animation: fadeUp 0.3s ease forwards;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.20); }
```

---

## SECTION 34 — next.config.ts

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.yahoo.com' },
      { protocol: 'https', hostname: '**.yimg.com' },
    ],
  },
  env: {
    NEXT_PUBLIC_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000',
  },
}

export default nextConfig
```

---

## SECTION 35 — Mock Data for Dev (`lib/mockData.ts`)

```ts
// lib/mockData.ts — Use when USE_MOCK_DATA=true so you don't burn API quota

export const MOCK_MARKET_SUMMARY = {
  indices: [
    { name: 'S&P 500', ticker: 'SPY', value: 5432.10, change: 12.50, changePercent: 0.23, plainLabel: 'Tracks the top 500 US companies' },
    { name: 'Nasdaq', ticker: 'QQQ', value: 18234.56, change: -45.20, changePercent: -0.25, plainLabel: 'Tracks the top tech companies' },
    { name: 'Dow Jones', ticker: 'DIA', value: 39456.78, change: 102.30, changePercent: 0.26, plainLabel: 'Tracks 30 of the biggest US companies' },
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
  description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
  sector: 'Technology', industry: 'Consumer Electronics',
  marketCap: 2980000000000, peRatio: 31.4, dividendYield: 0.51,
  week52High: 199.62, week52Low: 164.08, avgVolume: 58000000, eps: 6.13
}
```

---

## SECTION 36 — useDebounce Hook (`hooks/useDebounce.ts`)

```ts
// hooks/useDebounce.ts
import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
```

---

## SECTION 37 — Step-by-Step Build Order

Follow exactly in this order. Don't skip steps.

```
Step 1:  npx create-next-app@14 finplain --typescript --tailwind --app
Step 2:  cd finplain && npm install lightweight-charts yahoo-finance2 lucide-react
Step 3:  Create .env.local with both API keys
Step 4:  Update tailwind.config.ts (Section 2)
Step 5:  Replace globals.css (Section 2 + Section 33)
Step 6:  Create lib/types.ts (Section 6)
Step 7:  Create lib/formatters.ts (Section 7)
Step 8:  Create lib/alphaVantage.ts (Section 8)
Step 9:  Create lib/gemini.ts (Section 9)
Step 10: Create lib/localStorage.ts (Section 10)
Step 11: Create lib/mockData.ts (Section 35)
Step 12: Create lib/glossary.ts (Section 23)
Step 13: Create hooks/useDebounce.ts (Section 36)
Step 14: Create app/layout.tsx (Section 12)
Step 15: Create next.config.ts (Section 34)
Step 16: Build all 5 API routes (Section 16)
Step 17: Create components/layout/PageWrapper.tsx (Section 31)
Step 18: Create components/layout/Footer.tsx (Section 32)
Step 19: Create components/ui/SkeletonCard.tsx (Section 15)
Step 20: Create components/ui/GlossaryTooltip.tsx (Section 14)
Step 21: Create components/ui/ErrorState.tsx (Section 30)
Step 22: Create components/ui/SearchBar.tsx (Section 13)
Step 23: Create components/layout/Navbar.tsx (Section 11)
Step 24: Create components/market/MarketCard.tsx (Section 18)
Step 25: Create components/market/DailyAISummary.tsx (Section 19)
Step 26: Create components/market/TrendingTickers.tsx (Section 29)
Step 27: Create components/market/GainersLosers.tsx (fetch /api/gainers-losers, render two StockCard columns)
Step 28: Create components/market/StockCard.tsx (ticker, price, changePercent, click → /stock/ticker)
Step 29: Create app/page.tsx (Section 17)
Step 30: Create components/stock/StockChart.tsx (Section 21)
Step 31: Create components/stock/StockStats.tsx (Section 22)
Step 32: Create components/stock/AIExplainer.tsx (calls /api/ai-explain with explainStock prompt)
Step 33: Create components/stock/StockHeader.tsx (company name, ticker, price, change badge)
Step 34: Create components/stock/RelatedNews.tsx (fetch /api/news?ticker=X, render 3 NewsCards)
Step 35: Create components/watchlist/WatchlistButton.tsx (Section — reads/writes localStorage)
Step 36: Create app/stock/[ticker]/page.tsx (Section 20)
Step 37: Create components/news/NewsCard.tsx (Section 24)
Step 38: Create components/news/CategoryFilter.tsx (pill tabs: All, Tech, Energy, Finance, Economy)
Step 39: Create app/news/page.tsx (fetch /api/news, show CategoryFilter + NewsCard grid)
Step 40: Create components/learn/GlossaryCard.tsx (Section 26)
Step 41: Create app/learn/page.tsx (Section 25)
Step 42: Create components/watchlist/WatchlistRow.tsx (Section 28)
Step 43: Create app/watchlist/page.tsx (Section 27)
Step 44: Add loading.tsx files to each route (render skeleton grids)
Step 45: Mobile pass — check every page on 375px width
Step 46: vercel deploy
```

---

## SECTION 38 — Claude Code Paste Prompt

Copy and paste this entire block at the start of your Claude Code session:

---

**Build Finplain — a student-friendly stock market dashboard. The full spec is in finplain-mvp-spec-v2.md. Here are the absolute rules:**

**DESIGN — "Obsidian & Citrus" theme:**
- Background: `#0F0F11` (near-black)
- Cards: `#1A1A1F` with `border: rgba(255,255,255,0.06)`
- Primary accent: `#D4FF47` (electric citrus yellow-green)
- Text: `#F0F0F5` primary, `#A0A0B0` secondary, `#606070` muted
- Up color: `#22C55E`, Down color: `#EF4444`
- Fonts: Syne (bold headlines) + Plus Jakarta Sans (body) + JetBrains Mono (all numbers/prices)
- Rounded corners everywhere: `rounded-2xl` for cards, `rounded-xl` for inputs/buttons
- Every card has subtle hover state (slightly lighter bg + border)

**VOCAB RULE:** Every financial term on screen must use a plain English label. Never show "P/E Ratio" alone — show "Price vs Earnings" as the primary label with "P/E Ratio" in a GlossaryTooltip. Apply this across ALL pages.

**GLOSSARY TOOLTIPS:** Every stat on the Stock Page must have a GlossaryTooltip (the `?` icon) with a definition + "Think of it like..." analogy. Tooltips float on hover (desktop) and tap (mobile).

**API SAFETY:**
- Always check `data['Note']` and `data['Information']` from Alpha Vantage — if present, the API is rate-limited. Show `<ErrorState type="rate_limit" />` instead of crashing.
- Wrap all API calls in try/catch. Never let raw errors reach the UI.
- Cache all server-side API calls in the in-memory Map in `lib/alphaVantage.ts`

**LOADING STATES:** Every component that fetches data must show a skeleton while loading. Use `animate-pulse` on all skeleton elements.

**STORAGE:** localStorage only — no database, no Supabase, no authentication. The `lib/localStorage.ts` file handles everything.

**AI CALLS:** All Gemini calls go through `lib/gemini.ts` → `/api/ai-explain`. The AI always explains things in 8th-grade language. Cache the daily summary in localStorage by date.

**CHART:** Use `lightweight-charts` from TradingView. Line chart default, candlestick toggle. Time range tabs: 1D | 1W | 1M | 3M | 1Y. Chart colors: green line when price is up from open, red when down.

**BUILD ORDER:** Follow Section 37 step by step. Confirm each step before moving to the next.

**Start with Step 1 now.**

---

*Finplain MVP Spec v2.0 — Built for Claude Code*
