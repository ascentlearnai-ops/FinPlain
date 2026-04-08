import { formatPrice, formatPercent, getChangeArrow } from '@/lib/formatters'
import type { StockQuote, StockOverview } from '@/lib/types'
import { Activity } from 'lucide-react'

interface Props { quote: StockQuote; overview: StockOverview }

export default function StockHeader({ quote, overview }: Props) {
  const isUp = (quote.changePercent || 0) >= 0
  
  return (
    <div className="relative">
      <div className="flex items-center gap-5 mb-6 flex-wrap">
        <div className="p-[1px] rounded-[20px] bg-gradient-to-br from-blue-500 via-purple-500 to-accent">
          <div className="w-16 h-16 bg-background rounded-[19px] flex items-center justify-center">
            <Activity size={28} className="text-accent" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3">
             <h1 className="font-['Outfit'] font-extrabold text-3xl md:text-5xl text-primary tracking-tight">{overview.companyName}</h1>
             <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-muted uppercase tracking-widest">{quote.ticker}</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm font-bold text-accent/80 uppercase tracking-widest">{overview.sector}</span>
            <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
            <span className="text-sm font-medium text-muted">{overview.industry}</span>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-5 mt-8 flex-wrap">
        <div className="relative">
          <span className="font-mono font-black text-5xl md:text-7xl text-primary tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            {formatPrice(quote.price)}
          </span>
          <div className={`absolute -top-4 -right-2 w-3 h-3 rounded-full animate-pulse-dot ${isUp ? 'bg-up shadow-[0_0_10px_#00ffaa]' : 'bg-down shadow-[0_0_10px_#ff3366]'}`} />
        </div>
        
        <div className={`flex flex-col gap-1 px-5 py-2.5 rounded-2xl border ${isUp ? 'bg-up/10 border-up/20 text-up' : 'bg-down/10 border-down/20 text-down'}`}>
          <span className="font-mono font-black text-xl leading-none">
            {getChangeArrow(quote.changePercent)} {formatPercent(Math.abs(quote.changePercent || 0))}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Session Change</span>
        </div>
      </div>
    </div>
  )
}
