import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Check, ArrowRight, Sparkles, ShieldCheck, Zap, Globe, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* 极光背景层 */}
      <div className="aurora-bg"></div>

      {/* --- 导航栏 --- */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo 区域 */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
              3
            </div>
            <span className="font-semibold text-lg tracking-tight hidden md:block">365ShareHub</span>
          </div>

          {/* 右侧功能区 */}
          <div className="flex items-center gap-3">
            
            {/* 🌍 语言/地区选择器 [NEW] */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 gap-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100/50 rounded-full px-3">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">English (EU)</span>
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl bg-white/90 backdrop-blur-xl shadow-fluent border-slate-100">
                <DropdownMenuLabel className="text-xs text-slate-400 font-normal">Select Region</DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer gap-3 py-2.5 focus:bg-blue-50 focus:text-blue-700">
                  <span className="text-lg">🇪🇺</span> English (Europe) <Check className="w-4 h-4 ml-auto text-blue-600" />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-100" />
                <DropdownMenuItem className="cursor-pointer gap-3 py-2.5 focus:bg-blue-50">
                  <span className="text-lg">🇩🇪</span> Deutsch (Germany)
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-3 py-2.5 focus:bg-blue-50">
                  <span className="text-lg">🇫🇷</span> Français (France)
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-3 py-2.5 focus:bg-blue-50">
                  <span className="text-lg">🇪🇸</span> Español (Spain)
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-3 py-2.5 focus:bg-blue-50">
                  <span className="text-lg">🇮🇹</span> Italiano (Italy)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

            <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition hidden sm:block">登录</Link>
            <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-5 h-9 text-sm font-medium shadow-sm transition-all hover:scale-105">
              免费试用
            </Button>
          </div>
        </div>
      </nav>

      {/* --- Hero 区域 --- */}
      <section className="relative pt-24 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          <div className="inline-flex items-center gap-2 bg-white/60 border border-white/60 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm mx-auto hover:bg-white/80 transition cursor-default">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-slate-600">微软法兰克福数据中心支持 · GDPR Compliant</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-slate-900">
            解锁 Microsoft 365<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] animate-gradient">
              Copilot 生产力。
            </span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            以 <strong>1/10 的价格</strong> 享受正版 Office E5 订阅。<br/>
            包含 1TB OneDrive，AI 助手，以及企业级数据安全。
          </p>

          <div className="max-w-md mx-auto relative group mt-8">
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

      {/* --- 特性展示 --- */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
             <div className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-sm hover:shadow-fluent-hover transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">极速开通</h3>
                <p className="text-slate-500 text-sm">全自动化系统，支付后 10 秒内自动发送账号至邮箱。</p>
             </div>
             
             <div className="bg-white/60 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-fluent hover:shadow-fluent-hover transition-all duration-300 hover:-translate-y-1 md:scale-105 z-10">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Copilot Ready</h3>
                <p className="text-slate-500 text-sm">完美支持最新 GPT-4 驱动的 Copilot，办公效率提升 10 倍。</p>
             </div>

             <div className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-sm hover:shadow-fluent-hover transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">数据合规</h3>
                <p className="text-slate-500 text-sm">严格遵循 GDPR，所有数据存储于德国法兰克福，物理隔离。</p>
             </div>
        </div>
      </section>

      {/* --- 价格部分 --- */}
      <section id="pricing" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">简单透明的定价</h2>
            <p className="text-slate-600">所有方案均包含 7 天免费试用，到期不自动扣费。</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            
            {/* 1. 月付 */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all bg-white/80 backdrop-blur rounded-3xl overflow-hidden mt-4">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
                <CardTitle className="text-lg font-medium text-slate-500">Flex 月付</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold text-slate-900">€3.99</span>
                  <span className="text-slate-400 ml-1">/月</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">覆盖手续费，灵活尝鲜</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-500 shrink-0"/> 全套 Office 应用</li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-500 shrink-0"/> 1TB 独立云存储</li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-500 shrink-0"/> 随时取消订阅</li>
                </ul>
                <Button variant="outline" className="w-full rounded-xl h-11 border-slate-200 hover:bg-slate-50 hover:text-black">
                  选择月付
                </Button>
              </CardContent>
            </Card>

            {/* 2. 半年付 */}
            <Card className="border-0 shadow-fluent hover:shadow-fluent-hover transition-all bg-white rounded-3xl overflow-hidden z-10 scale-105 ring-1 ring-slate-100">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold text-center py-1.5">
                高性价比之选
              </div>
              <CardHeader className="bg-white pb-6 pt-6">
                <CardTitle className="text-lg font-bold text-slate-800">Saver 半年</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-5xl font-bold text-slate-900">€17.90</span>
                  <span className="text-slate-400 ml-1">/6个月</span>
                </div>
                <p className="text-sm font-medium text-green-600 mt-2">折合 €2.98/月</p>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-purple-500 shrink-0"/> <strong>包含月付所有权益</strong></li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-purple-500 shrink-0"/> 价格立省 25%</li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-purple-500 shrink-0"/> 半年无需担心续费</li>
                </ul>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl h-12 shadow-lg">
                  试用半年方案
                </Button>
              </CardContent>
            </Card>

            {/* 3. 年付 */}
            <Card className="border-2 border-blue-600 shadow-xl transition-all bg-white rounded-3xl relative overflow-hidden mt-4">
               <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                 最受欢迎
               </div>
              <CardHeader className="bg-white border-b border-slate-50 pb-6 pt-8">
                <CardTitle className="text-lg font-bold text-blue-600">Pro 年付</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold text-slate-900">€29.90</span>
                  <span className="text-slate-400 ml-1">/年</span>
                </div>
                <p className="text-sm font-bold text-blue-600 mt-2">折合 €2.49/月 (省 37%)</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-700 font-medium"><Check className="w-4 h-4 text-blue-600 shrink-0"/> <strong>优先使用 Copilot 功能</strong></li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-600 shrink-0"/> 专属 VIP 客服通道</li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-600 shrink-0"/> 续费价格锁定保障</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl h-11 shadow-lg shadow-blue-200">
                  立即订阅年付
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-400 text-sm bg-white/50 border-t border-slate-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <p className="mb-4">© 2026 Frankfurt Operations. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-xs">
            <Link href="#" className="hover:text-slate-600 transition">GDPR Compliance</Link>
            <Link href="#" className="hover:text-slate-600 transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-600 transition">Terms of Service</Link>
            <div className="flex items-center gap-1 ml-4 cursor-pointer hover:text-slate-700">
              <Globe className="w-3 h-3" />
              <span>English (EU)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}