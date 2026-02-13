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
  Check, ArrowRight, ShieldCheck, Globe, ChevronDown, 
  FileText, Table, Presentation, Mail, Cloud, Shield, Bot, 
  Palette, Video, BookOpen, Menu, Sparkles
} from "lucide-react";

// --- 1. 社交媒体图标 ---
const XIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);
const TikTokIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.03 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.35-1.17 1.09-1.07 1.73.07.45.27.9.55 1.15.5.41 1.13.56 1.75.52 1.25.1 2.56-.63 3.09-1.78.27-.58.33-1.25.32-1.88.02-5.5.01-11 .01-16.51z"/></svg>);
const WhatsAppIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>);
const TelegramIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>);
const YouTubeIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>);
const LinkedInIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);


// --- 2. 国际化字典 (覆盖欧洲+亚太) ---
const translations: any = {
  en: {
    hero_title_1: "Unlock Microsoft 365",
    hero_title_2: "Copilot Productivity.",
    hero_desc: "Enjoy genuine Office E5 subscription at 1/10 the price. Includes 1TB OneDrive, AI Assistant, and enterprise-grade security.",
    email_placeholder: "Enter your email...",
    cta_start: "Get Started",
    section_apps_title: "Everything you need in one plan",
    section_apps_desc: "Get the premium apps, cloud storage, and security you need.",
    pricing_title: "Simple, Transparent Pricing",
    footer_region: "English (Global)",
    
    // Apps
    app_word: "Word", app_desc: "Elevate your writing.",
    app_excel: "Excel", 
    app_ppt: "PowerPoint", 
    app_outlook: "Outlook", 
    app_onedrive: "OneDrive", 
    app_teams: "Teams", 
    app_onenote: "OneNote", 
    app_defender: "Defender", 
    app_designer: "Designer", 
    app_copilot: "Copilot", 
  },
  de: {
    hero_title_1: "Microsoft 365 freischalten",
    hero_title_2: "Copilot Produktivität.",
    hero_desc: "Genießen Sie das echte Office E5-Abonnement zu 1/10 des Preises. Inklusive 1 TB OneDrive, KI-Assistent und Sicherheit auf Unternehmensniveau.",
    email_placeholder: "E-Mail eingeben...",
    cta_start: "Jetzt starten",
    section_apps_title: "Alles in einem Plan",
    section_apps_desc: "Holen Sie sich Premium-Apps, Cloud-Speicher und Sicherheit.",
    pricing_title: "Einfache Preise",
    footer_region: "Deutsch (Deutschland)",
    app_word: "Word", app_desc: "Verbessern Sie Ihr Schreiben.",
  },
  fr: {
    hero_title_1: "Débloquez Microsoft 365",
    hero_title_2: "Productivité Copilot.",
    hero_desc: "Profitez d'un abonnement Office E5 authentique à 1/10 du prix. Inclut 1 To OneDrive, Assistant IA et sécurité d'entreprise.",
    email_placeholder: "Votre email...",
    cta_start: "Commencer",
    section_apps_title: "Tout ce dont vous avez besoin",
    section_apps_desc: "Obtenez les applications premium et la sécurité.",
    pricing_title: "Tarification simple",
    footer_region: "Français (France)",
    app_word: "Word", app_desc: "Améliorez votre écriture.",
  },
  es: {
    hero_title_1: "Desbloquea Microsoft 365",
    hero_title_2: "Productividad Copilot.",
    hero_desc: "Disfruta de una suscripción genuina a Office E5 por 1/10 del precio. Incluye 1TB OneDrive, Asistente IA y seguridad empresarial.",
    email_placeholder: "Tu correo...",
    cta_start: "Empezar",
    section_apps_title: "Todo en un solo plan",
    section_apps_desc: "Obtén aplicaciones premium y seguridad avanzada.",
    pricing_title: "Precios simples",
    footer_region: "Español (España)",
    app_word: "Word", app_desc: "Eleva tu escritura.",
  },
  it: {
    hero_title_1: "Sblocca Microsoft 365",
    hero_title_2: "Produttività Copilot.",
    hero_desc: "Goditi l'abbonamento originale Office E5 a 1/10 del prezzo. Include 1TB OneDrive, Assistente AI e sicurezza aziendale.",
    cta_start: "Inizia",
    footer_region: "Italiano (Italia)",
    app_word: "Word", app_desc: "Migliora la tua scrittura.",
  },
  jp: {
    hero_title_1: "Microsoft 365 を解き放つ",
    hero_title_2: "Copilot の生産性。",
    hero_desc: "正規の Office E5 サブスクリプションを定価の 1/10 でご利用いただけます。1TB OneDrive、AI アシスタント、エンタープライズ級のセキュリティが含まれます。",
    email_placeholder: "メールアドレス...",
    cta_start: "始める",
    section_apps_title: "必要なすべてを1つのプランで",
    section_apps_desc: "プレミアムアプリ、クラウドストレージ、セキュリティを入手。",
    pricing_title: "シンプルで透明な価格",
    footer_region: "日本語 (日本)",
    app_word: "Word", app_desc: "文章作成をレベルアップ。",
  },
  kr: {
    hero_title_1: "Microsoft 365 잠금 해제",
    hero_title_2: "Copilot 생산성.",
    hero_desc: "정품 Office E5 구독을 1/10 가격으로 누리세요. 1TB OneDrive, AI 어시스턴트, 엔터프라이즈급 보안이 포함됩니다.",
    email_placeholder: "이메일 입력...",
    cta_start: "시작하기",
    section_apps_title: "하나의 요금제로 모든 것을",
    section_apps_desc: "프리미엄 앱, 클라우드 저장소, 보안을 받으세요.",
    pricing_title: "간편한 요금",
    footer_region: "한국어 (대한민국)",
    app_word: "Word", app_desc: "글쓰기 능력 향상.",
  },
  zh: {
    hero_title_1: "解锁 Microsoft 365",
    hero_title_2: "Copilot 生产力。",
    hero_desc: "以官方价格的 1/10 享受正版 Office E5 订阅。包含 1TB OneDrive，AI 助手，以及企业级数据安全。",
    email_placeholder: "输入您的邮箱...",
    cta_start: "开始试用",
    section_apps_title: "一个计划，满足所有需求",
    section_apps_desc: "获取您需要的高级应用、云存储和安全性。",
    pricing_title: "简单透明的定价",
    footer_region: "中文 (简体)",
    app_word: "Word", app_desc: "提升您的写作水平。",
  },
  tw: {
    hero_title_1: "解鎖 Microsoft 365",
    hero_title_2: "Copilot 生產力。",
    hero_desc: "以官方價格的 1/10 享受正版 Office E5 訂閱。包含 1TB OneDrive，AI 助手，以及企業級數據安全。",
    email_placeholder: "輸入您的電子郵件...",
    cta_start: "開始試用",
    section_apps_title: "一個計劃，滿足所有需求",
    section_apps_desc: "獲取您需要的高級應用、雲端存儲和安全性。",
    pricing_title: "簡單透明的定價",
    footer_region: "中文 (繁體)",
    app_word: "Word", app_desc: "提升您的寫作水平。",
  }
};


