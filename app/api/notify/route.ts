import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, subject, message } = await req.json();

    // 已经帮你填好了你专属的真实 Token 和 ID！
    const TELEGRAM_BOT_TOKEN = "8579670530:AAHdkioFO77qp74IkAzzBS5PqHeo9p5ZPWw";
    const TELEGRAM_CHAT_ID = "6225103560";

    const text = `🚨 <b>新工单提醒 (New Ticket)</b>\n\n👤 <b>用户:</b> ${email}\n📝 <b>主题:</b> ${subject}\n💬 <b>内容:</b>\n${message}`;

    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        chat_id: TELEGRAM_CHAT_ID, 
        text: text, 
        parse_mode: 'HTML' 
      }),
    });

    if (!res.ok) {
      console.error("Telegram API Error:", await res.text());
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notify API Error:", error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}