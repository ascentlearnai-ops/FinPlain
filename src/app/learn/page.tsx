'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import GlossaryCard from '@/components/learn/GlossaryCard'
import StudyLessonPlayer from '@/components/learn/StudyLessonPlayer'
import { glossaryTerms } from '@/lib/glossary'
import { enrichGlossaryTerm, studyModules } from '@/lib/study'
import {
  getSavedStudyTerms,
  getStudyProgress,
  setStudyModuleCompleted,
  setStudyTermSaved,
} from '@/lib/localStorage'
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Info,
  Layers,
  LineChart,
  ListChecks,
  Newspaper,
  Search,
  Target,
  X,
} from 'lucide-react'
import type { GlossaryTerm } from '@/lib/types'

const CATEGORIES = ['all', 'stocks', 'markets', 'numbers', 'basics'] as const
type Category = typeof CATEGORIES[number]

export default function LearnPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('all')
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null)
  const [activeModule, setActiveModule] = useState(studyModules[0].id)
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [savedTerms, setSavedTerms] = useState<string[]>([])
  const [termAnswer, setTermAnswer] = useState('')

  const allTerms = useMemo(() => glossaryTerms.map(enrichGlossaryTerm), [])
  const termById = useMemo(() => new Map(allTerms.map(term => [term.id, term])), [allTerms])
  const activeModuleData = studyModules.find(module => module.id === activeModule) || studyModules[0]

  const filtered = useMemo(() => allTerms.filter(term => {
    const haystack = [
      term.term,
      term.definition,
      term.brief,
      term.whyItMatters,
      term.realWorldExample,
      term.commonMistake,
    ].filter(Boolean).join(' ').toLowerCase()
    const matchQ = !query || haystack.includes(query.toLowerCase())
    const matchC = category === 'all' || term.category === category
    return matchQ && matchC
  }), [allTerms, query, category])

  const moduleTerms = activeModuleData.terms
    .map(termId => termById.get(termId))
    .filter((term): term is GlossaryTerm => Boolean(term))

  const progressPercent = Math.round((completedModules.length / studyModules.length) * 100)

  useEffect(() => {
    setCompletedModules(getStudyProgress())
    setSavedTerms(getSavedStudyTerms())
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedTerm ? 'hidden' : 'unset'
    setTermAnswer('')
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedTerm])

  const completeActiveModule = useCallback(() => {
    setCompletedModules(previous => {
      if (previous.includes(activeModuleData.id)) return previous
      return setStudyModuleCompleted(activeModuleData.id, true)
    })
  }, [activeModuleData.id])

  const toggleSavedTerm = (termId: string) => {
    const nextSaved = !savedTerms.includes(termId)
    setSavedTerms(setStudyTermSaved(termId, nextSaved))
  }

  return (
    <div className="relative min-h-screen">
      <section className="pro-page-hero">
        <div className="container-full">
          <div className="container-inner">
            <div className="pro-hero-grid">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 border border-white/[0.14] rounded-lg px-4 py-2 mb-6 bg-white/[0.03]">
                  <Layers size={14} className="text-primary" />
                  <span className="text-[10px] font-bold text-secondary uppercase">Study Academy for student investors</span>
                </div>
                <h1 className="text-display text-primary mb-6 max-w-[11ch] sm:max-w-3xl">
                  Study stocks with examples, checks, and plain-English research habits.
                </h1>
                <p className="max-w-[28ch] text-xl text-secondary mb-10 leading-relaxed font-medium sm:max-w-3xl">
                  Build the skills behind every company page: read key stats, understand earnings, check SEC filings, question headlines, and turn watchlists into research.
                </p>

                <div className="relative group max-w-[calc(100vw-3rem)] sm:max-w-xl">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Search terms like P/E, ETF, inflation..."
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.12] rounded-lg pl-12 pr-6 py-4 text-base text-primary placeholder:text-muted focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <div className="learn-terminal w-full max-w-[calc(100vw-3rem)] sm:max-w-none">
                {[
                  [LineChart, 'Stock page', 'Start with business, price, and key stats'],
                  [Newspaper, 'News', 'Find the event before forming a view'],
                  [BookOpen, 'Filing', 'Use official reports to check the story'],
                  [GraduationCap, 'Quick check', 'Answer a question and save progress'],
                ].map(([Icon, title, body]) => {
                  const StudyIcon = Icon as typeof LineChart
                  return (
                    <div key={title as string} className="learn-terminal-row">
                      <StudyIcon size={16} />
                      <div><strong>{title as string}</strong><span>{body as string}</span></div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StudyMetric icon={CheckCircle2} label="Modules done" value={`${completedModules.length}/${studyModules.length}`} />
              <StudyMetric icon={Bookmark} label="Saved terms" value={savedTerms.length.toString()} />
              <StudyMetric icon={ListChecks} label="Progress" value={`${progressPercent}%`} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-full">
          <div className="container-inner">
            <div className="pro-section-header">
              <div>
                <p className="text-label mb-2">Guided path</p>
                <h2 className="text-headline">Stock research modules</h2>
              </div>
              <a href="/stock/AAPL" className="btn-secondary inline-flex items-center justify-center gap-2">
                Practice on AAPL <ArrowRight size={16} />
              </a>
            </div>

            <div className="space-y-5">
              <StudyLessonPlayer
                module={activeModuleData}
                modules={studyModules}
                activeModuleId={activeModuleData.id}
                completedModules={completedModules}
                moduleTerms={moduleTerms}
                onSelectModule={setActiveModule}
                onComplete={completeActiveModule}
                onOpenTerm={setSelectedTerm}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-white/[0.08]">
        <div className="container-full">
          <div className="container-inner">
            <div className="pro-section-header">
              <div>
                <p className="text-label mb-2">Glossary library</p>
                <h2 className="text-headline">Search, save, and practice terms</h2>
              </div>
              <div className="pro-status-pill">{filtered.length} terms visible</div>
            </div>

            <div className="flex gap-2 flex-wrap mb-8 overflow-x-auto no-scrollbar pb-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2.5 rounded-lg font-bold text-[11px] uppercase transition-colors border whitespace-nowrap ${
                    category === cat
                      ? 'bg-white border-white text-black'
                      : 'bg-white/[0.03] border-white/[0.1] text-muted hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat === 'all' ? `All (${allTerms.length})` : cat}
                </button>
              ))}
            </div>

            {query && (
              <p className="text-xs text-muted mb-6 font-bold uppercase">
                Found {filtered.length} entries matching &quot;{query}&quot;
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(term => (
                <GlossaryCard
                  key={term.id}
                  term={term}
                  saved={savedTerms.includes(term.id)}
                  onOpen={() => setSelectedTerm(term)}
                  onToggleSave={() => toggleSavedTerm(term.id)}
                />
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
        <TermDetailModal
          term={selectedTerm}
          allTerms={termById}
          saved={savedTerms.includes(selectedTerm.id)}
          answer={termAnswer}
          onAnswer={setTermAnswer}
          onClose={() => setSelectedTerm(null)}
          onSave={() => toggleSavedTerm(selectedTerm.id)}
          onOpenTerm={setSelectedTerm}
        />
      )}
    </div>
  )
}

function StudyMetric({ icon: Icon, label, value }: { icon: typeof CheckCircle2; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase text-muted">{label}</p>
          <p className="mt-1 text-2xl font-black text-primary">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-black">
          <Icon size={18} />
        </div>
      </div>
    </div>
  )
}

function TermDetailModal({
  term,
  allTerms,
  saved,
  answer,
  onAnswer,
  onClose,
  onSave,
  onOpenTerm,
}: {
  term: GlossaryTerm
  allTerms: Map<string, GlossaryTerm>
  saved: boolean
  answer: string
  onAnswer: (answer: string) => void
  onClose: () => void
  onSave: () => void
  onOpenTerm: (term: GlossaryTerm) => void
}) {
  const relatedTerms = (term.relatedTermIds || [])
    .map(termId => allTerms.get(termId))
    .filter((related): related is GlossaryTerm => Boolean(related))
  const answerCorrect = term.quickCheck ? answer === term.quickCheck.answer : false

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <button className="absolute inset-0 bg-background/85 backdrop-blur-xl" onClick={onClose} aria-label="Close glossary detail" />
      <div className="glass-card-deep w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar relative z-10">
        <div className="sticky top-0 z-20 bg-card/95 backdrop-blur-xl border-b border-white/[0.08] px-5 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-lg bg-white/[0.04] flex shrink-0 items-center justify-center border border-white/[0.12]">
              <span className="text-lg font-black">{term.term.slice(0, 1)}</span>
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl font-['Outfit'] font-black text-primary truncate">{term.term}</h2>
              <p className="text-[10px] text-muted font-black uppercase">{term.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSave}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-black uppercase ${
                saved ? 'border-white bg-white text-black' : 'border-white/[0.12] bg-white/[0.04] text-primary'
              }`}
            >
              <Bookmark size={15} />
              {saved ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-colors border border-white/[0.1]"
              aria-label="Close glossary detail"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-5">
              <DetailBlock icon={BookOpen} label="Core idea" body={term.brief || term.definition} large />
              <DetailBlock icon={Target} label="Why it matters" body={term.whyItMatters || 'This term helps you connect prices, news, and company facts.'} />
              <DetailBlock icon={LineChart} label="Real example" body={term.realWorldExample || term.example} />
              <DetailBlock icon={Info} label="Common mistake" body={term.commonMistake || 'Do not use this term alone. Compare it with the full company story.'} />
            </div>

            <div className="space-y-5">
              <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Clock3 size={16} className="text-primary" />
                  <p className="font-black text-primary">Quick study</p>
                </div>
                <p className="text-sm leading-relaxed text-secondary">{term.definition}</p>
                <p className="mt-4 text-xs leading-relaxed text-muted">Example: {term.example}</p>
              </div>

              {term.quickCheck && (
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5">
                  <p className="font-black text-primary mb-3">Quick check</p>
                  <p className="text-sm text-secondary leading-relaxed mb-4">{term.quickCheck.question}</p>
                  <div className="space-y-2">
                    {term.quickCheck.choices.map(choice => (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => onAnswer(choice)}
                        className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                          answer === choice ? 'border-white bg-white text-black' : 'border-white/[0.1] bg-white/[0.03] text-secondary hover:text-primary'
                        }`}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                  {answer && (
                    <p className={`mt-4 text-sm leading-relaxed ${answerCorrect ? 'text-primary' : 'text-secondary'}`}>
                      {answerCorrect ? 'Correct. ' : 'Not quite. '}
                      {term.quickCheck.explanation}
                    </p>
                  )}
                </div>
              )}

              {relatedTerms.length > 0 && (
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5">
                  <p className="font-black text-primary mb-3">Related terms</p>
                  <div className="space-y-2">
                    {relatedTerms.map(related => (
                      <button
                        key={related.id}
                        type="button"
                        onClick={() => onOpenTerm(related)}
                        className="flex w-full items-center justify-between gap-3 rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-left text-sm text-secondary hover:text-primary hover:border-white/25"
                      >
                        {related.term}
                        <ArrowUpRight size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-8 border-t border-white/[0.08] bg-white/[0.01]">
          <p className="text-[10px] text-muted font-bold uppercase">macroliberium study academy</p>
        </div>
      </div>
    </div>
  )
}

function DetailBlock({
  icon: Icon,
  label,
  body,
  large = false,
}: {
  icon: typeof BookOpen
  label: string
  body: string
  large?: boolean
}) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon size={16} className="text-primary" />
        <p className="text-label">{label}</p>
      </div>
      <p className={`${large ? 'text-xl sm:text-2xl font-semibold text-primary' : 'text-sm text-secondary'} leading-relaxed`}>
        {body}
      </p>
    </div>
  )
}
