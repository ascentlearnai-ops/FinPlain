'use client'
import { useState } from 'react'
import { HelpCircle, X } from 'lucide-react'

interface Props { term: string; definition: string; example: string }

export default function GlossaryTooltip({ term, definition, example }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-flex">
      <button onClick={() => setOpen(!open)} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
        className="text-muted hover:text-primary transition-colors" aria-label={`What is ${term}?`}>
        <HelpCircle size={12} />
      </button>
      {open && (
        <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-72 bg-card border border-white/[0.14] rounded-lg shadow-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm text-primary">{term}</span>
            <button onClick={() => setOpen(false)} className="text-muted hover:text-primary md:hidden" aria-label="Close tooltip"><X size={12} /></button>
          </div>
          <p className="text-xs text-secondary leading-relaxed mb-2">{definition}</p>
          <p className="text-xs text-muted italic">{example}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-card border-r border-b border-white/[0.14] rotate-45 -mt-1" />
        </div>
      )}
    </span>
  )
}
