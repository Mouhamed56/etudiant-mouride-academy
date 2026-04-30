'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MODULES } from '@/data/modules'
import { QUIZZES } from '@/data/quizzes'

const ADMIN_EMAIL = 'mouhamedsene.office@gmail.com'

interface SupabaseUser {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string
  user_metadata: { full_name?: string; country?: string }
}

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<SupabaseUser[]>([])
  const [stats, setStats] = useState({ total: 0, today: 0, week: 0 })

  useEffect(() => {
    async function init() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user?.email !== ADMIN_EMAIL) {
        setLoading(false)
        return
      }
      
      setIsAdmin(true)

      // Fetch real users from profiles table
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (profiles) {
        setUsers(profiles as any)
        const now = new Date()
        const today = profiles.filter(p => {
          const d = new Date(p.created_at)
          return d.toDateString() === now.toDateString()
        }).length
        const week = profiles.filter(p => {
          const d = new Date(p.created_at)
          return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000
        }).length
        setStats({ total: profiles.length, today, week })
      }

      setLoading(false)
    }
    init()
  }, [])

  const totalLecons = MODULES.reduce((t, m) => t + m.lecons.length, 0)
  const totalQuestions = QUIZZES.reduce((t, q) => t + q.questions.length, 0)

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="w-8 h-8 border-4 border-mouride-gold border-t-transparent rounded-full animate-spin"/>
    </div>
  )

  if (!isAdmin) return (
    <div className="flex h-64 flex-col items-center justify-center gap-4">
      <div className="text-5xl">🔒</div>
      <h2 className="text-xl font-display font-bold text-mouride-green">Accès réservé</h2>
      <p className="text-gray-500 text-sm">Cette page est réservée aux administrateurs.</p>
    </div>
  )

  return (
    <div className="max-w-6xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-mouride-green">Dashboard Administrateur</h1>
        <p className="text-gray-500 text-sm mt-1">Vue globale de la plateforme Étudiant Mouride Academy</p>
      </div>

      {/* Global stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Utilisateurs total', value: stats.total, icon: '👥', color: 'bg-blue-50 text-blue-700' },
          { label: "Inscrits aujourd'hui", value: stats.today, icon: '🆕', color: 'bg-green-50 text-green-700' },
          { label: 'Cette semaine', value: stats.week, icon: '📅', color: 'bg-amber-50 text-amber-700' },
          { label: 'Questions quiz', value: totalQuestions, icon: '🎯', color: 'bg-purple-50 text-purple-700' },
        ].map((s, i) => (
          <div key={i} className={`rounded-2xl p-5 ${s.color}`}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-3xl font-display font-bold">{s.value}</div>
            <div className="text-xs mt-1 opacity-80">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Content stats */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-display font-bold text-mouride-green mb-4">Contenu de la plateforme</h2>
          <div className="space-y-3">
            {MODULES.map(mod => (
              <div key={mod.id} className="flex items-center gap-3 p-3 bg-mouride-cream rounded-xl">
                <span className="text-xl">{mod.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-mouride-green truncate">{mod.title_fr}</p>
                  <p className="text-xs text-gray-400">{mod.lecons.length} leçons</p>
                </div>
                <span className="text-xs text-mouride-gold font-semibold">Module {mod.order}</span>
              </div>
            ))}
            <div className="mt-3 p-3 bg-mouride-green rounded-xl text-white text-sm flex justify-between">
              <span>Total leçons</span>
              <span className="font-bold">{totalLecons}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-display font-bold text-mouride-green mb-4">Statistiques quiz</h2>
          <div className="space-y-3">
            {QUIZZES.map(quiz => (
              <div key={quiz.id} className="flex items-center justify-between p-3 bg-mouride-cream rounded-xl">
                <p className="text-sm font-medium text-mouride-green truncate flex-1">{quiz.title_fr}</p>
                <span className="text-xs text-mouride-gold font-bold ml-2">{quiz.questions.length} Q</span>
              </div>
            ))}
            <div className="mt-3 p-3 bg-mouride-gold rounded-xl text-mouride-green text-sm flex justify-between">
              <span>Total questions</span>
              <span className="font-bold">{totalQuestions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real users table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-display font-bold text-mouride-green">
            Utilisateurs réels ({stats.total})
          </h2>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
            Données Supabase live
          </span>
        </div>
        {users.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            Aucun utilisateur pour le moment
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-mouride-cream">
                <tr>
                  {['Utilisateur', 'Email', 'Pays', 'Inscription', 'Dernière connexion'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-mouride-green uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u: any) => {
                  const name = u.full_name || u.email?.split('@')[0] || 'Étudiant'
                  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                  return (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-mouride-green rounded-full flex items-center justify-center text-mouride-gold text-xs font-bold">
                            {initials}
                          </div>
                          <span className="font-medium text-gray-800">{name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{u.email || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{u.country || '—'}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {new Date(u.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {u.updated_at ? new Date(u.updated_at).toLocaleDateString('fr-FR') : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}