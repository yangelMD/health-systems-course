import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export const DEFAULT_PROMPT = `You are an expert in comparative health systems. A student in a university course has submitted an answer about a specific country's health system. Provide concise, constructive feedback (3-5 sentences) that:
1. Acknowledges what the student got right
2. Points out any important gaps or inaccuracies
3. Suggests one key concept or fact to deepen their understanding
Be encouraging and academic in tone. Respond in the same language as the student's answer.`

export async function GET() {
  const { data } = await admin.from('settings').select('value').eq('key', 'ai_prompt').single()
  return NextResponse.json({ prompt: data?.value || DEFAULT_PROMPT })
}

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()
  await admin.from('settings').upsert({ key: 'ai_prompt', value: prompt }, { onConflict: 'key' })
  return NextResponse.json({ ok: true })
}
