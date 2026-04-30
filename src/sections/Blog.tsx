'use client'
import { useState } from 'react'
import { useLang } from '@/hooks/useLang'
import { ARTICLES, Article } from '@/data/articles'

const CATS = ['all','spiritualite','leadership','economie','jeunesse','histoire']

const CAT_COLORS: Record<string,string> = {
  spiritualite:'from-emerald-500 to-emerald-700',
  leadership:'from-amber-500 to-amber-700',
  economie:'from-blue-500 to-blue-700',
  jeunesse:'from-purple-500 to-purple-700',
  histoire:'from-red-500 to-red-700',
}
const CAT_BADGES: Record<string,string> = {
  spiritualite:'bg-emerald-100 text-emerald-800',
  leadership:'bg-amber-100 text-amber-800',
  economie:'bg-blue-100 text-blue-800',
  jeunesse:'bg-purple-100 text-purple-800',
  histoire:'bg-red-100 text-red-800',
}

interface Comment { name:string; text:string; time:string }

function Modal({ article, lang, onClose }:{ article:Article; lang:string; onClose:()=>void }) {
  const [counts, setCounts] = useState({love:0,pray:0,star:0,idea:0,inspired:0})
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const react = (id:string) => setCounts(c=>({...c,[id]:(c as Record<string,number>)[id]+1}))

  const post = () => {
    if (!name.trim()||!text.trim()) return
    const now = new Date()
    setComments(p=>[...p,{name:name.trim(),text:text.trim(),time:now.toLocaleDateString()}])
    setName('');setText('')
  }

  const gradient = CAT_COLORS[article.category]||'from-mouride-green to-mouride-green-dark'
  const EMOJIS = [{e:'❤️',id:'love'},{e:'🤲',id:'pray'},{e:'⭐',id:'star'},{e:'💡',id:'idea'},{e:'🌟',id:'inspired'}]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white shadow-md hover:bg-gray-100 flex items-center justify-center text-gray-500">✕</button>
        <div className={`bg-gradient-to-br ${gradient} p-8 rounded-t-3xl`}>
          <span className="text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full">{article.category}</span>
          <h2 className="text-white font-display font-bold text-xl mt-3">{lang==='fr'?article.title_fr:article.title_en}</h2>
          <p className="text-white/70 text-xs mt-2">{lang==='fr'?article.date_fr:article.date_en} · {lang==='fr'?article.read_fr:article.read_en}</p>
        </div>
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed text-sm">{lang==='fr'?article.content_fr:article.content_en}</p>
          <div className="mt-5 p-4 bg-mouride-cream rounded-xl flex gap-4">
            {EMOJIS.map(r=>(
              <button key={r.id} onClick={()=>react(r.id)} className="flex flex-col items-center gap-1 hover:scale-110 transition-transform">
                <span className="text-2xl">{r.e}</span>
                <span className="text-xs text-gray-500">{(counts as Record<string,number>)[r.id]}</span>
              </button>
            ))}
          </div>
          <div className="mt-5">
            <p className="font-semibold text-sm text-mouride-green mb-3">Commentaires ({comments.length})</p>
            {comments.map((c,i)=>(
              <div key={i} className="flex gap-2 mb-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-mouride-green text-mouride-gold flex items-center justify-center text-xs font-bold flex-shrink-0">{c.name[0]}</div>
                <div><p className="text-xs font-semibold text-gray-700">{c.name} <span className="text-gray-400 font-normal">{c.time}</span></p><p className="text-xs text-gray-600 mt-0.5">{c.text}</p></div>
              </div>
            ))}
            <div className="flex flex-col gap-2 mt-3">
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Votre nom" className="input-field text-sm"/>
              <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Votre commentaire..." rows={2} className="input-field text-sm resize-none"/>
              <button onClick={post} className="btn-primary text-sm py-2">Publier</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Blog() {
  const { lang, t } = useLang()
  const [filter, setFilter] = useState('all')
  const [openArt, setOpenArt] = useState<Article|null>(null)
  const filtered = filter==='all' ? ARTICLES : ARTICLES.filter(a=>a.category===filter)

  return (
    <section id="blog" className="py-20 lg:py-32 bg-white">
      {openArt && <Modal article={openArt} lang={lang} onClose={()=>setOpenArt(null)}/>}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">{t('blog.tag')}</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-mouride-green mt-2 mb-4">{t('blog.title')}</h2>
          <div className="section-divider mb-6"/>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('blog.subtitle')}</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATS.map(c=>(
            <button key={c} onClick={()=>setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter===c?'bg-mouride-green text-white':'bg-mouride-cream text-gray-600 hover:bg-mouride-gold/20'}`}>
              {c==='all'?(lang==='fr'?'Tous':'All'):c.charAt(0).toUpperCase()+c.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(article=>(
            <article key={article.id} onClick={()=>setOpenArt(article)}
              className="bg-mouride-cream rounded-2xl overflow-hidden card-hover cursor-pointer">
              <div className={`h-40 bg-gradient-to-br ${CAT_COLORS[article.category]||'from-mouride-green to-mouride-green-dark'} flex items-end p-4`}>
                <span className={`px-2 py-1 ${CAT_BADGES[article.category]||'bg-white/20 text-white'} text-xs font-bold rounded-full`}>
                  {article.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-mouride-green text-base mb-2 line-clamp-2">
                  {lang==='fr'?article.title_fr:article.title_en}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {lang==='fr'?article.excerpt_fr:article.excerpt_en}
                </p>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{lang==='fr'?article.date_fr:article.date_en}</span>
                  <span>❤️ {article.likes.toLocaleString()}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
