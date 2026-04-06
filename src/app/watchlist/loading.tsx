import PageWrapper from '@/components/layout/PageWrapper'

export default function WatchlistLoading() {
  return (
    <PageWrapper className="pt-8 pb-20">
      <div className="mb-12 animate-pulse space-y-4">
        <div className="h-4 bg-gray-100 rounded w-28" />
        <div className="h-10 bg-gray-200 rounded w-64" />
        <div className="h-6 bg-gray-100 rounded w-80" />
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="glass-card p-4 h-24 animate-pulse flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-100 rounded w-1/4" />
              <div className="h-3 bg-gray-50 rounded w-1/3" />
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className="h-5 bg-gray-100 rounded w-20" />
              <div className="h-3 bg-gray-50 rounded w-12" />
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  )
}
