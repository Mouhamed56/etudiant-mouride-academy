'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    console.log('handleLogin called', email, password)
    if (!email || !password) {
      setError('Remplissez tous les champs.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      console.log('Supabase result:', JSON.stringify(data), JSON.stringify(error))
      if (error) {
        setError(error.message)
        setLoading(false)
      } else {
        window.location.replace('/dashboard')
      }
    } catch (err) {
      console.error('Catch error:', err)
      setError('Erreur inattendue.')
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl">
      <h2 className="text-2xl font-display font-bold text-mouride-green mb-2">Connexion</h2>
      <p className="text-gray-500 text-sm mb-6">Accédez à votre espace d&apos;apprentissage</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="input-field"
          />
        </div>
        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Pas encore de compte ?{' '}
        <Link href="/register" className="text-mouride-green font-semibold hover:underline">
          S&apos;inscrire
        </Link>
      </p>
    </div>
  )
}
