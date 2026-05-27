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
      className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors border ${
        active
          ? 'bg-white text-black border-white'
          : 'bg-white/[0.04] text-primary border-white/[0.12] hover:bg-white/[0.08]'
      }`}>
      <Star size={14} className={active ? 'fill-current' : ''} />
      {active ? 'Watching' : 'Add to watchlist'}
    </button>
  )
}
