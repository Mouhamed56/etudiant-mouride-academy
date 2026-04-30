'use client'
import { useState, useRef, useEffect, useCallback } from 'react';
import { useLang } from '@/hooks/useLang';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface KBItem {
  keys: string[];
  answer: string;
}

const KB: Record<string, KBItem[]> = {
  fr: [
    { keys: ['cheikh','bamba','serigne touba','khadim','qui est','fondateur mouridisme'], answer: "Cheikh Ahmadou Bamba Mbacké (1853-1927) est le fondateur du mouridisme, surnommé Khadimou Rassoul (Serviteur du Prophète). Né à Mbacké Baol, il était un érudit islamique, réformateur religieux et résistant pacifique face au colonialisme français." },
    { keys: ['exil','gabon','mauritanie','thieyene','diourbel','déportation','1895'], answer: "Cheikh Ahmadou Bamba a subi deux exils : au Gabon (1895-1902) et en Mauritanie (1903-1907). Le 21 Safar 1895, il quitte le Sénégal à bord du navire «Ville de Pernambouc». Il pria à la gare de Louga le 20 Août 1895 avant sa déportation." },
    { keys: ['mouridisme','confrérie','tariqa'], answer: "Le mouridisme est une confrérie islamique soufie fondée par Cheikh Ahmadou Bamba au Sénégal. Ses valeurs : Foi (Iman), Travail (Ligééy), Service (Dieureudieuf), Éducation (Tarbiya), Patience (Sabaru)." },
    { keys: ['enseignement','valeur','foi','iman','travail','ligééy','service','patience','sabaru'], answer: "Les 6 enseignements fondamentaux : 1. La Foi (Iman). 2. Le Travail (Ligééy) - le travail est une adoration. 3. Le Service (Dieureudieuf). 4. L'Éducation (Tarbiya). 5. Le Leadership. 6. La Patience (Sabaru)." },
    { keys: ['khassaide','qassida','poème','assirou','minal haqqi','matlabul','jazb'], answer: "Les Khassaïdes sont les poèmes spirituels de Cheikh Ahmadou Bamba. Les 6 expliquées : Minal Haqqi, Assirou (1895), Alaa Innanii Usnii, Matlabou Shifai, Matlaboul Fawzeyni, Jazb Al Qouloub." },
    { keys: ['khalife','successeur','mountakha','fallou','abdoul ahad','saliou'], answer: "Les 8 Khalifes : 1. Serigne Mouhamadou Moustapha (1927-1945). 2. Serigne Fallou (1945-1968). 3. Cheikh Abdoul Ahad (1968-1989). 4. Serigne Abdoul Khadir (1989-1990). 5. Cheikh Saliou (1990-2007). 6. Serigne Lamine Bara (2007-2010). 7. Serigne Sidy Mokhtar (2010-2018). 8. Serigne Mountakha (2018-présent)." },
    { keys: ['magal','pèlerinage','safar'], answer: "Le Grand Magal de Touba commémore le départ en exil (21 Safar 1895) avec +3 millions de fidèles. Institué par Serigne Fallou en 1948." },
    { keys: ['touba','mosquée','cité sainte'], answer: "Touba est la ville sainte du mouridisme, fondée en 1887-1888 par Cheikh Ahmadou Bamba. 2ème ville économique du Sénégal." },
    { keys: ['livre','book','pdf','bibliothèque','leadership'], answer: "Livres disponibles : Guide du Mouridisme, Les Bienfaits de l'Éternel, Les Khassaides de Serigne Touba, Diazbul Mouride, Le Leadership de Cheikh Ahmadou Bamba par Mouhamed Sène." },
    { keys: ['contact','email','whatsapp'], answer: "Contact : Email : mouhamedsene.office@gmail.com | WhatsApp : +221 77 744 61 57 | Réseaux : YouTube @etudiantmouride | TikTok @etudiantmuridedigital6 | Instagram @etudiant_mouride" },
    { keys: ['citation','parole','mon combat'], answer: "Citations du Cheikh : 'Ne sacrifie pas l'au-delà pour ce monde.' • 'Mon combat n'est pas contre les hommes, mais contre l'ignorance et l'injustice.' • 'Ne te plains pas tout le temps des épreuves.'" },
    { keys: ['mouhamed','sène','fondateur site'], answer: "Mouhamed Sène est le fondateur d'Étudiant Mouride. Étudiant en Master en Sciences de l'Éducation, entrepreneur tech et auteur du livre 'Le Leadership de Cheikh Ahmadou Bamba'." },
  ],
  en: [
    { keys: ['cheikh','bamba','serigne touba','khadim','who is','founder'], answer: "Cheikh Ahmadou Bamba Mbacké (1853-1927) is the founder of Mouridism, called Khadimou Rassoul (Servant of the Prophet). Born in Mbacké Baol, he was an Islamic scholar, religious reformer and peaceful resister against French colonialism." },
    { keys: ['exile','gabon','mauritania','thieyene','1895'], answer: "Cheikh Ahmadou Bamba suffered two exiles: to Gabon (1895-1902) and Mauritania (1903-1907). He prayed at Louga station on August 20, 1895 before his deportation." },
    { keys: ['mouridism','brotherhood','tariqa'], answer: "Mouridism is a Sufi Islamic brotherhood founded by Cheikh Ahmadou Bamba in Senegal. Its values: Faith (Iman), Work (Ligééy), Service, Education (Tarbiya), Patience (Sabaru)." },
    { keys: ['teaching','value','faith','work','patience'], answer: "The 6 fundamental teachings: 1. Faith (Iman). 2. Work (Ligééy) - work is worship. 3. Service (Dieureudieuf). 4. Education (Tarbiya). 5. Leadership. 6. Patience (Sabaru)." },
    { keys: ['khassaide','poem','assirou','matlabul','jazb'], answer: "The Khassaïdes are the spiritual poems of Cheikh Ahmadou Bamba: Minal Haqqi, Assirou (1895), Matlaboul Fawzeyni, Jazb Al Qouloub and more." },
    { keys: ['khalife','successor','mountakha','fallou'], answer: "The 8 Khalifes: 1. Serigne Mouhamadou Moustapha (1927-1945). 2. Serigne Fallou (1945-1968). 3. Cheikh Abdoul Ahad (1968-1989). 4-8... current: Serigne Mountakha (2018-present)." },
    { keys: ['magal','pilgrimage'], answer: "The Grand Magal of Touba commemorates the Sheikh's exile (21 Safar 1895) with +3 million faithful. Instituted by Serigne Fallou in 1948." },
    { keys: ['touba','mosque','holy city'], answer: "Touba is the holy city of Mouridism, founded in 1887-1888 by Cheikh Ahmadou Bamba. 2nd economic city of Senegal." },
    { keys: ['book','pdf','library','leadership'], answer: "Books available: Guide to Mouridism, The Eternal's Blessings, The Khassaïdes of Serigne Touba, Diazbul Mouride, The Leadership of Cheikh Ahmadou Bamba by Mouhamed Sène." },
    { keys: ['contact','email','whatsapp'], answer: "Contact: Email: mouhamedsene.office@gmail.com | WhatsApp: +221 77 744 61 57 | YouTube @etudiantmouride | TikTok @etudiantmuridedigital6" },
  ],
};

