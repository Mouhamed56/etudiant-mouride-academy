'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { MODULES, COURSES } from '@/data/modules'
import { QUIZZES } from '@/data/quizzes'

export default function DashboardPage() {
  const [userName, setUserName] = useState('Étudiant mouride')
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [quizScores, setQuizScores] = useState<Record<string, number>>({})

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const name = user.user_metadata?.full_name || 
                     `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim() ||
                     user.email?.split('@')[0] || 'Étudiant mouride'
        setUserName(name)

        // Load progress from localStorage
        const savedProgress = localStorage.getItem(`ema-progress-${user.id}`)
        if (savedProgress) setProgress(JSON.parse(savedProgress))
        
        const savedScores = localStorage.getItem(`ema-scores-${user.id}`)
        if (savedScores) setQuizScores(JSON.parse(savedScores))
      }
    }
    load()
  }, [])

  const totalLecons = MODULES.reduce((t, m) => t + m.lecons.length, 0)
  const completedLecons = Object.values(progress).filter(Boolean).length
  const completedQuizzes = Object.keys(quizScores).length
  const progressPct = totalLecons > 0 ? Math.round((completedLecons / totalLecons) * 100) : 0

  const quotes = [
    { fr: "Ne passez jamais une journée sans apprendre quelque chose de nouveau, car le manque de connaissance tue le cœur.", src: "Cheikh Ahmadou Bamba, Nahju" },
    { fr: "Ô vous les adolescents ! ne vous préoccupez que de droiture, évertuez-vous à la recherche du savoir.", src: "Tazawudu Sighaar" },
    { fr: "Essaie toujours de te cacher toi qui est à la quête du savoir. Aie de la détermination ainsi tu dépasseras ta génération.", src: "Kun Katiman" },
  ]
  const todayQuote = quotes[new Date().getDay() % quotes.length]

  return (
    <div className="max-w-5xl animate-fade-in">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-mouride-green to-mouride-green-dark rounded-2xl p-6 text-white mb-8">
        <h1 className="text-2xl font-display font-bold mb-1">
          Bienvenue, Étudiant mouride 👋 dàl ak Jamm
        </h1>
        <p className="text-green-200 text-sm">Continuez votre apprentissage de la pensée mouride.</p>
        <div className="mt-4 bg-white/10 rounded-xl p-4 border border-white/20">
          <p className="text-mouride-gold text-xs font-semibold mb-1">Citation du jour</p>
          <p className="text-white italic font-display text-sm leading-relaxed">&ldquo;{todayQuote.fr}&rdquo;</p>
          <p className="text-green-300 text-xs mt-2">— {todayQuote.src}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Leçons complétées', value: `${completedLecons}/${totalLecons}`, icon: '✅', color: 'bg-green-50 text-green-700' },
          { label: 'Quiz réussis', value: `${completedQuizzes}/${QUIZZES.length}`, icon: '🎯', color: 'bg-amber-50 text-amber-700' },
          { label: 'Progression', value: `${progressPct}%`, icon: '📊', color: 'bg-blue-50 text-blue-700' },
          { label: 'Modules', value: `${MODULES.length}`, icon: '📚', color: 'bg-purple-50 text-purple-700' },
        ].map((s, i) => (
          <div key={i} className={`rounded-2xl p-4 ${s.color}`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-display font-bold">{s.value}</div>
            <div className="text-xs mt-1 opacity-80">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      {progressPct > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-mouride-green">Progression globale</span>
            <span className="text-mouride-gold font-bold">{progressPct}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-mouride-gold to-mouride-gold-light rounded-full transition-all duration-1000"
              style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      )}

      {/* Course */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-mouride-green">Mon parcours</h2>
          <Link href="/learn" className="text-mouride-gold text-sm font-semibold hover:underline">Voir tout →</Link>
        </div>
        {COURSES.map(course => (
          <div key={course.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{course.icon}</div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-mouride-green text-lg">{course.title_fr}</h3>
                <p className="text-gray-500 text-sm mt-1">{course.description_fr}</p>
                <div className="flex gap-4 mt-2 text-xs text-gray-400">
                  <span>📚 {course.modules_count} modules</span>
                  <span>📝 {course.lecons_count} leçons</span>
                  <span>⏱️ {course.duration_min} min</span>
                  <span>✍️ {course.author}</span>
                </div>
                <Link href="/learn" className="btn-gold inline-block mt-4 py-2 px-6 text-sm">
                  {completedLecons > 0 ? 'Continuer →' : 'Commencer →'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modules list */}
      <div>
        <h2 className="text-xl font-display font-bold text-mouride-green mb-4">Les modules</h2>
        <div className="space-y-3">
          {MODULES.map(mod => {
            const modCompleted = mod.lecons.every(l => progress[l.id])
            const modProgress = mod.lecons.filter(l => progress[l.id]).length
            return (
              <Link key={mod.id} href={`/learn/${mod.id}`}
                className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-mouride-gold hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-mouride-cream rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-mouride-green text-sm truncate">{mod.title_fr}</p>
                  <p className="text-gray-400 text-xs">{modProgress}/{mod.lecons.length} leçons</p>
                </div>
                {modCompleted && <span className="text-green-500 text-lg">✅</span>}
                <div className="text-gray-300 text-lg">›</div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}