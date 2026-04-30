'use client'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'
import Sidebar from '@/components/layout/Sidebar'
import TopBar from '@/components/layout/TopBar'
import type { User } from '@supabase/supabase-js'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => {
      if (!user) window.location.href = '/login'
      else setUser(user)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-mouride-cream">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-mouride-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"/>
        <p className="text-mouride-green font-medium text-sm">Chargement...</p>
      </div>
    </div>
  )

  if (!user) return null

  return (
    <div className="flex h-screen bg-mouride-cream overflow-hidden">
      <Toaster position="top-center" toastOptions={{ style: { background:'#166534', color:'white', borderRadius:'12px' } }}/>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar user={user}/>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
