'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const TOPICS = ['Général', 'Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5', 'Questions', 'Spiritualité', 'Actualités']

type Post = {
  id: string
  user_id: string
  author_name: string
  author_initials: string
  content: string
  topic: string
  likes: number
  created_at: string
  replies?: Reply[]
  userLiked?: boolean
}

type Reply = {
  id: string
  post_id: string
  user_id: string
  author_name: string
  author_initials: string
  content: string
  created_at: string
}

function timeAgo(dateStr: string) {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (diff < 60) return "À l'instant"
  if (diff < 3600) return `Il y a ${Math.floor(diff/60)} min`
  if (diff < 86400) return `Il y a ${Math.floor(diff/3600)}h`
  if (diff < 604800) return `Il y a ${Math.floor(diff/86400)} j`
  return date.toLocaleDateString('fr-FR')
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)
  const [newContent, setNewContent] = useState('')
  const [newTopic, setNewTopic] = useState('Général')
  const [filterTopic, setFilterTopic] = useState('Tous')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadUser()
    loadPosts()
  }, [])

  async function loadUser() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setCurrentUser(user)
  }

  async function loadPosts() {
    setLoading(true)
    const supabase = createClient()

    const { data: postsData } = await (supabase as any)
      .from('forum_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!postsData) { setLoading(false); return }

    const { data: repliesData } = await (supabase as any)
      .from('forum_replies')
      .select('*')
      .order('created_at', { ascending: true })

    const { data: likesData } = await (supabase as any)
      .from('forum_likes')
      .select('*')

    const { data: { user } } = await supabase.auth.getUser()

    const enriched: Post[] = postsData.map((post: any) => ({
      ...post,
      replies: (repliesData || []).filter((r: any) => r.post_id === post.id),
      userLiked: (likesData || []).some((l: any) => l.post_id === post.id && l.user_id === user?.id),
      likes: (likesData || []).filter((l: any) => l.post_id === post.id).length || post.likes || 0,
    }))

    setPosts(enriched)
    setLoading(false)
  }

  async function submitPost() {
    if (!newContent.trim()) return
    if (!currentUser) { alert('Connectez-vous pour poster'); return }
    setPosting(true)
    const supabase = createClient()

    const name = currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'Étudiant'
    const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0,2) || 'EM'

    const { data } = await (supabase as any).from('forum_posts').insert({
      user_id: currentUser.id,
      author_name: name,
      author_initials: initials,
      content: newContent.trim(),
      topic: newTopic,
    }).select().single()

    if (data) setPosts([{ ...data, replies: [], userLiked: false, likes: 0 }, ...posts])
    setNewContent('')
    setPosting(false)
  }

  async function submitReply(postId: string) {
    if (!replyContent.trim()) return
    if (!currentUser) { alert('Connectez-vous pour répondre'); return }
    const supabase = createClient()

    const name = currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'Étudiant'
    const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0,2) || 'EM'

    const { data } = await (supabase as any).from('forum_replies').insert({
      post_id: postId,
      user_id: currentUser.id,
      author_name: name,
      author_initials: initials,
      content: replyContent.trim(),
    }).select().single()

    if (data) {
      setPosts(posts.map(p => p.id === postId ? {
        ...p, replies: [...(p.replies || []), data as Reply]
      } : p))
      setReplyContent('')
      setReplyTo(null)
    }
  }

  async function toggleLike(postId: string, userLiked: boolean) {
    if (!currentUser) { alert('Connectez-vous pour aimer'); return }
    const supabase = createClient()

    if (userLiked) {
      await (supabase as any).from('forum_likes').delete()
        .eq('post_id', postId).eq('user_id', currentUser.id)
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes - 1, userLiked: false } : p))
    } else {
      await (supabase as any).from('forum_likes').insert({ post_id: postId, user_id: currentUser.id })
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1, userLiked: true } : p))
    }
  }

  async function deletePost(postId: string) {
    if (!confirm('Supprimer ce post ?')) return
    const supabase = createClient()
    await (supabase as any).from('forum_posts').delete().eq('id', postId)
    setPosts(posts.filter(p => p.id !== postId))
  }

  async function deleteReply(postId: string, replyId: string) {
    const supabase = createClient()
    await (supabase as any).from('forum_replies').delete().eq('id', replyId)
    setPosts(posts.map(p => p.id === postId ? {
      ...p, replies: p.replies?.filter(r => r.id !== replyId)
    } : p))
  }

  const filteredPosts = posts.filter(p => {
    const matchTopic = filterTopic === 'Tous' || p.topic === filterTopic
    const matchSearch = !searchQuery || p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author_name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchTopic && matchSearch
  })

  const userName = currentUser
    ? (currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'Étudiant')
    : ''
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0,2) || 'EM'

  return (
    <div className="max-w-3xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-mouride-green">Communauté</h1>
        <p className="text-gray-500 text-sm mt-1">
          {posts.length} discussion{posts.length > 1 ? 's' : ''} · Échangez avec les étudiants mourides du monde entier
        </p>
      </div>

      {/* New post */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-mouride-green rounded-full flex items-center justify-center text-mouride-gold text-sm font-bold flex-shrink-0">
            {currentUser ? userInitials : '?'}
          </div>
          <p className="text-sm font-semibold text-mouride-green">
            {currentUser ? userName : 'Connectez-vous pour poster'}
          </p>
        </div>
        <textarea
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
          placeholder={currentUser ? "Partagez vos réflexions, posez une question..." : "Connectez-vous pour participer au forum..."}
          disabled={!currentUser}
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mouride-green resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
        {currentUser && (
          <div className="flex items-center justify-between mt-3 gap-3 flex-wrap">
            <div className="flex flex-wrap gap-2">
              {TOPICS.slice(0,6).map(t => (
                <button key={t} onClick={() => setNewTopic(t)}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${newTopic === t ? 'bg-mouride-green text-white' : 'bg-gray-100 text-gray-500 hover:bg-mouride-cream'}`}>
                  {t}
                </button>
              ))}
            </div>
            <button onClick={submitPost} disabled={!newContent.trim() || posting}
              className="bg-mouride-gold text-mouride-green px-5 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition disabled:opacity-50 flex-shrink-0">
              {posting ? '...' : 'Publier'}
            </button>
          </div>
        )}
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          placeholder="🔍 Rechercher..."
          className="flex-1 min-w-48 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-mouride-green"/>
        <select value={filterTopic} onChange={e => setFilterTopic(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-mouride-green bg-white">
          <option value="Tous">Tous les sujets</option>
          {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button onClick={loadPosts} className="text-sm text-mouride-green hover:text-mouride-gold transition px-3">🔄</button>
      </div>

      {/* Posts list */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-mouride-gold border-t-transparent rounded-full animate-spin"/>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-3">💬</div>
          <p>Aucune discussion pour le moment.</p>
          {currentUser && <p className="text-sm mt-1">Soyez le premier à poser une question !</p>}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-mouride-green rounded-full flex items-center justify-center text-mouride-gold text-sm font-bold flex-shrink-0">
                    {post.author_initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-gray-800">{post.author_name}</span>
                      <span className="text-xs bg-mouride-cream text-mouride-green px-2 py-0.5 rounded-full font-semibold">{post.topic}</span>
                      <span className="text-xs text-gray-400">{timeAgo(post.created_at)}</span>
                    </div>
                    <p className="text-gray-700 text-sm mt-2 leading-relaxed">{post.content}</p>
                  </div>
                  {currentUser?.id === post.user_id && (
                    <button onClick={() => deletePost(post.id)} className="text-gray-300 hover:text-red-400 transition text-xs flex-shrink-0">🗑️</button>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-50">
                  <button onClick={() => toggleLike(post.id, post.userLiked || false)}
                    className={`flex items-center gap-1.5 text-sm transition-all ${post.userLiked ? 'text-red-500 font-semibold' : 'text-gray-400 hover:text-red-400'}`}>
                    {post.userLiked ? '❤️' : '🤍'} {post.likes}
                  </button>
                  <button onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-mouride-green transition-all">
                    💬 {post.replies?.length || 0} réponse{(post.replies?.length || 0) > 1 ? 's' : ''}
                  </button>
                  <button onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    className="ml-auto text-xs text-mouride-gold hover:text-mouride-green transition">
                    {expandedPost === post.id ? '▲ Réduire' : '▼ Voir les réponses'}
                  </button>
                </div>
              </div>

              {expandedPost === post.id && (
                <div className="border-t border-gray-50 bg-gray-50/50">
                  {post.replies && post.replies.length > 0 && (
                    <div className="p-4 space-y-3">
                      {post.replies.map(reply => (
                        <div key={reply.id} className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-mouride-cream rounded-full flex items-center justify-center text-mouride-green text-xs font-bold flex-shrink-0">
                            {reply.author_initials}
                          </div>
                          <div className="flex-1 bg-white rounded-xl p-3 border border-gray-100">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-gray-800">{reply.author_name}</span>
                                <span className="text-xs text-gray-400">{timeAgo(reply.created_at)}</span>
                              </div>
                              {currentUser?.id === reply.user_id && (
                                <button onClick={() => deleteReply(post.id, reply.id)} className="text-gray-300 hover:text-red-400 transition text-xs">🗑️</button>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentUser ? (
                    <div className="p-4 pt-0 flex gap-3">
                      <div className="w-8 h-8 bg-mouride-green rounded-full flex items-center justify-center text-mouride-gold text-xs font-bold flex-shrink-0">
                        {userInitials}
                      </div>
                      <div className="flex-1 flex gap-2">
                        <input
                          value={replyTo === post.id ? replyContent : ''}
                          onChange={e => { setReplyTo(post.id); setReplyContent(e.target.value) }}
                          placeholder="Votre réponse..."
                          className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-mouride-green"
                          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitReply(post.id) } }}
                        />
                        <button onClick={() => submitReply(post.id)} disabled={!replyContent.trim()}
                          className="bg-mouride-green text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50">
                          →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="p-4 text-xs text-gray-400 text-center">Connectez-vous pour répondre</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}