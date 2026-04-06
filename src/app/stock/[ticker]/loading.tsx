import PageWrapper from '@/components/layout/PageWrapper'
import { SkeletonCard, SkeletonChart } from '@/components/ui/SkeletonCard'

export default function StockLoading() {
  return (
    <PageWrapper className="pt-8 pb-16">
      {/* Header Skeleton */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4 animate-pulse">
        <div className="space-y-4">
          <div className="h-4 bg-gray-100 rounded w-24" />
          <div className="h-10 bg-gray-200 rounded w-64" />
          <div className="h-6 bg-gray-100 rounded w-32" />
        </div>
        <div className="h-12 bg-gray-200 rounded-xl w-36" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* AI Explainer Skeleton */}
          <div className="glass-card p-6 h-40 animate-pulse bg-blue-50/50" />
          {/* Chart Skeleton */}
          <SkeletonChart />
        </div>
        
        {/* Side Column */}
        <div className="lg:col-span-4 space-y-6">
          <SkeletonCard className="h-64" />
          <SkeletonCard className="h-72" />
        </div>
      </div>

      {/* Related News Skeleton */}
      <div className="mt-12">
        <div className="h-6 bg-gray-100 rounded w-40 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card p-5 h-64 animate-pulse" />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
