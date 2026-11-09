"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Heart, Camera, Gift, RefreshCw, Smile, X, Mail, MailOpen, CloudRain, Sparkles } from "lucide-react";

const LETTERS = {
  miss: `Привет, моя любимая Вика.
Если ты это читаешь, значит, ты скучаешь. Поверь, я в этот момент скучаю не меньше твоего. Я тоже хочу крепко-крепко тебя обнять и поцеловать.

Время летит быстро, и ты не заметишь, как мы уже вместе идем за ручку и гуляем. Но знай: если мы не рядом, это не значит, что ты не в моих мыслях. Каждый день, когда мы не вместе, я вспоминаю твои щечки, которые затискал бы, милые губки, которые поцеловал бы, твою улыбку и твои глазки.

Ты — самый важный человечек в моей жизни и самый яркий лучик света в моих глазах.

Люблю тебя бесконечно. Твой Даня. ❤️`,

  sad: `Привет, любимая. 
Если ты это читаешь, значит, тебе грустно или что-то не получается. Просто знай: у тебя есть тот, кто тебя очень любит и ценит.

Заенька, запомни — ты самая сильная и умная девушка, которую я встречал. У тебя обязательно всё получится! И не забывай, что у тебя есть я. Я помогу тебе в любой ситуации и всегда буду твоей опорой. 

Просто верь в себя, любимая, и никогда не сдавайся. 

Люблю тебя. Твой Даня 🤗`,

  just: `Привет, солнышко!
Просто решил напомнить тебе, что ты — лучшее, что случилось со мной за всё время. У тебя самые прекрасные глазки, самая потрясающая и белоснежная улыбка, самые шелковистые волосы и прекрасные милые ручки. Просто знай это.

Спасибо тебе за всё. 
Люблю безумно. Твой Даня ❤️`,
};

