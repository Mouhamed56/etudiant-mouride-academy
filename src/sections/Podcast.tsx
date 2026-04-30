import { useLang } from '@/hooks/useLang';

const ICONS = {
  mic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 text-white/90">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  ),
  headphones: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 text-white/90">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12A8.25 8.25 0 0112 3.75 8.25 8.25 0 0120.25 12M3 14.25h1.5a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5H3v-6zm15 0h1.5v6H18a1.5 1.5 0 01-1.5-1.5v-3a1.5 1.5 0 011.5-1.5z" />
    </svg>
  ),
  podcast: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 text-white/90">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  ),
};

const PODCASTS = [
  {
    key: 'p1',
    num: '01',
    duration: '12 min',
    tag_fr: 'Spiritualité',
    tag_en: 'Spirituality',
    title_fr: 'La prière comme arme : l\'histoire de Cheikh Ahmadou Bamba',
    title_en: 'Prayer as a weapon: the story of Cheikh Ahmadou Bamba',
    desc_fr: "Comment Serigne Touba a utilisé la prière et les Khassaïdes comme résistance spirituelle face à la colonisation.",
    desc_en: "How Serigne Touba used prayer and Khassaïdes as spiritual resistance against colonization.",
    color: 'from-emerald-500 to-teal-600',
    icon: 'mic',
    coming: false,
  },
  {
    key: 'p2',
    num: '02',
    duration: '18 min',
    tag_fr: 'Leadership',
    tag_en: 'Leadership',
    title_fr: 'Le leadership de Cheikh Ahmadou Bamba : humilité et vision',
    title_en: "Cheikh Ahmadou Bamba's leadership: humility and vision",
    desc_fr: "Analyse du modèle de leadership unique du Cheikh : servir sans dominer, guider sans contraindre.",
    desc_en: "Analysis of the Sheikh's unique leadership model: serve without dominating, guide without constraining.",
    color: 'from-amber-500 to-orange-600',
    icon: 'headphones',
    coming: false,
  },
  {
    key: 'p3',
    num: '03',
    duration: '15 min',
    tag_fr: 'Économie',
    tag_en: 'Economy',
    title_fr: "Le modèle économique mouride : foi et entrepreneuriat",
    title_en: "The Mouride economic model: faith and entrepreneurship",
    desc_fr: "Comment les principes mourides ont transformé des terres arides en un modèle économique africain unique.",
    desc_en: "How Mouride principles transformed arid lands into a unique African economic model.",
    color: 'from-blue-500 to-indigo-600',
    icon: 'podcast',
    coming: false,
  },
  {
    key: 'p4',
    num: '04',
    duration: '20 min',
    tag_fr: 'Histoire',
    tag_en: 'History',
    title_fr: "Les exils de Serigne Touba : Gabon et Mauritanie",
    title_en: "Serigne Touba's exiles: Gabon and Mauritania",
    desc_fr: "Récit détaillé des deux exils du Cheikh et comment ils ont renforcé sa mission spirituelle.",
    desc_en: "Detailed account of the Sheikh's two exiles and how they strengthened his spiritual mission.",
    color: 'from-rose-500 to-pink-600',
    icon: 'mic',
    coming: false,
  },
  {
    key: 'p5',
    num: '05',
    duration: '14 min',
    tag_fr: 'Jeunesse',
    tag_en: 'Youth',
    title_fr: "La jeunesse mouride face aux défis du 21ème siècle",
    title_en: "Mouride youth facing 21st century challenges",
    desc_fr: "Comment les valeurs mourides peuvent guider la jeunesse africaine dans un monde en mutation.",
    desc_en: "How Mouride values can guide African youth in a changing world.",
    color: 'from-purple-500 to-violet-600',
    icon: 'headphones',
    coming: false,
  },
  {
    key: 'p6',
    num: '06',
    duration: '?',
    tag_fr: 'Bientôt',
    tag_en: 'Coming Soon',
    title_fr: "Touba : histoire d'une cité sainte",
    title_en: "Touba: the story of a holy city",
    desc_fr: "Episode à venir — l'histoire fascinante de la fondation de Touba en 1888.",
    desc_en: "Coming episode — the fascinating history of Touba's founding in 1888.",
    color: 'from-gray-400 to-gray-600',
    icon: 'podcast',
    coming: true,
  },
];

