import { useLang } from '@/hooks/useLang';

const PHOTOS = [
  { img:'images/gare-louga.jpg',               alt:'Gare de Louga 1895',           key:'p1' },
  { img:'images/magal-touba.jpg',              alt:'Magal de Touba',               key:'p2' },
  { img:'images/darou-marnane.jpg',            alt:'Darou Marnane',                key:'p3' },
  { img:'images/serigne-touba-cheikh-ibra.jpg',alt:'Serigne Touba et Cheikh Ibra', key:'p4' },
  { img:'images/serigne-mountakha.jpg',        alt:'Serigne Mountakha Mbacké',     key:'p5' },
  { img:'images/thieyene-djolof.jpg',          alt:'Thieyene Djolof',              key:'p6' },
  { img:'images/darou-mousty.jpg',             alt:'Darou Mousty',                 key:'p7' },
  { img:'images/mosquee-touba.jpg',            alt:'Touba Cité Sainte',            key:'p8' },
];

export default function Gallery() {
  const { t } = useLang();
  return (
    <section id="galerie" className="py-20 lg:py-32 bg-mouride-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">{t('gallery.tag')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-mouride-green mt-2 mb-4">{t('gallery.title')}</h2>
          <div className="section-divider" />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">{t('gallery.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHOTOS.map(p => (
            <div key={p.key} className="bg-white rounded-2xl overflow-hidden shadow-md card-hover">
              <div className="aspect-square overflow-hidden">
                <img src={p.img} alt={p.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h4 className="font-display font-bold text-mouride-green text-sm mb-1">
                  {t(`gallery.${p.key}.title`)}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {t(`gallery.${p.key}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
