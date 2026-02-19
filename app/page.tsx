"use client";

import React, { useState, useEffect } from "react";
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
import { Check, ArrowRight, User, LogOut, LayoutDashboard, Sparkles, Plus, Minus } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link"; 

// 引入全新的多语言组件和 Provider
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { LanguageProvider, useLanguage } from "@/app/components/LanguageProvider";

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

// Social Media Icons (SVG)
const XIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);
const TikTokIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.03 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.35-1.17 1.09-1.07 1.73.07.45.27.9.55 1.15.5.41 1.13.56 1.75.52 1.25.1 2.56-.63 3.09-1.78.27-.58.33-1.25.32-1.88.02-5.5.01-11 .01-16.51z"/></svg>);
const WhatsAppIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>);
const TelegramIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>);
const YouTubeIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>);
const LinkedInIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);

// --- 应用数据 ---
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

// --- 首页内部组件 (连接全局状态) ---
function HomeContent() {
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [emailInput, setEmailInput] = useState("");
  // 控制 FAQ 展开状态的 state，默认展开第一个 (index 0)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  const router = useRouter(); 
  const supabase = createClient();

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

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push(`/login?email=${encodeURIComponent(emailInput)}`);
    }
  };

  // 根据当前语言动态生成 FAQ 数组，带有回退保护
  const faqs = t.faq ? [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
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
            
            {/* 高颜值胶囊状 LanguageSwitcher */}
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
                <Button onClick={() => router.push("/login")} className="bg-[#0078D4] text-white hover:bg-[#0060aa] rounded-full px-6 h-10 text-sm font-semibold shadow-md shadow-blue-200 transition-all hover:scale-105">
                  {t.plans.start_trial}
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="relative pt-24 pb-20 px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-slate-900 drop-shadow-sm">
            {t.home.hero_title_1}<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0078D4] via-[#7048E8] to-[#0078D4] bg-[length:200%_auto] animate-gradient">
              {t.home.hero_title_2}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            {t.home.hero_desc}
          </p>
          <div className="max-w-md mx-auto relative group mt-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500 pointer-events-none"></div>
            <div className="relative flex bg-white rounded-full p-2 shadow-xl shadow-blue-100 group-hover:shadow-2xl transition-all border border-slate-100 items-center z-10">
              {/* 🔥 修复此行，将 t.home.email_placeholder 改为 t.common.email_placeholder */}
              <Input type="email" placeholder={t.common.email_placeholder} value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="border-0 shadow-none bg-transparent focus-visible:ring-0 text-base pl-4 h-10" onKeyDown={(e) => e.key === 'Enter' && handleGetStarted()}/>
              <Button onClick={handleGetStarted} className="rounded-full px-6 bg-[#0078D4] hover:bg-[#0060aa] text-white font-medium h-10 transition-all whitespace-nowrap">
                {t.home.cta_start} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-4">
               <span className="flex items-center"><Check className="w-3 h-3 mr-1 text-green-500"/> {t.home.hero_badge_1}</span>
               <span className="flex items-center"><Check className="w-3 h-3 mr-1 text-green-500"/> {t.home.hero_badge_2}</span>
            </p>
          </div>
        </div>
      </section>

      <section id="apps" className="py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.home.section_apps_title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.home.section_apps_desc}</p>
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
              {t.home.pricing_promo}
            </h3>
            <h2 className="text-xl font-semibold text-slate-600 mb-4">{t.home.pricing_title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* 1. Monthly */}
            <div className="group relative bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-[#0078D4] to-[#2b88d8] text-white py-1.5 text-center text-xs font-bold uppercase tracking-widest">{t.plans.flexible}</div>
              <div className="p-8 pt-12 flex flex-col h-full"> 
                <h3 className="text-lg font-medium text-slate-500 mb-4">{t.plans.monthly}</h3>
                <div className="flex items-baseline mb-6"><span className="text-4xl font-bold text-slate-900">€3.59</span><span className="text-slate-400 ml-1">{t.plans.mo}</span></div>
                <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg mb-8 border border-green-100 w-fit">{t.plans.trial_7d}</div>
                <ul className="space-y-4 mb-8 text-sm flex-grow">
                  <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.copilot}</li>
                  <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.storage}</li>
                  <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.platform}</li>
                  <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.devices}</li>
                  <li className="flex gap-3 text-[#0078D4] font-extrabold items-center"><Check className="w-4 h-4 shrink-0 stroke-[3]"/> {t.plans.pay_after}</li>
                </ul>
                <Button onClick={() => handleNav(user ? "/dashboard?plan=monthly" : "/login?plan=monthly")} className="w-full h-12 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0060aa] hover:from-[#0060aa] hover:to-[#005090] text-white font-bold text-base shadow-md transition-all mt-auto">{t.plans.start_trial}</Button>
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
                   <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-100 w-fit">{t.plans.trial_7d}</div>
                   <div className="inline-block bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 w-fit">{t.plans.save_25}</div>
                </div>
                <ul className="space-y-4 mb-8 text-sm flex-grow">
                  <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.copilot}</li>
                  <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.storage}</li>
                  <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.platform}</li>
                  <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.features.devices}</li>
                  <li className="flex gap-3 text-slate-900 font-bold items-center"><Check className="w-4 h-4 text-green-500 shrink-0"/> {t.plans.save_25_vs}</li>
                </ul>
                <Button onClick={() => handleNav(user ? "/dashboard?plan=semi" : "/login?plan=semi")} className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold rounded-xl h-12 shadow-lg hover:shadow-xl transition-all text-base mt-auto">{t.plans.choose_semi}</Button>
              </div>
            </div>

            {/* 3. Yearly */}
            <div className="relative group md:-translate-y-4 h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-[24px] blur opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none group-hover:scale-105"></div>
              <div className="relative bg-white rounded-[22px] shadow-2xl h-full flex flex-col border border-purple-100 transform transition-transform duration-300 group-hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold py-2 uppercase tracking-widest text-center">{t.plans.best_value}</div>
                <div className="p-8 pt-12 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">{t.plans.annual}</h3>
                  <div className="flex items-baseline mb-1"><span className="text-5xl font-extrabold text-slate-900">€29.90</span><span className="text-slate-400 ml-1">{t.plans.yr}</span></div>
                  <p className="text-sm font-bold text-pink-600 mb-6">{t.plans.only_mo}</p>
                  <div className="flex gap-2 mb-8 flex-wrap">
                     <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-100 w-fit">{t.plans.trial_7d}</div>
                     <div className="inline-block bg-pink-50 text-pink-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-pink-100 w-fit">{t.plans.save_37}</div>
                  </div>
                  <ul className="space-y-4 mb-8 text-sm font-medium flex-grow">
                    <li className="flex gap-3 items-center"><Sparkles className="w-5 h-5 text-purple-500 shrink-0"/> {t.features.copilot}</li>
                    <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> {t.features.storage}</li>
                    <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> {t.features.platform}</li>
                    <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> {t.features.devices}</li>
                    <li className="flex gap-3 p-3 bg-pink-50/50 rounded-xl border border-pink-100 font-bold text-slate-900 items-center"><Check className="w-5 h-5 text-red-500 shrink-0"/> {t.plans.save_37_vs}</li>
                  </ul>
                  <div className="mt-auto">
                    <Button onClick={() => handleNav(user ? "/dashboard?plan=yearly" : "/login?plan=yearly")} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold rounded-xl h-14 shadow-lg shadow-purple-200 text-lg transition-transform active:scale-95">{t.plans.sub_yearly}</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 新增：高颜值 FAQ 模块 */}
      {faqs.length > 0 && (
        <section id="faq" className="py-24 relative bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.faq?.title}</h2>
              <p className="text-lg text-slate-500">{t.faq?.desc}</p>
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
                    
                    {/* CSS Grid 技巧实现丝滑折叠动画 */}
                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-slate-600 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 底部促转化文案 */}
            <div className="mt-12 text-center p-8 bg-slate-50 rounded-3xl border border-slate-100">
               <h3 className="font-bold text-slate-900 mb-2">Still have questions?</h3>
               <p className="text-slate-500 mb-6 text-sm">Our support team is ready to help you 24/7.</p>
               <Button onClick={() => handleNav("/login")} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8">
                 {t.home.cta_start}
               </Button>
            </div>
          </div>
        </section>
      )}

      {/* --- Footer --- */}
      <footer className="bg-slate-50 pt-16 pb-8 text-xs text-slate-500 border-t border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
             <span className="font-bold text-slate-700 text-sm">Follow 365ShareHub</span>
             <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-blue-600 transition"><XIcon className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-blue-600 transition"><LinkedInIcon className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-red-600 transition"><YouTubeIcon className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-pink-600 transition"><TikTokIcon className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-green-600 transition"><WhatsAppIcon className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-blue-500 transition"><TelegramIcon className="w-5 h-5" /></a>
             </div>
          </div>

          <div className="w-full h-px bg-slate-200 mb-8"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-medium">
               <div className="flex items-center gap-2 cursor-pointer hover:text-slate-800 transition-colors">
                  <LanguageSwitcher />
               </div>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">Sitemap</Link>
            </div>
            <div>{t.home.footer_copy}</div>
          </div>
        </div>
      </footer>
    </>
  );
}

// --- 最终导出 (使用 Provider 包裹) ---
export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen relative font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden bg-[#fafafa]" suppressHydrationWarning>
        <div className="fixed top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/80 to-transparent -z-10 pointer-events-none"></div>
        <HomeContent />
      </div>
    </LanguageProvider>
  );
}