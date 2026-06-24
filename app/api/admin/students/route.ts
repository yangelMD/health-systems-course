import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/serverAuth'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function GET(req: NextRequest) {
  if (!await requireAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data: profiles } = await admin.from('profiles').select('*').eq('role', 'student')
  if (!profiles) return NextResponse.json([])

  const rows = await Promise.all(profiles.map(async p => {
    const [{ data: sc }, { data: ans }] = await Promise.all([
      admin.from('selected_countries').select('countries').eq('user_id', p.id).single(),
      admin.from('answers').select('id').eq('user_id', p.id).neq('answer_text', ''),
    ])
    return {
      profile: p,
      answeredCount: ans?.length || 0,
      selectedCountries: sc?.countries || [],
    }
  }))

  return NextResponse.json(rows)
}

export async function DELETE(req: NextRequest) {
  if (!await requireAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await admin.from('profiles').delete().eq('id', id)
  await admin.auth.admin.deleteUser(id)
  return NextResponse.json({ ok: true })
}

export async function PATCH(req: NextRequest) {
  if (!await requireAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, role } = await req.json()
  await admin.from('profiles').update({ role }).eq('id', id)
  return NextResponse.json({ ok: true })
}
