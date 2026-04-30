import { useLang } from '@/hooks/useLang';

interface Book {
  key: string;
  pdf: string;
  title: string;
  desc: string;
}

const BOOKS_STATIC: Book[] = [
  { key:'b1', pdf:'pdf/guide-mouridisme.pdf', title:'Guide du Mouridisme', desc:"Découvrez les villes qui ont marqué la naissance du mouridisme." },
  { key:'b2', pdf:'pdf/bienfaits-eternel.pdf', title:"Les Bienfaits de l'Éternel", desc:'« Minanoul Bakhil Khadim fi Siratoul Cheikh al-Khadim »' },
  { key:'b3', pdf:'pdf/khassaides-serigne-touba.pdf', title:'Les Khassaides de Serigne Touba', desc:'DIEUREUDIEUFFÉ SERIGNE TOUBA!!!' },
  { key:'b4', pdf:'pdf/diazbul-mourid.pdf', title:'Diazbul Mouride', desc:'Par Cheikh Ibrahima FALL' },
];

function BookIcon() {
  return (
    <svg className="w-12 h-12 text-mouride-gold" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
    </svg>
  );
}

export default function Library() {
  const { t } = useLang();
  return (
    <section id="livres" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">{t('lib.tag')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-mouride-green mt-2 mb-4">{t('lib.title')}</h2>
          <div className="section-divider" />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">{t('lib.subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BOOKS_STATIC.map((b: Book) => (
            <div key={b.key} className="bg-mouride-cream rounded-2xl p-6 card-hover text-center">
              <div className="w-32 h-44 mx-auto bg-gradient-to-br from-mouride-green to-mouride-green-dark rounded-lg mb-4 flex items-center justify-center">
                <BookIcon />
              </div>
              <h3 className="font-display font-bold text-mouride-green mb-2">{b.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{b.desc}</p>
              <a href={b.pdf} target="_blank" rel="noopener noreferrer"
                className="text-mouride-gold font-semibold hover:text-mouride-green transition-colors">
                {t('lib.read')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
