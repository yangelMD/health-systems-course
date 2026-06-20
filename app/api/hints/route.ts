import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { HINTS } from '@/data/content'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function GET() {
  const { data } = await admin.from('settings').select('value').eq('key', 'hint_overrides').single()
  if (!data?.value) return NextResponse.json(HINTS)

  const overrides = JSON.parse(data.value) as Record<string, Record<string, { en: string; he: string }>>
  const merged = structuredClone(HINTS) as Record<number, Record<string, { en: string; he: string }>>

  for (const catId of Object.keys(overrides)) {
    const id = Number(catId)
    if (!merged[id]) merged[id] = {}
    for (const country of Object.keys(overrides[catId])) {
      merged[id][country] = overrides[catId][country]
    }
  }

  return NextResponse.json(merged)
}
