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
  
  // 🔥 新增：获取用户当前的语言偏好 (通常从前端隐藏域传入)
  // 如果前端没传，我们默认为 'en'
  const locale = formData.get('locale') as string || 'en'

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        locale: locale, // 🔥 进阶方案：将语言偏好持久化到 Supabase
      },
    },
  })

  if (error) {
    console.error('Registration Error:', error)
    redirect('/register?error=true')
  }

  // 🔔 Telegram 秘书通报逻辑
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    try {
      // 在 Telegram 消息中也体现出用户的语言
      const message = `🎉 滴滴！有新客户注册啦！\n📧 邮箱: ${email}\n👤 姓名: ${fullName || '未提供'}\n🌍 语言: ${locale === 'zh' ? '中文' : 'English'}\n⏳ 状态: 验证邮件已发出。`;
      
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

  // 跳转到验证引导页
  // 你可以在 URL 里带上 locale，让引导页也显示对应语言
  redirect(`/verify-email?locale=${locale}`)
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