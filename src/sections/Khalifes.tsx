'use client'
import { useState } from 'react';
import { useLang } from '@/hooks/useLang';

const KHALIFES = [
  {
    num: 1,
    name: 'Serigne Mouhamadou Moustapha Mbacké',
    years: '1927 – 1945',
    born: '1888',
    title_fr: 'Le Gardien du Temple',
    title_en: 'The Guardian of the Temple',
    desc_fr: "Fils aîné de Cheikh Ahmadou Bamba, né à Darou Salam. Premier successeur, il s'illustra en transférant le Cheikh à sa dernière demeure à Touba et en jouant le rôle de père rassembleur. Il initia la construction du chemin de fer reliant Diourbel à Touba pour faciliter le transport des matériaux de la Grande Mosquée.",
    desc_en: "Eldest son of Cheikh Ahmadou Bamba, born in Darou Salam. First successor, he distinguished himself by transferring the Sheikh to his final resting place in Touba and playing the role of unifying father. He initiated the construction of the railway linking Diourbel to Touba to facilitate transport of materials for the Grand Mosque.",
    legacy_fr: 'Construction du chemin de fer Diourbel-Touba',
    legacy_en: 'Construction of the Diourbel-Touba railway',
    color: 'bg-amber-700',
  },
  {
    num: 2,
    name: 'Serigne Fallou Mbacké',
    years: '1945 – 1968',
    born: '1888',
    title_fr: 'Le Visionnaire',
    title_en: 'The Visionary',
    desc_fr: "Deuxième Khalife, il est l'architecte de la modernisation de Touba. Il acheva et inaugura la Grande Mosquée de Touba le 7 juin 1963. C'est lui qui institua la tradition du Grand Magal à Touba en 1948, demandant à toute la communauté de s'y rendre pour célébrer le départ en exil du Cheikh.",
    desc_en: "Second Khalife, he is the architect of Touba's modernization. He completed and inaugurated the Grand Mosque of Touba on June 7, 1963. He instituted the tradition of the Grand Magal in Touba in 1948, asking the entire community to gather there to commemorate the Sheikh's departure into exile.",
    legacy_fr: 'Inauguration de la Grande Mosquée de Touba (1963)',
    legacy_en: 'Inauguration of the Grand Mosque of Touba (1963)',
    color: 'bg-emerald-700',
  },
  {
    num: 3,
    name: 'Cheikh Abdoul Ahad Mbacké',
    years: '1968 – 1989',
    born: '1914',
    title_fr: 'Le Bâtisseur',
    title_en: 'The Builder',
    desc_fr: "Troisième Khalife, né à Diourbel. Grand bâtisseur, il transforma Touba en une cité moderne : lotissement, circulation lors du Magal, approvisionnement en eau, extension de la Grande Mosquée, bibliothèque équipée. Il développa le commerce mouride et l'agriculture.",
    desc_en: "Third Khalife, born in Diourbel. A great builder, he transformed Touba into a modern city: city planning, Magal traffic management, water supply, extension of the Grand Mosque, equipped library. He developed Mouride commerce and agriculture.",
    legacy_fr: 'Modernisation et développement urbain de Touba',
    legacy_en: 'Modernization and urban development of Touba',
    color: 'bg-blue-700',
  },
  {
    num: 4,
    name: 'Serigne Abdoul Khadir Mbacké',
    years: '1989 – 1990',
    born: '1914',
    title_fr: 'Le Serviteur',
    title_en: 'The Servant',
    desc_fr: "Quatrième Khalife, il régna seulement 11 mois avant d'être rappelé à Dieu le 18 mai 1990. Homme d'une grande dévotion, il avait vécu 75 ans — exactement comme son père Cheikh Ahmadou Bamba. Sa vie fut marquée par l'obéissance et le service désintéressé.",
    desc_en: "Fourth Khalife, he reigned for only 11 months before passing away on May 18, 1990. A man of great devotion, he lived 75 years — exactly like his father Cheikh Ahmadou Bamba. His life was marked by obedience and selfless service.",
    legacy_fr: "Symbole de dévotion et d'obéissance",
    legacy_en: 'Symbol of devotion and obedience',
    color: 'bg-purple-700',
  },
  {
    num: 5,
    name: 'Cheikh Saliou Mbacké',
    years: '1990 – 2007',
    born: '1915',
    title_fr: 'Le Pilier',
    title_en: 'The Pillar',
    desc_fr: "Cinquième Khalife et dernier fils de Cheikh Ahmadou Bamba à avoir exercé le khalifat. Né à Diourbel en 1915, il mena une vie d'ascétisme et de travail. Sous son magistère, il développa d'importants projets agricoles et rénova la mosquée de Touba. Rappelé à Dieu en 2007.",
    desc_en: "Fifth Khalife and last son of Cheikh Ahmadou Bamba to serve as Khalife. Born in Diourbel in 1915, he led a life of asceticism and work. During his tenure, he developed important agricultural projects and renovated Touba's mosque. Passed away in 2007.",
    legacy_fr: 'Projets agricoles et rénovation de la mosquée',
    legacy_en: 'Agricultural projects and mosque renovation',
    color: 'bg-rose-700',
  },
  {
    num: 6,
    name: 'Serigne Mouhammadou Lamine Bara Mbacké',
    years: '2007 – 2010',
    born: '1925',
    title_fr: 'Le Premier Petit-fils',
    title_en: 'The First Grandson',
    desc_fr: "Sixième Khalife, il fut le premier petit-fils de Cheikh Ahmadou Bamba à exercer le khalifat. Fils de Serigne Fallou Mbacké, né à Touba en 1925. Il porta dignement l'héritage de son grand-père avant d'être rappelé à Dieu en 2010.",
    desc_en: "Sixth Khalife, he was the first grandson of Cheikh Ahmadou Bamba to serve as Khalife. Son of Serigne Fallou Mbacké, born in Touba in 1925. He carried his grandfather's legacy with dignity before passing away in 2010.",
    legacy_fr: 'Continuité et transmission de l\'héritage',
    legacy_en: "Continuity and transmission of the heritage",
    color: 'bg-teal-700',
  },
  {
    num: 7,
    name: 'Serigne Sidy Mokhtar Mbacké',
    years: '2010 – 2018',
    born: '1924',
    title_fr: 'Le Réformateur',
    title_en: 'The Reformer',
    desc_fr: "Septième Khalife, né en 1924. Grand soufi et partisan d'un islam rigoureux. Il augmenta les minarets de la Grande Mosquée de 5 à 7, développa les travaux de la mosquée Massalikoul Djinane et initia le projet d'université Cheikh Ahmadou Bamba. Rappelé à Dieu en 2018.",
    desc_en: "Seventh Khalife, born in 1924. Great Sufi and advocate of rigorous Islam. He increased the Grand Mosque's minarets from 5 to 7, developed the Massalikoul Djinane mosque, and initiated the Cheikh Ahmadou Bamba University project. Passed away in 2018.",
    legacy_fr: 'Extension de la Grande Mosquée et université islamique',
    legacy_en: 'Extension of the Grand Mosque and Islamic university',
    color: 'bg-indigo-700',
  },
  {
    num: 8,
    name: 'Serigne Mountakha Bassirou Mbacké',
    years: '2018 – présent',
    born: '1933',
    title_fr: 'L\'Éducateur',
    title_en: 'The Educator',
    desc_fr: "Huitième et actuel Khalife Général des Mourides depuis le 10 janvier 2018. Né à Darou Kayel en 1933, fils de Serigne Bassirou Mbacké. A placé son magistère sous le signe de l'éducation et de la connaissance. Porta le projet d'université islamique et renforça les liens de la communauté mouride mondiale.",
    desc_en: "Eighth and current Khalife General of the Mourides since January 10, 2018. Born in Darou Kayel in 1933, son of Serigne Bassirou Mbacké. Placed his leadership under the sign of education and knowledge. Pursued the Islamic university project and strengthened ties of the global Mouride community.",
    legacy_fr: 'Éducation, connaissance et université islamique',
    legacy_en: 'Education, knowledge and Islamic university',
    color: 'bg-mouride-green',
    current: true,
  },
];

