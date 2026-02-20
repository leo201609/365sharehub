// utils/telegram.ts

export async function sendTelegramMessage(message: string) {
  // 你的专属机器人密钥和 ID
  const TELEGRAM_BOT_TOKEN = "8579670530:AAHdkioFO77qp74IkAzzBS5PqHeo9p5ZPWw";
  const TELEGRAM_CHAT_ID = "6225103560";

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        chat_id: TELEGRAM_CHAT_ID, 
        text: message, 
        parse_mode: 'HTML' 
      }),
    });
  } catch (error) {
    console.error("Telegram Push Error:", error);
  }
}