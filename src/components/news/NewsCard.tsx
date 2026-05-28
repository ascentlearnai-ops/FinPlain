/* eslint-disable @next/next/no-img-element */
import { BookOpen, ExternalLink, Newspaper, Target } from 'lucide-react'
import type { NewsArticle } from '@/lib/types'
import { formatRelativeTime } from '@/lib/formatters'

interface Props { article: NewsArticle }

export default function NewsCard({ article }: Props) {
  const summary = buildSummaryParts(article)

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

        <div className="space-y-3 mb-6 flex-1">
          <SummaryBlock icon={Newspaper} label="What happened" body={summary.whatHappened} />
          <SummaryBlock icon={Target} label="Why it matters" body={summary.whyItMatters} />
          <SummaryBlock icon={BookOpen} label={`Word to know: ${summary.word.term}`} body={summary.word.meaning} />
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-2">
            {article.relatedTickers.slice(0, 2).map(ticker => (
              <a key={ticker} href={`/stock/${ticker}`}
                className="font-mono text-[11px] font-bold bg-white/[0.04] hover:bg-white/[0.1] px-3 py-1.5 rounded-md border border-white/[0.1] transition-colors">
                ${ticker}
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

function SummaryBlock({ icon: Icon, label, body }: { icon: typeof Newspaper; label: string; body: string }) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-3">
      <div className="mb-2 flex items-center gap-2">
        <Icon size={13} className="text-primary" />
        <p className="text-[10px] font-bold text-muted uppercase">{label}</p>
      </div>
      <p className="text-sm text-secondary leading-relaxed line-clamp-3">
        {body}
      </p>
    </div>
  )
}

function buildSummaryParts(article: NewsArticle) {
  const sentences = splitSentences(article.simpleSummary)
  const whatHappened = sentences[0] || 'A market story was published about recent company or economic news.'
  const whyItMatters = sentences[1] || fallbackWhyItMatters(article.category)
  const next = sentences.slice(2).join(' ')
  const word = chooseWordToKnow(article)

  return {
    whatHappened,
    whyItMatters: next ? `${whyItMatters} ${next}` : whyItMatters,
    word,
  }
}

function splitSentences(value: string): string[] {
  return value
    .split(/(?<=[.!?])\s+/)
    .map(sentence => sentence.trim())
    .filter(Boolean)
}

function fallbackWhyItMatters(category: NewsArticle['category']): string {
  if (category === 'economy') return 'Economic news can affect interest rates, company demand, and investor confidence.'
  if (category === 'tech') return 'Technology stories can change growth expectations for companies that rely on new products and platforms.'
  if (category === 'energy') return 'Energy news can affect fuel costs, inflation pressure, and profits for energy companies.'
  if (category === 'finance') return 'Finance news can affect banks, borrowing costs, and how investors value risk.'
  return 'The story may change expectations, which is often what moves prices.'
}

function chooseWordToKnow(article: NewsArticle): { term: string; meaning: string } {
  const text = `${article.headline} ${article.simpleSummary}`.toLowerCase()
  if (text.includes('earnings') || text.includes('profit')) {
    return { term: 'Earnings', meaning: 'Earnings are company profits. Investors compare them with expectations and past results.' }
  }
  if (text.includes('revenue') || text.includes('sales')) {
    return { term: 'Revenue', meaning: 'Revenue is money from sales before costs are subtracted.' }
  }
  if (text.includes('inflation') || text.includes('rates')) {
    return { term: 'Rates', meaning: 'Rates are borrowing costs. Higher rates can make loans more expensive and pressure stock prices.' }
  }
  if (text.includes('guidance') || text.includes('outlook')) {
    return { term: 'Guidance', meaning: 'Guidance is what company leaders say they expect in the future.' }
  }
  if (article.category === 'economy') return { term: 'Macro', meaning: 'Macro means big-picture economic forces like jobs, prices, rates, and growth.' }
  return { term: 'Catalyst', meaning: 'A catalyst is an event that can make investors rethink a stock or market.' }
}
