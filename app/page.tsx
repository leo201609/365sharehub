import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* 极光背景层 */}
      <div className="aurora-bg"></div>

      {/* --- 导航栏 --- */}
      <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
              3
            </div>
            <span className="font-semibold text-lg tracking-tight">365ShareHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition">登录</Link>
            <Button className="bg-black text-white hover:bg-slate-800 rounded-full px-5 h-9 text-sm font-medium shadow-sm transition-all hover:scale-105">
              免费试用
            </Button>
          </div>
        </div>
      </nav>

      {/* --- Hero 区域：居中聚焦 (参考 Copilot) --- */}
      <section className="relative pt-20 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          {/* 信任徽章 */}
          <div className="inline-flex items-center gap-2 bg-white/50 border border-white/60 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm mx-auto">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-slate-600">微软法兰克福数据中心支持</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-slate-900">
            解锁 Microsoft 365<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] animate-gradient">
              Copilot 生产力。
            </span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            以 <strong>1/3 的价格</strong> 享受正版 Office E5 订阅。<br/>
            包含 1TB OneDrive，AI 助手，以及企业级数据安全。
          </p>

          {/* 仿 Copilot 搜索框的注册栏 */}
          <div className="max-w-md mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
            <div className="relative flex bg-white rounded-full p-2 shadow-fluent group-hover:shadow-fluent-hover transition-all border border-slate-100">
              <Input 
                type="email" 
                placeholder="输入您的邮箱..." 
                className="border-0 shadow-none bg-transparent focus-visible:ring-0 text-base pl-4"
              />
              <Button className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition-all">
                开始试用 <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-3">无需信用卡 · 7天免费试用 · 随时取消</p>
          </div>
        </div>
      </section>

      {/* --- 视觉展示：玻璃拟态卡片 --- */}
      <section className="pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
             {/* 特性卡片 1 */}
             <div className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-sm hover:shadow-fluent-hover transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">极速开通</h3>
                <p className="text-slate-500 text-sm">全自动化系统，支付后 10 秒内自动发送账号至邮箱。</p>
             </div>
             
             {/* 特性卡片 2 */}
             <div className="bg-white/60 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-fluent hover:shadow-fluent-hover transition-all duration-300 hover:-translate-y-1 md:scale-105 z-10">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-4">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Copilot Ready</h3>
                <p className="text-slate-500 text-sm">完美支持最新 GPT-4 驱动的 Copilot，办公效率提升 10 倍。</p>
             </div>

             {/* 特性卡片 3 */}
             <div className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-sm hover:shadow-fluent-hover transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">数据合规</h3>
                <p className="text-slate-500 text-sm">严格遵循 GDPR，所有数据存储于德国法兰克福，物理隔离。</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- 价格部分 --- */}
      <section id="pricing" className="py-24 bg-white/50 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">简单定价</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* 月付 */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all bg-white rounded-3xl overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6">
                <CardTitle className="text-lg font-medium text-slate-500">灵活月付</CardTitle>
                <div className="text-4xl font-bold text-slate-900 mt-2">€3.99<span className="text-base font-normal text-slate-400">/月</span></div>
              </CardHeader>
              <CardContent className="pt-8">
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-500"/> 包含所有 Office 应用</li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-500"/> 1TB 独立云存储</li>
                </ul>
                <Button variant="outline" className="w-full rounded-xl h-11 border-slate-200 hover:bg-slate-50 hover:text-black">
                  选择月付
                </Button>
              </CardContent>
            </Card>

            {/* 年付 */}
            <Card className="border-2 border-blue-600 shadow-xl transition-all bg-white rounded-3xl relative overflow-hidden transform md:-translate-y-4">
               <div className="absolute top-0 inset-x-0 bg-blue-600 text-white text-xs font-bold text-center py-1">
                 强烈推荐
               </div>
              <CardHeader className="bg-white border-b border-slate-50 pb-6 pt-10">
                <CardTitle className="text-lg font-bold text-blue-600">年度会员</CardTitle>
                <div className="text-5xl font-bold text-slate-900 mt-2">€29.90<span className="text-base font-normal text-slate-400">/年</span></div>
                <p className="text-sm text-slate-400 mt-1">省下 37% 的费用</p>
              </CardHeader>
              <CardContent className="pt-8">
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-700 font-medium"><Check className="w-4 h-4 text-blue-600"/> <strong>优先使用 GPT-4 Copilot</strong></li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-600"/> 专属 VIP 客服通道</li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-600"/> 续费价格锁定保障</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl h-12 shadow-lg shadow-blue-200">
                  立即订阅
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-400 text-sm bg-white border-t border-slate-100">
        <p>© 2026 Frankfurt Operations. All rights reserved.</p>
      </footer>
    </div>
  );
}