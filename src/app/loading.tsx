export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="py-16 animate-pulse border-b border-white/[0.08]">
        <div className="container-full"><div className="container-inner">
          <div className="h-3 bg-white/[0.08] rounded w-16 mb-4" />
          <div className="h-10 bg-white/[0.08] rounded w-64 mb-3" />
          <div className="h-5 bg-white/[0.05] rounded w-96 max-w-full" />
        </div></div>
      </div>
    </div>
  )
}
