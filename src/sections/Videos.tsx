import { useLang } from '@/hooks/useLang';

const VIDEOS = [
  { epKey:'ep1', ytId:'pYfjqrSjqI4' },
  { epKey:'ep2', ytId:'dRdVnY4HT58' },
  { epKey:'ep3', ytId:'jXRS3p5xc2M' },
];

function VideoCard({ epKey, ytId }) {
  const { t } = useLang();
  return (
    <div className="bg-white rounded-2xl overflow-hidden card-hover">
      <div
        className="aspect-video relative overflow-hidden group cursor-pointer"
        style={{ background:`url('https://img.youtube.com/vi/${ytId}/maxresdefault.jpg') center/cover` }}
        onClick={() => window.open(`https://youtube.com/shorts/${ytId}`, '_blank')}
      >
        <div className="absolute inset-0 bg-mouride-green/80 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-mouride-gold flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-10 h-10 text-mouride-green ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="p-6">
        <span className="text-mouride-gold text-sm font-medium">{t(`videos.${epKey}.label`)}</span>
        <h3 className="text-lg font-display font-bold text-mouride-green mt-1 mb-2">{t(`videos.${epKey}.title`)}</h3>
        <p className="text-gray-600 text-sm">{t(`videos.${epKey}.desc`)}</p>
      </div>
    </div>
  );
}

export default function Videos() {
  const { t } = useLang();
  return (
    <section id="videos" className="py-20 lg:py-32 bg-mouride-green pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">{t('videos.tag')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mt-2 mb-4">{t('videos.title')}</h2>
          <div className="section-divider" />
          <p className="text-white/80 mt-6 max-w-2xl mx-auto">{t('videos.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEOS.map(v => <VideoCard key={v.epKey} {...v} />)}
        </div>

        <div className="text-center mt-12">
          <a href="https://www.youtube.com/@EtudiantMouride" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-mouride-gold text-mouride-green font-bold rounded-full hover:bg-mouride-gold-light transition-all">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            {t('videos.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
