export interface Question {
  id: string
  question_fr: string
  question_en: string
  options_fr: string[]
  options_en: string[]
  correct: number
  explanation_fr: string
  explanation_en: string
}

export interface Quiz {
  id: string
  module_id: string
  title_fr: string
  title_en: string
  questions: Question[]
}

export const QUIZZES: Quiz[] = [
  {
    id: 'quiz-mod-1',
    module_id: 'mod-1',
    title_fr: 'Évaluation — Contexte historique et émergence',
    title_en: 'Assessment — Historical context and emergence',
    questions: [
      {
        id: 'q1-1',
        question_fr: "En quelle année Cheikh Ahmadou Bamba est-il né ?",
        question_en: "In what year was Cheikh Ahmadou Bamba born?",
        options_fr: ['1850', '1853', '1860', '1873'],
        options_en: ['1850', '1853', '1860', '1873'],
        correct: 1,
        explanation_fr: "Cheikh Ahmadou Bamba est né en 1853 dans le village de Mbacké-Baol au Sénégal.",
        explanation_en: "Cheikh Ahmadou Bamba was born in 1853 in the village of Mbacké-Baol in Senegal."
      },
      {
        id: 'q1-2',
        question_fr: "Quelle était l'arme principale de Cheikh Ahmadou Bamba contre les colonisateurs ?",
        question_en: "What was Cheikh Ahmadou Bamba's main weapon against colonizers?",
        options_fr: ['Les armes militaires', 'La connaissance et la foi (xam xam)', 'Les alliances politiques', 'La fuite à l\'étranger'],
        options_en: ['Military weapons', 'Knowledge and faith (xam xam)', 'Political alliances', 'Flight abroad'],
        correct: 1,
        explanation_fr: "Sa stratégie reposait sur la connaissance (xam xam) et la foi en Allah, et non sur les armes.",
        explanation_en: "His strategy was based on knowledge (xam xam) and faith in Allah, not on weapons."
      },
      {
        id: 'q1-3',
        question_fr: "Quelles étaient les trois options envisagées par les colonisateurs contre Cheikh Bamba ?",
        question_en: "What were the three options considered by colonizers against Cheikh Bamba?",
        options_fr: ['Négociation, emprisonnement, exil', 'Tuer, emprisonner, exiler', 'Convertir, emprisonner, bannir', 'Ignorer, surveiller, exiler'],
        options_en: ['Negotiation, imprisonment, exile', 'Kill, imprison, exile', 'Convert, imprison, banish', 'Ignore, monitor, exile'],
        correct: 1,
        explanation_fr: "Les colonisateurs ont envisagé de le tuer, l'emprisonner ou l'exiler. Ils ont finalement choisi l'exil.",
        explanation_en: "Colonizers considered killing him, imprisoning him or exiling him. They ultimately chose exile."
      },
      {
        id: 'q1-4',
        question_fr: "Quel événement historique s'est produit pendant le voyage vers le Gabon ?",
        question_en: "What historic event occurred during the journey to Gabon?",
        options_fr: ['Une bataille navale', 'La prière de Cheikh Bamba sur la mer', 'Une tempête miraculeuse', 'Une rencontre avec le Prophète'],
        options_en: ['A naval battle', "Cheikh Bamba's prayer on the sea", 'A miraculous storm', 'A meeting with the Prophet'],
        correct: 1,
        explanation_fr: "Les colonisateurs lui ayant interdit de prier sur le navire, Cheikh Bamba descendit dans la mer pour accomplir sa prière d'ASR — un acte de foi légendaire.",
        explanation_en: "Having been forbidden by colonizers to pray on the ship, Cheikh Bamba descended into the sea to perform his ASR prayer — a legendary act of faith."
      },
      {
        id: 'q1-5',
        question_fr: "De quelle ville Cheikh Bamba est-il parti en exil le 21 septembre 1895 ?",
        question_en: "From which city did Cheikh Bamba depart into exile on September 21, 1895?",
        options_fr: ['Saint-Louis', 'Louga', 'Dakar', 'Thiès'],
        options_en: ['Saint-Louis', 'Louga', 'Dakar', 'Thiès'],
        correct: 2,
        explanation_fr: "Cheikh Bamba est parti du Môle 1 de Dakar le 21 septembre 1895 à bord du navire 'Ville de Pernambouc'.",
        explanation_en: "Cheikh Bamba departed from Pier 1 in Dakar on September 21, 1895 aboard the ship 'Ville de Pernambouc'."
      },
      {
        id: 'q1-6',
        question_fr: "Combien d'années Cheikh Bamba a-t-il passé en exil au Gabon ?",
        question_en: "How many years did Cheikh Bamba spend in exile in Gabon?",
        options_fr: ['5 ans', '7 ans', '10 ans', '3 ans'],
        options_en: ['5 years', '7 years', '10 years', '3 years'],
        correct: 1,
        explanation_fr: "Cheikh Bamba a passé 7 années en exil au Gabon (1895-1902).",
        explanation_en: "Cheikh Bamba spent 7 years in exile in Gabon (1895-1902)."
      }
    ]
  },
  {
    id: 'quiz-mod-2',
    module_id: 'mod-2',
    title_fr: 'Évaluation — Vision spirituelle et système éducatif',
    title_en: 'Assessment — Spiritual vision and educational system',
    questions: [
      {
        id: 'q2-1',
        question_fr: "Quels sont les 3 piliers fondamentaux du Mouridisme ?",
        question_en: "What are the 3 fundamental pillars of Mouridism?",
        options_fr: ['Prière, jeûne, zakat', 'Iman, Islam, Ihsan', 'Travail, éducation, patience', 'Coran, Sunna, Ijmaa'],
        options_en: ['Prayer, fasting, zakat', 'Iman, Islam, Ihsan', 'Work, education, patience', 'Quran, Sunnah, Ijmaa'],
        correct: 1,
        explanation_fr: "Les 3 piliers sont : Iman (la Foi), Islam (les Règles pratiques), et Ihsan (la Perfection spirituelle).",
        explanation_en: "The 3 pillars are: Iman (Faith), Islam (Practical Rules), and Ihsan (Spiritual Perfection)."
      },
      {
        id: 'q2-2',
        question_fr: "Que signifie 'al khilmoul nafiha' selon Serigne Touba ?",
        question_en: "What does 'al khilmoul nafiha' mean according to Serigne Touba?",
        options_fr: ['La connaissance divine', 'La connaissance utile', 'La connaissance spirituelle', 'La connaissance secrète'],
        options_en: ['Divine knowledge', 'Useful knowledge', 'Spiritual knowledge', 'Secret knowledge'],
        correct: 1,
        explanation_fr: "'Al khilmoul nafiha' signifie 'la connaissance utile', c'est-à-dire la connaissance puisée du Prophète Mohamed qui est bénéfique.",
        explanation_en: "'Al khilmoul nafiha' means 'useful knowledge', that is, knowledge drawn from the Prophet Mohamed that is beneficial."
      },
      {
        id: 'q2-3',
        question_fr: "Quels sont les 4 piliers de la vie spirituelle selon Cheikh Bamba (Huqa al Buka'u) ?",
        question_en: "What are the 4 pillars of spiritual life according to Cheikh Bamba (Huqa al Buka'u)?",
        options_fr: ['Prière, jeûne, aumône, pèlerinage', 'Silence, faim, veillée, solitude', 'Foi, travail, patience, service', 'Lecture, écriture, méditation, partage'],
        options_en: ['Prayer, fasting, almsgiving, pilgrimage', 'Silence, hunger, vigil, solitude', 'Faith, work, patience, service', 'Reading, writing, meditation, sharing'],
        correct: 1,
        explanation_fr: "Selon Huqa al Buka'u : 'Les arcanes de l'édifice de la communauté des saints sont au nombre de quatre : Silence, faim, veillée, et solitude.'",
        explanation_en: "According to Huqa al Buka'u: 'The arcana of the edifice of the community of saints number four: Silence, hunger, vigil, and solitude.'"
      },
      {
        id: 'q2-4',
        question_fr: "Dans quel ordre Serigne Touba recommandait-il d'acquérir la connaissance ?",
        question_en: "In what order did Serigne Touba recommend acquiring knowledge?",
        options_fr: ['Tasawuf, Fiqh, Tawhid', 'Tawhid, Fiqh, Tasawuf', 'Fiqh, Tawhid, Tasawuf', 'Tasawuf, Tawhid, Fiqh'],
        options_en: ['Tasawuf, Fiqh, Tawhid', 'Tawhid, Fiqh, Tasawuf', 'Fiqh, Tawhid, Tasawuf', 'Tasawuf, Tawhid, Fiqh'],
        correct: 1,
        explanation_fr: "Selon Serigne Touba : d'abord le Tawhid (unicité divine), ensuite le Fiqh (jurisprudence), puis le Tasawuf (spiritualité).",
        explanation_en: "According to Serigne Touba: first Tawhid (divine unity), then Fiqh (jurisprudence), then Tasawuf (spirituality)."
      },
      {
        id: 'q2-5',
        question_fr: "Quelle est la formule d'invocation centrale du Dhikr mouride ?",
        question_en: "What is the central invocation formula of the Mouride Dhikr?",
        options_fr: ['Subhanallah', 'Laa Ilaha ilallah', 'Allahu Akbar', 'Bismillah'],
        options_en: ['Subhanallah', 'Laa Ilaha ilallah', 'Allahu Akbar', 'Bismillah'],
        correct: 1,
        explanation_fr: "Le Cheikh enseignait : 'Il n'y a pas d'acte plus éminent que la prononciation perpétuelle de Laa Ilaha ilallah, où que l'on puisse être.'",
        explanation_en: "The Sheikh taught: 'There is no act more eminent than the perpetual pronouncing of Laa Ilaha ilallah, wherever one may be.'"
      },
      {
        id: 'q2-6',
        question_fr: "Combien de sections (hizb) du Coran le Cheikh recommandait-il de lire quotidiennement ?",
        question_en: "How many sections (hizb) of the Quran did the Sheikh recommend reading daily?",
        options_fr: ['1 section', '2 sections', '3 sections', '5 sections'],
        options_en: ['1 section', '2 sections', '3 sections', '5 sections'],
        correct: 2,
        explanation_fr: "La lecture quotidienne du Coran était fixée à un minimum de 3 sections (hizb) par jour.",
        explanation_en: "Daily reading of the Quran was set at a minimum of 3 sections (hizb) per day."
      }
    ]
  },
  {
    id: 'quiz-mod-3',
    module_id: 'mod-3',
    title_fr: 'Évaluation — Les qualités du leadership authentique',
    title_en: 'Assessment — The qualities of authentic leadership',
    questions: [
      {
        id: 'q3-1',
        question_fr: "Où Cheikh Bamba a-t-il été placé en résidence surveillée de 1907 à 1912 ?",
        question_en: "Where was Cheikh Bamba placed under house arrest from 1907 to 1912?",
        options_fr: ['Diourbel', 'Touba', 'Thiéyène Djolof', 'Louga'],
        options_en: ['Diourbel', 'Touba', 'Thieyene Djolof', 'Louga'],
        correct: 2,
        explanation_fr: "Thiéyène Djolof était réputé pour sa chaleur étouffante et son manque d'eau, les colonisateurs espéraient décourager les talibés.",
        explanation_en: "Thieyene Djolof was known for its stifling heat and lack of water, colonizers hoped to discourage the disciples."
      },
      {
        id: 'q3-2',
question_fr: "Quelle est la définition de la liberté selon Cheikh Ahmadou Bamba ?",
question_en: "What is the definition of freedom according to Cheikh Ahmadou Bamba?",
options_fr: ["L'absence de contraintes physiques", "Un concept intérieur — on peut être libre enchaîné", "L'indépendance politique d'un pays", "La liberté de pratiquer sa religion"],
options_en: ["The absence of physical constraints", "An interior concept — one can be free while chained", "A country political independence", "Freedom to practice their religion"],
correct: 1,
explanation_fr: "Le Cheikh disait : La liberté est un concept intérieur, on peut être libre même enchaîné et être enchaîné tout en étant libre.",
explanation_en: "The Sheikh said: Freedom is an interior concept, one can be free even in chains and be chained while being free."
      },
      {
        
        id: 'q3-3',
        question_fr: "Qu'est-ce que le 'djihâd an nafs' selon Cheikh Bamba ?",
        question_en: "What is 'djihâd an nafs' according to Cheikh Bamba?",
        options_fr: ['La guerre militaire contre les ennemis', 'Le combat spirituel contre les idées de perversité et les péchés de l\'âme', 'Le pèlerinage à La Mecque', 'La résistance contre le colonialisme'],
        options_en: ['Military war against enemies', 'The spiritual combat against ideas of perversity and sins of the soul', 'The pilgrimage to Mecca', 'Resistance against colonialism'],
        correct: 1,
        explanation_fr: "Le djihâd an nafs est le combat contre les idées de perversité et les péchés, considéré comme le plus grand des combats.",
        explanation_en: "Djihâd an nafs is the combat against ideas of perversity and sins, considered the greatest of all combats."
      },
      {
        id: 'q3-4',
        question_fr: "Pendant combien d'années Cheikh Bamba a-t-il été en résidence surveillée à Thiéyène et Diourbel ?",
        question_en: "For how many years was Cheikh Bamba under house arrest in Thieyene and Diourbel?",
        options_fr: ['10 ans', '15 ans', '20 ans', '8 ans'],
        options_en: ['10 years', '15 years', '20 years', '8 years'],
        correct: 1,
        explanation_fr: "15 ans total : Thiéyène Djolof (1907-1912, 5 ans) + Diourbel (1912-1927, 15 ans).",
        explanation_en: "15 years total: Thieyene Djolof (1907-1912, 5 years) + Diourbel (1912-1927, 15 years)."
      },
      {
        id: 'q3-5',
        question_fr: "Quel leader de non-violence Cheikh Bamba surpasse-t-il selon l'auteur du livre ?",
        question_en: "Which non-violence leader does Cheikh Bamba surpass according to the book's author?",
        options_fr: ['Nelson Mandela et Malcolm X', 'Mahatma Gandhi et Martin Luther King', 'Thomas Sankara et Patrice Lumumba', 'Kwame Nkrumah et Sékou Touré'],
        options_en: ['Nelson Mandela and Malcolm X', 'Mahatma Gandhi and Martin Luther King', 'Thomas Sankara and Patrice Lumumba', 'Kwame Nkrumah and Sékou Touré'],
        correct: 1,
        explanation_fr: "L'auteur affirme que lorsqu'on évoque Gandhi ou Martin Luther King, Serigne Touba les dépasse largement, car il avait les moyens de s'opposer par la force mais a choisi la paix.",
        explanation_en: "The author states that when mentioning Gandhi or Martin Luther King, Serigne Touba largely surpasses them, as he had the means to oppose by force but chose peace."
      }
    ]
  },
  {
    id: 'quiz-mod-4',
    module_id: 'mod-4',
    title_fr: 'Évaluation — Le modèle économique mouride',
    title_en: 'Assessment — The Mouride economic model',
    questions: [
      {
        id: 'q4-1',
        question_fr: "Quelle somme Serigne Touba a-t-il offerte à la France en crise, alors qu'il était emprisonné ?",
        question_en: "What sum did Serigne Touba offer to France in crisis, while he was imprisoned?",
        options_fr: ['100 000 francs', '250 000 francs', '500 000 francs', '1 million de francs'],
        options_en: ['100,000 francs', '250,000 francs', '500,000 francs', '1 million francs'],
        correct: 2,
        explanation_fr: "Serigne Touba, malgré sa détention, a offert 500 000 francs à la France en crise dans les années 1920.",
        explanation_en: "Serigne Touba, despite his detention, offered 500,000 francs to France in crisis in the 1920s."
      },
      {
        id: 'q4-2',
        question_fr: "Quelle est la longueur du chemin de fer construit par la communauté mouride entre Diourbel et Touba ?",
        question_en: "What is the length of the railway built by the Mouride community between Diourbel and Touba?",
        options_fr: ['25 km', '50 km', '100 km', '75 km'],
        options_en: ['25 km', '50 km', '100 km', '75 km'],
        correct: 1,
        explanation_fr: "50 km de chemin de fer ont été construits, coûtant 10 millions de francs or à la communauté mouride.",
        explanation_en: "50 km of railway were built, costing the Mouride community 10 million gold francs."
      },
      {
        id: 'q4-3',
        question_fr: "Quelle est la philosophie du travail selon le Mouridisme ?",
        question_en: "What is the philosophy of work according to Mouridism?",
        options_fr: ['Le travail est une nécessité économique', 'Le travail est une forme d\'adoration divine', 'Le travail est un devoir social', 'Le travail est une obligation religieuse'],
        options_en: ['Work is an economic necessity', 'Work is a form of divine worship', 'Work is a social duty', 'Work is a religious obligation'],
        correct: 1,
        explanation_fr: "Le mouridisme place le travail comme forme d'adoration : 'Travaille pour cette vie comme si tu devais être éternel, et travaille pour l'au-delà comme si tu devais mourir demain.'",
        explanation_en: "Mouridism places work as a form of worship: 'Work for this life as if you were to live forever, and work for the hereafter as if you were to die tomorrow.'"
      },
      {
        id: 'q4-4',
        question_fr: "En quelle année a été inaugurée la Grande Mosquée de Touba ?",
        question_en: "In what year was the Grand Mosque of Touba inaugurated?",
        options_fr: ['1925', '1945', '1963', '1970'],
        options_en: ['1925', '1945', '1963', '1970'],
        correct: 2,
        explanation_fr: "La Grande Mosquée de Touba a été inaugurée le 7 juin 1963 sous le Khalifat de Serigne Fallou Mbacké.",
        explanation_en: "The Grand Mosque of Touba was inaugurated on June 7, 1963 under the Khalifat of Serigne Fallou Mbacké."
      },
      {
        id: 'q4-5',
        question_fr: "Quel événement a poussé les mourides à émigrer à l'étranger à partir de 1970 ?",
        question_en: "What event pushed Mourides to emigrate abroad starting in 1970?",
        options_fr: ['Une guerre civile', 'La grande sécheresse', 'Une crise politique', 'Une épidémie'],
        options_en: ['A civil war', 'The great drought', 'A political crisis', 'An epidemic'],
        correct: 1,
        explanation_fr: "La grande sécheresse de 1970 a poussé les mourides à chercher du travail à l'étranger, créant ainsi la diaspora mouride mondiale.",
        explanation_en: "The great drought of 1970 pushed Mourides to seek work abroad, thus creating the worldwide Mouride diaspora."
      }
    ]
  },
  {
    id: 'quiz-mod-5',
    module_id: 'mod-5',
    title_fr: "Évaluation — L'héritage et la pertinence contemporaine",
    title_en: "Assessment — The legacy and contemporary relevance",
    questions: [
      {
        id: 'q5-1',
        question_fr: "Qui est l'actuel (8ème) Khalife Général des Mourides ?",
        question_en: "Who is the current (8th) Khalife General of the Mourides?",
        options_fr: ['Cheikh Saliou Mbacké', 'Serigne Sidy Mokhtar Mbacké', 'Serigne Mountakha Bassirou Mbacké', 'Serigne Lamine Bara Mbacké'],
        options_en: ['Cheikh Saliou Mbacké', 'Serigne Sidy Mokhtar Mbacké', 'Serigne Mountakha Bassirou Mbacké', 'Serigne Lamine Bara Mbacké'],
        correct: 2,
        explanation_fr: "Serigne Mountakha Bassirou Mbacké est le 8ème Khalife depuis le 10 janvier 2018.",
        explanation_en: "Serigne Mountakha Bassirou Mbacké is the 8th Khalife since January 10, 2018."
      },
      {
        id: 'q5-2',
        question_fr: "Quel ouvrage de Cheikh Bamba a été intégré dans le programme scolaire sénégalais ?",
        question_en: "Which work of Cheikh Bamba was integrated into the Senegalese school curriculum?",
        options_fr: ['Massalikoul Jinaane', 'Matlabul Fawzeyni', 'Kun Katimane', 'Tazawudu Sighaar'],
        options_en: ['Massalikoul Jinaane', 'Matlabul Fawzeyni', 'Kun Katimane', 'Tazawudu Sighaar'],
        correct: 2,
        explanation_fr: "Le gouvernement sénégalais a intégré Kun Katimane dans le programme scolaire sous le ministre Moustapha Mamba Guirassy.",
        explanation_en: "The Senegalese government integrated Kun Katimane into the school curriculum under Minister Moustapha Mamba Guirassy."
      },
      {
        id: 'q5-3',
        question_fr: "Qui était le premier Khalife après Cheikh Ahmadou Bamba ?",
        question_en: "Who was the first Khalife after Cheikh Ahmadou Bamba?",
        options_fr: ['Serigne Fallou Mbacké', 'Cheikh Abdoul Ahad', 'Serigne Mouhamadou Moustapha', 'Cheikh Saliou'],
        options_en: ['Serigne Fallou Mbacké', 'Cheikh Abdoul Ahad', 'Serigne Mouhamadou Moustapha', 'Cheikh Saliou'],
        correct: 2,
        explanation_fr: "Serigne Mouhamadou Moustapha Mbacké fut le premier Khalife de 1927 (décès du Cheikh) à 1945.",
        explanation_en: "Serigne Mouhamadou Moustapha Mbacké was the first Khalife from 1927 (Sheikh's death) to 1945."
      },
      {
        id: 'q5-4',
        question_fr: "Quel Khalife a institué la tradition du Grand Magal de Touba ?",
        question_en: "Which Khalife instituted the tradition of the Grand Magal of Touba?",
        options_fr: ['Serigne Mouhamadou Moustapha', 'Serigne Fallou Mbacké', 'Cheikh Abdoul Ahad', 'Cheikh Saliou'],
        options_en: ['Serigne Mouhamadou Moustapha', 'Serigne Fallou Mbacké', 'Cheikh Abdoul Ahad', 'Cheikh Saliou'],
        correct: 1,
        explanation_fr: "Serigne Fallou Mbacké a institué la tradition du Grand Magal de Touba en 1948.",
        explanation_en: "Serigne Fallou Mbacké instituted the tradition of the Grand Magal of Touba in 1948."
      },
      {
        id: 'q5-5',
        question_fr: "Selon Cheikh Bamba dans Masalik al-Jinan (vers 47), que dit-il sur sa condition d'homme noir ?",
        question_en: "According to Cheikh Bamba in Masalik al-Jinan (verse 47), what does he say about his condition as a Black man?",
        options_fr: ["Que sa couleur est une bénédiction", "De ne pas abuser de sa condition d'homme noir pour ne pas profiter de lui", "Que tous les hommes sont égaux devant Allah", "Que la couleur n'a aucune importance"],
        options_en: ["That his color is a blessing", "Not to abuse his condition as a Black man to take advantage of him", "That all men are equal before Allah", "That color has no importance"],
        correct: 1,
        explanation_fr: "Dans Masalik al-Jinan (vers 47) : 'N'abusez pas de ma condition d'homme noir pour ne pas profiter de moi, car je suis le serviteur éternel.'",
        explanation_en: "In Masalik al-Jinan (verse 47): 'Do not abuse my condition as a Black man to take advantage of me, for I am the eternal servant.'"
      },
      {
        id: 'q5-6',
        question_fr: "Quel est le rang de Touba parmi les villes économiques du Sénégal ?",
        question_en: "What is Touba's rank among Senegal's economic cities?",
        options_fr: ['1ère ville', '2ème ville', '3ème ville', '4ème ville'],
        options_en: ['1st city', '2nd city', '3rd city', '4th city'],
        correct: 1,
        explanation_fr: "Touba est la 2ème ville économique du Sénégal après Dakar.",
        explanation_en: "Touba is the 2nd economic city of Senegal after Dakar."
      }
    ]
  }
]
