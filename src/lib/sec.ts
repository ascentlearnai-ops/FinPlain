import type { CompanyFiling } from './types'

type SecTickerEntry = {
  cik_str: number
  ticker: string
  title: string
}

type CacheEntry<T> = { data: T; ts: number }

const TICKER_CACHE_TTL = 24 * 60 * 60 * 1000
const FILINGS_CACHE_TTL = 30 * 60 * 1000
const filingsCache = new Map<string, CacheEntry<CompanyFiling[]>>()

function secHeaders() {
  return {
    'User-Agent': process.env.SEC_USER_AGENT || 'macroliberium app contact@example.com',
    'Accept-Encoding': 'gzip, deflate',
  }
}

function formatCik(cik: number | string) {
  return cik.toString().padStart(10, '0')
}

async function getTickerMap() {
  const globalForCache = globalThis as typeof globalThis & {
    __macroliberiumSecTickerCache?: CacheEntry<Record<string, SecTickerEntry>>
  }

  if (globalForCache.__macroliberiumSecTickerCache && Date.now() - globalForCache.__macroliberiumSecTickerCache.ts < TICKER_CACHE_TTL) {
    return globalForCache.__macroliberiumSecTickerCache.data
  }

  const res = await fetch('https://www.sec.gov/files/company_tickers.json', {
    headers: secHeaders(),
    next: { revalidate: 86400 },
  })
  if (!res.ok) throw new Error('SEC ticker map unavailable')

  const raw = await res.json()
  const entries = Object.values(raw) as SecTickerEntry[]
  const map = entries.reduce<Record<string, SecTickerEntry>>((acc, entry) => {
    acc[entry.ticker.toUpperCase()] = entry
    return acc
  }, {})

  globalForCache.__macroliberiumSecTickerCache = { data: map, ts: Date.now() }
  return map
}

export async function getCompanyFilings(ticker: string, limit = 8): Promise<CompanyFiling[]> {
  const symbol = ticker.toUpperCase()
  const cached = filingsCache.get(symbol)
  if (cached && Date.now() - cached.ts < FILINGS_CACHE_TTL) return cached.data

  try {
    const tickerMap = await getTickerMap()
    const entry = tickerMap[symbol]
    if (!entry) return []

    const cik = formatCik(entry.cik_str)
    const res = await fetch(`https://data.sec.gov/submissions/CIK${cik}.json`, {
      headers: secHeaders(),
      next: { revalidate: 1800 },
    })
    if (!res.ok) return []

    const data = await res.json()
    const recent = data?.filings?.recent
    if (!recent?.form || !recent?.accessionNumber) return []

    const importantForms = new Set(['10-K', '10-Q', '8-K', 'DEF 14A', 'S-1'])
    const filings: CompanyFiling[] = recent.form
      .map((form: string, index: number) => {
        const accession = recent.accessionNumber[index]
        const primaryDocument = recent.primaryDocument?.[index]
        if (!importantForms.has(form) || !accession || !primaryDocument) return null
        const accessionPath = accession.replace(/-/g, '')
        return {
          form,
          filedAt: recent.filingDate?.[index] || '',
          reportDate: recent.reportDate?.[index] || '',
          accessionNumber: accession,
          description: describeFiling(form),
          documentUrl: `https://www.sec.gov/Archives/edgar/data/${entry.cik_str}/${accessionPath}/${primaryDocument}`,
        } satisfies CompanyFiling
      })
      .filter(Boolean)
      .slice(0, limit) as CompanyFiling[]

    filingsCache.set(symbol, { data: filings, ts: Date.now() })
    return filings
  } catch (err) {
    console.error(`SEC_FILINGS_ERROR (${symbol}):`, err)
    return []
  }
}

function describeFiling(form: string) {
  if (form === '10-K') return 'Annual report: full-year business, risks, and financials.'
  if (form === '10-Q') return 'Quarterly report: recent financial performance and updates.'
  if (form === '8-K') return 'Current report: important company event or announcement.'
  if (form === 'DEF 14A') return 'Proxy statement: board, voting, and executive pay details.'
  if (form === 'S-1') return 'IPO registration: business model and offering details.'
  return 'SEC filing from the company.'
}
