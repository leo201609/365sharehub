"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { 
  Check, ArrowRight, ShieldCheck, Zap, Globe, ChevronDown, 
  FileText, Table, Presentation, Mail, Cloud, Shield, Bot, Palette
} from "lucide-react";

// --- 1. 多语言字典配置 (Content Dictionary) ---
// 这里定义了英语、德语、法语、西班牙语、意大利语、荷兰语
const translations: any = {
  en: {
    nav_pricing: "Pricing",
    nav_login: "Sign in",
    nav_trial: "Free Trial",
    hero_badge: "Microsoft Frankfurt Data Center · GDPR Compliant",
    hero_title_1: "Unlock Microsoft 365",
    hero_title_2: "Copilot Productivity.",
    hero_desc: "Enjoy genuine Office E5 subscription at 1/10 the price. Includes 1TB OneDrive, AI Assistant, and enterprise-grade security.",
    email_placeholder: "Enter your email...",
    cta_start: "Get Started",
    cta_sub: "No credit card required · 7-day free trial",
    
    section_apps_title: "Everything you need in one plan",
    section_apps_desc: "Get the premium apps, cloud storage, and security you need.",
    
    apps_word: "Word",
    apps_word_desc: "Elevate your writing with Copilot.",
    apps_excel: "Excel",
    apps_excel_desc: "Turn data into insights.",
    apps_ppt: "PowerPoint",
    apps_ppt_desc: "Create impactful presentations.",
    apps_outlook: "Outlook",
    apps_outlook_desc: "Manage email and calendar.",
    apps_onedrive: "OneDrive",
    apps_onedrive_desc: "Save and share files safely.",
    apps_defender: "Defender",
    apps_defender_desc: "Protect your personal data.",
    apps_copilot: "Copilot",
    apps_copilot_desc: "Your everyday AI companion.",
    apps_designer: "Designer",
    apps_designer_desc: "Create stunning graphics in seconds.",

    pricing_title: "Simple, Transparent Pricing",
    pricing_subtitle: "All plans include a 7-day free trial.",
    plan_monthly: "Flex Monthly",
    plan_monthly_sub: "Flexible, cancel anytime",
    plan_semi: "Saver 6-Months",
    plan_semi_tag: "Best Value",
    plan_yearly: "Pro Yearly",
    plan_yearly_tag: "Most Popular",
    plan_yearly_save: "Save 37%",
    btn_monthly: "Choose Monthly",
    btn_semi: "Choose 6-Months",
    btn_yearly: "Subscribe Yearly",
    
    footer_copy: "© 2026 Frankfurt Operations. All rights reserved.",
    footer_region: "English (United Kingdom)"
  },
  de: {
    nav_pricing: "Preise",
    nav_login: "Anmelden",
    nav_trial: "Kostenlos testen",
    hero_badge: "Microsoft Rechenzentrum Frankfurt · DSGVO-konform",
    hero_title_1: "Microsoft 365 freischalten",
    hero_title_2: "Copilot Produktivität.",
    hero_desc: "Genießen Sie das originale Office E5-Abonnement zu 1/10 des Preises. Inklusive 1TB OneDrive, KI-Assistent und Sicherheit auf Unternehmensniveau.",
    email_placeholder: "E-Mail eingeben...",
    cta_start: "Jetzt starten",
    cta_sub: "Keine Kreditkarte erforderlich · 7 Tage kostenlos",
    
    section_apps_title: "Alles, was Sie brauchen, in einem Plan",
    section_apps_desc: "Holen Sie sich die Premium-Apps, Cloud-Speicher und Sicherheit.",
    
    apps_word: "Word",
    apps_word_desc: "Verbessern Sie Ihr Schreiben mit Copilot.",
    apps_excel: "Excel",
    apps_excel_desc: "Verwandeln Sie Daten in Erkenntnisse.",
    apps_ppt: "PowerPoint",
    apps_ppt_desc: "Erstellen Sie eindrucksvolle Präsentationen.",
    apps_outlook: "Outlook",
    apps_outlook_desc: "E-Mails und Kalender verwalten.",
    apps_onedrive: "OneDrive",
    apps_onedrive_desc: "Dateien sicher speichern und teilen.",
    apps_defender: "Defender",
    apps_defender_desc: "Schützen Sie Ihre persönlichen Daten.",
    apps_copilot: "Copilot",
    apps_copilot_desc: "Ihr täglicher KI-Begleiter.",
    apps_designer: "Designer",
    apps_designer_desc: "Erstellen Sie Grafiken in Sekunden.",

    pricing_title: "Einfache, transparente Preise",
    pricing_subtitle: "Alle Pläne beinhalten 7 Tage kostenlose Testphase.",
    plan_monthly: "Flex Monatlich",
    plan_monthly_sub: "Flexibel, jederzeit kündbar",
    plan_semi: "Spar-Abo 6 Monate",
    plan_semi_tag: "Bester Wert",
    plan_yearly: "Pro Jährlich",
    plan_yearly_tag: "Beliebt",
    plan_yearly_save: "Sparen Sie 37%",
    btn_monthly: "Monatlich wählen",
    btn_semi: "6 Monate wählen",
    btn_yearly: "Jährlich abonnieren",

    footer_copy: "© 2026 Frankfurt Operations. Alle Rechte vorbehalten.",
    footer_region: "Deutsch (Deutschland)"
  },
  fr: {
    nav_pricing: "Tarifs",
    nav_login: "Connexion",
    nav_trial: "Essai gratuit",
    hero_badge: "Centre de données Francfort · Conforme RGPD",
    hero_title_1: "Débloquez Microsoft 365",
    hero_title_2: "Productivité Copilot.",
    hero_desc: "Profitez de l'abonnement Office E5 original à 1/10 du prix. Inclut 1 To OneDrive, Assistant IA et sécurité d'entreprise.",
    email_placeholder: "Votre email...",
    cta_start: "Commencer",
    cta_sub: "Aucune carte requise · 7 jours gratuits",
    section_apps_title: "Tout ce dont vous avez besoin",
    section_apps_desc: "Obtenez les applications premium, le stockage cloud et la sécurité.",
    apps_word: "Word",
    apps_word_desc: "Améliorez votre écriture avec Copilot.",
    // ... Simplified for brevity, follows pattern
    pricing_title: "Tarification simple",
    pricing_subtitle: "Tous les plans incluent 7 jours d'essai.",
    plan_monthly: "Flex Mensuel",
    plan_monthly_sub: "Flexible, annulable à tout moment",
    plan_semi: "Éco 6-Mois",
    plan_semi_tag: "Meilleure valeur",
    plan_yearly: "Pro Annuel",
    plan_yearly_tag: "Populaire",
    plan_yearly_save: "Économisez 37%",
    btn_monthly: "Choisir Mensuel",
    btn_semi: "Choisir 6-Mois",
    btn_yearly: "S'abonner Annuellement",
    footer_copy: "© 2026 Frankfurt Operations. Tous droits réservés.",
    footer_region: "Français (France)"
  },
  // 可以继续扩展 es, it, nl ...
};

