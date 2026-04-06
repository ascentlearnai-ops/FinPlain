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
      const result: any = await yahooFinance.search(ticker, { newsCount: 6, quotesCount: 0 })
      articles = result.news || []
    } else {
      // General market news
      const result: any = await yahooFinance.search('market news', { newsCount: 12, quotesCount: 0 })
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
