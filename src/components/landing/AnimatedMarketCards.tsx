import AnimatedMarketCard from '@/components/market/AnimatedMarketCard'
import { getMarketSummary } from '@/lib/market'
import { SkeletonCard } from '@/components/ui/SkeletonCard'

export default async function AnimatedMarketCards() {
  const indices = await getMarketSummary()
  
  if (indices.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[0, 1, 2].map(i => <SkeletonCard key={i} />)}
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {indices.map((index: any, i: number) => (
        <AnimatedMarketCard key={index.ticker} {...index} index={i} />
      ))}
    </div>
  )
}
