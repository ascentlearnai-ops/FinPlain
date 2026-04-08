// src/lib/formatters.ts — All number/string formatting

export function formatPrice(n?: number | null): string {
  if (n === undefined || n === null || isNaN(n)) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)
}

export function formatChange(n?: number | null): string {
  if (n === undefined || n === null || isNaN(n)) return '0.00'
  const sign = n >= 0 ? '+' : ''
  return `${sign}${n.toFixed(2)}`
}

export function formatPercent(n?: number | null): string {
  if (n === undefined || n === null || isNaN(n)) return '0.00%'
  const sign = n >= 0 ? '+' : ''
  return `${sign}${n.toFixed(2)}%`
}

export function formatMarketCap(n?: number | null): string {
  if (n === undefined || n === null || isNaN(n) || n === 0) return 'N/A'
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  return `$${n.toLocaleString()}`
}

export function formatVolume(n?: number | null): string {
  if (n === undefined || n === null || isNaN(n)) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toString()
}

export function formatRelativeTime(isoString?: string | null): string {
  if (!isoString) return 'Just now'
  const diff = Date.now() - new Date(isoString).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function getChangeColor(change?: number | null): string {
  if (change === undefined || change === null) return 'text-secondary'
  return change >= 0 ? 'text-up' : 'text-down'
}

export function getChangeBg(change?: number | null): string {
  if (change === undefined || change === null) return 'bg-white/[0.04]'
  return change >= 0 ? 'bg-up/10' : 'bg-down/10'
}

export function getChangeArrow(change?: number | null): string {
  if (change === undefined || change === null) return ''
  return change >= 0 ? '▲' : '▼'
}
