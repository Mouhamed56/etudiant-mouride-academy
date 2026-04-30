export interface Article {
  id: number
  category: string
  date_fr: string
  date_en: string
  read_fr: string
  read_en: string
  title_fr: string
  title_en: string
  excerpt_fr: string
  excerpt_en: string
  content_fr: string
  content_en: string
  likes: number
}

export const ARTICLES: Article[] = [
  { id:1, category:'spiritualite', date_fr:'15 Février 2026', date_en:'February 15, 2026', read_fr:'5 min', read_en:'5 min', title_fr:'Le Dhikr comme pilier de la vie spirituelle mouride', title_en:'Dhikr as a pillar of Mouride spiritual life', excerpt_fr:"La pratique quotidienne du Dhikr transforme l'âme.", excerpt_en:'The daily practice of Dhikr transforms the soul.', content_fr:"Le Dhikr est au cœur de la spiritualité mouride.", content_en:'Dhikr is at the heart of Mouride spirituality.', likes:1200 },
  { id:2, category:'leadership', date_fr:'2 Mars 2026', date_en:'March 2, 2026', read_fr:'7 min', read_en:'7 min', title_fr:'7 leçons de leadership de Cheikh Ahmadou Bamba', title_en:'7 leadership lessons from Cheikh Ahmadou Bamba', excerpt_fr:'Le Cheikh incarne un modèle de leadership universel.', excerpt_en:'The Sheikh embodies a universal leadership model.', content_fr:'Servir sans dominer. La foi comme force. La patience.', content_en:'Serve without dominating. Faith as strength. Patience.', likes:2400 },
  { id:3, category:'jeunesse', date_fr:'10 Mars 2026', date_en:'March 10, 2026', read_fr:'5 min', read_en:'5 min', title_fr:"La jeunesse mouride à l'ère du numérique", title_en:'Mouride youth in the digital age', excerpt_fr:'Comment concilier valeurs spirituelles et numérique ?', excerpt_en:'How to reconcile spiritual values with the digital world?', content_fr:'La jeunesse mouride doit adopter les outils numériques.', content_en:'Mouride youth must adopt digital tools.', likes:3100 },
  { id:4, category:'economie', date_fr:'20 Février 2026', date_en:'February 20, 2026', read_fr:'8 min', read_en:'8 min', title_fr:'Touba : un modèle économique africain', title_en:'Touba: an African economic model', excerpt_fr:'Touba : économie et spiritualité se renforcent.', excerpt_en:'Touba: economy and spirituality reinforce each other.', content_fr:"Touba est la 2ème ville économique du Sénégal.", content_en:"Touba is Senegal's 2nd economic city.", likes:1800 },
  { id:5, category:'histoire', date_fr:'5 Janvier 2026', date_en:'January 5, 2026', read_fr:'10 min', read_en:'10 min', title_fr:"L'exil au Gabon (1895) : la résistance par la foi", title_en:'Exile in Gabon (1895): resistance through faith', excerpt_fr:"L'exil transformé en victoire spirituelle.", excerpt_en:'The exile transformed into spiritual victory.', content_fr:"Cheikh Bamba fut déporté au Gabon en 1895.", content_en:'Cheikh Bamba was deported to Gabon in 1895.', likes:4500 },
  { id:6, category:'spiritualite', date_fr:'1 Mars 2026', date_en:'March 1, 2026', read_fr:'6 min', read_en:'6 min', title_fr:"Le Tarbiya : l'éducation de l'âme", title_en:"Tarbiya: education of the soul", excerpt_fr:"Le Tarbiya transforme l'être humain.", excerpt_en:'Tarbiya transforms the human being.', content_fr:"Le Tarbiya éduque l'âme selon Cheikh Bamba.", content_en:"Tarbiya educates the soul according to Cheikh Bamba.", likes:2000 },
]
