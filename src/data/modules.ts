export interface Lecon {
  id: string
  title_fr: string
  title_en: string
  content_fr: string
  content_en: string
  duration_min: number
}

export interface Module {
  id: string
  course_id: string
  order: number
  title_fr: string
  title_en: string
  description_fr: string
  description_en: string
  icon: string
  lecons: Lecon[]
}

export const MODULES: Module[] = [
  {
    id: 'mod-1',
    course_id: 'leadership-bamba',
    order: 1,
    icon: '🌍',
    title_fr: 'Contexte historique et émergence du leadership',
    title_en: 'Historical context and emergence of leadership',
    description_fr: "Le Sénégal du XIXe siècle, l'oppression coloniale et l'émergence de Cheikh Ahmadou Bamba comme figure de résistance pacifique.",
    description_en: "19th century Senegal, colonial oppression and the emergence of Cheikh Ahmadou Bamba as a figure of peaceful resistance.",
    lecons: [
      {
        id: 'l-1-1',
        title_fr: "Le Sénégal sous la domination coloniale française",
        title_en: "Senegal under French colonial domination",
        duration_min: 8,
        content_fr: `En 1854, le Sénégal est divisé en plusieurs régions — le Baol, le Diambour, le Cayor, le Djolof et le Fouta — chacune dirigée par ses propres leaders. Les colonisateurs français disposaient d'une force militaire inégalée et avaient éliminé plusieurs figures de résistance :

   Figures de résistance éliminées :   
- Cheikh Omar Foutiyou Tall (Bandiagara)
- Ahmadou Sekou et Samba Sadio
- Lat Dior (tué à Dékheulé)
- Alboury (forcé à l'exil au Niger)

C'est dans ce contexte de    tensions, de violence, de mort et de domination    que surgit Cheikh Ahmadou Bamba. Sa stratégie était totalement différente de celle des autres : elle reposait sur la    connaissance (xam xam) et la foi en Allah   , et non sur les armes.

> "Ses armes sont différentes et son terrain de combat est différent. Je fais la guerre avec la science et la crainte révérencielle." — Cheikh Bamba Dieye`,
        content_en: `In 1854, Senegal was divided into several regions — Baol, Diambour, Cayor, Djolof and Fouta — each led by its own leaders. The French colonizers had unmatched military power and had eliminated several resistance figures:

   Resistance figures eliminated:   
- Cheikh Omar Foutiyou Tall (Bandiagara)
- Ahmadou Sekou and Samba Sadio
- Lat Dior (killed at Dékheulé)
- Alboury (forced into exile in Niger)

It was in this context of    tensions, violence, death and domination    that Cheikh Ahmadou Bamba emerged. His strategy was completely different: it was based on    knowledge (xam xam) and faith in Allah   , not weapons.

> "My weapons are different and my battlefield is different. I make war with science and reverential fear." — Cheikh Bamba Dieye`
      },
      {
        id: 'l-1-2',
        title_fr: "Naissance et formation spirituelle de Cheikh Ahmadou Bamba",
        title_en: "Birth and spiritual formation of Cheikh Ahmadou Bamba",
        duration_min: 7,
        content_fr: `Cheikh Ahmadou Bamba Mbacké est né en    1853 dans le village de Mbacké-Baol   . Il était le fils de :
-    Cheikh Muhammad Habiboullah    (surnommé Momar Anta Sally Mbacké)
-    Diaratoulâh Mariama Bousso   , connue pour sa piété remarquable

Dès son jeune âge, il fut imprégné d'une    éducation spirituelle profonde    grâce à ses ascendants et son oncle de la famille Boussobé, chez qui il entama l'apprentissage du Coran.

   Étapes clés de sa formation :   
- Perte de sa mère en    1863   
- Perte de son père en    1883   
- À la quarantaine, il lança un appel à ses adeptes pour les exhorter à s'élever vers un idéal plus élevé
- Sa doctrine de    non-violence et de dévotion absolue à Dieu    commença à inspirer une communauté entière

Sa résolution de départ était exceptionnelle. Il affirmait avoir    "conclu un serment d'allégeance avec le Prophète dans son cœur"    avant même de l'avoir vu.`,
        content_en: `Cheikh Ahmadou Bamba Mbacké was born in    1853 in the village of Mbacké-Baol   . He was the son of:
-    Cheikh Muhammad Habiboullah    (nicknamed Momar Anta Sally Mbacké)
-    Diaratoulâh Mariama Bousso   , known for her remarkable piety

From a young age, he was imbued with    deep spiritual education    through his ancestors and his uncle from the Boussobé family, with whom he began learning the Quran.

   Key stages of his formation:   
- Loss of his mother in    1863   
- Loss of his father in    1883   
- In his forties, he launched a call to his followers to aspire to a higher ideal
- His doctrine of    non-violence and absolute devotion to God    began to inspire an entire community

His initial resolution was exceptional. He claimed to have    "concluded a pledge of allegiance with the Prophet in his heart"    before even seeing him.`
      },
      {
        id: 'l-1-3',
        title_fr: "L'exil au Gabon (1895-1902) : résistance spirituelle",
        title_en: "Exile in Gabon (1895-1902): spiritual resistance",
        duration_min: 10,
        content_fr: `En 1895, les autorités coloniales françaises décidèrent d'exiler Cheikh Ahmadou Bamba. Elles avaient envisagé    trois options    :
1.    Le tuer    — écarté car l'amour du peuple aurait causé l'instabilité
2.    L'emprisonner    — jugé risqué, cela aurait attiré les foules
3.    L'exiler    — choisi, espérant qu'il tomberait dans l'oubli

   Le voyage historique :   
- Louga : Transit par le chemin de fer. Prière historique à la gare le    20 août 1895   
- Saint-Louis : Procès colonial le    5 septembre 1895   , prière des deux rakkas
- Dakar : Embarquement depuis le    Môle 1    le 21 septembre 1895 à bord du *"Ville de Pernambouc"*

   La prière sur la mer :   
Pendant le voyage, les colonisateurs lui interdirent de prier sur le navire. Serigne Touba descendit alors dans la mer pour accomplir sa prière d'ASR — un acte de foi extraordinaire qui devint légendaire.

> "Ils ont voulu m'humilier en me jetant sur la mer, heureusement que le Seigneur a dompté pour moi la plus houleuse des mers." — Serigne Moussa Kâ

Malgré    7 années d'exil    au Gabon (Libreville, Mayumba, Lambaréné), dans une forêt dense peuplée de dangers, Cheikh Bamba ne faiblit pas et continua d'écrire et d'inspirer ses disciples.`,
        content_en: `In 1895, French colonial authorities decided to exile Cheikh Ahmadou Bamba. They had considered    three options   :
1.    Kill him    — dismissed because people's love would cause instability
2.    Imprison him    — deemed risky, it would attract crowds
3.    Exile him    — chosen, hoping he would fall into oblivion

   The historic journey:   
- Louga: Railway transit. Historic prayer at the station on    August 20, 1895   
- Saint-Louis: Colonial trial on    September 5, 1895   , two-rakat prayer
- Dakar: Embarkation from    Pier 1    on September 21, 1895 aboard the *"Ville de Pernambouc"*

   The prayer on the sea:   
During the voyage, colonizers forbade him to pray on the ship. Serigne Touba then descended into the sea to perform his ASR prayer — an extraordinary act of faith that became legendary.

> "They wanted to humiliate me by throwing me onto the sea, fortunately the Lord tamed the roughest seas for me." — Serigne Moussa Kâ

Despite    7 years of exile    in Gabon (Libreville, Mayumba, Lambaréné), in a dense forest full of dangers, Cheikh Bamba did not weaken and continued to write and inspire his disciples.`
      }
    ]
  },
  {
    id: 'mod-2',
    course_id: 'leadership-bamba',
    order: 2,
    icon: '✨',
    title_fr: 'La vision spirituelle et le système éducatif',
    title_en: 'The spiritual vision and educational system',
    description_fr: "La doctrine spirituelle de Cheikh Bamba, son système éducatif révolutionnaire basé sur la connaissance et la tarbiya.",
    description_en: "Cheikh Bamba's spiritual doctrine, his revolutionary educational system based on knowledge and tarbiya.",
    lecons: [
      {
        id: 'l-2-1',
        title_fr: "Le Mouridisme : fondements et principes",
        title_en: "Mouridism: foundations and principles",
        duration_min: 8,
        content_fr: `Lorsqu'il ouvrit la voie du mouridisme, Cheikh Ahmadou Bamba dit clairement :

> "Si vous êtes ici pour uniquement comprendre la charia, le fiqh, allez voir d'autres personnes. Pour ceux qui sont là pour avoir une attitude positive, pour Allah, pour l'éducation spirituelle, pour indiquer le bon chemin et pour accéder à l'au-delà, venez me rejoindre."

   Les 3 piliers fondamentaux :   
1.    Iman (la Foi)    — Le fondement de tout
2.    Islam (les Règles)    — Les principes pratiques
3.    Ihsan (la Perfection spirituelle)    — La pureté et la sincérité

   Les 3 sciences obligatoires :   
- La science du    Tawhid    (unicité divine)
- La science de la    Charia    (jurisprudence)
- La science du    Tasawuf    (soufisme/spiritualité)

   La quête de la connaissance par étapes :   
1. Le Tawhid (doctrine de l'unicité de Dieu)
2. Le Fiqh (jurisprudence islamique)
3. Le Tasawuf (spiritualité)
4. Étude du Coran, des hadiths et autres savoirs utiles`,
        content_en: `When he opened the path of Mouridism, Cheikh Ahmadou Bamba clearly said:

> "If you are here only to understand sharia, fiqh, go see other people. For those who are here to have a positive attitude, for Allah, for spiritual education, to show the right path and to access the hereafter, come join me."

   The 3 fundamental pillars:   
1.    Iman (Faith)    — The foundation of everything
2.    Islam (Rules)    — The practical principles
3.    Ihsan (Spiritual Perfection)    — Purity and sincerity

   The 3 obligatory sciences:   
- The science of    Tawhid    (divine unity)
- The science of    Sharia    (jurisprudence)
- The science of    Tasawuf    (Sufism/spirituality)

   The quest for knowledge by stages:   
1. Tawhid (doctrine of God's unity)
2. Fiqh (Islamic jurisprudence)
3. Tasawuf (spirituality)
4. Study of Quran, hadiths and other useful knowledge`
      },
      {
        id: 'l-2-2',
        title_fr: "Le système éducatif de Serigne Touba",
        title_en: "Serigne Touba's educational system",
        duration_min: 9,
        content_fr: `Cheikh Ahmadou Bamba a réalisé un    diagnostic complet    du système éducatif de son époque et a instauré une alternative révolutionnaire.

   Le problème identifié :   
> "Le problème principal, le 'virus' qui a affecté notre pays, c'est qu'il a perdu la voie. La connaissance que je véhicule est une connaissance puisée du Prophète Mohamed, appelée *al khilmoul nafiha* — la connaissance utile."

   Les principes de son système :   
-    Théorie + Pratique    : Contrairement au système archaïque qui ne se focalisait que sur la théorie
-    Adaptation aux individus    : Il prenait en considération les diverses compétences de chacun
-    Méthodes symboliques    : Tracés schématiques, figures géométriques, anecdotes africaines
-    Horaires adaptés    : Enseignements après les prières d'Asr, Isha ou Fajr pour ne pas fatiguer

   Trois conditions pour être un bon enseignant selon le Cheikh :   
1. Bonne maîtrise du Coran et connaissance de la Sunna
2. Belle éloquence
3. Grande intelligence

   Citation fondamentale :   
> "Ne passez jamais une journée sans apprendre quelque chose de nouveau, car le manque de connaissance tue le cœur." — Serigne Touba, Nahju

> "Là où les gens se surpassent, ce n'est nullement par le sang ou les rangs sociaux, mais uniquement par : avoir la connaissance, être discipliné, et appliquer cette connaissance."`,
        content_en: `Cheikh Ahmadou Bamba made a    complete diagnosis    of the educational system of his time and established a revolutionary alternative.

   The problem identified:   
> "The main problem, the 'virus' that has affected our country, is that it has lost its way. The knowledge I convey is knowledge drawn from the Prophet Mohamed, called *al khilmoul nafiha* — useful knowledge."

   The principles of his system:   
-    Theory + Practice   : Unlike the archaic system that only focused on theory
-    Adaptation to individuals   : He took into consideration the diverse skills of each person
-    Symbolic methods   : Schematic drawings, geometric figures, African anecdotes
-    Adapted schedules   : Teachings after Asr, Isha or Fajr prayers to avoid fatigue

   Three conditions to be a good teacher according to the Sheikh:   
1. Good mastery of the Quran and knowledge of the Sunnah
2. Beautiful eloquence
3. Great intelligence

   Fundamental quote:   
> "Never spend a day without learning something new, because lack of knowledge kills the heart." — Serigne Touba, Nahju

> "Where people excel, it is not by blood or social rank, but only by: having knowledge, being disciplined, and applying that knowledge."`
      },
      {
        id: 'l-2-3',
        title_fr: "La Tarbiya : l'éducation spirituelle de l'âme",
        title_en: "Tarbiya: spiritual education of the soul",
        duration_min: 8,
        content_fr: `La    Tarbiya    est le processus de purification et d'éducation spirituelle au cœur du mouridisme.

   Les concepts clés :   
-    Takhlia    : Se vider des vices et mauvaises habitudes
-    Tahlia    : Se remplir de vertus et de bonne conduite

   Les 4 piliers de la vie spirituelle (Huqa al Buka'u) :   
> "Les arcanes de l'édifice de la communauté des saints sont au nombre de quatre :    Silence, faim, veillée, et solitude   . Ces piliers reposent sur les enseignements des vénérables."

   Les pratiques recommandées :   
- Maîtrise de soi par le    jeûne   
-    Silence    par la méditation
-    Veillée nocturne    par la prière
-    Solitude    par la contemplation
-    Service    par l'amour divin
-    Générosité    dans les œuvres pieuses

   Le Dhikr (invocation) :   
Le Cheikh enseignait à Cheikh Ibrahima Fall :
> "Il n'y a pas d'acte plus éminent que la prononciation perpétuelle de la formule *Laa Ilaha ilallah*, où que l'on puisse être."

   Lecture du Coran :   
La lecture quotidienne était fixée à un minimum de    3 sections (hizb)    du Coran, constituant une des conditions essentielles pour ceux qui pratiquaient le Wird.`,
        content_en: `   Tarbiya    is the process of purification and spiritual education at the heart of Mouridism.

   Key concepts:   
-    Takhlia   : Emptying oneself of vices and bad habits
-    Tahlia   : Filling oneself with virtues and good conduct

   The 4 pillars of spiritual life (Huqa al Buka'u):   
> "The arcana of the edifice of the community of saints number four:    Silence, hunger, vigil, and solitude   . These pillars rest on the teachings of the venerable."

   Recommended practices:   
- Self-mastery through    fasting   
-    Silence    through meditation
-    Night vigil    through prayer
-    Solitude    through contemplation
-    Service    through divine love
-    Generosity    in pious works

   Dhikr (invocation):   
The Sheikh taught Cheikh Ibrahima Fall:
> "There is no act more eminent than the perpetual pronouncing of the formula *Laa Ilaha ilallah*, wherever one may be."

   Reading the Quran:   
Daily reading was fixed at a minimum of    3 sections (hizb)    of the Quran, constituting one of the essential conditions for those who practiced the Wird.`
      }
    ]
  },
  {
    id: 'mod-3',
    course_id: 'leadership-bamba',
    order: 3,
    icon: '👑',
    title_fr: 'Les qualités du leadership authentique',
    title_en: 'The qualities of authentic leadership',
    description_fr: "Les vertus et qualités exceptionnelles qui font de Cheikh Ahmadou Bamba un modèle universel de leadership.",
    description_en: "The exceptional virtues and qualities that make Cheikh Ahmadou Bamba a universal model of leadership.",
    lecons: [
      {
        id: 'l-3-1',
        title_fr: "Résilience et patience face à l'adversité",
        title_en: "Resilience and patience in the face of adversity",
        duration_min: 8,
        content_fr: `Le leadership de Cheikh Ahmadou Bamba se distingue par une    résilience extraordinaire    face aux épreuves les plus sévères.

   Les épreuves subies :   
- Exil au    Gabon    (1895-1902) — 7 ans dans la forêt dense
- Exil en    Mauritanie    (1903-1907) — second exil
- Résidence surveillée à    Thiéyène Djolof    (1907-1912) — chaleur étouffante, manque d'eau
- Résidence surveillée à    Diourbel    (1912-1927)

   Sa réponse à toutes ces épreuves :   
Il n'a jamais montré de peur, de fatigue ou de soumission aux colonisateurs. Il n'a jamais demandé l'aide de sa famille ni de personne d'autre.

   Le pacte avec Allah :   
> "Je permettrai à vos ennemis de te faire vivre toutes les atrocités du monde. Si tu essaies de te plaindre ou de montrer un signe de peur ou de fatigue, je laisserai tomber toutes les bénédictions et dons que je garde pour toi."

   L'exemple de la foi :   
Serigne Modou Lo Dagana a dit à sa femme : *"Si tu veux divorcer, vas-y, mais moi, je ne reviendrai jamais tant que je n'ai pas vu Cheikh Ahmadou Bamba."* Il a marché pendant    12 ans    pour le voir à Thiéyène Djolof.

   Les qualités de caractère :   
- Brave sans précipitation ni colère
- Courageux sans fanfaronnade
- Patient et tolérant
- Humble et généreux
- Maître de sa colère`,
        content_en: `The leadership of Cheikh Ahmadou Bamba is distinguished by    extraordinary resilience    in the face of the most severe trials.

   Trials endured:   
- Exile in    Gabon    (1895-1902) — 7 years in dense forest
- Exile in    Mauritania    (1903-1907) — second exile
- House arrest in    Thiéyène Djolof    (1907-1912) — stifling heat, lack of water
- House arrest in    Diourbel    (1912-1927)

   His response to all these trials:   
He never showed fear, fatigue or submission to colonizers. He never asked for help from his family or anyone else.

   The pact with Allah:   
> "I will allow your enemies to make you experience all the atrocities of the world. If you try to complain or show a sign of fear or fatigue, I will let fall all the blessings and gifts I keep for you."

   The example of faith:   
Serigne Modou Lo Dagana told his wife: *"If you want to divorce, go ahead, but I will never return until I have seen Cheikh Ahmadou Bamba."* He walked for    12 years    to see him in Thiéyène Djolof.

   Character qualities:   
- Brave without haste or anger
- Courageous without boasting
- Patient and tolerant
- Humble and generous
- Master of his anger`
      },
      {
        id: 'l-3-2',
        title_fr: "Le leadership pacifique et la résistance non-violente",
        title_en: "Peaceful leadership and non-violent resistance",
        duration_min: 7,
        content_fr: `Cheikh Ahmadou Bamba a choisi une voie de résistance    totalement unique    dans l'histoire africaine.

   Comparaison avec d'autres leaders :   
Aujourd'hui, lorsqu'on cite des figures de non-violence comme    Mahatma Gandhi    ou    Martin Luther King   , il apparaît que Serigne Touba les dépasse. Il avait les    moyens de tenir tête    aux colonisateurs, mais il a choisi la paix.

   Sa philosophie de la résistance :   
> "Si vous dites que je fais la guerre, oui, je suis un guerrier et je fais la guerre, mais mes armes sont différentes et mon terrain de combat est différent. Je fais la guerre avec la    science    et la    crainte révérencielle   ."

   La liberté selon le Cheikh :   
> "La liberté est un concept intérieur : on peut être libre même enchaîné et être enchaîné tout en étant libre."

   Son influence sur l'indépendance :   
Le Cheikh pensait que chaque    4 avril    (fête de l'indépendance du Sénégal), sa photo devrait être visible partout, car il a été le    véritable fer de lance de cette indépendance spirituelle et morale   .

   Son refus du Jihad militaire :   
Il refusa le Jihad militaire, mais entreprit    "un autre combat, plus difficile et plus avantageux"    — le combat spirituel contre les idées de perversité, les péchés et la corruption de l'âme (djihâd an nafs).`,
        content_en: `Cheikh Ahmadou Bamba chose a    totally unique    path of resistance in African history.

   Comparison with other leaders:   
Today, when citing figures of non-violence like    Mahatma Gandhi    or    Martin Luther King   , it appears that Serigne Touba surpasses them. He had the    means to stand up    to colonizers, but chose peace.

   His philosophy of resistance:   
> "If you say I make war, yes, I am a warrior and I make war, but my weapons are different and my battlefield is different. I make war with    science    and    reverential fear   ."

   Freedom according to the Sheikh:   
> "Freedom is an interior concept: one can be free even in chains and be chained while being free."

   His influence on independence:   
The Sheikh thought that every    April 4    (Senegal's independence day), his photo should be visible everywhere, as he was the    true spearhead of this spiritual and moral independence   .

   His refusal of military Jihad:   
He refused military Jihad, but undertook    "another combat, more difficult and more advantageous"    — the spiritual combat against ideas of perversity, sins and corruption of the soul (djihâd an nafs).`
      }
    ]
  },
  {
    id: 'mod-4',
    course_id: 'leadership-bamba',
    order: 4,
    icon: '💼',
    title_fr: 'Le modèle économique mouride',
    title_en: 'The Mouride economic model',
    description_fr: "Comment le mouridisme a développé un modèle économique unique basé sur le travail, la foi et la solidarité communautaire.",
    description_en: "How Mouridism developed a unique economic model based on work, faith and community solidarity.",
    lecons: [
      {
        id: 'l-4-1',
        title_fr: "Le travail comme adoration : fondement économique mouride",
        title_en: "Work as worship: Mouride economic foundation",
        duration_min: 7,
        content_fr: `Le mouridisme place le    travail au cœur de ses valeurs    économiques et spirituelles.

   La philosophie du travail :   
> "Travaille pour cette vie comme si tu devais être éternel, et travaille pour l'au-delà comme si tu devais mourir demain." — Hadith du Prophète Muhammad, repris par Cheikh Bamba

   Les réalisations économiques remarquables :   

   1. L'aide à la France (1920s) :   
Serigne Touba, emprisonné, a pu offrir    500 000 francs    à la France en crise — un exploit paradoxal qui démontre la puissance du modèle mouride.

   2. Le chemin de fer Diourbel-Touba (1929-1932) :   
-    50 km    construits par la communauté mouride
-    1500 ouvriers    mobilisés
- Coût total :    10 millions de francs or   
- Payé en partie avec les récoltes agricoles

   3. La Grande Mosquée de Touba :   
- Construction commencée en    1932    sous Serigne Moustapha
- Inaugurée en    1963    sous Serigne Fallou
- Financée entièrement par la communauté

   Le principe de la Hadiya :   
Les dons (hadiya) et le volontariat ont permis de développer une infrastructure pédagogique et initiatique complète à Touba et dans les dahiras du monde entier.`,
        content_en: `Mouridism places    work at the heart of its    economic and spiritual values.

   The philosophy of work:   
> "Work for this life as if you were to live forever, and work for the hereafter as if you were to die tomorrow." — Prophet Muhammad's Hadith, taken up by Cheikh Bamba

   Remarkable economic achievements:   

   1. Aid to France (1920s):   
Serigne Touba, imprisoned, was able to offer    500,000 francs    to France in crisis — a paradoxical feat demonstrating the power of the Mouride model.

   2. The Diourbel-Touba Railway (1929-1932):   
-    50 km    built by the Mouride community
-    1,500 workers    mobilized
- Total cost:    10 million gold francs   
- Partly paid with agricultural harvests

   3. The Great Mosque of Touba:   
- Construction begun in    1932    under Serigne Moustapha
- Inaugurated in    1963    under Serigne Fallou
- Entirely financed by the community

   The principle of Hadiya:   
Gifts (hadiya) and volunteering have allowed the development of a complete pedagogical and initiatory infrastructure in Touba and in dahiras worldwide.`
      },
      {
        id: 'l-4-2',
        title_fr: "L'expansion mondiale du mouridisme",
        title_en: "The worldwide expansion of Mouridism",
        duration_min: 8,
        content_fr: `Depuis la grande sécheresse de    1970   , les mourides ont commencé à s'expatrier, créant un réseau mondial remarquable.

   La diaspora mouride dans le monde :   
-    Europe    : France (Marseille, Paris-Taverny), Italie (Brescia, Bergamo, Milan, Naples), Espagne
-    Amérique    : États-Unis (New York, Atlanta, Washington), Canada
-    Afrique    : Côte d'Ivoire, Congo, Cameroun, Afrique du Sud, Gabon, Sénégal

   L'organisation en Dahiras :   
Partout dans le monde, les mourides se sont organisés en    Dahiras    où fonctionne la solidarité et où ils recréent un espace socioculturel rappelant Touba.

   Résidences de Serigne Touba à l'étranger :   
Abidjan, Yamoussoukro, Johannesburg, Libreville, Bergamo, Brescia, Taverny (Paris), New York...

   La vision de Serigne Touba :   
> "Fais affluer tout ce qui est bien-être et bienfait du patrimoine des six côtés de la planète vers ma demeure, la cité bénite de Touba." — Prière du Cheikh dans Matlabul Fawzeyni

   Touba : ville sainte et économique :   
- 2ème ville économique du Sénégal
- Siège du marché mondial    Ocass   
- Université Khadimou Rassoul fondée par Serigne Mountakha
- Plusieurs écoles coraniques et centres d'éducation`,
        content_en: `Since the great drought of    1970   , Mourides began to expatriate, creating a remarkable worldwide network.

   The Mouride diaspora worldwide:   
-    Europe   : France (Marseille, Paris-Taverny), Italy (Brescia, Bergamo, Milan, Naples), Spain
-    America   : United States (New York, Atlanta, Washington), Canada
-    Africa   : Ivory Coast, Congo, Cameroon, South Africa, Gabon, Senegal

   Organization in Dahiras:   
Everywhere in the world, Mourides have organized into    Dahiras    where solidarity functions and where they recreate a sociocultural space reminiscent of Touba.

   Residences of Serigne Touba abroad:   
Abidjan, Yamoussoukro, Johannesburg, Libreville, Bergamo, Brescia, Taverny (Paris), New York...

   The vision of Serigne Touba:   
> "Make all well-being and benefit from the heritage of the six sides of the planet flow toward my home, the blessed city of Touba." — Sheikh's prayer in Matlabul Fawzeyni

   Touba: holy and economic city:   
- 2nd economic city of Senegal
- Headquarters of the global    Ocass    market
- University Khadimou Rassoul founded by Serigne Mountakha
- Several Quranic schools and education centers`
      }
    ]
  },
  {
    id: 'mod-5',
    course_id: 'leadership-bamba',
    order: 5,
    icon: '🌟',
    title_fr: "L'héritage et la pertinence contemporaine",
    title_en: "The legacy and contemporary relevance",
    description_fr: "Comment les enseignements de Cheikh Ahmadou Bamba restent une boussole pour le monde contemporain.",
    description_en: "How the teachings of Cheikh Ahmadou Bamba remain a compass for the contemporary world.",
    lecons: [
      {
        id: 'l-5-1',
        title_fr: "Les Khalifes et la continuité de l'œuvre",
        title_en: "The Khalifes and the continuity of the work",
        duration_min: 7,
        content_fr: `Depuis le décès de Cheikh Ahmadou Bamba en    1927   ,    8 Khalifes    se sont succédé pour perpétuer son œuvre :

| # | Nom | Période |
|---|-----|---------|
| 1 | Serigne Mouhamadou Moustapha | 1927-1945 |
| 2 | Serigne Fallou Mbacké | 1945-1968 |
| 3 | Cheikh Abdoul Ahad Mbacké | 1968-1989 |
| 4 | Serigne Abdoul Khadir Mbacké | 1989-1990 |
| 5 | Cheikh Saliou Mbacké | 1990-2007 |
| 6 | Serigne Lamine Bara Mbacké | 2007-2010 |
| 7 | Serigne Sidy Mokhtar Mbacké | 2010-2018 |
| 8 | Serigne Mountakha Bassirou Mbacké | 2018-présent |

   Les grandes réalisations des Khalifes :   
- Serigne Moustapha : Construction du chemin de fer Diourbel-Touba et début de la Grande Mosquée
- Serigne Fallou : Inauguration de la Grande Mosquée (1963) et institution du Grand Magal
- Serigne Mountakha : Construction de l'Université Khadimou Rassoul à Touba

   Citation de Serigne Abo Mbacké :   
> "Chaque Khalife doit s'investir dans la mosquée de Touba. C'est l'héritage de Cheikh Ahmadou Bamba. Il y aura toujours quelque chose à faire, à refaire ou à parfaire."`,
        content_en: `Since the death of Cheikh Ahmadou Bamba in    1927   ,    8 Khalifes    have succeeded each other to perpetuate his work:

| # | Name | Period |
|---|------|--------|
| 1 | Serigne Mouhamadou Moustapha | 1927-1945 |
| 2 | Serigne Fallou Mbacké | 1945-1968 |
| 3 | Cheikh Abdoul Ahad Mbacké | 1968-1989 |
| 4 | Serigne Abdoul Khadir Mbacké | 1989-1990 |
| 5 | Cheikh Saliou Mbacké | 1990-2007 |
| 6 | Serigne Lamine Bara Mbacké | 2007-2010 |
| 7 | Serigne Sidy Mokhtar Mbacké | 2010-2018 |
| 8 | Serigne Mountakha Bassirou Mbacké | 2018-present |

   Major achievements of the Khalifes:   
- Serigne Moustapha: Construction of the Diourbel-Touba railway and start of the Grand Mosque
- Serigne Fallou: Inauguration of the Grand Mosque (1963) and institution of the Grand Magal
- Serigne Mountakha: Construction of the University Khadimou Rassoul in Touba

   Quote by Serigne Abo Mbacké:   
> "Each Khalife must invest in the mosque of Touba. It is the legacy of Cheikh Ahmadou Bamba. There will always be something to do, redo or perfect."`
      },
      {
        id: 'l-5-2',
        title_fr: "Les enseignements pérennes pour le monde contemporain",
        title_en: "Enduring teachings for the contemporary world",
        duration_min: 9,
        content_fr: `Les enseignements de Cheikh Ahmadou Bamba restent d'une    pertinence extraordinaire    pour notre époque.

   Face aux crises mondiales actuelles :   
- Conflits géopolitiques
- Crises économiques
- Désastres écologiques
- Fractures sociales

   La réponse du mouridisme :   
> "Il est évident que les enseignements et la personne de Cheikh Ahmadou Bamba peuvent nous aider à concevoir un monde meilleur, loin de la grande terreur qui semble nous envahir aujourd'hui."

   Les maximes essentielles du Cheikh :   

1.    Sur la connaissance :   
> "Ô vous, la génération des jeunes ! Si vous redoutez la honte, faites précéder l'action par la science." — Tazawudu Sighaar, vers 12

2.    Sur le service :   
> "Aidez les pauvres, les malheureux, ainsi que les endettés."

3.    Sur l'humilité :   
> "Ne passez jamais une journée sans apprendre quelque chose de nouveau, car le manque de connaissance tue le cœur."

4.    Sur l'indépendance :   
> "Je compte sur mon Seigneur, je me contente de Lui, je ne désire rien d'autre que le savoir et la religion." — Kàddu Li Yarkane

   Le leadership selon le Cheikh :   
- Servir sans dominer
- Transformer par l'exemplarité
- Éduquer pour libérer
- Résister pacifiquement
- Unir sans exclure

   L'intégration officielle :   
Le gouvernement du Sénégal a intégré *Kun Katimane* (œuvre du Cheikh) dans le programme scolaire, mais comme le dit l'auteur : "Ce n'est qu'une partie de ce que nous devons tirer du Cheikh."`,
        content_en: `The teachings of Cheikh Ahmadou Bamba remain of    extraordinary relevance    for our time.

   Facing current global crises:   
- Geopolitical conflicts
- Economic crises
- Ecological disasters
- Social fractures

   The Mouride response:   
> "It is obvious that the teachings and person of Cheikh Ahmadou Bamba can help us conceive a better world, far from the great terror that seems to engulf us today."

   Essential maxims of the Sheikh:   

1.    On knowledge:   
> "O you, the generation of youth! If you fear shame, precede action with science." — Tazawudu Sighaar, verse 12

2.    On service:   
> "Help the poor, the unfortunate, as well as the indebted."

3.    On humility:   
> "Never spend a day without learning something new, because lack of knowledge kills the heart."

4.    On independence:   
> "I count on my Lord, I am content with Him, I desire nothing other than knowledge and religion." — Kàddu Li Yarkane

   Leadership according to the Sheikh:   
- Serve without dominating
- Transform through exemplarity
- Educate to liberate
- Resist peacefully
- Unite without excluding

   Official integration:   
The Senegalese government integrated *Kun Katimane* (Sheikh's work) into the school curriculum, but as the author says: "This is only part of what we must draw from the Sheikh."`
      }
    ]
  }
]

export const COURSES = [
  {
    id: 'leadership-bamba',
    title_fr: 'Le Leadership de Cheikh Ahmadou Bamba',
    title_en: 'The Leadership of Cheikh Ahmadou Bamba',
    description_fr: "Une étude complète du leadership spirituel, temporel et éducatif de Khadimou Rassoul basée sur l'ouvrage de Mouhamed Sène.",
    description_en: "A comprehensive study of the spiritual, temporal and educational leadership of Khadimou Rassoul based on the work of Mouhamed Sène.",
    icon: '📖',
    color: 'from-mouride-green to-mouride-green-dark',
    modules_count: 5,
    lecons_count: 11,
    duration_min: 90,
    author: 'Mouhamed Sène',
  }
]
