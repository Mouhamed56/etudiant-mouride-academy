'use client'
import { useState } from 'react';
import { useLang } from '@/hooks/useLang';

export default function Newsletter() {
  const { lang } = useLang();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [interest, setInterest] = useState<string>('all');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const interests = lang === 'fr'
    ? ['Tous les sujets', 'Articles & Blog', 'Khassaïdes', 'Actualités mourides', 'Innovations', 'Événements', 'Livres & Publications']
    : ['All topics', 'Articles & Blog', 'Khassaïdes', 'Mouride News', 'Innovations', 'Events', 'Books & Publications'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="newsletter" className="py-16 bg-mouride-green">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-mouride-gold font-semibold text-sm uppercase tracking-wider">
            {lang === 'fr' ? 'Restez informé' : 'Stay informed'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2 mb-3">
            {lang === 'fr' ? 'Rejoignez la communauté' : 'Join the community'}
          </h2>
          <div className="w-16 h-1 bg-mouride-gold mx-auto rounded-full mb-4" />
          <p className="text-green-200 max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Recevez nos articles, Khassaïdes, actualités mourides, innovations et bien plus directement dans votre boîte mail.'
              : 'Receive our articles, Khassaïdes, Mouride news, innovations and much more directly in your inbox.'}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur rounded-2xl p-6 sm:p-8 border border-white/20">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-green-200 text-sm mb-1">
                  {lang === 'fr' ? 'Votre prénom' : 'Your first name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  placeholder={lang === 'fr' ? 'Prénom' : 'First name'}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-mouride-gold text-sm"
                />
              </div>
              <div>
                <label className="block text-green-200 text-sm mb-1">
                  {lang === 'fr' ? 'Votre email *' : 'Your email *'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder={lang === 'fr' ? 'votre@email.com' : 'your@email.com'}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-mouride-gold text-sm"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-green-200 text-sm mb-2">
                {lang === 'fr' ? "Je m'intéresse à :" : 'I am interested in:'}
              </label>
              <div className="flex flex-wrap gap-2">
                {interests.map((item: string, i: number) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setInterest(item)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      interest === item
                        ? 'bg-mouride-gold text-mouride-green'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit"
              className="w-full bg-mouride-gold text-mouride-green font-bold py-3 rounded-xl hover:bg-mouride-gold-light transition-colors text-sm">
              {lang === 'fr' ? "S'abonner gratuitement" : 'Subscribe for free'}
            </button>
            <p className="text-white/30 text-xs text-center mt-3">
              {lang === 'fr' ? 'Pas de spam. Désinscription à tout moment.' : 'No spam. Unsubscribe anytime.'}
            </p>
          </form>
        ) : (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center border border-mouride-gold/30">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-mouride-gold font-display font-bold text-2xl mb-2">
              {lang === 'fr' ? 'Merci !' : 'Thank you!'}
            </h3>
            <p className="text-green-200">
              {lang === 'fr'
                ? `Bienvenue ${name ? name + ' !' : '!'} Vous êtes maintenant abonné(e) à la newsletter Étudiant Mouride.`
                : `Welcome ${name ? name + '!' : '!'} You are now subscribed to the Étudiant Mouride newsletter.`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
