const FMP_KEY = process.env.FMP_API_KEY || ''

type FmpArticle = {
  symbol?: string
  publishedDate?: string
  publisher?: string
  site?: string
  title?: string
  text?: string
  url?: string
  image?: string
}

export async function getFmpStockNews(ticker?: string) {
  if (!FMP_KEY) return []

  try {
    const url = ticker
      ? `https://financialmodelingprep.com/stable/news/stock?symbols=${encodeURIComponent(ticker)}&limit=20&apikey=${FMP_KEY}`
      : `https://financialmodelingprep.com/stable/news/stock-latest?page=0&limit=30&apikey=${FMP_KEY}`

    const res = await fetch(url, { next: { revalidate: 900 } })
    if (!res.ok) return []

    const data = await res.json()
    if (!Array.isArray(data)) return []

    return data.map((article: FmpArticle, index: number) => ({
      uuid: article.url || `fmp-${ticker || 'market'}-${index}`,
      title: article.title,
      publisher: article.publisher || article.site || 'Financial Modeling Prep',
      link: article.url,
      imageUrl: article.image,
      providerPublishTime: article.publishedDate ? new Date(article.publishedDate).getTime() / 1000 : Date.now() / 1000,
      relatedTickers: ticker ? [ticker] : article.symbol ? [article.symbol] : [],
    }))
  } catch (err) {
    console.error('FMP_NEWS_ERROR:', err)
    return []
  }
}
