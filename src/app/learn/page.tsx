'use client'
import { useState, useMemo, useEffect } from 'react'
import GlossaryCard from '@/components/learn/GlossaryCard'
import { glossaryTerms } from '@/lib/glossary'
import { Search, X, Layers, Info, ArrowUpRight } from 'lucide-react'
import type { GlossaryTerm } from '@/lib/types'

const CATEGORIES = ['all', 'stocks', 'markets', 'numbers', 'basics'] as const

export default function LearnPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('all')
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null)

  const filtered = useMemo(() => glossaryTerms.filter(t => {
    const matchQ = !query || t.term.toLowerCase().includes(query.toLowerCase()) || t.definition.toLowerCase().includes(query.toLowerCase())
    const matchC = category === 'all' || t.category === category
    return matchQ && matchC
  }), [query, category])

  useEffect(() => {
    document.body.style.overflow = selectedTerm ? 'hidden' : 'unset'
  }, [selectedTerm])

  return (
    <div className="relative min-h-screen">
      <section className="py-14 border-b border-white/[0.08]">
        <div className="container-full">
          <div className="container-inner">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 border border-white/[0.14] rounded-lg px-4 py-2 mb-6">
                <Layers size={14} className="text-primary" />
                <span className="text-[10px] font-bold text-secondary uppercase">Finance glossary</span>
              </div>
              <h1 className="text-display text-primary mb-6">
                Learn the language of money.
              </h1>
              <p className="text-xl text-secondary mb-10 leading-relaxed font-medium">
                Simple definitions for the market words teenagers see in headlines, charts, and earnings stories.
              </p>

              <div className="relative group max-w-xl">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search terms like P/E, ETF, inflation..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.12] rounded-lg pl-12 pr-6 py-4 text-base text-primary placeholder:text-muted focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-full">
          <div className="container-inner">
            <div className="flex gap-2 flex-wrap mb-10 overflow-x-auto no-scrollbar pb-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2.5 rounded-lg font-bold text-[11px] uppercase transition-colors border whitespace-nowrap ${
                    category === cat
                      ? 'bg-white border-white text-black'
                      : 'bg-white/[0.03] border-white/[0.1] text-muted hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat === 'all' ? `All (${glossaryTerms.length})` : cat}
                </button>
              ))}
            </div>

            {query && (
              <p className="text-xs text-muted mb-6 font-bold uppercase">
                Found {filtered.length} entries matching &quot;{query}&quot;
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(t => (
                <div key={t.id} onClick={() => setSelectedTerm(t)}>
                  <GlossaryCard term={t} />
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full py-28 text-center glass-card border-dashed">
                  <Info size={40} className="mx-auto text-muted mb-6 opacity-30" />
                  <p className="font-['Outfit'] font-black text-2xl text-primary mb-2">No matching terms.</p>
                  <p className="text-muted text-sm font-medium">Try a broader search or switch categories.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedTerm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-background/85 backdrop-blur-xl" onClick={() => setSelectedTerm(null)} />
          <div className="glass-card-deep w-full max-w-3xl max-h-[90vh] overflow-y-auto no-scrollbar relative z-10">
            <div className="sticky top-0 z-20 bg-card/95 backdrop-blur-xl border-b border-white/[0.08] px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/[0.04] flex items-center justify-center border border-white/[0.12]">
                  <span className="text-2xl">{selectedTerm.emoji || '?'}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-['Outfit'] font-black text-primary">{selectedTerm.term}</h2>
                  <p className="text-[10px] text-muted font-black uppercase">{selectedTerm.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTerm(null)}
                className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-colors border border-white/[0.1]"
                aria-label="Close glossary detail"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 sm:p-10">
              <div className="mb-10">
                <p className="text-label mb-4">Core idea</p>
                <p className="text-xl sm:text-2xl text-primary leading-relaxed font-semibold">
                  {selectedTerm.definition}
                </p>
              </div>

              {selectedTerm.imageUrl && (
                <div className="mb-10 rounded-lg overflow-hidden border border-white/[0.08] bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedTerm.imageUrl} alt={selectedTerm.term} className="w-full h-auto grayscale opacity-85" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.08]">
                  <div className="w-8 h-8 rounded-md bg-white text-black flex items-center justify-center mb-4">
                    <Info size={16} />
                  </div>
                  <p className="text-label mb-2">Analogy</p>
                  <p className="text-secondary text-sm leading-relaxed font-medium">
                    {selectedTerm.example}
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.08]">
                  <div className="w-8 h-8 rounded-md bg-white text-black flex items-center justify-center mb-4">
                    <ArrowUpRight size={16} />
                  </div>
                  <p className="text-label mb-2">Deep dive</p>
                  <p className="text-secondary text-sm leading-relaxed font-medium">
                    {selectedTerm.detailedExample || 'This concept helps you decode market stories and compare companies with more context.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-white/[0.08] bg-white/[0.01]">
              <p className="text-[10px] text-muted font-bold uppercase">macroliberium academy</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
