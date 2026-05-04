'use client'
import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MODULES } from '@/data/modules'
import { QUIZZES } from '@/data/quizzes'

const ADMIN_EMAIL = 'mouhamedsene.office@gmail.com'

type Profile = {
  id: string
  created_at: string
  updated_at?: string
  full_name?: string
  email?: string
  country?: string
}

type Tab = 'stats' | 'users' | 'content' | 'announcements' | 'quiz_editor'

type Announcement = {
  id: string
  title: string
  message: string
  active: boolean
  created_at: string
}

type QuizQuestion = {
  id: string
  question_fr: string
  question_en: string
  options_fr: string[]
  options_en: string[]
  correct: number
  explanation_fr: string
  explanation_en: string
}

type QuizData = {
  id: string
  module_id: string
  title_fr: string
  title_en: string
  questions: QuizQuestion[]
}

type ModuleLecon = {
  id: string
  title_fr: string
  title_en: string
  content_fr: string
  content_en: string
  duration_min: number
}

type ModuleData = {
  id: string
  icon: string
  title_fr: string
  title_en: string
  description_fr: string
  order: number
  lecons: ModuleLecon[]
}

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('stats')
  const [users, setUsers] = useState<Profile[]>([])
  const [stats, setStats] = useState({ total:0, today:0, week:0 })
  const [search, setSearch] = useState('')
  const [savedMsg, setSavedMsg] = useState('')
  const [saving, setSaving] = useState(false)

  // Data states
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [newAnn, setNewAnn] = useState({ title:'', message:'' })
  const [modules, setModules] = useState<ModuleData[]>(MODULES as any)
  const [quizzes, setQuizzes] = useState<QuizData[]>(QUIZZES as any)

  // Edit states
  const [editingModule, setEditingModule] = useState<string | null>(null)
  const [editingLecon, setEditingLecon] = useState<string | null>(null)
  const [editModuleData, setEditModuleData] = useState<Partial<ModuleData>>({})
  const [editLeconData, setEditLeconData] = useState<Partial<ModuleLecon>>({})
  const [addingLecon, setAddingLecon] = useState<string | null>(null)
  const [newLecon, setNewLecon] = useState({ title_fr:'', title_en:'', content_fr:'', content_en:'', duration_min:10 })
  const [editingQuiz, setEditingQuiz] = useState<string | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null)
  const [editQData, setEditQData] = useState<Partial<QuizQuestion>>({})
  const [addingQuestion, setAddingQuestion] = useState<string | null>(null)
  const [newQuestion, setNewQuestion] = useState<Partial<QuizQuestion>>({
    question_fr:'', question_en:'',
    options_fr:['','','',''], options_en:['','','',''],
    correct:0, explanation_fr:'', explanation_en:''
  })

  function showSaved(msg = '✅ Sauvegardé dans Supabase !') {
    setSavedMsg(msg)
    setTimeout(() => setSavedMsg(''), 3000)
  }

  const supabase = createClient()

  // Load data from Supabase
  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email !== ADMIN_EMAIL) { setLoading(false); return }
      setIsAdmin(true)

      // Load users
      const { data: profiles } = await supabase
        .from('profiles').select('*')
        .order('created_at', { ascending: false }) as { data: Profile[] | null }

      if (profiles) {
        setUsers(profiles)
        const now = new Date()
        const today = profiles.filter((p: Profile) => new Date(p.created_at).toDateString() === now.toDateString()).length
        const week = profiles.filter((p: Profile) => (now.getTime() - new Date(p.created_at).getTime()) < 7*24*60*60*1000).length
        setStats({ total: profiles.length, today, week })
      }

      // Load announcements from Supabase
      const { data: anns } = await supabase
        .from('announcements').select('*')
        .order('created_at', { ascending: false })
      if (anns) setAnnouncements(anns)

      // Load modules from Supabase — remplace complètement les données locales
      const { data: customMods } = await supabase
        .from('custom_modules').select('*').order('updated_at', { ascending: false })
      if (customMods && customMods.length > 0) {
        // Construire map depuis Supabase
        const modMap: Record<string, ModuleData> = {}
        customMods.forEach(cm => { modMap[cm.id] = cm.data as ModuleData })
        // Fusionner : priorité Supabase sur local, garder nouveaux modules Supabase
        const localIds = (MODULES as any).map((m: ModuleData) => m.id)
        const supabaseOnlyIds = Object.keys(modMap).filter(id => !localIds.includes(id))
        const merged = [
          ...(MODULES as any).map((m: ModuleData) => modMap[m.id] ? modMap[m.id] : m),
          ...supabaseOnlyIds.map(id => modMap[id])
        ]
        setModules(merged)
      }

      // Load quizzes from Supabase — remplace complètement les données locales
      const { data: customQuizzes } = await supabase
        .from('custom_quizzes').select('*').order('updated_at', { ascending: false })
      if (customQuizzes && customQuizzes.length > 0) {
        const quizMap: Record<string, QuizData> = {}
        customQuizzes.forEach(cq => { quizMap[cq.id] = cq.data as QuizData })
        const localQIds = (QUIZZES as any).map((q: QuizData) => q.id)
        const supabaseOnlyQIds = Object.keys(quizMap).filter(id => !localQIds.includes(id))
        const mergedQ = [
          ...(QUIZZES as any).map((q: QuizData) => quizMap[q.id] ? quizMap[q.id] : q),
          ...supabaseOnlyQIds.map(id => quizMap[id])
        ]
        setQuizzes(mergedQ)
      }

      setLoading(false)
    }
    init()
  }, [])

  // ── MODULE FUNCTIONS ──
  function startEditModule(mod: ModuleData) {
    setEditingModule(mod.id)
    setEditModuleData({ title_fr: mod.title_fr, title_en: mod.title_en, description_fr: mod.description_fr, icon: mod.icon })
  }

  async function saveModule(id: string) {
    setSaving(true)
    const updated = modules.map(m => m.id === id ? { ...m, ...editModuleData } : m)
    setModules(updated)
    const mod = updated.find(m => m.id === id)
    // Save to Supabase
    await supabase.from('custom_modules').upsert({ id, data: mod, updated_at: new Date().toISOString() })
    setEditingModule(null)
    setSaving(false)
    showSaved()
  }

  async function deleteModule(id: string) {
    if (!confirm('Supprimer ce module ?')) return
    const updated = modules.filter(m => m.id !== id)
    setModules(updated)
    await supabase.from('custom_modules').delete().eq('id', id)
    showSaved('🗑️ Module supprimé')
  }

  // ── LECON FUNCTIONS ──
  function startEditLecon(lecon: ModuleLecon) {
    setEditingLecon(lecon.id)
    setEditLeconData({ title_fr: lecon.title_fr, title_en: lecon.title_en, content_fr: lecon.content_fr, content_en: lecon.content_en, duration_min: lecon.duration_min })
  }

  async function saveLecon(modId: string, leconId: string) {
    setSaving(true)
    const updated = modules.map(m => m.id === modId ? {
      ...m, lecons: m.lecons.map(l => l.id === leconId ? { ...l, ...editLeconData } : l)
    } : m)
    setModules(updated)
    const mod = updated.find(m => m.id === modId)
    await supabase.from('custom_modules').upsert({ id: modId, data: mod, updated_at: new Date().toISOString() })
    setEditingLecon(null)
    setSaving(false)
    showSaved()
  }

  async function deleteLecon(modId: string, leconId: string) {
    if (!confirm('Supprimer cette leçon ?')) return
    const updated = modules.map(m => m.id === modId ? {
      ...m, lecons: m.lecons.filter(l => l.id !== leconId)
    } : m)
    setModules(updated)
    const mod = updated.find(m => m.id === modId)
    await supabase.from('custom_modules').upsert({ id: modId, data: mod, updated_at: new Date().toISOString() })
    showSaved('🗑️ Leçon supprimée')
  }

  async function saveNewLecon(modId: string) {
    if (!newLecon.title_fr) return
    setSaving(true)
    const lecon: ModuleLecon = { id: `lecon-${Date.now()}`, ...newLecon }
    const updated = modules.map(m => m.id === modId ? { ...m, lecons: [...m.lecons, lecon] } : m)
    setModules(updated)
    const mod = updated.find(m => m.id === modId)
    await supabase.from('custom_modules').upsert({ id: modId, data: mod, updated_at: new Date().toISOString() })
    setNewLecon({ title_fr:'', title_en:'', content_fr:'', content_en:'', duration_min:10 })
    setAddingLecon(null)
    setSaving(false)
    showSaved('✅ Leçon ajoutée et sauvegardée !')
  }

  // ── QUIZ FUNCTIONS ──
  function startEditQuestion(q: QuizQuestion) {
    setEditingQuestion(q.id)
    setEditQData({ ...q })
  }

  async function saveQuestion(quizId: string, qId: string) {
    setSaving(true)
    const updated = quizzes.map(quiz => quiz.id === quizId ? {
      ...quiz, questions: quiz.questions.map(q => q.id === qId ? { ...q, ...editQData } as QuizQuestion : q)
    } : quiz)
    setQuizzes(updated)
    const quiz = updated.find(q => q.id === quizId)
    await supabase.from('custom_quizzes').upsert({ id: quizId, data: quiz, updated_at: new Date().toISOString() })
    setEditingQuestion(null)
    setSaving(false)
    showSaved()
  }

  async function deleteQuestion(quizId: string, qId: string) {
    if (!confirm('Supprimer cette question ?')) return
    const updated = quizzes.map(quiz => quiz.id === quizId ? {
      ...quiz, questions: quiz.questions.filter(q => q.id !== qId)
    } : quiz)
    setQuizzes(updated)
    const quiz = updated.find(q => q.id === quizId)
    await supabase.from('custom_quizzes').upsert({ id: quizId, data: quiz, updated_at: new Date().toISOString() })
    showSaved('🗑️ Question supprimée')
  }

  async function saveNewQuestion(quizId: string) {
    if (!newQuestion.question_fr) return
    setSaving(true)
    const q: QuizQuestion = {
      id: `q-${Date.now()}`,
      question_fr: newQuestion.question_fr || '',
      question_en: newQuestion.question_en || '',
      options_fr: newQuestion.options_fr || ['','','',''],
      options_en: newQuestion.options_en || ['','','',''],
      correct: newQuestion.correct || 0,
      explanation_fr: newQuestion.explanation_fr || '',
      explanation_en: newQuestion.explanation_en || '',
    }
    const updated = quizzes.map(quiz => quiz.id === quizId ? {
      ...quiz, questions: [...quiz.questions, q]
    } : quiz)
    setQuizzes(updated)
    const quiz = updated.find(qz => qz.id === quizId)
    await supabase.from('custom_quizzes').upsert({ id: quizId, data: quiz, updated_at: new Date().toISOString() })
    setNewQuestion({ question_fr:'', question_en:'', options_fr:['','','',''], options_en:['','','',''], correct:0, explanation_fr:'', explanation_en:'' })
    setAddingQuestion(null)
    setSaving(false)
    showSaved('✅ Question ajoutée et sauvegardée !')
  }

  // ── ANNOUNCEMENT FUNCTIONS ──
  async function addAnnouncement() {
    if (!newAnn.title || !newAnn.message) return
    setSaving(true)
    const { data, error } = await supabase.from('announcements')
      .insert({ title: newAnn.title, message: newAnn.message, active: true })
      .select().single()
    if (data) setAnnouncements([data, ...announcements])
    setNewAnn({ title:'', message:'' })
    setSaving(false)
    showSaved('✅ Annonce publiée !')
  }

  async function toggleAnnouncement(id: string, active: boolean) {
    await supabase.from('announcements').update({ active: !active }).eq('id', id)
    setAnnouncements(announcements.map(a => a.id === id ? {...a, active: !active} : a))
  }

  async function deleteAnnouncement(id: string) {
    if (!confirm('Supprimer cette annonce ?')) return
    await supabase.from('announcements').delete().eq('id', id)
    setAnnouncements(announcements.filter(a => a.id !== id))
    showSaved('🗑️ Annonce supprimée')
  }

  const totalLecons = modules.reduce((t, m) => t + m.lecons.length, 0)
  const totalQuestions = quizzes.reduce((t, q) => t + q.questions.length, 0)
  const filteredUsers = users.filter(u => (u.full_name || u.email || '').toLowerCase().includes(search.toLowerCase()))

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

  const TABS = [
    { id:'stats', label:'📊 Statistiques' },
    { id:'users', label:'👥 Utilisateurs' },
    { id:'content', label:'📚 Contenu' },
    { id:'announcements', label:'📣 Annonces' },
    { id:'quiz_editor', label:'🎯 Quiz' },
  ]

  return (
    <div className="max-w-6xl animate-fade-in">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold text-mouride-green">Dashboard Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Toutes les modifications sont sauvegardées dans Supabase</p>
        </div>
        <div className="flex items-center gap-3">
          {saving && <span className="text-xs text-mouride-gold animate-pulse">💾 Sauvegarde en cours...</span>}
          {savedMsg && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">
              {savedMsg}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-8 border-b border-gray-100 pb-4">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id as Tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? 'bg-mouride-green text-white' : 'bg-white text-gray-600 hover:bg-mouride-cream border border-gray-100'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* STATS */}
      {tab === 'stats' && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label:'Utilisateurs', value:stats.total, icon:'👥', color:'bg-blue-50 text-blue-700' },
              { label:"Aujourd'hui", value:stats.today, icon:'🆕', color:'bg-green-50 text-green-700' },
              { label:'Cette semaine', value:stats.week, icon:'📅', color:'bg-amber-50 text-amber-700' },
              { label:'Questions quiz', value:totalQuestions, icon:'🎯', color:'bg-purple-50 text-purple-700' },
            ].map((s,i) => (
              <div key={i} className={`rounded-2xl p-5 ${s.color}`}>
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-3xl font-display font-bold">{s.value}</div>
                <div className="text-xs mt-1 opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-display font-bold text-mouride-green mb-4">📚 Modules</h3>
              <div className="space-y-2">
                {modules.map(mod => (
                  <div key={mod.id} className="flex items-center gap-3 p-3 bg-mouride-cream rounded-xl">
                    <span>{mod.icon}</span>
                    <div className="flex-1"><p className="text-sm font-medium text-mouride-green">{mod.title_fr}</p></div>
                    <span className="text-xs text-mouride-gold font-bold">{mod.lecons.length} leçons</span>
                  </div>
                ))}
                <div className="p-3 bg-mouride-green rounded-xl text-white text-sm flex justify-between">
                  <span>Total leçons</span><span className="font-bold">{totalLecons}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-display font-bold text-mouride-green mb-4">🎯 Quiz</h3>
              <div className="space-y-2">
                {quizzes.map(quiz => (
                  <div key={quiz.id} className="flex items-center justify-between p-3 bg-mouride-cream rounded-xl">
                    <p className="text-sm font-medium text-mouride-green flex-1 truncate">{quiz.title_fr}</p>
                    <span className="text-xs text-mouride-gold font-bold ml-2">{quiz.questions.length} Q</span>
                  </div>
                ))}
                <div className="p-3 bg-mouride-gold rounded-xl text-mouride-green text-sm flex justify-between">
                  <span>Total questions</span><span className="font-bold">{totalQuestions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* USERS */}
      {tab === 'users' && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..." className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-mouride-green"/>
            <span className="text-sm text-gray-400">{filteredUsers.length} utilisateur(s)</span>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-display font-bold text-mouride-green">Utilisateurs ({stats.total})</h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Supabase live</span>
            </div>
            {filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-400">Aucun utilisateur trouvé</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-mouride-cream">
                    <tr>{['Utilisateur','Email','Pays','Inscription','Activité'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-mouride-green uppercase">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredUsers.map((u: Profile) => {
                      const name = u.full_name || u.email?.split('@')[0] || 'Étudiant'
                      const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0,2)
                      return (
                        <tr key={u.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-mouride-green rounded-full flex items-center justify-center text-mouride-gold text-xs font-bold">{initials}</div>
                              <span className="font-medium">{name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{u.email || '—'}</td>
                          <td className="px-4 py-3 text-gray-600">{u.country || '—'}</td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{new Date(u.created_at).toLocaleDateString('fr-FR')}</td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{u.updated_at ? new Date(u.updated_at).toLocaleDateString('fr-FR') : '—'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONTENT */}
      {tab === 'content' && (
        <div className="animate-fade-in space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-mouride-green">📚 Modules ({totalLecons} leçons)</h3>
            <button onClick={async () => {
              const newMod: ModuleData = { id:`mod-${Date.now()}`, icon:'📖', order:modules.length+1, title_fr:'Nouveau Module', title_en:'New Module', description_fr:'Description', lecons:[] }
              const updated = [...modules, newMod]
              setModules(updated)
              await supabase.from('custom_modules').upsert({ id:newMod.id, data:newMod, updated_at:new Date().toISOString() })
              showSaved('✅ Module créé !')
            }} className="text-sm bg-mouride-gold text-mouride-green px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition">
              + Nouveau module
            </button>
          </div>

          {modules.map(mod => (
            <div key={mod.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {editingModule === mod.id ? (
                <div className="p-4 bg-mouride-cream space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label:'Icône', key:'icon', ph:'Emoji' },
                      { label:'Titre FR', key:'title_fr', ph:'Titre en français' },
                      { label:'Titre EN', key:'title_en', ph:'Title in English' },
                      { label:'Description FR', key:'description_fr', ph:'Description...' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">{f.label}</label>
                        <input value={(editModuleData as any)[f.key] || ''} onChange={e => setEditModuleData({...editModuleData, [f.key]:e.target.value})}
                          placeholder={f.ph} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-mouride-green"/>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => saveModule(mod.id)} disabled={saving}
                      className="bg-mouride-green text-white px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-50">
                      {saving ? '💾 Sauvegarde...' : '✅ Sauvegarder'}
                    </button>
                    <button onClick={() => setEditingModule(null)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm">Annuler</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-mouride-cream">
                  <span className="text-xl">{mod.icon}</span>
                  <div className="flex-1 cursor-pointer" onClick={() => setEditingModule(editingModule === `view-${mod.id}` ? null : `view-${mod.id}`)}>
                    <p className="font-semibold text-mouride-green">{mod.title_fr}</p>
                    <p className="text-xs text-gray-400">{mod.lecons.length} leçons</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEditModule(mod)} className="text-xs bg-white border border-gray-200 text-mouride-green px-3 py-1.5 rounded-lg hover:bg-mouride-cream transition">✏️ Modifier</button>
                    <button onClick={() => deleteModule(mod.id)} className="text-xs bg-red-50 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-100 transition">🗑️</button>
                    <button onClick={() => setEditingModule(editingModule === `view-${mod.id}` ? null : `view-${mod.id}`)} className="text-gray-400 text-lg">
                      {editingModule === `view-${mod.id}` ? '▲' : '▼'}
                    </button>
                  </div>
                </div>
              )}

              {editingModule === `view-${mod.id}` && (
                <div className="p-4">
                  <div className="space-y-1 mb-3">
                    {mod.lecons.map((lecon, i) => (
                      <div key={lecon.id}>
                        {editingLecon === lecon.id ? (
                          <div className="border border-mouride-gold rounded-xl p-4 space-y-3 bg-mouride-cream/50 my-2">
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { label:'Titre FR', key:'title_fr' },
                                { label:'Titre EN', key:'title_en' },
                              ].map(f => (
                                <div key={f.key}>
                                  <label className="text-xs font-semibold text-gray-600 mb-1 block">{f.label}</label>
                                  <input value={(editLeconData as any)[f.key] || ''} onChange={e => setEditLeconData({...editLeconData, [f.key]:e.target.value})}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-mouride-green"/>
                                </div>
                              ))}
                              <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Durée (min)</label>
                                <input type="number" value={editLeconData.duration_min || 10} onChange={e => setEditLeconData({...editLeconData, duration_min:parseInt(e.target.value)})}
                                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-mouride-green"/>
                              </div>
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-600 mb-1 block">Contenu FR</label>
                              <textarea rows={5} value={editLeconData.content_fr || ''} onChange={e => setEditLeconData({...editLeconData, content_fr:e.target.value})}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-mouride-green resize-none"/>
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-600 mb-1 block">Contenu EN</label>
                              <textarea rows={5} value={editLeconData.content_en || ''} onChange={e => setEditLeconData({...editLeconData, content_en:e.target.value})}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-mouride-green resize-none"/>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => saveLecon(mod.id, lecon.id)} disabled={saving}
                                className="bg-mouride-green text-white px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-50">
                                {saving ? '💾...' : '✅ Sauvegarder'}
                              </button>
                              <button onClick={() => setEditingLecon(null)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm">Annuler</button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 py-2 px-3 hover:bg-gray-50 rounded-xl group">
                            <span className="text-xs text-gray-400 w-5 font-bold">{i+1}</span>
                            <div className="flex-1">
                              <p className="text-sm text-gray-800 font-medium">{lecon.title_fr}</p>
                              <p className="text-xs text-gray-400">{lecon.duration_min} min</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => startEditLecon(lecon)} className="text-xs bg-mouride-cream text-mouride-green px-2 py-1 rounded-lg">✏️</button>
                              <button onClick={() => deleteLecon(mod.id, lecon.id)} className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-lg">🗑️</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {addingLecon === mod.id ? (
                    <div className="border border-dashed border-mouride-gold rounded-xl p-4 space-y-3">
                      <p className="text-sm font-bold text-mouride-green">➕ Nouvelle leçon</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Titre FR *</label>
                          <input value={newLecon.title_fr} onChange={e => setNewLecon({...newLecon, title_fr:e.target.value})}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-mouride-green" placeholder="Titre en français"/>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Titre EN</label>
                          <input value={newLecon.title_en} onChange={e => setNewLecon({...newLecon, title_en:e.target.value})}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-mouride-green" placeholder="Title in English"/>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Durée (min)</label>
                          <input type="number" value={newLecon.duration_min} onChange={e => setNewLecon({...newLecon, duration_min:parseInt(e.target.value)})}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"/>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Contenu FR</label>
                        <textarea rows={4} value={newLecon.content_fr} onChange={e => setNewLecon({...newLecon, content_fr:e.target.value})}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-mouride-green resize-none" placeholder="Contenu de la leçon..."/>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Contenu EN</label>
                        <textarea rows={4} value={newLecon.content_en} onChange={e => setNewLecon({...newLecon, content_en:e.target.value})}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-mouride-green resize-none" placeholder="Lesson content..."/>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => saveNewLecon(mod.id)} disabled={saving}
                          className="bg-mouride-green text-white px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-50">
                          {saving ? '💾...' : '✅ Ajouter'}
                        </button>
                        <button onClick={() => setAddingLecon(null)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm">Annuler</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setAddingLecon(mod.id)}
                      className="w-full py-2 border-2 border-dashed border-mouride-gold text-mouride-gold rounded-xl text-sm font-semibold hover:bg-mouride-gold/5 transition-colors">
                      + Ajouter une leçon
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ANNOUNCEMENTS */}
      {tab === 'announcements' && (
        <div className="animate-fade-in space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-display font-bold text-mouride-green mb-4">📣 Nouvelle Annonce</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Titre</label>
                <input value={newAnn.title} onChange={e => setNewAnn({...newAnn, title:e.target.value})}
                  placeholder="Titre de l'annonce..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-mouride-green"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Message</label>
                <textarea value={newAnn.message} onChange={e => setNewAnn({...newAnn, message:e.target.value})}
                  placeholder="Contenu de l'annonce..." rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-mouride-green resize-none"/>
              </div>
              <button onClick={addAnnouncement} disabled={saving}
                className="bg-mouride-green text-white px-6 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50">
                {saving ? '💾 Sauvegarde...' : '📣 Publier dans Supabase'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-display font-bold text-mouride-green mb-4">
              Annonces ({announcements.length}) — {announcements.filter(a=>a.active).length} actives
            </h3>
            {announcements.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">Aucune annonce pour le moment</p>
            ) : (
              <div className="space-y-3">
                {announcements.map(ann => (
                  <div key={ann.id} className={`rounded-xl p-4 border-2 transition-all ${ann.active ? 'border-mouride-gold bg-mouride-cream' : 'border-gray-100 bg-gray-50 opacity-60'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-mouride-green">{ann.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{ann.message}</p>
                        <p className="text-xs text-gray-400 mt-2">📅 {new Date(ann.created_at).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => toggleAnnouncement(ann.id, ann.active)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${ann.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {ann.active ? '✅ Actif' : '⏸️ Inactif'}
                        </button>
                        <button onClick={() => deleteAnnouncement(ann.id)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUIZ EDITOR */}
      {tab === 'quiz_editor' && (
        <div className="animate-fade-in space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
            <strong>🎯 Quiz Editor</strong> — Toutes les modifications sont sauvegardées dans Supabase automatiquement.
          </div>

          {quizzes.map(quiz => {
            const mod = modules.find(m => m.id === quiz.module_id)
            return (
              <div key={quiz.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 bg-mouride-cream flex items-center justify-between cursor-pointer"
                  onClick={() => setEditingQuiz(editingQuiz === quiz.id ? null : quiz.id)}>
                  <div>
                    <p className="font-display font-bold text-mouride-green">{quiz.title_fr}</p>
                    <p className="text-xs text-gray-400">{quiz.questions.length} questions · {mod?.icon} {mod?.title_fr}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-xs bg-mouride-green text-white px-2 py-1 rounded-full">{quiz.questions.length} Q</span>
                    <span className="text-gray-400">{editingQuiz === quiz.id ? '▲' : '▼'}</span>
                  </div>
                </div>

                {editingQuiz === quiz.id && (
                  <div className="p-4 space-y-3">
                    {quiz.questions.map((q, i) => (
                      <div key={q.id} className="border border-gray-100 rounded-xl overflow-hidden">
                        {editingQuestion === q.id ? (
                          <div className="p-4 space-y-3 bg-mouride-cream/50">
                            <p className="text-sm font-bold text-mouride-green">Modifier Q{i+1}</p>
                            {[
                              { label:'Question FR', key:'question_fr', rows:2 },
                              { label:'Question EN', key:'question_en', rows:2 },
                              { label:'Explication FR', key:'explanation_fr', rows:2 },
                            ].map(f => (
                              <div key={f.key}>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">{f.label}</label>
                                <textarea rows={f.rows} value={(editQData as any)[f.key] || ''} onChange={e => setEditQData({...editQData, [f.key]:e.target.value})}
                                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-mouride-green resize-none"/>
                              </div>
                            ))}
                            <div>
                              <label className="text-xs font-semibold text-gray-600 mb-1 block">Options FR (cliquez "Correct" pour la bonne réponse)</label>
                              {(editQData.options_fr || []).map((opt, j) => (
                                <div key={j} className="flex items-center gap-2 mb-2">
                                  <span className={`text-xs font-bold w-6 ${j === editQData.correct ? 'text-green-600' : 'text-gray-400'}`}>{['A','B','C','D'][j]}</span>
                                  <input value={opt} onChange={e => { const opts = [...(editQData.options_fr||[])]; opts[j]=e.target.value; setEditQData({...editQData, options_fr:opts}) }}
                                    className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-mouride-green"/>
                                  <button onClick={() => setEditQData({...editQData, correct:j})}
                                    className={`text-xs px-2 py-1 rounded-lg transition ${j===editQData.correct ? 'bg-green-100 text-green-700 font-bold' : 'bg-gray-100 text-gray-500'}`}>
                                    {j===editQData.correct ? '✅' : 'Correct ?'}
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => saveQuestion(quiz.id, q.id)} disabled={saving}
                                className="bg-mouride-green text-white px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-50">
                                {saving ? '💾...' : '✅ Sauvegarder'}
                              </button>
                              <button onClick={() => setEditingQuestion(null)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm">Annuler</button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-3 p-3 group hover:bg-gray-50">
                            <span className="text-xs text-mouride-gold font-bold mt-1 w-6 flex-shrink-0">Q{i+1}</span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800 mb-2">{q.question_fr}</p>
                              <div className="grid grid-cols-2 gap-1">
                                {q.options_fr.map((opt, j) => (
                                  <div key={j} className={`text-xs px-2 py-1 rounded-lg ${j===q.correct ? 'bg-green-100 text-green-700 font-semibold' : 'bg-gray-50 text-gray-500'}`}>
                                    {['A','B','C','D'][j]}. {opt}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => startEditQuestion(q)} className="text-xs bg-mouride-cream text-mouride-green px-2 py-1 rounded-lg">✏️</button>
                              <button onClick={() => deleteQuestion(quiz.id, q.id)} className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-lg">🗑️</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {addingQuestion === quiz.id ? (
                      <div className="border border-dashed border-mouride-gold rounded-xl p-4 space-y-3">
                        <p className="text-sm font-bold text-mouride-green">➕ Nouvelle question</p>
                        {[
                          { label:'Question FR *', key:'question_fr', rows:2, ph:'Question en français...' },
                          { label:'Question EN', key:'question_en', rows:2, ph:'Question in English...' },
                          { label:'Explication FR', key:'explanation_fr', rows:2, ph:'Explication de la bonne réponse...' },
                        ].map(f => (
                          <div key={f.key}>
                            <label className="text-xs font-semibold text-gray-600 mb-1 block">{f.label}</label>
                            <textarea rows={f.rows} value={(newQuestion as any)[f.key] || ''} onChange={e => setNewQuestion({...newQuestion, [f.key]:e.target.value})}
                              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-mouride-green resize-none" placeholder={f.ph}/>
                          </div>
                        ))}
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Options FR</label>
                          {(newQuestion.options_fr || []).map((opt, j) => (
                            <div key={j} className="flex items-center gap-2 mb-2">
                              <span className={`text-xs font-bold w-6 ${j===newQuestion.correct ? 'text-green-600' : 'text-gray-400'}`}>{['A','B','C','D'][j]}</span>
                              <input value={opt} onChange={e => { const opts=[...(newQuestion.options_fr||['','','',''])]; opts[j]=e.target.value; setNewQuestion({...newQuestion, options_fr:opts}) }}
                                className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-mouride-green" placeholder={`Option ${['A','B','C','D'][j]}`}/>
                              <button onClick={() => setNewQuestion({...newQuestion, correct:j})}
                                className={`text-xs px-2 py-1 rounded-lg transition ${j===newQuestion.correct ? 'bg-green-100 text-green-700 font-bold' : 'bg-gray-100 text-gray-500'}`}>
                                {j===newQuestion.correct ? '✅' : 'Correct ?'}
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => saveNewQuestion(quiz.id)} disabled={saving}
                            className="bg-mouride-green text-white px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-50">
                            {saving ? '💾...' : '✅ Ajouter'}
                          </button>
                          <button onClick={() => setAddingQuestion(null)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm">Annuler</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setAddingQuestion(quiz.id)}
                        className="w-full py-2 border-2 border-dashed border-mouride-gold text-mouride-gold rounded-xl text-sm font-semibold hover:bg-mouride-gold/5 transition-colors">
                        + Ajouter une question
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}