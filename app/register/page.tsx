"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Mail, Lock, User, CheckCircle2 } from "lucide-react";
// 引入刚才写的注册逻辑
import { signup } from "@/app/auth/actions";

// 复用 Logo 组件
const MiniLogo = () => (
  <div className="w-8 h-8 relative flex items-center justify-center shrink-0 mr-2">
      <img src="/icons/365sharehub.png" alt="Logo" className="w-full h-full object-contain rounded-md" />
  </div>
);

// 微软图标
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

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] relative overflow-hidden">
      
      {/* 极光背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md p-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl ring-1 ring-slate-100">
          <CardHeader className="space-y-1 text-center pb-6 pt-8">
            <div className="flex justify-center mb-4">
               <MiniLogo />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
              Create an account
            </CardTitle>
            <CardDescription className="text-slate-500">
              Start your 7-day free trial today
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="bg-white border-slate-200 hover:bg-slate-50">
                <MicrosoftIcon />
                <span className="ml-2">Microsoft</span>
              </Button>
              <Button variant="outline" className="bg-white border-slate-200 hover:bg-slate-50">
                <GoogleIcon />
                <span className="ml-2">Google</span>
              </Button>
            </div>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-medium">Or register with email</span>
              </div>
            </div>

            {/* 🔥 关键修改：将 div 改为 form，并绑定 Server Action 
               注意：Input 必须添加 name 属性，否则后台收不到数据
            */}
            <form action={signup} className="grid gap-3">
              <div className="relative group">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input name="fullName" type="text" placeholder="Full Name" required className="pl-9 border-slate-200 bg-white focus-visible:ring-blue-500" />
              </div>
              
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input name="email" type="email" placeholder="name@example.com" required className="pl-9 border-slate-200 bg-white focus-visible:ring-blue-500" />
              </div>
              
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input name="password" type="password" placeholder="Create a password" required minLength={6} className="pl-9 border-slate-200 bg-white focus-visible:ring-blue-500" />
              </div>

              {/* 密码强度提示 */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                 <div className="h-1 bg-slate-200 rounded-full"></div>
                 <div className="h-1 bg-slate-200 rounded-full"></div>
                 <div className="h-1 bg-slate-200 rounded-full"></div>
                 <div className="h-1 bg-slate-200 rounded-full"></div>
              </div>

              <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 text-xs text-slate-600 space-y-1 mb-2">
                  <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-blue-600" />
                      <span>7-day free trial included</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-blue-600" />
                      <span>No credit card required for sign up</span>
                  </div>
              </div>

              <Button type="submit" className="w-full bg-[#0078D4] hover:bg-[#0060aa] text-white font-bold h-11 shadow-md transition-all hover:scale-[1.02]">
                Create Account
              </Button>
            </form>

            <div className="mt-2 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-bold hover:underline">
                Sign in
              </Link>
            </div>

          </CardContent>
        </Card>
        
        <p className="text-center text-xs text-slate-400 mt-8 max-w-xs mx-auto leading-relaxed">
          By registering, you agree to our <a href="#" className="underline hover:text-slate-600">Terms of Service</a> and <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}