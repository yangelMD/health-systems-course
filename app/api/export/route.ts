import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getRequestUser } from '@/lib/serverAuth'
import { COUNTRIES, CATEGORIES } from '@/data/content'
import * as XLSX from 'xlsx'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const user = await getRequestUser(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { userId, selectedCountries, lang, format } = await req.json()
  if (userId !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { data: answers } = await supabase
    .from('answers')
    .select('country,category_id,answer_text')
    .eq('user_id', userId)

  const ansMap: Record<string, string> = {}
  for (const a of (answers || [])) {
    ansMap[`${a.country}::${a.category_id}`] = a.answer_text
  }

  const countries = COUNTRIES.filter(c => selectedCountries.includes(c.id))

  // Build rows
  const headers = [
    lang === 'he' ? 'קטגוריה' : 'Category',
    ...countries.map(c => lang === 'he' ? c.he : c.en)
  ]
  const rows = CATEGORIES.map(cat => [
    lang === 'he' ? cat.he : cat.en,
    ...countries.map(c => ansMap[`${c.id}::${cat.id}`] || '')
  ])

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])

  // Column widths
  ws['!cols'] = [{ wch: 50 }, ...countries.map(() => ({ wch: 35 }))]

  XLSX.utils.book_append_sheet(wb, ws, lang === 'he' ? 'השוואת מערכות בריאות' : 'Health Systems')
  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

  return new NextResponse(buf, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=health-systems.xlsx',
    },
  })
}
