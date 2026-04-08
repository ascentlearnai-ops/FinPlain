'use client'
import { useEffect, useState } from 'react'
import NewsCard from '@/components/news/NewsCard'
import { SkeletonNewsCard } from '@/components/ui/SkeletonCard'

export default function RelatedNews({ ticker }: { ticker: string }) {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/news?ticker=${ticker}`)
      .then(r => r.json())
      .then(d => {
        setNews(d.articles || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [ticker])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3].map(i => <SkeletonNewsCard key={i} />)}
      </div>
    )
  }

  if (news.length === 0) {
    return <div className="text-secondary font-sans text-base">No recent news found for {ticker}.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.slice(0, 3).map((article: any) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}
