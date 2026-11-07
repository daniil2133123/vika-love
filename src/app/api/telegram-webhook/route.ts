import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.callback_query) {
      const callbackQuery = body.callback_query;
      const data = callbackQuery.data;
      const chatId = callbackQuery.message.chat.id;
      const messageId = callbackQuery.message.message_id;
      const token = process.env.TELEGRAM_BOT_TOKEN!;

            let replyText = "";
      
      if (data.startsWith("accept")) {
        if (data.includes("hug")) {
          replyText = "🤗 Обнимашки приняты! Я тоже тебя крепко обнимаю ❤️";
        } else if (data.includes("kiss")) {
          replyText = "💋 Поцелуй принят! Обнимаю тебя нежно-нежно 😘";
        }
      } else if (data.startsWith("decline")) {
        replyText = "😢 Ну ладно... Но я всё равно тебя люблю ❤️";
      }
      
      // Обязательный ответ Телеграму (чтобы убрать "крутилку" на кнопке)
      await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: callbackQuery.id })
      });

      // Отправка ответа в чат
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: replyText, reply_to_message_id: messageId })
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}