import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  if (!userId) return NextResponse.json(null)
  const { data } = await admin.from('selected_countries').select('countries').eq('user_id', userId).single()
  return NextResponse.json(data?.countries || null)
}

export async function POST(req: NextRequest) {
  const { userId, countries } = await req.json()
  await admin.from('selected_countries').upsert({ user_id: userId, countries }, { onConflict: 'user_id' })
  return NextResponse.json({ ok: true })
}
