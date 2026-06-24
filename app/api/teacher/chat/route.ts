import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import { getRequestUser } from '@/lib/serverAuth'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const SYSTEM = `You are an AI teaching assistant helping university instructors fine-tune the AI feedback and hints given to students in a Comparative Health Systems course at Tel Aviv University.

The course covers 9 countries (Israel, Germany, UK, USA, Australia, Singapore, Japan, Netherlands, Canada) across 15 categories of health system comparison.

Country IDs: israel, germany, uk, usa, australia, singapore, japan, netherlands, canada
Category IDs: 1=Coverage & Entitlement, 2=Financing, 3=Provider Payment, 4=Delivery System, 5=Gatekeeping, 6=Pharmaceutical Policy, 7=Long-term Care, 8=Mental Health, 9=Public Health, 10=Health Outcomes, 11=Equity, 12=Patient Choice, 13=Technology & Innovation, 14=Governance, 15=COVID-19 Response

Your role:
1. Have a natural conversation with instructors about the quality of AI feedback and hints students receive.
2. When an instructor gives guidance about AI FEEDBACK quality (too long, missing a point, wrong emphasis, etc.), update the guidelines.
3. When an instructor wants to change a HINT (the pre-written hint text students see when clicking 💡), update the hint overrides.
4. At the END of your response, output any changed blocks:

For feedback guideline changes:
<guidelines>
{"action": "update", "guidelines": ["guideline 1", "guideline 2", ...]}
</guidelines>
The array must be the COMPLETE updated list of all active guidelines.

For hint changes:
<hints>
{"categoryId": 1, "countryId": "germany", "en": "Updated English hint text...", "he": "טקסט רמז מעודכן בעברית..."}
</hints>
You can output multiple <hints> blocks if changing several hints at once.

5. Only output these blocks when something actually changed.
6. Be conversational, helpful, and specific about health systems content when relevant.`

export async function GET() {
  const { data: messages } = await admin
    .from('teacher_messages')
    .select('role, content, created_at')
    .order('created_at', { ascending: true })
    .limit(100)
  return NextResponse.json(messages || [])
}

export async function POST(req: NextRequest) {
  if (!await getRequestUser(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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

  const guidelinesMatch = assistantText.match(/<guidelines>([\s\S]*?)<\/guidelines>/)
  const hintsMatches = [...assistantText.matchAll(/<hints>([\s\S]*?)<\/hints>/g)]
  let displayText = assistantText
    .replace(/<guidelines>[\s\S]*?<\/guidelines>/g, '')
    .replace(/<hints>[\s\S]*?<\/hints>/g, '')
    .trim()

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

  if (hintsMatches.length > 0) {
    const { data: existing } = await admin.from('settings').select('value').eq('key', 'hint_overrides').single()
    const overrides: Record<string, Record<string, { en: string; he: string }>> = existing?.value
      ? JSON.parse(existing.value)
      : {}

    for (const m of hintsMatches) {
      try {
        const h = JSON.parse(m[1].trim())
        if (h.categoryId && h.countryId) {
          const catKey = String(h.categoryId)
          if (!overrides[catKey]) overrides[catKey] = {}
          overrides[catKey][h.countryId] = { en: h.en, he: h.he }
        }
      } catch {}
    }

    await admin.from('settings').upsert(
      { key: 'hint_overrides', value: JSON.stringify(overrides) },
      { onConflict: 'key' }
    )
  }

  // Save assistant message (without the guidelines block)
  await admin.from('teacher_messages').insert({ role: 'assistant', content: displayText })

  return NextResponse.json({ reply: displayText })
}

export async function DELETE(req: NextRequest) {
  if (!await getRequestUser(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await admin.from('teacher_messages').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  return NextResponse.json({ ok: true })
}
