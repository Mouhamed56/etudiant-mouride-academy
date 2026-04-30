'use client'
import { useState } from 'react';
import { useLang } from '@/hooks/useLang';

const SOCIALS = [
  { href:'https://www.facebook.com/share/1beKWkak9J/?mibextid=wwXIfr', icon:<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/> },
  { href:'https://www.instagram.com/etudiant_mouride?igsh=MWtiZGJua291bGpkYQ%3D%3D&utm_source=qr', icon:<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/> },
  { href:'https://www.tiktok.com/@etudiantmuridedigital6', icon:<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/> },
  { href:'https://youtube.com/@etudiantmouride', icon:<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/> },
  { href:'https://www.linkedin.com/in/mouhamed-s%C3%A8ne-digitalinnovation', icon:<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/> },
  { href:'https://wa.me/221777446157', icon:<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.931 1.242l-.354.214-3.675-.96.976 3.554-.228.364a9.865 9.865 0 001.525 6.078A9.854 9.854 0 006.522 20.62h.004c1.76 0 3.432-.47 4.962-1.363l.363-.156 3.699.961-.978-3.55.227-.364a9.86 9.86 0 00.623-6.379c-.24-.577-.612-1.112-1.08-1.592a9.865 9.865 0 00-5.308-2.891M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"/> },
];

export default function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState<boolean>(false);
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name:'', email:'', subject:'', message:'' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">{t('contact.tag')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-mouride-green mt-2 mb-4">{t('contact.title')}</h2>
          <div className="section-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Infos */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-bold text-mouride-green mb-6">{t('contact.subtitle')}</h3>
              <p className="text-gray-600 mb-8">{t('contact.desc')}</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-mouride-green flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-mouride-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-mouride-green font-semibold">mouhamedsene.office@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-mouride-green flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-mouride-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.931 1.242l-.354.214-3.675-.96.976 3.554-.228.364a9.865 9.865 0 001.525 6.078A9.854 9.854 0 006.522 20.62h.004c1.76 0 3.432-.47 4.962-1.363l.363-.156 3.699.961-.978-3.55.227-.364a9.86 9.86 0 00.623-6.379c-.24-.577-.612-1.112-1.08-1.592a9.865 9.865 0 00-5.308-2.891M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <p className="text-mouride-green font-semibold">+221 77 744 61 57</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-mouride-green mb-4">{t('contact.follow')}</h4>
              <div className="flex space-x-4 flex-wrap gap-2">
                {SOCIALS.map((s,i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-mouride-green flex items-center justify-center hover:bg-mouride-green-dark transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-mouride-cream rounded-3xl p-8">
            {!sent ? (
              <form onSubmit={submit} className="space-y-6" noValidate>
                {[
                  { lKey:'contact.nameLabel',    ph:'contact.namePH',     field:'name',    type:'text' },
                  { lKey:'contact.emailLabel',   ph:'contact.emailLabel', field:'email',   type:'email' },
                  { lKey:'contact.subjectLabel', ph:'contact.subjectPH',  field:'subject', type:'text' },
                ].map(f => (
                  <div key={f.field}>
                    <label className="block text-sm font-medium text-mouride-green mb-2">{t(f.lKey)}</label>
                    <input type={f.type} required value={form[f.field]}
                      onChange={e=>setForm({...form,[f.field]:e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-mouride-gold focus:outline-none transition-colors"
                      placeholder={t(f.ph)} />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-mouride-green mb-2">{t('contact.msgLabel')}</label>
                  <textarea rows={5} required value={form.message}
                    onChange={e=>setForm({...form,message:e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-mouride-gold focus:outline-none transition-colors resize-none"
                    placeholder={t('contact.msgPH')} />
                </div>
                <button type="submit"
                  className="w-full px-8 py-4 bg-mouride-green text-white font-bold rounded-full hover:bg-mouride-green-dark transition-all inline-flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  {t('contact.send')}
                </button>
              </form>
            ) : (
              <div className="p-6 bg-mouride-green/10 rounded-xl text-center">
                <svg className="w-12 h-12 text-mouride-green mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <p className="text-mouride-green font-semibold">{t('contact.successMsg')}</p>
                <p className="text-gray-600 text-sm mt-1">{t('contact.successSub')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
