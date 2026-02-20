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

  // 🔥 新增：唤醒 Telegram 秘书，发送注册报喜通知！
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (botToken && chatId) {
    try {
      // 状态里写着“等待验证”，这样以后谁注册了但没付钱，老板你一清二楚！
      const message = `🎉 滴滴！有新客户提交注册啦！\n📧 邮箱: ${email}\n👤 姓名: ${fullName || '未提供'}\n⏳ 状态: 刚发送验证邮件，等待用户点击...`;
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });
    } catch (e) {
      console.error("Telegram 注册推送失败:", e);
    }
  }

  // 🔥 商业级 UX 优化：因为开启了强制验证，我们不再直接跳 Dashboard，而是提醒用户查收邮件
  redirect('/login?message=Registration successful! Please check your email to verify your account.') 
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

  // 🔥 登录成功后清除 Dashboard 缓存并跳转
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard') 
}