// --- 2. 辅助组件：应用卡片 ---
const AppCard = ({ icon: Icon, title, desc, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-default group">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="font-semibold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{title}</h3>
    <p className="text-sm text-slate-500 mt-2 leading-relaxed">{desc}</p>
    <div className="mt-4 text-blue-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
      Learn more <ArrowRight className="w-3 h-3" />
    </div>
  </div>
);

export default function Home() {
  // 状态管理：当前语言
  const [lang, setLang] = useState("en");
  const t = translations[lang] || translations["en"]; // Fallback to English

  // 语言切换处理函数
  const changeLanguage = (code: string) => {
    setLang(code);
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden bg-[#fafafa]">
      
      {/* 极光背景层 */}
      <div className="aurora-bg"></div>

      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0078D4] rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
              3
            </div>
            <span className="font-semibold text-lg tracking-tight hidden md:block">365ShareHub</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-6 mr-4 text-sm font-medium text-slate-600">
              <Link href="#apps" className="hover:text-[#0078D4] transition">Apps</Link>
              <Link href="#pricing" className="hover:text-[#0078D4] transition">{t.nav_pricing}</Link>
            </div>
            
            <Link href="/login" className="text-sm font-medium hover:text-[#0078D4] transition">{t.nav_login}</Link>
            <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-5 h-9 text-sm font-medium shadow-sm transition-all hover:scale-105">
              {t.nav_trial}
            </Button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-24 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 bg-white/60 border border-white/60 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm mx-auto cursor-default">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-slate-600">{t.hero_badge}</span>
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
              <Button className="rounded-full px-6 bg-[#0078D4] hover:bg-[#0060aa] text-white font-medium shadow-md transition-all">
                {t.cta_start} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-3">{t.cta_sub}</p>
          </div>
        </div>
      </section>

      {/* --- Microsoft-Style App Grid (NEW FEATURE) --- */}
      <section id="apps" className="py-24 px-6 bg-white/50 border-y border-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.section_apps_title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t.section_apps_desc}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <AppCard icon={Bot} title={t.apps_copilot} desc={t.apps_copilot_desc} color="bg-purple-100 text-purple-600" />
            <AppCard icon={FileText} title={t.apps_word} desc={t.apps_word_desc} color="bg-blue-100 text-blue-600" />
            <AppCard icon={Table} title={t.apps_excel} desc={t.apps_excel_desc} color="bg-green-100 text-green-600" />
            <AppCard icon={Presentation} title={t.apps_ppt} desc={t.apps_ppt_desc} color="bg-orange-100 text-orange-600" />
            <AppCard icon={Mail} title={t.apps_outlook} desc={t.apps_outlook_desc} color="bg-sky-100 text-sky-600" />
            <AppCard icon={Cloud} title={t.apps_onedrive} desc={t.apps_onedrive_desc} color="bg-blue-50 text-blue-500" />
            <AppCard icon={Shield} title={t.apps_defender} desc={t.apps_defender_desc} color="bg-slate-100 text-slate-600" />
            <AppCard icon={Palette} title={t.apps_designer} desc={t.apps_designer_desc} color="bg-pink-100 text-pink-600" />
          </div>
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section id="pricing" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.pricing_title}</h2>
            <p className="text-slate-600">{t.pricing_subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            
            {/* Monthly */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all bg-white/80 backdrop-blur rounded-3xl overflow-hidden mt-4">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
                <CardTitle className="text-lg font-medium text-slate-500">{t.plan_monthly}</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold text-slate-900">€3.99</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">{t.plan_monthly_sub}</p>
              </CardHeader>
              <CardContent className="pt-6">
                <Button variant="outline" className="w-full rounded-xl h-11 border-slate-200 hover:bg-slate-50 hover:text-black">
                  {t.btn_monthly}
                </Button>
              </CardContent>
            </Card>

            {/* Semi-Annual */}
            <Card className="border-0 shadow-fluent hover:shadow-fluent-hover transition-all bg-white rounded-3xl overflow-hidden z-10 scale-105 ring-1 ring-slate-100">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold text-center py-1.5">
                {t.plan_semi_tag}
              </div>
              <CardHeader className="bg-white pb-6 pt-6">
                <CardTitle className="text-lg font-bold text-slate-800">{t.plan_semi}</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-5xl font-bold text-slate-900">€17.90</span>
                </div>
                <p className="text-sm font-medium text-green-600 mt-2">€2.98 / mo</p>
              </CardHeader>
              <CardContent className="pt-4">
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl h-12 shadow-lg">
                  {t.btn_semi}
                </Button>
              </CardContent>
            </Card>

            {/* Yearly */}
            <Card className="border-2 border-[#0078D4] shadow-xl transition-all bg-white rounded-3xl relative overflow-hidden mt-4">
               <div className="absolute top-0 right-0 bg-[#0078D4] text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                 {t.plan_yearly_tag}
               </div>
              <CardHeader className="bg-white border-b border-slate-50 pb-6 pt-8">
                <CardTitle className="text-lg font-bold text-[#0078D4]">{t.plan_yearly}</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold text-slate-900">€29.90</span>
                </div>
                <p className="text-sm font-bold text-[#0078D4] mt-2">{t.plan_yearly_save}</p>
              </CardHeader>
              <CardContent className="pt-6">
                <Button className="w-full bg-[#0078D4] hover:bg-[#0060aa] text-white font-bold rounded-xl h-11 shadow-lg shadow-blue-200">
                  {t.btn_yearly}
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* --- Footer with Region Selector (MICROSOFT STYLE) --- */}
      <footer className="py-12 bg-[#f2f2f2] text-sm text-[#616161]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold text-slate-700 mb-4">What's New</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:underline">Surface Pro</a></li>
                <li><a href="#" className="hover:underline">Microsoft Copilot</a></li>
                <li><a href="#" className="hover:underline">Microsoft 365</a></li>
                <li><a href="#" className="hover:underline">Windows 11 apps</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-4">Microsoft Store</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:underline">Account profile</a></li>
                <li><a href="#" className="hover:underline">Download Center</a></li>
                <li><a href="#" className="hover:underline">Returns</a></li>
                <li><a href="#" className="hover:underline">Order tracking</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-4">Education</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:underline">Microsoft Education</a></li>
                <li><a href="#" className="hover:underline">Devices for education</a></li>
                <li><a href="#" className="hover:underline">Microsoft Teams for Education</a></li>
                <li><a href="#" className="hover:underline">Office Education</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-4">Business</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:underline">Microsoft Cloud</a></li>
                <li><a href="#" className="hover:underline">Microsoft Security</a></li>
                <li><a href="#" className="hover:underline">Azure</a></li>
                <li><a href="#" className="hover:underline">Dynamics 365</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-8 border-t border-slate-300">
            {/* 底部左侧语言选择器 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:underline text-[#616161]">
                  <Globe className="w-4 h-4" />
                  <span>{t.footer_region}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 max-h-[300px] overflow-y-auto rounded-md bg-white shadow-lg border-slate-200">
                 <DropdownMenuLabel>Choose your region</DropdownMenuLabel>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={() => changeLanguage("en")} className="gap-2 cursor-pointer">
                    🇬🇧 English (United Kingdom)
                 </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => changeLanguage("en")} className="gap-2 cursor-pointer">
                    🇪🇺 English (Europe)
                 </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => changeLanguage("de")} className="gap-2 cursor-pointer">
                    🇩🇪 Deutsch (Deutschland)
                 </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => changeLanguage("de")} className="gap-2 cursor-pointer">
                    🇦🇹 Deutsch (Österreich)
                 </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => changeLanguage("fr")} className="gap-2 cursor-pointer">
                    🇫🇷 Français (France)
                 </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => changeLanguage("fr")} className="gap-2 cursor-pointer">
                    🇧🇪 Français (Belgique)
                 </DropdownMenuItem>
                 {/* 可以继续添加更多 */}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex flex-wrap gap-6 text-xs">
              <Link href="#" className="hover:underline">Sitemap</Link>
              <Link href="#" className="hover:underline">Contact Microsoft</Link>
              <Link href="#" className="hover:underline">Privacy</Link>
              <Link href="#" className="hover:underline">Manage cookies</Link>
              <Link href="#" className="hover:underline">Terms of use</Link>
              <span className="font-semibold">{t.footer_copy}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}