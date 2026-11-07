"use client";
import { useState, useEffect } from "react";
import { Heart, Camera, Gift, RefreshCw, Smile, X } from "lucide-react";

export default function LovePage() {
  // --- 1. ТАЙМЕР ---
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // ВСТАВЬ СЮДА ДАТУ ВАШЕГО НАЧАЛА (Год, Месяц-1, День, Часы, Минуты)
    const startDate = new Date(2026, 9, 9, 0, 0).getTime(); 
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - startDate;
      
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- 2. ГЕНЕРАТОР ПРИЧИН ---
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

  // --- 3. СЕРДЕЧКИ ПРИ КЛИКЕ ---
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const handleScreenClick = (e: React.MouseEvent) => {
    const newHeart = { id: Date.now(), x: e.clientX, y: e.clientY };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== newHeart.id)), 1000);
  };

  // --- 4. АНИМАЦИЯ С РАНДОМНЫМИ ФОТО ---
  const [burstAction, setBurstAction] = useState<"hug" | "kiss" | null>(null);
  const [burstPhoto, setBurstPhoto] = useState<string | null>(null);

  const triggerAction = async (action: "hug" | "kiss") => {
    const hugPhotos = ["/hug1.jpg", "/hug2.jpg", "/hug3.jpg"];
    const kissPhotos = ["/kiss1.jpg", "/kiss2.jpg", "/kiss3.jpg"];

    const photos = action === "hug" ? hugPhotos : kissPhotos;
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    
    setBurstPhoto(randomPhoto);
    setBurstAction(action);
    
    setTimeout(() => {
      setBurstAction(null);
      setBurstPhoto(null);
    }, 3000);

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

  // --- 5. ГАЛЕРЕЯ И ЛАЙТБОКС ---
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [isBonusRevealed, setIsBonusRevealed] = useState(false);

 const photos = [
    {url: "/photo4.jpg",caption: "Мой личный гоблин",description: "Ты можешь прятаться в капюшон, но твои глаза все равно выдают, как сильно ты меня любишь.",bonus: "🎁 Бонус: Купон на один расслабляющий массаж спины. Действителен в любой день!"},
    {url: "/photo2.jpg", caption: "Тот самый вечер",description: "Ты была самой красивой в тот момент. Я смотрел на тебя и понимал, как мне повезло.",bonus: "🎁 Бонус: Купон на совместный просмотр любого фильма на твой выбор."},
    {url: "/photo6.jpg", caption: "осторожно чихуахуа",description: "Даже когда ты злишься или показываешь фак, я все равно без ума от тебя.",bonus: "🎁 Бонус: Купон на 10 минут крепких обнимашек без права отказа!"},
    {url: "/photo1.jpg", caption: "Твой взгляд",description: "Обожаю, когда ты так смотришь. В этот момент я готов на все.",bonus: "🎁 Бонус: 10 комплиментов тебе"},
    {url: "/photo7.jpg", caption: "твои глаза",description: "Когда ты так смотришь, я забываю, о чем вообще говорил. В этих глазах можно утонуть.",bonus: "🎁 Бонус: фотограф на час."},
    {url: "/photo3.jpg", caption: "Мой любимый фон",description: "Даже если ты закрываешь лицо рукой или смеешься, ты всё равно делаешь любой кадр лучше.",bonus: "🎁 Бонус: Любое твое желание."},
    {url: "/photo5.jpg",caption: "Моя любимая",description: "Даже на неожиданных фотках, ты получаешься потрясающе.",bonus: "🎁 Бонус: Купон на 1000 поцелуев."},
    {url: "/photo8.jpg", caption: "Просто мы",description: "Спасибо за этот месяц. С тобой каждый день — праздник.",bonus: "🎁 Бонус: книга твоя)."},
  ];

  return (
    <div 
      className="min-h-screen bg-[#050005] text-pink-400 font-sans overflow-x-hidden relative" 
      onClick={handleScreenClick}
    >
      
      {/* --- КРАСИВЫЙ ФОН С РАЗМЫТЫМИ ПЯТНАМИ --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="fixed top-[40%] left-[30%] w-[30%] h-[30%] bg-pink-900/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>

      {/* Сердечки при клике */}
      {hearts.map((heart) => (
        <div key={heart.id} className="fixed pointer-events-none text-pink-500 animate-[floatUp_1s_ease-out_forwards] z-50" style={{ left: heart.x - 12, top: heart.y - 12 }}>
          <Heart size={24} fill="currentColor" />
        </div>
      ))}

      {/* Салют при нажатии кнопок */}
      {burstAction && burstPhoto && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex flex-col items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="text-pink-500 animate-ping absolute">
             <Heart size={300} fill="currentColor" opacity={0.2} />
          </div>
          <div className="relative z-50 animate-bounce mb-6">
            <img src={burstPhoto} alt="Love" className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-3xl border-4 border-pink-500 shadow-[0_0_50px_rgba(236,72,153,0.6)] rotate-2" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white z-50 bg-pink-600/90 px-6 py-3 rounded-3xl backdrop-blur-md text-center shadow-2xl">
            {burstAction === "hug" ? "Крепко обнимаю! ❤️" : "Нежно целую! 😘"}
          </h2>
        </div>
      )}

      {/* --- СЕКЦИЯ 1: ЭЛЕГАНТНЫЙ ТАЙМЕР --- */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center p-4 relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center tracking-tight flex flex-col items-center gap-2">
          Месяц с тобой 
          <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={36} />
        </h1>
        
        <div className="flex items-baseline gap-2 md:gap-4 z-10">
          {/* Дни */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {time.days}
            </span>
            <span className="text-[10px] md:text-xs text-pink-400 uppercase tracking-widest mt-1 font-semibold">Дней</span>
          </div>
          
          <span className="text-3xl md:text-5xl text-pink-500/30 font-bold pb-4 md:pb-6">:</span>
          
          {/* Часы */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {time.hours}
            </span>
            <span className="text-[10px] md:text-xs text-pink-400 uppercase tracking-widest mt-1 font-semibold">Часов</span>
          </div>

          <span className="text-3xl md:text-5xl text-pink-500/30 font-bold pb-4 md:pb-6">:</span>

          {/* Минуты */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {time.minutes}
            </span>
            <span className="text-[10px] md:text-xs text-pink-400 uppercase tracking-widest mt-1 font-semibold">Минут</span>
          </div>

          <span className="text-3xl md:text-5xl text-pink-500/30 font-bold pb-4 md:pb-6">:</span>

          {/* Секунды (акцентный цвет) */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-300 to-pink-500 font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(236,72,153,0.5)] animate-pulse">
              {time.seconds}
            </span>
            <span className="text-[10px] md:text-xs text-pink-400 uppercase tracking-widest mt-1 font-semibold">Секунд</span>
          </div>
        </div>
        
        <div className="absolute bottom-6 animate-bounce text-pink-500/50 flex flex-col items-center">
          <p className="text-[10px] uppercase tracking-[0.2em] mb-1">Листай вниз</p>
          <div className="w-[1px] h-8 bg-pink-500/50"></div>
        </div>
      </section>

      {/* --- СЕКЦИЯ 2: ГАЛЕРЕЯ (Сетка) --- */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
            <Camera className="text-pink-500" /> Наши моменты
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                onClick={() => { setSelectedPhoto(photo); setIsBonusRevealed(false); }}
                className={`cursor-pointer bg-white p-2 pb-8 md:p-3 md:pb-12 shadow-2xl transition-transform duration-300 hover:scale-105 hover:z-20 hover:rotate-0 w-full 
                ${index % 4 === 0 ? 'rotate-[-4deg]' : ''} 
                ${index % 4 === 1 ? 'rotate-[3deg] translate-y-2' : ''} 
                ${index % 4 === 2 ? 'rotate-[-2deg]' : ''}
                ${index % 4 === 3 ? 'rotate-[4deg] translate-y-4' : ''}
              `}>
                <div className="aspect-square w-full overflow-hidden bg-gray-200 border border-gray-100 rounded-sm">
                  <img src={photo.url} alt="Наш момент" className="w-full h-full object-cover pointer-events-none" />
                </div>
                <p className="text-center text-gray-800 font-serif mt-2 md:mt-4 text-xs md:text-base italic pointer-events-none leading-tight">
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- СЕКЦИЯ 3: ГЕНЕРАТОР И КНОПКИ --- */}
      <section className="py-20 px-4 flex flex-col items-center justify-center relative z-10">
        <div className="max-w-xl w-full text-center z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center justify-center gap-3">
            <Gift className="text-pink-500" /> Секрет
          </h2>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl min-h-[160px] flex items-center justify-center mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
            <p className="text-lg md:text-2xl text-pink-100/90 leading-relaxed font-light relative z-10">
              "{currentReason}"
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
            <button onClick={generateReason} className="w-full flex items-center justify-center gap-3 bg-pink-600 hover:bg-pink-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-[1.02]">
              <RefreshCw size={18} /> Узнать причину
            </button>
            
            <div className="flex gap-3 w-full">
              <button onClick={() => triggerAction("hug")} className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3.5 rounded-xl transition-all hover:scale-[1.02]">
                <Smile size={18} /> Обнять
              </button>
              <button onClick={() => triggerAction("kiss")} className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3.5 rounded-xl transition-all hover:scale-[1.02]">
                <Heart size={18} /> Поцеловать
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center border-t border-white/5 relative z-10">
        <p className="text-pink-500/40 text-xs md:text-sm font-mono tracking-widest uppercase">
          Made with ❤️ by Danya for Vika
        </p>
      </footer>

      {/* --- МОДАЛКА (ЛАЙТБОКС) --- */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 animate-in fade-in duration-300"
          onClick={() => { setSelectedPhoto(null); setIsBonusRevealed(false); }}
        >
          <div className="relative max-w-2xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { setSelectedPhoto(null); setIsBonusRevealed(false); }} className="absolute -top-12 right-0 text-white/50 hover:text-white bg-white/10 p-2 rounded-full transition-colors backdrop-blur-md">
              <X size={20} />
            </button>

            <img 
              src={selectedPhoto.url} 
              alt="Фото" 
              onClick={() => setIsBonusRevealed(!isBonusRevealed)}
              className="max-h-[55vh] md:max-h-[60vh] object-contain rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.3)] border border-white/10 cursor-pointer hover:opacity-90 transition-all" 
            />
            
            {!isBonusRevealed && (
               <p className="text-pink-300 text-xs md:text-sm mt-4 animate-pulse bg-black/50 px-4 py-2 rounded-full">
                 👆 Нажми на фото еще раз, чтобы открыть секрет
               </p>
            )}

            <div className="text-center mt-6 bg-[#120a14]/90 backdrop-blur-md p-6 rounded-2xl border border-pink-500/30 w-full max-w-lg shadow-2xl relative overflow-hidden">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                {selectedPhoto.caption} <Heart size={18} className="text-pink-500" />
              </h3>
              <p className="text-pink-100/70 leading-relaxed text-sm md:text-base mb-4">
                {selectedPhoto.description}
              </p>
              
              {isBonusRevealed && (
                <div className="mt-4 p-4 bg-pink-600/20 border border-pink-500/50 rounded-xl animate-in fade-in zoom-in duration-500">
                  <p className="text-white font-bold text-sm md:text-lg">{selectedPhoto.bonus}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}