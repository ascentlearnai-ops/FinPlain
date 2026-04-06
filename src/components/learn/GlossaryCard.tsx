import type { GlossaryTerm } from '@/lib/types'

const CATEGORY_COLORS: Record<string, string> = {
  stocks: 'bg-blue-50 text-blue-600 border-blue-100',
  markets: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  numbers: 'bg-amber-50 text-amber-600 border-amber-100',
  basics: 'bg-violet-50 text-violet-600 border-violet-100',
}

interface Props { term: GlossaryTerm; style?: React.CSSProperties }

export default function GlossaryCard({ term, style }: Props) {
  return (
    <div className="glass-card p-5 animate-fade-up opacity-0 fill-mode-forwards" style={style}>
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 bg-accent-bg border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-accent font-bold font-mono text-lg">
          {term.term.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="font-bold text-base text-primary">{term.term}</h3>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${CATEGORY_COLORS[term.category]}`}>{term.category}</span>
          </div>
          <p className="text-sm text-secondary leading-relaxed mb-2">{term.definition}</p>
          <p className="text-xs text-muted italic leading-relaxed">{term.example}</p>
        </div>
      </div>
    </div>
  )
}
