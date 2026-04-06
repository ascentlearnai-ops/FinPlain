import Link from 'next/link'
import { formatPrice, formatPercent, getChangeColor, getChangeBg, getChangeArrow } from '@/lib/formatters'

interface Props { ticker: string; price?: number; changePercent?: number }

export default function StockCard({ ticker, price, changePercent }: Props) {
  return (
    <Link href={`/stock/${ticker}`} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all group">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-accent-bg rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-100">
          <span className="font-mono font-bold text-xs text-accent">{ticker.slice(0, 2)}</span>
        </div>
        <span className="font-mono font-semibold text-sm text-primary group-hover:text-accent transition-colors">{ticker}</span>
      </div>
      <div className="text-right">
        <p className="font-mono font-semibold text-sm text-primary">{formatPrice(price)}</p>
        <span className={`inline-block mt-0.5 font-mono text-xs px-2 py-0.5 rounded-md ${getChangeBg(changePercent)} ${getChangeColor(changePercent)}`}>
          {getChangeArrow(changePercent)} {formatPercent(Math.abs(changePercent || 0))}
        </span>
      </div>
    </Link>
  )
}
