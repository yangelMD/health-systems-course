import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function POST(req: NextRequest) {
  const { userId, country, categoryId, answerText } = await req.json()
  if (!userId || !country || !categoryId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  await admin.from('answers').upsert(
    { user_id: userId, country, category_id: categoryId, answer_text: answerText },
    { onConflict: 'user_id,country,category_id' }
  )
  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  if (!userId) return NextResponse.json([], { status: 400 })

  const { data } = await admin.from('answers').select('country,category_id,answer_text').eq('user_id', userId)
  return NextResponse.json(data || [])
}
