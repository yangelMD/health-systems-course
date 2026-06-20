import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const SYSTEM = `You are an AI teaching assistant helping university instructors fine-tune the AI feedback given to students in a Comparative Health Systems course at Tel Aviv University.

The course covers 9 countries (Israel, Germany, UK, USA, Australia, Singapore, Japan, Netherlands, Canada) across 15 categories of health system comparison.

Your role:
1. Have a natural conversation with instructors about the quality of AI feedback students receive.
2. When an instructor points out a problem (feedback too long, missing a key point, wrong emphasis, etc.), acknowledge it and explain how you'll adjust.
3. After each exchange where the instructor gives guidance, output a JSON block at the END of your response in this exact format (only when guidelines change):
<guidelines>
{"action": "update", "guidelines": ["guideline 1", "guideline 2", ...]}
</guidelines>
The guidelines array should be the COMPLETE updated list of all active guidelines (not just the new one).
4. If no guidelines changed, do not include the <guidelines> block.
5. Be conversational, helpful, and specific about health systems content when relevant.
6. You can discuss specific countries, categories, or types of feedback.`

export async function GET() {
  const { data: messages } = await admin
    .from('teacher_messages')
    .select('role, content, created_at')
    .order('created_at', { ascending: true })
    .limit(100)
  return NextResponse.json(messages || [])
}

export async function POST(req: NextRequest) {
  const { message } = await req.json()

  // Save user message
  await admin.from('teacher_messages').insert({ role: 'user', content: message })

  // Load history
  const { data: history } = await admin
    .from('teacher_messages')
    .select('role, content')
    .order('created_at', { ascending: true })
    .limit(50)

  // Load current guidelines for context
  const { data: guidelinesSetting } = await admin
    .from('settings')
    .select('value')
    .eq('key', 'teacher_guidelines')
    .single()
  const currentGuidelines = guidelinesSetting?.value
    ? JSON.parse(guidelinesSetting.value) as string[]
    : []

  const systemWithGuidelines = `${SYSTEM}

Current active guidelines (${currentGuidelines.length}):
${currentGuidelines.length ? currentGuidelines.map((g, i) => `${i + 1}. ${g}`).join('\n') : 'None yet.'}`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: systemWithGuidelines,
    messages: (history || []).map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  })

  const assistantText = (response.content[0] as { type: string; text: string }).text

  // Extract guidelines if present
  const guidelinesMatch = assistantText.match(/<guidelines>([\s\S]*?)<\/guidelines>/)
  let displayText = assistantText.replace(/<guidelines>[\s\S]*?<\/guidelines>/g, '').trim()

  if (guidelinesMatch) {
    try {
      const parsed = JSON.parse(guidelinesMatch[1].trim())
      if (parsed.guidelines) {
        await admin.from('settings').upsert(
          { key: 'teacher_guidelines', value: JSON.stringify(parsed.guidelines) },
          { onConflict: 'key' }
        )
      }
    } catch {}
  }

  // Save assistant message (without the guidelines block)
  await admin.from('teacher_messages').insert({ role: 'assistant', content: displayText })

  return NextResponse.json({ reply: displayText })
}

export async function DELETE() {
  await admin.from('teacher_messages').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  return NextResponse.json({ ok: true })
}
