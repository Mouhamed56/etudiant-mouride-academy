'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } },
    })
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-display font-bold text-mouride-green mb-2">
          Vérifiez votre email !
        </h2>
        <p className="text-gray-500 text-sm mb-2">
          Un email de confirmation a été envoyé à
        </p>
        <p className="text-mouride-green font-semibold mb-6">{email}</p>
        <p className="text-gray-400 text-xs mb-6">
          Cliquez sur le lien dans l&apos;email pour activer votre compte, puis connectez-vous.
        </p>
        <Link href="/login" className="btn-primary block text-center">
          Aller à la connexion
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl">
      <h2 className="text-2xl font-display font-bold text-mouride-green mb-2">Créer un compte</h2>
      <p className="text-gray-500 text-sm mb-6">Rejoignez la communauté Étudiant Mouride Academy</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
          <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
            placeholder="Votre nom" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="votre@email.com" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Min. 8 caractères" className="input-field" />
        </div>
        <button type="submit" disabled={loading} className="btn-gold w-full">
          {loading ? 'Création...' : "S'inscrire gratuitement"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Déjà un compte ?{' '}
        <Link href="/login" className="text-mouride-green font-semibold hover:underline">Se connecter</Link>
      </p>
    </div>
  )
}
