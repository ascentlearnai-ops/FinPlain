import Link from 'next/link'
import { formatPrice, formatChange, formatPercent, getChangeArrow } from '@/lib/formatters'
import { ArrowUpRight } from 'lucide-react'

interface Props { name: string; ticker: string; price: number; change: number; changePercent: number; plainLabel: string }

export default function MarketCard({ name, ticker, price, change, changePercent, plainLabel }: Props) {
  const isUp = (change || 0) >= 0

  return (
    <Link href={`/stock/${ticker}`} className="glass-card p-6 block group">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="font-bold text-lg text-primary group-hover:text-white transition-colors">{name}</p>
          <p className="text-[10px] font-bold text-muted uppercase mt-1">{ticker} / index proxy</p>
        </div>
        <div className="p-2 rounded-md border border-white/[0.12] text-secondary group-hover:text-primary">
          <ArrowUpRight size={18} className={isUp ? '' : 'rotate-90'} />
        </div>
      </div>

      <div className="mb-5">
        <p className="font-mono font-black text-4xl text-primary">{formatPrice(price)}</p>
        <div className="flex items-center gap-2 mt-3">
          <span className={`font-mono font-bold text-sm px-2 py-1 rounded-md border ${isUp ? 'border-white/20 text-primary' : 'border-white/10 text-muted'}`}>
            {getChangeArrow(change)} {formatPercent(changePercent)}
          </span>
          <span className="text-xs text-muted font-medium">{formatChange(change)} today</span>
        </div>
      </div>

      <p className="text-xs text-secondary leading-relaxed">
        {plainLabel}
      </p>
    </Link>
  )
}
