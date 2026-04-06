'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { removeFromWatchlist } from '@/lib/localStorage'
import { formatPrice, formatPercent } from '@/lib/formatters'

interface Props { ticker: string; onRemove: (ticker: string) => void }

export default function WatchlistRow({ ticker, onRemove }: Props) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/stock?ticker=${ticker}&range=1W`).then(r => r.json()).then(d => { setData(d); setLoading(false) }).catch(() => setLoading(false))
  }, [ticker])

  const handleRemove = (e: React.MouseEvent) => { e.preventDefault(); removeFromWatchlist(ticker); onRemove(ticker) }
  const isUp = data?.quote?.changePercent >= 0

  if (loading) return (
    <div className="glass-card p-4 animate-pulse flex items-center gap-4">
      <div className="w-10 h-10 bg-gray-100 rounded-xl" />
      <div className="flex-1 space-y-2"><div className="h-4 bg-gray-100 rounded w-1/4" /><div className="h-3 bg-gray-50 rounded w-1/3" /></div>
      <div className="h-6 bg-gray-100 rounded w-20" />
    </div>
  )

  return (
    <Link href={`/stock/${ticker}`} className="glass-card p-4 flex items-center gap-4 group">
      <div className="w-10 h-10 bg-accent-bg border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
        <span className="font-mono font-bold text-xs text-accent">{ticker.slice(0, 2)}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono font-semibold text-sm text-primary">{ticker}</p>
        <p className="text-xs text-muted truncate">{data?.overview?.companyName || '—'}</p>
      </div>
      {data?.quote && (
        <div className="text-right">
          <p className="font-mono font-semibold text-sm text-primary">{formatPrice(data.quote.price)}</p>
          <p className={`font-mono text-xs ${isUp ? 'text-green-600' : 'text-red-600'}`}>{isUp ? '+' : ''}{formatPercent(data.quote.changePercent)}</p>
        </div>
      )}
      <button onClick={handleRemove} className="p-2 text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
        <Trash2 size={15} />
      </button>
    </Link>
  )
}
