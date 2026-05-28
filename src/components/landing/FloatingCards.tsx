'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Newspaper, BookOpen, LineChart } from 'lucide-react'

const floatingCards = [
  {
    icon: TrendingUp,
    title: 'AAPL',
    value: '+2.4%',
    color: 'bg-white/10',
    delay: 0,
    x: '10%',
    y: '20%',
  },
  {
    icon: TrendingDown,
    title: 'TSLA',
    value: '-1.2%',
    color: 'bg-white/5',
    delay: 0.5,
    x: '75%',
    y: '15%',
  },
  {
    icon: Newspaper,
    title: 'News',
    value: '12 new',
    color: 'bg-white/10',
    delay: 1,
    x: '85%',
    y: '45%',
  },
  {
    icon: BookOpen,
    title: 'Study',
    value: '5 lessons',
    color: 'bg-white/5',
    delay: 1.5,
    x: '5%',
    y: '60%',
  },
  {
    icon: LineChart,
    title: 'SPY',
    value: '+0.8%',
    color: 'bg-white/10',
    delay: 2,
    x: '80%',
    y: '75%',
  },
]

export default function FloatingCards() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingCards.map((card, index) => {
        const Icon = card.icon
        return (
          <motion.div
            key={index}
            className={`absolute ${card.color} backdrop-blur-md rounded-xl border border-white/10 p-4 shadow-xl`}
            style={{ left: card.x, top: card.y }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 0.8],
              y: [20, 0, 0, -20],
            }}
            transition={{
              duration: 8,
              delay: card.delay,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'easeInOut',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Icon size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-white/60 uppercase">{card.title}</p>
                <p className="text-lg font-black text-white">{card.value}</p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
