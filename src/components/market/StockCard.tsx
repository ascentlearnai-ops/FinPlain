import Link from 'next/link'
import { formatPrice, formatPercent, getChangeArrow } from '@/lib/formatters'

interface Props { ticker: string; price?: number; changePercent?: number }

export default function StockCard({ ticker, price, changePercent }: Props) {
  const isUp = (changePercent || 0) >= 0
  return (
    <Link href={`/stock/${ticker}`} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.03] transition-all group">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-accent/20">
          <span className="font-mono font-bold text-xs text-accent">{ticker.slice(0, 2)}</span>
        </div>
        <span className="font-mono font-semibold text-sm text-primary group-hover:text-accent transition-colors">{ticker}</span>
      </div>
      <div className="text-right">
        <p className="font-mono font-semibold text-sm text-primary">{formatPrice(price)}</p>
        <span className={`inline-block mt-0.5 font-mono text-xs px-2 py-0.5 rounded-md ${isUp ? 'bg-up/10 text-up' : 'bg-down/10 text-down'}`}>
          {getChangeArrow(changePercent)} {formatPercent(Math.abs(changePercent || 0))}
        </span>
      </div>
    </Link>
  )
}
