import { useLang } from '@/hooks/useLang';

const TEACHINGS = [
  { key:'faith',  pdf:'pdf/iman.pdf',        icon:<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/> },
  { key:'work',   pdf:'pdf/Travail.pdf',      icon:<path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14z"/> },
  { key:'service',pdf:'pdf/Service.pdf',      icon:<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/> },
  { key:'edu',    pdf:'pdf/education.pdf',    icon:<path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3z"/> },
  { key:'lead',   pdf:'pdf/leadership.pdf',   icon:<path d="M12 2l.117.007a1 1 0 0 1 .876.876L13 3v1.07a7.001 7.001 0 0 1 5.93 5.93H20a1 1 0 0 1 0 2h-1.07a7.001 7.001 0 0 1-5.93 5.93V19a1 1 0 0 1-2 0v-1.07a7.001 7.001 0 0 1-5.93-5.93H4a1 1 0 0 1 0-2h1.07a7.001 7.001 0 0 1 5.93-5.93V3a1 1 0 0 1 1-1z"/> },
  { key:'patience',pdf:'pdf/Patience.pdf',   icon:<path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z"/> },
];

export default function Teachings() {
  const { t } = useLang();
  return (
    <section id="enseignements" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">{t('teach.tag')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-mouride-green mt-2 mb-4">{t('teach.title')}</h2>
          <div className="section-divider" />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">{t('teach.subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEACHINGS.map(item => (
            <article key={item.key} className="bg-mouride-cream rounded-2xl overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-mouride-green to-mouride-green-dark flex items-center justify-center">
                <svg className="w-20 h-20 text-mouride-gold" fill="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-mouride-green mb-3">{t(`teach.${item.key}.title`)}</h3>
                <p className="text-gray-600">{t(`teach.${item.key}.desc`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
