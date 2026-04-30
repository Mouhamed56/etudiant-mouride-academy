import { useLang } from '@/hooks/useLang';

const SOCIAL = [
  { label: 'Facebook',  href: 'https://www.facebook.com/share/1beKWkak9J/', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { label: 'Instagram', href: 'https://www.instagram.com/etudiant_mouride', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
  { label: 'YouTube',   href: 'https://youtube.com/@etudiantmouride', icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z M9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@etudiantmuridedigital6', icon: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.17a8.16 8.16 0 004.77 1.52V7.25a4.85 4.85 0 01-1-.56z' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/mouhamed-sène-digitalinnovation', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
];

const LINKS = [
  { key: 'nav.home',      href: '#accueil' },
  { key: 'nav.about',     href: '#apropos' },
  { key: 'nav.teachings', href: '#enseignements' },
  { key: 'nav.videos',    href: '#videos' },
  { key: 'nav.book',      href: '#livre' },
  { key: 'nav.blog',      href: '#blog' },
  { key: 'nav.gallery',   href: '#galerie' },
  { key: 'nav.contact',   href: '#contact' },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-mouride-green-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10">

          {/* Branding */}
          <div>
            <h3 className="font-display font-bold text-2xl text-mouride-gold mb-4">Étudiant Mouride</h3>
            <p className="text-white/70 mb-6">{t('footer.desc')}</p>
            <div className="flex gap-3 flex-wrap">
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-mouride-gold/20 border border-mouride-gold/30 flex items-center justify-center transition-colors"
                  aria-label={s.label}>
                  <svg className="w-4 h-4 text-mouride-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-mouride-gold mb-4">{t('footer.links')}</h4>
            <ul className="space-y-2">
              {LINKS.map(l => (
                <li key={l.key}>
                  <a href={l.href} className="text-white/70 hover:text-mouride-gold transition-colors text-sm">
                    {t(l.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-mouride-gold mb-4">{t('nav.contact')}</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-mouride-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:mouhamedsene.office@gmail.com" className="hover:text-mouride-gold transition-colors">
                  mouhamedsene.office@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-mouride-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:+221777446157" className="hover:text-mouride-gold transition-colors">
                  +221 77 744 61 57
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-mouride-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Dakar, Sénégal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50 text-sm">
          <p>{t('footer.copy')}</p>
          <p className="mt-1 text-mouride-gold/60">الله أكبر · Allahu Akbar</p>
        </div>
      </div>
    </footer>
  );
}
