// src/lib/gemini.ts

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
const KEY = process.env.GEMINI_API_KEY

const SYSTEM_INSTRUCTION = `You are a senior equity research analyst writing concise market commentary.
Rules you always follow:
1. Use clear, professional language accessible to retail investors.
2. Reference specific metrics and data points when available.
3. Keep responses tight and institutional in tone — no filler.
4. Never give investment advice or price targets. Provide factual analysis only.
5. Write in present tense. Be direct and authoritative.`

const USE_MOCK = process.env.USE_MOCK_DATA === 'true'

export async function askGemini(prompt: string): Promise<string> {
  if (USE_MOCK || !KEY) {
    // Return mock data for development
    return "This is a pre-generated AI insight. In production, Gemini 2.0 Flash would analyze live data to provide real-time updates on company fundamentals, technical trends, and recent catalysts like earnings reports or macro events. It highlights how retail sentiment and institutional flows currently affect the market narrative while maintaining a direct, professional tone for investors."
  }

  const res = await fetch(`${GEMINI_URL}?key=${KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 400,
      },
    }),
  })

  if (!res.ok) throw new Error('Gemini API error')
  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Analysis unavailable at this time.'
}

// Specific prompt builders

export async function explainStock(ticker: string, companyName: string, changePercent: number): Promise<string> {
  const trend = changePercent >= 0 ? `up ${changePercent.toFixed(2)}%` : `down ${Math.abs(changePercent).toFixed(2)}%`
  return askGemini(
    `Provide a concise 3-sentence institutional-grade overview of ${companyName} (${ticker}).
     Sentence 1: Core business model and revenue drivers.
     Sentence 2: Today's price action — the stock is ${trend}. Contextualize with recent catalysts if applicable.
     Sentence 3: Key competitive positioning or market narrative.
     Max 80 words. Professional tone.`
  )
}

export async function explainMarketDay(sp500Change: number, topGainer: string, topLoser: string): Promise<string> {
  const trend = sp500Change >= 0 ? `up ${sp500Change.toFixed(2)}%` : `down ${Math.abs(sp500Change).toFixed(2)}%`
  return askGemini(
    `Write a 3-sentence professional market recap.
     The S&P 500 moved ${trend} today. Top gainer: ${topGainer}. Top decliner: ${topLoser}.
     Include sector rotation context and macro implications.
     Keep it under 80 words. Institutional analyst tone.`
  )
}

export async function simplifyNewsHeadline(headline: string): Promise<string> {
  return askGemini(
    `Rewrite this financial headline as a clear, professional one-sentence summary (max 25 words):
     "${headline}"
     Output the summary only. No preamble.`
  )
}
