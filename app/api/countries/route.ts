import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getRequestUser } from '@/lib/serverAuth'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function GET(req: NextRequest) {
  const user = await getRequestUser(req)
  if (!user) return NextResponse.json(null, { status: 401 })

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  if (!userId || userId !== user.id) return NextResponse.json(null, { status: 403 })

  const { data } = await admin.from('selected_countries').select('countries').eq('user_id', userId).single()
  return NextResponse.json(data?.countries || null)
}

export async function POST(req: NextRequest) {
  const user = await getRequestUser(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { userId, countries } = await req.json()
  if (userId !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await admin.from('selected_countries').upsert({ user_id: userId, countries }, { onConflict: 'user_id' })
  return NextResponse.json({ ok: true })
}
