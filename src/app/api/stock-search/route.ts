import { NextRequest, NextResponse } from 'next/server'
import { searchSymbol } from '@/lib/alphaVantage'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  if (!q) return NextResponse.json({ results: [] })
  try {
    const results = await searchSymbol(q)
    return NextResponse.json({ results })
  } catch {
    return NextResponse.json({ results: [] })
  }
}
