import { NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/utils/telegram';

export async function POST(req: Request) {
  try {
    const { email, subject, message } = await req.json();
    
    // 调用我们刚写的全局工具
    const text = `🚨 <b>新工单提醒 (New Ticket)</b>\n\n👤 <b>用户:</b> ${email}\n📝 <b>主题:</b> ${subject}\n💬 <b>内容:</b>\n${message}`;
    await sendTelegramMessage(text);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}