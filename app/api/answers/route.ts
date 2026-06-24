import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getRequestUser, requireAdmin } from '@/lib/serverAuth'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function POST(req: NextRequest) {
  const user = await getRequestUser(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { userId, country, categoryId, answerText } = await req.json()
  if (!userId || !country || !categoryId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  if (userId !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await admin.from('answers').upsert(
    { user_id: userId, country, category_id: categoryId, answer_text: answerText },
    { onConflict: 'user_id,country,category_id' }
  )
  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest) {
  const user = await getRequestUser(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  if (!userId) return NextResponse.json([], { status: 400 })

  // Allow admin to read any user's answers; students can only read their own
  if (userId !== user.id) {
    const adminUser = await requireAdmin(req)
    if (!adminUser) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data } = await admin.from('answers').select('country,category_id,answer_text').eq('user_id', userId)
  return NextResponse.json(data || [])
}
