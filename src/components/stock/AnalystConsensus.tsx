// src/components/stock/AnalystConsensus.tsx
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

  // Use the latest trend
  const latest = trends[0]
  const total = latest.strongBuy + latest.buy + latest.hold + latest.sell + latest.strongSell
  
  const getPercent = (val: number) => total > 0 ? (val / total) * 100 : 0

  const items = [
    { label: 'Strong Buy', value: latest.strongBuy, color: 'bg-green-600', width: getPercent(latest.strongBuy) },
    { label: 'Buy', value: latest.buy, color: 'bg-green-400', width: getPercent(latest.buy) },
    { label: 'Hold', value: latest.hold, color: 'bg-gray-300', width: getPercent(latest.hold) },
    { label: 'Sell', value: latest.sell, color: 'bg-red-400', width: getPercent(latest.sell) },
    { label: 'Strong Sell', value: latest.strongSell, color: 'bg-red-600', width: getPercent(latest.strongSell) },
  ]

  // Sentiment score (0-100)
  const sentiment = total > 0 ? ((latest.strongBuy * 100 + latest.buy * 75 + latest.hold * 50 + latest.sell * 25 + latest.strongSell * 0) / total) : 50
  const sentimentColor = sentiment >= 66 ? 'text-green-600' : sentiment >= 33 ? 'text-amber-500' : 'text-red-500'
  const sentimentText = sentiment >= 80 ? 'Strongly Bullish' : sentiment >= 60 ? 'Bullish' : sentiment >= 40 ? 'Neutral' : sentiment >= 20 ? 'Bearish' : 'Strongly Bearish'

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-bg border border-blue-100 rounded-xl flex items-center justify-center">
            <Users size={18} className="text-accent" />
          </div>
          <div>
            <p className="font-semibold text-xs text-muted uppercase tracking-widest">Analyst Sentiment</p>
            <p className="text-sm font-bold text-primary">Recommendation Trends</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-extrabold text-lg ${sentimentColor}`}>{sentimentText}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider">Score: {sentiment.toFixed(0)}/100</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* The Bar Stack */}
        <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
          {items.map((item, i) => item.width > 0 && (
            <div key={i} className={`h-full transition-all duration-1000 ease-out ${item.color}`} style={{ width: `${item.width}%` }} title={`${item.label}: ${item.value}`} />
          ))}
        </div>

        {/* Legend / Breakdown */}
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

      <div className="mt-8 pt-5 border-t border-gray-50 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-muted">
          <BarChart3 size={14} />
          <span>Institutional consensus from Finnhub</span>
        </div>
        <div className="flex items-center gap-2 text-muted">
          <TrendingUp size={14} className={sentiment >= 50 ? 'text-green-500' : 'text-red-500'} />
          <span>Last {trends.length} months summarized</span>
        </div>
      </div>
    </div>
  )
}
