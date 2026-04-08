import { NextResponse } from 'next/server'
import { getSerpApiMovers } from '@/lib/serpapi'
import { getTopMovers } from '@/lib/alphaVantage'

export async function GET() {
  try {
    const serpData = await getSerpApiMovers().catch(() => null)
    if (serpData && (serpData.gainers.length > 0 || serpData.losers.length > 0)) {
      return NextResponse.json(serpData, { headers: { 'Cache-Control': 's-maxage=300' } })
    }

    const data = await getTopMovers()
    return NextResponse.json(data, { headers: { 'Cache-Control': 's-maxage=300' } })
  } catch (err: any) {
    if (err.message === 'RATE_LIMITED') return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 })
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
