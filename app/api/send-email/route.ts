import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// 这里会读取你在 .env.local 里配置的 RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, subject, text } = await request.json();

    if (!to || !subject || !text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 🔥 核心优化 1：保留段落换行，将 \n 替换为 HTML 的 <br />
    let formattedHtml = text.replace(/\n/g, '<br />');

    // 🔥 核心优化 2：使用正则捕捉所有 http/https 链接，并变身为可点击的蓝色超链接
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    formattedHtml = formattedHtml.replace(urlRegex, function(url: string) {
      return `<a href="${url}" target="_blank" style="color: #0078D4; text-decoration: underline; font-weight: bold;">${url}</a>`;
    });

    // 包装一层简单的现代字体样式，让邮件看起来更像大厂发的
    const finalHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155; line-height: 1.6; max-width: 600px; padding: 20px;">
        ${formattedHtml}
      </div>
    `;

    const data = await resend.emails.send({
      from: '365ShareHub Support <support@365sharehub.com>',
      to: [to],
      reply_to: 'support@365sharehub.com', // 🔥 核心优化 3：用户点“回复”时，直接指向客服邮箱，不再迷路
      subject: subject,
      text: text, // 依然保留纯文本作为备用 (Fallback)，防极个别老旧设备
      html: finalHtml, // 🔥 发送富文本格式
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}