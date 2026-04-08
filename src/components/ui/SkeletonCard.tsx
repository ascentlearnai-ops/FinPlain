import { Newspaper, LineChart } from 'lucide-react'

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`glass-card p-5 overflow-hidden relative ${className}`}>
      <div className="absolute inset-0 skeleton-shimmer opacity-50" />
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="space-y-2">
          <div className="h-3 bg-slate-100 rounded-full w-20" />
          <div className="h-2 bg-slate-50 rounded-full w-32" />
        </div>
        <div className="w-10 h-10 bg-slate-100 rounded-xl" />
      </div>
      <div className="relative z-10 h-8 bg-slate-100 rounded-lg w-28 mb-2" />
      <div className="relative z-10 h-3 bg-slate-50 rounded-full w-20" />
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="glass-card p-0 overflow-hidden relative min-h-[500px]">
      <div className="absolute inset-0 skeleton-shimmer opacity-30" />
      <div className="p-5 border-b border-slate-50 relative z-10 flex items-center justify-between">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-8 bg-slate-100 rounded-lg w-12" />
          ))}
        </div>
        <div className="h-8 bg-slate-100 rounded-lg w-24" />
      </div>
      <div className="flex items-center justify-center h-full min-h-[400px] relative z-10">
        <LineChart size={48} className="text-slate-100 animate-pulse" />
      </div>
    </div>
  )
}

export function SkeletonNewsCard() {
  return (
    <div className="glass-card p-5 overflow-hidden relative space-y-4">
      <div className="absolute inset-0 skeleton-shimmer opacity-40" />
      <div className="relative z-10 flex gap-2 items-center">
        <div className="w-8 h-8 bg-slate-100 rounded-lg" />
        <div className="h-3 bg-slate-100 rounded-full w-24" />
      </div>
      <div className="relative z-10 space-y-2">
        <div className="h-5 bg-slate-200 rounded-full w-full" />
        <div className="h-5 bg-slate-200 rounded-full w-3/4" />
      </div>
      <div className="relative z-10 h-24 bg-blue-50/50 rounded-2xl border border-blue-100/30 flex items-center justify-center">
        <Newspaper size={24} className="text-blue-100" />
      </div>
      <div className="relative z-10 flex gap-2">
        <div className="h-6 bg-slate-100 rounded-lg w-16" />
        <div className="h-6 bg-slate-100 rounded-lg w-16" />
      </div>
    </div>
  )
}

