import Link from 'next/link'
import { formatPrice, formatPercent, getChangeArrow } from '@/lib/formatters'
import { ArrowUpRight } from 'lucide-react'

interface Props { ticker: string; price?: number; changePercent?: number }

export default function StockCard({ ticker, price, changePercent }: Props) {
  const isUp = (changePercent || 0) >= 0
  
  return (
    <Link href={`/stock/${ticker}`} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/[0.04] transition-all group border border-transparent hover:border-white/5">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-white/[0.04] rounded-xl flex items-center justify-center flex-shrink-0 border border-white/[0.08] group-hover:border-accent/30 transition-all font-mono font-black text-xs text-muted group-hover:text-accent">
          {ticker.slice(0, 2)}
        </div>
        <div>
          <span className="font-['JetBrains_Mono'] font-black text-sm text-primary tracking-tighter group-hover:text-accent transition-colors block">{ticker}</span>
          <span className="text-[10px] text-muted font-bold uppercase tracking-widest block mt-0.5">Real-Time Data</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="font-['JetBrains_Mono'] font-bold text-sm text-primary">{formatPrice(price)}</p>
          <div className={`flex items-center gap-1.5 mt-1 font-mono font-black text-[10px] px-2 py-0.5 rounded-md ${isUp ? 'text-up bg-up/10' : 'text-down bg-down/10'}`}>
            {getChangeArrow(changePercent)}
            {formatPercent(Math.abs(changePercent || 0))}
          </div>
        </div>
        <div className="hidden sm:flex w-8 h-8 rounded-full bg-white/[0.04] items-center justify-center text-muted group-hover:bg-accent/10 group-hover:text-accent transition-all">
           <ArrowUpRight size={14} className={isUp ? '' : 'rotate-90'} />
        </div>
      </div>
    </Link>
  )
}
