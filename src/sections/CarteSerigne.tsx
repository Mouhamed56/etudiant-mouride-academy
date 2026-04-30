'use client'
import { useState, useEffect } from 'react'
import { useLang } from '@/hooks/useLang'

interface Lieu {
  id: string
  nom: string
  pays: string
  flag: string
  lat: number
  lng: number
  categorie: 'origine' | 'exil_afrique' | 'gabon' | 'mauritanie' | 'residence'
  description_fr: string
  description_en: string
  annee?: string
  color: string
}

const LIEUX: Lieu[] = [
  // Sénégal - Origines
  { id:'mbacke-baol', nom:'Mbacké Baol', pays:'Sénégal', flag:'🇸🇳', lat:14.8031, lng:-15.9102, categorie:'origine', color:'#166534', annee:'1853', description_fr:'Ville de naissance de Cheikh Ahmadou Bamba (1853). Berceau du mouridisme.', description_en:'Birthplace of Cheikh Ahmadou Bamba (1853). Cradle of Mouridism.' },
  { id:'mbacke-cayor', nom:'Mbacké Cayor', pays:'Sénégal', flag:'🇸🇳', lat:14.9200, lng:-15.8500, categorie:'origine', color:'#166534', description_fr:'Résidence d\'enseignement de Cheikh Bamba. Centre intellectuel et spirituel.', description_en:'Teaching residence of Cheikh Bamba. Intellectual and spiritual center.' },
  { id:'darou-salam', nom:'Darou Salam', pays:'Sénégal', flag:'🇸🇳', lat:14.7500, lng:-15.8800, categorie:'origine', color:'#166534', annee:'1883', description_fr:'Première cité fondée par Cheikh Ahmadou Bamba après le décès de son père.', description_en:'First city founded by Cheikh Ahmadou Bamba after his father\'s death.' },
  { id:'touba', nom:'Touba', pays:'Sénégal', flag:'🇸🇳', lat:14.8500, lng:-15.8800, categorie:'origine', color:'#D4B558', annee:'1888', description_fr:'Cité sainte du mouridisme, fondée en 1888. Lieu d\'inhumation de Cheikh Bamba. Capitale spirituelle mondiale des Mourides.', description_en:'Holy city of Mouridism, founded in 1888. Burial place of Cheikh Bamba. Spiritual world capital of the Mourides.' },
  { id:'darou-marnane', nom:'Darou Marnane', pays:'Sénégal', flag:'🇸🇳', lat:14.8200, lng:-15.7900, categorie:'origine', color:'#166534', annee:'1902', description_fr:'Centre d\'enseignement et de dévotion. Résidence du Cheikh après son retour du Gabon (1902-1903).', description_en:'Teaching and devotion center. Sheikh\'s residence after return from Gabon (1902-1903).' },
  { id:'darou-mousty', nom:'Darou Mouhty', pays:'Sénégal', flag:'🇸🇳', lat:15.0700, lng:-15.7800, categorie:'origine', color:'#166534', annee:'1912', description_fr:'Cité fondée par Mame Thierno Birahim Mbacké (frère du Cheikh) en 1912. Ville religieuse mouride.', description_en:'City founded by Mame Thierno Birahim Mbacké (Sheikh\'s brother) in 1912. Mouride religious city.' },
  // Étapes exil Sénégal
  { id:'louga', nom:'Louga', pays:'Sénégal', flag:'🇸🇳', lat:15.6197, lng:-16.2247, categorie:'exil_afrique', color:'#f59e0b', annee:'1895', description_fr:'Transit par le chemin de fer. Cheikh Bamba pria à la gare de Louga le 20 Août 1895 avant sa déportation.', description_en:'Railway transit. Cheikh Bamba prayed at Louga station on August 20, 1895 before deportation.' },
  { id:'saint-louis', nom:'Saint-Louis', pays:'Sénégal', flag:'🇸🇳', lat:16.0326, lng:-16.4818, categorie:'exil_afrique', color:'#f59e0b', annee:'1895', description_fr:'Procès colonial le 5 septembre 1895. Cheikh Bamba y accomplit la prière des deux rakkas devant les autorités.', description_en:'Colonial trial on September 5, 1895. Cheikh Bamba performed the two-rakat prayer before the authorities.' },
  { id:'dakar', nom:'Dakar', pays:'Sénégal', flag:'🇸🇳', lat:14.7167, lng:-17.4677, categorie:'exil_afrique', color:'#f59e0b', annee:'1895', description_fr:'Port d\'embarquement (Môle 1). Cheikh Bamba quitte le Sénégal le 21 Septembre 1895 à bord du navire «Ville de Pernambouc».', description_en:'Embarkation port (Pier 1). Cheikh Bamba left Senegal on September 21, 1895 aboard the vessel "Ville de Pernambouc".' },
  { id:'dagana', nom:'Dagana', pays:'Sénégal', flag:'🇸🇳', lat:16.5167, lng:-15.5000, categorie:'exil_afrique', color:'#f59e0b', description_fr:'Transit vers la Mauritanie lors du second exil (1903).', description_en:'Transit to Mauritania during the second exile (1903).' },
  { id:'thieyene', nom:'Thiéyène Djolof', pays:'Sénégal', flag:'🇸🇳', lat:15.3000, lng:-15.1000, categorie:'residence', color:'#7c3aed', annee:'1907-1912', description_fr:'Résidence surveillée (1907-1912). Lieu d\'isolement après le retour de Mauritanie. Conditions de vie très difficiles.', description_en:'House arrest (1907-1912). Isolation after return from Mauritania. Very difficult living conditions.' },
  { id:'diourbel', nom:'Diourbel', pays:'Sénégal', flag:'🇸🇳', lat:14.6550, lng:-16.2314, categorie:'residence', color:'#7c3aed', annee:'1912-1927', description_fr:'Dernière demeure et résidence surveillée (1912-1927). Cheikh Bamba y décède le 19 Juillet 1927.', description_en:'Final home and house arrest (1912-1927). Cheikh Bamba passed away here on July 19, 1927.' },
  // Gabon
  { id:'libreville', nom:'Libreville', pays:'Gabon', flag:'🇬🇦', lat:0.3924, lng:9.4536, categorie:'gabon', color:'#dc2626', annee:'1895-1902', description_fr:'Capitale du Gabon. Principal lieu de détention durant le premier exil (1895-1902). 7 années d\'épreuves spirituelles.', description_en:'Capital of Gabon. Main detention place during the first exile (1895-1902). 7 years of spiritual trials.' },
  { id:'mayumba', nom:'Mayumba', pays:'Gabon', flag:'🇬🇦', lat:-3.4333, lng:10.6500, categorie:'gabon', color:'#dc2626', description_fr:'Lieu de grandes épreuves spirituelles au Gabon. Cheikh Bamba y composa plusieurs Khassaïdes majeures.', description_en:'Place of great spiritual trials in Gabon. Cheikh Bamba composed several major Khassaïdes here.' },
  { id:'lambarene', nom:'Lambaréné', pays:'Gabon', flag:'🇬🇦', lat:-0.6914, lng:10.2372, categorie:'gabon', color:'#dc2626', description_fr:'Lieu d\'internement au Gabon durant le premier exil.', description_en:'Internment place in Gabon during the first exile.' },
  // Mauritanie
  { id:'saout-el-ma', nom:'Saout-El-Ma', pays:'Mauritanie', flag:'🇲🇷', lat:16.7000, lng:-13.2000, categorie:'mauritanie', color:'#0369a1', annee:'1903-1907', description_fr:'Principal lieu de résidence durant le second exil en Mauritanie (1903-1907). Cheikh Bamba y composa Matlaboul Fawzeyni.', description_en:'Main residence during the second exile in Mauritania (1903-1907). Cheikh Bamba composed Matlaboul Fawzeyni here.' },
]

