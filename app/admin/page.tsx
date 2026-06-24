'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, authFetch } from '@/lib/supabase'
import { CATEGORIES, COUNTRIES } from '@/data/content'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/types'

interface StudentRow {
  profile: { id: string; username: string; role: string }
  answeredCount: number
  totalCells: number
  selectedCountries: string[]
}

interface StudentDetail {
  username: string
  answers: { country: string; category_id: number; answer_text: string }[]
  selectedCountries: string[]
}

type Tab = 'students' | 'prompt'

export default function AdminPage() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('he')
  const [rows, setRows] = useState<StudentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<StudentDetail | null>(null)
  const [tab, setTab] = useState<Tab>('students')
  const [aiPrompt, setAiPrompt] = useState('')
  const [promptSaved, setPromptSaved] = useState(false)
  const [detailCatIndex, setDetailCatIndex] = useState(0)

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
    await Promise.all([loadStudents(), loadPrompt()])
  }

  async function loadStudents() {
    const res = await authFetch('/api/admin/students')
    const data = await res.json()
    setRows(data.map((r: any) => ({
      profile: r.profile,
      answeredCount: r.answeredCount,
      totalCells: r.selectedCountries.length * CATEGORIES.length,
      selectedCountries: r.selectedCountries,
    })))
    setLoading(false)
  }

  async function loadPrompt() {
    const res = await authFetch('/api/admin/prompt')
    const data = await res.json()
    setAiPrompt(data.prompt)
  }

  async function savePrompt() {
    await authFetch('/api/admin/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: aiPrompt }),
    })
    setPromptSaved(true)
    setTimeout(() => setPromptSaved(false), 2000)
  }

  async function deleteUser(id: string) {
    if (!confirm(t('confirmDelete', lang))) return
    await authFetch('/api/admin/students', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setRows(r => r.filter(x => x.profile.id !== id))
  }

  async function resetPassword(id: string, username: string) {
    const newPassword = prompt(lang === 'he' ? `סיסמה חדשה עבור ${username}:` : `New password for ${username}:`)
    if (!newPassword) return
    const res = await authFetch('/api/admin/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: id, newPassword }),
    })
    const data = await res.json()
    if (data.error) alert(data.error)
    else alert(lang === 'he' ? 'הסיסמה אופסה בהצלחה' : 'Password reset successfully')
  }

  async function toggleTeacherRole(id: string, currentRole: string) {
    const newRole = currentRole === 'teacher' ? 'student' : 'teacher'
    await authFetch('/api/admin/students', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, role: newRole }),
    })
    setRows(r => r.map(x => x.profile.id === id ? { ...x, profile: { ...x.profile, role: newRole } } : x))
  }

  async function viewStudent(row: StudentRow) {
    const res = await authFetch(`/api/answers?userId=${row.profile.id}`)
    const answers = await res.json()
    setDetail({ username: row.profile.username, answers, selectedCountries: row.selectedCountries })
    setDetailCatIndex(0)
  }

  const dir = lang === 'he' ? 'rtl' : 'ltr'

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-blue-800">
      <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"/>
    </div>
  )

  return (
    <div dir={dir} className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-6 py-3 flex items-center justify-between shadow-lg sticky top-0 z-20">
        <div>
          <h1 className="font-bold text-base leading-tight">
            {lang === 'he' ? 'קורס מערכות בריאות בעולם – אוניברסיטת תל אביב' : 'Comparative Health Systems – Tel Aviv University'}
          </h1>
          <p className="text-blue-300 text-xs">{t('adminPanel', lang)}</p>
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={() => { setLang('en'); localStorage.setItem('lang','en') }} className={`px-2 py-1 rounded text-xs font-bold ${lang==='en' ? 'bg-white text-blue-900' : 'bg-white/10 hover:bg-white/20'}`}>EN</button>
          <button onClick={() => { setLang('he'); localStorage.setItem('lang','he') }} className={`px-2 py-1 rounded text-xs font-bold ${lang==='he' ? 'bg-white text-blue-900' : 'bg-white/10 hover:bg-white/20'}`}>עב</button>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }} className="bg-red-500/80 hover:bg-red-500 px-3 py-1 rounded text-xs font-medium">{t('logout', lang)}</button>
        </div>
      </header>

      {/* Drill-down overlay */}
      {detail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div dir={dir} className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-blue-900 text-lg">{detail.username}</h2>
                <p className="text-gray-500 text-sm">{detail.answers.filter(a => a.answer_text?.trim()).length} {lang === 'he' ? 'תשובות' : 'answers'}</p>
              </div>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">×</button>
            </div>

            {/* Category tabs */}
            <div className="px-4 py-2 border-b border-gray-100 overflow-x-auto flex gap-1.5">
              {CATEGORIES.map((c, i) => {
                const hasAny = detail.selectedCountries.some(co =>
                  detail.answers.find(a => a.country === co && a.category_id === c.id && a.answer_text?.trim())
                )
                return (
                  <button key={c.id} onClick={() => setDetailCatIndex(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 transition
                      ${detailCatIndex === i ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${hasAny ? 'bg-emerald-500' : 'bg-gray-300'}`}/>
                    {catIndex(i, lang)}
                  </button>
                )
              })}
            </div>

            {/* Answers for selected category */}
            <div className="p-6">
              <h3 className="font-semibold text-blue-900 mb-4 text-base">
                {lang === 'he' ? CATEGORIES[detailCatIndex].he : CATEGORIES[detailCatIndex].en}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {detail.selectedCountries.map(co => {
                  const country = COUNTRIES.find(c => c.id === co)
                  const ans = detail.answers.find(a => a.country === co && a.category_id === CATEGORIES[detailCatIndex].id)
                  const text = ans?.answer_text?.trim()
                  return (
                    <div key={co} className={`rounded-xl border-2 p-4 ${text ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-100 bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2 font-semibold text-sm text-blue-900">
                        <span>{country?.flag}</span>
                        <span>{lang === 'he' ? country?.he : country?.en}</span>
                        {text && <span className="text-emerald-500 ms-auto text-xs">✓</span>}
                      </div>
                      {text
                        ? <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{text}</p>
                        : <p className="text-xs text-gray-400 italic">{lang === 'he' ? 'לא נענה' : 'Not answered'}</p>
                      }
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 max-w-5xl mx-auto w-full">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl shadow-sm p-1 w-fit">
          <a href="/teacher"
          className="px-4 py-2 rounded-lg text-sm font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 transition ms-auto">
          👩‍🏫 {lang === 'he' ? 'ממשק מורים' : 'Teacher Interface'} ↗
        </a>
        {(['students', 'prompt'] as Tab[]).map(t_ => (
            <button key={t_} onClick={() => setTab(t_)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === t_ ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}>
              {t_ === 'students' ? (lang === 'he' ? '👥 סטודנטים' : '👥 Students') : (lang === 'he' ? '🤖 הגדרות AI' : '🤖 AI Settings')}
            </button>
          ))}
        </div>

        {tab === 'students' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 text-blue-900">
                <tr>
                  <th className="px-4 py-3 text-start font-semibold">{t('username', lang)}</th>
                  <th className="px-4 py-3 text-center font-semibold">{lang === 'he' ? 'מדינות' : 'Countries'}</th>
                  <th className="px-4 py-3 text-center font-semibold">{t('completion', lang)}</th>
                  <th className="px-4 py-3 text-center font-semibold">{lang === 'he' ? 'תפקיד' : 'Role'}</th>
              <th className="px-4 py-3 text-center font-semibold">{lang === 'he' ? 'פעולות' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => {
                  const pct = row.totalCells > 0 ? Math.round((row.answeredCount / row.totalCells) * 100) : 0
                  return (
                    <tr key={row.profile.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium text-gray-800">{row.profile.username}</td>
                      <td className="px-4 py-3 text-center text-gray-500 text-xs">{row.selectedCountries.length}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${pct === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${pct}%` }}/>
                          </div>
                          <span className="text-xs text-gray-600 w-8">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => toggleTeacherRole(row.profile.id, row.profile.role)}
                          className={`text-xs px-2 py-1 rounded-lg font-medium transition ${row.profile.role === 'teacher' ? 'bg-violet-100 text-violet-700 hover:bg-violet-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                          {row.profile.role === 'teacher' ? '👩‍🏫 Teacher' : 'Student'}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1 flex-wrap">
                          <button onClick={() => viewStudent(row)}
                            className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50 transition">
                            👁
                          </button>
                          <button onClick={() => resetPassword(row.profile.id, row.profile.username)}
                            className="text-amber-600 hover:text-amber-800 text-xs font-medium px-2 py-1 rounded hover:bg-amber-50 transition">
                            🔑
                          </button>
                          <button onClick={() => deleteUser(row.profile.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium px-2 py-1 rounded hover:bg-red-50 transition">
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {rows.length === 0 && (
                  <tr><td colSpan={4} className="text-center py-12 text-gray-400">{lang === 'he' ? 'אין סטודנטים עדיין.' : 'No students yet.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'prompt' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-blue-900 text-lg mb-1">{t('promptEditor', lang)}</h2>
            <p className="text-gray-500 text-sm mb-4">{t('promptLabel', lang)}</p>
            <textarea
              value={aiPrompt}
              onChange={e => setAiPrompt(e.target.value)}
              rows={12}
              className="w-full border border-gray-200 rounded-xl p-4 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y bg-gray-50"
            />
            <div className="flex items-center gap-3 mt-4">
              <button onClick={savePrompt}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition">
                {t('promptSave', lang)}
              </button>
              {promptSaved && <span className="text-emerald-600 text-sm font-medium">✓ {t('promptSaved', lang)}</span>}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              {lang === 'he'
                ? 'הפרומפט נשלח ל-Claude לפני כל בקשת משוב. הוסף הנחיות ספציפיות לגבי איך להגיב לסטודנטים.'
                : 'This prompt is sent to Claude before every feedback request. Add specific instructions about how to respond to students.'}
            </p>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">{lang === 'he' ? '© יואל אנג\'ל MD MBA' : '© Yoel Angel MD MBA'}</p>
      </div>
    </div>
  )
}

function catIndex(i: number, lang: Lang): string {
  const c = CATEGORIES[i]
  const label = lang === 'he' ? c.he : c.en
  return label.length > 25 ? label.slice(0, 25) + '…' : label
}
