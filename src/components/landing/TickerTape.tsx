'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const tickerData = [
  { symbol: 'AAPL', price: 198.45, change: 2.34 },
  { symbol: 'NVDA', price: 875.23, change: 12.67 },
  { symbol: 'MSFT', price: 425.12, change: -3.21 },
  { symbol: 'GOOGL', price: 142.89, change: 1.45 },
  { symbol: 'AMZN', price: 178.34, change: 4.12 },
  { symbol: 'META', price: 485.67, change: -2.89 },
  { symbol: 'TSLA', price: 245.78, change: -8.45 },
  { symbol: 'JPM', price: 198.23, change: 3.56 },
  { symbol: 'V', price: 278.45, change: 1.23 },
  { symbol: 'SPY', price: 532.67, change: 4.89 },
]

export default function TickerTape() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const duplicatedTickers = [...tickerData, ...tickerData, ...tickerData]

  return (
    <div className="w-full overflow-hidden bg-surface/50 border-y border-white/[0.06] py-3">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: ['0%', '-33.333%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedTickers.map((ticker, index) => {
          const isUp = ticker.change >= 0
          return (
            <div
              key={`${ticker.symbol}-${index}`}
              className="flex items-center gap-3 px-4"
            >
              <span className="font-mono font-bold text-white text-sm">{ticker.symbol}</span>
              <span className="font-mono text-white/70 text-sm">${ticker.price.toFixed(2)}</span>
              <span className={`flex items-center gap-1 font-mono text-sm ${isUp ? 'text-white' : 'text-white/50'}`}>
                {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {isUp ? '+' : ''}{ticker.change.toFixed(2)}%
              </span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
