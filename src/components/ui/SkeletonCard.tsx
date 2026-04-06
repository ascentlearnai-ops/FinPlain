export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`glass-card p-5 animate-pulse ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-2"><div className="h-3 bg-gray-100 rounded w-20" /><div className="h-2 bg-gray-50 rounded w-32" /></div>
        <div className="h-6 bg-gray-100 rounded-lg w-16" />
      </div>
      <div className="h-8 bg-gray-100 rounded w-28 mb-2" />
      <div className="h-4 bg-gray-50 rounded w-20" />
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="glass-card p-5 animate-pulse">
      <div className="flex gap-2 mb-4">{[1,2,3,4,5].map(i => <div key={i} className="h-8 bg-gray-50 rounded-xl w-12" />)}</div>
      <div className="h-96 bg-gray-50 rounded-xl" />
    </div>
  )
}

export function SkeletonNewsCard() {
  return (
    <div className="glass-card p-5 animate-pulse space-y-3">
      <div className="flex gap-2"><div className="h-3 bg-gray-100 rounded w-16" /><div className="h-3 bg-gray-100 rounded w-12" /></div>
      <div className="h-5 bg-gray-100 rounded w-full" />
      <div className="h-5 bg-gray-100 rounded w-3/4" />
      <div className="h-20 bg-blue-50 rounded-xl" />
      <div className="flex gap-2"><div className="h-6 bg-gray-100 rounded-lg w-12" /><div className="h-6 bg-gray-100 rounded-lg w-12" /></div>
    </div>
  )
}