const CATEGORIES = [
  { id: 'all',         label_fr: 'Tous',                    label_en: 'All',               color: '#374151' },
  { id: 'origine',     label_fr: '🇸🇳 Origines & Fondations', label_en: '🇸🇳 Origins & Foundations', color: '#166534' },
  { id: 'exil_afrique',label_fr: '🚢 Étapes de l\'Exil',     label_en: '🚢 Exile Journey',    color: '#f59e0b' },
  { id: 'gabon',       label_fr: '🇬🇦 Gabon (1895-1902)',     label_en: '🇬🇦 Gabon (1895-1902)', color: '#dc2626' },
  { id: 'mauritanie',  label_fr: '🇲🇷 Mauritanie (1903-1907)',label_en: '🇲🇷 Mauritania (1903-1907)', color: '#0369a1' },
  { id: 'residence',   label_fr: '🏠 Résidences Surveillées', label_en: '🏠 House Arrests',    color: '#7c3aed' },
]

export default function CarteSerigne() {
  const { lang } = useLang()
  const [selected, setSelected] = useState<Lieu | null>(null)
  const [filter, setFilter] = useState('all')
  const [mapLoaded, setMapLoaded] = useState(false)

  const filtered = filter === 'all' ? LIEUX : LIEUX.filter(l => l.categorie === filter)

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    let map: any = null
    let L: any = null

    const initMap = async () => {
      const leaflet = await import('leaflet' as any)
      L = leaflet.default || leaflet

      // Fix default icon
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const container = document.getElementById('carte-serigne')
      if (!container || (container as any)._leaflet_id) return

      map = L.map('carte-serigne', { zoomControl: true, scrollWheelZoom: false }).setView([14.0, -10.0], 4)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18,
      }).addTo(map)

      LIEUX.forEach(lieu => {
        const marker = L.circleMarker([lieu.lat, lieu.lng], {
          radius: lieu.id === 'touba' ? 14 : 10,
          fillColor: lieu.color,
          color: 'white',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map)

        marker.bindTooltip(lieu.nom, { permanent: false, direction: 'top' })
        marker.on('click', () => {
          setSelected(lieu)
          map.flyTo([lieu.lat, lieu.lng], 7, { duration: 1.5 })
        })
      })

      setMapLoaded(true)
    }

    initMap()

    return () => {
      if (map) map.remove()
    }
  }, [])

  return (
    <section id="carte" className="py-20 lg:py-32 bg-mouride-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">
            {lang === 'fr' ? 'Géographie Spirituelle' : 'Spiritual Geography'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-mouride-green mt-2 mb-4">
            {lang === 'fr' ? 'Sur les Pas de Serigne Touba' : 'In the Footsteps of Serigne Touba'}
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            {lang === 'fr'
              ? 'Explorez les lieux marquants du parcours spirituel de Cheikh Ahmadou Bamba — du Sénégal au Gabon en passant par la Mauritanie.'
              : 'Explore the key places of Cheikh Ahmadou Bamba\'s spiritual journey — from Senegal to Gabon through Mauritania.'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                filter === cat.id
                  ? 'text-white border-transparent shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
              style={filter === cat.id ? { background: cat.color, borderColor: cat.color } : {}}>
              {lang === 'fr' ? cat.label_fr : cat.label_en}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100" style={{ height: '500px' }}>
              <div id="carte-serigne" style={{ width: '100%', height: '100%' }} />
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-mouride-cream">
                  <div className="text-mouride-green text-sm">Chargement de la carte...</div>
                </div>
              )}
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-4">
            {/* Selected place */}
            {selected ? (
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 animate-fade-in">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-2xl">{selected.flag}</span>
                    <h3 className="font-display font-bold text-mouride-green text-lg mt-1">{selected.nom}</h3>
                    <span className="text-xs text-gray-400">{selected.pays}</span>
                    {selected.annee && (
                      <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: selected.color }}>
                        {selected.annee}
                      </span>
                    )}
                  </div>
                  <button onClick={() => setSelected(null)} className="text-gray-300 hover:text-gray-500 text-xl">×</button>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'fr' ? selected.description_fr : selected.description_en}
                </p>
              </div>
            ) : (
              <div className="bg-mouride-green rounded-2xl p-5 text-white text-center">
                <div className="text-3xl mb-2">🗺️</div>
                <p className="font-display font-bold mb-1">
                  {lang === 'fr' ? 'Cliquez sur un lieu' : 'Click on a location'}
                </p>
                <p className="text-green-200 text-xs">
                  {lang === 'fr' ? 'pour en savoir plus' : 'to learn more'}
                </p>
              </div>
            )}

            {/* List */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-1 overflow-y-auto" style={{ maxHeight: '320px' }}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {lang === 'fr' ? `${filtered.length} lieux` : `${filtered.length} places`}
              </p>
              <div className="space-y-2">
                {filtered.map(lieu => (
                  <button key={lieu.id} onClick={() => setSelected(lieu)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all hover:bg-gray-50 ${selected?.id === lieu.id ? 'bg-mouride-cream' : ''}`}>
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: lieu.color }} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{lieu.nom}</p>
                      <p className="text-xs text-gray-400">{lieu.flag} {lieu.pays}{lieu.annee ? ` · ${lieu.annee}` : ''}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {CATEGORIES.slice(1).map(cat => (
            <div key={cat.id} className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
              {lang === 'fr' ? cat.label_fr : cat.label_en}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
