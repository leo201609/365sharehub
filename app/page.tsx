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
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import { 
  Check, ArrowRight, ShieldCheck, Globe, ChevronDown, 
  FileText, Table, Presentation, Mail, Cloud, Shield, Bot, 
  Palette, Video, BookOpen, Menu
} from "lucide-react";

// --- 1. SVG 图标组件 (用于社交媒体和特殊Logo) ---
const XIcon = ({className}: {className?: string}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const TikTokIcon = ({className}: {className?: string}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.03 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.35-1.17 1.09-1.07 1.73.07.45.27.9.55 1.15.5.41 1.13.56 1.75.52 1.25.1 2.56-.63 3.09-1.78.27-.58.33-1.25.32-1.88.02-5.5.01-11 .01-16.51z"/></svg>
);
const WhatsAppIcon = ({className}: {className?: string}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
);
const TelegramIcon = ({className}: {className?: string}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
);
const YouTubeIcon = ({className}: {className?: string}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);
const LinkedInIcon = ({className}: {className?: string}) => (
   <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

// --- 2. 翻译字典 (包含应用介绍和营销文案) ---
const translations: any = {
  en: {
    hero_title: "Your productivity, supercharged.",
    hero_subtitle: "Get the leading productivity apps, advanced security, and built-in AI for 1/10 the official price.",
    cta_primary: "Get started",
    cta_secondary: "Try free for 7 days",
    
    apps_title: "Everything you need in one plan",
    apps_subtitle: "Premium apps, 1TB cloud storage, and advanced security on all your devices.",
    
    // Apps
    app_word: "Word", app_word_desc: "Elevate your writing and create beautiful documents.",
    app_excel: "Excel", app_excel_desc: "Turn data into insights and clarify complex information.",
    app_ppt: "PowerPoint", app_ppt_desc: "Transform your inspiration into stunning presentations.",
    app_outlook: "Outlook", app_outlook_desc: "Manage email, calendar, tasks, and contacts in one place.",
    app_onedrive: "OneDrive", app_onedrive_desc: "Save and share your photos and files safely from anywhere.",
    app_teams: "Microsoft Teams", app_teams_desc: "Meet, chat, call, and collaborate in one place.",
    app_onenote: "OneNote", app_onenote_desc: "Organize your notes and ideas in a digital notebook.",
    app_defender: "Microsoft Defender", app_defender_desc: "Protect your personal data and devices with an easy-to-use app.",
    app_designer: "Designer", app_designer_desc: "Create stunning graphics in seconds with AI.",
    app_copilot: "Copilot", app_copilot_desc: "Your everyday AI companion for work and life.",

    pricing_title: "Simple, Transparent Pricing",
    footer_region: "English (US)"
  },
  de: {
    hero_title: "Ihre Produktivität, maximiert.",
    hero_subtitle: "Holen Sie sich die führenden Produktivitäts-Apps, fortschrittliche Sicherheit und integrierte KI für 1/10 des offiziellen Preises.",
    cta_primary: "Jetzt kaufen",
    cta_secondary: "7 Tage kostenlos testen",
    apps_title: "Alles, was Sie brauchen, in einem Plan",
    apps_subtitle: "Premium-Apps, 1 TB Cloud-Speicher und fortschrittliche Sicherheit auf allen Ihren Geräten.",
    app_word: "Word", app_word_desc: "Verbessern Sie Ihren Schreibstil und erstellen Sie schöne Dokumente.",
    app_excel: "Excel", app_excel_desc: "Verwandeln Sie Daten in Erkenntnisse und klären Sie komplexe Informationen.",
    app_ppt: "PowerPoint", app_ppt_desc: "Verwandeln Sie Ihre Inspiration in beeindruckende Präsentationen.",
    app_outlook: "Outlook", app_outlook_desc: "Verwalten Sie E-Mails, Kalender, Aufgaben und Kontakte an einem Ort.",
    app_onedrive: "OneDrive", app_onedrive_desc: "Speichern und teilen Sie Ihre Fotos und Dateien sicher von überall.",
    app_teams: "Microsoft Teams", app_teams_desc: "Besprechungen, Chat, Anrufe und Zusammenarbeit an einem Ort.",
    app_onenote: "OneNote", app_onenote_desc: "Organisieren Sie Ihre Notizen und Ideen in einem digitalen Notizbuch.",
    app_defender: "Microsoft Defender", app_defender_desc: "Schützen Sie Ihre persönlichen Daten und Geräte.",
    app_designer: "Designer", app_designer_desc: "Erstellen Sie atemberaubende Grafiken in Sekunden mit KI.",
    app_copilot: "Copilot", app_copilot_desc: "Ihr täglicher KI-Begleiter für Arbeit und Leben.",
    pricing_title: "Einfache, transparente Preise",
    footer_region: "Deutsch (Deutschland)"
  },
  zh: {
    hero_title: "释放您的生产力，超乎想象。",
    hero_subtitle: "以官方价格的 1/10 获得领先的生产力应用、高级安全性和内置 AI 助手。",
    cta_primary: "立即购买",
    cta_secondary: "免费试用 7 天",
    apps_title: "一个计划，满足所有需求",
    apps_subtitle: "在您的所有设备上获取高级应用、1TB 云存储和高级安全性。",
    app_word: "Word", app_word_desc: "提升您的写作水平，创建精美文档。",
    app_excel: "Excel", app_excel_desc: "将数据转化为见解，理清复杂信息。",
    app_ppt: "PowerPoint", app_ppt_desc: "将您的灵感转化为令人惊叹的演示文稿。",
    app_outlook: "Outlook", app_outlook_desc: "一站式管理电子邮件、日历、任务和联系人。",
    app_onedrive: "OneDrive", app_onedrive_desc: "安全地保存和分享您的照片和文件。",
    app_teams: "Microsoft Teams", app_teams_desc: "在一个地方开会、聊天、通话和协作。",
    app_onenote: "OneNote", app_onenote_desc: "在数字笔记本中整理您的笔记和想法。",
    app_defender: "Microsoft Defender", app_defender_desc: "使用易于使用的应用保护您的个人数据和设备。",
    app_designer: "Designer", app_designer_desc: "利用 AI 在几秒钟内创建令人惊叹的图形。",
    app_copilot: "Copilot", app_copilot_desc: "您工作和生活中的日常 AI 伴侣。",
    pricing_title: "简单透明的定价",
    footer_region: "中文 (中国)"
  }
};

// --- 3. 微软风格应用卡片 ---
const AppCard = ({ icon: Icon, title, desc, colorClass, iconColor }: any) => (
  <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full group bg-white rounded-2xl overflow-hidden ring-1 ring-slate-100">
    <CardContent className="p-6 flex flex-col h-full">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${colorClass}`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <h3 className="font-semibold text-xl text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
        {desc}
      </p>
      <div className="flex items-center text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
        Learn more <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </CardContent>
  </Card>
);

// --- 4. 自定义 Logo 组件 (仿 Microsoft 365 Hexagon) ---
const CustomLogo = () => (
  <div className="relative w-8 h-8 flex items-center justify-center">
    <div className="absolute inset-0 bg-blue-600 rounded-lg transform rotate-45 opacity-20"></div>
    <div className="absolute inset-1 bg-blue-600 rounded-md transform rotate-45"></div>
    <span className="relative text-white font-bold text-sm transform">3</span>
  </div>
);

export default function Home() {
  const [lang, setLang] = useState("en");
  // 简化的 fallback 逻辑
  const t = translations[lang] || translations["en"];

  // 辅助函数：根据语言显示不同区域
  const changeLanguage = (code: string) => {
    // 映射到主要的翻译包
    if (["de", "at", "ch"].includes(code)) setLang("de");
    else if (["cn", "hk", "tw", "sg"].includes(code)) setLang("zh");
    else setLang("en");
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-900 selection:bg-[#c7e0f4] selection:text-blue-900 overflow-x-hidden bg-[#fafafa]">
      
      {/* 顶部极光 */}
      <div className="aurora-bg"></div>

      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/40 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CustomLogo />
            <span className="font-semibold text-lg tracking-tight text-slate-700">365ShareHub</span>
            <div className="hidden md:flex ml-8 space-x-6 text-[15px] font-medium text-slate-600">
              <Link href="#" className="hover:underline decoration-2 underline-offset-4 decoration-blue-600">Products</Link>
              <Link href="#" className="hover:underline decoration-2 underline-offset-4 decoration-blue-600">Plans and pricing</Link>
              <Link href="#" className="hover:underline decoration-2 underline-offset-4 decoration-blue-600">Resources</Link>
              <Link href="#" className="hover:underline decoration-2 underline-offset-4 decoration-blue-600">Support</Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4 mr-2">Sign in</Link>
            <Button className="bg-[#0067b8] hover:bg-[#005da6] text-white rounded-sm px-6 h-9 text-sm font-semibold shadow-sm transition-all">
              {t.cta_primary}
            </Button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section (Microsoft Style) --- */}
      <section className="relative pt-24 pb-20 px-6 text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-slate-900 mb-6">
          {t.hero_title}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
          {t.hero_subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="h-12 px-8 bg-[#0067b8] hover:bg-[#005da6] text-white font-semibold text-base rounded-sm shadow-md transition-all">
            {t.cta_primary}
          </Button>
          <Button variant="outline" className="h-12 px-8 border-slate-300 text-slate-700 hover:bg-white font-semibold text-base rounded-sm bg-white shadow-sm">
            {t.cta_secondary} &rarr;
          </Button>
        </div>
        
        {/* Hero Image / Graphic Placeholder */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent z-10"></div>
          {/* 这里模拟微软的 3D App 漂浮图 */}
          <div className="grid grid-cols-5 gap-4 opacity-80 max-w-3xl mx-auto transform scale-90">
             <div className="aspect-square bg-blue-500/10 rounded-2xl flex items-center justify-center"><FileText className="w-12 h-12 text-blue-600" /></div>
             <div className="aspect-square bg-green-500/10 rounded-2xl flex items-center justify-center mt-8"><Table className="w-12 h-12 text-green-600" /></div>
             <div className="aspect-square bg-orange-500/10 rounded-2xl flex items-center justify-center"><Presentation className="w-12 h-12 text-orange-600" /></div>
             <div className="aspect-square bg-sky-500/10 rounded-2xl flex items-center justify-center mt-8"><Mail className="w-12 h-12 text-sky-600" /></div>
             <div className="aspect-square bg-purple-500/10 rounded-2xl flex items-center justify-center"><Bot className="w-12 h-12 text-purple-600" /></div>
          </div>
        </div>
      </section>

      {/* --- 10 Apps Grid (Microsoft Style) --- */}
      <section id="apps" className="py-24 px-6 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">{t.apps_title}</h2>
            <p className="text-slate-600 text-lg max-w-3xl">{t.apps_subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Row 1 */}
            <AppCard icon={Bot} title={t.app_copilot} desc={t.app_copilot_desc} colorClass="bg-purple-50" iconColor="text-purple-600" />
            <AppCard icon={FileText} title={t.app_word} desc={t.app_word_desc} colorClass="bg-blue-50" iconColor="text-blue-600" />
            <AppCard icon={Table} title={t.app_excel} desc={t.app_excel_desc} colorClass="bg-green-50" iconColor="text-green-600" />
            <AppCard icon={Presentation} title={t.app_ppt} desc={t.app_ppt_desc} colorClass="bg-orange-50" iconColor="text-orange-600" />
            <AppCard icon={Mail} title={t.app_outlook} desc={t.app_outlook_desc} colorClass="bg-sky-50" iconColor="text-sky-600" />
            
            {/* Row 2 */}
            <AppCard icon={Cloud} title={t.app_onedrive} desc={t.app_onedrive_desc} colorClass="bg-blue-50" iconColor="text-blue-500" />
            <AppCard icon={Menu} title={t.app_teams} desc={t.app_teams_desc} colorClass="bg-indigo-50" iconColor="text-indigo-600" />
            <AppCard icon={BookOpen} title={t.app_onenote} desc={t.app_onenote_desc} colorClass="bg-violet-50" iconColor="text-violet-700" />
            <AppCard icon={Shield} title={t.app_defender} desc={t.app_defender_desc} colorClass="bg-slate-100" iconColor="text-slate-700" />
            <AppCard icon={Palette} title={t.app_designer} desc={t.app_designer_desc} colorClass="bg-pink-50" iconColor="text-pink-600" />
          </div>
        </div>
      </section>

      {/* --- Pricing Section (Clean) --- */}
      <section id="pricing" className="py-24 bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 mb-12">{t.pricing_title}</h2>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {/* Monthly */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Monthly</h3>
              <div className="text-4xl font-bold mb-4">€3.99<span className="text-base font-normal text-slate-500">/mo</span></div>
              <p className="text-slate-500 text-sm mb-6 flex-grow">Flexible plan for short-term projects.</p>
              <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">Buy now</Button>
            </div>

             {/* 6-Month */}
             <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-blue-600 flex flex-col scale-105 z-10 relative">
              <div className="absolute top-0 right-0 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1">BEST VALUE</div>
              <h3 className="text-xl font-semibold mb-2">6-Months</h3>
              <div className="text-4xl font-bold mb-4">€17.90<span className="text-base font-normal text-slate-500">/6mo</span></div>
              <p className="text-slate-500 text-sm mb-6 flex-grow">Perfect balance of price and flexibility.</p>
              <Button className="w-full bg-[#0067b8] hover:bg-[#005da6] text-white">Buy now</Button>
            </div>

             {/* Yearly */}
             <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Yearly</h3>
              <div className="text-4xl font-bold mb-4">€29.90<span className="text-base font-normal text-slate-500">/yr</span></div>
              <p className="text-slate-500 text-sm mb-6 flex-grow">Maximum savings for long-term users.</p>
              <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">Buy now</Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer (Microsoft Global Style) --- */}
      <footer className="bg-[#f2f2f2] pt-12 pb-8 text-xs text-[#616161]">
        <div className="max-w-[1600px] mx-auto px-6">
          
          {/* Follow Us Section */}
          <div className="flex items-center gap-4 mb-8">
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            <div>
              <h4 className="font-semibold text-slate-700 mb-3">What's new</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Surface Pro</a></li>
                <li><a href="#" className="hover:underline">Microsoft Copilot</a></li>
                <li><a href="#" className="hover:underline">Microsoft 365</a></li>
              </ul>
            </div>
            {/* ... 其他列省略以保持代码整洁，布局已就绪 ... */}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-slate-300">
            
            {/* 🌍 Global Region Selector (Full Coverage) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:underline text-[#616161]">
                  <Globe className="w-4 h-4" />
                  <span>{t.footer_region}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[600px] max-h-[500px] overflow-y-auto rounded-none bg-white shadow-xl border-slate-200 p-6 grid grid-cols-3 gap-6">
                 
                 <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-slate-900 font-bold mb-2">North America</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => changeLanguage("us")} className="cursor-pointer">English (United States)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("ca")} className="cursor-pointer">English (Canada)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("fr-ca")} className="cursor-pointer">Français (Canada)</DropdownMenuItem>
                 </DropdownMenuGroup>

                 <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-slate-900 font-bold mb-2">Europe</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => changeLanguage("uk")} className="cursor-pointer">English (United Kingdom)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("de")} className="cursor-pointer">Deutsch (Deutschland)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("fr")} className="cursor-pointer">Français (France)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("it")} className="cursor-pointer">Italiano (Italia)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("es")} className="cursor-pointer">Español (España)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("nl")} className="cursor-pointer">Nederlands (Nederland)</DropdownMenuItem>
                 </DropdownMenuGroup>

                 <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-slate-900 font-bold mb-2">Asia Pacific</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => changeLanguage("cn")} className="cursor-pointer">中文 (中国)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("tw")} className="cursor-pointer">繁體中文 (台灣)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("hk")} className="cursor-pointer">繁體中文 (香港)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("jp")} className="cursor-pointer">日本語 (日本)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("kr")} className="cursor-pointer">한국어 (대한민국)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("sg")} className="cursor-pointer">English (Singapore)</DropdownMenuItem>
                 </DropdownMenuGroup>

              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex flex-wrap gap-6">
              <Link href="#" className="hover:underline">Sitemap</Link>
              <Link href="#" className="hover:underline">Privacy</Link>
              <Link href="#" className="hover:underline">Terms of use</Link>
              <span className="font-semibold">© 2026 Frankfurt Operations.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}