'use client'
import { useState, useMemo, useEffect } from 'react'
import GlossaryCard from '@/components/learn/GlossaryCard'
import { glossaryTerms } from '@/lib/glossary'
import { Search, X, Layers, Target, Info, ArrowUpRight, Globe } from 'lucide-react'
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

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedTerm) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [selectedTerm])

  return (
    <div className="relative min-h-screen">
      {/* Background Orbs */}
      <div className="hero-glow opacity-30" />
      <div className="side-glow-pink opacity-20" />

      <section className="pt-24 pb-16 relative z-10">
        <div className="container-full">
          <div className="container-inner">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-md border border-accent/20 rounded-full px-5 py-2 mb-6">
                <Layers size={14} className="text-accent" />
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest leading-none">Knowledge Base v4.0</span>
              </div>
              <h1 className="text-display text-primary mb-6">
                Master the <br />
                <span className="gradient-text">language of money.</span>
              </h1>
              <p className="text-xl text-secondary mb-10 leading-relaxed font-medium">
                Demystifying Wall Street jargon with 100+ plain-English definitions, 
                interactive diagrams, and institutional insights.
              </p>

              <div className="relative group max-w-xl">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" />
                <input 
                  type="text" 
                  placeholder="Ask anything... (e.g. 'What is a Bear Market?')" 
                  value={query} 
                  onChange={e => setQuery(e.target.value)}
                  className="w-full bg-[#0d1017]/60 backdrop-blur-xl border border-white/10 rounded-[24px] pl-12 pr-6 py-4 text-base text-primary placeholder:text-muted focus:outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all shadow-2xl" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32 relative z-10">
        <div className="container-full">
          <div className="container-inner">
            <div className="flex gap-2 flex-wrap mb-10 overflow-x-auto no-scrollbar pb-2">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all border whitespace-nowrap ${
                    category === cat 
                      ? 'bg-accent border-accent text-background shadow-neon-pink' 
                      : 'bg-white/5 border-white/10 text-muted hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat === 'all' ? `Global (${glossaryTerms.length})` : cat}
                </button>
              ))}
            </div>

            {query && (
              <p className="text-xs text-muted mb-6 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <Target size={14} className="text-accent" />
                Found {filtered.length} entries matching &quot;{query}&quot;
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t, i) => (
                <div key={t.id} onClick={() => setSelectedTerm(t)}>
                  <GlossaryCard term={t} style={{ animationDelay: `${i * 20}ms` }} />
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full py-32 text-center glass-card border-dashed">
                  <Info size={40} className="mx-auto text-muted mb-6 opacity-20" />
                  <p className="font-['Outfit'] font-black text-2xl text-primary mb-2 tracking-tight transition-all">No matching intel detected.</p>
                  <p className="text-muted text-sm font-medium">Try broadening your search or switching categories.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedTerm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setSelectedTerm(null)} />
          <div className="glass-card-deep w-full max-w-3xl max-h-[90vh] overflow-y-auto no-scrollbar relative z-10 animate-scaleIn border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-[#0d1017]/90 backdrop-blur-xl border-b border-white/5 px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30">
                  <span className="text-2xl">{selectedTerm.emoji || '💎'}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-['Outfit'] font-black text-primary tracking-tight">{selectedTerm.term}</h2>
                  <p className="text-[10px] text-accent font-black uppercase tracking-[0.3em]">{selectedTerm.category}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTerm(null)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-all border border-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
                <div>
                  <div className="mb-10">
                    <p className="text-label text-accent opacity-60 mb-4">Core Concept</p>
                    <p className="text-xl sm:text-2xl text-primary leading-relaxed font-semibold">
                      {selectedTerm.definition}
                    </p>
                  </div>

                  {selectedTerm.imageUrl && (
                    <div className="mb-12 rounded-[24px] overflow-hidden border border-white/5 shadow-2xl bg-[#090b0f] relative group">
                       <img src={selectedTerm.imageUrl} alt={selectedTerm.term} className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                          <p className="text-[10px] text-white font-bold uppercase tracking-widest flex items-center gap-2">
                             <Globe size={12} className="text-accent" /> Institutional Education Diagram
                          </p>
                       </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 rounded-[24px] bg-white/[0.02] border border-white/[0.04] relative group hover:border-accent/20 transition-all">
                       <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
                          <Info size={16} className="text-blue-400" />
                       </div>
                       <p className="text-label mb-2 text-blue-400/80">Real-World Analogy</p>
                       <p className="text-secondary text-sm leading-relaxed font-medium">
                         {selectedTerm.example}
                       </p>
                    </div>

                    <div className="p-6 rounded-[24px] bg-accent/5 border border-accent/10 relative group hover:border-accent/30 transition-all">
                       <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-4 border border-accent/20">
                          <ArrowUpRight size={16} className="text-accent" />
                       </div>
                       <p className="text-label mb-2 text-accent/80">Deep Dive</p>
                       <p className="text-secondary text-sm leading-relaxed font-medium">
                         {selectedTerm.detailedExample || "This concept represents a fundamental pillar of market dynamics. Mastering it allows you to interpret institutional signals with greater clarity and precision."}
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Finplain Neural Academy</p>
              <div className="flex gap-2">
                 {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
