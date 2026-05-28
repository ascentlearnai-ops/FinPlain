'use client'

import { useEffect, useMemo, useState } from 'react'
import { Bell, BookOpen, CalendarDays, Check, FileText, Lightbulb, MessageSquare, Plus, Search, X } from 'lucide-react'
import { getKeywordAlerts, getResearchNote, setKeywordAlerts, setResearchNote } from '@/lib/localStorage'
import type { CompanyFiling, ResearchEvent } from '@/lib/types'

interface Props {
  ticker: string
  companyName: string
  events: ResearchEvent[]
  filings: CompanyFiling[]
}

const PROMPTS = [
  {
    title: 'Business model',
    prompt: 'What does this company sell, who buys it, and why do customers choose it?',
    reason: 'This keeps the stock connected to a real business.',
  },
  {
    title: 'Latest quarter',
    prompt: 'What changed in revenue, EPS, margins, or guidance during the latest quarter?',
    reason: 'Earnings often move stocks because expectations changed.',
  },
  {
    title: 'Main risk',
    prompt: 'What could go wrong for this business over the next year?',
    reason: 'Good research studies risk before price targets.',
  },
  {
    title: 'Next metric',
    prompt: 'What number should I check again next time, and what would count as improvement?',
    reason: 'A clear metric makes future updates easier to judge.',
  },
]

