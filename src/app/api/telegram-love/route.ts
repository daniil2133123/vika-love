import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { action } = await req.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.VIKA_CHAT_ID; 

    if (!token || !chatId) {
      return NextResponse.json({ error: 'Нет токена или ID' }, { status: 500 });
    }

    const text = action === "hug" 
      ? "❤️ Даня хочет тебя крепко обнять! Тыкай на кнопку ниже, чтобы принять." 
      : "😘 Даня хочет тебя поцеловать! Тыкай на кнопку ниже.";

    const replyMarkup = {
      inline_keyboard: [
        [
          { text: action === "hug" ? "🤗 Принять обнимашки" : "💋 Принять поцелуй", callback_data: "accept" },
          { text: "❌ Отклонить", callback_data: "decline" }
        ]
      ]
    };

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        chat_id: chatId, 
        text: text,
        reply_markup: replyMarkup
      })
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}