'use client'
import { useState } from 'react';
import { useLang } from '@/hooks/useLang';

const EVENTS = [
  {
    key: 'magal',
    icon: '🕌',
    month_fr: 'Safar (calendrier lunaire)',
    month_en: 'Safar (lunar calendar)',
    color: 'from-amber-500 to-amber-700',
    title_fr: 'Grand Magal de Touba',
    title_en: 'Grand Magal of Touba',
    desc_fr: "Le Grand Magal commémore le départ en exil de Cheikh Ahmadou Bamba le 21 Safar 1895. C'est le plus grand pèlerinage annuel d'Afrique de l'Ouest, rassemblant plus de 3 millions de fidèles à Touba. Institué par le 2ème Khalife Serigne Fallou en 1948.",
    desc_en: "The Grand Magal commemorates Cheikh Ahmadou Bamba's departure into exile on 21 Safar 1895. It is the largest annual pilgrimage in West Africa, gathering over 3 million faithful in Touba. Instituted by the 2nd Khalife Serigne Fallou in 1948.",
    participants: '3M+',
    since: '1948',
  },
  {
    key: 'gamou_touba',
    icon: '🌙',
    month_fr: 'Rabī al-awwal',
    month_en: "Rabi al-Awwal",
    color: 'from-emerald-500 to-emerald-700',
    title_fr: 'Gamou de Touba',
    title_en: 'Gamou of Touba',
    desc_fr: "Célébration de la naissance du Prophète Muhammad (PSL) à Touba, la cité sainte du mouridisme. Cet événement rassemble des millions de fidèles pour commémorer la naissance du Prophète et rendre hommage à Cheikh Ahmadou Bamba.",
    desc_en: "Celebration of the birth of Prophet Muhammad (PBUH) in Touba, the holy city of Mouridism. This event gathers millions of faithful to commemorate the Prophet's birth and pay tribute to Cheikh Ahmadou Bamba.",
    participants: '500K+',
    since: '1895',
  },
  {
    key: 'kazou_rajab',
    icon: '📿',
    month_fr: 'Rajab (calendrier lunaire)',
    month_en: 'Rajab (lunar calendar)',
    color: 'from-blue-500 to-blue-700',
    title_fr: 'Magal Kazou Rajab',
    title_en: 'Magal Kazou Rajab',
    desc_fr: "Dédié au 2ème Khalife Serigne Fallou Mbacké, ce Magal est célébré chaque année à Touba. Il commémore les contributions exceptionnelles de Serigne Fallou à la construction et au rayonnement de Touba.",
    desc_en: "Dedicated to the 2nd Khalife Serigne Fallou Mbacké, this Magal is celebrated annually in Touba. It commemorates Serigne Fallou's exceptional contributions to the construction and influence of Touba.",
    participants: '1M+',
    since: '1968',
  },
  {
    key: 'magal_darou_marnane',
    icon: '🏛️',
    month_fr: 'Mouharram',
    month_en: 'Muharram',
    color: 'from-purple-500 to-purple-700',
    title_fr: 'Magal de Darou Marnane',
    title_en: 'Magal of Darou Marnane',
    desc_fr: "Commémore le retour d'exil du Gabon de Cheikh Ahmadou Bamba en 1902. Darou Marnane, fondé par Mame Thierno sur recommandation du Cheikh, fut sa résidence de 1902 à 1903 avant sa déportation en Mauritanie.",
    desc_en: "Commemorates Cheikh Ahmadou Bamba's return from exile in Gabon in 1902. Darou Marnane, founded by Mame Thierno on the Sheikh's recommendation, was his residence from 1902 to 1903 before his deportation to Mauritania.",
    participants: '300K+',
    since: '1902',
  },
  {
    key: 'magal_darou_mousty',
    icon: '✨',
    month_fr: 'Dhul Hijja',
    month_en: 'Dhul Hijja',
    color: 'from-teal-500 to-teal-700',
    title_fr: 'Magal de Darou Mousty',
    title_en: 'Magal of Darou Mousty',
    desc_fr: "Darou Mousty, fondée en 1912 par Mame Thierno Birahim Mbacké sur instruction de son frère Cheikh Ahmadou Bamba. Ce Magal annuel rassemble les fidèles dans cette ville religieuse mouride située dans la région de Louga.",
    desc_en: "Darou Mousty, founded in 1912 by Mame Thierno Birahim Mbacké on instruction from his brother Cheikh Ahmadou Bamba. This annual Magal gathers the faithful in this Mouride religious city in the Louga region.",
    participants: '400K+',
    since: '1912',
  },
  {
    key: 'ziarra_touba',
    icon: '💚',
    month_fr: 'Toute l\'année',
    month_en: 'Year-round',
    color: 'from-green-600 to-green-800',
    title_fr: 'Ziarra (Pèlerinage) à Touba',
    title_en: 'Ziarra (Pilgrimage) to Touba',
    desc_fr: "La Ziarra désigne la visite pieuse à Touba, capitale spirituelle du mouridisme. Des millions de fidèles s'y rendent tout au long de l'année pour se recueillir sur la tombe de Cheikh Ahmadou Bamba à la Grande Mosquée.",
    desc_en: "The Ziarra refers to the pious visit to Touba, the spiritual capital of Mouridism. Millions of faithful visit throughout the year to pray at the tomb of Cheikh Ahmadou Bamba at the Grand Mosque.",
    participants: '5M+/an',
    since: '1927',
  },
];

export default function Evenements() {
  const { lang } = useLang();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="evenements" className="py-20 lg:py-32 bg-mouride-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">
            {lang === 'fr' ? 'Célébrations' : 'Celebrations'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-mouride-green mt-2 mb-4">
            {lang === 'fr' ? 'Grands Événements Mourides' : 'Major Mouride Events'}
          </h2>
          <div className="w-16 h-1 bg-mouride-gold mx-auto rounded-full mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            {lang === 'fr'
              ? 'Les grandes célébrations qui rythment la vie spirituelle de la communauté mouride à travers le monde.'
              : 'The major celebrations that mark the spiritual life of the Mouride community around the world.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map(ev => (
            <div
              key={ev.key}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setActive(active === ev.key ? null : ev.key)}
            >
              <div className={`bg-gradient-to-r ${ev.color} p-6 text-white`}>
                <div className="flex justify-between items-start">
                  <span className="text-4xl">{ev.icon}</span>
                  <div className="text-right">
                    <p className="text-white/70 text-xs">{lang === 'fr' ? 'Depuis' : 'Since'}</p>
                    <p className="text-white font-bold">{ev.since}</p>
                  </div>
                </div>
                <h3 className="font-display font-bold text-xl mt-4">
                  {lang === 'fr' ? ev.title_fr : ev.title_en}
                </h3>
                <p className="text-white/80 text-xs mt-1">
                  {lang === 'fr' ? ev.month_fr : ev.month_en}
                </p>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-mouride-gold font-bold text-lg">{ev.participants}</span>
                  <span className="text-gray-500 text-sm">
                    {lang === 'fr' ? 'fidèles' : 'faithful'}
                  </span>
                </div>
                {active === ev.key && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {lang === 'fr' ? ev.desc_fr : ev.desc_en}
                  </p>
                )}
                <button className="text-mouride-gold text-xs font-semibold mt-2">
                  {active === ev.key
                    ? (lang === 'fr' ? '▲ Moins' : '▲ Less')
                    : (lang === 'fr' ? '▼ En savoir plus' : '▼ Learn more')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
