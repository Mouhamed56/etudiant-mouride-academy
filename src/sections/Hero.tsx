'use client'
import Link from 'next/link'
import { useLang } from '@/hooks/useLang'

export default function Hero() {
  const { t } = useLang()
  return (
    <section id="accueil" className="relative min-h-screen gradient-overlay pattern-bg flex items-center">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Texte gauche */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-block px-4 py-2 bg-mouride-gold/20 rounded-full mb-6">
              <span className="text-mouride-gold font-medium">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Étudiant <span className="text-mouride-gold">Mouride</span><br />
              <span className="text-mouride-gold">Academy</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 font-light">{t('hero.subtitle')}</p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-mouride-gold/30">
              <span className="quote-marks">"</span>
              <p className="text-white text-lg italic font-display -mt-8">{t('hero.quote')}</p>
              <p className="text-mouride-gold mt-4 font-medium">{t('hero.quoteAuthor')}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/register" className="px-8 py-4 bg-mouride-gold text-mouride-green font-bold rounded-full hover:bg-mouride-gold-light transition-all transform hover:scale-105 text-center">
                {t('hero.cta1')}
              </Link>
              <Link href="/login" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-mouride-green transition-all text-center">
                {t('hero.cta2')}
              </Link>
            </div>
          </div>

          {/* Image droite */}
          <div className="flex justify-center animate-scale-in delay-200">
            <div className="relative">
              <div className="absolute -inset-4 bg-mouride-gold/30 rounded-3xl blur-2xl" />
              <div className="relative w-72 sm:w-80 lg:w-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-mouride-gold/60">
                <img
                  src="/images/etudiant-mouride-academy.jpg"
                  alt="Étudiant Mouride Academy"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-mouride-green/90 to-transparent">
                  <p className="text-mouride-gold font-display font-bold">Étudiant Mouride Academy</p>
                  <p className="text-white/80 text-sm">Apprendre · Comprendre · Transmettre</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-mouride-gold rounded-full flex items-center justify-center animate-pulse shadow-lg">
                <svg className="w-8 h-8 text-mouride-green" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Mission banner */}
        <div className="mt-16 text-center animate-slide-up delay-400">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-mouride-gold/20">
            <p className="text-mouride-gold font-semibold mb-2">{t('hero.missionLabel')}</p>
            <p className="text-white text-lg max-w-3xl">{t('hero.mission')}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#apropos" className="text-white/70 hover:text-mouride-gold">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </a>
      </div>
    </section>
  )
}