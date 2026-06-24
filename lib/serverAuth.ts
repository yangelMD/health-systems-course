import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

const anon = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function getRequestUser(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return null
  const { data: { user } } = await anon.auth.getUser(token)
  return user ?? null
}

export async function requireAdmin(req: NextRequest) {
  const user = await getRequestUser(req)
  if (!user) return null
  const username = user.email?.split('@')[0]
  return username === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? user : null
}
