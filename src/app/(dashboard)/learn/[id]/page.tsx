'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useModules, useQuizzes } from '@/lib/useContent'

export default function ModulePage() {
  const { id } = useParams()
  const { modules: MODULES } = useModules()
  const { quizzes: QUIZZES } = useQuizzes()
  const mod = MODULES.find(m => m.id === id)
  const quiz = QUIZZES.find(q => q.module_id === id)
  const [activeLecon, setActiveLecon] = useState(0)
  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        const saved = localStorage.getItem(`ema-progress-${user.id}`)
        if (saved) setProgress(JSON.parse(saved))
      }
    }
    load()
  }, [])

  function markComplete(leconId: string) {
    const updated = { ...progress, [leconId]: true }
    setProgress(updated)
    if (userId) localStorage.setItem(`ema-progress-${userId}`, JSON.stringify(updated))
  }

  if (!mod) return (
    <div className="text-center py-20">
      <p className="text-gray-400">Module non trouvé</p>
      <Link href="/learn" className="btn-primary mt-4 inline-block">← Retour</Link>
    </div>
  )

  const lecon = mod.lecons[activeLecon]
  const content = lang === 'fr' ? lecon.content_fr : lecon.content_en
  const isCompleted = progress[lecon.id]
  const modProgress = mod.lecons.filter(l => progress[l.id]).length

  return (
    <div className="max-w-4xl animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/learn" className="text-gray-400 hover:text-mouride-green text-sm">← Retour</Link>
        <span className="text-gray-300">•</span>
        <span className="text-mouride-gold text-sm font-semibold">{mod.icon} {mod.title_fr}</span>
        <div className="ml-auto flex gap-2">
          {(['fr', 'en'] as const).map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === l ? 'bg-mouride-green text-white' : 'bg-gray-100 text-gray-500'}`}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Module progress */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Progression du module</span>
          <span>{modProgress}/{mod.lecons.length} leçons</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-mouride-gold rounded-full transition-all"
            style={{ width: `${(modProgress / mod.lecons.length) * 100}%` }} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Leçons</p>
            <div className="space-y-1">
              {mod.lecons.map((l, i) => (
                <button key={l.id} onClick={() => setActiveLecon(i)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 ${activeLecon === i ? 'bg-mouride-green text-white' : 'hover:bg-mouride-cream text-gray-600'}`}>
                  <span>{progress[l.id] ? '✅' : '○'}</span>
                  <span className="flex-1 font-medium truncate">{i + 1}. {lang === 'fr' ? l.title_fr : l.title_en}</span>
                  <span className={`text-xs ${activeLecon === i ? 'text-green-300' : 'text-gray-400'}`}>{l.duration_min}m</span>
                </button>
              ))}
            </div>
            {quiz && (
              <Link href={`/quiz?module=${mod.id}`}
                className="mt-4 block w-full text-center bg-mouride-gold text-mouride-green font-bold py-2.5 rounded-xl text-sm hover:bg-mouride-gold-light transition-colors">
                🎯 Évaluation QCM
              </Link>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-xl font-display font-bold text-mouride-green">
                {lang === 'fr' ? lecon.title_fr : lecon.title_en}
              </h2>
              {isCompleted && <span className="text-green-500 text-2xl">✅</span>}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-6 pb-4 border-b border-gray-100">
              <span>⏱️ {lecon.duration_min} min</span>
              <span>•</span>
              <span>Leçon {activeLecon + 1}/{mod.lecons.length}</span>
            </div>
            <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
              {content}
            </div>

            {/* Mark complete button */}
            {!isCompleted && (
              <button onClick={() => markComplete(lecon.id)}
                className="mt-6 w-full bg-green-500 text-white font-semibold py-3 rounded-xl hover:bg-green-600 transition-colors">
                ✅ Marquer comme lu
              </button>
            )}

            <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
              <button onClick={() => setActiveLecon(Math.max(0, activeLecon - 1))} disabled={activeLecon === 0}
                className="btn-secondary py-2 px-4 text-sm disabled:opacity-30">
                ← Précédent
              </button>
              {activeLecon < mod.lecons.length - 1 ? (
                <button onClick={() => { markComplete(lecon.id); setActiveLecon(activeLecon + 1) }}
                  className="btn-primary py-2 px-4 text-sm">
                  Suivant →
                </button>
              ) : (
                quiz && (
                  <Link href={`/quiz?module=${mod.id}`} className="btn-gold py-2 px-4 text-sm">
                    🎯 Évaluation →
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}