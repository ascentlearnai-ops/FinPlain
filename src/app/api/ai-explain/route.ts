import { NextRequest, NextResponse } from 'next/server'
import { askGemini } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    if (!prompt) return NextResponse.json({ error: 'prompt required' }, { status: 400 })
    const explanation = await askGemini(prompt)
    return NextResponse.json({ explanation })
  } catch {
    return NextResponse.json({
      explanation: 'This explanation is temporarily unavailable from the AI provider. Use the page facts first: identify what changed, why investors may care, one word to know, and one question to check next. This keeps the research useful while live summaries recover.',
      fallback: true,
    })
  }
}
