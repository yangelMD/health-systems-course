import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function GET() {
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
  const { id } = await req.json()
  await admin.from('profiles').delete().eq('id', id)
  await admin.auth.admin.deleteUser(id)
  return NextResponse.json({ ok: true })
}
