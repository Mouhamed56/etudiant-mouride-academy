'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { MODULES } from '@/data/modules'

const NAV = [
  { href: '/dashboard',  label: 'Accueil',       icon: '🏠' },
  { href: '/learn',      label: 'Apprendre',      icon: '📚' },
  { href: '/quiz',       label: 'Quiz QCM',       icon: '🎯' },
  { href: '/library',    label: 'Bibliothèque',   icon: '📖' },
  { href: '/community',  label: 'Communauté',     icon: '👥' },
  { href: '/profile',    label: 'Mon Profil',     icon: '👤' },
  { href: '/admin',      label: 'Administration', icon: '⚙️' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const totalLecons = MODULES.reduce((t, m) => t + m.lecons.length, 0)

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col py-6 px-4 hidden lg:flex">
      <Link href="/dashboard" className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 relative flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Étudiant Mouride Academy"
            width={40}
            height={40}
            className="rounded-lg object-contain"
            style={{ background: 'transparent' }}
          />
        </div>
        <div>
          <div className="font-display font-bold text-mouride-green text-sm leading-tight">Étudiant Mouride</div>
          <div className="text-xs text-mouride-gold font-semibold tracking-wider">ACADEMY</div>
        </div>
      </Link>

      <nav className="flex-1 space-y-1">
        {NAV.map(item => (
          <Link key={item.href} href={item.href}
            className={cn('sidebar-link', (pathname === item.href || pathname.startsWith(item.href + '/')) && item.href !== '/dashboard' ? 'active' : pathname === item.href ? 'active' : '')}>
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-3 py-3 bg-mouride-cream rounded-xl">
        <p className="text-xs text-mouride-green font-semibold mb-1">Contenu disponible</p>
        <p className="text-xs text-gray-500">{totalLecons} leçons · 5 modules</p>
        <div className="mt-2 bg-white rounded-full h-1.5">
          <div className="bg-mouride-gold h-full rounded-full w-0" />
        </div>
      </div>
    </aside>
  )
}
