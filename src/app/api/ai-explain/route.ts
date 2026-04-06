import { NextRequest, NextResponse } from 'next/server'
import { askGemini } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    if (!prompt) return NextResponse.json({ error: 'prompt required' }, { status: 400 })
    const explanation = await askGemini(prompt)
    return NextResponse.json({ explanation })
  } catch {
    return NextResponse.json({ error: 'AI unavailable' }, { status: 500 })
  }
}
