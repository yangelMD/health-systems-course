'use client'
import { useEffect, useRef, useState } from 'react'
import type { Lang } from '@/lib/types'

interface Message { role: 'user' | 'assistant'; content: string }
interface HintOverride { category: string; country: string; en: string; he: string }

export default function TeacherPage() {
  const [lang, setLang] = useState<Lang>('he')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [guidelines, setGuidelines] = useState<string[]>([])
  const [hintOverrides, setHintOverrides] = useState<HintOverride[]>([])
  const [showGuidelines, setShowGuidelines] = useState(false)
  const [panelTab, setPanelTab] = useState<'guidelines' | 'hints'>('guidelines')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const l = (localStorage.getItem('lang') as Lang) || 'he'
    setLang(l)
    ;(async () => {
      const [msgsRes] = await Promise.all([
        fetch('/api/teacher/chat'),
      ])
      const msgs = await msgsRes.json()
      setMessages(msgs)
      setPageLoading(false)
      loadGuidelines()
    })()
  }, [])

  async function loadGuidelines() {
    const res = await fetch('/api/teacher/guidelines')
    if (res.ok) {
      const data = await res.json()
      setGuidelines(data.guidelines || [])
      setHintOverrides(data.hintOverrides || [])
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages(m => [...m, { role: 'user', content: text }])
    setLoading(true)
    try {
      const res = await fetch('/api/teacher/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const { reply } = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: reply }])
      loadGuidelines()
    } finally {
      setLoading(false)
    }
  }

  async function clearHistory() {
    if (!confirm(lang === 'he' ? 'למחוק את כל השיחה?' : 'Clear entire conversation?')) return
    await fetch('/api/teacher/chat', { method: 'DELETE' })
    setMessages([])
  }

  const dir = lang === 'he' ? 'rtl' : 'ltr'

  if (pageLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-blue-800">
      <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"/>
    </div>
  )

  return (
    <div dir={dir} className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-4 py-3 flex items-center justify-between shadow-lg sticky top-0 z-20">
        <div>
          <h1 className="font-bold text-sm leading-tight">
            {lang === 'he' ? 'ממשק מורים – כוונון משוב AI' : 'Teacher Interface – AI Feedback Tuning'}
          </h1>
          <p className="text-blue-300 text-xs">
            {lang === 'he' ? 'קורס מערכות בריאות בעולם – אוניברסיטת תל אביב' : 'Comparative Health Systems – Tel Aviv University'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowGuidelines(g => !g)}
            className="bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-xs font-medium transition">
            📋 {guidelines.length + hintOverrides.length > 0
              ? `${guidelines.length + hintOverrides.length} ${lang === 'he' ? 'הגדרות' : 'settings'}`
              : (lang === 'he' ? 'הגדרות' : 'Settings')}
          </button>
          <button onClick={() => { setLang('en'); localStorage.setItem('lang','en') }}
            className={`px-2 py-1 rounded text-xs font-bold ${lang==='en' ? 'bg-white text-blue-900' : 'bg-white/10 hover:bg-white/20'}`}>EN</button>
          <button onClick={() => { setLang('he'); localStorage.setItem('lang','he') }}
            className={`px-2 py-1 rounded text-xs font-bold ${lang==='he' ? 'bg-white text-blue-900' : 'bg-white/10 hover:bg-white/20'}`}>עב</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
        {/* Guidelines panel */}
        {showGuidelines && (
          <aside className="w-80 bg-white border-e border-gray-200 flex flex-col overflow-hidden shadow-lg">
            <div className="p-3 border-b border-gray-100 flex gap-1">
              <button onClick={() => setPanelTab('guidelines')}
                className={`flex-1 text-xs font-medium py-1.5 rounded-lg transition ${panelTab === 'guidelines' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                📋 {lang === 'he' ? `הנחיות (${guidelines.length})` : `Guidelines (${guidelines.length})`}
              </button>
              <button onClick={() => setPanelTab('hints')}
                className={`flex-1 text-xs font-medium py-1.5 rounded-lg transition ${panelTab === 'hints' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                💡 {lang === 'he' ? `רמזים (${hintOverrides.length})` : `Hints (${hintOverrides.length})`}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {panelTab === 'guidelines' && (
                <>
                  <p className="text-xs text-gray-400 mb-3">
                    {lang === 'he' ? 'נשלחות ל-AI בכל בקשת משוב סטודנט' : 'Sent to AI with every student feedback request'}
                  </p>
                  {guidelines.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">
                      {lang === 'he' ? 'אין הנחיות עדיין. שוחח עם ה-AI כדי להוסיף.' : 'No guidelines yet. Chat with the AI to add some.'}
                    </p>
                  ) : (
                    <ol className="space-y-3">
                      {guidelines.map((g, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700">
                          <span className="font-bold text-blue-600 flex-shrink-0">{i + 1}.</span>
                          <span>{g}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </>
              )}
              {panelTab === 'hints' && (
                <>
                  <p className="text-xs text-gray-400 mb-3">
                    {lang === 'he' ? 'רמזים שעודכנו מעל ברירת המחדל' : 'Hints overriding the defaults'}
                  </p>
                  {hintOverrides.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">
                      {lang === 'he' ? 'אין רמזים מותאמים עדיין.' : 'No hint overrides yet. Ask me to update a hint.'}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {hintOverrides.map((h, i) => (
                        <div key={i} className="border border-gray-100 rounded-xl p-3 bg-gray-50">
                          <div className="text-xs font-bold text-blue-700 mb-1">{h.country} — {h.category}</div>
                          <p className="text-xs text-gray-600 leading-relaxed">{lang === 'he' ? h.he : h.en}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </aside>
        )}

        {/* Chat area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="max-w-2xl mx-auto mt-8 text-center">
                <div className="text-4xl mb-3">🤖</div>
                <h2 className="text-xl font-bold text-blue-900 mb-2">
                  {lang === 'he' ? 'ממשק כוונון משוב AI' : 'AI Feedback Tuning Interface'}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto">
                  {lang === 'he'
                    ? 'שוחח איתי כדי לכוונן את המשוב שה-AI נותן לסטודנטים. לדוגמה: "המשוב על שאלת גרמניה קצר מדי" או "חסרה התייחסות לנושא X".'
                    : 'Chat with me to fine-tune the AI feedback given to students. For example: "The feedback on Germany was too short" or "It\'s missing a reference to topic X".'}
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto text-start">
                  {[
                    lang === 'he' ? 'המשוב ארוך מדי, קצר יותר' : 'Feedback is too long, make it shorter',
                    lang === 'he' ? 'הוסף השוואה לישראל תמיד' : 'Always add a comparison to Israel',
                    lang === 'he' ? 'עדכן את הרמז על גרמניה בקטגוריה 1' : 'Update the hint for Germany in category 1',
                    lang === 'he' ? 'אל תחשוף את התשובה הנכונה' : 'Never reveal the model answer directly',
                  ].map((s, i) => (
                    <button key={i} onClick={() => setInput(s)}
                      className="text-xs p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50 transition text-start">
                      "{s}"
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
                  ${m.role === 'user'
                    ? 'bg-blue-600 text-white rounded-ee-sm'
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-es-sm'}`}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-es-sm px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }}/>
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }}/>
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }}/>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="max-w-3xl mx-auto flex gap-3 items-end">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                placeholder={lang === 'he' ? 'כתוב הנחיה או משוב על איכות התשובות...' : 'Write guidance or feedback about response quality...'}
                rows={2}
                className="flex-1 border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-gray-50 focus:bg-white transition"
              />
              <button onClick={send} disabled={loading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white p-2.5 rounded-2xl transition flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </button>
            </div>
            <div className="max-w-3xl mx-auto flex justify-between items-center mt-2 px-1">
              <p className="text-xs text-gray-400">
                {lang === 'he' ? 'Enter לשליחה • Shift+Enter לשורה חדשה' : 'Enter to send • Shift+Enter for new line'}
              </p>
              <button onClick={clearHistory} className="text-xs text-gray-400 hover:text-red-500 transition">
                {lang === 'he' ? 'נקה שיחה' : 'Clear conversation'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
