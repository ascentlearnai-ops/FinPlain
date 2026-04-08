import Link from 'next/link'
import { formatPrice, formatChange, formatPercent, getChangeArrow } from '@/lib/formatters'

interface Props { name: string; ticker: string; price: number; change: number; changePercent: number; plainLabel: string }

export default function MarketCard({ name, ticker, price, change, changePercent, plainLabel }: Props) {
  const isUp = (change || 0) >= 0
  return (
    <Link href={`/stock/${ticker}`} className="glass-card p-6 block group relative z-10">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="font-semibold text-sm text-primary">{name}</p>
          <p className="text-xs text-muted mt-1">{plainLabel}</p>
        </div>
        <span className={`font-mono font-semibold text-xs px-2.5 py-1.5 rounded-lg ${isUp ? 'bg-up/10 text-up' : 'bg-down/10 text-down'}`}>
          {getChangeArrow(change)} {formatPercent(changePercent)}
        </span>
      </div>
      <p className="font-mono font-bold text-primary text-3xl mb-1">{formatPrice(price)}</p>
      <p className={`font-mono text-sm ${isUp ? 'text-up' : 'text-down'}`}>{getChangeArrow(change)} {formatChange(change)} today</p>
      <div className="mt-5 h-1 bg-white/[0.04] rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${isUp ? 'bg-up' : 'bg-down'}`}
          style={{ width: `${Math.min(Math.abs(changePercent || 0) * 20, 100)}%` }} />
      </div>
    </Link>
  )
}
