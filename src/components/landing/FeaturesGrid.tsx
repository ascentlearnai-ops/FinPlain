'use client'

import { motion } from 'framer-motion'
import { Sparkles, BookOpen, TrendingUp, Shield, Newspaper, PieChart } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection'

const features = [
  {
    icon: TrendingUp,
    title: 'Real-Time Market Data',
    description: 'Live prices, charts, and market movements from trusted sources like Yahoo Finance and Alpha Vantage.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Explanations',
    description: 'Complex financial news and concepts simplified into clear, student-friendly language.',
  },
  {
    icon: BookOpen,
    title: 'Learn As You Go',
    description: 'Interactive glossary and study lessons that build your financial vocabulary naturally.',
  },
  {
    icon: Newspaper,
    title: 'Curated News Feed',
    description: 'Market-moving headlines filtered and explained so you understand what matters.',
  },
  {
    icon: PieChart,
    title: 'Personal Watchlist',
    description: 'Track your favorite stocks, save research notes, and build your investing knowledge.',
  },
  {
    icon: Shield,
    title: 'Verified Sources',
    description: 'All data comes from official filings, verified APIs, and trusted financial sources.',
  },
]

export default function FeaturesGrid() {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.1}>
      {features.map((feature, index) => {
        const Icon = feature.icon
        return (
          <StaggerItem key={index}>
            <motion.div
              className="group glass-card p-6 h-full cursor-pointer"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: 5 }}
                >
                  <Icon size={22} className="text-white" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-2 group-hover:text-white/90 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </StaggerItem>
        )
      })}
    </StaggerContainer>
  )
}
