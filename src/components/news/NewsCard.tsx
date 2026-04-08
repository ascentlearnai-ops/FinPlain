import { ExternalLink } from 'lucide-react'
import type { NewsArticle } from '@/lib/types'
import { formatRelativeTime } from '@/lib/formatters'

interface Props { article: NewsArticle }

const CATEGORY_COLORS: Record<string, string> = {
  tech: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  energy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  finance: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  economy: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  general: 'bg-white/[0.06] text-secondary border-white/[0.08]',
}

export default function NewsCard({ article }: Props) {
  return (
    <div className="glass-card p-5 flex flex-col gap-3 relative z-10">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-muted">{article.source}</span>
        <span className="text-muted text-xs">·</span>
        <span className="text-xs text-muted">{formatRelativeTime(article.publishedAt)}</span>
        <span className={`ml-auto text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${CATEGORY_COLORS[article.category] || CATEGORY_COLORS.general}`}>
          {article.category}
        </span>
      </div>
      <h3 className="font-bold text-sm text-primary leading-snug line-clamp-2">{article.headline}</h3>
      
      {article.imageUrl && (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/[0.04]">
          <img src={article.imageUrl} alt={article.headline} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="bg-accent/[0.04] border border-accent/10 rounded-xl p-3.5">
        <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1.5">AI Summary</p>
        <p className="text-sm text-secondary leading-relaxed">{article.simpleSummary}</p>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-1.5 flex-wrap">
          {article.relatedTickers.slice(0, 3).map(t => (
            <a key={t} href={`/stock/${t}`}
              className="font-mono text-xs font-semibold bg-white/[0.04] hover:bg-accent/10 hover:text-accent px-2.5 py-1 rounded-lg border border-white/[0.06] hover:border-accent/20 transition-all">
              {t}
            </a>
          ))}
        </div>
        <a href={article.url} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-muted hover:text-accent transition-colors">
          Source <ExternalLink size={11} />
        </a>
      </div>
    </div>
  )
}
