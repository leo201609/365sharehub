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

  // 🔥 修改：注册成功后清除 Dashboard 缓存并跳转
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard') 
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

  // 🔥 修改：登录成功后清除 Dashboard 缓存并跳转
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard') 
}