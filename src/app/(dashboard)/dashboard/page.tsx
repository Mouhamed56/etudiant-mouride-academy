'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { MODULES, COURSES } from '@/data/modules'

export default function DashboardPage() {
  const [userName, setUserName] = useState('Étudiant mouride')

  useEffect(() => {
    async function getUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'Étudiant mouride')
      }
    }
    getUser()
  }, [])

  const stats = [
    { label: 'Modules complétés', value: '0', icon: '✅', color: 'bg-green-50 text-green-700' },
    { label: 'Quiz réussis', value: '0', icon: '🎯', color: 'bg-amber-50 text-amber-700' },
    { label: 'Minutes d\'étude', value: '0', icon: '⏱️', color: 'bg-blue-50 text-blue-700' },
    { label: 'Leçons vues', value: '0', icon: '📖', color: 'bg-purple-50 text-purple-700' },
  ]

  return (
    <div className="max-w-5xl animate-fade-in">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-mouride-green to-mouride-green-dark rounded-2xl p-6 text-white mb-8">
        <h1 className="text-2xl font-display font-bold mb-1">
          Bienvenue, Étudiant mouride 👋 dàl ak Jamm
        </h1>
        <p className="text-green-200">Continuez votre apprentissage de la pensée mouride.</p>
        <div className="mt-4 bg-white/10 rounded-xl p-4 border border-white/20">
          <p className="text-mouride-gold text-sm font-semibold mb-1">Citation du jour</p>
          <p className="text-white italic font-display">
            &ldquo;Ne passez jamais une journée sans apprendre quelque chose de nouveau, car le manque de connaissance tue le cœur.&rdquo;
          </p>
          <p className="text-green-300 text-xs mt-2">— Cheikh Ahmadou Bamba, Nahju</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className={`rounded-2xl p-4 ${s.color} border border-current/10`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-display font-bold">{s.value}</div>
            <div className="text-xs mt-1 opacity-80">{s.label}</div>
          </div>
        ))}
      </div>

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
                <div className="flex gap-4 mt-3 text-xs text-gray-400">
                  <span>📚 {course.modules_count} modules</span>
                  <span>📝 {course.lecons_count} leçons</span>
                  <span>⏱️ {course.duration_min} min</span>
                  <span>✍️ {course.author}</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progression</span>
                    <span>0%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-mouride-gold rounded-full w-0" />
                  </div>
                </div>
                <Link href="/learn" className="btn-gold inline-block mt-4 py-2 px-6 text-sm">
                  Commencer →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modules preview */}
      <div>
        <h2 className="text-xl font-display font-bold text-mouride-green mb-4">Les modules du cours</h2>
        <div className="space-y-3">
          {MODULES.map((mod, i) => (
            <Link key={mod.id} href={`/learn/${mod.id}`}
              className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-mouride-gold hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-mouride-cream rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                {mod.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-mouride-green text-sm truncate">{mod.title_fr}</p>
                <p className="text-gray-400 text-xs">{mod.lecons.length} leçons</p>
              </div>
              <div className="text-gray-300 text-lg">›</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
