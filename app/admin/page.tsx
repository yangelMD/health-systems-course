'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { CATEGORIES } from '@/data/content'
import { t } from '@/lib/i18n'
import type { Lang, Profile } from '@/lib/types'

interface StudentRow {
  profile: Profile
  answeredCount: number
  totalCells: number
  selectedCountries: string[]
}

export default function AdminPage() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('he')
  const [rows, setRows] = useState<StudentRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const l = (localStorage.getItem('lang') as Lang) || 'he'
    setLang(l)
    checkAdmin()
  }, [])

  async function checkAdmin() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/'); return }
    const username = user.email?.split('@')[0]
    const isAdmin = username === process.env.NEXT_PUBLIC_ADMIN_USERNAME || localStorage.getItem('role') === 'admin'
    if (!isAdmin) { router.push('/'); return }
    await loadStudents()
  }

  async function loadStudents() {
    const res = await fetch('/api/admin/students')
    const data = await res.json()
    const studentRows = data.map((r: any) => ({
      profile: r.profile,
      answeredCount: r.answeredCount,
      totalCells: r.selectedCountries.length * CATEGORIES.length,
      selectedCountries: r.selectedCountries,
    }))
    setRows(studentRows)
    setLoading(false)
  }

  async function deleteUser(id: string) {
    if (!confirm(t('confirmDelete', lang))) return
    await fetch('/api/admin/students', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setRows(r => r.filter(x => x.profile.id !== id))
  }

  const dir = lang === 'he' ? 'rtl' : 'ltr'

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"/></div>

  return (
    <div dir={dir} className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">{t('adminPanel', lang)}</h1>
        <div className="flex gap-2 items-center">
          <button onClick={() => { setLang('en'); localStorage.setItem('lang','en') }} className={`px-2 py-1 rounded text-sm ${lang==='en' ? 'bg-white text-blue-900' : 'bg-blue-800'}`}>EN</button>
          <button onClick={() => { setLang('he'); localStorage.setItem('lang','he') }} className={`px-2 py-1 rounded text-sm ${lang==='he' ? 'bg-white text-blue-900' : 'bg-blue-800'}`}>עב</button>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }} className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm">{t('logout', lang)}</button>
        </div>
      </header>

      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 text-blue-900">
              <tr>
                <th className="px-4 py-3 text-start font-semibold">{t('username', lang)}</th>
                <th className="px-4 py-3 text-center font-semibold">{t('students', lang)}</th>
                <th className="px-4 py-3 text-center font-semibold">{t('completion', lang)}</th>
                <th className="px-4 py-3 text-center font-semibold">{t('deleteUser', lang)}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => {
                const pct = row.totalCells > 0 ? Math.round((row.answeredCount / row.totalCells) * 100) : 0
                return (
                  <tr key={row.profile.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{row.profile.username}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{row.selectedCountries.length} countries</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }}/>
                        </div>
                        <span className="text-xs text-gray-600">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => deleteUser(row.profile.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium px-2 py-1 rounded hover:bg-red-50">
                        🗑 {t('deleteUser', lang)}
                      </button>
                    </td>
                  </tr>
                )
              })}
              {rows.length === 0 && (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">{lang === 'he' ? 'אין סטודנטים עדיין.' : 'No students yet.'}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
