import { useLang } from '@/hooks/useLang';

interface Son {
  key: string;
  num: string;
  file: string;
  title_fr: string;
  title_en: string;
  reciter_fr: string;
  reciter_en: string;
  desc_fr: string;
  desc_en: string;
}

const SONS: Son[] = [
  { key:'s1', num:'01', file:'son/ajabani.mp3', title_fr:'Ajabani', title_en:'Ajabani', reciter_fr:'Kourel Hizbut Tarkhiyah', reciter_en:'Kourel Hizbut Tarkhiyah', desc_fr:"L'attraction des cœurs – Un poème sur l'amour divin.", desc_en:'The attraction of hearts – A poem on divine love.' },
  { key:'s2', num:'02', file:'son/Matlabul_Fawzayni_Kurel_1_National_HTDKH_Laylatul_Qadr_2025M4A_128K.m4a', title_fr:'Matlabul Fawzayni', title_en:'Matlabul Fawzayni', reciter_fr:'Kourel 1 HTDKH', reciter_en:'Kourel 1 HTDKH', desc_fr:"La quête des deux bonheurs – Guidance pour le succès.", desc_en:'The quest for two happinesses – Guidance for success.' },
  { key:'s3', num:'03', file:'son/chahrou-ramadan.mp3', title_fr:'Chahrou Ramadan', title_en:'Chahrou Ramadan', reciter_fr:'Kourel Tout Tankh', reciter_en:'Kourel Tout Tankh', desc_fr:'Les voies du Paradis – Guide spirituel.', desc_en:'The paths of Paradise – Spiritual guide.' },
  { key:'s4', num:'04', file:'son/bouchralana.m4a', title_fr:'Bouchralana', title_en:'Bouchralana', reciter_fr:'Kourel HTDKH', reciter_en:'Kourel HTDKH', desc_fr:"L'illuminateur des poitrines – Lumière de la foi.", desc_en:'The illuminator of chests – Light of faith.' },
  { key:'s5', num:'05', file:'son/JAZBUT_DAROU_MOUKHTY_&_BAYE_ABLAYE_NIANG_HTDKH_11J_DOUNDAL_KOOR.mp3', title_fr:'Jazb Darou Moukhty', title_en:'Jazb Darou Moukhty', reciter_fr:'HTDKH', reciter_en:'HTDKH', desc_fr:"Récitation dédiée à la cité de Darou Mousty.", desc_en:'Recitation dedicated to the city of Darou Mousty.' },
];

function NoteIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
    </svg>
  );
}

export default function Xassida() {
  const { t, lang } = useLang();
  return (
    <section id="xassida" className="py-20 lg:py-32 bg-mouride-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">{t('xassida.tag')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mt-2 mb-4">{t('xassida.title')}</h2>
          <div className="w-16 h-1 bg-mouride-gold mx-auto rounded-full mb-6" />
          <p className="text-green-200 max-w-2xl mx-auto">{t('xassida.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {SONS.map((s: Son) => (
            <div key={s.key} className="bg-white/10 rounded-2xl p-5 border border-white/20 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-mouride-gold text-mouride-green rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {s.num}
                </span>
                <div>
                  <p className="text-white font-display font-bold text-base leading-tight">
                    {lang === 'fr' ? s.title_fr : s.title_en}
                  </p>
                  <p className="text-mouride-gold text-xs">{lang === 'fr' ? s.reciter_fr : s.reciter_en}</p>
                </div>
                <div className="ml-auto text-mouride-gold opacity-60">
                  <NoteIcon />
                </div>
              </div>
              <p className="text-green-200 text-xs leading-relaxed">
                {lang === 'fr' ? s.desc_fr : s.desc_en}
              </p>
              <audio controls className="w-full" style={{ height:'40px', borderRadius:'8px' }}>
                <source src={s.file} />
              </audio>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
