/* eslint-disable @next/next/no-img-element */
import { ExternalLink, Flame } from 'lucide-react'
import type { NewsArticle } from '@/lib/types'
import { formatRelativeTime } from '@/lib/formatters'

interface Props { article: NewsArticle }

const CATEGORY_COLORS: Record<string, string> = {
  tech: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
  energy: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
  finance: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
  economy: 'from-violet-500/20 to-fuchsia-500/20 text-violet-400 border-violet-500/30',
  general: 'from-white/5 to-white/10 text-secondary border-white/10',
}

export default function NewsCard({ article }: Props) {
  return (
    <div className="glass-card p-0 flex flex-col overflow-hidden group">
      {/* Image Header */}
      <div className="relative w-full h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60" />
        {article.imageUrl ? (
          <img 
            src={article.imageUrl} 
            alt={article.headline} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-surface flex items-center justify-center">
            <Flame className="text-white/5 w-16 h-16" />
          </div>
        )}
        <div className="absolute top-4 right-4 z-20">
          <span className={`text-[10px] font-bold px-3 py-1 rounded-full border backdrop-blur-md bg-gradient-to-r uppercase tracking-widest ${CATEGORY_COLORS[article.category] || CATEGORY_COLORS.general}`}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 text-[11px] font-medium text-muted uppercase tracking-wider">
          <span className="text-accent">{article.source}</span>
          <span>•</span>
          <span>{formatRelativeTime(article.publishedAt)}</span>
        </div>
        
        <h3 className="font-bold text-lg text-primary leading-tight mb-4 group-hover:text-accent transition-colors line-clamp-2">
          {article.headline}
        </h3>

        <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/[0.05] mb-6 flex-1">
          <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-2 opacity-80">AI Analysis</p>
          <p className="text-sm text-secondary leading-relaxed line-clamp-3 italic">
            &ldquo;{article.simpleSummary}&rdquo;
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-2">
            {article.relatedTickers.slice(0, 2).map(t => (
              <a key={t} href={`/stock/${t}`}
                className="font-mono text-[11px] font-bold bg-white/[0.05] hover:bg-accent/20 hover:text-accent px-3 py-1.5 rounded-lg border border-white/10 transition-all">
                ${t}
              </a>
            ))}
          </div>
          <a href={article.url} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] text-muted hover:text-accent hover:bg-accent/10 transition-all">
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
