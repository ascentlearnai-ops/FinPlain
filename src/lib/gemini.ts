// src/lib/gemini.ts

const OPENROUTER_URL = `https://openrouter.ai/api/v1/chat/completions`
const KEY = process.env.GEMINI_API_KEY

const SYSTEM_INSTRUCTION = `You explain stock market news to teenagers in clear 8th-grade vocabulary.
Rules you always follow:
1. Use short sentences and common words. Define hard words the first time you use them.
2. Explain what happened, why it matters, and what a student should watch next.
3. Give enough detail to teach, but do not sound like a bank report.
4. Never give investment advice or price targets. Provide study context only.
5. Do not use hype, decorative icons, slang, or vague automated-sounding phrases.`

const USE_MOCK = process.env.USE_MOCK_DATA === 'true'

export async function askGemini(prompt: string): Promise<string> {
  if (USE_MOCK || !KEY) {
    return 'This is a sample study summary. In production, live market context, company fundamentals, and recent headlines are reviewed. The summary explains what changed, why it may matter, one word to know, and what a student should watch next. It stays educational and does not give investment advice.'
  }

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://macroliberium.dev',
      'X-Title': 'MacroLibrium',
    },
    body: JSON.stringify({
      model: 'stepfun/step-3.5-flash',
      messages: [
        { role: 'system', content: SYSTEM_INSTRUCTION },
        { role: 'user', content: prompt },
      ],
      temperature: 0.45,
      max_tokens: 500,
    }),
  })

  if (!res.ok) throw new Error('OpenRouter API error')
  const data = await res.json()
  return data?.choices?.[0]?.message?.content ?? 'Analysis unavailable at this time.'
}

export async function explainStock(ticker: string, companyName: string, changePercent: number): Promise<string> {
  const trend = changePercent >= 0 ? `up ${changePercent.toFixed(2)}%` : `down ${Math.abs(changePercent).toFixed(2)}%`
  return askGemini(
    `Explain ${companyName} (${ticker}) for an 8th-grade student in 5 short sentences.
     Sentence 1: What the company does and how it makes money.
     Sentence 2: Today's price move: the stock is ${trend}.
     Sentence 3: One likely reason investors may care, using simple words.
     Sentence 4: One market word to know, with a short definition.
     Sentence 5: One thing to watch next, stated as a research question.
     No advice. Max 150 words.`
  )
}

export async function explainMarketDay(sp500Change: number, topGainer: string, topLoser: string): Promise<string> {
  const trend = sp500Change >= 0 ? `up ${sp500Change.toFixed(2)}%` : `down ${Math.abs(sp500Change).toFixed(2)}%`
  return askGemini(
    `Write a clear 5-sentence market recap for 8th-grade students.
     The S&P 500 moved ${trend} today. Top gainer: ${topGainer}. Top decliner: ${topLoser}.
     Sentence 1: What moved.
     Sentence 2: Why investors may care.
     Sentence 3: What the strongest stock or sector signal was.
     Sentence 4: One market word to know, with a short definition.
     Sentence 5: What students should watch next as a research question.
     Do not give advice. Keep it under 160 words.`
  )
}

export async function simplifyNewsHeadline(headline: string): Promise<string> {
  return askGemini(
    `Rewrite this financial headline for an 8th-grade student in 3 short sentences.
     Sentence 1: What happened.
     Sentence 2: Why it may matter for the company, sector, or market.
     Sentence 3: One word to know or one thing to watch next.
     Avoid hard words unless you define them.
     "${headline}"
     Output the summary only. Max 95 words.`
  )
}
