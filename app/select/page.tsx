'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { COUNTRIES } from '@/data/content'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/types'

export default function SelectPage() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('he')
  const [selected, setSelected] = useState<string[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const l = (localStorage.getItem('lang') as Lang) || 'he'
    setLang(l)
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/'); return }
      const { data } = await supabase
        .from('selected_countries')
        .select('countries')
        .eq('user_id', user.id)
        .single()
      if (data?.countries?.length) setSelected(data.countries)
      setLoading(false)
    })()
  }, [router])

  function toggle(id: string) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
    setError('')
  }

  async function handleStart() {
    if (selected.length === 0) { setError(t('selectAtLeast', lang)); return }
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/'); return }
    await supabase.from('selected_countries').upsert({ user_id: user.id, countries: selected })
    router.push('/quiz')
  }

  const dir = lang === 'he' ? 'rtl' : 'ltr'

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"/></div>

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-blue-900">{lang === 'he' ? 'מערכות בריאות בעולם' : 'Comparative Health Systems'}</h1>
          <div className="flex gap-2">
            <button onClick={() => { setLang('en'); localStorage.setItem('lang','en') }} className={`px-3 py-1 rounded text-sm font-semibold ${lang==='en' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600'}`}>EN</button>
            <button onClick={() => { setLang('he'); localStorage.setItem('lang','he') }} className={`px-3 py-1 rounded text-sm font-semibold ${lang==='he' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600'}`}>עב</button>
          </div>
        </div>
        <p className="text-gray-600 mb-6 text-sm">{t('selectCountries', lang)}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {COUNTRIES.map(c => (
            <button key={c.id} onClick={() => toggle(c.id)}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-medium
                ${selected.includes(c.id) ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'}`}>
              <span className="text-xl">{c.flag}</span>
              <span>{lang === 'he' ? c.he : c.en}</span>
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button onClick={handleStart}
          className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-800 transition">
          {t('startQuiz', lang)} ({selected.length})
        </button>
      </div>
    </div>
  )
}
