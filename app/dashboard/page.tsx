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
  LogOut, Calendar, Clock, CreditCard, ShieldCheck, ExternalLink, Lock, AlertCircle,
  MessageSquare, X, Send 
} from "lucide-react";

import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { LanguageProvider, useLanguage } from "@/app/components/LanguageProvider";

// --- 配置应用列表 ---
const INSTALL_APPS = [
  { name: "Copilot", icon: "/icons/copilot.png", url: "https://copilot.microsoft.com/", descKey: "ai_companion" },
  { name: "OneDrive", icon: "/icons/onedrive.png", url: "https://onedrive.live.com/login/", descKey: "cloud_storage" },
  { name: "Microsoft 365", icon: "/icons/word.png", url: "https://www.microsoft.com/microsoft-365", descKey: "office_portal" },
  { name: "Outlook", icon: "/icons/outlook.png", url: "https://outlook.live.com/", descKey: "email_calendar" }
];

function DashboardInner() {
  const { t, lang } = useLanguage(); 
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();
  const [subscription, setSubscription] = useState<any>(null);

  // 客服工单状态管理
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMsg, setTicketMsg] = useState("");
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

  // --- 辅助函数：计算加入天数 ---
  const getDaysSince = (dateString: string) => {
    if (!dateString) return 0;
    const start = new Date(dateString).getTime();
    const now = new Date().getTime();
    const diff = now - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  // --- 辅助函数：格式化日期 ---
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString(lang, { 
        year: 'numeric', month: 'short', day: 'numeric' 
      });
    } catch (e) {
      return new Date(dateString).toLocaleDateString('en-US');
    }
  };
  
  const formatMonthYear = (dateString: string) => {
    if (!dateString) return t.common.loading;
    try {
      return new Date(dateString).toLocaleDateString(lang, { 
        year: 'numeric', month: 'long' 
      });
    } catch (e) {
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }
  };

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
  }, [router, supabase]);

  // --- Checkout 逻辑 ---
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
      else alert(t.common.connection_failed);
    } catch (error) {
      alert(t.common.network_error);
    } finally {
      setLoading(null);
    }
  };

  // --- Portal 逻辑 ---
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

  // 🔥 提交工单到 Supabase，并秒推到 Telegram！
  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMsg.trim()) return;

    setIsSubmittingTicket(true);
    try {
      // 1. 存入数据库
      const { error } = await supabase
        .from('tickets')
        .insert([
          { 
            user_id: user.id, 
            user_email: user.email, 
            subject: ticketSubject, 
            description: ticketMsg 
          }
        ]);

      if (error) throw error;

      // ==========================================
      // 🚀 2. 触发 Telegram 机器人提醒 (10行代码)
      // ==========================================
      // ⚠️ 替换下面两个变量为你自己的密钥！！！
      const TELEGRAM_BOT_TOKEN = "8579670530:AAGoECcOTHmIksxC94Pa25geLRC6XOsTV-k"; 
      const TELEGRAM_CHAT_ID = "6225103560";
      
      const message = `🚨 <b>新工单提醒 (New Ticket)</b>\n\n👤 <b>用户:</b> ${user.email}\n📝 <b>主题:</b> ${ticketSubject}\n💬 <b>内容:</b>\n${ticketMsg}`;
      
      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML"
        })
      }).catch(err => console.error("TG Push Failed", err)); // 即使失败也不影响用户前台体验
      // ==========================================

      alert(t.support?.success || "Message sent successfully!");
      setIsSupportOpen(false);
      setTicketSubject("");
      setTicketMsg("");
    } catch (error) {
      console.error("Error submitting ticket:", error);
      alert(t.support?.error || "Failed to send message. Please try again.");
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-[#fafafa]"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  const isPro = !!subscription;
  const isTrial = subscription?.status === 'trialing';

  const getLocalizedPlanName = (name: string) => {
    if (name.includes("Monthly")) return t.plans.monthly;
    if (name.includes("Semi")) return t.plans.semi;
    if (name.includes("Pro") || name.includes("Yearly")) return t.plans.yearly;
    return name;
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-800 hover:opacity-80 transition">
             <Image 
               src="/icons/logo-main.png" 
               alt="365ShareHub" 
               width={32} 
               height={32} 
               className="rounded-md object-contain" 
             />
             <span>365ShareHub</span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-slate-500">
             <LanguageSwitcher />
             <span className="hidden md:inline font-medium">{user.email}</span>
             <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
               <LogOut className="w-4 h-4 mr-1" /> {t.common.logout}
             </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{t.common.dashboard}</h1>
            <p className="text-slate-500 mt-2">{t.common.welcome} {user.user_metadata?.full_name || 'User'}.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:gap-6 text-sm text-slate-500 bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm">
             <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="hidden sm:inline">{t.common.member_since}</span> 
                <span className="font-semibold text-slate-700">{formatMonthYear(user.created_at)}</span>
             </div>
             <div className="hidden sm:block w-px bg-slate-200 h-5"></div>
             <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="hidden sm:inline">{t.common.joined}</span>
                <span className="font-semibold text-slate-700">{getDaysSince(user.created_at)} {t.common.days_ago}</span>
             </div>
          </div>
        </div>

        {isPro ? (
          // === 🅰️ 已订阅会员视图 ===
          <div className="grid md:grid-cols-3 gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <Card className="md:col-span-2 border-0 shadow-lg bg-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <Crown className="w-40 h-40 text-blue-600 rotate-12" />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-3">
                  {t.status.subscription_status}
                  {isTrial ? (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                      {t.status.trial_active}
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      {t.status.active}
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  {t.status.you_are_on} <span className="font-bold text-slate-900 text-lg">{getLocalizedPlanName(subscription.plan_name)}</span>.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-8">
                   <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
                      <div className={`h-full w-full absolute top-0 left-0 ${isTrial ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-green-500 to-emerald-400'}`}></div>
                      <div className="absolute top-0 right-0 h-full w-full bg-white/20 animate-[shimmer_2s_infinite]"></div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {isTrial ? (
                    <>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {t.status.trial_started}
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          {formatDate(subscription.current_period_start)}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <div className="text-xs text-blue-500 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                          <CreditCard className="w-3 h-3" /> {t.status.first_billing}
                        </div>
                        <div className="text-sm font-bold text-blue-700">
                          {formatDate(subscription.current_period_end)}
                        </div>
                        <div className="text-[10px] text-blue-600 mt-1 opacity-80">
                          ({t.status.trial_ends})
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                          <Check className="w-3 h-3" /> {t.status.plan_active_since}
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          {formatDate(subscription.current_period_start)}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                        <div className="text-xs text-green-600 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {t.status.next_renewal}
                        </div>
                        <div className="text-sm font-bold text-green-700">
                          {formatDate(subscription.current_period_end)}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {isTrial ? (
                   <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 w-fit">
                      <AlertCircle className="w-4 h-4 text-blue-500" />
                      <span>{t.status.enjoy_trial}</span>
                   </div>
                ) : (
                   <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white cursor-default shadow-sm">
                      <Check className="w-4 h-4 mr-2" /> {t.status.sub_active}
                   </Button>
                )}
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200 shadow-sm h-full bg-slate-50/50">
               <CardHeader><CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-slate-400"/> {t.common.my_account}</CardTitle></CardHeader>
               <CardContent className="space-y-5 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">{t.status.status_label}</span>
                    {isTrial ? (
                      <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{t.status.trial_period}</span>
                    ) : (
                      <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">{t.status.paid}</span>
                    )}
                  </div>
                  <div className="w-full h-px bg-slate-200 my-2"></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500">Email</span><span className="font-medium truncate max-w-[120px] text-slate-900" title={user.email}>{user.email}</span></div>
                  <div className="pt-4">
                     <Button variant="outline" className="w-full text-xs h-9 bg-white text-slate-600 border-slate-300 hover:bg-slate-100" onClick={handlePortal} disabled={loading === 'portal'}>
                        {loading === 'portal' ? <Loader2 className="w-3 h-3 animate-spin"/> : t.common.manage_billing}
                     </Button>
                  </div>
               </CardContent>
            </Card>
          </div>
        ) : (
          // === 🅱️ 非会员视图 ===
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto items-stretch animate-in fade-in slide-in-from-bottom-8 duration-700">
             {/* 1. Monthly */}
             <div className="group relative bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-[#0078D4] to-[#2b88d8] text-white py-1.5 text-center text-xs font-bold uppercase tracking-widest">{t.plans.flexible}</div>
                <div className="p-8 pt-12 flex flex-col h-full">
                  <h3 className="text-lg font-medium text-slate-500 mb-4">{t.plans.monthly}</h3>
                  <div className="flex items-baseline mb-6"><span className="text-4xl font-bold text-slate-900">€3.59</span><span className="text-slate-400 ml-1">{t.plans.mo}</span></div>
                  <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg mb-8 border border-green-100 w-fit">{t.status.trial_period}</div>
                  <ul className="space-y-4 mb-8 text-sm flex-grow">
                    <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features?.copilot || "Copilot"}</li>
                    <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features?.storage || "1TB Storage"}</li>
                    <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features?.devices || "All Devices"}</li>
                    <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features?.connect || "Connect 5"}</li>
                    <li className="flex gap-3 text-[#0078D4] font-extrabold items-center"><Check className="w-4 h-4 shrink-0 stroke-[3]"/> {t.plans.pay_after}</li>
                  </ul>
                  <Button onClick={() => handleCheckout("monthly")} disabled={!!loading} className="w-full h-12 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0060aa] hover:from-[#0060aa] hover:to-[#005090] text-white font-bold text-base shadow-md transition-all mt-auto">
                    {loading === "monthly" ? <Loader2 className="animate-spin w-4 h-4" /> : t.plans.start_trial}
                  </Button>
                </div>
             </div>

             {/* 2. Semi-Annual */}
             <div className="group relative bg-white rounded-3xl border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white py-1.5 text-center text-xs font-bold uppercase tracking-widest">{t.plans.most_popular}</div>
                <div className="p-8 pt-12 flex flex-col h-full">
                  <h3 className="text-lg font-bold text-slate-700 mb-4">{t.plans.semi}</h3>
                  <div className="flex items-baseline mb-1"><span className="text-4xl font-bold text-slate-900">€17.90</span></div>
                  <p className="text-sm font-medium text-green-600 mb-6">{t.plans.per_mo}</p>
                  
                  <div className="flex gap-2 mb-8 flex-wrap">
                     <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-100 w-fit">{t.status.trial_period}</div>
                     <div className="inline-block bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 w-fit">{t.plans.save_25}</div>
                  </div>

                  <ul className="space-y-4 mb-8 text-sm flex-grow">
                    <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features?.copilot}</li>
                    <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features?.storage}</li>
                    <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features?.devices}</li>
                    <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features?.connect}</li>
                    <li className="flex gap-3 text-slate-900 font-bold items-center"><Check className="w-4 h-4 text-green-500 shrink-0"/> {t.plans.save_25_vs}</li>
                  </ul>
                  <Button onClick={() => handleCheckout("semi")} disabled={!!loading} className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold rounded-xl h-12 shadow-lg hover:shadow-xl transition-all text-base mt-auto">
                    {loading === "semi" ? <Loader2 className="animate-spin w-4 h-4" /> : t.plans.choose_semi}
                  </Button>
                </div>
             </div>

             {/* 3. Yearly */}
             <div className="relative group md:-translate-y-4 h-full">
               <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-[24px] blur opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none group-hover:scale-105"></div>
               <div className="relative bg-white rounded-[22px] shadow-2xl h-full flex flex-col border border-purple-100 transform transition-transform duration-300 group-hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold py-2 uppercase tracking-widest text-center">{t.plans.best_value}</div>
                  <div className="p-8 pt-12 flex flex-col h-full">
                    <h3 className="text-xl font-bold text-purple-700 mb-4">{t.plans.yearly}</h3>
                    <div className="flex items-baseline mb-1"><span className="text-5xl font-extrabold text-slate-900">€29.90</span><span className="text-slate-400 ml-1">{t.plans.yr}</span></div>
                    <p className="text-sm font-bold text-pink-600 mb-6">{t.plans.only_mo}</p>
                    
                    <div className="flex gap-2 mb-8 flex-wrap">
                       <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-100 w-fit">{t.status.trial_period}</div>
                       <div className="inline-block bg-pink-50 text-pink-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-pink-100 w-fit">{t.plans.save_37}</div>
                    </div>

                    <ul className="space-y-4 mb-8 text-sm font-medium flex-grow">
                      <li className="flex gap-3 items-center"><Sparkles className="w-5 h-5 text-purple-500 shrink-0"/> {t.features?.copilot}</li>
                      <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> {t.features?.storage}</li>
                      <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> {t.features?.devices}</li>
                      <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> {t.features?.connect}</li>
                      <li className="flex gap-3 p-3 bg-pink-50/50 rounded-xl border border-pink-100 font-bold text-slate-900 items-center"><Check className="w-5 h-5 text-red-500 shrink-0"/> {t.plans.save_37_vs}</li>
                    </ul>
                    <div className="mt-auto">
                      <Button onClick={() => handleCheckout("yearly")} disabled={!!loading} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold rounded-xl h-14 shadow-lg shadow-purple-200 text-lg transition-transform active:scale-95">
                        {loading === "yearly" ? <Loader2 className="animate-spin w-5 h-5" /> : t.plans.sub_yearly}
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
             <CardTitle className="text-lg">{t.common.install_apps}</CardTitle>
             <CardDescription>{t.common.install_desc}</CardDescription>
           </CardHeader>
           <CardContent>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {INSTALL_APPS.map((app: any) => {
                  const appDesc = (t.apps as any)?.[app.descKey] || app.name;
                  return (
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
                         <Image src={app.icon} alt={app.name} width={56} height={56} className="object-contain p-1" />
                       </div>
                       <h4 className="font-bold text-slate-900">{app.name}</h4>
                       <p className="text-xs text-slate-500 mt-1">{appDesc}</p>
                       
                       {isPro ? (
                         <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                           <ExternalLink className="w-4 h-4 text-blue-500" />
                         </div>
                       ) : (
                         <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px] rounded-xl opacity-0 hover:opacity-100 transition-opacity">
                            <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1">
                              <Lock className="w-3 h-3" /> {t.common.locked}
                            </span>
                         </div>
                       )}
                    </div>
                  );
                })}
             </div>
           </CardContent>
        </Card>
      </main>

      {/* 🔥 客服悬浮按钮 */}
      <button
        onClick={() => setIsSupportOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#0078D4] hover:bg-[#0060aa] text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-40 group"
      >
        <MessageSquare className="w-6 h-6 group-hover:animate-pulse" />
      </button>

      {/* 🔥 客服表单弹窗 */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
            <div className="bg-slate-50 px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{t.support?.title || "Contact Support"}</h3>
                <p className="text-sm text-slate-500 mt-1">{t.support?.desc || "How can we help you today?"}</p>
              </div>
              <button 
                onClick={() => setIsSupportOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitTicket} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.support?.subject || "Subject"}</label>
                  <input
                    type="text"
                    required
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder={t.support?.subject_placeholder || "Briefly describe your issue"}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.support?.message || "Message"}</label>
                  <textarea
                    required
                    value={ticketMsg}
                    onChange={(e) => setTicketMsg(e.target.value)}
                    placeholder={t.support?.message_placeholder || "Provide more details..."}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSupportOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  {t.support?.cancel || "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingTicket}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#0078D4] hover:bg-[#0060aa] rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmittingTicket ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> {t.support?.submit || "Send Message"}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#fafafa]"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
      <LanguageProvider>
        <DashboardInner />
      </LanguageProvider>
    </Suspense>
  );
}