import { NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/utils/telegram';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // 接收所有可能的字段：type 用于区分来源，email, subject, message 是内容
    const { type, email, subject, message } = body;
    
    let text = '';

    // 1. 处理：首页免注册试用申请
    if (type === 'trial') {
      text = `🚀 <b>新试用申请 (Free Trial)</b>\n\n📧 <b>微软邮箱:</b> ${email}\n🕒 <b>时间:</b> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Berlin' })}`;
    } 
    // 2. 处理：首页免注册快捷留言
    else if (type === 'contact') {
      text = `💬 <b>首页快捷留言 (Quick Contact)</b>\n\n📧 <b>联系邮箱:</b> ${email || '未留邮箱 (Not provided)'}\n📝 <b>留言内容:</b>\n${message}\n🕒 <b>时间:</b> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Berlin' })}`;
    } 
    // 3. 处理：默认/兼容你之前的 Dashboard 工单逻辑
    else {
      text = `🚨 <b>新工单提醒 (New Ticket)</b>\n\n👤 <b>用户:</b> ${email}\n📝 <b>主题:</b> ${subject || '无主题'}\n💬 <b>内容:</b>\n${message}`;
    }

    // 调用你现成的全局工具，一键推送到 Telegram
    await sendTelegramMessage(text);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telegram Notify Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}