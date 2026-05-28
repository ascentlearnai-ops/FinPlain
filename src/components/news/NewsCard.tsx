/* eslint-disable @next/next/no-img-element */
import { ExternalLink, Newspaper } from 'lucide-react'
import type { NewsArticle } from '@/lib/types'
import { formatRelativeTime } from '@/lib/formatters'

interface Props { article: NewsArticle }

export default function NewsCard({ article }: Props) {
  return (
    <div className="glass-card p-0 flex flex-col overflow-hidden group">
      <div className="relative w-full h-44 overflow-hidden border-b border-white/[0.08] bg-surface">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.headline}
            className="w-full h-full object-cover grayscale opacity-75 transition-opacity duration-300 group-hover:opacity-95"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-surface flex items-center justify-center">
            <Newspaper className="text-white/10 w-14 h-14" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className="text-[10px] font-bold px-3 py-1 rounded-md border border-white/[0.16] bg-black/70 text-white uppercase">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 text-[11px] font-medium text-muted uppercase">
          <span className="text-primary">{article.source}</span>
          <span>/</span>
          <span>{formatRelativeTime(article.publishedAt)}</span>
        </div>

        <h3 className="font-bold text-lg text-primary leading-tight mb-4 group-hover:text-white transition-colors line-clamp-2">
          {article.headline}
        </h3>

        <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.08] mb-6 flex-1">
          <p className="text-[10px] font-bold text-muted uppercase mb-2">What this means</p>
          <p className="text-sm text-secondary leading-relaxed line-clamp-3">
            {article.simpleSummary}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-2">
            {article.relatedTickers.slice(0, 2).map(t => (
              <a key={t} href={`/stock/${t}`}
                className="font-mono text-[11px] font-bold bg-white/[0.04] hover:bg-white/[0.1] px-3 py-1.5 rounded-md border border-white/[0.1] transition-colors">
                ${t}
              </a>
            ))}
          </div>
          <a href={article.url} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.04] text-muted hover:text-primary hover:bg-white/[0.1] transition-colors"
            aria-label="Open article"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