// --- 3. 组件：应用卡片 (仿微软官方配色) ---
const AppCard = ({ icon: Icon, title, desc, bgClass, textClass }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-fluent-hover transition-all cursor-default group hover:-translate-y-1 duration-300">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${bgClass}`}>
      <Icon className={`w-6 h-6 ${textClass}`} />
    </div>
    <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    <div className="mt-4 flex items-center text-blue-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
      Learn more <ArrowRight className="w-3 h-3 ml-1" />
    </div>
  </div>
);

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = translations[lang] || translations["en"];

  // 语言切换逻辑 (映射所有国家代码)
  const changeLanguage = (code: string) => {
    const map: any = {
      'us': 'en', 'uk': 'en', 'ca': 'en', 'au': 'en', 'sg': 'en',
      'de': 'de', 'at': 'de', 'ch': 'de',
      'fr': 'fr', 'be': 'fr',
      'es': 'es', 'mx': 'es', 'co': 'es', 'cl': 'es', 'ar': 'es',
      'it': 'it',
      'jp': 'jp',
      'kr': 'kr',
      'cn': 'zh',
      'tw': 'tw', 'hk': 'tw'
    };
    setLang(map[code] || 'en');
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden bg-[#fafafa]">
      
      {/* 极光背景 (Aurora) */}
      <div className="aurora-bg"></div>

      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0078D4] rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
              3
            </div>
            <span className="font-semibold text-lg tracking-tight hidden md:block">365ShareHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-[#0078D4] transition">Sign in</Link>
            <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-5 h-9 text-sm font-medium shadow-sm transition-all hover:scale-105">
              Free Trial
            </Button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section (Centered & Aurora) --- */}
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
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
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

      {/* --- 10 Apps Grid (Microsoft Official Colors) --- */}
      <section id="apps" className="py-24 px-6 bg-white/40 border-y border-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.section_apps_title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t.section_apps_desc}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {/* 1. Copilot (Rainbow) */}
            <AppCard icon={Sparkles} title="Copilot" desc="Your everyday AI companion." bgClass="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100" textClass="text-purple-600" />
            {/* 2. Word (Blue) */}
            <AppCard icon={FileText} title="Word" desc="Elevate your writing." bgClass="bg-[#EDF5FD]" textClass="text-[#185ABD]" />
            {/* 3. Excel (Green) */}
            <AppCard icon={Table} title="Excel" desc="Turn data into insights." bgClass="bg-[#E6F3EB]" textClass="text-[#107C41]" />
            {/* 4. PowerPoint (Orange) */}
            <AppCard icon={Presentation} title="PowerPoint" desc="Create impactful slides." bgClass="bg-[#FFF0E6]" textClass="text-[#C43E1C]" />
            {/* 5. Outlook (Sky) */}
            <AppCard icon={Mail} title="Outlook" desc="Email and calendar together." bgClass="bg-[#EFF6FC]" textClass="text-[#0078D4]" />
            
            {/* 6. OneDrive (Navy) */}
            <AppCard icon={Cloud} title="OneDrive" desc="Save and share files safely." bgClass="bg-[#EFF6FC]" textClass="text-[#0078D4]" />
            {/* 7. Teams (Purple) */}
            <AppCard icon={Video} title="Teams" desc="Meet, chat, call, and collab." bgClass="bg-[#F0F0FA]" textClass="text-[#6264A7]" />
            {/* 8. OneNote (Violet) */}
            <AppCard icon={BookOpen} title="OneNote" desc="Your digital notebook." bgClass="bg-[#F5F0F8]" textClass="text-[#7719AA]" />
            {/* 9. Defender (Shield Blue) */}
            <AppCard icon={Shield} title="Defender" desc="Protect data and devices." bgClass="bg-[#E8F2FA]" textClass="text-[#005A9E]" />
            {/* 10. Designer (Pink) */}
            <AppCard icon={Palette} title="Designer" desc="Create stunning graphics." bgClass="bg-[#FCEBF5]" textClass="text-[#C82168]" />
          </div>
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section id="pricing" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.pricing_title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {/* Monthly */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all bg-white/80 backdrop-blur rounded-3xl overflow-hidden mt-4">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
                <CardTitle className="text-lg font-medium text-slate-500">Flex Monthly</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold text-slate-900">€3.99</span>
                  <span className="text-slate-400 ml-1">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-500"/> All Premium Apps</li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-500"/> 1TB Cloud Storage</li>
                </ul>
                <Button variant="outline" className="w-full rounded-xl h-11 border-slate-200 hover:bg-slate-50 hover:text-black">Choose Monthly</Button>
              </CardContent>
            </Card>

            {/* Semi-Annual */}
            <Card className="border-0 shadow-fluent hover:shadow-fluent-hover transition-all bg-white rounded-3xl overflow-hidden z-10 scale-105 ring-1 ring-slate-100">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold text-center py-1.5">BEST VALUE</div>
              <CardHeader className="bg-white pb-6 pt-6">
                <CardTitle className="text-lg font-bold text-slate-800">Saver 6-Months</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-5xl font-bold text-slate-900">€17.90</span>
                </div>
                <p className="text-sm font-medium text-green-600 mt-2">€2.98 / mo</p>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-purple-500"/> <strong>Includes Monthly Perks</strong></li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-purple-500"/> Save 25% instantly</li>
                </ul>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl h-12 shadow-lg">Choose 6-Months</Button>
              </CardContent>
            </Card>

            {/* Yearly */}
            <Card className="border-2 border-[#0078D4] shadow-xl transition-all bg-white rounded-3xl relative overflow-hidden mt-4">
               <div className="absolute top-0 right-0 bg-[#0078D4] text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <CardHeader className="bg-white border-b border-slate-50 pb-6 pt-8">
                <CardTitle className="text-lg font-bold text-[#0078D4]">Pro Yearly</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold text-slate-900">€29.90</span>
                  <span className="text-slate-400 ml-1">/yr</span>
                </div>
                <p className="text-sm font-bold text-[#0078D4] mt-2">Save 37%</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-700 font-medium"><Check className="w-4 h-4 text-blue-600"/> <strong>Copilot Priority Access</strong></li>
                  <li className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-blue-600"/> VIP Support</li>
                </ul>
                <Button className="w-full bg-[#0078D4] hover:bg-[#0060aa] text-white font-bold rounded-xl h-11 shadow-lg shadow-blue-200">Subscribe Yearly</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- Footer (Global Region Selector) --- */}
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
            {/* 🌍 修复后的 Mega Menu 语言选择器 */}
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
              <span className="font-semibold">© 2026 Frankfurt Operations.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}