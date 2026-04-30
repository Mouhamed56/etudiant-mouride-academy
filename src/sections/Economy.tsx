import { useLang } from '@/hooks/useLang';

const STATS = [
  { val:'100+', sKey:'stat1', bg:'bg-mouride-green', valCls:'text-mouride-gold', txtCls:'text-white' },
  { val:'5M+',  sKey:'stat2', bg:'bg-mouride-cream shadow-md', valCls:'text-mouride-green', txtCls:'text-gray-600' },
  { val:'Touba',sKey:'stat3', bg:'bg-mouride-cream shadow-md', valCls:'text-mouride-green text-3xl', txtCls:'text-gray-600' },
  { val:'∞',    sKey:'stat4', bg:'bg-mouride-gold', valCls:'text-mouride-green', txtCls:'text-mouride-green font-semibold' },
];

const PRINCIPLES = [
  { key:'p1', gradient:'from-mouride-green to-mouride-gold', lKey:'impacts',
    items:['p1.l1','p1.l2','p1.l3','p1.l4'],
    icon:<path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14z"/>,
    iconBg:'bg-mouride-green/10 text-mouride-green' },
  { key:'p2', gradient:'from-mouride-gold to-mouride-green', lKey:'impacts',
    items:['p2.l1','p2.l2','p2.l3','p2.l4'],
    icon:<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>,
    iconBg:'bg-mouride-gold/10 text-mouride-gold' },
  { key:'p3', gradient:'from-mouride-green via-mouride-gold to-mouride-green', lKey:'charact',
    items:['p3.l1','p3.l2','p3.l3','p3.l4'],
    icon:<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>,
    iconBg:'bg-mouride-green/10 text-mouride-green' },
];

export default function Economy() {
  const { t } = useLang();
  return (
    <section id="modele-economique" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">{t('eco.tag')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-mouride-green mt-2 mb-4">{t('eco.title')}</h2>
          <div className="section-divider" />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">{t('eco.subtitle')}</p>
        </div>

        {/* Lab + stats */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-mouride-green">{t('eco.lab.title')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('eco.lab.p1')}</p>
            <p className="text-gray-600 leading-relaxed">{t('eco.lab.p2')}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(s => (
              <div key={s.sKey} className={`${s.bg} rounded-2xl p-6 text-center`}>
                <div className={`text-4xl font-display font-bold mb-2 ${s.valCls}`}>{s.val}</div>
                <p className={`text-sm ${s.txtCls}`}>{t(`eco.${s.sKey}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Principes */}
        <h3 className="text-2xl font-display font-bold text-mouride-green text-center mb-10">{t('eco.principles')}</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {PRINCIPLES.map(p => (
            <div key={p.key} className="bg-mouride-cream rounded-2xl overflow-hidden card-hover shadow-md">
              <div className={`h-3 bg-gradient-to-r ${p.gradient}`} />
              <div className="p-8">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${p.iconBg}`}>
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">{p.icon}</svg>
                </div>
                <h4 className="text-xl font-display font-bold text-mouride-green mb-3">{t(`eco.${p.key}.title`)}</h4>
                <p className="text-gray-600 mb-4">{t(`eco.${p.key}.desc`)}</p>
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">
                    {t(`eco.${p.lKey}`)}
                  </p>
                  {p.items.map(l => (
                    <div key={l} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-mouride-gold rounded-full mt-1.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{t(`eco.${l}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
