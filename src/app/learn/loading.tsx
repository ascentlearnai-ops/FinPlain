import PageWrapper from '@/components/layout/PageWrapper'

export default function LearnLoading() {
  return (
    <PageWrapper className="pt-8 pb-16">
      <div className="mb-12 animate-pulse space-y-4">
        <div className="h-4 bg-gray-100 rounded w-28" />
        <div className="h-10 bg-gray-200 rounded w-72" />
        <div className="h-6 bg-gray-100 rounded w-full max-w-lg" />
      </div>

      <div className="h-12 bg-gray-100 rounded-xl w-full max-w-md mb-8 animate-pulse" />

      <div className="flex gap-2 flex-wrap mb-10 overflow-hidden animate-pulse">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-10 w-24 bg-gray-100 rounded-full" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="glass-card p-5 h-36 animate-pulse" />
        ))}
      </div>
    </PageWrapper>
  )
}
