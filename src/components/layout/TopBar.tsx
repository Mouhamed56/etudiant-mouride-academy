'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function TopBar({ user }: { user: User }) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Étudiant'
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-3 lg:hidden">
        <Image src="/images/logo.png" alt="EMA" width={32} height={32} className="rounded-lg" />
        <span className="font-display font-bold text-mouride-green text-sm">EMA</span>
      </div>
      <h1 className="font-display font-bold text-mouride-green text-lg hidden lg:block">
        Étudiant Mouride <span className="text-mouride-gold">Academy</span>
      </h1>
      <div className="flex items-center gap-3 ml-auto">
        <div className="relative">
          <button onClick={() => setMenuOpen(o => !o)}
            className="w-9 h-9 bg-mouride-green rounded-full flex items-center justify-center text-mouride-gold font-bold text-sm hover:bg-mouride-green-dark transition-colors">
            {initials}
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-50">
                <p className="font-medium text-sm text-gray-800 truncate">{name}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Mon profil</Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Déconnexion</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