export default function Podcast() {
  const { lang } = useLang();

  return (
    <section id="podcast" className="py-20 lg:py-32 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">
            {lang === 'fr' ? 'Écouter & Apprendre' : 'Listen & Learn'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mt-2 mb-4">
            {lang === 'fr' ? 'Podcast Étudiant Mouride' : 'Étudiant Mouride Podcast'}
          </h2>
          <div className="w-16 h-1 bg-mouride-gold mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            {lang === 'fr'
              ? 'Des capsules audio pour comprendre le mouridisme, son histoire et ses valeurs.'
              : 'Audio capsules to understand Mouridism, its history and values.'}
          </p>
        </div>

        {/* TikTok-style vertical cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PODCASTS.map(p => (
            <div
              key={p.key}
              className={`relative rounded-2xl overflow-hidden ${p.coming ? 'opacity-60' : ''} group cursor-pointer`}
            >
              {/* Background gradient */}
              <div className={`bg-gradient-to-br ${p.color} p-6 pb-8 min-h-[280px] flex flex-col justify-between`}>
                {/* Top */}
                <div className="flex justify-between items-start">
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {lang === 'fr' ? p.tag_fr : p.tag_en}
                  </span>
                  <span className="text-white/60 text-xs">{p.duration}</span>
                </div>

                {/* Emoji big */}
                <div className="text-6xl text-center my-4 group-hover:scale-110 transition-transform duration-300">
                  {ICONS[p.icon]}
                </div>

                {/* Episode number */}
                <div>
                  <p className="text-white/50 text-xs font-mono mb-1">EP. {p.num}</p>
                  <h3 className="font-display font-bold text-white text-base leading-tight">
                    {lang === 'fr' ? p.title_fr : p.title_en}
                  </h3>
                </div>
              </div>

              {/* Bottom info */}
              <div className="bg-gray-900 px-5 py-4">
                <p className="text-gray-400 text-xs leading-relaxed">
                  {lang === 'fr' ? p.desc_fr : p.desc_en}
                </p>
                {!p.coming && (
                  <button className="mt-3 flex items-center gap-2 text-mouride-gold text-xs font-semibold hover:gap-3 transition-all">
                    <span className="w-6 h-6 bg-mouride-gold rounded-full flex items-center justify-center text-black text-xs">▶</span>
                    {lang === 'fr' ? 'Écouter' : 'Listen'}
                  </button>
                )}
                {p.coming && (
                  <p className="mt-3 text-gray-500 text-xs italic">
                    {lang === 'fr' ? '🔔 Bientôt disponible' : '🔔 Coming soon'}
                  </p>
                )}
              </div>

              {/* Coming soon overlay */}
              {p.coming && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="bg-white/20 backdrop-blur text-white text-sm font-bold px-4 py-2 rounded-full">
                    {lang === 'fr' ? 'Bientôt' : 'Coming Soon'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Subscribe */}
        <div className="mt-16 text-center bg-white/5 rounded-2xl p-8 border border-white/10">
          <p className="text-mouride-gold font-display font-bold text-xl mb-2">
            {lang === 'fr' ? '🎙️ Nouveau podcast chaque semaine' : '🎙️ New podcast every week'}
          </p>
          <p className="text-gray-400 text-sm mb-6">
            {lang === 'fr'
              ? 'Suivez-nous sur les plateformes pour ne rater aucun épisode.'
              : 'Follow us on platforms to never miss an episode.'}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { name: 'YouTube',   href: 'https://youtube.com/@etudiantmouride?si=eMrpbRMli9Da0ED5' },
              { name: 'TikTok',    href: 'https://www.tiktok.com/@etudiantmuridedigital6' },
              { name: 'Instagram', href: 'https://www.instagram.com/etudiant_mouride' },
              { name: 'Facebook',  href: 'https://www.facebook.com/share/1beKWkak9J/' },
            ].map(p => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
                className="bg-white/10 text-white text-sm px-4 py-2 rounded-full hover:bg-mouride-gold hover:text-black transition-colors">
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
