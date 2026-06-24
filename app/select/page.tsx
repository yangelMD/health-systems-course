'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { COUNTRIES, CATEGORIES } from '@/data/content'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/types'

export default function SelectPage() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('he')
  const [selected, setSelected] = useState<string[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const l = (localStorage.getItem('lang') as Lang) || 'he'
    setLang(l)
    if (window.innerWidth >= 768) setSidebarOpen(true)
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/'); return }
      setUserId(user.id)
      const res = await fetch(`/api/countries?userId=${user.id}`)
      const countries = await res.json()
      if (countries?.length) setSelected(countries)
      setLoading(false)
    })()
  }, [router])

  function toggle(id: string) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
    setError('')
  }

  async function handleStart() {
    if (selected.length === 0) { setError(t('selectAtLeast', lang)); return }
    await fetch('/api/countries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, countries: selected }),
    })
    router.push('/quiz')
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
      <header className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-3 py-2.5 flex items-center justify-between shadow-lg sticky top-0 z-20">
        <div className="flex items-center gap-2 min-w-0">
          <button onClick={() => setSidebarOpen(o => !o)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition flex-shrink-0 md:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <div className="min-w-0">
            <p className="font-bold text-xs sm:text-sm leading-tight truncate">
              {lang === 'he' ? 'קורס מערכות בריאות בעולם' : 'Comparative Health Systems'}
            </p>
            <p className="text-blue-300 text-xs leading-tight hidden sm:block">
              {lang === 'he' ? 'אוניברסיטת תל אביב' : 'Tel Aviv University'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button onClick={() => { setLang('en'); localStorage.setItem('lang','en') }}
            className={`px-2 py-1 rounded text-xs font-bold transition ${lang==='en' ? 'bg-white text-blue-900' : 'bg-white/10 hover:bg-white/20'}`}>EN</button>
          <button onClick={() => { setLang('he'); localStorage.setItem('lang','he') }}
            className={`px-2 py-1 rounded text-xs font-bold transition ${lang==='he' ? 'bg-white text-blue-900' : 'bg-white/10 hover:bg-white/20'}`}>עב</button>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }}
            className="bg-red-500/80 hover:bg-red-500 px-2 py-1 rounded text-xs font-medium transition hidden sm:block">
            {t('logout', lang)}
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative" style={{ minHeight: 'calc(100vh - 52px)' }}>
        {/* Sidebar backdrop on mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)}/>
        )}

        {/* Sidebar */}
        <aside className={`
          fixed md:static top-0 bottom-0 z-40 md:z-auto
          w-72 md:w-64 bg-white shadow-xl flex-shrink-0 flex flex-col overflow-y-auto border-e border-gray-200
          transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : (dir === 'rtl' ? 'translate-x-full' : '-translate-x-full')}
          md:translate-x-0
        `} style={{ top: 0 }}>
          <div className="flex items-center justify-between p-3 border-b border-gray-100 md:hidden">
            <span className="text-sm font-bold text-blue-900">{lang === 'he' ? 'קטגוריות' : 'Categories'}</span>
            <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              {lang === 'he' ? 'קטגוריות' : 'Categories'}
            </p>
            {CATEGORIES.map((c) => (
              <div key={c.id}
                className="w-full text-start px-3 py-2 rounded-xl mb-0.5 flex items-center gap-2 text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-gray-200"/>
                <span className="truncate text-xs leading-snug">{lang === 'he' ? c.he : c.en}</span>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-100 space-y-2">
            <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-2 rounded-xl text-sm font-medium transition md:hidden">
              {t('logout', lang)}
            </button>
            <p className="text-center text-xs text-gray-400">{lang === 'he' ? '© יואל אנג\'ל MD MBA' : '© Yoel Angel MD MBA'}</p>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-1">
              {lang === 'he' ? 'בחרו מדינות להשוואה' : 'Select countries to compare'}
            </h2>
            <p className="text-gray-500 text-sm mb-5">
              {lang === 'he' ? 'ניתן לשנות את הבחירה בכל עת מתוך הטבלה' : 'You can change your selection at any time from within the table'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-5">
              {COUNTRIES.map(c => (
                <button key={c.id} onClick={() => toggle(c.id)}
                  className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl border-2 transition-all text-sm font-medium
                    ${selected.includes(c.id)
                      ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-sm'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:shadow-sm'}`}>
                  <span className="text-xl sm:text-2xl">{c.flag}</span>
                  <span className="text-xs sm:text-sm leading-tight">{lang === 'he' ? c.he : c.en}</span>
                  {selected.includes(c.id) && <span className="ms-auto text-blue-600 flex-shrink-0">✓</span>}
                </button>
              ))}
            </div>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button onClick={handleStart} disabled={selected.length === 0}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white py-3.5 rounded-2xl font-semibold text-base sm:text-lg transition shadow-sm">
              {t('startQuiz', lang)} ({selected.length})
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
