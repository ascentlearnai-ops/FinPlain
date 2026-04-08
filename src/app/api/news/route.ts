import { NextRequest, NextResponse } from 'next/server'
import yahooFinance from 'yahoo-finance2'
import { simplifyNewsHeadline } from '@/lib/gemini'

// Provided Keys
const NEWSAPI_KEY = '4e4494f49d204aa393ba995cc8fb6a93'
const THENEWSAPI_KEY = 'L2M8fMNTQYXZxJbodVE3LmYiJ4aeuq2h4JYK9Fu3'

// Server-side cache
let newsCache: { data: any; ts: number } | null = null
const NEWS_TTL = 15 * 60 * 1000 // 15 mins

export async function GET(req: NextRequest) {
  const ticker = req.nextUrl.searchParams.get('ticker')

  // Check cache for global news
  if (!ticker && newsCache && Date.now() - newsCache.ts < NEWS_TTL) {
    return NextResponse.json(newsCache.data)
  }

  try {
    let rawArticles: any[] = []
    
    // 1. Fetch from NewsAPI (General or Ticker)
    try {
      const q = ticker ? ticker : 'stock market'
      const pageSize = ticker ? 5 : 60
      const newsApiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${NEWSAPI_KEY}&language=en`
      const res = await fetch(newsApiUrl)
      const data = await res.json()
      if (data.articles) {
        rawArticles.push(...data.articles.map((a: any) => ({
          uuid: a.url + a.publishedAt,
          title: a.title,
          publisher: a.source.name,
          link: a.url,
          imageUrl: a.urlToImage,
          providerPublishTime: new Date(a.publishedAt).getTime() / 1000,
          relatedTickers: ticker ? [ticker] : []
        })))
      }
    } catch (e) { console.error('NewsAPI Error', e) }

    // 2. Fetch from TheNewsAPI (Fallback or Supplement)
    if (rawArticles.length < 50) {
      try {
        const q = ticker ? ticker : 'finance'
        const limit = ticker ? 3 : 25
        const theNewsUrl = `https://api.thenewsapi.com/v1/news/all?api_token=${THENEWSAPI_KEY}&search=${q}&language=en&limit=${limit}`
        const res = await fetch(theNewsUrl)
        const data = await res.json()
        if (data.data) {
          rawArticles.push(...data.data.map((a: any) => ({
            uuid: a.uuid,
            title: a.title,
            publisher: a.source,
            link: a.url,
            imageUrl: a.image_url,
            providerPublishTime: new Date(a.published_at).getTime() / 1000,
            relatedTickers: ticker ? [ticker] : []
          })))
        }
      } catch (e) { console.error('TheNewsAPI Error', e) }
    }

    // 3. Fallback to Yahoo Finance if still empty
    if (rawArticles.length === 0) {
      const query = ticker || 'market news'
      const result: any = await yahooFinance.search(query, { newsCount: 20, quotesCount: 0 })
      rawArticles = result.news || []
    }

    // Process and simplify (limit Gemini usage to top 15 for homepage, 5 for stock)
    const limit = ticker ? 5 : 20
    const processed = await Promise.all(
      rawArticles.slice(0, 50).map(async (article: any, index: number) => {
        let simpleSummary = ''
        // Only run Gemini for the first few to save quota
        if (index < limit) {
          try {
            simpleSummary = await simplifyNewsHeadline(article.title || article.headline)
          } catch {
            simpleSummary = 'Comprehensive market coverage of recent events.'
          }
        } else {
          simpleSummary = 'Market update regarding latest developments.'
        }
        
        return {
          id: article.uuid || article.id || `news-${index}`,
          headline: article.title || article.headline,
          source: article.publisher || article.source || 'Market News',
          url: article.link || article.url,
          publishedAt: new Date((article.providerPublishTime || 0) * 1000).toISOString(),
          relatedTickers: article.relatedTickers || [],
          simpleSummary,
          category: categorize(article.title || article.headline || ''),
          imageUrl: article.imageUrl || (article.thumbnail?.resolutions?.[0]?.url) || null
        }
      })
    )

    const response = { articles: processed }
    if (!ticker) newsCache = { data: response, ts: Date.now() }
    return NextResponse.json(response)
  } catch (err) {
    console.error('News fetch error:', err)
    return NextResponse.json({ articles: [] })
  }
}

function categorize(headline: string): string {
  const h = headline.toLowerCase()
  if (/apple|google|meta|microsoft|amazon|nvidia|ai|tech|gpu|iphone/.test(h)) return 'tech'
  if (/oil|energy|gas|solar|exxon|shell|chevron/.test(h)) return 'energy'
  if (/bank|fed|interest|rate|loan|jpmorgan|goldman|visa|mastercard|finance/.test(h)) return 'finance'
  if (/inflation|gdp|jobs|economy|recession|cpi|unemployment/.test(h)) return 'economy'
  return 'general'
}
