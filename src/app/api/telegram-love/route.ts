import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { action } = await req.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.VIKA_CHAT_ID; 

    if (!token || !chatId) {
      console.error("Ошибка: Нет токена или Chat ID в .env.local");
      return NextResponse.json({ error: 'Нет токена или ID' }, { status: 500 });
    }

    const text = action === "hug" 
      ? "❤️ Даня хочет тебя крепко обнять! Тыкай на кнопку ниже, чтобы принять." 
      : "😘 Даня хочет тебя поцеловать! Тыкай на кнопку ниже.";

    const replyMarkup = {
      inline_keyboard: [
        [
          { text: action === "hug" ? "🤗 Принять обнимашки" : "💋 Принять поцелуй", callback_data: `accept_${action}` },
          { text: "❌ Отклонить", callback_data: `decline_${action}` }
        ]
      ]
    };

    // Делаем запрос с таймаутом в 4 секунды (чтобы не висло)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text, reply_markup: replyMarkup }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Ошибка от Телеграма:", errorData);
      return NextResponse.json({ error: 'Ошибка Telegram' }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error("Таймаут: Telegram не отвечает. Скорее всего, он заблокирован.");
    } else {
      console.error("Ошибка сети:", error);
    }
    return NextResponse.json({ error: 'Ошибка сети' }, { status: 500 });
  }
}