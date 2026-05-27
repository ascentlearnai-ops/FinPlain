import type { GlossaryTerm } from '@/lib/types'
import { ArrowUpRight, BookOpen } from 'lucide-react'

interface Props { term: GlossaryTerm; style?: React.CSSProperties }

export default function GlossaryCard({ term, style }: Props) {
  return (
    <div
      className="glass-card p-6 h-full flex flex-col justify-between group cursor-pointer"
      style={style}
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-md bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-lg">
            {term.emoji || '?'}
          </div>
          <div className="flex items-center gap-1 text-muted group-hover:text-primary transition-colors">
            <span className="text-[9px] font-black uppercase">Detail</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        <h3 className="text-xl font-['Outfit'] font-bold text-primary mb-3">{term.term}</h3>
        <p className="text-secondary text-sm leading-relaxed font-medium mb-6 line-clamp-2">
          {term.definition}
        </p>
      </div>

      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={12} className="text-muted" />
          <span className="text-[9px] font-black text-muted uppercase">{term.category}</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
      </div>
    </div>
  )
}
