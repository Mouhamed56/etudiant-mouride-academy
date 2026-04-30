'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [fullName, setFullName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [bio, setBio] = useState('')
  const [country, setCountry] = useState('')
  const [lang, setLang] = useState('fr')
  const [avatar, setAvatar] = useState('')
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setFullName(user.user_metadata?.full_name || '')
        setFirstName(user.user_metadata?.first_name || '')
        setLastName(user.user_metadata?.last_name || '')
        setBio(user.user_metadata?.bio || '')
        setCountry(user.user_metadata?.country || '')
        setLang(user.user_metadata?.lang || 'fr')
        setAvatar(user.user_metadata?.avatar_url || '')
      }
    }
    load()
  }, [])

  async function handleSave() {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      data: { full_name: `${firstName} ${lastName}`.trim() || fullName, first_name: firstName, last_name: lastName, bio, country, lang }
    })
    if (error) toast.error('Erreur lors de la sauvegarde')
    else toast.success('Profil mis à jour !')
    setSaving(false)
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setAvatar(ev.target?.result as string)
    reader.readAsDataURL(file)
    toast.success('Photo sélectionnée (fonctionnalité de téléchargement à configurer avec Supabase Storage)')
  }

  const initials = (fullName || `${firstName} ${lastName}`).trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'EM'

  return (
    <div className="max-w-2xl animate-fade-in">
      <h1 className="text-3xl font-display font-bold text-mouride-green mb-8">Mon Profil</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        {/* Avatar */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-mouride-green flex items-center justify-center">
              {avatar
                ? <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                : <span className="text-mouride-gold font-bold text-2xl">{initials}</span>
              }
            </div>
            <button onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-mouride-gold rounded-full flex items-center justify-center text-mouride-green text-sm shadow-md hover:bg-mouride-gold-light transition-colors">
              📷
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>
          <div>
            <h2 className="font-display font-bold text-mouride-green text-lg">{(firstName || lastName) ? `${firstName} ${lastName}`.trim() : fullName || 'Étudiant Mouride'}</h2>
            <p className="text-gray-400 text-sm">{user?.email}</p>
            <p className="text-xs text-mouride-gold mt-1">Étudiant Mouride Academy</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Votre prénom" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Votre nom" className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
            <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Sénégal, France, USA..." className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Parlez un peu de vous..." rows={3} className="input-field resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Langue préférée</label>
            <select value={lang} onChange={e => setLang(e.target.value)} className="input-field">
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇬🇧 English</option>
              <option value="wo">🇸🇳 Wolof</option>
            </select>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-primary w-full py-3">
            {saving ? 'Sauvegarde...' : '💾 Sauvegarder le profil'}
          </button>
        </div>
      </div>
    </div>
  )
}
