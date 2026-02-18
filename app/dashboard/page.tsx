"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LayoutDashboard, Crown, Loader2, Check, Sparkles, 
  LogOut, Calendar, Clock, CreditCard, ShieldCheck, ExternalLink, Lock 
} from "lucide-react";

// --- 配置应用列表 ---
const INSTALL_APPS = [
  { name: "Copilot", icon: "/icons/copilot.png", url: "https://copilot.microsoft.com/", desc: "Your AI Companion" },
  { name: "OneDrive", icon: "/icons/onedrive.png", url: "https://onedrive.live.com/login/", desc: "Cloud Storage" },
  { name: "Microsoft 365", icon: "/icons/word.png", url: "https://www.microsoft.com/microsoft-365", desc: "Office Portal" },
  { name: "Outlook", icon: "/icons/outlook.png", url: "https://outlook.live.com/", desc: "Email & Calendar" }
];

function DashboardContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [subscription, setSubscription] = useState<any>(null);

  // --- 辅助函数 ---
  const getDaysSince = (dateString: string) => {
    if (!dateString) return 0;
    const start = new Date(dateString).getTime();
    const now = new Date().getTime();
    const diff = now - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const formatMonthYear = (dateString: string) => {
    if (!dateString) return "Loading...";
    return new Date(dateString).toLocaleDateString("en-US", { year: 'numeric', month: 'long' });
  };

  const getRenewsDate = (sub: any) => {
    if (sub?.current_period_end) return formatDate(sub.current_period_end);
    if (sub?.created_at) {
      const date = new Date(sub.created_at);
      if (sub.plan_name?.includes("Monthly")) date.setMonth(date.getMonth() + 1);
      else if (sub.plan_name?.includes("Yearly")) date.setFullYear(date.getFullYear() + 1);
      else if (sub.plan_name?.includes("6-Months")) date.setMonth(date.getMonth() + 6);
      else date.setFullYear(date.getFullYear() + 1);
      return formatDate(date.toISOString());
    }
    return "Next billing cycle";
  };

  // --- 初始化 ---
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      const { data: subData } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['active', 'trialing'])
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (subData) {
        setSubscription(subData);
      }
    };
    init();
  }, [router]);

  // --- 支付处理 ---
  const handleCheckout = async (planType: string) => {
    setLoading(planType);
    try {
      const res = await fetch("/api/checkout", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planType })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Connection failed. Please try again.");
    } catch (error) {
      console.error(error);
      alert("Network error.");
    } finally {
      setLoading(null);
    }
  };

  const handlePortal = async () => {
    setLoading("portal");
    try {
      const res = await fetch("/api/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("No billing account found.");
    } catch (error) {
      alert("Error opening billing portal.");
    } finally {
      setLoading(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-[#fafafa]"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  const isPro = !!subscription;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-800 hover:opacity-80 transition">
             <div className="w-8 h-8 bg-gradient-to-br from-[#0078D4] to-[#26A4F5] rounded-md flex items-center justify-center text-white">
               <LayoutDashboard className="w-4 h-4" />
             </div>
             <span>My Account</span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-slate-500">
             <span className="hidden md:inline">{user.email}</span>
             <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
               <LogOut className="w-4 h-4 mr-1" /> Logout
             </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-2">Welcome back, {user.user_metadata?.full_name || 'User'}.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:gap-6 text-sm text-slate-500 bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm">
             <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="hidden sm:inline">Member since:</span> 
                <span className="font-semibold text-slate-700">{formatMonthYear(user.created_at)}</span>
             </div>
             <div className="hidden sm:block w-px bg-slate-200 h-5"></div>
             <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="hidden sm:inline">Joined:</span>
                <span className="font-semibold text-slate-700">{getDaysSince(user.created_at)} days ago</span>
             </div>
          </div>
        </div>

        {isPro ? (
          // === 🅰️ 已订阅会员视图 (保持不变) ===
          <div className="grid md:grid-cols-3 gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <Card className="md:col-span-2 border-0 shadow-lg bg-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <Crown className="w-40 h-40 text-blue-600 rotate-12" />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-3">
                  Subscription Status
                  <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Active
                  </span>
                </CardTitle>
                <CardDescription>
                  You are currently on the <span className="font-bold text-slate-900 text-lg">{subscription.plan_name}</span>.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-8">
                   <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-full w-full absolute top-0 left-0"></div>
                      <div className="absolute top-0 right-0 h-full w-full bg-white/20 animate-[shimmer_2s_infinite]"></div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1"><CreditCard className="w-3 h-3" /> Start Date</div>
                    <div className="text-sm font-bold text-slate-900">{formatDate(subscription.current_period_start || subscription.created_at)}</div>
                  </div>
                  <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <div className="text-xs text-blue-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1"><Calendar className="w-3 h-3" /> Renews On</div>
                    <div className="text-sm font-bold text-blue-700">{getRenewsDate(subscription)}</div>
                  </div>
                </div>
                <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white cursor-default shadow-sm"><Check className="w-4 h-4 mr-2" /> Subscription Active</Button>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200 shadow-sm h-full bg-slate-50/50">
               <CardHeader><CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-slate-400"/> Account Details</CardTitle></CardHeader>
               <CardContent className="space-y-5 text-sm">
                  <div className="flex justify-between items-center"><span className="text-slate-500">Plan Type</span><span className="font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">{subscription.plan_name}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500">Status</span><span className="font-medium text-green-600">Active / Paid</span></div>
                  <div className="w-full h-px bg-slate-200 my-2"></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500">Email</span><span className="font-medium truncate max-w-[120px] text-slate-900" title={user.email}>{user.email}</span></div>
                  <div className="pt-4">
                     <Button variant="outline" className="w-full text-xs h-9 bg-white text-slate-600 border-slate-300 hover:bg-slate-100" onClick={handlePortal} disabled={loading === 'portal'}>
                        {loading === 'portal' ? <Loader2 className="w-3 h-3 animate-spin"/> : "Manage Billing / Cancel"}
                     </Button>
                  </div>
               </CardContent>
            </Card>
          </div>
        ) : (
          // === 🅱️ 非会员视图 (价格表 - 已修复缺失的平台支持项) ===
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto items-stretch animate-in fade-in slide-in-from-bottom-8 duration-700">
             
             {/* 1. Monthly (FLEXIBLE) - Blue Gradient */}
             <div className="group relative bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-[#0078D4] to-[#2b88d8] text-white py-1.5 text-center text-xs font-bold uppercase tracking-widest">FLEXIBLE</div>
                <div className="p-8 pt-12 flex flex-col h-full">
                  <h3 className="text-lg font-medium text-slate-500 mb-4">Monthly Plan</h3>
                  <div className="flex items-baseline mb-6"><span className="text-4xl font-bold text-slate-900">€3.59</span><span className="text-slate-400 ml-1">/mo</span></div>
                  <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg mb-8 border border-green-100 w-fit">7-Day Free Trial</div>
                  <ul className="space-y-4 mb-8 text-sm flex-grow">
                    <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> Includes Copilot & All Apps</li>
                    <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> 1TB OneDrive Storage</li>
                    {/* 🔥 补充缺失项 */}
                    <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> PC, Mac, iOS & Android</li>
                    <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> Connect 5 Devices</li>
                    <li className="flex gap-3 text-[#0078D4] font-extrabold items-center"><Check className="w-4 h-4 shrink-0 stroke-[3]"/> Pay after trial, cancel anytime</li>
                  </ul>
                  <Button onClick={() => handleCheckout("monthly")} disabled={!!loading} className="w-full h-12 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0060aa] hover:from-[#0060aa] hover:to-[#005090] text-white font-bold text-base shadow-md transition-all mt-auto">
                    {loading === "monthly" ? <Loader2 className="animate-spin w-4 h-4" /> : "Start Free Trial"}
                  </Button>
                </div>
             </div>

             {/* 2. Semi-Annual (POPULAR) - Dark Gradient */}
             <div className="group relative bg-white rounded-3xl border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white py-1.5 text-center text-xs font-bold uppercase tracking-widest">MOST POPULAR</div>
                <div className="p-8 pt-12 flex flex-col h-full">
                  <h3 className="text-lg font-bold text-slate-700 mb-4">Semi-Annual Plan</h3>
                  <div className="flex items-baseline mb-1"><span className="text-4xl font-bold text-slate-900">€17.90</span></div>
                  <p className="text-sm font-medium text-green-600 mb-6">€2.98 / mo</p>
                  
                  <div className="flex gap-2 mb-8 flex-wrap">
                     <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-100 w-fit">7-Day Free Trial</div>
                     <div className="inline-block bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 w-fit">Save 25%</div>
                  </div>

                  <ul className="space-y-4 mb-8 text-sm flex-grow">
                    <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> Includes Copilot & All Apps</li>
                    <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> 1TB OneDrive Storage</li>
                    {/* 🔥 补充缺失项 */}
                    <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> PC, Mac, iOS & Android</li>
                    <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> Connect 5 Devices</li>
                    <li className="flex gap-3 text-slate-900 font-bold items-center"><Check className="w-4 h-4 text-green-500 shrink-0"/> Save 25% vs Monthly</li>
                  </ul>
                  <Button onClick={() => handleCheckout("semi")} disabled={!!loading} className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold rounded-xl h-12 shadow-lg hover:shadow-xl transition-all text-base mt-auto">
                    {loading === "semi" ? <Loader2 className="animate-spin w-4 h-4" /> : "Choose 6-Months"}
                  </Button>
                </div>
             </div>

             {/* 3. Yearly (BEST VALUE) - Purple Gradient */}
             <div className="relative group md:-translate-y-4 h-full">
               <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-[24px] blur opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none group-hover:scale-105"></div>
               <div className="relative bg-white rounded-[22px] shadow-2xl h-full flex flex-col border border-purple-100 transform transition-transform duration-300 group-hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold py-2 uppercase tracking-widest text-center">BEST VALUE</div>
                  <div className="p-8 pt-12 flex flex-col h-full">
                    <h3 className="text-xl font-bold text-purple-700 mb-4">Annual Pro</h3>
                    <div className="flex items-baseline mb-1"><span className="text-5xl font-extrabold text-slate-900">€29.90</span><span className="text-slate-400 ml-1">/yr</span></div>
                    <p className="text-sm font-bold text-pink-600 mb-6">Only €2.49 / mo</p>
                    
                    <div className="flex gap-2 mb-8 flex-wrap">
                       <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-100 w-fit">7-Day Free Trial</div>
                       <div className="inline-block bg-pink-50 text-pink-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-pink-100 w-fit">Save 37%</div>
                    </div>

                    <ul className="space-y-4 mb-8 text-sm font-medium flex-grow">
                      <li className="flex gap-3 items-center"><Sparkles className="w-5 h-5 text-purple-500 shrink-0"/> Includes Copilot & All Apps</li>
                      <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> 1TB OneDrive Storage</li>
                      {/* 🔥 补充缺失项 */}
                      <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> PC, Mac, iOS & Android</li>
                      <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> Connect 5 Devices</li>
                      <li className="flex gap-3 p-3 bg-pink-50/50 rounded-xl border border-pink-100 font-bold text-slate-900 items-center"><Check className="w-5 h-5 text-red-500 shrink-0"/> Save 37% vs Monthly</li>
                    </ul>
                    <div className="mt-auto">
                      <Button onClick={() => handleCheckout("yearly")} disabled={!!loading} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold rounded-xl h-14 shadow-lg shadow-purple-200 text-lg transition-transform active:scale-95">
                        {loading === "yearly" ? <Loader2 className="animate-spin w-5 h-5" /> : "Subscribe Yearly"}
                      </Button>
                    </div>
                  </div>
               </div>
             </div>
          </div>
        )}

        {/* 应用下载区 */}
        <Card className="border border-slate-200 shadow-sm mt-8 bg-white">
           <CardHeader>
             <CardTitle className="text-lg">Install Apps</CardTitle>
             <CardDescription>Download your apps immediately. Available for active subscribers.</CardDescription>
           </CardHeader>
           <CardContent>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {INSTALL_APPS.map((app) => (
                  <div 
                    key={app.name} 
                    className={`
                      relative p-4 border border-slate-100 rounded-xl transition flex flex-col items-center text-center
                      ${isPro 
                        ? 'hover:bg-slate-50 cursor-pointer group hover:shadow-md hover:-translate-y-1' 
                        : 'opacity-50 grayscale cursor-not-allowed bg-slate-50'
                      }
                    `}
                    onClick={() => isPro && window.open(app.url, '_blank')}
                  >
                     <div className="w-14 h-14 mb-3 bg-white rounded-xl flex items-center justify-center shadow-sm p-2 relative">
                       <Image src={app.icon} alt={app.name} fill className="object-contain p-1" />
                     </div>
                     <h4 className="font-bold text-slate-900">{app.name}</h4>
                     <p className="text-xs text-slate-500 mt-1">{app.desc}</p>
                     
                     {isPro ? (
                       <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <ExternalLink className="w-4 h-4 text-blue-500" />
                       </div>
                     ) : (
                       <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px] rounded-xl opacity-0 hover:opacity-100 transition-opacity">
                          <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Locked
                          </span>
                       </div>
                     )}
                  </div>
                ))}
             </div>
           </CardContent>
        </Card>
      </main>
    </div>
  );
}

// 确保用 Suspense 包裹以避免 build 错误
export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}