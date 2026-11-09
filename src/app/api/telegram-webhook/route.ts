import { NextResponse } from 'next/server';

// Список причин для команды /love
const REASONS = [
  "За то, как ты меня поддерживаешь, когда всё валится из рук.",
  "За твой смех, который я слышу даже в голове.",
  "За то, что ты рядом, даже когда расстояние.",
  "За то, как ты злишься в Роблоксе (это мило).",
  "За твои глаза.",
  "За то, что ты выбрала именно меня.",
  "За наши ночные разговоры.",
  "За то, что с тобой можно молчать и не чувствовать неловкости."
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      console.error("Ошибка: Нет токена в .env.local");
      return NextResponse.json({ error: 'Ошибка конфигурации' }, { status: 500 });
    }

    // --- 1. ОБРАБОТКА НАЖАТИЯ КНОПОК (callback_query) ---
    if (body.callback_query) {
      const callbackQuery = body.callback_query;
      const data = callbackQuery.data; // "accept_hug", "decline_kiss" и т.д.
      const chatId = callbackQuery.message.chat.id;
      const messageId = callbackQuery.message.message_id;
      
      let replyText = "";
      if (data.startsWith("accept")) {
        if (data.includes("hug")) {
          replyText = "🤗 Я тоже тебя крепко обнимаю ❤️";
        } else if (data.includes("kiss")) {
          replyText = "💋 Воздущный поцелуй тебя отправлен 😘";
        }
      } else if (data.startsWith("decline")) {
        replyText = "😢 Ну ладно... Но я всё равно тебя люблю ❤️";
      }

      // Обязательный ответ Телеграму (чтобы кнопка перестала грузиться)
      await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: callbackQuery.id })
      });

      // Отправка ответного сообщения
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: replyText, reply_to_message_id: messageId })
      });
      return NextResponse.json({ ok: true });
    }

    // --- 2. ОБРАБОТКА ТЕКСТОВЫХ СООБЩЕНИЙ (message) ---
    if (body.message) {
      const message = body.message;
      const chatId = message.chat.id;
      const text = message.text;
      const senderName = message.from?.first_name || "Кто-то";

      if (!text) return NextResponse.json({ ok: true }); // Игнорируем стикеры и фото

      let replyText = "";

      if (text.startsWith("/start")) {
        replyText = `Привет, ${senderName}! 👋 Я ваш личный бот. Вот что я умею:\n\n❤️ /love — случайная причина любви\n🤗 /hug — отправить объятия\n📅 /days — сколько вы уже вместе`;
      } else if (text.startsWith("/love")) {
        const randomReason = REASONS[Math.floor(Math.random() * REASONS.length)];
        replyText = `❤️ Причина: ${randomReason}`;
      } else if (text.startsWith("/hug")) {
        replyText = `🤗 ${senderName} отправляет крепкие объятия!`;
      } else if (text.startsWith("/days")) {
        // ВСТАВЬ СЮДА ДАТУ ВАШЕГО НАЧАЛА (Год, Месяц-1, День)
        const startDate = new Date(2026, 9, 9, 0, 0).getTime(); // Например: 9 октября
        const now = new Date().getTime();
        const diff = Math.abs(now - startDate);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        replyText = `📅 Вы вместе уже ${days} дней!`;
      } else if (text.startsWith("/")) {
        replyText = "Я не знаю такой команды. Доступные: /start, /love, /hug, /days";
      } else {
        // Если это просто текст (не команда), бот молчит, чтобы не спамить
        return NextResponse.json({ ok: true });
      }

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: replyText })
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Ошибка Webhook:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
