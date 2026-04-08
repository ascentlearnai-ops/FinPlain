'use client'
import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { isInWatchlist, addToWatchlist, removeFromWatchlist } from '@/lib/localStorage'

export default function WatchlistButton({ ticker }: { ticker: string }) {
  const [active, setActive] = useState(false)
  
  useEffect(() => { 
    setActive(isInWatchlist(ticker)) 
  }, [ticker])

  const toggle = () => { 
    if (active) { 
      removeFromWatchlist(ticker)
      setActive(false) 
    } else { 
      addToWatchlist(ticker)
      setActive(true) 
    } 
  }

  return (
    <button onClick={toggle}
      className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border shadow-lg ${
        active
          ? 'bg-accent text-[#0b0e11] border-accent hover:shadow-accent/20'
          : 'bg-white/[0.04] text-primary border-white/[0.08] hover:bg-white/[0.08] hover:border-accent/40'
      }`}>
      <Star size={14} className={active ? 'fill-current' : ''} />
      {active ? 'Watching' : 'Watchlist'}
    </button>
  )
}
