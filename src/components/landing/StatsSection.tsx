'use client'

import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'
import { Users, BarChart3, BookOpen, TrendingUp } from 'lucide-react'

const stats = [
  { icon: Users, label: 'Active Students', value: 12500, suffix: '+' },
  { icon: BarChart3, label: 'Stocks Tracked', value: 8000, suffix: '+' },
  { icon: BookOpen, label: 'Lessons Completed', value: 45000, suffix: '+' },
  { icon: TrendingUp, label: 'Market Updates Daily', value: 500, suffix: '+' },
]

export default function StatsSection() {
  return (
    <section className="py-16 border-b border-white/[0.08]">
      <div className="container-full">
        <div className="container-inner">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <motion.div
                    className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Icon size={24} className="text-white" />
                  </motion.div>
                  <div className="font-mono font-black text-3xl md:text-4xl text-white mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-secondary font-medium">{stat.label}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
