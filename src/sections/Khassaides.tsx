'use client'
import { useState } from 'react'
import { useLang } from '@/hooks/useLang'

interface Khassaide {
  key: string
  arabic: string
  title_fr: string
  title_en: string
  lieu_fr: string
  lieu_en: string
  context_fr: string
  context_en: string
  verses: { ar: string; tr: string; fr: string; en: string }[]
  color: string
}

const KHASSAIDES: Khassaide[] = [
  { key:'minal_haqqi', arabic:'مِنَ الْحَقِّ', title_fr:'Minal Haqqi', title_en:'Minal Haqqi', lieu_fr:'Écrit à Thieyene Djolof', lieu_en:'Written at Thieyene Djolof', context_fr:"Composé durant sa résidence surveillée à Thieyene Djolof (1907-1912), ce poème est une profession de foi ardente où Cheikh Ahmadou Bamba affirme que la Vérité divine transcende toute épreuve humaine.", context_en:"Composed during his house arrest at Thieyene Djolof (1907-1912), this poem is an ardent profession of faith where Cheikh Ahmadou Bamba affirms that divine Truth transcends all human trials.", verses:[{ar:'مِنَ الْحَقِّ جَاءَ الْحَقُّ لِلْحَقِّ فِي الصَّحْبِ',tr:'minal haqqi jaa-al haqqu lil haqqi fis sahbi',fr:"La vérité est venue de la Vérité, elle vient aussi pour la vérité aux sahabas",en:"Truth came from Truth, it also comes for truth to the companions"},{ar:'بِحَقٍّ مُبِينٍ لَا يُعَانِيهِ مِنْ صَعْبِ',tr:'bihaqąin mubiinin laa yuhaaniihi min sahbi',fr:"pour la vérité évidente exempte d'erreur.",en:"for the evident truth free from error."},{ar:'كِتَابٌ بِهِ نَرْجُو مِنَ اللَّهِ رَحْمَةً',tr:'kitaabun bihi narjuu minal laahi rahmatan',fr:"Nous espérons obtenir miséricorde à travers ce Livre,",en:"We hope to obtain mercy through this Book,"},{ar:'وَتَنْجُو بِهِ دُنْيَا وَأَخْرَى مِنَ الْكَرْبِ',tr:'wa nanjuu bihi dunyaa wa ukhraa minal karbi',fr:"et par sa grâce, nous serons protégés contre les tourments des deux mondes.",en:"and through its grace, we will be protected from the torments of both worlds."}], color:'from-emerald-900 to-emerald-700' },
  { key:'assirou', arabic:'أَسِيرُ', title_fr:'Assirou', title_en:'Assirou', lieu_fr:'Écrit sur la route vers le Gabon (1895)', lieu_en:'Written on the road to Gabon (1895)', context_fr:"Composé lors du départ forcé en exil au Gabon en 1895, ce Khassida est un témoignage de la sérénité du Cheikh face à l'injustice coloniale.", context_en:"Composed during the forced departure into exile in Gabon in 1895, this Khassida testifies to the Sheikh's serenity in the face of colonial injustice.", verses:[{ar:'أَسِيرُ مَعَ الْأَبْرَارِ حِينَ أَسِيرُ',tr:'asiiru mahal abraari hiina asiiru',fr:"Je cheminais en vérité, lors de ma marche vers l'Exil, en compagnie des Vertueux",en:"I walked in truth, on my march toward Exile, in the company of the Virtuous"},{ar:'وَظَنَّ الْعِدَى أَنِّى هُنَاكَ أَسِيرٌ',tr:'wa zannal hidaa annii hunaaka asiiru',fr:"alors que mes persécuteurs étaient persuadés que j'étais leur prisonnier...",en:"while my persecutors were convinced that I was their prisoner..."}], color:'from-amber-900 to-amber-700' },
  { key:'alaa_innanii', arabic:'أَلَا إِنَّنِي أُثْنِي', title_fr:'Alaa Innanii Usnii', title_en:'Alaa Innanii Usnii', lieu_fr:"Période d'exil", lieu_en:'Exile period', context_fr:"Ce Khassida exprime la gratitude et la dignité du Cheikh durant l'exil.", context_en:"This Khassida expresses the Sheikh's gratitude and dignity during exile.", verses:[{ar:'أَلَا إِنَّنِي أُثْنِي عَلَى خَيْرِ مُنْعِمِ',tr:'alaa innanii usnii halaa khayri munhimi',fr:"Je fais certainement l'éloge du meilleur bienfaiteur",en:"I certainly praise the best benefactor"},{ar:'وَلَا أَشْتَكِى لِلْخَلْقِ مِنْ فَقْدِ أَنْعُمِ',tr:'walaa ashtakii lil khalqi min faqdi anhumi',fr:"et je ne me plains jamais aux créatures du manque de faveurs.",en:"and I never complain to creatures of the lack of blessings."}], color:'from-blue-900 to-blue-700' },
  { key:'matlabou_shifai', arabic:'مَطْلَبُ الشِّفَاءِ', title_fr:'Matlabou Shifai', title_en:'Matlabou Shifai', lieu_fr:"Période d'exil", lieu_en:'Exile period', context_fr:"Ce Khassida est une supplication demandant la guérison divine.", context_en:"This Khassida is a supplication seeking divine healing.", verses:[{ar:'حَمْدًا لِمُنْزِلِ الضَّنَى وَالدَّاءِ',tr:'hamdan limunzilid danaa wad daa-i',fr:"La louange revient à Dieu Qui fait descendre le dépérissement",en:"Praise be to God Who sends down the wasting"},{ar:'وَمُنْزِلِ الشِّفَاءِ وَالدَّوَاءِ',tr:'wa munzilish shifaa-i wad dawaa-i',fr:"et la maladie, et qui a aussi révélé le remède.",en:"and disease, who also revealed the remedy."}], color:'from-purple-900 to-purple-700' },
  { key:'matlaboul_fawzeyni', arabic:'مَطْلَبُ الْفَوْزَيْنِ', title_fr:'Matlaboul Fawzeyni', title_en:'Matlaboul Fawzeyni', lieu_fr:"Exil en Mauritanie (1903-1907)", lieu_en:'Exile in Mauritania (1903-1907)', context_fr:"La quête des deux bonheurs — celui de ce monde et de l'au-delà.", context_en:"The quest for two happinesses — in this world and the hereafter.", verses:[{ar:'الْحَمْدُ لِلَّهِ الْكَرِيمِ ذِي الْمِنَنْ',tr:'al hamdu lil laahil kariimi zil minan',fr:"Louange à DIEU, le Généreux et Maître des Bienfaits",en:"Praise be to GOD, the Generous Master of Blessings"},{ar:'عَلَى اشْتِغَالِي بِفُرُوضِي وَسُنَنْ',tr:'halash tighaa lii bifuruudin wa suunan',fr:"à travers ce qui est obligatoire et ce qui est surérogatoire.",en:"through what is obligatory and what is supererogatory."}], color:'from-teal-900 to-teal-700' },
  { key:'jazb', arabic:'جَذْبُ الْقُلُوبِ', title_fr:'Jazb Al Qouloub', title_en:'Jazb Al Qouloub', lieu_fr:'Période de Diourbel (1912-1927)', lieu_en:'Diourbel period (1912-1927)', context_fr:"L'attraction des cœurs vers la présence divine. Composé à Diourbel où le Cheikh fut assigné à résidence.", context_en:"The attraction of hearts toward divine presence. Composed in Diourbel where the Sheikh was placed under house arrest.", verses:[{ar:'جَذْبُ الْقُلُوبِ إِلَى حَضْرَةِ الرَّبِّ',tr:'jazb al-quloubi ilaa hadrati rabb',fr:"L'attraction des cœurs vers la présence du Seigneur",en:"The attraction of hearts toward the presence of the Lord"},{ar:'وَنَيْلُ الْقُرْبِ مِنَ الرَّبِّ',tr:'wa nayl al-qurbi min ar-rabb',fr:"Et l'obtention de la proximité du Seigneur",en:"And attaining closeness to the Lord"}], color:'from-rose-900 to-rose-700' },
]

