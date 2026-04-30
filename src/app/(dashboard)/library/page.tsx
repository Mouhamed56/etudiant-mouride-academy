'use client'
import { useAppStore } from '@/store/useAppStore'

const RESOURCES = [
  { type: 'pdf', title: 'Guide du Mouridisme', file: '/pdf/guide-mouridisme.pdf', size: '2.1 MB' },
  { type: 'pdf', title: "Les Bienfaits de l'Éternel", file: '/pdf/bienfaits-eternel.pdf', size: '3.4 MB' },
  { type: 'pdf', title: 'Les Khassaïdes de Serigne Touba', file: '/pdf/khassaides-serigne-touba.pdf', size: '1.8 MB' },
  { type: 'pdf', title: 'Diazbul Mouride', file: '/pdf/diazbul-mourid.pdf', size: '1.2 MB' },
  { type: 'pdf', title: 'Le Leadership de Cheikh Ahmadou Bamba', file: '/pdf/leadership-cheikh-ahmadou-bamba.pdf', size: '2.5 MB' },
  { type: 'audio', title: 'Ajabani', file: '/son/ajabani.mp3', duration: '8 min' },
  { type: 'audio', title: 'Matlabul Fawzayni', file: '/son/Matlabul_Fawzayni_Kurel_1_National_HTDKH_Laylatul_Qadr_2025M4A_128K.m4a', duration: '12 min' },
  { type: 'audio', title: 'Chahrou Ramadan', file: '/son/chahrou-ramadan.mp3', duration: '15 min' },
]

export default function LibraryPage() {
  const { lang } = useAppStore()
  const pdfs   = RESOURCES.filter(r => r.type === 'pdf')
  const audios = RESOURCES.filter(r => r.type === 'audio')

  return (
    <div className="max-w-4xl animate-fade-in">
      <h1 className="text-3xl font-display font-bold text-mouride-green mb-8">
        {lang === 'en' ? 'Library' : 'Bibliothèque'}
      </h1>

      <section className="mb-8">
        <h2 className="text-lg font-display font-bold text-mouride-green mb-4">📄 PDFs</h2>
        <div className="grid gap-3">
          {pdfs.map((r, i) => (
            <div key={i} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-mouride-cream rounded-lg flex items-center justify-center text-mouride-green font-bold text-xs">PDF</div>
                <div>
                  <p className="font-medium text-sm text-gray-800">{r.title}</p>
                  <p className="text-xs text-gray-400">{r.size}</p>
                </div>
              </div>
              <a href={r.file} download className="btn-primary py-2 px-4 text-xs">
                {lang === 'en' ? 'Download' : 'Télécharger'}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-display font-bold text-mouride-green mb-4">🎵 Audio Khassaïdes</h2>
        <div className="grid gap-3">
          {audios.map((r, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-mouride-green rounded-lg flex items-center justify-center text-mouride-gold text-lg">♪</div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{r.title}</p>
                    <p className="text-xs text-gray-400">{r.duration}</p>
                  </div>
                </div>
              </div>
              <audio controls className="w-full h-10"><source src={r.file} /></audio>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
