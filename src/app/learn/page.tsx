'use client'
import { useState, useMemo } from 'react'
import GlossaryCard from '@/components/learn/GlossaryCard'
import { glossaryTerms } from '@/lib/glossary'
import { Search } from 'lucide-react'

const CATEGORIES = ['all', 'stocks', 'markets', 'numbers', 'basics'] as const

export default function LearnPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('all')

  const filtered = useMemo(() => glossaryTerms.filter(t => {
    const matchQ = !query || t.term.toLowerCase().includes(query.toLowerCase()) || t.definition.toLowerCase().includes(query.toLowerCase())
    const matchC = category === 'all' || t.category === category
    return matchQ && matchC
  }), [query, category])

  return (
    <>
      <div className="hero-gradient py-16">
        <div className="container-full"><div className="container-inner">
          <p className="text-label text-accent mb-3">Reference</p>
          <h1 className="text-headline text-primary mb-3">Financial <span className="gradient-text">Glossary</span></h1>
          <p className="text-body max-w-lg mb-8">Every financial term explained with plain-English definitions and real-world analogies.</p>
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input type="text" placeholder="Search terms..." value={query} onChange={e => setQuery(e.target.value)}
              className="w-full bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all shadow-sm" />
          </div>
        </div></div>
      </div>

      <div className="section-soft py-8">
        <div className="container-full"><div className="container-inner">
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full font-semibold text-sm capitalize transition-all border ${category === cat ? 'btn-primary border-transparent' : 'bg-white border-gray-200 text-secondary hover:border-accent/30'}`}>
                {cat === 'all' ? `All (${glossaryTerms.length})` : cat}
              </button>
            ))}
          </div>
          {query && <p className="text-sm text-muted mb-4">{filtered.length} result{filtered.length !== 1 ? 's' : ''} for &quot;{query}&quot;</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-16">
            {filtered.map((t, i) => <GlossaryCard key={t.id} term={t} style={{ animationDelay: `${i * 25}ms` }} />)}
            {filtered.length === 0 && <div className="col-span-2 text-center py-16"><p className="font-bold text-xl text-muted mb-2">No matches</p><p className="text-sm text-muted">Try a different search term</p></div>}
          </div>
        </div></div>
      </div>
    </>
  )
}
