import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/serverAuth'
import { DEFAULT_PROMPT } from '@/lib/defaultPrompt'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function GET() {
  const { data } = await admin.from('settings').select('value').eq('key', 'ai_prompt').single()
  return NextResponse.json({ prompt: data?.value || DEFAULT_PROMPT })
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { prompt } = await req.json()
  await admin.from('settings').upsert({ key: 'ai_prompt', value: prompt }, { onConflict: 'key' })
  return NextResponse.json({ ok: true })
}
