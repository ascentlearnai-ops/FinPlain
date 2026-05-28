'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { formatPrice, formatChange, formatPercent, getChangeArrow } from '@/lib/formatters'
import { ArrowUpRight } from 'lucide-react'

interface Props { 
  name: string
  ticker: string
  price: number
  change: number
  changePercent: number
  plainLabel: string
  index?: number
}

export default function AnimatedMarketCard({ name, ticker, price, change, changePercent, plainLabel, index = 0 }: Props) {
  const isUp = (change || 0) >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      <Link href={`/stock/${ticker}`} className="glass-card p-6 block group relative overflow-hidden">
        {/* Animated gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <motion.p 
                className="font-bold text-lg text-primary group-hover:text-white transition-colors"
                whileHover={{ x: 3 }}
              >
                {name}
              </motion.p>
              <p className="text-[10px] font-bold text-muted uppercase mt-1">{ticker} / index proxy</p>
            </div>
            <motion.div 
              className="p-2 rounded-md border border-white/[0.12] text-secondary group-hover:text-primary group-hover:border-white/30"
              whileHover={{ scale: 1.1, rotate: isUp ? 0 : 90 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ArrowUpRight size={18} className={isUp ? '' : 'rotate-90'} />
            </motion.div>
          </div>

          <div className="mb-5">
            <motion.p 
              className="font-mono font-black text-4xl text-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {formatPrice(price)}
            </motion.p>
            <div className="flex items-center gap-2 mt-3">
              <motion.span 
                className={`font-mono font-bold text-sm px-2 py-1 rounded-md border ${isUp ? 'border-white/20 text-primary' : 'border-white/10 text-muted'}`}
                whileHover={{ scale: 1.05 }}
              >
                {getChangeArrow(change)} {formatPercent(changePercent)}
              </motion.span>
              <span className="text-xs text-muted font-medium">{formatChange(change)} today</span>
            </div>
          </div>

          <p className="text-xs text-secondary leading-relaxed">
            {plainLabel}
          </p>
        </div>
        
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['200% 0%', '-200% 0%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </Link>
    </motion.div>
  )
}