function LovePageContent() {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");

  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const startDate = new Date(2026, 9, 9, 0, 0).getTime(); // 9 октября 2026
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.abs(now - startDate); 
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const reasons = [
    "За то, как ты меня поддерживаешь, когда всё валится из рук.",
    "За твой смех, который я слышу даже в голове.",
    "За то, что ты рядом, даже когда расстояние.",
    "За твои ручки.",
    "За наши игры в роблоксе",
    "За то, что ты понимаешь меня всегда",
    "За то, как ты улыбаешься",
    "За твой милый смех",
    "За твои глазки.",
    "За то, что ты выбрала именно меня.",
    "За наши ночные разговоры.",
    "За то, как ты улыбаешься, когда я говорю глупости."
  ];
  const [currentReason, setCurrentReason] = useState("Нажми на кнопку, чтобы узнать...");
  const generateReason = () => {
    setCurrentReason(reasons[Math.floor(Math.random() * reasons.length)]);
  };

  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const handleScreenClick = (e: React.MouseEvent) => {
    const newHeart = { id: Date.now(), x: e.clientX, y: e.clientY };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== newHeart.id)), 1000);
  };

  const [burstAction, setBurstAction] = useState<"hug" | "kiss" | null>(null);
  const [burstPhoto, setBurstPhoto] = useState<string | null>(null);

  const triggerAction = async (action: "hug" | "kiss") => {
    if (burstAction) return; // Защита от спама кликами

    const hugPhotos = ["/hug1.jpg", "/hug2.jpg",];
    const kissPhotos = ["/kiss1.jpg", "/kiss2.jpg", "/kiss3.jpg"];
    const photos = action === "hug" ? hugPhotos : kissPhotos;
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    
    setBurstPhoto(randomPhoto);
    setBurstAction(action);
    setTimeout(() => { setBurstAction(null); setBurstPhoto(null); }, 3000);

    const target = user === "vika" ? "danya" : "vika";

    try {
      await fetch('/api/telegram-love', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, target })
      });
    } catch (e) { console.log("Ошибка отправки", e); }
  };

  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [isBonusRevealed, setIsBonusRevealed] = useState(false);

  const photos = [
    { url: "/photo4.jpg", caption: "Мой личный гоблин", description: "Ты можешь прятаться в капюшон, но твои глаза все равно выдают, как сильно ты меня любишь.", bonus: "🎁 Бонус: Купон на один расслабляющий массаж спины." },
    { url: "/photo2.jpg", caption: "Тот самый вечер", description: "Ты была самой красивой в тот момент. Я смотрел на тебя и понимал, как мне повезло.", bonus: "🎁 Бонус: Купон на совместный просмотр любого фильма." },
    { url: "/photo6.jpg", caption: "осторожно чихуахуа", description: "Даже когда ты злишься или показываешь фак, я все равно без ума от тебя.", bonus: "🎁 Бонус: Купон на 10 минут крепких обнимашек!" },
    { url: "/photo1.jpg", caption: "Твой взгляд", description: "Обожаю, когда ты так смотришь. В этот момент я готов на все.", bonus: "🎁 Бонус: 10 комплиментов тебе." },
    { url: "/photo7.jpg", caption: "Твои глаза", description: "В этих глазах можно утонуть.", bonus: "🎁 Бонус: фотограф на час." },
    { url: "/photo3.jpg", caption: "Мой любимый фон", description: "Ты делаешь любой кадр лучше.", bonus: "🎁 Бонус: Любое твое желание." },
    { url: "/photo5.jpg", caption: "Моя любимая", description: "Даже на неожиданных фотках ты получаешься потрясающе.", bonus: "🎁 Бонус: Купон на 1000 поцелуев." },
    { url: "/photo8.jpg", caption: "Просто мы", description: "С тобой каждый день — праздник.", bonus: "🎁 Бонус: книга твоя)." },
  ];

  const [selectedLetter, setSelectedLetter] = useState<keyof typeof LETTERS | null>(null);
  const [printedText, setPrintedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  const fullText = selectedLetter ? LETTERS[selectedLetter] : "";

  useEffect(() => {
    if (selectedLetter && textIndex < fullText.length) {
      const timer = setTimeout(() => {
        setPrintedText(fullText.substring(0, textIndex + 1));
        setTextIndex((prev) => prev + 1);
      }, 15);
      return () => clearTimeout(timer);
    }
  }, [selectedLetter, textIndex, fullText]);

  const openLetter = (type: keyof typeof LETTERS) => {
    setSelectedLetter(type);
    setPrintedText("");
    setTextIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#050005] text-pink-400 font-sans overflow-x-hidden relative" onClick={handleScreenClick}>
      
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

      {hearts.map((heart) => (
        <div key={heart.id} className="fixed pointer-events-none text-pink-500 animate-[floatUp_1s_ease-out_forwards] z-50" style={{ left: heart.x - 12, top: heart.y - 12 }}>
          <Heart size={24} fill="currentColor" />
        </div>
      ))}

      {burstAction && burstPhoto && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex flex-col items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="text-pink-500 animate-ping absolute"><Heart size={300} fill="currentColor" opacity={0.2} /></div>
          <div className="relative z-50 animate-bounce mb-6">
            <img src={burstPhoto} alt="Love" className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-3xl border-4 border-pink-500 shadow-[0_0_50px_rgba(236,72,153,0.6)] rotate-2" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white z-50 bg-pink-600/90 px-6 py-3 rounded-3xl backdrop-blur-md text-center">
            {burstAction === "hug" ? "Крепко обнимаю! ❤️" : "Нежно целую! 😘"}
          </h2>
        </div>
      )}

      <section className="min-h-[90vh] flex flex-col items-center justify-center p-4 relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center flex flex-col items-center gap-2">
          Месяц с тобой <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={36} />
        </h1>
        
        <div className="flex items-baseline gap-2 md:gap-4 z-10">
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 font-mono tracking-tighter">{time.days}</span>
            <span className="text-[10px] md:text-xs text-pink-400 uppercase tracking-widest mt-1">Дней</span>
          </div>
          <span className="text-3xl md:text-5xl text-pink-500/30 font-bold pb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 font-mono tracking-tighter">{time.hours}</span>
            <span className="text-[10px] md:text-xs text-pink-400 uppercase tracking-widest mt-1">Часов</span>
          </div>
          <span className="text-3xl md:text-5xl text-pink-500/30 font-bold pb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 font-mono tracking-tighter">{time.minutes}</span>
            <span className="text-[10px] md:text-xs text-pink-400 uppercase tracking-widest mt-1">Минут</span>
          </div>
          <span className="text-3xl md:text-5xl text-pink-500/30 font-bold pb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-300 to-pink-500 font-mono tracking-tighter animate-pulse">{time.seconds}</span>
            <span className="text-[10px] md:text-xs text-pink-400 uppercase tracking-widest mt-1">Секунд</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
            <Camera className="text-pink-500" /> Наши моменты
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {photos.map((photo, index) => (
              <div key={index} onClick={() => { setSelectedPhoto(photo); setIsBonusRevealed(false); }} className={`cursor-pointer bg-white p-2 pb-8 md:p-3 md:pb-12 shadow-2xl transition-transform duration-300 hover:scale-105 hover:z-20 hover:rotate-0 w-full ${index % 4 === 0 ? 'rotate-[-4deg]' : ''} ${index % 4 === 1 ? 'rotate-[3deg] translate-y-2' : ''} ${index % 4 === 2 ? 'rotate-[-2deg]' : ''} ${index % 4 === 3 ? 'rotate-[4deg] translate-y-4' : ''}`}>
                <div className="aspect-square w-full overflow-hidden bg-gray-200 border border-gray-100 rounded-sm">
                  <img src={photo.url} alt="Наш момент" className="w-full h-full object-cover pointer-events-none" />
                </div>
                <p className="text-center text-gray-800 font-serif mt-2 md:mt-4 text-xs md:text-base italic pointer-events-none">{photo.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 flex flex-col items-center justify-center relative z-10">
        <div className="max-w-xl w-full text-center z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center justify-center gap-3">
            <Gift className="text-pink-500" /> Секрет
          </h2>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl min-h-[160px] flex items-center justify-center mb-8 relative overflow-hidden">
            <p className="text-lg md:text-2xl text-pink-100/90 leading-relaxed font-light relative z-10">"{currentReason}"</p>
          </div>
          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
            <button onClick={generateReason} className="w-full flex items-center justify-center gap-3 bg-pink-600 hover:bg-pink-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)]">
              <RefreshCw size={18} /> Узнать причину
            </button>
            <div className="flex gap-3 w-full">
              <button onClick={() => triggerAction("hug")} className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3.5 rounded-xl">
                <Smile size={18} /> Обнять
              </button>
              <button onClick={() => triggerAction("kiss")} className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3.5 rounded-xl">
                <Heart size={18} /> Поцеловать
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 flex flex-col items-center justify-center relative z-10 border-t border-white/5">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Послания для тебя</h2>
          <p className="text-pink-300/70 text-sm mt-2">Открой то, что сейчас нужно твоей душе</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <button onClick={() => openLetter("miss")} className="group bg-white/5 hover:bg-white/10 border border-white/10 p-6 rounded-3xl transition-all hover:-translate-y-2 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="text-pink-400 w-8 h-8" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Когда скучаешь</h3>
            <p className="text-xs text-pink-300/60">Прочитай, если меня нет рядом</p>
          </button>

          <button onClick={() => openLetter("sad")} className="group bg-white/5 hover:bg-white/10 border border-white/10 p-6 rounded-3xl transition-all hover:-translate-y-2 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CloudRain className="text-blue-400 w-8 h-8" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Когда грустно</h3>
            <p className="text-xs text-pink-300/60">Если нужна поддержка</p>
          </button>

          <button onClick={() => openLetter("just")} className="group bg-white/5 hover:bg-white/10 border border-white/10 p-6 rounded-3xl transition-all hover:-translate-y-2 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="text-purple-400 w-8 h-8" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Просто так</h3>
            <p className="text-xs text-pink-300/60">Чтобы поднять настроение</p>
          </button>
        </div>
      </section>

      <footer className="py-8 text-center border-t border-white/5 relative z-10">
        <p className="text-pink-500/40 text-xs md:text-sm font-mono tracking-widest uppercase">Made with ❤️ by Danya for Vika</p>
      </footer>

      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050005] p-4 animate-in fade-in" onClick={() => { setSelectedPhoto(null); setIsBonusRevealed(false); }}>
          <div className="relative max-w-2xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { setSelectedPhoto(null); setIsBonusRevealed(false); }} className="absolute -top-12 right-0 text-white/50 hover:text-white bg-white/10 p-2 rounded-full backdrop-blur-md"><X size={20} /></button>
            <img src={selectedPhoto.url} alt="Фото" onClick={() => setIsBonusRevealed(!isBonusRevealed)} className="max-h-[55vh] md:max-h-[60vh] object-contain rounded-2xl border border-white/10 cursor-pointer" />
            {!isBonusRevealed && <p className="text-pink-300 text-xs md:text-sm mt-4 animate-pulse bg-black/50 px-4 py-2 rounded-full">👆 Нажми на фото еще раз, чтобы открыть секрет</p>}
            <div className="text-center mt-6 bg-[#120a14]/90 backdrop-blur-md p-6 rounded-2xl border border-pink-500/30 w-full max-w-lg shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">{selectedPhoto.caption} <Heart size={18} className="text-pink-500" /></h3>
              <p className="text-pink-100/70 text-sm md:text-base mb-4">{selectedPhoto.description}</p>
              {isBonusRevealed && <div className="mt-4 p-4 bg-pink-600/20 border border-pink-500/50 rounded-xl animate-in fade-in zoom-in"><p className="text-white font-bold text-sm md:text-lg">{selectedPhoto.bonus}</p></div>}
            </div>
          </div>
        </div>
      )}

      {selectedLetter && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-500" onClick={() => setSelectedLetter(null)}>
          <div className="relative max-w-2xl w-full bg-[#120a14] border border-pink-500/30 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.2)] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedLetter(null)} className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 p-2 rounded-full"><X size={20} /></button>
            <div className="flex flex-col items-center mb-6">
              <MailOpen className="text-pink-500 w-12 h-12 mb-4" />
              <h3 className="text-2xl font-serif italic text-pink-300">Открытка от Дани...</h3>
            </div>
            <div 
              className="text-pink-100/90 leading-loose text-base md:text-lg whitespace-pre-wrap font-serif cursor-pointer"
              onClick={() => {
                if (textIndex < fullText.length) {
                  setPrintedText(fullText);
                  setTextIndex(fullText.length);
                }
              }}
            >
              {printedText}
              {textIndex < fullText.length && <span className="inline-block w-2 h-5 bg-pink-500 ml-1 animate-pulse"></span>}
            </div>
            {textIndex < fullText.length && (
              <p className="text-center text-xs text-pink-500/50 mt-6 animate-pulse">(Нажми на текст, чтобы показать всё сразу)</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default function LovePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-pink-500 flex items-center justify-center">Загрузка...</div>}>
      <LovePageContent />
    </Suspense>
  );
}