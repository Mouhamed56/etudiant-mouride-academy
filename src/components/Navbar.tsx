'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLang } from '@/hooks/useLang'

const NAV_MAIN = [
  { key: 'nav.home',      href: '#accueil' },
  { key: 'nav.about',     href: '#apropos' },
  { key: 'nav.teachings', href: '#enseignements' },
  { key: 'nav.videos',    href: '#videos' },
  { key: 'nav.book',      href: '#livre' },
  { key: 'nav.blog',      href: '#blog' },
]

const NAV_MORE = [
  { key: 'nav.institut',   href: '#institut' },
  { key: 'nav.khassaides', href: '#khassaides' },
  { key: 'nav.evenements', href: '#evenements' },
  { key: 'nav.khalifes',   href: '#khalifes' },
  { key: 'nav.podcast',    href: '#podcast' },
  { key: 'nav.actualites', href: '#actualites' },
  { key: 'nav.xassida',    href: '#xassida' },
  { key: 'nav.mission',    href: '#mission-cheikh' },
  { key: 'nav.economy',    href: '#modele-economique' },
  { key: 'nav.quotes',     href: '#citations' },
  { key: 'nav.gallery',    href: '#galerie' },
]

export default function Navbar() {
  const { t, lang, toggleLang } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-mouride-green-dark shadow-xl' : 'bg-mouride-green-dark/95'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <a href="#accueil" className="flex items-center gap-2 flex-shrink-0">
            <Image src="/images/logo.png" alt="EMA" width={36} height={36} className="rounded-lg" />
            <span className="font-display font-bold text-white text-sm hidden sm:block">
              Étudiant Mouride <span className="text-mouride-gold">Academy</span>
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_MAIN.map(i => (
              <a key={i.key} href={i.href}
                className="px-2 py-1 text-white hover:text-mouride-gold transition-colors text-sm font-medium">
                {t(i.key)}
              </a>
            ))}
            <div className="relative">
              <button onClick={() => setMoreOpen(o => !o)}
                className="px-2 py-1 text-white hover:text-mouride-gold text-sm font-medium flex items-center gap-1">
                {t('nav.more')}
                <svg className={`w-3 h-3 transition-transform ${moreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {moreOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-mouride-green-dark rounded-xl shadow-2xl border border-mouride-gold/20 py-2 z-50">
                  {NAV_MORE.map(i => (
                    <a key={i.key} href={i.href} onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 text-white hover:text-mouride-gold hover:bg-white/5 text-sm transition-colors">
                      {t(i.key)}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <button onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 bg-mouride-gold/20 border border-mouride-gold/70 rounded-full text-mouride-gold font-bold text-xs hover:bg-mouride-gold hover:text-mouride-green transition-all">
              🌐 {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <Link href="/login"
              className="ml-1 px-4 py-2 bg-mouride-gold text-mouride-green font-semibold rounded-full hover:bg-mouride-gold-light transition-colors text-sm">
              {lang === 'fr' ? 'Apprendre →' : 'Learn →'}
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={toggleLang}
              className="px-3 py-1.5 bg-mouride-gold/20 border border-mouride-gold/70 rounded-full text-mouride-gold font-bold text-xs">
              🌐 {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <button onClick={() => setMenuOpen(o => !o)} className="text-white p-1">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-mouride-green-dark border-t border-white/10 px-4 py-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
          {[...NAV_MAIN, ...NAV_MORE].map(i => (
            <a key={i.key} href={i.href} onClick={() => setMenuOpen(false)}
              className="block text-white hover:text-mouride-gold py-2.5 text-sm border-b border-white/5">
              {t(i.key)}
            </a>
          ))}
          <Link href="/login" onClick={() => setMenuOpen(false)}
            className="block mt-3 text-center bg-mouride-gold text-mouride-green font-bold py-3 rounded-xl text-sm">
            {lang === 'fr' ? 'Commencer à apprendre →' : 'Start learning →'}
          </Link>
        </div>
      )}
    </nav>
  )
}
