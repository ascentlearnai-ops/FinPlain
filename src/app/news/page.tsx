'use client'
import { useState, useEffect, useMemo } from 'react'
import CategoryFilter from '@/components/news/CategoryFilter'
import NewsCard from '@/components/news/NewsCard'
import { SkeletonNewsCard } from '@/components/ui/SkeletonCard'

export default function NewsPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    fetch('/api/news').then(r => r.json()).then(d => { setArticles(d.articles || []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => category === 'All' ? articles : articles.filter((a: any) => a.category === category.toLowerCase()), [articles, category])

  return (
    <>
      <div className="hero-gradient py-16">
        <div className="container-full"><div className="container-inner">
          <p className="text-label text-accent mb-3">Market Wire</p>
          <h1 className="text-headline text-primary mb-3">Latest <span className="gradient-text">Headlines</span></h1>
          <p className="text-body max-w-lg">Breaking market news with AI-powered plain-English analysis and context.</p>
        </div></div>
      </div>

      <div className="section-soft py-10">
        <div className="container-full"><div className="container-inner">
          <CategoryFilter activeCategory={category} onChange={setCategory} />
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => <SkeletonNewsCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20"><p className="text-muted">No articles found for {category}.</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
              {filtered.map((a: any) => <NewsCard key={a.id} article={a} />)}
            </div>
          )}
        </div></div>
      </div>
    </>
  )
}
