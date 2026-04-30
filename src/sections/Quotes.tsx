import { useLang } from '@/hooks/useLang';

const StarIcon = () => (
  <svg className="w-5 h-5 text-mouride-green" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l.117.007a1 1 0 0 1 .876.876L13 3v1.07a7.001 7.001 0 0 1 5.93 5.93H20a1 1 0 0 1 0 2h-1.07a7.001 7.001 0 0 1-5.93 5.93V19a1 1 0 0 1-2 0v-1.07a7.001 7.001 0 0 1-5.93-5.93H4a1 1 0 0 1 0-2h1.07a7.001 7.001 0 0 1 5.93-5.93V3a1 1 0 0 1 1-1z"/>
  </svg>
);

const QUOTES = [
  { qKey:'q1', srcKey:'src1' },
  { qKey:'q2', srcKey:'src2' },
  { qKey:'q3', srcKey:'src3' },
  { qKey:'q4', srcKey:'src4' },
  { qKey:'q5', srcKey:'src5' },
  { qKey:'q6', srcKey:'src6' },
];

export default function Quotes() {
  const { t } = useLang();
  return (
    <section id="citations" className="py-20 lg:py-32 bg-mouride-green pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">{t('cit.tag')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mt-2 mb-4">{t('cit.title')}</h2>
          <div className="section-divider" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {QUOTES.map(q => (
            <div key={q.qKey} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-mouride-gold/20 card-hover">
              <span className="quote-marks text-mouride-gold">"</span>
              <p className="text-white text-lg italic font-display -mt-6 mb-6">{t(`cit.${q.qKey}`)}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-mouride-gold flex items-center justify-center">
                  <StarIcon />
                </div>
                <span className="text-mouride-gold font-medium ml-3">
                  Cheikh Ahmadou Bamba - {t(`cit.${q.srcKey}`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
