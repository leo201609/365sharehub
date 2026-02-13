import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Server, LayoutGrid, Shield } from "lucide-react";

export default function Home() {
  return (
    // 背景已在 globals.css 中定义为微妙的渐变
    <div className="min-h-screen font-sans selection:bg-primary/20 selection:text-primary">
      
      {/* --- 导航栏：微软 Fluent 磨砂玻璃效果 --- */}
      <nav className="border-b border-white/40 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* 使用微软蓝的 Logo */}
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-slate-800">365ShareHub</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-primary transition px-3 py-2 rounded-md hover:bg-slate-100/50">价格</Link>
            <Link href="/login" className="text-sm font-medium text-slate-900 hover:text-primary transition px-3 py-2 rounded-md hover:bg-slate-100/50">登录</Link>
            {/* 转化按钮：微软蓝，带柔和光晕 */}
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-6 shadow-md hover:shadow-lg transition-all">
              免费试用
            </Button>
          </div>
        </div>
      </nav>

      {/* --- Hero 区域 --- */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* 左侧文案 */}
          <div className="space-y-8 z-10">
            <Badge variant="secondary" className="text-primary bg-primary/10 border-0 px-4 py-1.5 text-sm font-medium rounded-full flex items-center gap-2 w-fit">
              <Shield className="w-4 h-4" /> 🇪🇺 微软德国法兰克福数据中心
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-slate-900">
              Office 365.<br />
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                企业级体验。
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              以难以置信的价格，解锁 1TB OneDrive 和全套正版 Office 应用。
              <br />
              <span className="text-slate-500 text-base">
                无需信用卡，体验 Fluent Design 的丝滑管理流程。
              </span>
            </p>
            
            {/* 极简注册入口：使用 Fluent 风格的输入框和按钮 */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-[460px] mt-6 bg-white p-2 rounded-2xl shadow-fluent-md border border-slate-100">
              <Input 
                type="email" 
                placeholder="输入您的工作邮箱..." 
                className="h-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base px-4 shadow-none"
              />
              <Button className="h-12 px-6 bg-primary hover:bg-primary/90 text-white font-semibold text-base rounded-xl transition-all w-full sm:w-auto flex gap-2 shadow-sm">
                开始 7 天试用 <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-slate-400 pl-4">
              点击即代表同意服务条款。保护您的隐私是我们的首要任务。
            </p>
          </div>

          {/* 右侧视觉：悬浮卡片，增加深度感 */}
          <div className="relative hidden lg:block">
             {/* 背景光晕 */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
             
             {/* 主卡片：磨砂效果和高层级阴影 */}
             <Card className="border-0 shadow-fluent-lg bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
                
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Server className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-slate-800">E5 企业版订阅</div>
                    <div className="text-slate-500 text-sm flex items-center gap-2 mt-1">
                      状态: <span className="text-emerald-500 font-semibold flex items-center"><div className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5"></div>活跃中</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-5">
                  {[
                    "1TB OneDrive 企业级存储空间",
                    "支持 5 台 PC/Mac + 5 台移动设备",
                    "包含最新版 Word, Excel, PowerPoint",
                    "99.9% 微软官方服务级别协议 (SLA)"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3.5">
                      <div className="mt-0.5 p-1 bg-primary/10 rounded-full">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-slate-700 font-medium text-[15px]">{item}</span>
                    </div>
                  ))}
                </div>
             </Card>
          </div>
        </div>
      </section>

      {/* --- 价格部分：清爽、分层、无边框 --- */}
      <section id="pricing" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">简单透明，无隐藏费用</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              选择最适合您的方案。所有计划均由微软官方基础设施提供支持。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* 方案 1: 月付 */}
            <Card className="border-0 shadow-fluent-sm hover:shadow-fluent-md transition-all duration-300 bg-white/60 backdrop-blur-md rounded-[1.5rem]">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-700">Flex 月付</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-slate-900">€3.99</span>
                  <span className="text-slate-500 font-medium">/月</span>
                </div>
                <p className="text-sm text-slate-500 mb-8">灵活体验，随时取消。</p>
                <Button variant="secondary" className="w-full bg-slate-100 text-primary hover:bg-slate-200 font-semibold h-11 rounded-xl">
                  开始试用
                </Button>
              </CardContent>
            </Card>

            {/* 方案 2: 年付 (核心推荐) - 突出显示，使用金色点缀 */}
            <Card className="border-2 border-amber-400/30 shadow-fluent-lg relative scale-105 bg-white rounded-[1.5rem] z-10 overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-300 to-orange-400"></div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0 font-bold px-3 py-1 shadow-sm">
                  最受欢迎
                </Badge>
              </div>
              <CardHeader className="pb-4 pt-8">
                <CardTitle className="text-2xl font-bold text-slate-800">Pro 年付</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-extrabold text-slate-900">€29.90</span>
                  <span className="text-slate-500 font-medium text-lg">/年</span>
                </div>
                <p className="text-sm text-slate-500 mb-8">相当于每月仅 €2.49，立省 37%</p>
                <ul className="space-y-4 mb-8">
                  {[
                    "包含月付所有权益",
                    "优先客服支持通道",
                    "锁定当前价格，续费不涨价"
                  ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-700 font-medium items-center">
                    <Check className="w-5 h-5 text-amber-500 flex-shrink-0" /> {item}
                  </li>
                  ))}
                </ul>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 text-base rounded-xl shadow-md">
                  立即开通 (享7天免费)
                </Button>
              </CardContent>
            </Card>

            {/* 方案 3: 团队 */}
            <Card className="border-0 shadow-fluent-sm hover:shadow-fluent-md transition-all duration-300 bg-white/60 backdrop-blur-md rounded-[1.5rem]">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-700">Team 拼车</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-slate-900">€139</span>
                  <span className="text-slate-500 font-medium">/年</span>
                </div>
                <p className="text-sm text-slate-500 mb-8">独享整个家庭组，5 个独立账户。</p>
                <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold h-11 rounded-xl">
                  联系客服
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* --- Footer --- */}
      <footer className="bg-slate-50 text-slate-500 py-12 text-sm text-center border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-200 rounded-md flex items-center justify-center text-slate-600 font-bold text-xs">
                3
                </div>
                <span className="font-semibold text-slate-700">365ShareHub</span>
            </div>
            <span>© 2026 Frankfurt Operations. Secure & Compliant.</span>
        </div>
      </footer>
    </div>
  );
}