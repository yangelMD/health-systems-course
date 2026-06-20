import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import { DEFAULT_PROMPT } from '@/lib/defaultPrompt'
import { ANSWERS } from '@/data/answers'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function POST(req: NextRequest) {
  const { answer, country, category, categoryId, countryId, lang } = await req.json()

  const [{ data: setting }, { data: guidelinesSetting }] = await Promise.all([
    admin.from('settings').select('value').eq('key', 'ai_prompt').single(),
    admin.from('settings').select('value').eq('key', 'teacher_guidelines').single(),
  ])
  const basePrompt = setting?.value || DEFAULT_PROMPT
  const guidelines = guidelinesSetting?.value ? JSON.parse(guidelinesSetting.value) as string[] : []

  const modelAnswer = categoryId && countryId ? ANSWERS[categoryId]?.[countryId] : null
  const modelText = modelAnswer ? (lang === 'he' ? modelAnswer.he : modelAnswer.en) : null

  const systemPrompt = `${basePrompt}

Country: ${country}
Category: ${category}
Language: ${lang === 'he' ? 'Hebrew' : 'English'}${guidelines.length ? `\n\nInstructor guidelines for feedback (follow these carefully):\n${guidelines.map((g, i) => `${i + 1}. ${g}`).join('\n')}` : ''}${modelText ? `\n\nModel answer for reference (do not reveal this verbatim to the student):\n${modelText}` : ''}`

  try {
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 350,
      messages: [
        { role: 'user', content: `Student answer:\n"${answer}"` }
      ],
      system: systemPrompt,
    })
    const feedback = (msg.content[0] as { type: string; text: string }).text
    return NextResponse.json({ feedback })
  } catch {
    return NextResponse.json({ feedback: lang === 'he' ? 'שגיאה בקבלת משוב.' : 'Error getting feedback.' }, { status: 500 })
  }
}
