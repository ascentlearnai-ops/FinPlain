import { NextResponse } from 'next/server'
import { getMarketSummary } from '@/lib/market'

export async function GET() {
  const data = await getMarketSummary()
  return NextResponse.json({ indices: data }, { headers: { 'Cache-Control': 's-maxage=300' } })
}