function getResponse(question: string, lang: string): string {
  const q = question.toLowerCase();
  const kb = KB[lang] ?? KB['fr'];
  for (const item of kb) {
    if (item.keys.some((k: string) => q.includes(k))) return item.answer;
  }
  return lang === 'fr'
    ? "Je peux vous renseigner sur : Cheikh Ahmadou Bamba, le mouridisme, les Khalifes, les Khassaïdes, le Grand Magal, Touba, les livres, les contacts."
    : "I can answer about: Cheikh Ahmadou Bamba, Mouridism, Khalifes, Khassaïdes, Grand Magal, Touba, books, contacts.";
}

export default function Chatbot() {
  const { lang } = useLang();
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const welcome: string = lang === 'fr'
    ? "Assalamu Alaikum ! Je suis l'assistant d'Étudiant Mouride. Posez-moi vos questions sur Cheikh Ahmadou Bamba, le mouridisme, les Khassaïdes..."
    : "Assalamu Alaikum! I am the Étudiant Mouride assistant. Ask me about Cheikh Ahmadou Bamba, Mouridism, Khassaïdes...";

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: welcome }]);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback((): void => {
    if (!input.trim()) return;
    const reply = getResponse(input.trim(), lang);
    setMessages((prev: ChatMessage[]) => [...prev, { role: 'user', content: input.trim() }, { role: 'assistant', content: reply }]);
    setInput('');
  }, [input, lang]);

  return (
    <>
      <button onClick={() => setOpen((o: boolean) => !o)} style={{ position:'fixed', bottom:'24px', right:'24px', zIndex:9999, width:'56px', height:'56px', borderRadius:'50%', background:'#166534', border:'3px solid #D4B558', boxShadow:'0 4px 20px rgba(0,0,0,0.3)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {open
          ? <svg viewBox="0 0 24 24" fill="white" width="24" height="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          : <svg viewBox="0 0 24 24" fill="#D4B558" width="28" height="28"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
        }
      </button>

      {open && (
        <div style={{ position:'fixed', bottom:'90px', right:'24px', zIndex:9998, width:'340px', maxWidth:'calc(100vw - 48px)', background:'white', borderRadius:'16px', boxShadow:'0 8px 40px rgba(0,0,0,0.2)', display:'flex', flexDirection:'column', height:'480px', border:'2px solid #D4B558', overflow:'hidden' }}>
          <div style={{ background:'#166534', padding:'12px 16px', display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'#D4B558', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', color:'#166534', fontSize:'14px' }}>EM</div>
            <div>
              <p style={{ color:'white', fontWeight:'bold', fontSize:'14px', margin:0 }}>Étudiant Mouride</p>
              <p style={{ color:'#D4B558', fontSize:'11px', margin:0 }}>{lang === 'fr' ? 'Assistant virtuel' : 'Virtual assistant'}</p>
            </div>
          </div>

          <div style={{ flex:1, overflowY:'auto', padding:'12px', display:'flex', flexDirection:'column', gap:'10px', background:'#FDF8F0' }}>
            {messages.map((m: ChatMessage, i: number) => (
              <div key={i} style={{ display:'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth:'82%', padding:'8px 12px', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: m.role === 'user' ? '#166534' : 'white', color: m.role === 'user' ? 'white' : '#333', fontSize:'13px', lineHeight:'1.6', boxShadow:'0 1px 4px rgba(0,0,0,0.1)' }}>
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div style={{ padding:'10px 12px', borderTop:'1px solid #e5e7eb', display:'flex', gap:'8px', background:'white' }}>
            <input value={input} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && sendMessage()} placeholder={lang === 'fr' ? 'Posez votre question...' : 'Ask your question...'} style={{ flex:1, border:'1px solid #d1d5db', borderRadius:'8px', padding:'8px 12px', fontSize:'13px', outline:'none' }} />
            <button onClick={sendMessage} style={{ background:'#166534', color:'white', border:'none', borderRadius:'8px', padding:'8px 14px', cursor:'pointer', fontSize:'16px' }}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
