import { BarChart3, TrendingUp, Users } from 'lucide-react'

interface RecTrend {
  buy: number
  hold: number
  sell: number
  strongBuy: number
  strongSell: number
  period: string
}

interface Props {
  trends: RecTrend[]
}

export default function AnalystConsensus({ trends }: Props) {
  if (!trends || trends.length === 0) return null

  const latest = trends[0]
  const total = latest.strongBuy + latest.buy + latest.hold + latest.sell + latest.strongSell
  const getPercent = (val: number) => total > 0 ? (val / total) * 100 : 0

  const items = [
    { label: 'Strong Buy', value: latest.strongBuy, color: 'bg-white', width: getPercent(latest.strongBuy) },
    { label: 'Buy', value: latest.buy, color: 'bg-white/70', width: getPercent(latest.buy) },
    { label: 'Hold', value: latest.hold, color: 'bg-white/35', width: getPercent(latest.hold) },
    { label: 'Sell', value: latest.sell, color: 'bg-white/20', width: getPercent(latest.sell) },
    { label: 'Strong Sell', value: latest.strongSell, color: 'bg-white/10', width: getPercent(latest.strongSell) },
  ]

  const sentiment = total > 0 ? ((latest.strongBuy * 100 + latest.buy * 75 + latest.hold * 50 + latest.sell * 25 + latest.strongSell * 0) / total) : 50
  const sentimentText = sentiment >= 80 ? 'Strongly bullish' : sentiment >= 60 ? 'Bullish' : sentiment >= 40 ? 'Neutral' : sentiment >= 20 ? 'Bearish' : 'Strongly bearish'

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center">
            <Users size={18} />
          </div>
          <div>
            <p className="font-semibold text-xs text-muted uppercase">Analyst view</p>
            <p className="text-sm font-bold text-primary">Recommendation trends</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-extrabold text-lg text-primary">{sentimentText}</p>
          <p className="text-[10px] text-muted uppercase">Score: {sentiment.toFixed(0)}/100</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-4 w-full bg-white/[0.04] rounded-full overflow-hidden flex">
          {items.map((item, i) => item.width > 0 && (
            <div key={i} className={`h-full transition-all duration-700 ease-out ${item.color}`} style={{ width: `${item.width}%` }} title={`${item.label}: ${item.value}`} />
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-[10px] font-semibold text-muted uppercase truncate leading-none">{item.label}</span>
              </div>
              <p className="font-mono text-sm font-bold text-primary px-3.5 leading-none">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between gap-4 text-xs text-muted">
        <div className="flex items-center gap-2">
          <BarChart3 size={14} />
          <span>Finnhub consensus</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp size={14} />
          <span>{trends.length} months</span>
        </div>
      </div>
    </div>
  )
}
