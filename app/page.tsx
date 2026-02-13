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

// --- 1. Official Microsoft App Icons (SVG data) ---
const WordIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}><path fill="#185abd" d="M4 6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"/><path fill="#fff" d="M19.85 22.75l-2.58-8.86L15.35 20h-.09l-1.88-6.13L10.76 22.75H8.5L12.3 11h2.33l2 6.56 2.05-6.56h2.3l3.84 11.75h-2.35zM7 11h3v2H7zM7 15h3v2H7zM7 19h3v2H7z"/></svg>
);
const ExcelIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}><path fill="#107c41" d="M4 6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"/><path fill="#fff" d="M19.56 22.75L15.3 16 19.37 9h-2.7l-2.66 4.93L11.24 9H8.64l3.86 6.8-4 6.95h2.65L13.8 17.5l2.9 5.25h2.86z"/></svg>
);
const PowerPointIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}><path fill="#c43e1c" d="M4 6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"/><path fill="#fff" d="M9.5 11h5.2c2.53 0 4.1 1.42 4.1 3.78 0 2.32-1.5 3.72-4 3.72H12v4.25H9.5V11zm2.5 1.85v3.8h2.5c1.1 0 1.85-.58 1.85-1.9 0-1.35-.75-1.9-1.9-1.9H12z"/></svg>
);
const OutlookIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}><path fill="#0078d4" d="M4 6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"/><path fill="#fff" d="M16 19.2L25 13v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9l9 6.2zm9-8.7v1.22l-9 6.17L7 11.72V10.5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1z"/></svg>
);
const OneDriveIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}><path fill="#0078d4" d="M19.2 10.4c-.2 0-.4.03-.6.06A5.6 5.6 0 0 0 12.5 9c-2.6 0-4.8 1.8-5.4 4.2a4.8 4.8 0 0 0 .3 9.6h16.8a4.8 4.8 0 0 0 1.2-9.4c-1.2-1.8-3.4-3-5.6-3h-.6zM24 21H7.4a3.2 3.2 0 0 1-1.4-6.1 2.8 2.8 0 0 1 1.2-.3 3.2 3.2 0 0 1 3.2 2.8l.3 1.6h1.7l.2-1.7a3.9 3.9 0 0 1 3.8-3.5c.4 0 .7.03 1 .12a3.1 3.1 0 0 1 2.2 2.9l.2 1.6h1.6l.2-1.6a3.1 3.1 0 0 1 3.2-2.8 3.2 3.2 0 0 1 3.1 3.2A3.2 3.2 0 0 1 24 21z"/></svg>
);
const TeamsIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}><path fill="#6264a7" d="M4 6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"/><path fill="#fff" d="M19.5 11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm1.8 10.5v.5a2 2 0 0 1-2 2h-4.6a2 2 0 0 1-2-2v-.5c0-1.8 1.6-3 4.3-3s4.3 1.2 4.3 3zm4.2-4a2 2 0 1 1-4 0 2.2 2.2 0 0 1 4 0zm1.5 4.5v.5a2 2 0 0 1-2 2h-1v-2.5c0-1.5-1-2.4-2.4-2.8.5-.1 1-.2 1.5-.2 2.2 0 3.9 1.3 3.9 3zM9 17.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm1.5 4.5v.5a2 2 0 0 1-2 2H7.4A2 2 0 0 1 5 22.5V22c0-1.7 1.7-3 3.9-3 .5 0 1 .1 1.5.2-1.4.4-2.4 1.3-2.4 2.8h1z"/></svg>
);
const OneNoteIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}><path fill="#7719aa" d="M4 6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"/><path fill="#fff" d="M11 10h2v12h-2V10zm3.5 0H17l4 6.3V10h2v12h-2.5l-4-6.3V22h-2V10z"/></svg>
);
const DefenderIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}><path fill="#005a9e" d="M16 3L4 8v9c0 6.5 5.1 12.4 12 14 6.9-1.6 12-7.5 12-14V8L16 3zm0 25.8C10.3 27.3 6 22.2 6 17V9.4L16 5.2l10 4.2V17c0 5.2-4.3 10.3-10 11.8z"/><path fill="#fff" d="M15 11h2v7h-2zm0 9h2v2h-2z"/></svg>
);
const DesignerIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}><path fill="#c82168" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 26a12 12 0 1 1 12-12 12 12 0 0 1-12 12z"/><path fill="#fff" d="M20.3 11.7a3 3 0 0 0-4.6 0l-6.4 8.5a.5.5 0 0 0 .4.8h12.8a.5.5 0 0 0 .4-.8zM16 13l4.5 6h-9z"/><circle fill="#fff" cx="12" cy="9.5" r="1.5"/></svg>
);
const CopilotIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
    <defs>
      <linearGradient id="copilot-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#F35E99"}} />
        <stop offset="50%" style={{stopColor:"#A451F5"}} />
        <stop offset="100%" style={{stopColor:"#3362E3"}} />
      </linearGradient>
    </defs>
    <path fill="url(#copilot-gradient)" d="M25.6 8a3.6 3.6 0 1 0-7.2 0 3.6 3.6 0 0 0 7.2 0zm-2.4 7.2a3.6 3.6 0 1 0-7.2 0 3.6 3.6 0 0 0 7.2 0zm-8.4 0a3.6 3.6 0 1 0-7.2 0 3.6 3.6 0 0 0 7.2 0zm-2.4 7.2a3.6 3.6 0 1 0-7.2 0 3.6 3.6 0 0 0 7.2 0z"/>
    <path fill="url(#copilot-gradient)" d="M16 30a14 14 0 0 1-14-14c0-4.7 2.3-8.9 5.8-11.5.6-.4 1.4-.1 1.5.7l.3 3.3a1.3 1.3 0 0 0 2 1l3.2-1.6a1.3 1.3 0 0 1 1.9 1.2v3.5a1.3 1.3 0 0 0 1.3 1.3h3.5a1.3 1.3 0 0 1 1.2 1.9l-1.6 3.2a1.3 1.3 0 0 0 1 2l3.3.3c.7.1 1 .9.7 1.5C24.9 27.7 20.7 30 16 30z" opacity="0.2"/>
  </svg>
);


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
    plan_monthly_desc: "Try first, pay later. Cancel anytime.",
    plan_semi_badge: "POPULAR",
    plan_yearly_badge: "BEST VALUE",

    // Apps
    app_word: "Word", app_word_desc: "Elevate your writing.",
    app_excel: "Excel", app_excel_desc: "Turn data into insights.",
    app_ppt: "PowerPoint", app_ppt_desc: "Create impactful slides.",
    app_outlook: "Outlook", app_outlook_desc: "Email and calendar together.",
    app_onedrive: "OneDrive", app_onedrive_desc: "Save and share files safely.",
    app_teams: "Teams", app_teams_desc: "Meet, chat, call, and collab.",
    app_onenote: "OneNote", app_onenote_desc: "Your digital notebook.",
    app_defender: "Defender", app_defender_desc: "Protect data and devices.",
    app_designer: "Designer", app_designer_desc: "Create stunning graphics.",
    app_copilot: "Copilot", app_copilot_desc: "Your everyday AI companion.",
  },
  // ... (Other languages omitted for brevity, will fallback to EN) ...
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
    plan_monthly_desc: "Erst testen, später zahlen. Jederzeit kündbar.",
    plan_semi_badge: "BELIEBT",
    plan_yearly_badge: "BESTER WERT",
    app_word: "Word", app_word_desc: "Verbessern Sie Ihr Schreiben.",
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
    plan_monthly_desc: "先试用，后付费。随时取消。",
    plan_semi_badge: "热门",
    plan_yearly_badge: "超值",
    app_word: "Word", app_word_desc: "提升您的写作水平。",
  }
};

