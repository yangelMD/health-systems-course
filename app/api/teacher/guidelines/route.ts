import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { CATEGORIES, COUNTRIES } from '@/data/content'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function GET() {
  const [{ data: gData }, { data: hData }] = await Promise.all([
    admin.from('settings').select('value').eq('key', 'teacher_guidelines').single(),
    admin.from('settings').select('value').eq('key', 'hint_overrides').single(),
  ])

  const guidelines = gData?.value ? JSON.parse(gData.value) as string[] : []
  const rawOverrides = hData?.value
    ? JSON.parse(hData.value) as Record<string, Record<string, { en: string; he: string }>>
    : {}

  // Humanize hint overrides for display
  const hintOverrides: { category: string; country: string; en: string; he: string }[] = []
  for (const catId of Object.keys(rawOverrides)) {
    const cat = CATEGORIES.find(c => c.id === Number(catId))
    for (const countryId of Object.keys(rawOverrides[catId])) {
      const country = COUNTRIES.find(c => c.id === countryId)
      hintOverrides.push({
        category: cat?.en || catId,
        country: country?.en || countryId,
        en: rawOverrides[catId][countryId].en,
        he: rawOverrides[catId][countryId].he,
      })
    }
  }

  return NextResponse.json({ guidelines, hintOverrides })
}
