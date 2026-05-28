import type { GlossaryTerm } from '@/lib/types'
import type { CSSProperties } from 'react'
import { ArrowUpRight, Bookmark, BookOpen } from 'lucide-react'

interface Props {
  term: GlossaryTerm
  style?: CSSProperties
  saved?: boolean
  onOpen?: () => void
  onToggleSave?: () => void
}

export default function GlossaryCard({ term, style, saved = false, onOpen, onToggleSave }: Props) {
  return (
    <article
      className="glass-card p-6 h-full flex flex-col justify-between group"
      style={style}
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-md bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-sm font-black text-primary">
            {term.term.slice(0, 1)}
          </div>
          {onToggleSave ? (
            <button
              type="button"
              onClick={onToggleSave}
              className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[9px] font-black uppercase transition-colors ${
                saved
                  ? 'border-white bg-white text-black'
                  : 'border-white/[0.12] bg-white/[0.03] text-muted hover:text-primary hover:border-white/25'
              }`}
              aria-label={`${saved ? 'Remove saved term' : 'Save term'} ${term.term}`}
            >
              <Bookmark size={12} />
              {saved ? 'Saved' : 'Save'}
            </button>
          ) : (
            <div className="flex items-center gap-1 text-muted group-hover:text-primary transition-colors">
              <span className="text-[9px] font-black uppercase">Detail</span>
              <ArrowUpRight size={14} />
            </div>
          )}
        </div>

        <h3 className="text-xl font-['Outfit'] font-bold text-primary mb-3">{term.term}</h3>
        <p className="text-secondary text-sm leading-relaxed font-medium mb-4 line-clamp-3">
          {term.brief || term.definition}
        </p>
        {term.realWorldExample && (
          <p className="text-xs text-muted leading-relaxed line-clamp-2">
            Example: {term.realWorldExample}
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={12} className="text-muted" />
          <span className="text-[9px] font-black text-muted uppercase">{term.category}</span>
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-1 text-[9px] font-black uppercase text-muted hover:text-primary transition-colors"
        >
          Detail
          <ArrowUpRight size={14} />
        </button>
      </div>
    </article>
  )
}
