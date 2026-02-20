"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Mail, Lock, User, Loader2 } from "lucide-react";
// 引入注册 Action
import { signup } from "@/app/auth/actions";
// 引入多语言组件
import { LanguageProvider, useLanguage } from "@/app/components/LanguageProvider";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { Suspense, useState } from "react";

// --- 统一的 Logo 组件 ---
const MiniLogo = () => (
  <div className="w-12 h-12 relative flex items-center justify-center shrink-0 mb-4">
    <Image 
      src="/icons/logo-main.png" 
      alt="365ShareHub" 
      width={48}
      height={48}
      className="object-contain rounded-lg shadow-sm"
      priority
    />
  </div>
);

// --- 注册页面核心内容 ---
function RegisterContent() {

  const { t, ...langProps } = useLanguage() as any; 
// 或者更稳妥地猜测你 Provider 里的真实变量名：
const language = (langProps as any).locale || (langProps as any).currentLanguage || 'en';
  const [loading, setLoading] = useState(false); 

  return (
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
          {t.auth.back_home}
        </Link>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl ring-1 ring-slate-200/50">
          <CardHeader className="space-y-1 text-center pb-8 pt-8">
            <div className="flex justify-center">
               <MiniLogo />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
              {t.auth.create_account}
            </CardTitle>
            <CardDescription className="text-slate-500">
              {t.auth.create_desc}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="grid gap-6">
            
            <form action={signup} onSubmit={() => setLoading(true)} className="grid gap-4">
              
              {/* 🔥 核心改进：添加隐藏的语言偏好字段 */}
              <input type="hidden" name="locale" value={language} />

              {/* 全名输入 */}
              <div className="grid gap-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                  <Input 
                    name="fullName" 
                    type="text" 
                    placeholder={t.auth.full_name} 
                    required 
                    autoComplete="name" 
                    className="pl-10 h-11 border-slate-200 bg-white focus:ring-blue-500" 
                  />
                </div>
              </div>

              {/* 邮箱输入 */}
              <div className="grid gap-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                  <Input 
                    name="email" 
                    type="email" 
                    placeholder={t.auth.email} 
                    required 
                    autoComplete="email" 
                    className="pl-10 h-11 border-slate-200 bg-white focus:ring-blue-500" 
                  />
                </div>
              </div>
              
              {/* 密码输入 */}
              <div className="grid gap-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                  <Input 
                    name="password" 
                    type="password" 
                    placeholder={t.auth.password} 
                    required 
                    autoComplete="new-password" 
                    className="pl-10 h-11 border-slate-200 bg-white focus:ring-blue-500" 
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-[#0078D4] hover:bg-[#0060aa] text-white font-bold h-11 shadow-lg shadow-blue-100 transition-all active:scale-[0.98] mt-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t.auth.sign_up}
              </Button>
            </form>

            <div className="mt-2 text-center text-sm text-slate-500">
              {t.auth.have_account}{" "}
              <Link href="/login" className="text-blue-600 font-bold hover:text-blue-700 hover:underline underline-offset-4">
                {t.auth.sign_in}
              </Link>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --- 页面导出 ---
export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <LanguageProvider>
        <RegisterContent />
      </LanguageProvider>
    </Suspense>
  );
}