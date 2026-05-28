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
  'What does this company sell, and who buys it?',
  'What changed in the latest quarter?',
  'What could go wrong for this business?',
  'What number should I check again next time?',
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
                {PROMPTS.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => saveNote(`${note}${note ? '\n' : ''}- ${prompt} `)}
                    className="w-full text-left text-sm text-secondary hover:text-primary border border-white/[0.08] hover:border-white/20 rounded-lg p-3 transition-colors"
                  >
                    {prompt}
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
                placeholder={`Write what you learn about ${symbol}: business model, risks, catalysts, questions...`}
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
