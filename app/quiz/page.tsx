'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { COUNTRIES, CATEGORIES, HINTS, COUNTRY_SOURCES } from '@/data/content'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/types'

interface Modal { type: 'hint' | 'feedback' | 'sources'; text: string; loading?: boolean; sources?: { label: string; url: string; labelHe: string }[] }

export default function QuizPage() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('he')
  const [userId, setUserId] = useState('')
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [catIndex, setCatIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set())
  const [modal, setModal] = useState<Modal | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [countryMenuOpen, setCountryMenuOpen] = useState(false)
  const saveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  const key = (country: string, catId: number) => `${country}::${catId}`

  useEffect(() => {
    const l = (localStorage.getItem('lang') as Lang) || 'he'
    setLang(l)
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/'); return }
      setUserId(user.id)

      const [countriesRes, answersRes] = await Promise.all([
        fetch(`/api/countries?userId=${user.id}`),
        fetch(`/api/answers?userId=${user.id}`),
      ])
      const countries = await countriesRes.json()
      const ans = await answersRes.json()

      if (!countries?.length) { router.push('/select'); return }
      setSelectedCountries(countries)

      const ansMap: Record<string, string> = {}
      const saved = new Set<string>()
      for (const a of (ans || [])) {
        const k = key(a.country, a.category_id)
        ansMap[k] = a.answer_text
        if (a.answer_text?.trim()) saved.add(k)
      }
      setAnswers(ansMap)
      setSavedKeys(saved)
      setLoading(false)
    })()
  }, [router])

  const cat = CATEGORIES[catIndex]
  const countries = COUNTRIES.filter(c => selectedCountries.includes(c.id))

  const saveAnswer = useCallback(async (country: string, catId: number, text: string, uid: string) => {
    const k = key(country, catId)
    await fetch('/api/answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: uid, country, categoryId: catId, answerText: text }),
    })
    setSavedKeys(prev => {
      const n = new Set(prev)
      if (text.trim()) n.add(k); else n.delete(k)
      return n
    })
  }, [])

  function handleChange(country: string, text: string) {
    const k = key(country, cat.id)
    setAnswers(prev => ({ ...prev, [k]: text }))
    setSavedKeys(prev => { const n = new Set(prev); n.delete(k); return n })
    clearTimeout(saveTimers.current[k])
    saveTimers.current[k] = setTimeout(() => {
      if (userId) saveAnswer(country, cat.id, text, userId)
    }, 1000)
  }

  async function handleBlur(country: string) {
    const k = key(country, cat.id)
    clearTimeout(saveTimers.current[k])
    const text = answers[k] || ''
    if (userId) await saveAnswer(country, cat.id, text, userId)
  }

  async function toggleCountry(countryId: string) {
    const newList = selectedCountries.includes(countryId)
      ? selectedCountries.filter(c => c !== countryId)
      : [...selectedCountries, countryId]
    setSelectedCountries(newList)
    await fetch('/api/countries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, countries: newList }),
    })
  }

  function showSources(countryId: string) {
    const sources = COUNTRY_SOURCES[countryId] || []
    setModal({ type: 'sources', text: '', sources })
  }

  function showHint(countryId: string) {
    const hint = HINTS[cat.id]?.[countryId]
    const text = hint ? (lang === 'he' ? hint.he : hint.en) : (lang === 'he' ? 'אין רמז זמין.' : 'No hint available.')
    setModal({ type: 'hint', text })
  }

  async function getFeedback(countryId: string) {
    const k = key(countryId, cat.id)
    const answerText = answers[k] || ''
    if (!answerText.trim()) {
      setModal({ type: 'feedback', text: t('noAnswer', lang) })
      return
    }
    setModal({ type: 'feedback', text: '', loading: true })
    const country = COUNTRIES.find(c => c.id === countryId)
    const countryName = lang === 'he' ? country?.he : country?.en
    const catName = lang === 'he' ? cat.he : cat.en
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: answerText, country: countryName, category: catName, categoryId: cat.id, countryId, lang }),
      })
      const { feedback } = await res.json()
      setModal({ type: 'feedback', text: feedback })
    } catch {
      setModal({ type: 'feedback', text: lang === 'he' ? 'שגיאה בקבלת משוב.' : 'Error getting feedback.' })
    }
  }

  function getCatStatus(catId: number): 'done' | 'started' | 'empty' {
    if (selectedCountries.length === 0) return 'empty'
    let filled = 0
    for (const co of selectedCountries) {
      if (savedKeys.has(key(co, catId))) filled++
    }
    if (filled === 0) return 'empty'
    if (filled === selectedCountries.length) return 'done'
    return 'started'
  }

  let total = 0, done = 0
  for (const c of CATEGORIES) {
    for (const co of selectedCountries) {
      total++
      if (savedKeys.has(key(co, c.id))) done++
    }
  }
  const pct = total ? Math.round((done / total) * 100) : 0
  const dir = lang === 'he' ? 'rtl' : 'ltr'

  async function handleExport(fmt: 'excel' | 'word') {
    const res = await fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, selectedCountries, lang }),
    })
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fmt === 'excel' ? 'health-systems.xlsx' : 'health-systems.docx'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-blue-800">
      <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"/>
    </div>
  )

  return (
    <div dir={dir} className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-4 py-3 flex items-center justify-between shadow-lg z-20 sticky top-0">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(o => !o)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <span className="font-bold text-sm hidden sm:block leading-tight">
            {lang === 'he' ? 'קורס מערכות בריאות בעולם – אוניברסיטת תל אביב' : 'Comparative Health Systems – Tel Aviv University'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
            <div className="w-20 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${pct}%` }}/>
            </div>
            <span className="text-xs font-medium text-blue-100">{pct}%</span>
          </div>
          <button onClick={() => { setLang('en'); localStorage.setItem('lang','en') }}
            className={`px-2 py-1 rounded text-xs font-bold transition ${lang==='en' ? 'bg-white text-blue-900' : 'bg-white/10 hover:bg-white/20'}`}>EN</button>
          <button onClick={() => { setLang('he'); localStorage.setItem('lang','he') }}
            className={`px-2 py-1 rounded text-xs font-bold transition ${lang==='he' ? 'bg-white text-blue-900' : 'bg-white/10 hover:bg-white/20'}`}>עב</button>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }}
            className="bg-red-500/80 hover:bg-red-500 px-2 py-1 rounded text-xs font-medium transition">
            {t('logout', lang)}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-white shadow-xl flex-shrink-0 flex flex-col overflow-y-auto border-e border-gray-200">
            {/* Country selector */}
            <div className="p-3 border-b border-gray-100">
              <button onClick={() => setCountryMenuOpen(o => !o)}
                className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 hover:text-blue-700 transition py-1">
                <span>🌍 {lang === 'he' ? 'מדינות' : 'Countries'} ({selectedCountries.length})</span>
                <svg className={`w-4 h-4 transition-transform ${countryMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {countryMenuOpen && (
                <div className="mt-2 space-y-0.5">
                  {COUNTRIES.map(c => (
                    <label key={c.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer text-sm">
                      <input type="checkbox" checked={selectedCountries.includes(c.id)}
                        onChange={() => toggleCountry(c.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                      <span>{c.flag}</span>
                      <span className="text-gray-700">{lang === 'he' ? c.he : c.en}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Category list */}
            <div className="flex-1 p-2 overflow-y-auto">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 py-2">
                {lang === 'he' ? 'קטגוריות' : 'Categories'}
              </p>
              {CATEGORIES.map((c, i) => {
                const status = getCatStatus(c.id)
                return (
                  <button key={c.id} onClick={() => setCatIndex(i)}
                    className={`w-full text-start px-3 py-2 rounded-xl mb-0.5 flex items-center gap-2 transition text-sm
                      ${catIndex === i ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-gray-100 text-gray-700'}`}>
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      status === 'done' ? 'bg-emerald-500' :
                      status === 'started' ? 'bg-amber-400' :
                      catIndex === i ? 'bg-blue-300' : 'bg-gray-300'
                    }`}/>
                    <span className="truncate leading-snug text-xs">{lang === 'he' ? c.he : c.en}</span>
                  </button>
                )
              })}
            </div>

            {/* Export + copyright */}
            <div className="p-3 border-t border-gray-100 space-y-2">
              <button onClick={() => handleExport('excel')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-sm font-medium transition">
                📊 {t('exportExcel', lang)}
              </button>
              <button onClick={() => handleExport('word')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-medium transition">
                📄 {t('exportWord', lang)}
              </button>
              <p className="text-center text-xs text-gray-400 pt-1">{lang === 'he' ? '© יואל אנג\'ל MD MBA' : '© Yoel Angel MD MBA'}</p>
            </div>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {/* Category header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
            <button onClick={() => setCatIndex(i => Math.max(0, i - 1))} disabled={catIndex === 0}
              className="p-2 rounded-xl bg-gray-100 disabled:opacity-30 hover:bg-gray-200 transition flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dir === 'rtl' ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}/>
              </svg>
            </button>
            <div className="text-center flex-1 min-w-0">
              <p className="text-xs text-gray-400 font-medium">{catIndex + 1} / {CATEGORIES.length}</p>
              <h2 className="text-base sm:text-lg font-bold text-blue-900 leading-tight truncate">
                {lang === 'he' ? cat.he : cat.en}
              </h2>
            </div>
            <button onClick={() => setCatIndex(i => Math.min(CATEGORIES.length - 1, i + 1))} disabled={catIndex === CATEGORIES.length - 1}
              className="p-2 rounded-xl bg-gray-100 disabled:opacity-30 hover:bg-gray-200 transition flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dir === 'rtl' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}/>
              </svg>
            </button>
          </div>

          {/* Country cards */}
          <div className="p-4 sm:p-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {countries.map(country => {
              const k = key(country.id, cat.id)
              const isSaved = savedKeys.has(k)
              const hasText = !!(answers[k]?.trim())
              return (
                <div key={country.id}
                  className={`bg-white rounded-2xl shadow-sm border-2 transition-all p-4 flex flex-col gap-3
                    ${isSaved ? 'border-emerald-300' : hasText ? 'border-amber-300' : 'border-transparent hover:border-gray-200'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="font-bold text-blue-900 flex-1 text-sm sm:text-base">{lang === 'he' ? country.he : country.en}</span>
                    {isSaved && <span className="text-emerald-500 text-sm">✓</span>}
                    {hasText && !isSaved && <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"/>}
                  </div>
                  <textarea
                    value={answers[k] || ''}
                    onChange={e => handleChange(country.id, e.target.value)}
                    onBlur={() => handleBlur(country.id)}
                    placeholder={t('yourAnswer', lang)}
                    rows={5}
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none bg-gray-50 focus:bg-white transition"
                  />
                  <div className="flex gap-1.5 flex-wrap">
                    <button onClick={() => showHint(country.id)}
                      className="flex-1 text-xs py-2 px-2 rounded-xl border border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 font-medium transition">
                      💡 {t('hint', lang)}
                    </button>
                    <button onClick={() => showSources(country.id)}
                      className="flex-1 text-xs py-2 px-2 rounded-xl border border-teal-200 text-teal-700 bg-teal-50 hover:bg-teal-100 font-medium transition">
                      🔗 {t('sources', lang)}
                    </button>
                    <button onClick={() => getFeedback(country.id)}
                      className="w-full text-xs py-2 px-2 rounded-xl border border-violet-200 text-violet-700 bg-violet-50 hover:bg-violet-100 font-medium transition">
                      🤖 {t('getFeedback', lang)}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </main>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div dir={dir} className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-blue-900 mb-3 text-lg">
              {modal.type === 'hint' ? `💡 ${t('hintTitle', lang)}` : modal.type === 'sources' ? `🔗 ${t('sourcesTitle', lang)}` : `🤖 ${t('feedbackTitle', lang)}`}
            </h3>
            {modal.type === 'sources' ? (
              <div className="space-y-3">
                {(modal.sources || []).map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition text-sm text-blue-700 font-medium">
                    <span className="text-lg">📖</span>
                    <span>{lang === 'he' ? s.labelHe : s.label}</span>
                    <span className="ms-auto text-gray-400 text-xs">↗</span>
                  </a>
                ))}
              </div>
            ) : modal.loading ? (
              <div className="flex items-center gap-3 text-gray-500 py-4">
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"/>
                {t('feedbackLoading', lang)}
              </div>
            ) : (
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{modal.text}</p>
            )}
            {!modal.loading && (
              <button onClick={() => setModal(null)}
                className="mt-5 w-full bg-gray-100 hover:bg-gray-200 py-2.5 rounded-xl text-sm font-medium transition">
                {t('close', lang)}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
