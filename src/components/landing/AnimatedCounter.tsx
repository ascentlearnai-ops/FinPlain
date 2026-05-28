'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function AnimatedCounter({ 
  value, 
  duration = 2, 
  prefix = '', 
  suffix = '',
  className = ''
}: AnimatedCounterProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest)
    })

    const controls = animate(count, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    })

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [value, duration, count, rounded])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {prefix}{displayValue.toLocaleString()}{suffix}
    </motion.span>
  )
}
