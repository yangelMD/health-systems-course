'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { COUNTRIES, CATEGORIES, HINTS } from '@/data/content'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/types'

interface Modal { type: 'hint' | 'feedback'; text: string; loading?: boolean }

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

  const key = (country: string, catId: number) => `${country}::${catId}`

  useEffect(() => {
    const l = (localStorage.getItem('lang') as Lang) || 'he'
    setLang(l)
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/'); return }
      setUserId(user.id)

      const [{ data: sc }, { data: ans }] = await Promise.all([
        supabase.from('selected_countries').select('countries').eq('user_id', user.id).single(),
        supabase.from('answers').select('country,category_id,answer_text').eq('user_id', user.id),
      ])

      if (!sc?.countries?.length) { router.push('/select'); return }
      setSelectedCountries(sc.countries)

      const ansMap: Record<string, string> = {}
      const saved = new Set<string>()
      for (const a of (ans || [])) {
        const k = key(a.country, a.category_id)
        ansMap[k] = a.answer_text
        saved.add(k)
      }
      setAnswers(ansMap)
      setSavedKeys(saved)
      setLoading(false)
    })()
  }, [router])

  const cat = CATEGORIES[catIndex]
  const countries = COUNTRIES.filter(c => selectedCountries.includes(c.id))

  const saveAnswer = useCallback(async (country: string, catId: number, text: string) => {
    if (!userId) return
    const k = key(country, catId)
    await supabase.from('answers').upsert(
      { user_id: userId, country, category_id: catId, answer_text: text },
      { onConflict: 'user_id,country,category_id' }
    )
    setSavedKeys(prev => new Set([...prev, k]))
  }, [userId])

  function handleChange(country: string, text: string) {
    const k = key(country, cat.id)
    setAnswers(prev => ({ ...prev, [k]: text }))
    setSavedKeys(prev => { const n = new Set(prev); n.delete(k); return n })
  }

  async function handleBlur(country: string) {
    const k = key(country, cat.id)
    const text = answers[k] || ''
    if (text.trim()) await saveAnswer(country, cat.id, text)
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
        body: JSON.stringify({ answer: answerText, country: countryName, category: catName, lang }),
      })
      const { feedback } = await res.json()
      setModal({ type: 'feedback', text: feedback })
    } catch {
      setModal({ type: 'feedback', text: lang === 'he' ? 'שגיאה בקבלת משוב.' : 'Error getting feedback.' })
    }
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

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"/></div>

  return (
    <div dir={dir} className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow">
        <span className="font-bold text-sm sm:text-base">
          {lang === 'he' ? 'מערכות בריאות בעולם' : 'Comparative Health Systems'}
        </span>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span>{pct}% {t('progress', lang)}</span>
          <button onClick={() => { setLang('en'); localStorage.setItem('lang','en') }} className={`px-2 py-0.5 rounded ${lang==='en' ? 'bg-white text-blue-900' : 'bg-blue-700'}`}>EN</button>
          <button onClick={() => { setLang('he'); localStorage.setItem('lang','he') }} className={`px-2 py-0.5 rounded ${lang==='he' ? 'bg-white text-blue-900' : 'bg-blue-700'}`}>עב</button>
          <button onClick={() => router.push('/select')} className="bg-blue-700 hover:bg-blue-600 px-2 py-0.5 rounded">{t('changeCountries', lang)}</button>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }} className="bg-red-600 hover:bg-red-500 px-2 py-0.5 rounded">{t('logout', lang)}</button>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-200">
        <div className="h-full bg-blue-500 transition-all" style={{ width: `${pct}%` }} />
      </div>

      {/* Category nav */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => setCatIndex(i => Math.max(0, i - 1))} disabled={catIndex === 0}
          className="px-3 py-1 rounded bg-gray-100 disabled:opacity-30 hover:bg-gray-200 text-sm">{t('prev', lang)}</button>
        <span className="font-semibold text-blue-900 text-sm flex-1 text-center">
          {t('category', lang)} {catIndex + 1} {t('of', lang)} {CATEGORIES.length}
        </span>
        <button onClick={() => setCatIndex(i => Math.min(CATEGORIES.length - 1, i + 1))} disabled={catIndex === CATEGORIES.length - 1}
          className="px-3 py-1 rounded bg-gray-100 disabled:opacity-30 hover:bg-gray-200 text-sm">{t('next', lang)}</button>
      </div>

      {/* Category title */}
      <div className="px-4 py-4 bg-blue-50 border-b">
        <h2 className="text-base sm:text-lg font-semibold text-blue-900">
          {lang === 'he' ? cat.he : cat.en}
        </h2>
      </div>

      {/* Country cards */}
      <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map(country => {
          const k = key(country.id, cat.id)
          const isSaved = savedKeys.has(k)
          return (
            <div key={country.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 font-semibold text-blue-900">
                <span className="text-2xl">{country.flag}</span>
                <span>{lang === 'he' ? country.he : country.en}</span>
                {isSaved && <span className="text-green-500 text-xs ms-auto">✓</span>}
              </div>
              <textarea
                value={answers[k] || ''}
                onChange={e => handleChange(country.id, e.target.value)}
                onBlur={() => handleBlur(country.id)}
                placeholder={t('yourAnswer', lang)}
                rows={4}
                className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => showHint(country.id)}
                  className="flex-1 text-xs py-1.5 px-2 rounded-lg border border-amber-400 text-amber-700 bg-amber-50 hover:bg-amber-100 font-medium">
                  💡 {t('hint', lang)}
                </button>
                <button onClick={() => getFeedback(country.id)}
                  className="flex-1 text-xs py-1.5 px-2 rounded-lg border border-purple-400 text-purple-700 bg-purple-50 hover:bg-purple-100 font-medium">
                  🤖 {t('getFeedback', lang)}
                </button>
                <button onClick={() => {
                  handleChange(country.id, '')
                  setSavedKeys(prev => { const n = new Set(prev); n.delete(k); return n })
                  saveAnswer(country.id, cat.id, '')
                }}
                  className="text-xs py-1.5 px-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 font-medium">
                  {t('skip', lang)}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Export buttons */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        <button onClick={() => handleExport('excel')}
          className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium hover:bg-green-700">
          📊 {t('exportExcel', lang)}
        </button>
        <button onClick={() => handleExport('word')}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium hover:bg-blue-700">
          📄 {t('exportWord', lang)}
        </button>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-30 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div dir={dir} className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-blue-900 mb-3 text-lg">
              {modal.type === 'hint' ? `💡 ${t('hintTitle', lang)}` : `🤖 ${t('feedbackTitle', lang)}`}
            </h3>
            {modal.loading
              ? <div className="flex items-center gap-2 text-gray-500"><div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"/>{t('feedbackLoading', lang)}</div>
              : <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{modal.text}</p>
            }
            {!modal.loading && (
              <button onClick={() => setModal(null)}
                className="mt-4 w-full bg-gray-100 hover:bg-gray-200 py-2 rounded-lg text-sm font-medium">
                {t('close', lang)}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
