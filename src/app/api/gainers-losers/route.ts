import { NextResponse } from 'next/server'
import { getTopMovers } from '@/lib/alphaVantage'

export async function GET() {
  try {
    const data = await getTopMovers()
    return NextResponse.json(data, { headers: { 'Cache-Control': 's-maxage=300' } })
  } catch (err: any) {
    if (err.message === 'RATE_LIMITED') return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 })
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