export default function ResearchWorkspace({ ticker, companyName, events, filings }: Props) {
  const [active, setActive] = useState<'timeline' | 'filings' | 'notes' | 'alerts'>('timeline')
  const [note, setNote] = useState('')
  const [alerts, setAlerts] = useState<string[]>([])
  const [alertDraft, setAlertDraft] = useState('')
  const symbol = ticker.toUpperCase()

  useEffect(() => {
    setNote(getResearchNote(symbol))
    setAlerts(getKeywordAlerts(symbol))
  }, [symbol])

  const saved = useMemo(() => note.trim().length > 0, [note])

  const saveNote = (nextNote: string) => {
    setNote(nextNote)
    setResearchNote(symbol, nextNote)
  }

  const addAlert = () => {
    const value = alertDraft.trim()
    if (!value || alerts.includes(value)) return
    const next = [...alerts, value].slice(0, 8)
    setAlerts(next)
    setKeywordAlerts(symbol, next)
    setAlertDraft('')
  }

  const removeAlert = (value: string) => {
    const next = alerts.filter(alert => alert !== value)
    setAlerts(next)
    setKeywordAlerts(symbol, next)
  }

  return (
    <section className="glass-card overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-label mb-2">Research hub</p>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">{companyName}</h2>
            <p className="text-sm text-secondary mt-2 max-w-2xl">
              Use the same research flow a serious investor would use, but with student-friendly steps: events, filings, questions, notes, and alerts.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted uppercase">
            <Search size={14} />
            <span>{symbol} workspace</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:flex gap-2">
          {[
            { id: 'timeline', label: 'Timeline', icon: CalendarDays },
            { id: 'filings', label: 'Filings', icon: FileText },
            { id: 'notes', label: 'Notes', icon: MessageSquare },
            { id: 'alerts', label: 'Alerts', icon: Bell },
          ].map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id as typeof active)}
                className={`px-4 py-2.5 rounded-lg border text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2 ${
                  active === item.id ? 'bg-white text-black border-white' : 'bg-white/[0.03] border-white/[0.1] text-secondary hover:text-primary'
                }`}
              >
                <Icon size={14} />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {active === 'timeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-3">
              {events.length > 0 ? events.map(event => (
                <a
                  key={event.id}
                  href={event.url || '#'}
                  target={event.url ? '_blank' : undefined}
                  rel={event.url ? 'noopener noreferrer' : undefined}
                  className="block border border-white/[0.08] rounded-lg p-4 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-muted uppercase mb-2">{event.type} / {event.date}</p>
                      <h3 className="font-bold text-primary">{event.title}</h3>
                      <p className="text-sm text-secondary mt-2 leading-relaxed">{event.summary}</p>
                      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                        <TimelineDetail label="What this means" body={event.meaning || getEventMeaning(event.type)} />
                        <TimelineDetail label="Check next" body={event.watchNext || getEventWatchNext(event.type)} />
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
                  </div>
                </a>
              )) : (
                <EmptyState title="No events yet" body="Add Finnhub and SEC data keys where needed to enrich this company timeline." />
              )}
            </div>

            <div className="border border-white/[0.08] rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={16} className="text-primary" />
                <p className="font-bold text-primary">Questions that make research easier</p>
              </div>
              <p className="text-sm text-secondary leading-relaxed mb-4">
                Good research starts with simple questions. Add one to your notes, then answer it after reading the chart, news, or filing.
              </p>
              <div className="space-y-3">
                {PROMPTS.map(item => (
                  <button
                    key={item.title}
                    onClick={() => saveNote(`${note}${note ? '\n' : ''}- ${item.prompt}\n  Why it matters: ${item.reason}\n`)}
                    className="w-full text-left text-sm text-secondary hover:text-primary border border-white/[0.08] hover:border-white/20 rounded-lg p-3 transition-colors"
                  >
                    <span className="block font-bold text-primary mb-1">{item.title}</span>
                    <span className="block leading-relaxed">{item.prompt}</span>
                    <span className="block mt-2 text-xs text-muted">{item.reason}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {active === 'filings' && (
          <div className="space-y-3">
            {filings.length > 0 ? filings.map(filing => (
              <a key={filing.accessionNumber} href={filing.documentUrl} target="_blank" rel="noopener noreferrer" className="block border border-white/[0.08] rounded-lg p-4 hover:border-white/20 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] text-muted font-bold uppercase">{filing.filedAt}{filing.reportDate ? ` / period ${filing.reportDate}` : ''}</p>
                    <h3 className="font-mono font-black text-primary mt-1">{filing.form}</h3>
                    <p className="text-sm text-secondary mt-2">{filing.description}</p>
                    <p className="text-xs text-muted mt-3 leading-relaxed">{getFilingContext(filing.form)}</p>
                  </div>
                  <span className="text-xs font-bold text-primary uppercase">Open SEC document</span>
                </div>
              </a>
            )) : (
              <EmptyState title="No SEC filings loaded" body="SEC EDGAR is free, but this ticker may not have a matching CIK or the SEC request may have failed." />
            )}
          </div>
        )}

        {active === 'notes' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <textarea
                value={note}
                onChange={e => saveNote(e.target.value)}
                placeholder={`Write what you discover about ${symbol}: business model, risks, catalysts, questions...`}
                className="w-full min-h-[260px] bg-white/[0.03] border border-white/[0.12] rounded-lg p-4 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-white/30 transition-colors"
              />
              <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                {saved ? <Check size={14} /> : <BookOpen size={14} />}
                <span>{saved ? 'Saved locally in this browser' : 'Notes save automatically as you type'}</span>
              </div>
            </div>
            <div className="border border-white/[0.08] rounded-lg p-5">
              <p className="font-bold text-primary mb-3">Research checklist</p>
              <div className="space-y-3 text-sm text-secondary">
                {['Business model', 'Recent quarter', 'Main risk', 'One metric to track', 'Question for later'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-4 h-4 border border-white/20 rounded" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {active === 'alerts' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 border border-white/[0.08] rounded-lg p-5">
              <p className="font-bold text-primary mb-2">Keyword watch</p>
              <p className="text-sm text-secondary mb-5">Store words you want to notice in future headlines or filings, like &quot;margin&quot;, &quot;guidance&quot;, or &quot;debt&quot;.</p>
              <div className="flex gap-2">
                <input
                  value={alertDraft}
                  onChange={e => setAlertDraft(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') addAlert() }}
                  placeholder="Add a keyword..."
                  className="flex-1 bg-white/[0.03] border border-white/[0.12] rounded-lg px-4 py-3 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-white/30"
                />
                <button onClick={addAlert} className="btn-primary inline-flex items-center gap-2">
                  <Plus size={16} /> Add
                </button>
              </div>
            </div>
            <div className="border border-white/[0.08] rounded-lg p-5">
              <p className="font-bold text-primary mb-4">Saved keywords</p>
              {alerts.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {alerts.map(alert => (
                    <button key={alert} onClick={() => removeAlert(alert)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.12] text-sm text-primary hover:bg-white/[0.06]">
                      {alert}
                      <X size={13} className="text-muted" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">No keywords yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-dashed border-white/[0.12] rounded-lg p-8 text-center">
      <p className="font-bold text-primary">{title}</p>
      <p className="text-sm text-secondary mt-2">{body}</p>
    </div>
  )
}

function TimelineDetail({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-md border border-white/[0.08] bg-black/20 p-3">
      <p className="text-[10px] font-black uppercase text-muted mb-1">{label}</p>
      <p className="text-xs leading-relaxed text-secondary">{body}</p>
    </div>
  )
}

function getEventMeaning(type: ResearchEvent['type']): string {
  if (type === 'earnings') return 'Earnings show whether sales, profit, and management expectations are getting stronger or weaker.'
  if (type === 'filing') return 'A filing is an official company document. Use it to check what the company reported in its own words.'
  if (type === 'news') return 'News explains the event investors may be reacting to, but it still needs to be checked against data.'
  return 'This event gives you a study point to connect with the chart, news, and company facts.'
}

function getEventWatchNext(type: ResearchEvent['type']): string {
  if (type === 'earnings') return 'Check revenue, EPS, margins, guidance, and whether the next quarter outlook changed.'
  if (type === 'filing') return 'Open the document and scan for risks, revenue trends, cash, debt, and management comments.'
  if (type === 'news') return 'Ask whether the story affects one company, a sector, or the whole market.'
  return 'Write one question in your notes and check it again when new data arrives.'
}

function getFilingContext(form: string): string {
  const normalized = form.toUpperCase()
  if (normalized.includes('10-K')) return 'Annual report: the full yearly business story, including risks, financial statements, and management discussion.'
  if (normalized.includes('10-Q')) return 'Quarterly report: a shorter update on sales, profit, cash, debt, and recent risks.'
  if (normalized.includes('8-K')) return 'Current report: a major event or announcement the company had to report quickly.'
  if (normalized.includes('DEF') || normalized.includes('14A')) return 'Proxy statement: voting items, board details, executive pay, and shareholder meeting information.'
  return 'Official SEC document: use it to verify important company facts instead of relying only on headlines.'
}
