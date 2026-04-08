import { formatPrice, formatPercent, getChangeColor, getChangeBg, getChangeArrow } from '@/lib/formatters'
import type { StockQuote, StockOverview } from '@/lib/types'

interface Props { quote: StockQuote; overview: StockOverview }

export default function StockHeader({ quote, overview }: Props) {
  const isUp = quote.changePercent >= 0
  return (
    <div>
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <div className="w-12 h-12 bg-accent-bg border border-blue-100 rounded-2xl flex items-center justify-center">
          <span className="font-mono font-bold text-secondary">{quote.ticker.slice(0, 2)}</span>
        </div>
        <div>
          <h1 className="font-extrabold text-2xl md:text-3xl text-primary tracking-tight">{overview.companyName}</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-sm text-muted">{quote.ticker}</span>
            <span className="text-muted text-xs">·</span>
            <span className="text-xs text-muted">{overview.sector}</span>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-3 mt-4 flex-wrap">
        <span className="font-mono font-bold text-4xl md:text-5xl text-primary">{formatPrice(quote.price)}</span>
        <div className={`flex items-center gap-2 font-mono font-semibold text-sm px-3 py-2 rounded-xl ${getChangeBg(quote.changePercent)} ${getChangeColor(quote.changePercent)}`}>
          {getChangeArrow(quote.changePercent)} {formatPercent(Math.abs(quote.changePercent))}
          <span className="text-xs opacity-60">today</span>
        </div>
      </div>
    </div>
  )
}
