'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

interface Post {
  id: string
  author: string
  initials: string
  content: string
  topic: string
  time: string
  likes: number
  replies: Reply[]
  liked: boolean
}

interface Reply {
  id: string
  author: string
  initials: string
  content: string
  time: string
}

const TOPICS = ['Général', 'Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5', 'Questions', 'Partage']

const INITIAL_POSTS: Post[] = [
  { id: '1', author: 'Fatou D.', initials: 'FD', content: "Mashallah ! La leçon sur la prière de Cheikh Bamba sur la mer m'a profondément touché. Baraka Allahu fikoum pour cette plateforme.", topic: 'Module 1', time: 'Il y a 2h', likes: 12, replies: [{ id: 'r1', author: 'Moussa K.', initials: 'MK', content: "Waw, moi aussi ! C'est un témoignage extraordinaire de foi.", time: 'Il y a 1h' }], liked: false },
  { id: '2', author: 'Ibrahim S.', initials: 'IS', content: "Question sur le Module 2 : quelle est la différence entre Takhlia et Tahlia dans la Tarbiya ?", topic: 'Module 2', time: 'Il y a 4h', likes: 5, replies: [], liked: false },
  { id: '3', author: 'Aissatou B.', initials: 'AB', content: "Le modèle économique mouride est fascinant. Serigne Touba, prisonnier, a aidé la France avec 500 000 francs ! Subhanallah.", topic: 'Module 4', time: 'Il y a 1j', likes: 24, replies: [{ id: 'r2', author: 'Omar T.', initials: 'OT', content: "C'est la preuve que la foi et le travail sont plus puissants que tout !", time: 'Il y a 20h' }], liked: false },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [newPost, setNewPost] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('Général')
  const [filter, setFilter] = useState('all')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [userName, setUserName] = useState('Étudiant Mouride')
  const [userInitials, setUserInitials] = useState('EM')

  useEffect(() => {
    async function getUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Étudiant'
        setUserName(name)
        setUserInitials(name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2))
      }
    }
    getUser()
  }, [])

  function handlePost() {
    if (!newPost.trim()) return
    const post: Post = {
      id: Date.now().toString(),
      author: userName,
      initials: userInitials,
      content: newPost.trim(),
      topic: selectedTopic,
      time: 'À l\'instant',
      likes: 0,
      replies: [],
      liked: false,
    }
    setPosts([post, ...posts])
    setNewPost('')
    toast.success('Discussion publiée !')
  }

  function handleLike(postId: string) {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p))
  }

  function handleReply(postId: string) {
    if (!replyText.trim()) return
    const reply: Reply = { id: Date.now().toString(), author: userName, initials: userInitials, content: replyText.trim(), time: 'À l\'instant' }
    setPosts(posts.map(p => p.id === postId ? { ...p, replies: [...p.replies, reply] } : p))
    setReplyTo(null); setReplyText('')
    toast.success('Réponse publiée !')
  }

  const filtered = filter === 'all' ? posts : posts.filter(p => p.topic === filter)

  return (
    <div className="max-w-3xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-mouride-green">Communauté</h1>
        <p className="text-gray-500 text-sm mt-1">Échangez avec les étudiants mourides du monde entier</p>
      </div>

      {/* New post */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <div className="flex gap-3 mb-3">
          <div className="w-9 h-9 bg-mouride-green rounded-full flex items-center justify-center text-mouride-gold font-bold text-xs flex-shrink-0">{userInitials}</div>
          <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Partagez vos réflexions, posez vos questions..." rows={3} className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mouride-green resize-none" />
        </div>
        <div className="flex items-center justify-between">
          <select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)} className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none">
            {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <button onClick={handlePost} disabled={!newPost.trim()} className="btn-primary py-2 px-5 text-sm disabled:opacity-40">
            Publier
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-full text-xs font-medium ${filter === 'all' ? 'bg-mouride-green text-white' : 'bg-white text-gray-500 border border-gray-200'}`}>Tout</button>
        {TOPICS.map(t => (
          <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1.5 rounded-full text-xs font-medium ${filter === t ? 'bg-mouride-green text-white' : 'bg-white text-gray-500 border border-gray-200'}`}>{t}</button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filtered.map(post => (
          <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 bg-mouride-green rounded-full flex items-center justify-center text-mouride-gold font-bold text-xs flex-shrink-0">{post.initials}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-800">{post.author}</span>
                  <span className="text-xs bg-mouride-cream text-mouride-green px-2 py-0.5 rounded-full">{post.topic}</span>
                  <span className="text-xs text-gray-400 ml-auto">{post.time}</span>
                </div>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">{post.content}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-3 border-t border-gray-50">
              <button onClick={() => handleLike(post.id)} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${post.liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}>
                {post.liked ? '❤️' : '🤍'} {post.likes}
              </button>
              <button onClick={() => setReplyTo(replyTo === post.id ? null : post.id)} className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-mouride-green transition-colors">
                💬 {post.replies.length} réponse{post.replies.length !== 1 ? 's' : ''}
              </button>
            </div>

            {/* Replies */}
            {post.replies.length > 0 && (
              <div className="mt-3 ml-4 space-y-3 border-l-2 border-mouride-cream pl-4">
                {post.replies.map(reply => (
                  <div key={reply.id} className="flex gap-2">
                    <div className="w-7 h-7 bg-mouride-cream rounded-full flex items-center justify-center text-mouride-green font-bold text-xs flex-shrink-0">{reply.initials}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-gray-700">{reply.author}</span>
                        <span className="text-xs text-gray-300">{reply.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reply form */}
            {replyTo === post.id && (
              <div className="mt-3 flex gap-2">
                <input value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Votre réponse..." className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-mouride-green" />
                <button onClick={() => handleReply(post.id)} className="bg-mouride-green text-white text-xs px-4 py-2 rounded-xl hover:bg-mouride-green-dark transition-colors">Répondre</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
