import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  const { answer, country, category, lang } = await req.json()

  const systemPrompt = lang === 'he'
    ? `אתה מורה לשיטות בריאות השוואתיות ברמת תואר שני. תלמיד כתב תשובה על מערכת הבריאות של ${country} בנושא: "${category}". תן משוב בעברית, בסגנון עידודי אך אקדמי. ציין מה נכון בתשובה, מה חסר, ומה ניתן להוסיף. עד 4 משפטים.`
    : `You are a graduate-level comparative health systems instructor. A student answered a question about ${country}'s health system on the topic: "${category}". Give feedback in English, encouraging yet academically precise. Acknowledge what is correct, note what is missing or could be improved. Maximum 4 sentences.`

  try {
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [
        { role: 'user', content: `${systemPrompt}\n\nStudent answer:\n"${answer}"` }
      ],
    })
    const feedback = (msg.content[0] as { type: string; text: string }).text
    return NextResponse.json({ feedback })
  } catch (e) {
    return NextResponse.json({ feedback: lang === 'he' ? 'שגיאה בקבלת משוב.' : 'Error getting feedback.' }, { status: 500 })
  }
}
