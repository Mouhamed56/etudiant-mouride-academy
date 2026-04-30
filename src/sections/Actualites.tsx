'use client'
import { useState } from 'react';
import { useLang } from '@/hooks/useLang';

const ACTUS = [
  {
    key: 'a1',
    date_fr: '18 Safar 1446H — 2025',
    date_en: '18 Safar 1446H — 2025',
    cat_fr: 'Grand Magal',
    cat_en: 'Grand Magal',
    title_fr: 'Grand Magal de Touba 2025 : des millions de fidèles à la cité sainte',
    title_en: 'Grand Magal of Touba 2025: millions of faithful in the holy city',
    desc_fr: "Le Grand Magal de Touba 2025 a rassemblé des millions de fidèles venus du monde entier pour commémorer le départ en exil de Cheikh Ahmadou Bamba. La célébration s'est déroulée dans la ferveur et le recueillement.",
    desc_en: "The Grand Magal of Touba 2025 gathered millions of faithful from around the world to commemorate Cheikh Ahmadou Bamba's departure into exile. The celebration took place in fervor and devotion.",
    color: 'bg-amber-500',
    icon: '🕌',
  },
  {
    key: 'a2',
    date_fr: 'Mars 2026',
    date_en: 'March 2026',
    cat_fr: 'Étudiant Mouride',
    cat_en: 'Étudiant Mouride',
    title_fr: 'Lancement de la plateforme Étudiant Mouride',
    title_en: 'Launch of the Étudiant Mouride platform',
    desc_fr: "Lancement officiel de la plateforme numérique Étudiant Mouride, dédiée à la transmission de la pensée de Cheikh Ahmadou Bamba à la jeunesse. La plateforme propose des contenus éducatifs en français et en anglais.",
    desc_en: "Official launch of the Étudiant Mouride digital platform, dedicated to transmitting the thought of Cheikh Ahmadou Bamba to youth. The platform offers educational content in French and English.",
    color: 'bg-emerald-600',
    icon: '🚀',
  },
  {
    key: 'a3',
    date_fr: '2025',
    date_en: '2025',
    cat_fr: 'Culture',
    cat_en: 'Culture',
    title_fr: "Publication : Le Leadership de Cheikh Ahmadou Bamba",
    title_en: "Publication: The Leadership of Cheikh Ahmadou Bamba",
    desc_fr: "Mouhamed Sène publie son ouvrage sur le leadership de Cheikh Ahmadou Bamba, aux éditions Ganndal Afrik. Un livre qui explore les principes de leadership éthique et spirituel tirés des enseignements du Cheikh.",
    desc_en: "Mouhamed Sène publishes his book on the leadership of Cheikh Ahmadou Bamba, at Ganndal Afrik editions. A book that explores the principles of ethical and spiritual leadership drawn from the Sheikh's teachings.",
    color: 'bg-blue-600',
    icon: '📖',
  },
  {
    key: 'a4',
    date_fr: '10 janvier 2018',
    date_en: 'January 10, 2018',
    cat_fr: 'Khalifat',
    cat_en: 'Khalifate',
    title_fr: 'Serigne Mountakha Mbacké, 8ème Khalife Général des Mourides',
    title_en: 'Serigne Mountakha Mbacké, 8th Khalife General of the Mourides',
    desc_fr: "Le 10 janvier 2018, Serigne Mountakha Bassirou Mbacké est devenu le 8ème Khalife Général des Mourides, succédant à Serigne Sidy Mokhtar Mbacké. Il a placé son magistère sous le signe de l'éducation et de la connaissance.",
    desc_en: "On January 10, 2018, Serigne Mountakha Bassirou Mbacké became the 8th Khalife General of the Mourides, succeeding Serigne Sidy Mokhtar Mbacké. He placed his leadership under the sign of education and knowledge.",
    color: 'bg-green-700',
    icon: '✨',
  },
  {
    key: 'a5',
    date_fr: '2019',
    date_en: '2019',
    cat_fr: 'Architecture',
    cat_en: 'Architecture',
    title_fr: 'Inauguration de la Mosquée Massalikoul Jinaane à Dakar',
    title_en: 'Inauguration of the Massalikoul Jinaane Mosque in Dakar',
    desc_fr: "Inauguration de la grande mosquée Massalikoul Jinaane à Dakar en 2019, un chef-d'œuvre architectural mouride. Cette mosquée, dont la construction a duré plusieurs décennies, est devenue l'un des plus grands lieux de culte du Sénégal.",
    desc_en: "Inauguration of the grand Massalikoul Jinaane mosque in Dakar in 2019, a Mouride architectural masterpiece. This mosque, whose construction spanned several decades, became one of the largest places of worship in Senegal.",
    color: 'bg-teal-600',
    icon: '🏛️',
  },
  {
    key: 'a6',
    date_fr: 'Bientôt',
    date_en: 'Coming soon',
    cat_fr: 'Étudiant Mouride',
    cat_en: 'Étudiant Mouride',
    title_fr: 'Podcast Étudiant Mouride — Saison 1',
    title_en: 'Étudiant Mouride Podcast — Season 1',
    desc_fr: "Lancement prochain de la première saison du podcast Étudiant Mouride avec des épisodes hebdomadaires sur la pensée mouride, son histoire et ses valeurs.",
    desc_en: "Upcoming launch of the first season of the Étudiant Mouride podcast with weekly episodes on Mouride thought, its history and values.",
    color: 'bg-purple-600',
    icon: '🎙️',
    coming: true,
  },
];

export default function Actualites() {
  const { lang } = useLang();
  const [filter, setFilter] = useState<string>('all');

  const cats = ['all', 'Grand Magal', 'Étudiant Mouride', 'Culture', 'Khalifat', 'Architecture'];
  const filtered = filter === 'all' ? ACTUS : ACTUS.filter(a => (lang === 'fr' ? a.cat_fr : a.cat_en) === filter || a.cat_fr === filter);

  return (
    <section id="actualites" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">
            {lang === 'fr' ? 'Nouvelles' : 'News'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-mouride-green mt-2 mb-4">
            {lang === 'fr' ? 'Actualités Mourides' : 'Mouride News'}
          </h2>
          <div className="w-16 h-1 bg-mouride-gold mx-auto rounded-full mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            {lang === 'fr'
              ? 'Les dernières nouvelles de la communauté mouride et du projet Étudiant Mouride.'
              : 'The latest news from the Mouride community and the Étudiant Mouride project.'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap justify-center mb-10">
          {cats.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                filter === cat
                  ? 'bg-mouride-green text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? (lang === 'fr' ? 'Tout' : 'All') : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(a => (
            <div key={a.key} className={`bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all ${a.coming ? 'opacity-70' : ''}`}>
              <div className={`${a.color} p-5 flex items-center gap-3`}>
                <span className="text-3xl">{a.icon}</span>
                <div>
                  <span className="text-white/80 text-xs">{lang === 'fr' ? a.cat_fr : a.cat_en}</span>
                  <p className="text-white text-xs font-semibold">{lang === 'fr' ? a.date_fr : a.date_en}</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-mouride-green text-base leading-tight mb-3">
                  {lang === 'fr' ? a.title_fr : a.title_en}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {lang === 'fr' ? a.desc_fr : a.desc_en}
                </p>
                {a.coming && (
                  <span className="mt-3 inline-block text-xs text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full">
                    {lang === 'fr' ? '🔔 Bientôt' : '🔔 Coming soon'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
