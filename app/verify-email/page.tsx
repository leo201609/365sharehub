"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MailCheck, ArrowRight, ExternalLink } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] relative overflow-hidden">
      {/* 背景装饰 - 保持与登录页一致的视觉风格 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md p-6 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl ring-1 ring-slate-200/50">
          <CardHeader className="space-y-4 text-center pb-8 pt-10">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-2 ring-8 ring-blue-50/50">
                <MailCheck className="w-10 h-10 text-blue-600 animate-bounce" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
              Check your email
            </CardTitle>
            <p className="text-slate-500 text-sm leading-relaxed px-4">
              We've sent a temporary verification link to your email address. 
              Please click the link to confirm your account.
            </p>
          </CardHeader>
          
          <CardContent className="grid gap-4 pb-10">
            <Button 
              asChild
              className="w-full bg-[#0078D4] hover:bg-[#0060aa] text-white font-bold h-12 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
            >
              <a href="https://mail.google.com" target="_blank" rel="noreferrer">
                Open Gmail <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>

            <Button 
              variant="ghost" 
              asChild
              className="w-full text-slate-500 hover:text-slate-900"
            >
              <Link href="/login">
                Back to Sign In <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            
            <p className="text-[11px] text-center text-slate-400 mt-4">
              Didn't receive the email? Check your spam folder or try again in a few minutes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}