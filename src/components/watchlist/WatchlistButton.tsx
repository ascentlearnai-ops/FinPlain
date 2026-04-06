'use client'
import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { isInWatchlist, addToWatchlist, removeFromWatchlist } from '@/lib/localStorage'

export default function WatchlistButton({ ticker }: { ticker: string }) {
  const [active, setActive] = useState(false)
  useEffect(() => { setActive(isInWatchlist(ticker)) }, [ticker])
  const toggle = () => { if (active) { removeFromWatchlist(ticker); setActive(false) } else { addToWatchlist(ticker); setActive(true) } }
  return (
    <button onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all border ${
        active
          ? 'btn-primary border-transparent'
          : 'btn-secondary border-gray-200 hover:border-accent/30'
      }`}>
      <Star size={15} className={active ? 'fill-white text-white' : 'text-muted'} />
      {active ? 'Watching' : 'Add to Watchlist'}
    </button>
  )
}
