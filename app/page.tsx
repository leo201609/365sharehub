"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image"; 
import { useRouter } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Check, ArrowRight, User, LogOut, LayoutDashboard, Sparkles, Plus, Minus, Mail, Loader2, Send, MessageSquare, X, ShieldCheck } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link"; 

// 引入多语言组件和 Hook
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { useLanguage } from "@/app/components/LanguageProvider";

// --- 0. Icons & Logo ---
const ModernLogo = () => (
  <div className="w-9 h-9 relative flex items-center justify-center shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
      <Image 
        src="/icons/logo-main.png" 
        alt="365ShareHub Logo" 
        fill 
        className="object-contain"
        sizes="36px"
        priority
      />
  </div>
);

// --- 1. 应用数据 ---
const APPS_DATA = [
  { id: "copilot", title: "Copilot", desc: "Your everyday AI companion.", icon: "/icons/copilot.png", link: "https://copilot.microsoft.com/" },
  { id: "onedrive", title: "OneDrive", desc: "Save and share safely.", icon: "/icons/onedrive.png", link: "https://onedrive.live.com/" },
  { id: "word", title: "Word", desc: "Elevate your writing.", icon: "/icons/word.png", link: "https://www.microsoft.com/microsoft-365/word" },
  { id: "excel", title: "Excel", desc: "Turn data into insights.", icon: "/icons/excel.png", link: "https://www.microsoft.com/microsoft-365/excel" },
  { id: "ppt", title: "PowerPoint", desc: "Create impactful slides.", icon: "/icons/ppt.png", link: "https://www.microsoft.com/microsoft-365/powerpoint" },
  { id: "access", title: "Access", desc: "Create database apps.", icon: "/icons/access.png", link: "https://www.microsoft.com/microsoft-365/access" },
  { id: "outlook", title: "Outlook", desc: "Email and calendar.", icon: "/icons/outlook.png", link: "https://outlook.live.com/" },
  { id: "teams", title: "Teams", desc: "Meet, chat, call, collab.", icon: "/icons/teams.png", link: "https://www.microsoft.com/microsoft-teams" },
  { id: "onenote", title: "OneNote", desc: "Your digital notebook.", icon: "/icons/onenote.png", link: "https://www.microsoft.com/microsoft-365/onenote" },
  { id: "clipchamp", title: "Clipchamp", desc: "Video editor with AI.", icon: "/icons/clipchamp.png", link: "https://clipchamp.com/" },
  { id: "designer", title: "Designer", desc: "Create stunning graphics.", icon: "/icons/designer.png", link: "https://designer.microsoft.com/" },
  { id: "defender", title: "Defender", desc: "Protect data and devices.", icon: "/icons/defender.png", link: "https://www.microsoft.com/microsoft-365/microsoft-defender" },
];

const AppCard = ({ item }: any) => (
  <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 cursor-pointer group hover:-translate-y-1 h-full flex flex-col items-center text-center relative overflow-hidden">
      <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300 relative w-14 h-14">
        <Image src={item.icon} alt={item.title} fill className="object-contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 16vw"/>
      </div>
      <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed flex-grow">{item.desc}</p>
      <div className="mt-4 flex items-center text-[#0067b8] text-xs font-semibold group-hover:underline underline-offset-4">
        Learn more <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </a>
);

