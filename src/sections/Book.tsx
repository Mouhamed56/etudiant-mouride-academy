import { useLang } from '@/hooks/useLang';

const BOOK_PDF = "pdf/leadership-cheikh-ahmadou-bamba.pdf";
const THEMES = ['t1','t2','t3','t4','t5','t6'];

export default function Book() {
  const { t } = useLang();
  return (
    <section id="livre" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">{t('book.tag')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-mouride-green mt-2 mb-4">{t('book.title')}</h2>
          <div className="section-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Couverture */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-8 bg-mouride-gold/20 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-mouride-green to-mouride-green-dark rounded-2xl p-8 book-shadow transform hover:rotate-1 transition-transform">
                <div className="w-64 h-80 sm:w-72 sm:h-96 bg-white rounded-lg shadow-inner flex flex-col items-center justify-center p-6">
                  <img src="images/couverture-livre.png" alt="Couverture du livre"
                    className="w-full h-full object-contain rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Infos */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-mouride-green">{t('book.bookTitle')}</h3>
            <p className="text-gray-600 text-lg leading-relaxed">{t('book.desc')}</p>
            <div className="space-y-4">
              <h4 className="font-bold text-mouride-green">{t('book.themes')}</h4>
              <ul className="space-y-3">
                {THEMES.map(k => (
                  <li key={k} className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-mouride-gold rounded-full flex-shrink-0" />
                    <span className="text-gray-600">{t(`book.${k}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href={BOOK_PDF} download
                  className="px-8 py-4 bg-mouride-green text-white font-bold rounded-full hover:bg-mouride-green-dark transition-all inline-flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  {t('book.download')}
                </a>
                <a href={BOOK_PDF} target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 border-2 border-mouride-green text-mouride-green font-bold rounded-full hover:bg-mouride-green hover:text-white transition-all inline-flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  {t('book.preview')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
