import Link from 'next/link'
import { formatPrice, formatChange, formatPercent, getChangeColor, getChangeBg, getChangeArrow } from '@/lib/formatters'

interface Props { name: string; ticker: string; price?: number; change?: number; changePercent?: number; plainLabel: string }

export default function MarketCard({ name, ticker, price, change, changePercent, plainLabel }: Props) {
  const isUp = change !== undefined ? change >= 0 : true
  return (
    <Link href={`/stock/${ticker}`} className="glass-card p-6 block group text-decoration-none">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="font-semibold text-xs tracking-widest uppercase text-accent">{name}</p>
          <p className="text-xs text-secondary mt-1">{plainLabel}</p>
        </div>
        <span className={`font-mono font-semibold text-xs px-2.5 py-1.5 rounded-lg ${getChangeBg(change)} ${getChangeColor(change)}`}>
          {getChangeArrow(change)} {formatPercent(changePercent)}
        </span>
      </div>
      <p className="font-mono font-bold text-primary text-3xl mb-1">{formatPrice(price)}</p>
      <p className={`font-mono text-sm ${getChangeColor(change)}`}>{getChangeArrow(change)} {formatChange(change)} today</p>
      <div className="mt-5 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${isUp ? 'bg-up' : 'bg-down'}`}
          style={{ width: `${Math.min(Math.abs(changePercent || 0) * 20, 100)}%` }} />
      </div>
    </Link>
  )
}
