import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Server } from "lucide-react";

export default function Home() {
  return (
    // 1. 全局背景：白色 (#FFFFFF)
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#FF5722] selection:text-white">
      
      {/* --- 导航栏 --- */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#005A9E] rounded-lg flex items-center justify-center text-white font-bold">
              3
            </div>
            <span className="font-bold text-xl tracking-tight text-[#005A9E]">365ShareHub</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-[#005A9E] transition">价格</Link>
            <Link href="/login" className="text-sm font-medium text-slate-900 hover:text-[#005A9E] transition">登录</Link>
            {/* 核心转化按钮：活力橙 */}
            <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold rounded-full px-6 shadow-lg shadow-orange-200">
              免费试用
            </Button>
          </div>
        </div>
      </nav>

      {/* --- Hero 区域：着陆页核心流 --- */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <Badge variant="outline" className="text-[#005A9E] border-[#005A9E] px-4 py-1 text-sm font-medium rounded-full bg-blue-50">
              🇪🇺 欧盟数据合规 · 德国法兰克福节点
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-slate-900">
              1TB Cloud.<br />
              <span className="text-[#005A9E]">1/3 Price.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              解锁 Microsoft 365 欧洲企业级订阅。
              <br />
              无需信用卡，<strong>先试用，满意后再付费。</strong>
            </p>
            
            {/* The 10s Flow: 极简注册入口 */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mt-4">
              <Input 
                type="email" 
                placeholder="输入您的邮箱地址..." 
                className="h-12 border-slate-300 focus:ring-[#005A9E] rounded-lg"
              />
              <Button className="h-12 px-8 bg-[#005A9E] hover:bg-[#004880] text-white font-bold text-lg rounded-lg transition-all w-full sm:w-auto flex gap-2">
                开始试用 <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-slate-400">
              点击即代表同意服务条款。无需全名，保护隐私。
            </p>
          </div>

          {/* 视觉展示：3D 悬浮图标与信任元素 */}
          <div className="relative">
             <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-orange-50 rounded-full blur-3xl opacity-50 -z-10"></div>
             <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur rounded-3xl p-8 relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#005A9E]">
                    <Server className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Office 365 E5 / Family</div>
                    <div className="text-slate-500 text-sm">Status: <span className="text-green-500 font-bold">Active</span></div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    "1TB OneDrive 独立存储",
                    "支持 5 台设备同时在线",
                    "Copilot AI 助手 (可选)",
                    "99.9% 正常运行时间 (SLA)"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
             </Card>
          </div>
        </div>
      </section>

      {/* --- 价格部分：Try Before Buy --- */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">简单透明的定价</h2>
            <p className="text-slate-600">所有方案均包含 7 天免费试用，到期不自动扣费。</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 方案 1: 月付 */}
            <Card className="border border-slate-200 hover:border-[#005A9E] transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Flex 月付</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-extrabold text-slate-900 mb-2">€3.99<span className="text-lg font-normal text-slate-500">/月</span></div>
                <p className="text-sm text-slate-500 mb-6">适合短期项目或临时使用</p>
                <Button variant="outline" className="w-full border-[#005A9E] text-[#005A9E] hover:bg-blue-50 font-bold">
                  开始 7 天试用
                </Button>
              </CardContent>
            </Card>

            {/* 方案 2: 年付 (核心推荐) */}
            <Card className="border-2 border-[#FF5722] shadow-xl relative scale-105 bg-white z-10">
              <div className="absolute top-0 right-0 bg-[#FF5722] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                BEST VALUE
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#FF5722]">Pro 年付</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-extrabold text-slate-900 mb-2">€29.90<span className="text-lg font-normal text-slate-500">/年</span></div>
                <p className="text-sm text-slate-500 mb-6">相当于每月仅需 €2.49</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-[#FF5722]"/> 优先客服支持</li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-[#FF5722]"/> 承诺续费不涨价</li>
                </ul>
                <Button className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold h-12 text-lg shadow-lg shadow-orange-100">
                  立即开始试用
                </Button>
              </CardContent>
            </Card>

            {/* 方案 3: 团队 */}
            <Card className="border border-slate-200 hover:border-[#005A9E] transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Team 拼车</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-extrabold text-slate-900 mb-2">€139<span className="text-lg font-normal text-slate-500">/年</span></div>
                <p className="text-sm text-slate-500 mb-6">包下一个完整的家庭组 (5人)</p>
                <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 font-bold">
                  联系客服开通
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-sm text-center">
        <span>© 2026 Frankfurt Operations. All rights reserved.</span>
      </footer>
    </div>
  );
}