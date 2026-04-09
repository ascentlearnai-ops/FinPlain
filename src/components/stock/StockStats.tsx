import GlossaryTooltip from '@/components/ui/GlossaryTooltip'
import type { StockOverview } from '@/lib/types'
import { formatMarketCap, formatPrice, formatVolume } from '@/lib/formatters'
import { Landmark, TrendingUp, BarChart3, Waves, DollarSign, Activity } from 'lucide-react'

interface Props { overview: StockOverview }

export default function StockStats({ overview }: Props) {
  const stats = [
    { label: 'Market Cap', value: formatMarketCap(overview.marketCap), term: 'Market Cap', definition: 'Total value of all shares.', example: 'The company\'s overall price tag.', icon: Landmark },
    { label: 'P/E Ratio', value: overview.peRatio ? overview.peRatio.toFixed(1) + 'x' : 'N/A', term: 'P/E Ratio', definition: 'Price vs Earnings.', example: 'How much investors pay for $1 of profit.', icon: Activity },
    { label: 'EPS', value: overview.eps ? '$' + overview.eps.toFixed(2) : 'N/A', term: 'EPS', definition: 'Earnings per share.', example: 'Profit allocated to each share.', icon: DollarSign },
    { label: '52W High', value: formatPrice(overview.week52High), term: '52-Week High', definition: '1-year price peak.', example: 'The highest point this year.', icon: TrendingUp },
    { label: '52W Low', value: formatPrice(overview.week52Low), term: '52-Week Low', definition: '1-year price floor.', example: 'The lowest point this year.', icon: Waves },
    { label: 'Avg Volume', value: formatVolume(overview.avgVolume), term: 'Volume', definition: 'Average shares traded.', example: 'How busy the trading floor is.', icon: BarChart3 },
  ]

  return (
    <div className="glass-card p-6 sm:p-8 relative z-10 border-white/[0.03]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-label text-accent opacity-80 mb-1">Fundamentals</p>
          <h3 className="font-['Outfit'] font-bold text-xl text-primary">Key Statistics</h3>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-[0.2em] bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/5">
           Neural Audit <div className="w-1.5 h-1.5 bg-up rounded-full shadow-[0_0_8px_#00ffaa]" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white/[0.02] rounded-[20px] p-5 hover:bg-accent/[0.04] transition-all group border border-white/[0.03] hover:border-accent/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-12 h-12 bg-accent/[0.02] rounded-full blur-xl group-hover:bg-accent/[0.05]" />
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-9 h-9 bg-white/[0.03] rounded-xl flex items-center justify-center text-muted group-hover:text-accent transition-colors">
                    <Icon size={16} />
                 </div>
                 <div className="flex items-center gap-1.5">
                   <p className="text-muted text-[11px] font-bold uppercase tracking-wider">{stat.label}</p>
                   <GlossaryTooltip term={stat.term} definition={stat.definition} example={stat.example} />
                 </div>
               </div>
               <p className="text-primary text-xl font-mono font-black tracking-tight">{stat.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
