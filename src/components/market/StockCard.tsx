import Link from 'next/link'
import { formatPrice, formatPercent, getChangeArrow } from '@/lib/formatters'
import { ArrowUpRight } from 'lucide-react'

interface Props { ticker: string; price?: number; changePercent?: number }

export default function StockCard({ ticker, price, changePercent }: Props) {
  const isUp = (changePercent || 0) >= 0

  return (
    <Link href={`/stock/${ticker}`} className="flex items-center justify-between p-4 rounded-lg hover:bg-white/[0.04] transition-colors group border border-transparent hover:border-white/[0.08]">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white/[0.04] rounded-md flex items-center justify-center flex-shrink-0 border border-white/[0.08] font-mono font-black text-xs text-secondary group-hover:text-primary">
          {ticker.slice(0, 2)}
        </div>
        <div>
          <span className="font-['JetBrains_Mono'] font-black text-sm text-primary block">{ticker}</span>
          <span className="text-[10px] text-muted font-bold uppercase block mt-0.5">Live quote</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="font-['JetBrains_Mono'] font-bold text-sm text-primary">{formatPrice(price)}</p>
          <div className={`inline-flex items-center gap-1.5 mt-1 font-mono font-black text-[10px] px-2 py-0.5 rounded-md border ${isUp ? 'text-primary border-white/20' : 'text-muted border-white/10'}`}>
            {getChangeArrow(changePercent)}
            {formatPercent(Math.abs(changePercent || 0))}
          </div>
        </div>
        <div className="hidden sm:flex w-8 h-8 rounded-md bg-white/[0.04] items-center justify-center text-muted group-hover:text-primary transition-colors">
          <ArrowUpRight size={14} className={isUp ? '' : 'rotate-90'} />
        </div>
      </div>
    </Link>
  )
}