export default function Khalifes() {
  const { lang } = useLang();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="khalifes" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">
            {lang === 'fr' ? 'Chronologie' : 'Timeline'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-mouride-green mt-2 mb-4">
            {lang === 'fr' ? 'Les Khalifes de Serigne Touba' : 'The Khalifes of Serigne Touba'}
          </h2>
          <div className="w-16 h-1 bg-mouride-gold mx-auto rounded-full mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            {lang === 'fr'
              ? 'De 1927 à nos jours, 8 Khalifes Généraux ont perpétué l\'héritage de Cheikh Ahmadou Bamba.'
              : 'From 1927 to today, 8 Khalifes General have perpetuated the legacy of Cheikh Ahmadou Bamba.'}
          </p>
        </div>

        {/* Timeline desktop */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-mouride-gold h-full rounded-full hidden lg:block" />
          <div className="space-y-8">
            {KHALIFES.map((k, i) => (
              <div key={k.num} className={`flex flex-col lg:flex-row items-center gap-6 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Card */}
                <div
                  className={`w-full lg:w-5/12 bg-white rounded-2xl shadow-md border border-gray-100 p-6 cursor-pointer hover:shadow-lg transition-all duration-300 ${selected === k.num ? 'ring-2 ring-mouride-gold' : ''}`}
                  onClick={() => setSelected(selected === k.num ? null : k.num)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${k.color} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                      {k.num}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-mouride-gold text-xs font-semibold uppercase tracking-wide">
                            {lang === 'fr' ? k.title_fr : k.title_en}
                            {k.current && <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">{lang === 'fr' ? 'Actuel' : 'Current'}</span>}
                          </p>
                          <h3 className="font-display font-bold text-mouride-green text-base mt-1">{k.name}</h3>
                        </div>
                        <span className="text-gray-400 text-xs whitespace-nowrap ml-2">{k.years}</span>
                      </div>
                      {selected === k.num && (
                        <div className="mt-4">
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {lang === 'fr' ? k.desc_fr : k.desc_en}
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-mouride-gold">✦</span>
                            <p className="text-mouride-green text-sm font-semibold">
                              {lang === 'fr' ? k.legacy_fr : k.legacy_en}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Center dot */}
                <div className={`hidden lg:flex w-2/12 justify-center`}>
                  <div className={`w-5 h-5 rounded-full border-4 border-white shadow-md ${k.color}`} />
                </div>
                {/* Year label */}
                <div className="hidden lg:block w-5/12 text-center">
                  <span className="text-mouride-green font-display font-bold text-2xl">{k.years.split('–')[0].trim()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
