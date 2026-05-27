import { formatPrice, formatPercent, getChangeArrow } from '@/lib/formatters'
import type { StockQuote, StockOverview } from '@/lib/types'
import { Activity } from 'lucide-react'

interface Props { quote: StockQuote; overview: StockOverview }

export default function StockHeader({ quote, overview }: Props) {
  const isUp = (quote.changePercent || 0) >= 0

  return (
    <div className="relative">
      <div className="flex items-center gap-5 mb-6 flex-wrap">
        <div className="w-16 h-16 bg-white text-black rounded-lg flex items-center justify-center">
          <Activity size={28} />
        </div>
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-['Outfit'] font-extrabold text-3xl md:text-5xl text-primary">{overview.companyName}</h1>
            <span className="bg-white/[0.04] border border-white/[0.12] px-3 py-1 rounded-md text-xs font-bold text-muted uppercase">{quote.ticker}</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm font-bold text-primary uppercase">{overview.sector}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span className="text-sm font-medium text-muted">{overview.industry}</span>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-5 mt-8 flex-wrap">
        <span className="font-mono font-black text-5xl md:text-7xl text-primary">
          {formatPrice(quote.price)}
        </span>

        <div className={`flex flex-col gap-1 px-5 py-2.5 rounded-lg border ${isUp ? 'border-white/20 text-primary' : 'border-white/10 text-muted'}`}>
          <span className="font-mono font-black text-xl leading-none">
            {getChangeArrow(quote.changePercent)} {formatPercent(Math.abs(quote.changePercent || 0))}
          </span>
          <span className="text-[10px] font-bold uppercase opacity-60">Session change</span>
        </div>
      </div>
    </div>
  )
}
