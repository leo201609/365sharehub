"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Mail, Lock, Loader2 } from "lucide-react";
// 引入登录逻辑
import { login } from "@/app/auth/actions";
// 引入多语言组件
import { LanguageProvider, useLanguage } from "@/app/components/LanguageProvider";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { Suspense, useState } from "react";

// --- 统一的 Logo 组件 ---
const MiniLogo = () => (
  <div className="w-12 h-12 relative flex items-center justify-center shrink-0 mb-4">
    <Image 
      src="/icons/365sharehub.png" 
      alt="365ShareHub" 
      width={48}
      height={48}
      className="object-contain rounded-lg shadow-sm"
      priority
    />
  </div>
);

const MicrosoftIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 23 23">
    <path fill="#f35325" d="M1 1h10v10H1z"/>
    <path fill="#81bc06" d="M12 1h10v10H12z"/>
    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
    <path fill="#ffba08" d="M12 12h10v10H12z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// --- 登录页面核心内容 ---
function LoginContent() {
  const { t } = useLanguage(); 
  const [loading, setLoading] = useState(false); // 添加加载状态

  return (
    // 🔥 优化：添加 suppressHydrationWarning 防止语言切换报错
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] relative overflow-hidden" suppressHydrationWarning>
      
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 rounded-full blur-[120px]"></div>
      </div>

      {/* 🌍 语言切换器 */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md p-6 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          {t.common.back_home}
        </Link>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl ring-1 ring-slate-200/50">
          <CardHeader className="space-y-1 text-center pb-8 pt-8">
            <div className="flex justify-center">
               <MiniLogo />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
              {t.common.sign_in}
            </CardTitle>
            <CardDescription className="text-slate-500">
              {t.common.sign_in_desc}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="grid gap-6">
            
            {/* 第三方登录 */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="bg-white border-slate-200 hover:bg-slate-50 h-11 text-slate-700">
                <MicrosoftIcon />
                <span className="ml-2">Microsoft</span>
              </Button>
              <Button variant="outline" className="bg-white border-slate-200 hover:bg-slate-50 h-11 text-slate-700">
                <GoogleIcon />
                <span className="ml-2">Google</span>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-slate-400">
                <span className="bg-white px-2">{t.common.or_continue}</span>
              </div>
            </div>

            {/* 登录表单 */}
            <form action={login} onSubmit={() => setLoading(true)} className="grid gap-4">
              <div className="grid gap-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                  <Input 
                    name="email" 
                    type="email" 
                    placeholder={t.common.email_placeholder} 
                    required 
                    autoComplete="email" // 🔥 优化：自动填充提示
                    className="pl-10 h-11 border-slate-200 bg-white focus:ring-blue-500" 
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                  <Input 
                    name="password" 
                    type="password" 
                    placeholder={t.common.password_placeholder} 
                    required 
                    autoComplete="current-password" // 🔥 优化：自动填充提示
                    className="pl-10 h-11 border-slate-200 bg-white focus:ring-blue-500" 
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-medium">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 transition-colors">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  {t.common.remember_me}
                </label>
                <Link href="#" className="text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline">
                  {t.common.forgot_password}
                </Link>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-[#0078D4] hover:bg-[#0060aa] text-white font-bold h-11 shadow-lg shadow-blue-100 transition-all active:scale-[0.98] mt-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t.common.sign_in}
              </Button>
            </form>

            <div className="mt-2 text-center text-sm text-slate-500">
              {t.common.no_account}{" "}
              <Link href="/register" className="text-blue-600 font-bold hover:text-blue-700 hover:underline underline-offset-4">
                {t.common.sign_up}
              </Link>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --- 页面导出 (带 Provider 和 Suspense) ---
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <LanguageProvider>
        <LoginContent />
      </LanguageProvider>
    </Suspense>
  );
}