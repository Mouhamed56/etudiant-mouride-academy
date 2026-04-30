import { useLang } from '@/hooks/useLang';

const PILLARS = [
  { key:'p1', icon:<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>,
    items:['l1','l2','l3','l4'] },
  { key:'p2', icon:<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>,
    items:['l1','l2','l3','l4'] },
  { key:'p3', icon:<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>,
    items:['l1','l2','l3','l4'] },
  { key:'p4', icon:<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>,
    items:['l1','l2','l3','l4'] },
];

const TIMELINE = [
  { year:'1853', tkey:'t1' },
  { year:'1895', tkey:'t2' },
  { year:'1902', tkey:'t3' },
  { year:'1888', tkey:'t4' },
  { year:'1927', tkey:'t5', gold:true },
];

export default function Mission() {
  const { t } = useLang();
  return (
    <section id="mission-cheikh" className="py-20 lg:py-32 bg-mouride-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">{t('mission.tag')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-mouride-green mt-2 mb-4">{t('mission.title')}</h2>
          <div className="section-divider" />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">{t('mission.subtitle')}</p>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-3xl p-8 mb-12 max-w-4xl mx-auto shadow-md">
          <p className="text-gray-700 text-lg leading-relaxed text-center">{t('mission.intro')}</p>
        </div>

        {/* Pilliers */}
        <h3 className="text-2xl font-display font-bold text-mouride-green text-center mb-10">{t('mission.pillars')}</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {PILLARS.map(p => (
            <div key={p.key} className="bg-white rounded-2xl p-8 card-hover border-l-4 border-mouride-gold shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-mouride-green flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-mouride-gold" fill="currentColor" viewBox="0 0 24 24">{p.icon}</svg>
                </div>
                <h4 className="text-xl font-display font-bold text-mouride-green">{t(`mission.${p.key}.title`)}</h4>
              </div>
              <p className="text-gray-600 mb-4">{t(`mission.${p.key}.desc`)}</p>
              <ul className="space-y-2">
                {p.items.map(l => (
                  <li key={l} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-mouride-gold rounded-full flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{t(`mission.${p.key}.${l}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <h3 className="text-2xl font-display font-bold text-mouride-green text-center mb-10">{t('mission.timeline')}</h3>
        <div className="relative mb-16">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-mouride-gold via-mouride-gold-light to-mouride-gold" />
          <div className="grid md:grid-cols-5 gap-6">
            {TIMELINE.map(item => (
              <div key={item.year} className="text-center relative">
                <div className={`w-16 h-16 rounded-full border-4 mx-auto mb-4 flex items-center justify-center relative z-10
                  ${item.gold ? 'bg-mouride-gold border-mouride-green' : 'bg-mouride-green border-mouride-gold'}`}>
                  <span className={`font-bold text-xs ${item.gold ? 'text-mouride-green' : 'text-mouride-gold'}`}>{item.year}</span>
                </div>
                <h4 className="font-bold text-mouride-green mb-1 text-sm">{t(`mission.${item.tkey}`)}</h4>
                <p className="text-gray-500 text-xs">{t(`mission.${item.tkey}sub`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote finale */}
        <div className="bg-mouride-green rounded-3xl p-10 text-center pattern-bg">
          <span className="quote-marks text-mouride-gold">"</span>
          <p className="text-white text-xl italic font-display -mt-6 mb-6 max-w-3xl mx-auto">{t('mission.quote')}</p>
          <p className="text-mouride-gold font-semibold">Cheikh Ahmadou Bamba</p>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">{t('mission.legacy')}</p>
        </div>
      </div>
    </section>
  );
}
