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

    const data = await resend.emails.send({
      from: '365ShareHub Support <support@365sharehub.com>', // 测试阶段 Resend 提供的默认发件邮箱
      to: [to],
      subject: subject,
      text: text,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}