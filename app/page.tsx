"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuLabel, 
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { 
  Check, ArrowRight, ShieldCheck, Globe, ChevronDown
} from "lucide-react";

// --- 0. Logo & Social Icons ---
const ModernLogo = () => (
  <div className="w-9 h-9 relative flex items-center justify-center rounded-[10px] overflow-hidden shadow-sm shrink-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0078D4] to-[#26A4F5]"></div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white relative z-10">
        <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 000 5.304l4.5 4.5a3.75 3.75 0 005.304-5.304l-4.5-4.5a3.75 3.75 0 00-5.304 0zm-3.75 1.5a1.5 1.5 0 012.122 2.122l-4.5 4.5a1.5 1.5 0 01-2.122-2.122l4.5-4.5z" clipRule="evenodd" />
        <path d="M4.098 4.098a3.75 3.75 0 015.304 0l4.5 4.5a3.75 3.75 0 010 5.304l-4.5 4.5a3.75 3.75 0 01-5.304-5.304l4.5-4.5a3.75 3.75 0 010-5.304zm1.5 3.75a1.5 1.5 0 002.122 2.122l4.5-4.5a1.5 1.5 0 00-2.122-2.122l-4.5 4.5z" />
      </svg>
  </div>
);

const XIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);
const TikTokIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.03 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.35-1.17 1.09-1.07 1.73.07.45.27.9.55 1.15.5.41 1.13.56 1.75.52 1.25.1 2.56-.63 3.09-1.78.27-.58.33-1.25.32-1.88.02-5.5.01-11 .01-16.51z"/></svg>);
const WhatsAppIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>);
const TelegramIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>);
const YouTubeIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>);
const LinkedInIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);

// --- 1. CONFIG: Official Microsoft App Icons (Via CDN) ---
// 这次我们直接使用微软官方 CDN 或 维基百科的高清 SVG 链接，保证100%还原度。
const APPS_DATA = [
  {
    id: "copilot",
    title: "Copilot",
    desc: "Your everyday AI companion.",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Microsoft_365_Copilot_Icon.svg",
    link: "https://www.microsoft.com/microsoft-365/copilot"
  },
  {
    id: "word",
    title: "Word",
    desc: "Elevate your writing.",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg",
    link: "https://www.microsoft.com/microsoft-365/word"
  },
  {
    id: "excel",
    title: "Excel",
    desc: "Turn data into insights.",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg",
    link: "https://www.microsoft.com/microsoft-365/excel"
  },
  {
    id: "ppt",
    title: "PowerPoint",
    desc: "Create impactful slides.",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Microsoft_Office_PowerPoint_%282019%E2%80%93present%29.svg",
    link: "https://www.microsoft.com/microsoft-365/powerpoint"
  },
  {
    id: "outlook",
    title: "Outlook",
    desc: "Email and calendar together.",
    img: "https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282019%E2%80%93present%29.svg",
    link: "https://www.microsoft.com/microsoft-365/outlook/email-and-calendar-services-microsoft-outlook"
  },
  {
    id: "onedrive",
    title: "OneDrive",
    desc: "Save and share files safely.",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Microsoft_Office_OneDrive_%282019%E2%80%93present%29.svg",
    link: "https://www.microsoft.com/microsoft-365/onedrive/online-cloud-storage"
  },
  {
    id: "teams",
    title: "Teams",
    desc: "Meet, chat, call, and collab.",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282019%E2%80%93present%29.svg",
    link: "https://www.microsoft.com/microsoft-teams/group-chat-software"
  },
  {
    id: "onenote",
    title: "OneNote",
    desc: "Your digital notebook.",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Microsoft_Office_OneNote_%282019%E2%80%93present%29.svg",
    link: "https://www.microsoft.com/microsoft-365/onenote/digital-note-taking-app"
  },
  {
    id: "defender",
    title: "Defender",
    desc: "Protect data and devices.",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/43/Microsoft_Defender.svg",
    link: "https://www.microsoft.com/microsoft-365/microsoft-defender-for-individuals"
  },
  {
    id: "designer",
    title: "Designer",
    desc: "Create stunning graphics.",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Microsoft_Designer_logo_icon.svg", // Replaced with a reliable link logic in component if needed, but wikipedia usually works
    link: "https://designer.microsoft.com/"
  }
];


