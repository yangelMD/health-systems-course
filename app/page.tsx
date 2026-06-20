'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/types'

export default function AuthPage() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('he')
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const fakeEmail = (u: string) => `${u.toLowerCase().trim()}@example.com`

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const trimmed = username.trim()
    if (!trimmed || !password) { setLoading(false); return }

    if (mode === 'register') {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmed, password }),
      })
      const json = await res.json()
      if (!res.ok || !json.session) {
        setError(json.error || t('errorLogin', lang))
        setLoading(false)
        return
      }
      await supabase.auth.setSession(json.session)
      localStorage.setItem('lang', lang)
      localStorage.setItem('role', json.role)
      router.push(json.role === 'admin' ? '/admin' : '/select')
    } else {
      const { data, error: loginErr } = await supabase.auth.signInWithPassword({
        email: fakeEmail(trimmed),
        password,
      })
      if (loginErr || !data.user) {
        setError(t('errorLogin', lang))
        setLoading(false)
        return
      }
      // check if admin
      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()
      localStorage.setItem('lang', lang)
      const isAdmin = trimmed === process.env.NEXT_PUBLIC_ADMIN_USERNAME
      localStorage.setItem('role', isAdmin ? 'admin' : 'student')
      router.push(isAdmin ? '/admin' : '/select')
    }
    setLoading(false)
  }

  const dir = lang === 'he' ? 'rtl' : 'ltr'

  return (
    <div dir={dir} className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-900 to-blue-700">
      {/* Language toggle */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button onClick={() => setLang('en')} className={`px-3 py-1 rounded text-sm font-semibold ${lang === 'en' ? 'bg-white text-blue-900' : 'bg-blue-800 text-white'}`}>EN</button>
        <button onClick={() => setLang('he')} className={`px-3 py-1 rounded text-sm font-semibold ${lang === 'he' ? 'bg-white text-blue-900' : 'bg-blue-800 text-white'}`}>עב</button>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-900 mb-1 text-center">
          {lang === 'he' ? 'מערכות בריאות בעולם' : 'Comparative Health Systems'}
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          {lang === 'he' ? 'קורס ארגון שירותי בריאות בעולם' : 'Global Health Systems Course'}
        </p>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          {(['login', 'register'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setError('') }}
              className={`flex-1 py-2 text-sm font-semibold transition-colors ${mode === m ? 'border-b-2 border-blue-700 text-blue-700' : 'text-gray-400'}`}>
              {t(m, lang)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('username', lang)}</label>
            <input value={username} onChange={e => setUsername(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="username" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('password', lang)}</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'} required />
              <button type="button" onClick={() => setShowPassword(v => !v)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600 text-lg">
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50 transition">
            {loading ? '…' : t(mode, lang)}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          {mode === 'login' ? t('noAccount', lang) : t('alreadyHaveAccount', lang)}{' '}
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
            className="text-blue-600 underline">
            {mode === 'login' ? t('register', lang) : t('login', lang)}
          </button>
        </p>
      </div>
    </div>
  )
}
