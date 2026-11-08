import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { action, target } = await req.json(); // <-- Добавили target
    const token = process.env.TELEGRAM_BOT_TOKEN;
    
    // Выбираем ID получателя в зависимости от того, кто нажал
    const chatId = target === 'vika' ? process.env.VIKA_CHAT_ID : process.env.DANYA_CHAT_ID;
    const senderName = target === 'vika' ? "Вика" : "Даня";

    if (!token || !chatId) {
      return NextResponse.json({ error: 'Нет токена или ID' }, { status: 500 });
    }

    const text = action === "hug" 
      ? `❤️ ${senderName} хочет тебя крепко обнять! Тыкай на кнопку ниже, чтобы принять.` 
      : `😘 ${senderName} хочет тебя поцеловать! Тыкай на кнопку ниже.`;

    const replyMarkup = {
      inline_keyboard: [
        [
          { text: action === "hug" ? "🤗 Принять обнимашки" : "💋 Принять поцелуй", callback_data: `accept_${action}` },
          { text: "❌ Отклонить", callback_data: `decline_${action}` }
        ]
      ]
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text, reply_markup: replyMarkup }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Ошибка сети' }, { status: 500 });
  }
}