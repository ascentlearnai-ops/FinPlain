// src/lib/formatters.ts — All number/string formatting with robustness against missing data

export function formatPrice(n?: number): string {
  if (n === undefined || n === null) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)
}

export function formatChange(n?: number): string {
  if (n === undefined || n === null) return '0.00'
  const sign = n >= 0 ? '+' : ''
  return `${sign}${n.toFixed(2)}`
}

export function formatPercent(n?: number): string {
  if (n === undefined || n === null) return '0.00%'
  const sign = n >= 0 ? '+' : ''
  return `${sign}${n.toFixed(2)}%`
}

export function formatMarketCap(n?: number): string {
  if (n === undefined || n === null) return '$0'
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  return `$${n.toLocaleString()}`
}

export function formatVolume(n?: number): string {
  if (n === undefined || n === null) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toLocaleString()
}

export function formatRelativeTime(isoString?: string): string {
  if (!isoString) return 'Just now'
  const diff = Date.now() - new Date(isoString).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function getChangeColor(change?: number): string {
  if (change === undefined || change === null) return 'text-muted'
  return change >= 0 ? 'text-green-600' : 'text-red-600'
}

export function getChangeBg(change?: number): string {
  if (change === undefined || change === null) return 'bg-gray-100'
  return change >= 0 ? 'bg-green-50' : 'bg-red-50'
}

export function getChangeArrow(change?: number): string {
  if (change === undefined || change === null || change === 0) return ''
  return change > 0 ? '▲' : '▼'
}