// --- 3. 首页核心内容组件 ---
function HomeContent() {
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [emailInput, setEmailInput] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  // 核心交互状态
  const [formMode, setFormMode] = useState<'trial' | 'contact'>('trial');
  const [trialStatus, setTrialStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  // 控制输入框高亮动效的状态
  const [highlightInput, setHighlightInput] = useState(false);
  
  // 留言表单状态
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const router = useRouter(); 
  const supabase = createClient();
  
  // 用于定位和聚焦主输入框的引用 (Ref)
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  };

  const handleNav = (path: string) => {
    router.push(path);
  };

  // 处理顶部导航栏点击试用的逻辑 (增加高亮动效)
  const handleTopNavTrialClick = () => {
    setFormMode('trial');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 延迟 400ms 等待页面滚动完成
    setTimeout(() => {
      emailInputRef.current?.focus(); // 自动聚焦光标
      setHighlightInput(true); // 触发高亮放大动效
      
      // 2 秒后移除高亮动效，恢复原样
      setTimeout(() => {
        setHighlightInput(false);
      }, 2000);
    }, 400);
  };

  // 🔥 核心更新：提交试用时，将线索同时推送到 Telegram 和 Supabase 数据库
  const handleQuickTrial = async () => {
    if (!emailInput || !emailInput.includes('@')) {
      alert("Please enter a valid Microsoft Account email address.");
      return;
    }
    
    setTrialStatus('loading');
    
    try {
      // 1. 发送 Telegram 提醒
      const notifyPromise = fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'trial', email: emailInput })
      });

      // 2. 存入 Supabase 'leads' 数据表
      const saveLeadPromise = supabase
        .from('leads')
        .insert([{ 
          email: emailInput,
          region: "🌐 Web Visitor", // 此处默认填 Web Visitor，你日后也可接入 Geo IP 获取真实国家
          status: "Trial Active",
          type: "Guest Lead"
        }]);

      // 并发执行这两个操作，速度最快
      await Promise.all([notifyPromise, saveLeadPromise]);
      
      setTrialStatus('success');
    } catch (error) {
      console.error("Trial request failed", error);
      alert("Something went wrong. Please try again.");
      setTrialStatus('idle');
    }
  };

  const handleQuickContact = async () => {
    if (!contactMessage) return;
    setContactStatus('loading');
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', email: contactEmail, message: contactMessage })
      });
      setContactStatus('success');
    } catch (error) {
      console.error("Contact request failed", error);
      alert("Something went wrong. Please try again.");
      setContactStatus('idle');
    }
  };

  const faqs = t.faq ? [
    { q: t.faq.q1, a: t.faq.a1 },
    { 
      q: t.faq.q2, 
      a: "You can enjoy a 7-day free trial and pay only after you are 100% satisfied. If you are not satisfied, you can easily cancel anytime before the trial ends without being charged a single cent. If you are satisfied after the trial, please sign up with your email and subscribe to the plan you need." 
    },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { 
      q: t.faq.q6 || "Is my payment secure? What payment methods do you support?", 
      a: t.faq.a6 || "Absolutely. All transactions are securely processed with bank-level encryption through Stripe, a global leader in payment infrastructure. We never store your credit card data on our servers. For your convenience and safety, we support a wide range of flexible payment methods, including Credit/Debit Cards, PayPal, Klarna, Apple Pay, Google Pay, and SEPA Direct Debit." 
    },
  ] : [];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <ModernLogo />
            <span className="font-bold text-xl tracking-tight hidden md:block text-slate-800">365ShareHub</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block border-r border-slate-200 pr-4 mr-1">
               <LanguageSwitcher />
            </div>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-transform active:scale-95">
                     <User className="h-5 w-5 text-slate-700" />
                   </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none truncate">{user.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4"/> {t.common.dashboard}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4"/> {t.common.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <button onClick={() => router.push("/login")} className="text-sm font-medium text-slate-600 hover:text-[#0078D4] transition hidden sm:block">
                  {t.common.sign_in}
                </button>
                <Button onClick={handleTopNavTrialClick} className="bg-[#0078D4] text-white hover:bg-[#0060aa] rounded-full px-6 h-10 text-sm font-semibold shadow-md shadow-blue-200 transition-all hover:scale-105">
                  {t.plans.start_trial}
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="relative pt-24 pb-20 px-6 text-center min-h-[600px] flex flex-col justify-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {/* SEO 优化：强化 Hero 标题和副标题的痛点感知 */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-slate-900 drop-shadow-sm">
            {t.home.hero_title_1 || "Stop Overpaying for"} <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0078D4] via-[#7048E8] to-[#0078D4] bg-[length:200%_auto] animate-gradient">
              {t.home.hero_title_2 || "Microsoft 365 & Copilot"}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium mb-8">
            {t.home.hero_desc || "Join our secure platform to get 1TB OneDrive, premium Office apps, and AI-powered Copilot for just €1.65/mo. Start your 7-day free trial today—no upfront commitment."}
          </p>
          
          <div className="w-full max-w-4xl mx-auto relative mt-12 flex flex-col items-center">
            
            {trialStatus === 'success' ? (
              <div className="w-full max-w-xl bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-[2rem] p-8 animate-in zoom-in duration-300 shadow-xl shadow-green-100/50">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-green-800 font-extrabold text-2xl mb-2">Request Received!</h3>
                <p className="text-green-700/80 font-medium">
                  We are preparing your Family Group invitation.<br/>
                  Please check your inbox (and spam folder) for <b>{emailInput}</b> within the next 24 hours.
                </p>
              </div>
            ) : formMode === 'contact' ? (
              <div className="w-full max-w-2xl animate-in flip-in-y duration-500">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#7048E8] to-[#0078D4] rounded-[2.5rem] opacity-30 blur-lg transition duration-500 pointer-events-none"></div>
                <div className="relative bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-5 shadow-2xl shadow-blue-100/50 border border-slate-100 z-10 flex flex-col gap-4 text-left">
                  
                  <div className="flex items-center justify-between px-2 mb-1">
                    <span className="font-extrabold text-slate-800 flex items-center text-base">
                      <div className="bg-blue-100 p-1.5 rounded-full mr-3"><MessageSquare className="w-4 h-4 text-[#0078D4]"/></div>
                      Drop us a line
                    </span>
                    <button onClick={() => { setFormMode('trial'); setContactStatus('idle'); }} className="text-slate-400 hover:text-slate-700 transition-colors bg-slate-50 hover:bg-slate-100 rounded-full p-2">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {contactStatus === 'success' ? (
                    <div className="text-center py-8 animate-in zoom-in">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Check className="w-6 h-6 text-green-600"/>
                      </div>
                      <p className="font-bold text-green-700 text-xl mb-1">Message Sent!</p>
                      <p className="text-sm text-green-600/80">We will reply to your email shortly.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Input 
                        type="email" 
                        placeholder="Your Email (so we can reply)" 
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="bg-slate-50/50 border-slate-200 h-14 rounded-[1rem] focus-visible:ring-[#0078D4] px-4 text-base"
                      />
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Input 
                          placeholder="How can we help?" 
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          className="bg-slate-50/50 border-slate-200 h-14 rounded-[1rem] focus-visible:ring-[#0078D4] px-4 text-base flex-grow"
                          onKeyDown={(e) => e.key === 'Enter' && handleQuickContact()}
                        />
                        <Button 
                          onClick={handleQuickContact} 
                          disabled={contactStatus === 'loading' || !contactMessage}
                          className="rounded-[1rem] w-full sm:w-auto px-8 bg-[#0078D4] hover:bg-[#0060aa] text-white font-bold h-14 transition-all shrink-0 shadow-lg hover:shadow-blue-500/30 text-base"
                        >
                          {contactStatus === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send <Send className="w-4 h-4 ml-2" /></>}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full animate-in fade-in duration-500 flex flex-col items-center">
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full">
                  
                  <div className="relative group w-full max-w-[34rem] shrink-0 h-[76px]">
                    <div className={`absolute -inset-1.5 bg-gradient-to-r from-[#0078D4] to-[#7048E8] rounded-full blur transition duration-500 pointer-events-none ${highlightInput ? 'opacity-60' : 'opacity-20 group-hover:opacity-40'}`}></div>
                    
                    <div className={`relative bg-white/90 backdrop-blur-md rounded-full p-2.5 transition-all duration-500 z-10 flex flex-col sm:flex-row gap-2 h-full ${
                      highlightInput 
                        ? 'ring-4 ring-[#0078D4]/50 border border-[#0078D4] scale-[1.02] shadow-2xl shadow-blue-500/40' 
                        : 'shadow-xl hover:shadow-2xl border border-white'
                    }`}>
                      
                      <div className="relative flex-grow flex items-center bg-slate-50 rounded-full px-5 h-full overflow-hidden border border-slate-100/50">
                        <Mail className={`w-5 h-5 mr-3 shrink-0 transition-colors duration-500 ${highlightInput ? 'text-[#0078D4]' : 'text-slate-400'}`} />
                        <Input 
                          ref={emailInputRef}
                          type="email" 
                          placeholder="Your MS Account Email" 
                          value={emailInput} 
                          onChange={(e) => setEmailInput(e.target.value)} 
                          className="border-0 shadow-none bg-transparent focus-visible:ring-0 text-base p-0 w-full placeholder:text-slate-400" 
                          onKeyDown={(e) => e.key === 'Enter' && handleQuickTrial()}
                          disabled={trialStatus === 'loading'}
                        />
                      </div>

                      <Button 
                        onClick={handleQuickTrial} 
                        disabled={trialStatus === 'loading' || !emailInput}
                        className={`rounded-full px-8 text-white font-bold h-full transition-all whitespace-nowrap w-full sm:w-auto text-base shrink-0 ${
                          highlightInput ? 'bg-[#0078D4] shadow-lg shadow-blue-500/50' : 'bg-slate-900 hover:bg-[#0078D4] shadow-md hover:shadow-blue-500/30'
                        }`}
                      >
                        {trialStatus === 'loading' ? (
                          <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                        ) : (
                          <>Get Free Trial <ArrowRight className="w-4 h-4 ml-2" /></>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="relative group w-full md:w-auto shrink-0 h-[76px]">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-[#7048E8] to-[#0078D4] rounded-full opacity-20 group-hover:opacity-45 blur transition duration-500 pointer-events-none"></div>
                    <Button 
                      onClick={() => setFormMode('contact')}
                      variant="ghost"
                      className="relative h-full px-6 pr-8 bg-white/80 backdrop-blur-md rounded-full border border-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3.5 z-10 shrink-0 group w-full hover:-translate-y-0.5"
                    >
                      <div className="bg-gradient-to-tr from-[#7048E8] to-[#0078D4] w-10 h-10 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(112,72,232,0.4)] group-hover:scale-110 transition-transform duration-300 shrink-0">
                         <MessageSquare className="w-5 h-5" />
                      </div>
                      <span className="font-extrabold text-[15px] whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900 group-hover:from-[#7048E8] group-hover:to-[#0078D4] transition-colors duration-300">
                        Questions?
                      </span>
                    </Button>
                  </div>

                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8 text-sm font-medium text-slate-500 max-w-3xl mx-auto">
                   <span className="flex items-center"><Check className="w-4 h-4 mr-1.5 text-green-500"/> No credit card required</span>
                   <span className="flex items-center"><Check className="w-4 h-4 mr-1.5 text-green-500"/> No registration</span>
                   <span className="flex items-center"><Check className="w-4 h-4 mr-1.5 text-green-500"/> Instant access</span>
                   <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1.5 text-[#0078D4]"/> Try first, pay later</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <section id="apps" className="py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.home.section_apps_title || "Everything you need to create and collaborate"}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.home.section_apps_desc || "Unlock the full potential of Microsoft 365, beautifully integrated and secure."}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {APPS_DATA.map((app: any) => (<AppCard key={app.id} item={app} />))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 relative bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-xl md:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#0078D4] via-[#7048E8] to-[#D13438] animate-gradient bg-[length:200%_auto]">
              {t.home.pricing_promo || "Special Offer: Upgrade Today"}
            </h3>
            <h2 className="text-xl font-semibold text-slate-600 mb-4">{t.home.pricing_title || "Choose the plan that's right for you"}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* 1. Monthly */}
            <div className="group relative bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-[#0078D4] to-[#2b88d8] text-white py-1.5 text-center text-xs font-bold uppercase tracking-widest">{t.plans.flexible || "FLEXIBLE"}</div>
              <div className="p-8 pt-12 flex flex-col h-full"> 
                <h3 className="text-lg font-medium text-slate-500 mb-4">{t.plans.monthly || "Monthly Plan"}</h3>
                <div className="flex items-baseline mb-6"><span className="text-4xl font-bold text-slate-900">€2.50</span><span className="text-slate-400 ml-2 font-medium">/ month</span></div>
                <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg mb-8 border border-green-100 w-fit">{t.plans.trial_7d || "7-Day Free Trial"}</div>
                <ul className="space-y-4 mb-8 text-sm flex-grow">
                  <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.copilot || "Includes Copilot & All Apps"}</li>
                  <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.storage || "1TB OneDrive Storage"}</li>
                  <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.devices || "Connect 5 Devices"}</li>
                  <li className="flex gap-3 text-[#0078D4] font-extrabold items-center"><Check className="w-4 h-4 shrink-0 stroke-[3]"/> {t.plans.pay_after || "Pay after trial, cancel anytime"}</li>
                </ul>
                <Button onClick={() => handleNav(user ? "/dashboard?plan=monthly" : "/login?plan=monthly")} className="w-full h-12 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0060aa] hover:from-[#0060aa] hover:to-[#005090] text-white font-bold text-base shadow-md transition-all mt-auto">{t.plans.start_trial || "Start Free Trial"}</Button>
              </div>
            </div>

            {/* 2. Semi-Annual */}
            <div className="group relative bg-white rounded-3xl border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
               <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white py-1.5 text-center text-xs font-bold uppercase tracking-widest">{t.plans.most_popular || "MOST POPULAR"}</div>
              <div className="p-8 pt-12 flex flex-col h-full">
                <h3 className="text-lg font-bold text-slate-700 mb-4">{t.plans.semi || "Semi-Annual Plan"}</h3>
                <div className="flex items-baseline mb-1"><span className="text-4xl font-bold text-slate-900">€12.90</span><span className="text-slate-400 ml-2 font-medium">/ 6 months</span></div>
                <p className="text-sm font-medium text-green-600 mb-6">≈ €2.15 / month</p>
                <div className="flex gap-2 mb-8 flex-wrap">
                   <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-100 w-fit">{t.plans.trial_7d || "7-Day Free Trial"}</div>
                   <div className="inline-block bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 w-fit">Save 14%</div>
                </div>
                <ul className="space-y-4 mb-8 text-sm flex-grow">
                  <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.copilot || "Includes Copilot & All Apps"}</li>
                  <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.storage || "1TB OneDrive Storage"}</li>
                  <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.devices || "Connect 5 Devices"}</li>
                </ul>
                <Button onClick={() => handleNav(user ? "/dashboard?plan=semi" : "/login?plan=semi")} className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold rounded-xl h-12 shadow-lg hover:shadow-xl transition-all text-base mt-auto">{t.plans.choose_semi || "Choose 6-Months"}</Button>
              </div>
            </div>

            {/* 3. Yearly (BEST VALUE) */}
            <div className="relative group md:-translate-y-4 h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-[24px] blur opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none group-hover:scale-105"></div>
              <div className="relative bg-white rounded-[22px] shadow-2xl h-full flex flex-col border border-purple-100 transform transition-transform duration-300 group-hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 text-center text-xs font-bold uppercase tracking-widest">{t.plans.best_value || "BEST VALUE"}</div>
                <div className="p-8 pt-12 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">{t.plans.yearly || "Annual Pro"}</h3>
                  <div className="flex items-baseline mb-1"><span className="text-5xl font-extrabold text-slate-900">€19.90</span><span className="text-slate-400 ml-2 font-medium">/ year</span></div>
                  <p className="text-sm font-bold text-pink-600 mb-6">≈ €1.65 / month</p>
                  
                  <div className="flex gap-2 mb-8 flex-wrap items-center">
                     <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-100 w-fit">{t.plans.trial_7d || "7-Day Free Trial"}</div>
                     <div className="inline-block bg-pink-50 text-pink-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-pink-100 w-fit">Save 33%</div>
                     <span className="text-sm font-bold text-pink-600 ml-1">(Get 4 months free! 🎉)</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 text-sm font-medium flex-grow">
                    <li className="flex gap-3 items-center"><Sparkles className="w-5 h-5 text-purple-500 shrink-0"/> {t.features.copilot || "Includes Copilot & All Apps"}</li>
                    <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> {t.features.storage || "1TB OneDrive Storage"}</li>
                    <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> {t.features.devices || "Connect 5 Devices"}</li>
                  </ul>
                  <div className="mt-auto">
                    <Button onClick={() => handleNav(user ? "/dashboard?plan=yearly" : "/login?plan=yearly")} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold rounded-xl h-14 shadow-lg shadow-purple-200 text-lg transition-transform active:scale-95">{t.plans.sub_yearly || "Subscribe Yearly"}</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section id="faq" className="py-24 relative bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.faq?.title || "Frequently Asked Questions"}</h2>
              <p className="text-lg text-slate-500">{t.faq?.desc || "Everything you need to know about our service."}</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                      isOpen ? 'border-blue-200 bg-blue-50/30 shadow-md shadow-blue-100/50' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                    >
                      <span className={`font-semibold pr-8 text-base md:text-lg transition-colors ${isOpen ? 'text-blue-700' : 'text-slate-800'}`}>
                        {faq.q}
                      </span>
                      <div className={`shrink-0 p-2 rounded-full transition-colors ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    
                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-slate-600 leading-relaxed whitespace-pre-line">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center p-8 bg-slate-50 rounded-3xl border border-slate-100">
               <h3 className="font-bold text-slate-900 mb-2">Still have questions?</h3>
               <p className="text-slate-500 mb-6 text-sm">Our support team is ready to help you 24/7.</p>
               <Button onClick={() => {
                 window.scrollTo({top: 0, behavior: 'smooth'});
                 setTimeout(() => setFormMode('contact'), 500); 
               }} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8">
                 Contact Support
               </Button>
            </div>

          </div>
        </section>
      )}
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen relative font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden bg-[#fafafa]" suppressHydrationWarning>
      <div className="fixed top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/80 to-transparent -z-10 pointer-events-none"></div>
      <HomeContent />
    </div>
  );
}