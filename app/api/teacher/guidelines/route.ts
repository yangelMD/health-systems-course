import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function GET() {
  const { data } = await admin.from('settings').select('value').eq('key', 'teacher_guidelines').single()
  const guidelines = data?.value ? JSON.parse(data.value) as string[] : []
  return NextResponse.json({ guidelines })
}