// --- 2. Internationalization ---
const translations: any = {
  en: {
    hero_title_1: "Unlock Microsoft 365",
    hero_title_2: "Copilot Productivity.",
    hero_desc: "Enjoy full Microsoft 365 features at a favorable price. Boost productivity with Copilot alongside you. Get leading apps with built-in AI, advanced security, and spacious 1 TB cloud storage in one plan.",
    email_placeholder: "Enter your email...",
    cta_start: "Get Started",
    section_apps_title: "Everything you need in one plan",
    section_apps_desc: "Get the premium apps, cloud storage, and security you need.",
    pricing_title: "Simple, Transparent Pricing",
    footer_region: "English (Global)",
    footer_copy: "© 2026 365ShareHub Operations. All rights reserved.",
    
    // Pricing Text
    plan_monthly_badge: "FLEXIBLE",
    plan_monthly_sub: "Try first, pay later",
    plan_semi_badge: "POPULAR",
    plan_yearly_badge: "BEST VALUE",
  },
  de: {
    hero_title_1: "Microsoft 365 freischalten",
    hero_title_2: "Copilot Produktivität.",
    hero_desc: "Genießen Sie alle Microsoft 365-Funktionen zu einem günstigen Preis. Steigern Sie Ihre Produktivität mit Copilot an Ihrer Seite. Erhalten Sie führende Apps mit integrierter KI, erweiterter Sicherheit und großzügigem 1 TB Cloud-Speicher in einem Plan.",
    email_placeholder: "E-Mail eingeben...",
    cta_start: "Jetzt starten",
    section_apps_title: "Alles in einem Plan",
    section_apps_desc: "Holen Sie sich Premium-Apps, Cloud-Speicher und Sicherheit.",
    pricing_title: "Einfache Preise",
    footer_region: "Deutsch (Deutschland)",
    footer_copy: "© 2026 365ShareHub Operations. Alle Rechte vorbehalten.",
    plan_monthly_badge: "FLEXIBEL",
    plan_monthly_sub: "Erst testen, später zahlen",
    plan_semi_badge: "BELIEBT",
    plan_yearly_badge: "BESTER WERT",
  },
  zh: {
    hero_title_1: "解锁 Microsoft 365",
    hero_title_2: "Copilot 生产力。",
    hero_desc: "以优惠的价格享受完整的 Microsoft 365 功能。有 Copilot 在您身边，提升您的生产力。在一个计划中获得内置 AI 的领先应用、高级安全性和 1 TB 的超大云存储空间。",
    email_placeholder: "输入您的邮箱...",
    cta_start: "开始试用",
    section_apps_title: "一个计划，满足所有需求",
    section_apps_desc: "获取您需要的高级应用、云存储和安全性。",
    pricing_title: "简单透明的定价",
    footer_region: "中文 (简体)",
    footer_copy: "© 2026 365ShareHub Operations. 保留所有权利。",
    plan_monthly_badge: "灵活",
    plan_monthly_sub: "先试用，后付费",
    plan_semi_badge: "热门",
    plan_yearly_badge: "超值",
  }
};

