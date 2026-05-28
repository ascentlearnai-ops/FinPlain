import GlossaryTooltip from '@/components/ui/GlossaryTooltip'
import type { StockOverview } from '@/lib/types'
import { formatMarketCap, formatPrice, formatVolume } from '@/lib/formatters'
import { Landmark, TrendingUp, BarChart3, Waves, DollarSign, Activity } from 'lucide-react'

interface Props { overview: StockOverview }

export default function StockStats({ overview }: Props) {
  const stats = [
    { label: 'Market Cap', value: formatMarketCap(overview.marketCap), term: 'Market Cap', definition: 'The total value of the whole company in the stock market.', example: 'If each share is a small piece of the company, market cap is the price of all pieces added together.', icon: Landmark },
    { label: 'P/E Ratio', value: overview.peRatio ? overview.peRatio.toFixed(1) + 'x' : 'N/A', term: 'P/E Ratio', definition: 'A number that compares the stock price to the company profit.', example: 'It shows how much investors are paying for $1 of company profit.', icon: Activity },
    { label: 'EPS', value: overview.eps ? '$' + overview.eps.toFixed(2) : 'N/A', term: 'EPS', definition: 'Profit divided by each share of stock.', example: 'If the company profit was split across every share, EPS is the amount for one share.', icon: DollarSign },
    { label: '52W High', value: formatPrice(overview.week52High), term: '52-Week High', definition: 'The highest price the stock reached in the past year.', example: 'This helps you see if today\'s price is near the top of its yearly range.', icon: TrendingUp },
    { label: '52W Low', value: formatPrice(overview.week52Low), term: '52-Week Low', definition: 'The lowest price the stock reached in the past year.', example: 'This helps you see if today\'s price is near the bottom of its yearly range.', icon: Waves },
    { label: 'Avg Volume', value: formatVolume(overview.avgVolume), term: 'Volume', definition: 'How many shares usually trade in a day.', example: 'High volume means many people are buying and selling that stock.', icon: BarChart3 },
  ]

  return (
    <div className="glass-card p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-label mb-1">Fundamentals</p>
          <h3 className="font-['Outfit'] font-bold text-xl text-primary">Key stats</h3>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-muted uppercase bg-white/[0.03] px-3 py-1.5 rounded-md border border-white/[0.08]">
          Learning mode <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white/[0.02] rounded-lg p-5 hover:bg-white/[0.05] transition-colors group border border-white/[0.08]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-white text-black rounded-md flex items-center justify-center">
                  <Icon size={16} />
                </div>
                <div className="flex items-center gap-1.5">
                  <p className="text-muted text-[11px] font-bold uppercase">{stat.label}</p>
                  <GlossaryTooltip term={stat.term} definition={stat.definition} example={stat.example} />
                </div>
              </div>
              <p className="text-primary text-xl font-mono font-black">{stat.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
