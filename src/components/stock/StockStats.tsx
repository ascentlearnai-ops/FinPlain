'use client'

import { useState } from 'react'
import type { StockOverview } from '@/lib/types'
import { formatMarketCap, formatPrice, formatVolume } from '@/lib/formatters'
import { Activity, BarChart3, DollarSign, Info, Landmark, TrendingUp, Waves } from 'lucide-react'

interface Props { overview: StockOverview }

export default function StockStats({ overview }: Props) {
  const [activeStat, setActiveStat] = useState('Market Cap')
  const epsValue = typeof overview.eps === 'number' ? formatPrice(overview.eps) : 'N/A'
  const peValue = typeof overview.peRatio === 'number' ? `${overview.peRatio.toFixed(1)}x` : 'N/A'

  const stats = [
    {
      label: 'Market Cap',
      value: formatMarketCap(overview.marketCap),
      term: 'Market Cap',
      brief: 'The stock market value of the whole company.',
      whyItMatters: 'Market cap helps you compare company size. Huge companies can be steadier, while smaller companies may move faster but carry more risk.',
      example: 'If a company has 1 billion shares and each share is $50, the market cap is $50 billion.',
      watchNext: 'Compare market cap with revenue, profit, and growth. Size alone does not tell you if a stock is cheap.',
      icon: Landmark,
    },
    {
      label: 'P/E Ratio',
      value: peValue,
      term: 'P/E Ratio',
      brief: 'How much investors pay for each dollar of company profit.',
      whyItMatters: 'P/E can show whether investors expect strong growth or whether the stock may be priced too high for current profit.',
      example: 'A P/E of 25 means investors pay about $25 for $1 of yearly earnings.',
      watchNext: 'Compare P/E with competitors and growth. A low P/E is not automatically good.',
      icon: Activity,
    },
    {
      label: 'EPS',
      value: epsValue,
      term: 'Earnings Per Share',
      brief: 'Company profit divided across each share.',
      whyItMatters: 'EPS helps you see whether the company is earning more or less for each share investors own.',
      example: 'If profit is $100 million and there are 50 million shares, EPS is $2.',
      watchNext: 'Check whether EPS is growing because profit improved or because the company has fewer shares.',
      icon: DollarSign,
    },
    {
      label: '52W High',
      value: formatPrice(overview.week52High),
      term: '52-Week High',
      brief: 'The highest price the stock reached in the past year.',
      whyItMatters: 'This shows whether the current price is near the top of its recent range.',
      example: 'If the high is $120 and today is $118, investors are pricing the stock near its yearly peak.',
      watchNext: 'Ask what news or results helped the stock reach that high.',
      icon: TrendingUp,
    },
    {
      label: '52W Low',
      value: formatPrice(overview.week52Low),
      term: '52-Week Low',
      brief: 'The lowest price the stock reached in the past year.',
      whyItMatters: 'This shows how far the stock fell during a weaker period.',
      example: 'If the low is $70 and today is $100, the stock recovered from a much lower level.',
      watchNext: 'Ask whether the business improved or the market simply became more hopeful.',
      icon: Waves,
    },
    {
      label: 'Avg Volume',
      value: formatVolume(overview.avgVolume),
      term: 'Average Volume',
      brief: 'The usual number of shares traded in a day.',
      whyItMatters: 'Volume shows how much attention and trading activity the stock usually gets.',
      example: 'If normal volume is 2 million shares and today is 8 million, something may have changed.',
      watchNext: 'Compare today volume with news, earnings, and price direction.',
      icon: BarChart3,
    },
  ]

  const selected = stats.find(stat => stat.label === activeStat) || stats[0]

  return (
    <div className="glass-card p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-label mb-1">Fundamentals</p>
          <h3 className="font-['Outfit'] font-bold text-xl text-primary">Key stats</h3>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-muted uppercase bg-white/[0.03] px-3 py-1.5 rounded-md border border-white/[0.08]">
          Study mode <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon
          const active = stat.label === selected.label
          return (
            <button
              key={stat.label}
              type="button"
              onClick={() => setActiveStat(stat.label)}
              className={`text-left rounded-lg p-5 transition-colors group border ${
                active
                  ? 'bg-white text-black border-white'
                  : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.08]'
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${active ? 'bg-black text-white' : 'bg-white text-black'}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className={`text-[11px] font-bold uppercase ${active ? 'text-black/60' : 'text-muted'}`}>{stat.label}</p>
                  <p className={`mt-2 text-xl font-mono font-black ${active ? 'text-black' : 'text-primary'}`}>{stat.value}</p>
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${active ? 'text-black/70' : 'text-secondary'}`}>
                {stat.brief}
              </p>
            </button>
          )
        })}
      </div>

      <div className="mt-5 rounded-lg border border-white/[0.08] bg-white/[0.025] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} className="text-primary" />
          <p className="font-bold text-primary">{selected.term}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatDetail label="Why it matters" body={selected.whyItMatters} />
          <StatDetail label="Example" body={selected.example} />
          <StatDetail label="What to check next" body={selected.watchNext} />
        </div>
      </div>
    </div>
  )
}

function StatDetail({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-md border border-white/[0.08] bg-black/20 p-4">
      <p className="text-[10px] font-black uppercase text-muted mb-2">{label}</p>
      <p className="text-sm leading-relaxed text-secondary">{body}</p>
    </div>
  )
}
