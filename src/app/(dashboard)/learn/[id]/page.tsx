'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MODULES } from '@/data/modules'
import { QUIZZES } from '@/data/quizzes'

export default function ModulePage() {
  const { id } = useParams()
  const mod = MODULES.find(m => m.id === id)
  const quiz = QUIZZES.find(q => q.module_id === id)
  const [activeLecon, setActiveLecon] = useState(0)
  const [lang, setLang] = useState<'fr' | 'en'>('fr')

  if (!mod) return (
    <div className="text-center py-20">
      <p className="text-gray-400">Module non trouvé</p>
      <Link href="/learn" className="btn-primary mt-4 inline-block">← Retour</Link>
    </div>
  )

  const lecon = mod.lecons[activeLecon]
  const content = lang === 'fr' ? lecon.content_fr : lecon.content_en

  return (
    <div className="max-w-4xl animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/learn" className="text-gray-400 hover:text-mouride-green text-sm flex items-center gap-1">
          ← Retour
        </Link>
        <span className="text-gray-300">•</span>
        <span className="text-mouride-gold text-sm font-semibold">{mod.icon} {mod.title_fr}</span>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setLang('fr')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'fr' ? 'bg-mouride-green text-white' : 'bg-gray-100 text-gray-500'}`}>FR</button>
          <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-mouride-green text-white' : 'bg-gray-100 text-gray-500'}`}>EN</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sidebar leçons */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Leçons</p>
            <div className="space-y-1">
              {mod.lecons.map((l, i) => (
                <button key={l.id} onClick={() => setActiveLecon(i)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${activeLecon === i ? 'bg-mouride-green text-white' : 'hover:bg-mouride-cream text-gray-600'}`}>
                  <span className="font-medium">{i + 1}. {lang === 'fr' ? l.title_fr : l.title_en}</span>
                  <span className={`text-xs block mt-0.5 ${activeLecon === i ? 'text-green-300' : 'text-gray-400'}`}>{l.duration_min} min</span>
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
            <h2 className="text-xl font-display font-bold text-mouride-green mb-1">
              {lang === 'fr' ? lecon.title_fr : lecon.title_en}
            </h2>
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-6 pb-4 border-b border-gray-100">
              <span>⏱️ {lecon.duration_min} min de lecture</span>
              <span>•</span>
              <span>Leçon {activeLecon + 1}/{mod.lecons.length}</span>
            </div>
            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {content}
            </div>
            <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
              <button onClick={() => setActiveLecon(Math.max(0, activeLecon - 1))} disabled={activeLecon === 0}
                className="btn-secondary py-2 px-4 text-sm disabled:opacity-30">
                ← Précédent
              </button>
              {activeLecon < mod.lecons.length - 1 ? (
                <button onClick={() => setActiveLecon(activeLecon + 1)} className="btn-primary py-2 px-4 text-sm">
                  Suivant →
                </button>
              ) : (
                quiz && (
                  <Link href={`/quiz?module=${mod.id}`} className="btn-gold py-2 px-4 text-sm">
                    🎯 Passer l&apos;évaluation →
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
