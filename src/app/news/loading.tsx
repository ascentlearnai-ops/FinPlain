import PageWrapper from '@/components/layout/PageWrapper'
import { SkeletonNewsCard } from '@/components/ui/SkeletonCard'

export default function NewsLoading() {
  return (
    <PageWrapper className="pt-10 pb-20">
      <div className="mb-10 text-center space-y-4 animate-pulse">
        <div className="h-4 bg-gray-100 rounded w-24 mx-auto" />
        <div className="h-10 bg-gray-200 rounded w-64 mx-auto" />
        <div className="h-6 bg-gray-100 rounded w-96 mx-auto" />
      </div>

      <div className="flex gap-2 flex-wrap mb-10 overflow-hidden animate-pulse">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-10 w-24 bg-gray-100 rounded-full" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <SkeletonNewsCard key={i} />
        ))}
      </div>
    </PageWrapper>
  )
}
