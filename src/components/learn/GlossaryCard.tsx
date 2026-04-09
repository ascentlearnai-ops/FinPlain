import type { GlossaryTerm } from '@/lib/types'
import { ArrowUpRight, BookOpen } from 'lucide-react'

interface Props { term: GlossaryTerm; style?: any }

export default function GlossaryCard({ term, style }: Props) {
  return (
    <div 
      className="glass-card p-6 h-full flex flex-col justify-between group cursor-pointer transition-all hover:-translate-y-1 hover:border-accent/30 animate-fadeIn border-white/[0.04] bg-[#0d1017]/40 relative overflow-hidden" 
      style={style}
    >
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/[0.03] rounded-full blur-2xl transition-all group-hover:bg-accent/[0.08]" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-lg transition-all group-hover:bg-accent/10 group-hover:border-accent/20 group-hover:scale-110">
            {term.emoji || '💎'}
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
             <span className="text-[9px] font-black text-accent uppercase tracking-widest">Detail</span>
             <ArrowUpRight size={14} className="text-accent" />
          </div>
        </div>

        <h3 className="text-xl font-['Outfit'] font-bold text-primary mb-3 group-hover:text-accent transition-colors">{term.term}</h3>
        <p className="text-secondary text-sm leading-relaxed font-medium mb-6 line-clamp-2">
          {term.definition}
        </p>
      </div>

      <div className="relative z-10 pt-4 border-t border-white/[0.04] flex items-center justify-between">
        <div className="flex items-center gap-2">
           <BookOpen size={12} className="text-muted" />
           <span className="text-[9px] font-black text-muted uppercase tracking-[0.2em]">{term.category}</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/5 group-hover:bg-accent animate-pulse" />
      </div>
    </div>
  )
}