export default function Khassaides() {
  const { lang } = useLang()
  const [selected, setSelected] = useState<Khassaide | null>(null)

  return (
    <section id="khassaides" className="py-20 lg:py-32 bg-mouride-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">
            {lang === 'fr' ? 'Patrimoine Spirituel' : 'Spiritual Heritage'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mt-2 mb-4">
            {lang === 'fr' ? 'Quelques Qassida Expliquées' : 'Some Explained Qassida'}
          </h2>
          <div className="w-16 h-1 bg-mouride-gold mx-auto rounded-full mb-6" />
          <p className="text-green-200 mt-4 max-w-2xl mx-auto text-lg">
            {lang === 'fr'
              ? 'Extraits des poèmes spirituels de Cheikh Ahmadou Bamba avec transcription et traduction.'
              : 'Excerpts from the spiritual poems of Cheikh Ahmadou Bamba with transcription and translation.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {KHASSAIDES.map((k, idx) => (
            <div key={k.key}
              className={`bg-gradient-to-br ${k.color} rounded-2xl p-6 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 shadow-lg border border-white/10`}
              onClick={() => setSelected(selected?.key === k.key ? null : k)}>
              <div className="flex justify-between items-start mb-4">
                <span className="text-mouride-gold text-xs font-bold bg-black/20 px-2 py-1 rounded-full">
                  {idx + 1}. {lang === 'fr' ? k.title_fr : k.title_en}
                </span>
              </div>
              <p className="text-2xl font-display text-white mb-3 text-right leading-relaxed" dir="rtl">{k.arabic}</p>
              <p className="text-white/80 text-xs italic mb-2">{k.verses[0].tr}</p>
              <p className="text-white/60 text-xs">{lang === 'fr' ? k.lieu_fr : k.lieu_en}</p>
              <div className="mt-4 flex justify-end">
                <span className="text-mouride-gold text-xs">
                  {selected?.key === k.key
                    ? (lang === 'fr' ? '▲ Fermer' : '▲ Close')
                    : (lang === 'fr' ? '▼ Voir les vers' : '▼ See verses')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-mouride-gold">
                  {lang === 'fr' ? selected.title_fr : selected.title_en}
                </h3>
                <p className="text-green-300 text-sm mt-1">
                  {lang === 'fr' ? selected.lieu_fr : selected.lieu_en}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/60 hover:text-white text-2xl">✕</button>
            </div>
            <p className="text-green-100 mb-6 leading-relaxed text-sm">
              {lang === 'fr' ? selected.context_fr : selected.context_en}
            </p>
            <div className="space-y-4">
              <h4 className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">
                {lang === 'fr' ? 'Extraits & Traduction' : 'Excerpts & Translation'}
              </h4>
              {selected.verses.map((v, i) => (
                <div key={i} className="bg-black/20 rounded-xl p-4">
                  <p className="text-white text-lg text-right font-display mb-1" dir="rtl">{v.ar}</p>
                  <p className="text-mouride-gold/80 text-xs italic mb-1">{v.tr}</p>
                  <p className="text-green-200 text-sm">{lang === 'fr' ? v.fr : (v.en || v.fr)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}