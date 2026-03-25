"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard, Crown, Loader2, Check, Sparkles, 
  LogOut, Calendar, Clock, CreditCard, ShieldCheck, ExternalLink, 
  Lock, Globe, X, Ticket, Send, Cloud, CheckCircle2 
} from "lucide-react";
import { useLanguage } from "@/app/components/LanguageProvider";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

function DashboardContent() {
  const { t } = useLanguage(); 
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [subscription, setSubscription] = useState<any>(null);

  const [showUpgrade, setShowUpgrade] = useState(false);

  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketLoading, setTicketLoading] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(false);

  const EXCHANGE_RATES = [
    { code: 'EUR', symbol: '€', rate: 1, label: 'EUR' },
    { code: 'USD', symbol: '$', rate: 1.09, label: 'USD' },
    { code: 'GBP', symbol: '£', rate: 0.85, label: 'GBP' },
    { code: 'CHF', symbol: 'CHF', rate: 0.98, label: 'CHF' },
    { code: 'CNY', symbol: '¥', rate: 7.82, label: 'CNY' },
    { code: 'TWD', symbol: 'NT$', rate: 34.6, label: 'TWD' },
    { code: 'JPY', symbol: '¥', rate: 163.5, label: 'JPY' },
    { code: 'KRW', symbol: '₩', rate: 1455, label: 'KRW' }
  ];
  const [currency, setCurrency] = useState(EXCHANGE_RATES[0]);

  const getPrice = (eurPrice: number) => {
    const val = eurPrice * currency.rate;
    if (['JPY', 'KRW'].includes(currency.code)) return Math.round(val).toLocaleString('en-US');
    return val.toFixed(2);
  };

  const INSTALL_APPS = [
    { name: "Copilot", icon: "/icons/copilot.png", url: "https://copilot.microsoft.com/", desc: t.apps?.ai_companion || "Your AI Companion" },
    { name: "OneDrive", icon: "/icons/onedrive.png", url: "https://onedrive.live.com/login/", desc: t.apps?.cloud_storage || "Cloud Storage" },
    { name: "Microsoft 365", icon: "/icons/word.png", url: "https://www.microsoft.com/microsoft-365", desc: t.apps?.office_portal || "Office Portal" },
    { name: "Outlook", icon: "/icons/outlook.png", url: "https://outlook.live.com/", desc: t.apps?.email_calendar || "Email & Calendar" }
  ];

  const getDaysSince = (dateString: string) => {
    if (!dateString) return 0;
    return Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateString: string) => dateString ? new Date(dateString).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : "N/A";
  const formatMonthYear = (dateString: string) => dateString ? new Date(dateString).toLocaleDateString("en-US", { year: 'numeric', month: 'long' }) : "Loading...";

  const getRenewsDate = (sub: any) => {
    if (sub?.current_period_end) return formatDate(sub.current_period_end);
    if (sub?.created_at) {
      const date = new Date(sub.created_at);
      if (sub.plan_name?.includes("Monthly")) date.setMonth(date.getMonth() + 1);
      else if (sub.plan_name?.includes("6-Months")) date.setMonth(date.getMonth() + 6);
      else date.setFullYear(date.getFullYear() + 1);
      return formatDate(date.toISOString());
    }
    return t.status?.next_renewal || "Next renewal";
  };

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUser(user);

      const { data: subData } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['active', 'trialing'])
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (subData) setSubscription(subData);
    };
    init();
  }, [router, searchParams, supabase.auth]);

  const isPro = !!subscription;

  const isCurrentPlan = (planId: string) => {
    if (!subscription) return false;
    const name = subscription.plan_name?.toLowerCase() || '';
    if (planId === 'monthly' && name.includes('monthly')) return true;
    if (planId === 'semi' && (name.includes('semi') || name.includes('6'))) return true;
    if (planId === 'yearly' && (name.includes('yearly') || name.includes('annual') || name.includes('pro'))) return true;
    return false;
  };

  const handlePlanClick = async (planType: string) => {
    if (isPro) {
      alert("You will be securely redirected to the billing portal to update your subscription. Please choose your new plan there.");
      handlePortal();
    } else {
      setLoading(planType);
      try {
        const res = await fetch("/api/checkout", { 
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan: planType })
        });
        const data = await res.json();
        if (data.url) window.location.href = data.url;
        else alert(t.common.connection_failed || "Connection failed.");
      } catch (error) {
        alert(t.common.network_error || "Network error.");
      } finally {
        setLoading(null);
      }
    }
  };

  const handlePortal = async () => {
    setLoading("portal");
    try {
      const res = await fetch("/api/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(t.common.connection_failed || "No billing account found.");
    } catch (error) {
      alert(t.common.network_error || "Error opening billing portal.");
    } finally {
      setLoading(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleSubmitTicket = async () => {
    if (!ticketSubject || !ticketMessage) return;
    setTicketLoading(true);
    const { error } = await supabase.from('tickets').insert([
      { user_id: user.id, user_email: user.email, subject: ticketSubject, description: ticketMessage, status: 'open' }
    ]);
    setTicketLoading(false);
    if (!error) {
      setTicketSuccess(true);
      setTicketSubject("");
      setTicketMessage("");
      setTimeout(() => setTicketSuccess(false), 4000);
    } else {
      alert(t.support?.error || "Failed to submit ticket. Please try again.");
    }
  };

  const getTranslatedPlanName = (planName: string) => {
    if (!planName) return "";
    if (planName.includes("Monthly")) return t.plans.monthly;
    if (planName.includes("Semi") || planName.includes("6-Months")) return t.plans.semi;
    if (planName.includes("Yearly") || planName.includes("Annual")) return t.plans.yearly;
    return planName;
  };

  const renderPricingCards = () => (
    <div className="flex flex-col items-center w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="inline-flex items-center bg-white border border-slate-200 rounded-full p-1.5 shadow-sm overflow-x-auto max-w-full mb-8">
        {EXCHANGE_RATES.map(c => (
          <button 
            key={c.code} onClick={() => setCurrency(c)} 
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${currency.code === c.code ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            {c.code === 'EUR' && <Globe className="w-3 h-3"/>}
            {c.symbol} {c.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-6 max-w-6xl mx-auto items-stretch w-full">
         <div className="relative group h-full">
           <div className="absolute -inset-0.5 bg-gradient-to-b from-[#0078D4] to-[#2b88d8] rounded-[24px] blur opacity-25 group-hover:opacity-60 transition duration-500 pointer-events-none group-hover:scale-105"></div>
           <div className="relative bg-white rounded-[22px] shadow-2xl h-full flex flex-col border border-blue-100 transform transition-transform duration-300 group-hover:-translate-y-2 overflow-hidden">
             <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-[#0078D4] to-[#2b88d8] text-white py-1.5 text-center text-xs font-bold uppercase tracking-widest">{t.plans.flexible}</div>
             <div className="p-8 pt-12 flex flex-col h-full"> 
               <h3 className="text-lg font-medium text-slate-500 mb-4">{t.plans.monthly}</h3>
               <div className="flex items-baseline mb-6">
                 <span className="text-4xl font-bold text-slate-900">{currency.symbol}{getPrice(2.50)}</span>
                 <span className="text-slate-400 ml-1 font-medium">{t.plans.mo}</span>
               </div>
               <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg mb-8 border border-green-100 w-fit">{t.plans.trial_7d}</div>
               <ul className="space-y-4 mb-8 text-sm flex-grow">
                 <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.copilot}</li>
                 <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.storage}</li>
                 <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.devices}</li>
               </ul>
               <Button 
                 onClick={() => handlePlanClick("monthly")} disabled={!!loading || isCurrentPlan("monthly")} 
                 className={`w-full h-12 rounded-xl font-bold text-base shadow-md transition-all mt-auto ${isCurrentPlan('monthly') ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#0078D4] to-[#0060aa] hover:from-[#0060aa] hover:to-[#005090] text-white'}`}
               >
                 {/* 🔥 使用多语言翻译 */}
                 {loading === "monthly" ? <Loader2 className="animate-spin w-4 h-4" /> : isCurrentPlan('monthly') ? (t.plans.current_plan || "Current Plan") : isPro ? (t.plans.switch_plan || "Switch Plan") : t.plans.start_trial}
               </Button>
             </div>
           </div>
         </div>

         <div className="relative group h-full">
            <div className="absolute -inset-0.5 bg-gradient-to-b from-slate-900 to-slate-700 rounded-[24px] blur opacity-25 group-hover:opacity-60 transition duration-500 pointer-events-none group-hover:scale-105"></div>
            <div className="relative bg-white rounded-[22px] shadow-2xl h-full flex flex-col border border-slate-200 transform transition-transform duration-300 group-hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white py-1.5 text-center text-xs font-bold uppercase tracking-widest">{t.plans.most_popular}</div>
             <div className="p-8 pt-12 flex flex-col h-full">
               <h3 className="text-lg font-bold text-slate-700 mb-4">{t.plans.semi}</h3>
               <div className="flex items-baseline mb-1">
                 <span className="text-4xl font-bold text-slate-900">{currency.symbol}{getPrice(12.90)}</span>
                 <span className="text-slate-400 ml-2 font-medium">{t.plans.per_6mo || "/ 6 months"}</span>
               </div>
               <p className="text-sm font-medium text-green-600 mb-6">≈ {currency.symbol}{getPrice(2.15)} {t.plans.mo}</p>
               <div className="flex gap-2 mb-8 flex-wrap">
                  <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-100 w-fit">{t.plans.trial_7d}</div>
                  <div className="inline-block bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 w-fit">{t.plans.save_25 || "Save 14%"}</div>
               </div>
               <ul className="space-y-4 mb-8 text-sm flex-grow">
                 <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.copilot}</li>
                 <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.storage}</li>
                 <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.devices}</li>
               </ul>
               <Button 
                 onClick={() => handlePlanClick("semi")} disabled={!!loading || isCurrentPlan("semi")} 
                 className={`w-full font-bold rounded-xl h-12 transition-all text-base mt-auto ${isCurrentPlan('semi') ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white shadow-lg hover:shadow-xl'}`}
               >
                 {/* 🔥 使用多语言翻译 */}
                 {loading === "semi" ? <Loader2 className="animate-spin w-4 h-4" /> : isCurrentPlan('semi') ? (t.plans.current_plan || "Current Plan") : isPro ? (t.plans.switch_plan || "Switch Plan") : t.plans.choose_semi}
               </Button>
             </div>
           </div>
         </div>

         <div className="relative group md:-translate-y-4 h-full">
           <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-[24px] blur opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none group-hover:scale-105"></div>
           <div className="relative bg-white rounded-[22px] shadow-2xl h-full flex flex-col border border-purple-100 transform transition-transform duration-300 group-hover:-translate-y-2 overflow-hidden">
             <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 text-center text-xs font-bold uppercase tracking-widest">{t.plans.best_value}</div>
             <div className="p-8 pt-12 flex flex-col h-full">
               <h3 className="text-xl font-bold text-purple-700 mb-4">{t.plans.yearly}</h3>
               <div className="flex items-baseline mb-1">
                 <span className="text-5xl font-extrabold text-slate-900">{currency.symbol}{getPrice(19.90)}</span>
                 <span className="text-slate-400 ml-2 font-medium">{t.plans.yr}</span>
               </div>
               <p className="text-sm font-bold text-pink-600 mb-6">≈ {currency.symbol}{getPrice(1.65)} {t.plans.mo}</p>
               <div className="flex gap-2 mb-8 flex-wrap items-center">
                  <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-100 w-fit">{t.plans.trial_7d}</div>
                  <div className="inline-block bg-pink-50 text-pink-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-pink-100 w-fit">{t.plans.save_37 || "Save 33%"}</div>
                  <span className="text-sm font-bold text-pink-600 ml-1">🎉</span>
               </div>
               <ul className="space-y-4 mb-8 text-sm font-medium flex-grow">
                 <li className="flex gap-3 items-center"><Sparkles className="w-5 h-5 text-purple-500 shrink-0"/> {t.features.copilot}</li>
                 <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> {t.features.storage}</li>
                 <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> {t.features.devices}</li>
               </ul>
               <div className="mt-auto">
                 <Button 
                   onClick={() => handlePlanClick("yearly")} disabled={!!loading || isCurrentPlan("yearly")} 
                   className={`w-full font-bold rounded-xl h-14 text-lg transition-transform ${isCurrentPlan('yearly') ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white shadow-lg shadow-purple-200 active:scale-95'}`}
                 >
                   {/* 🔥 使用多语言翻译 */}
                   {loading === "yearly" ? <Loader2 className="animate-spin w-5 h-5" /> : isCurrentPlan('yearly') ? (t.plans.current_plan || "Current Plan") : isPro ? (t.plans.switch_yearly || "Switch to Yearly") : t.plans.sub_yearly}
                 </Button>
               </div>
             </div>
           </div>
         </div>
      </div>
      
      {currency.code !== 'EUR' && (
        <div className="text-center mb-12 animate-in fade-in duration-500">
           <p className="text-xs text-slate-400 font-medium inline-block bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
             * All plans are securely billed in <b>EUR (€)</b>. The {currency.code} prices shown are estimates based on current exchange rates.
           </p>
        </div>
      )}
    </div>
  );

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-[#fafafa]"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-800 hover:opacity-80 transition">
             <div className="w-8 h-8 bg-gradient-to-br from-[#0078D4] to-[#26A4F5] rounded-md flex items-center justify-center text-white">
               <LayoutDashboard className="w-4 h-4" />
             </div>
             <span className="hidden sm:block">{t.common.my_account}</span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-slate-500">
             <div className="hidden sm:block border-r border-slate-200 pr-4 mr-1">
                <LanguageSwitcher />
             </div>
             <span className="hidden md:inline text-slate-700 font-medium">{user.email}</span>
             <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50 focus:ring-0">
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
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <Card className="md:col-span-2 border-0 shadow-lg bg-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                  <Crown className="w-40 h-40 text-blue-600 rotate-12" />
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-3">
                    {t.status.subscription_status}
                    <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      {t.status.active}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {t.status.you_are_on} <span className="font-bold text-slate-900 text-lg">{getTranslatedPlanName(subscription.plan_name)}</span>
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
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1"><CreditCard className="w-3 h-3" /> {t.status.trial_started}</div>
                      <div className="text-sm font-bold text-slate-900">{formatDate(subscription.current_period_start || subscription.created_at)}</div>
                    </div>
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                      <div className="text-xs text-blue-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1"><Calendar className="w-3 h-3" /> {t.status.next_renewal}</div>
                      <div className="text-sm font-bold text-blue-700">{getRenewsDate(subscription)}</div>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white cursor-default shadow-sm"><Check className="w-4 h-4 mr-2" /> {t.status.sub_active}</Button>
                </CardContent>
              </Card>
              
              <Card className="border border-slate-200 shadow-sm h-full bg-slate-50/50 flex flex-col">
                 <CardHeader><CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-slate-400"/> {t.common.account_details || "Account Details"}</CardTitle></CardHeader>
                 <CardContent className="space-y-4 text-sm flex-1 flex flex-col">
                    <div className="flex justify-between items-center"><span className="text-slate-500">{t.common.plan_type || "Plan Type"}</span><span className="font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">{getTranslatedPlanName(subscription.plan_name)}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-500">{t.status.status_label || "Status"}</span><span className="font-medium text-green-600">{t.status.paid || "Active / Paid"}</span></div>
                    <div className="w-full h-px bg-slate-200 my-1"></div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1"><Cloud className="w-3 h-3"/> Cloud Storage</span>
                        <span className="text-xs font-bold text-blue-600">{t.status.active || "Active"}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1">
                        <div className="bg-blue-500 h-full w-[100%] rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>1TB Total</span><span>1TB Available</span>
                      </div>
                    </div>

                    <div className="mt-auto space-y-2 pt-4">
                       <Button 
                          variant="default" 
                          className="w-full text-xs h-9 bg-[#0078D4] hover:bg-[#0060aa] text-white shadow-sm" 
                          onClick={() => setShowUpgrade(!showUpgrade)}
                        >
                          <Sparkles className="w-3 h-3 mr-1.5" /> {t.common?.upgrade_plan || "Upgrade / Change Plan"}
                       </Button>
                       <Button variant="outline" className="w-full text-xs h-9 bg-white text-slate-600 border-slate-300 hover:bg-slate-100" onClick={handlePortal} disabled={loading === 'portal'}>
                          {loading === 'portal' ? <Loader2 className="w-3 h-3 animate-spin"/> : t.common.manage_billing}
                       </Button>
                    </div>
                 </CardContent>
              </Card>
            </div>

            {showUpgrade && (
              <div className="mb-10 bg-slate-100/50 border border-slate-200 rounded-[2.5rem] p-8 md:p-12 animate-in fade-in slide-in-from-top-4 duration-500 relative">
                <Button variant="ghost" onClick={() => setShowUpgrade(false)} className="absolute top-6 right-6 rounded-full w-10 h-10 p-0 text-slate-400 hover:bg-slate-200"><X className="w-5 h-5"/></Button>
                <div className="text-center mb-8">
                  {/* 🔥 调用多语言标题和描述 */}
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.plans?.upgrade_title || "Upgrade Your Experience"}</h2>
                  <p className="text-slate-500">{t.plans?.upgrade_desc || "Switching to a yearly plan saves you 33% instantly."}</p>
                </div>
                {renderPricingCards()}
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card className="border border-slate-200 shadow-sm h-full bg-white">
                   <CardHeader>
                     <CardTitle className="text-lg">{t.common.install_apps}</CardTitle>
                     <CardDescription>{t.common.install_desc}</CardDescription>
                   </CardHeader>
                   <CardContent>
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {INSTALL_APPS.map((app) => (
                          <div 
                            key={app.name} 
                            className="relative p-4 border border-slate-100 rounded-xl transition flex flex-col items-center text-center hover:bg-slate-50 cursor-pointer group hover:shadow-md hover:-translate-y-1"
                            onClick={() => window.open(app.url, '_blank')}
                          >
                             <div className="w-14 h-14 mb-3 bg-white rounded-xl flex items-center justify-center shadow-sm p-2 relative">
                               <Image src={app.icon} alt={app.name} fill className="object-contain p-1" />
                             </div>
                             <h4 className="font-bold text-slate-900 text-sm">{app.name}</h4>
                             <p className="text-[10px] text-slate-500 mt-1">{app.desc}</p>
                             <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                               <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                             </div>
                          </div>
                        ))}
                     </div>
                   </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border border-slate-200 shadow-sm h-full bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                      <Ticket className="w-5 h-5 text-orange-500"/> {t.support?.title || "Support Ticket"}
                    </CardTitle>
                    <CardDescription className="text-xs">{t.support?.desc || "Need help? Open a ticket directly to our admin team."}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {ticketSuccess ? (
                      <div className="bg-green-50 border border-green-100 text-green-700 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center h-40 animate-in zoom-in duration-300">
                        <CheckCircle2 className="w-8 h-8 text-green-500"/> 
                        <span className="font-bold text-sm">{t.support?.success || "Ticket Submitted!"}</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Input 
                          placeholder={t.support?.subject_placeholder || "Subject (e.g., Change device)"}
                          value={ticketSubject} 
                          onChange={e => setTicketSubject(e.target.value)}
                          className="bg-slate-50 border-slate-200 text-sm"
                        />
                        <textarea 
                          placeholder={t.support?.message_placeholder || "How can we help you today?"}
                          value={ticketMessage} 
                          onChange={e => setTicketMessage(e.target.value)}
                          className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 text-sm min-h-[90px] focus:outline-none focus:ring-1 focus:ring-[#0078D4]"
                        />
                        <Button 
                          onClick={handleSubmitTicket} 
                          disabled={ticketLoading || !ticketSubject || !ticketMessage}
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-9 text-xs shadow-sm"
                        >
                          {ticketLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : <>{t.support?.submit || "Submit Ticket"} <Send className="w-3 h-3 ml-2"/></>}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : (
          renderPricingCards()
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fafafa]"></div>}>
      <DashboardContent />
    </Suspense>
  );
}