// --- 3. Component: App Card (Official Links & New Icons) ---
const AppCard = ({ icon: Icon, title, desc, link }: any) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-fluent-hover transition-all cursor-pointer group hover:-translate-y-1 duration-300 h-full flex flex-col">
      <div className="mb-5">
        <Icon className="w-12 h-12" />
      </div>
      <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed flex-grow">{desc}</p>
      <div className="mt-4 flex items-center text-blue-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
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

      {/* --- 10 Apps Grid (Official Icons & Links) --- */}
      <section id="apps" className="py-24 px-6 bg-white/40 border-y border-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.section_apps_title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t.section_apps_desc}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            <AppCard icon={CopilotIcon} title={t.app_copilot} desc={t.app_copilot_desc} link="https://www.microsoft.com/microsoft-365/copilot" />
            <AppCard icon={WordIcon} title={t.app_word} desc={t.app_word_desc} link="https://www.microsoft.com/microsoft-365/word" />
            <AppCard icon={ExcelIcon} title={t.app_excel} desc={t.app_excel_desc} link="https://www.microsoft.com/microsoft-365/excel" />
            <AppCard icon={PowerPointIcon} title={t.app_ppt} desc={t.app_ppt_desc} link="https://www.microsoft.com/microsoft-365/powerpoint" />
            <AppCard icon={OutlookIcon} title={t.app_outlook} desc={t.app_outlook_desc} link="https://www.microsoft.com/microsoft-365/outlook/email-and-calendar-services-microsoft-outlook" />
            
            <AppCard icon={OneDriveIcon} title={t.app_onedrive} desc={t.app_onedrive_desc} link="https://www.microsoft.com/microsoft-365/onedrive/online-cloud-storage" />
            <AppCard icon={TeamsIcon} title={t.app_teams} desc={t.app_teams_desc} link="https://www.microsoft.com/microsoft-teams/group-chat-software" />
            <AppCard icon={OneNoteIcon} title={t.app_onenote} desc={t.app_onenote_desc} link="https://www.microsoft.com/microsoft-365/onenote/digital-note-taking-app" />
            <AppCard icon={DefenderIcon} title={t.app_defender} desc={t.app_defender_desc} link="https://www.microsoft.com/microsoft-365/microsoft-defender-for-individuals" />
            <AppCard icon={DesignerIcon} title={t.app_designer} desc={t.app_designer_desc} link="https://designer.microsoft.com/" />
          </div>
        </div>
      </section>

      {/* --- Pricing Section (Redesigned Strategies) --- */}
      <section id="pricing" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.pricing_title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            
            {/* 1. Monthly (Flexible, €3.59) */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all bg-white/80 backdrop-blur rounded-3xl overflow-hidden mt-4 ring-1 ring-slate-100 relative">
              <div className="absolute top-4 right-4">
                <div className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase">{t.plan_monthly_badge}</div>
              </div>
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6 pt-8">
                <CardTitle className="text-lg font-medium text-slate-500">Flex Monthly</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold text-slate-900">€3.59</span>
                  <span className="text-slate-400 ml-1">/mo</span>
                </div>
                <p className="text-xs font-medium text-blue-600 mt-2">{t.plan_monthly_desc}</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-500"/> All Premium Apps</li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-500"/> 1TB Cloud Storage</li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-500"/> Cancel anytime</li>
                </ul>
                <Button variant="outline" className="w-full rounded-xl h-11 border-slate-200 hover:bg-slate-50 hover:text-black">Choose Monthly</Button>
              </CardContent>
            </Card>

            {/* 2. Semi-Annual (POPULAR, Blue Border) */}
            <Card className="border-2 border-[#0078D4] shadow-xl transition-all bg-white rounded-3xl relative overflow-hidden z-10 scale-105">
               <div className="absolute top-0 right-0 bg-[#0078D4] text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase">
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

            {/* 3. Yearly (BEST VALUE, Banner Style) */}
            <Card className="border-0 shadow-fluent hover:shadow-fluent-hover transition-all bg-white rounded-3xl overflow-hidden mt-4 ring-1 ring-slate-100">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold text-center py-1.5 uppercase">
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