// --- 3. Component: App Card (Uses <img> for perfect fidelity) ---
const AppCard = ({ item }: any) => (
  <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-fluent-hover transition-all cursor-pointer group hover:-translate-y-1 duration-300 h-full flex flex-col items-center text-center">
      <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
        {/* Use standard img tag for external SVGs to ensure perfect rendering */}
        <img src={item.img} alt={item.title} className="w-14 h-14 object-contain" loading="lazy" />
      </div>
      <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed flex-grow">{item.desc}</p>
      <div className="mt-4 flex items-center text-[#0067b8] text-xs font-semibold group-hover:underline underline-offset-4">
        Learn more <ArrowRight className="w-3 h-3 ml-1" />
      </div>
    </div>
  </a>
);

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = translations[lang] || translations["en"];

  const changeLanguage = (code: string) => {
    const map: any = {
      'us': 'en', 'uk': 'en', 'ca': 'en', 'au': 'en', 'sg': 'en',
      'de': 'de', 'at': 'de', 'ch': 'de',
      'fr': 'fr', 'be': 'fr', 'es': 'es', 'mx': 'es', 'co': 'es', 'cl': 'es', 'ar': 'es',
      'it': 'it', 'jp': 'jp', 'kr': 'kr', 'cn': 'zh', 'tw': 'tw', 'hk': 'tw'
    };
    setLang(map[code] || 'en');
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden bg-[#fafafa]">
      
      <div className="aurora-bg"></div>

      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ModernLogo />
            <span className="font-semibold text-lg tracking-tight hidden md:block text-slate-800">365ShareHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-[#0078D4] transition">Sign in</Link>
            <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-5 h-9 text-sm font-medium shadow-sm transition-all hover:scale-105">
              Free Trial
            </Button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-24 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          <div className="inline-flex items-center gap-2 bg-white/60 border border-white/60 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm mx-auto cursor-default">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-slate-600">Microsoft Frankfurt Data Center · GDPR Compliant</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-slate-900">
            {t.hero_title_1}<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] animate-gradient">
              {t.hero_title_2}
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            {t.hero_desc}
          </p>

          <div className="max-w-md mx-auto relative group mt-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
            <div className="relative flex bg-white rounded-full p-2 shadow-fluent group-hover:shadow-fluent-hover transition-all border border-slate-100">
              <Input 
                type="email" 
                placeholder={t.email_placeholder}
                className="border-0 shadow-none bg-transparent focus-visible:ring-0 text-base pl-4"
              />
              <Button className="rounded-full px-6 bg-[#0078D4] hover:bg-[#0060aa] text-white font-medium shadow-md transition-all whitespace-nowrap">
                {t.cta_start} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-3">No credit card required · 7-day free trial</p>
          </div>
        </div>
      </section>

      {/* --- 10 Apps Grid (REAL OFFICIAL ICONS) --- */}
      <section id="apps" className="py-24 px-6 bg-white/40 border-y border-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.section_apps_title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t.section_apps_desc}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {APPS_DATA.map((app) => (
              <AppCard key={app.id} item={app} />
            ))}
          </div>
        </div>
      </section>

      {/* --- Pricing Section (New Strategy) --- */}
      <section id="pricing" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.pricing_title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            
            {/* 1. Monthly (FLEXIBLE) - €3.59 */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all bg-white/80 backdrop-blur rounded-3xl overflow-hidden mt-4 ring-1 ring-slate-100 relative">
              <div className="absolute top-4 right-4">
                <div className="bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{t.plan_monthly_badge}</div>
              </div>
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6 pt-8">
                <CardTitle className="text-lg font-medium text-slate-500">Flex Monthly</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold text-slate-900">€3.59</span>
                  <span className="text-slate-400 ml-1">/mo</span>
                </div>
                <p className="text-xs font-medium text-slate-500 mt-2 flex items-center gap-1">
                   {t.plan_monthly_sub}
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-slate-400"/> All Premium Apps</li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-slate-400"/> 1TB Cloud Storage</li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-slate-400"/> Cancel anytime</li>
                </ul>
                <Button variant="outline" className="w-full rounded-xl h-11 border-slate-200 hover:bg-slate-50 hover:text-black">Choose Monthly</Button>
              </CardContent>
            </Card>

            {/* 2. Semi-Annual (POPULAR - Blue Border - Center Stage) */}
            <Card className="border-[3px] border-[#0078D4] shadow-2xl transition-all bg-white rounded-3xl relative overflow-hidden z-10 scale-105">
               <div className="absolute top-0 right-0 bg-[#0078D4] text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wide">
                 {t.plan_semi_badge}
               </div>
              <CardHeader className="bg-white border-b border-slate-50 pb-6 pt-10">
                <CardTitle className="text-lg font-bold text-[#0078D4]">Saver 6-Months</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-5xl font-bold text-slate-900">€17.90</span>
                </div>
                <p className="text-sm font-bold text-[#0078D4] mt-2">€2.98 / mo (Save 25%)</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-700 font-medium"><Check className="w-4 h-4 text-blue-600"/> <strong>Includes Monthly Perks</strong></li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-600"/> Locked-in price</li>
                </ul>
                <Button className="w-full bg-[#0078D4] hover:bg-[#0060aa] text-white font-bold rounded-xl h-12 shadow-lg shadow-blue-200">Choose 6-Months</Button>
              </CardContent>
            </Card>

            {/* 3. Yearly (BEST VALUE - Banner Style) */}
            <Card className="border-0 shadow-fluent hover:shadow-fluent-hover transition-all bg-white rounded-3xl overflow-hidden mt-4 ring-1 ring-slate-100">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold text-center py-1.5 uppercase tracking-wide">
                {t.plan_yearly_badge}
              </div>
              <CardHeader className="bg-white pb-6 pt-6">
                <CardTitle className="text-lg font-bold text-slate-800">Pro Yearly</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold text-slate-900">€29.90</span>
                  <span className="text-slate-400 ml-1">/yr</span>
                </div>
                <p className="text-sm font-medium text-green-600 mt-2">€2.49 / mo (Save 37%)</p>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-purple-500"/> <strong>Copilot Priority Access</strong></li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-purple-500"/> VIP Support</li>
                </ul>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl h-11 shadow-lg">Subscribe Yearly</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#f2f2f2] pt-12 pb-8 text-xs text-[#616161]">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-semibold text-slate-700">Follow 365ShareHub</span>
            <div className="flex gap-4">
               <a href="#" className="hover:text-[#0067b8] transition"><XIcon className="w-5 h-5" /></a>
               <a href="#" className="hover:text-[#0067b8] transition"><LinkedInIcon className="w-5 h-5" /></a>
               <a href="#" className="hover:text-[#0067b8] transition"><YouTubeIcon className="w-5 h-5" /></a>
               <a href="#" className="hover:text-[#0067b8] transition"><TikTokIcon className="w-5 h-5" /></a>
               <a href="#" className="hover:text-[#0067b8] transition"><WhatsAppIcon className="w-5 h-5" /></a>
               <a href="#" className="hover:text-[#0067b8] transition"><TelegramIcon className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-slate-300">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:underline text-[#616161]">
                  <Globe className="w-4 h-4" />
                  <span>{t.footer_region}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[800px] max-h-[500px] overflow-y-auto rounded-none bg-white shadow-xl border-slate-200 p-8 grid grid-cols-4 gap-8">
                 <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-slate-900 font-bold mb-3 text-sm">North America</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => changeLanguage("us")} className="cursor-pointer py-1.5 text-xs">English (United States)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("ca")} className="cursor-pointer py-1.5 text-xs">English (Canada)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("mx")} className="cursor-pointer py-1.5 text-xs">Español (México)</DropdownMenuItem>
                 </DropdownMenuGroup>
                 <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-slate-900 font-bold mb-3 text-sm">Europe</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => changeLanguage("uk")} className="cursor-pointer py-1.5 text-xs">English (United Kingdom)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("de")} className="cursor-pointer py-1.5 text-xs">Deutsch (Deutschland)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("fr")} className="cursor-pointer py-1.5 text-xs">Français (France)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("it")} className="cursor-pointer py-1.5 text-xs">Italiano (Italia)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("es")} className="cursor-pointer py-1.5 text-xs">Español (España)</DropdownMenuItem>
                 </DropdownMenuGroup>
                 <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-slate-900 font-bold mb-3 text-sm">Asia Pacific</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => changeLanguage("cn")} className="cursor-pointer py-1.5 text-xs">中文 (中国)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("jp")} className="cursor-pointer py-1.5 text-xs">日本語 (日本)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("kr")} className="cursor-pointer py-1.5 text-xs">한국어 (대한민국)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("sg")} className="cursor-pointer py-1.5 text-xs">English (Singapore)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("tw")} className="cursor-pointer py-1.5 text-xs">繁體中文 (台灣)</DropdownMenuItem>
                 </DropdownMenuGroup>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-slate-900 font-bold mb-3 text-sm">South America</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => changeLanguage("ar")} className="cursor-pointer py-1.5 text-xs">Español (Argentina)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("co")} className="cursor-pointer py-1.5 text-xs">Español (Colombia)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("cl")} className="cursor-pointer py-1.5 text-xs">Español (Chile)</DropdownMenuItem>
                 </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex flex-wrap gap-6">
              <Link href="#" className="hover:underline">Sitemap</Link>
              <Link href="#" className="hover:underline">Privacy</Link>
              <Link href="#" className="hover:underline">Terms of use</Link>
              <span className="font-semibold">{t.footer_copy}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}