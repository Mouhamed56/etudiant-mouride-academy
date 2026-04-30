'use client'
import Link from 'next/link'
import { MODULES, COURSES } from '@/data/modules'
import { QUIZZES } from '@/data/quizzes'

export default function LearnPage() {
  return (
    <div className="max-w-4xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-mouride-green">Parcours d&apos;apprentissage</h1>
        <p className="text-gray-500 mt-1 text-sm">Extrait du livre de Mouhamed Sène — {MODULES.reduce((t, m) => t + m.lecons.length, 0)} leçons · {MODULES.length} modules</p>
      </div>

      {/* Course card */}
      {COURSES.map(c => (
        <div key={c.id} className="bg-gradient-to-br from-mouride-green to-mouride-green-dark rounded-2xl p-6 text-white mb-8">
          <div className="text-4xl mb-3">{c.icon}</div>
          <h2 className="font-display font-bold text-2xl mb-2">{c.title_fr}</h2>
          <p className="text-green-200 text-sm mb-4">{c.description_fr}</p>
          <div className="flex flex-wrap gap-4 text-xs text-green-300">
            <span>📚 {c.modules_count} modules</span>
            <span>📝 {c.lecons_count} leçons</span>
            <span>⏱️ {c.duration_min} min</span>
            <span>✍️ {c.author}</span>
          </div>
        </div>
      ))}

      {/* Modules list */}
      <div className="space-y-4">
        {MODULES.map((mod, idx) => {
          const quiz = QUIZZES.find(q => q.module_id === mod.id)
          return (
            <div key={mod.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 flex items-start gap-4">
                <div className="w-12 h-12 bg-mouride-cream rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {mod.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-mouride-gold bg-mouride-gold/10 px-2 py-0.5 rounded-full">Module {idx + 1}</span>
                  </div>
                  <h3 className="font-display font-bold text-mouride-green">{mod.title_fr}</h3>
                  <p className="text-gray-500 text-sm mt-1">{mod.description_fr}</p>
                  <div className="mt-3 space-y-2">
                    {mod.lecons.map((lecon, li) => (
                      <Link key={lecon.id} href={`/learn/${mod.id}?lecon=${lecon.id}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-mouride-cream transition-colors group">
                        <div className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-mouride-gold/20 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                          {li + 1}
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-mouride-green">{lecon.title_fr}</span>
                        <span className="text-xs text-gray-400 ml-auto">{lecon.duration_min} min</span>
                      </Link>
                    ))}
                  </div>
                  {quiz && (
                    <Link href={`/quiz?module=${mod.id}`}
                      className="mt-3 flex items-center gap-2 text-sm text-mouride-gold font-semibold hover:text-mouride-green transition-colors">
                      🎯 {quiz.title_fr} ({quiz.questions.length} questions)
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
