import { ExternalLink } from 'lucide-react'
import type { NewsArticle } from '@/lib/types'
import { formatRelativeTime } from '@/lib/formatters'

interface Props { article: NewsArticle }

const CATEGORY_COLORS: Record<string, string> = {
  tech: 'bg-blue-50 text-blue-600 border-blue-100',
  energy: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  finance: 'bg-amber-50 text-amber-600 border-amber-100',
  economy: 'bg-violet-50 text-violet-600 border-violet-100',
  general: 'bg-gray-50 text-gray-600 border-gray-100',
}

export default function NewsCard({ article }: Props) {
  return (
    <div className="glass-card p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-muted">{article.source}</span>
        <span className="text-muted text-xs">·</span>
        <span className="text-xs text-muted">{formatRelativeTime(article.publishedAt)}</span>
        <span className={`ml-auto text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${CATEGORY_COLORS[article.category]}`}>
          {article.category}
        </span>
      </div>
      <h3 className="font-bold text-sm text-primary leading-snug line-clamp-2">{article.headline}</h3>
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5">
        <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1.5">AI Summary</p>
        <p className="text-sm text-secondary leading-relaxed">{article.simpleSummary}</p>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-1.5 flex-wrap">
          {article.relatedTickers.slice(0, 3).map(t => (
            <a key={t} href={`/stock/${t}`}
              className="font-mono text-xs font-semibold bg-gray-50 hover:bg-accent-bg hover:text-accent px-2.5 py-1 rounded-lg border border-gray-100 hover:border-blue-100 transition-all">
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
