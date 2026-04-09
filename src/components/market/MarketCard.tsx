import Link from 'next/link'
import { formatPrice, formatChange, formatPercent, getChangeArrow } from '@/lib/formatters'
import { ArrowUpRight } from 'lucide-react'

interface Props { name: string; ticker: string; price: number; change: number; changePercent: number; plainLabel: string }

export default function MarketCard({ name, ticker, price, change, changePercent, plainLabel }: Props) {
  const isUp = (change || 0) >= 0
  
  return (
    <Link href={`/stock/${ticker}`} className="glass-card p-8 block group relative overflow-hidden">
      {/* Corner Glow */}
      <div className={`absolute -top-10 -right-10 w-24 h-24 blur-[50px] opacity-20 transition-all group-hover:opacity-40 ${isUp ? 'bg-up' : 'bg-down'}`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="font-bold text-lg text-primary group-hover:text-accent transition-colors">{name}</p>
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">{ticker} &bull; INDEX</p>
          </div>
          <div className={`p-2 rounded-xl border ${isUp ? 'bg-up/10 border-up/20 text-up' : 'bg-down/10 border-down/20 text-down'}`}>
            <ArrowUpRight size={18} className={isUp ? '' : 'rotate-90'} />
          </div>
        </div>

        <div className="mb-4">
          <p className="font-mono font-black text-4xl text-primary tracking-tighter">{formatPrice(price)}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`font-mono font-bold text-sm px-2 py-0.5 rounded-lg ${isUp ? 'bg-up/10 text-up' : 'bg-down/10 text-down'}`}>
              {getChangeArrow(change)} {formatPercent(changePercent)}
            </span>
            <span className="text-xs text-muted font-medium">{formatChange(change)} today</span>
          </div>
        </div>

        <p className="text-xs text-secondary leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
          {plainLabel}
        </p>
      </div>
    </Link>
  )
}
