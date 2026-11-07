"use client";
import { useState, useEffect } from "react";
import { Heart, Camera, Gift, RefreshCw, Smile } from "lucide-react";

export default function LovePage() {
  // --- ТАЙМЕР ---
  const [timeTogether, setTimeTogether] = useState("");

  useEffect(() => {
    // ВСТАВЬ СЮДА ДАТУ ВАШЕГО НАЧАЛА (Год, Месяц-1, День)
    // Например: 2026, 9, 7 (это 7 октября 2026)
    const startDate = new Date(2026, 9, 7, 0, 0).getTime(); 
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - startDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeTogether(`${days} д. ${hours} ч. ${minutes} м. ${seconds} с.`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- ГЕНЕРАТОР ПРИЧИН ---
  const reasons = [
    "За то, как ты меня поддерживаешь, когда всё валится из рук.",
    "За твой смех, который я слышу даже в голове.",
    "За то, что ты рядом, даже когда расстояние.",
    "За то, как ты злишься в Роблоксе (это мило).",
    "За твои глаза.",
    "За то, что ты выбрала именно меня.",
    "За наши ночные разговоры.",
    "За твою заботу.",
    "За то, что ты — это ты.",
    "За то, как ты улыбаешься, когда я говорю глупости.",
    "За то, что с тобой можно молчать и не чувствовать неловкости."
  ];
  const [currentReason, setCurrentReason] = useState("Нажми на кнопку, чтобы узнать...");
  
  const generateReason = () => {
    const randomIndex = Math.floor(Math.random() * reasons.length);
    setCurrentReason(reasons[randomIndex]);
  };

  // --- СЕРДЕЧКИ И КНОПКИ ---
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [burstAction, setBurstAction] = useState<"hug" | "kiss" | null>(null);

  const handleScreenClick = (e: React.MouseEvent) => {
    const newHeart = { id: Date.now(), x: e.clientX, y: e.clientY };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== newHeart.id)), 1000);
  };

  const triggerAction = async (action: "hug" | "kiss") => {
    setBurstAction(action);
    setTimeout(() => setBurstAction(null), 3000);

    try {
      await fetch('/api/telegram-love', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
    } catch (e) {
      console.log("Ошибка отправки", e);
    }
  };

  // --- ФОТО (Замени ссылки на свои из папки public) ---
  const photos = [
    { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop", caption: "Наш первый месяц" },
    { url: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=400&auto=format&fit=crop", caption: "Тот самый вечер" },
    { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=400&auto=format&fit=crop", caption: "Ты самая красивая" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-pink-400 font-sans overflow-x-hidden relative" onClick={handleScreenClick}>
      
      {/* Сердечки при клике */}
      {hearts.map((heart) => (
        <div key={heart.id} className="fixed pointer-events-none text-pink-500 animate-[floatUp_1s_ease-out_forwards] z-50" style={{ left: heart.x - 12, top: heart.y - 12 }}>
          <Heart size={24} fill="currentColor" />
        </div>
      ))}

      {/* Салют при нажатии кнопки */}
      {burstAction && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-pink-500 animate-ping absolute">
             <Heart size={200} fill="currentColor" opacity={0.3} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white z-50 animate-bounce bg-pink-600/80 px-8 py-4 rounded-3xl backdrop-blur-md text-center">
            {burstAction === "hug" ? "Крепко обнимаю! ❤️" : "Нежно целую! 😘"}
          </h2>
        </div>
      )}

      {/* СЕКЦИЯ 1: ТАЙМЕР */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center z-10 tracking-tight">
          Месяц с тобой <Heart className="inline-block text-pink-500 fill-pink-500 animate-pulse" size={48} />
        </h1>
        <p className="text-pink-300/70 text-sm tracking-[0.2em] uppercase mb-4 z-10">Мы вместе уже:</p>
        <div className="text-2xl md:text-4xl font-mono text-white bg-pink-900/20 px-8 py-4 rounded-2xl border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.2)] z-10">
          {timeTogether}
        </div>
      </section>

      {/* СЕКЦИЯ 2: ГАЛЕРЕЯ */}
      <section className="py-24 px-6 relative bg-[#0d080f]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-16 text-center flex items-center justify-center gap-3">
            <Camera className="text-pink-500" /> Наши моменты
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {photos.map((photo, index) => (
              <div key={index} className={`bg-white p-3 pb-12 shadow-2xl transition-transform duration-300 hover:scale-110 hover:z-20 hover:rotate-0 ${index === 0 ? 'rotate-[-6deg]' : ''} ${index === 1 ? 'rotate-[4deg] translate-y-8' : ''} ${index === 2 ? 'rotate-[-2deg]' : ''}`}>
                <img src={photo.url} alt="Наш момент" className="w-64 h-64 object-cover bg-gray-200 border border-gray-200 pointer-events-none" />
                <p className="text-center text-gray-800 font-serif mt-4 text-lg italic pointer-events-none">{photo.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* СЕКЦИЯ 3: ГЕНЕРАТОР И КНОПКИ */}
      <section className="py-32 px-6 flex flex-col items-center justify-center relative">
        <div className="max-w-2xl w-full text-center z-10">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center justify-center gap-3">
            <Gift className="text-pink-500" /> Секрет
          </h2>
          <div className="bg-[#120a14] border border-pink-500/30 rounded-2xl p-10 shadow-2xl min-h-[200px] flex items-center justify-center mb-8 relative overflow-hidden">
            <p className="text-xl md:text-2xl text-pink-100 leading-relaxed font-light relative z-10">"{currentReason}"</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={generateReason} className="inline-flex items-center justify-center gap-3 bg-pink-600 hover:bg-pink-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-105">
              <RefreshCw size={20} /> Узнать причину
            </button>
            <button onClick={() => triggerAction("hug")} className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-pink-500/30 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 backdrop-blur-sm">
              <Smile size={20} /> Обнять
            </button>
            <button onClick={() => triggerAction("kiss")} className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-pink-500/30 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 backdrop-blur-sm">
              <Heart size={20} /> Поцеловать
            </button>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center border-t border-pink-500/10">
        <p className="text-pink-500/50 text-sm font-mono">Made with ❤️ by Danya for Vika</p>
      </footer>
    </div>
  );
}