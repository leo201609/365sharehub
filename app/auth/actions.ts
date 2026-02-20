'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// --- 注册逻辑 ---
export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    console.error('Registration Error:', error)
    redirect('/register?error=true')
  }

  // 🔔 Telegram 秘书通报逻辑
  // 已经在 Coolify 中配置了 TELEGRAM_BOT_TOKEN 和 TELEGRAM_CHAT_ID
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    try {
      const message = `🎉 滴滴！有新客户提交注册啦！\n📧 邮箱: ${email}\n👤 姓名: ${fullName || '未提供'}\n⏳ 状态: 验证邮件已发出，引导页已展示。`;
      
      // 使用 await 确保在跳转前消息已成功发送到 Telegram
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });
      console.log('Telegram 注册通知发送成功');
    } catch (tgError) {
      console.error('Telegram 通知失败:', tgError);
    }
  }

  // 🔥 极致体验优化：跳转到专门的“邮件验证引导页”
  // 请确保你已经创建了 app/verify-email/page.tsx
  redirect('/verify-email')
}

// --- 登录逻辑 ---
export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Login Error:', error)
    redirect('/login?error=true')
  }

  // 登录成功后清除缓存并跳转到控制面板
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}