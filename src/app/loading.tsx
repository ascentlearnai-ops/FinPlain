import { SkeletonCard } from '@/components/ui/SkeletonCard'

export default function Loading() {
  return (
    <div className="section-soft min-h-screen">
      <div className="hero-gradient py-16 animate-pulse">
        <div className="container-full"><div className="container-inner">
          <div className="h-3 bg-blue-200/50 rounded w-16 mb-4" />
          <div className="h-10 bg-blue-200/30 rounded w-64 mb-3" />
          <div className="h-5 bg-blue-200/20 rounded w-96" />
        </div></div>
      </div>
      <div className="py-10">
        <div className="container-full"><div className="container-inner">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[0,1,2].map(i => <SkeletonCard key={i} />)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonCard className="h-64" />
            <SkeletonCard className="h-64" />
          </div>
        </div></div>
      </div>
    </div>
  )
}
