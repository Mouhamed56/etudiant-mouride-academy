'use client'
import { useLang } from '@/hooks/useLang'

const EXPLORES = [
  { key:'e1', icon:<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/> },
  { key:'e2', icon:<path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14z"/> },
  { key:'e3', icon:<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/> },
  { key:'e4', icon:<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/> },
  { key:'e5', icon:<path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/> },
]

const AMBITIONS = ['a1','a2','a3','a4']

export default function About() {
  const { t } = useLang()
  return (
    <section id="apropos" className="py-20 lg:py-32 bg-mouride-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">{t('about.tag')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-mouride-green mt-2 mb-4">{t('about.title')}</h2>
          <div className="section-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="absolute -inset-4 bg-mouride-gold/20 rounded-3xl blur-xl" />
            <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="images/mosque-touba.jpg"
                  alt="Mosquée de Touba"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-mouride-green font-display font-bold text-lg">{t('about.imgCaption')}</p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-3xl font-display font-bold text-mouride-green mb-2">{t('about.objectiveTitle')}</h3>
            <p className="text-gray-700 text-lg leading-relaxed">{t('about.objective1')}</p>
            <p className="text-gray-700 text-lg leading-relaxed">{t('about.objective2')}</p>
            <p className="text-gray-700 text-lg leading-relaxed">{t('about.objective3')}</p>
            <p className="text-gray-700 text-lg leading-relaxed">{t('about.objective4')}</p>
            <p className="text-gray-700 text-lg leading-relaxed">{t('about.objective5')}</p>
            <p className="text-gray-700 text-lg leading-relaxed">{t('about.objective6')}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 mb-10 shadow-md">
          <h3 className="text-xl font-display font-bold text-mouride-green mb-6">{t('about.exploreTitle')}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPLORES.map(e => (
              <div key={e.key} className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-mouride-green flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-mouride-gold" fill="currentColor" viewBox="0 0 24 24">{e.icon}</svg>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{t(`about.${e.key}`)}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-6 leading-relaxed">{t('about.challenge')}</p>
        </div>

        <div className="bg-mouride-green rounded-3xl p-8 pattern-bg">
          <h3 className="text-xl font-display font-bold text-mouride-gold mb-6">{t('about.ambitionTitle')}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {AMBITIONS.map(a => (
              <div key={a} className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-mouride-gold rounded-full flex-shrink-0 mt-2" />
                <p className="text-white text-sm leading-relaxed">{t(`about.${a}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}