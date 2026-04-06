import GlossaryTooltip from '@/components/ui/GlossaryTooltip'
import type { StockOverview } from '@/lib/types'
import { formatMarketCap, formatPrice, formatVolume } from '@/lib/formatters'

interface Props { overview: StockOverview }

export default function StockStats({ overview }: Props) {
  const stats = [
    { label: 'Market Cap', value: formatMarketCap(overview.marketCap), term: 'Market Cap', definition: 'Total dollar value of all outstanding shares.', example: 'The company\'s price tag.' },
    { label: 'P/E Ratio', value: overview.peRatio ? overview.peRatio.toFixed(1) + 'x' : 'N/A', term: 'P/E Ratio', definition: 'Share price divided by earnings per share.', example: 'How much investors pay per $1 of profit.' },
    { label: 'EPS', value: overview.eps ? '$' + overview.eps.toFixed(2) : 'N/A', term: 'EPS', definition: 'Net income divided by shares outstanding.', example: 'Profit per share you own.' },
    { label: '52W High', value: formatPrice(overview.week52High), term: '52-Week High', definition: 'Highest price in the past 12 months.', example: 'The peak of the mountain this year.' },
    { label: '52W Low', value: formatPrice(overview.week52Low), term: '52-Week Low', definition: 'Lowest price in the past 12 months.', example: 'The valley floor this year.' },
    { label: 'Avg Volume', value: formatVolume(overview.avgVolume), term: 'Volume', definition: 'Average shares traded per day.', example: 'How busy the trading floor is.' },
    { label: 'Dividend Yield', value: overview.dividendYield ? overview.dividendYield.toFixed(2) + '%' : 'None', term: 'Dividend Yield', definition: 'Annual dividend as % of price.', example: 'Your annual income return on the stock.' },
    { label: 'Beta', value: (overview as any).beta ? (overview as any).beta.toFixed(2) : 'N/A', term: 'Volatility', definition: 'Sensitivity to market moves. Beta > 1 = more volatile.', example: 'A measure of how wild the ride gets.' },
    { label: 'Analyst Target', value: (overview as any).analystTarget ? '$' + (overview as any).analystTarget.toFixed(2) : 'N/A', term: 'P/E Ratio', definition: 'Wall Street\'s 12-month price target.', example: 'Where analysts expect the stock to trade.' },
  ]

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <p className="font-semibold text-xs tracking-widest uppercase text-muted">Fundamental Data</p>
        <span className="text-xs text-muted">{overview.sector} / {overview.industry}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50/50 transition-colors group border border-transparent hover:border-blue-100">
            <div className="flex items-center gap-1.5 mb-2">
              <p className="text-xs text-muted">{stat.label}</p>
              <GlossaryTooltip term={stat.term} definition={stat.definition} example={stat.example} />
            </div>
            <p className="text-primary text-sm leading-none">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
