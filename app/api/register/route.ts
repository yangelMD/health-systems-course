import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  if (!username || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const email = `${username.toLowerCase().trim()}@example.com`

  const { data, error } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  const role = username.toLowerCase().trim() === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? 'admin' : 'student'
  await adminClient.from('profiles').upsert({ id: data.user.id, username: username.trim(), role })

  // sign in to get a session for the client
  const { data: session, error: signInErr } = await adminClient.auth.signInWithPassword({ email, password })
  if (signInErr) return NextResponse.json({ error: signInErr.message }, { status: 400 })

  return NextResponse.json({ session: session.session, role })
}
