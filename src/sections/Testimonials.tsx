'use client'
import { useState, useEffect } from 'react';
import { useLang } from '@/hooks/useLang';

interface Testimonial {
  name: string;
  country: string;
  emoji: string;
  text_fr: string;
  text_en: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  { name: 'Fatou D.', country: 'Sénégal 🇸🇳', emoji: '🌟', text_fr: "Une plateforme exceptionnelle ! Enfin un espace dédié à la pensée de Cheikh Ahmadou Bamba accessible à tous.", text_en: "An exceptional platform! Finally a space dedicated to the thought of Cheikh Ahmadou Bamba accessible to all.", rating: 5 },
  { name: 'Moussa K.', country: 'France 🇫🇷', emoji: '💚', text_fr: "Les Khassaïdes expliquées avec leur contexte historique, c'est exactement ce dont on avait besoin. Félicitations !", text_en: "The Khassaïdes explained with their historical context is exactly what we needed. Congratulations!", rating: 5 },
  { name: 'Aissatou B.', country: 'USA 🇺🇸', emoji: '📚', text_fr: "Je vis aux États-Unis et cette plateforme me connecte à mes racines mourides. Le contenu bilingue est parfait.", text_en: "I live in the US and this platform connects me to my Mouride roots. The bilingual content is perfect.", rating: 5 },
  { name: 'Omar T.', country: 'Italie 🇮🇹', emoji: '✨', text_fr: "La chronologie des Khalifes est remarquable. Un travail de recherche impressionnant pour notre communauté.", text_en: "The Khalifes timeline is remarkable. Impressive research work for our community.", rating: 5 },
  { name: 'Mariama S.', country: 'Côte d\'Ivoire 🇨🇮', emoji: '🙏', text_fr: "Baraka Allahu fikoum. Ce projet est une lumière pour la jeunesse africaine mouride du monde entier.", text_en: "Baraka Allahu fikoum. This project is a light for Mouride African youth worldwide.", rating: 5 },
  { name: 'Ibrahima F.', country: 'Canada 🇨🇦', emoji: '🎓', text_fr: "En tant qu'étudiant, cette ressource est inestimable pour comprendre le mouridisme et son modèle économique unique.", text_en: "As a student, this resource is invaluable for understanding Mouridism and its unique economic model.", rating: 5 },
];

export default function Testimonials() {
  const { lang } = useLang();
  const [visitors, setVisitors] = useState<number>(0);
  const [newTestimonial, setNewTestimonial] = useState<string>('');
  const [testimonialName, setTestimonialName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Simulate visitor counter
  useEffect(() => {
    const base = 2847;
    const today = Math.floor(Date.now() / 86400000);
    const daily = (today % 50) + 10;
    setVisitors(base + daily);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTestimonial.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="temoignages" className="py-20 bg-mouride-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Visitor counter */}
        <div className="text-center mb-16">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">
            {lang === 'fr' ? 'Notre communauté' : 'Our community'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-mouride-green mt-2 mb-4">
            {lang === 'fr' ? 'Ils nous font confiance' : 'They trust us'}
          </h2>
          <div className="w-16 h-1 bg-mouride-gold mx-auto rounded-full mb-8" />

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="bg-white rounded-2xl px-8 py-5 shadow-md text-center">
              <p className="text-4xl font-display font-bold text-mouride-green">{visitors.toLocaleString()}+</p>
              <p className="text-gray-500 text-sm mt-1">{lang === 'fr' ? 'Visiteurs' : 'Visitors'}</p>
            </div>
            <div className="bg-white rounded-2xl px-8 py-5 shadow-md text-center">
              <p className="text-4xl font-display font-bold text-mouride-green">2</p>
              <p className="text-gray-500 text-sm mt-1">{lang === 'fr' ? 'Langues' : 'Languages'}</p>
            </div>
            <div className="bg-white rounded-2xl px-8 py-5 shadow-md text-center">
              <p className="text-4xl font-display font-bold text-mouride-green">10+</p>
              <p className="text-gray-500 text-sm mt-1">{lang === 'fr' ? 'Pays' : 'Countries'}</p>
            </div>
            <div className="bg-white rounded-2xl px-8 py-5 shadow-md text-center">
              <p className="text-4xl font-display font-bold text-mouride-green">⭐ 5/5</p>
              <p className="text-gray-500 text-sm mt-1">{lang === 'fr' ? 'Satisfaction' : 'Satisfaction'}</p>
            </div>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((t: Testimonial, i: number) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-mouride-green rounded-full flex items-center justify-center text-lg flex-shrink-0">
                  {t.emoji}
                </div>
                <div>
                  <p className="font-semibold text-mouride-green">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.country}</p>
                </div>
                <div className="ml-auto text-mouride-gold text-xs">{'⭐'.repeat(t.rating)}</div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic">
                "{lang === 'fr' ? t.text_fr : t.text_en}"
              </p>
            </div>
          ))}
        </div>

        {/* Leave a testimonial */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-display font-bold text-mouride-green text-center mb-6">
            {lang === 'fr' ? 'Partagez votre ressenti 💬' : 'Share your feeling 💬'}
          </h3>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-md">
              <div className="mb-4">
                <input
                  type="text"
                  value={testimonialName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTestimonialName(e.target.value)}
                  placeholder={lang === 'fr' ? 'Votre prénom et pays' : 'Your name and country'}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mouride-green"
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={newTestimonial}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewTestimonial(e.target.value)}
                  placeholder={lang === 'fr'
                    ? 'Partagez votre expérience avec Étudiant Mouride...'
                    : 'Share your experience with Étudiant Mouride...'}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mouride-green resize-none"
                />
              </div>
              <button type="submit"
                className="w-full bg-mouride-green text-white font-semibold py-3 rounded-xl hover:bg-mouride-green-dark transition-colors text-sm">
                {lang === 'fr' ? 'Envoyer mon témoignage' : 'Send my testimonial'}
              </button>
            </form>
          ) : (
            <div className="bg-mouride-green rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">🙏</div>
              <p className="text-mouride-gold font-display font-bold text-xl mb-2">
                {lang === 'fr' ? 'Jazakallahu khayran !' : 'Jazakallahu khayran!'}
              </p>
              <p className="text-green-200 text-sm">
                {lang === 'fr'
                  ? 'Merci pour votre témoignage. Il sera examiné et publié prochainement.'
                  : 'Thank you for your testimonial. It will be reviewed and published soon.'}
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
