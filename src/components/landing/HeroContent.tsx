'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'
import GoogleLoginButton from '@/components/auth/GoogleLoginButton'

export default function HeroContent() {
  return (
    <div className="landing-copy">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/[0.14] bg-black/40 px-3 py-2 backdrop-blur-md"
      >
        <motion.span 
          className="w-2 h-2 bg-white rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-[11px] font-bold uppercase text-secondary">
          Finance education, simplified
        </span>
      </motion.div>

      <motion.h1 
        className="landing-title text-primary"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        The market, translated{' '}
        <motion.span
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          before it starts speaking Wall Street.
        </motion.span>
      </motion.h1>

      <motion.p 
        className="mt-6 max-w-2xl text-balance text-base font-medium leading-relaxed text-secondary sm:text-lg md:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        FinPlain gives students the useful parts of Yahoo Finance - prices, news, charts, filings, and watchlists - then explains what everything means in clear language.
      </motion.p>

      <motion.div 
        className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <motion.a 
          href="#dashboard" 
          className="btn-primary inline-flex items-center justify-center gap-2 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Open the market desk 
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </motion.a>
        <motion.a 
          href="/learn" 
          className="btn-secondary inline-flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BookOpen size={18} /> Start studying
        </motion.a>
        <GoogleLoginButton />
      </motion.div>
    </div>
  )
}
