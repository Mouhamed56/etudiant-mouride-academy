'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { QUIZZES } from '@/data/quizzes'
import { MODULES } from '@/data/modules'

type Screen = 'list' | 'quiz' | 'result'

export default function QuizPage() {
  const params = useSearchParams()
  const moduleId = params.get('module')
  const [screen, setScreen] = useState<Screen>('list')
  const [activeQuiz, setActiveQuiz] = useState<typeof QUIZZES[0] | null>(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [lang, setLang] = useState<'fr' | 'en'>('fr')

  useEffect(() => {
    if (moduleId) {
      const quiz = QUIZZES.find(q => q.module_id === moduleId)
      if (quiz) { setActiveQuiz(quiz); setScreen('quiz') }
    }
  }, [moduleId])

  function startQuiz(quiz: typeof QUIZZES[0]) {
    setActiveQuiz(quiz); setCurrentQ(0); setSelected(null); setAnswers([]); setScreen('quiz')
  }

  function nextQuestion() {
    if (!activeQuiz || selected === null) return
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)
    if (currentQ + 1 < activeQuiz.questions.length) {
      setCurrentQ(currentQ + 1); setSelected(null)
    } else {
      setScreen('result')
    }
  }

  const score = activeQuiz ? answers.filter((a, i) => a === activeQuiz.questions[i]?.correct).length : 0
  const pct = activeQuiz ? Math.round((score / activeQuiz.questions.length) * 100) : 0
  const letters = ['A', 'B', 'C', 'D']

  if (screen === 'list') return (
    <div className="max-w-4xl animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-mouride-green">Quiz & Évaluations QCM</h1>
          <p className="text-gray-500 text-sm mt-1">{QUIZZES.length} évaluations · {QUIZZES.reduce((t, q) => t + q.questions.length, 0)} questions</p>
        </div>
        <div className="flex gap-2">
          {(['fr', 'en'] as const).map(l => (
            <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded-full text-xs font-bold ${lang === l ? 'bg-mouride-green text-white' : 'bg-gray-100 text-gray-500'}`}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {QUIZZES.map(quiz => {
          const mod = MODULES.find(m => m.id === quiz.module_id)
          return (
            <div key={quiz.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="text-3xl">{mod?.icon || '📝'}</div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-mouride-green">{lang === 'fr' ? quiz.title_fr : quiz.title_en}</h3>
                <p className="text-gray-400 text-xs mt-1">{quiz.questions.length} questions · Module {mod?.order || '?'}</p>
              </div>
              <button onClick={() => startQuiz(quiz)} className="btn-gold py-2 px-5 text-sm flex-shrink-0">
                Commencer →
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )

  if (screen === 'quiz' && activeQuiz) {
    const q = activeQuiz.questions[currentQ]
    const question = lang === 'fr' ? q.question_fr : q.question_en
    const options = lang === 'fr' ? q.options_fr : q.options_en
    const expl = lang === 'fr' ? q.explanation_fr : q.explanation_en

    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setScreen('list')} className="text-gray-400 hover:text-mouride-green text-sm">← Quitter</button>
          <span className="text-sm font-semibold text-mouride-green">{lang === 'fr' ? activeQuiz.title_fr : activeQuiz.title_en}</span>
          <div className="flex gap-2">
            {(['fr', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} className={`px-2 py-1 rounded-full text-xs font-bold ${lang === l ? 'bg-mouride-green text-white' : 'bg-gray-100 text-gray-500'}`}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Question {currentQ + 1}/{activeQuiz.questions.length}</span>
            <span>{Math.round((currentQ / activeQuiz.questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
            <div className="h-full bg-mouride-gold rounded-full transition-all" style={{ width: `${(currentQ / activeQuiz.questions.length) * 100}%` }} />
          </div>
          <h3 className="text-lg font-display font-bold text-mouride-green mb-6">{question}</h3>
          <div className="space-y-3">
            {options.map((opt, i) => {
              let cls = 'border-gray-200 bg-white hover:border-mouride-green hover:bg-mouride-cream'
              if (selected !== null) {
                if (i === q.correct) cls = 'border-green-500 bg-green-50'
                else if (i === selected) cls = 'border-red-400 bg-red-50'
                else cls = 'border-gray-100 bg-gray-50 opacity-50'
              }
              return (
                <button key={i} onClick={() => selected === null && setSelected(i)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${cls}`}>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${selected !== null && i === q.correct ? 'bg-green-500 text-white' : selected === i && i !== q.correct ? 'bg-red-400 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {letters[i]}
                  </span>
                  <span className="text-sm text-gray-700">{opt}</span>
                </button>
              )
            })}
          </div>
          {selected !== null && (
            <div className={`mt-4 p-4 rounded-xl text-sm ${selected === q.correct ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
              <strong>{selected === q.correct ? '✅ Correct !' : '❌ Incorrect.'}</strong> {expl}
            </div>
          )}
          {selected !== null && (
            <button onClick={nextQuestion} className="mt-4 btn-primary w-full py-3">
              {currentQ + 1 < activeQuiz.questions.length ? 'Question suivante →' : 'Voir les résultats →'}
            </button>
          )}
        </div>
      </div>
    )
  }

  if (screen === 'result' && activeQuiz) {
    const medal = pct >= 80 ? '🥇' : pct >= 60 ? '🥈' : pct >= 40 ? '🥉' : '📚'
    const grade = pct >= 80 ? 'Excellent !' : pct >= 60 ? 'Bien !' : pct >= 40 ? 'Peut mieux faire' : 'À retravailler'
    return (
      <div className="max-w-md mx-auto animate-fade-in">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-6xl mb-4">{medal}</div>
          <h2 className="text-2xl font-display font-bold text-mouride-green mb-2">{grade}</h2>
          <p className="text-gray-500 text-sm mb-6">{score}/{activeQuiz.questions.length} bonnes réponses</p>
          <div className="relative w-28 h-28 mx-auto mb-6">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="8"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#D4B558" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - pct / 100)}`}
                strokeLinecap="round"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-display font-bold text-mouride-green">{pct}%</span>
            </div>
          </div>
          <div className="flex gap-2 justify-center mb-6">
            {activeQuiz.questions.map((q, i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${answers[i] === q.correct ? 'bg-green-500 text-white' : 'bg-red-400 text-white'}`}>
                {i + 1}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => startQuiz(activeQuiz)} className="flex-1 btn-primary py-3 text-sm">🔄 Recommencer</button>
            <button onClick={() => setScreen('list')} className="flex-1 btn-secondary py-3 text-sm">← Tous les quiz</button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
