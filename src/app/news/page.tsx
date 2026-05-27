'use client'
import { useState, useEffect, useMemo } from 'react'
import CategoryFilter from '@/components/news/CategoryFilter'
import NewsCard from '@/components/news/NewsCard'
import { SkeletonNewsCard } from '@/components/ui/SkeletonCard'
import { Activity, Clock, Newspaper, ShieldCheck } from 'lucide-react'

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
      <section className="pro-page-hero">
        <div className="container-full"><div className="container-inner">
          <div className="pro-hero-grid">
            <div className="max-w-3xl">
              <p className="text-label mb-3">News desk</p>
              <h1 className="text-display text-primary mb-5">Market headlines rewritten for students.</h1>
              <p className="text-body max-w-2xl text-lg">
                A Yahoo Finance-style feed with source checks, short context, and the key terms students should understand before the market story moves on.
              </p>
            </div>
            <div className="pro-hero-panel">
              <div className="pro-panel-row">
                <ShieldCheck size={16} />
                <div><strong>Source checked</strong><span>Yahoo, FMP, NewsAPI, TheNewsAPI</span></div>
              </div>
              <div className="pro-panel-row">
                <Clock size={16} />
                <div><strong>Readable in minutes</strong><span>Headline, takeaway, vocabulary</span></div>
              </div>
              <div className="pro-panel-row">
                <Activity size={16} />
                <div><strong>Market context</strong><span>Connect news to tickers and sectors</span></div>
              </div>
            </div>
          </div>
        </div></div>
      </section>

      <div className="section-soft py-10">
        <div className="container-full"><div className="container-inner">
          <div className="pro-section-header">
            <div>
              <p className="text-label mb-2">Live brief</p>
              <h2 className="text-headline">Top stories by category</h2>
            </div>
            <div className="pro-status-pill">{loading ? 'Syncing sources' : `${filtered.length} stories loaded`}</div>
          </div>
          <CategoryFilter activeCategory={category} onChange={setCategory} />
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1,2,3,4,5,6].map(i => <SkeletonNewsCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper size={48} className="mx-auto text-muted mb-4" />
              <p className="text-secondary">No articles found for {category}.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-16">
              {filtered.map((a: any) => <NewsCard key={a.id} article={a} />)}
            </div>
          )}
        </div></div>
      </div>
    </>
  )
}
