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
  DropdownMenuGroup,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { 
  Check, ArrowRight, Globe, User, LogOut, LayoutDashboard, Sparkles
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link"; 

// --- 0. Icons & Logo ---
const ModernLogo = () => (
  <div className="w-9 h-9 relative flex items-center justify-center shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
      <Image 
        src="/icons/365sharehub.png" 
        alt="365ShareHub Logo" 
        fill 
        className="object-contain"
        sizes="36px"
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

// --- 1. 🌍 国际化文案字典 (🔥 完整版) ---
const translations: any = {
  // 🇺🇸 英语 (默认)
  en: {
    hero_title_1: "Unlock Microsoft 365",
    hero_title_2: "Copilot Productivity.",
    hero_desc: "Boost productivity with Copilot alongside you. Get leading apps with built-in AI, advanced security, and spacious 1 TB cloud storage in one plan.",
    email_placeholder: "Enter your email...",
    cta_start: "Get Started",
    hero_badge_1: "7-day free trial",
    hero_badge_2: "Use first, pay later (monthly)",
    section_apps_title: "Everything you need in one plan",
    section_apps_desc: "Get the premium apps, cloud storage, and security you need.",
    pricing_promo: "Enjoy full Microsoft 365 features at a favorable price",
    pricing_title: "Simple, Transparent Pricing",
    footer_region: "English (Global)",
    footer_copy: "© 2026 365ShareHub Operations. All rights reserved.",
    badge_flexible: "FLEXIBLE",
    badge_popular: "MOST POPULAR", 
    badge_best_value: "BEST VALUE",
    plan_monthly: "Monthly Plan",
    plan_semi: "Semi-Annual Plan",
    plan_annual: "Annual Pro",
    tag_trial: "7-Day Free Trial",
    tag_save_25: "Save 25%",
    tag_save_37: "Save 37%",
    feat_copilot: "Includes Copilot & All Apps",
    feat_storage: "1TB OneDrive Storage",
    feat_devices: "Connect 5 Devices",
    feat_platform: "PC, Mac, iOS & Android",
    feat_pay_monthly: "Pay after trial, cancel anytime",
    feat_save_semi: "Save 25% vs Monthly",
    feat_save_yearly: "Save 37% vs Monthly",
    btn_trial: "Start Free Trial",
    btn_semi: "Choose 6-Months",
    btn_yearly: "Subscribe Yearly",
  },
  // 🇩🇪 德语
  de: {
    hero_title_1: "Microsoft 365 freischalten",
    hero_title_2: "Copilot Produktivität.",
    hero_desc: "Steigern Sie Ihre Produktivität mit Copilot an Ihrer Seite. Erhalten Sie führende Apps mit integrierter KI, erweiterter Sicherheit und großzügigem 1 TB Cloud-Speicher.",
    email_placeholder: "E-Mail eingeben...",
    cta_start: "Jetzt starten",
    hero_badge_1: "7 Tage kostenlos testen",
    hero_badge_2: "Erst nutzen, später zahlen",
    section_apps_title: "Alles in einem Plan",
    section_apps_desc: "Holen Sie sich Premium-Apps, Cloud-Speicher und Sicherheit.",
    pricing_promo: "Genießen Sie alle Microsoft 365-Funktionen zu einem günstigen Preis",
    pricing_title: "Einfache Preise",
    footer_region: "Deutsch (Deutschland)",
    footer_copy: "© 2026 365ShareHub Operations. Alle Rechte vorbehalten.",
    badge_flexible: "FLEXIBEL",
    badge_popular: "BELIEBT",
    badge_best_value: "BESTER WERT",
    plan_monthly: "Monatstarif",
    plan_semi: "Halbjahrestarif",
    plan_annual: "Jahres-Pro",
    tag_trial: "7 Tage kostenlos",
    tag_save_25: "Sparen Sie 25%",
    tag_save_37: "Sparen Sie 37%",
    feat_copilot: "Inklusive Copilot & Alle Apps",
    feat_storage: "1TB Cloud-Speicher",
    feat_devices: "5 Geräte verbinden",
    feat_platform: "PC, Mac, iOS & Android",
    feat_pay_monthly: "Monatlich kündbar",
    feat_save_semi: "Sparen Sie 25%",
    feat_save_yearly: "Sparen Sie 37%",
    btn_trial: "Kostenlos testen",
    btn_semi: "6 Monate wählen",
    btn_yearly: "Jährlich abonnieren",
  },
  // 🇫🇷 法语
  fr: {
    hero_title_1: "Débloquez Microsoft 365",
    hero_title_2: "Productivité Copilot.",
    hero_desc: "Boostez votre productivité avec Copilot. Obtenez des applications phares avec IA intégrée, une sécurité avancée et 1 To de stockage cloud.",
    email_placeholder: "Entrez votre email...",
    cta_start: "Commencer",
    hero_badge_1: "Essai gratuit de 7 jours",
    hero_badge_2: "Utilisez maintenant, payez plus tard",
    section_apps_title: "Tout ce dont vous avez besoin",
    section_apps_desc: "Obtenez les applications premium, le stockage cloud et la sécurité nécessaires.",
    pricing_promo: "Profitez de Microsoft 365 à un prix avantageux",
    pricing_title: "Tarification simple",
    footer_region: "Français (France)",
    footer_copy: "© 2026 365ShareHub Operations. Tous droits réservés.",
    badge_flexible: "FLEXIBLE",
    badge_popular: "POPULAIRE",
    badge_best_value: "MEILLEURE VALEUR",
    plan_monthly: "Plan Mensuel",
    plan_semi: "Plan Semestriel",
    plan_annual: "Pro Annuel",
    tag_trial: "Essai 7 jours",
    tag_save_25: "-25% de réduction",
    tag_save_37: "-37% de réduction",
    feat_copilot: "Inclus Copilot & Apps",
    feat_storage: "1 To de stockage OneDrive",
    feat_devices: "Connectez 5 appareils",
    feat_platform: "PC, Mac, iOS & Android",
    feat_pay_monthly: "Annulez à tout moment",
    feat_save_semi: "Économisez 25%",
    feat_save_yearly: "Économisez 37%",
    btn_trial: "Essai gratuit",
    btn_semi: "Choisir 6 Mois",
    btn_yearly: "S'abonner (1 an)",
  },
  // 🇪🇸 西班牙语
  es: {
    hero_title_1: "Desbloquea Microsoft 365",
    hero_title_2: "Productividad Copilot.",
    hero_desc: "Aumenta la productividad con Copilot. Obtén aplicaciones líderes con IA integrada, seguridad avanzada y 1 TB de almacenamiento en la nube.",
    email_placeholder: "Tu correo electrónico...",
    cta_start: "Empezar",
    hero_badge_1: "Prueba gratis de 7 días",
    hero_badge_2: "Usa primero, paga después",
    section_apps_title: "Todo en un solo plan",
    section_apps_desc: "Obtén las aplicaciones premium, el almacenamiento y la seguridad que necesitas.",
    pricing_promo: "Disfruta de Microsoft 365 a un precio favorable",
    pricing_title: "Precios Simples",
    footer_region: "Español (España)",
    footer_copy: "© 2026 365ShareHub Operations. Todos los derechos reservados.",
    badge_flexible: "FLEXIBLE",
    badge_popular: "POPULAR",
    badge_best_value: "MEJOR VALOR",
    plan_monthly: "Plan Mensual",
    plan_semi: "Plan Semestral",
    plan_annual: "Pro Anual",
    tag_trial: "Prueba 7 días",
    tag_save_25: "Ahorra 25%",
    tag_save_37: "Ahorra 37%",
    feat_copilot: "Incluye Copilot y Apps",
    feat_storage: "1 TB de almacenamiento",
    feat_devices: "Conecta 5 dispositivos",
    feat_platform: "PC, Mac, iOS y Android",
    feat_pay_monthly: "Cancela cuando quieras",
    feat_save_semi: "Ahorra un 25%",
    feat_save_yearly: "Ahorra un 37%",
    btn_trial: "Prueba gratis",
    btn_semi: "Elegir 6 Meses",
    btn_yearly: "Suscribirse Anual",
  },
  // 🇮🇹 意大利语
  it: {
    hero_title_1: "Sblocca Microsoft 365",
    hero_title_2: "Produttività Copilot.",
    hero_desc: "Aumenta la produttività con Copilot. Ottieni app leader con AI integrata, sicurezza avanzata e 1 TB di spazio di archiviazione cloud.",
    email_placeholder: "Inserisci la tua email...",
    cta_start: "Inizia ora",
    hero_badge_1: "7 giorni di prova gratuita",
    hero_badge_2: "Usa ora, paga dopo",
    section_apps_title: "Tutto in un unico piano",
    section_apps_desc: "Ottieni le app premium, l'archiviazione cloud e la sicurezza di cui hai bisogno.",
    pricing_promo: "Goditi Microsoft 365 a un prezzo vantaggioso",
    pricing_title: "Prezzi Semplici",
    footer_region: "Italiano (Italia)",
    footer_copy: "© 2026 365ShareHub Operations. Tutti i diritti riservati.",
    badge_flexible: "FLESSIBILE",
    badge_popular: "POPOLARE",
    badge_best_value: "MIGLIOR VALORE",
    plan_monthly: "Piano Mensile",
    plan_semi: "Piano Semestrale",
    plan_annual: "Pro Annuale",
    tag_trial: "7 giorni gratis",
    tag_save_25: "Risparmia 25%",
    tag_save_37: "Risparmia 37%",
    feat_copilot: "Include Copilot e App",
    feat_storage: "1TB di archiviazione",
    feat_devices: "Collega 5 dispositivi",
    feat_platform: "PC, Mac, iOS e Android",
    feat_pay_monthly: "Annulla in qualsiasi momento",
    feat_save_semi: "Risparmia il 25%",
    feat_save_yearly: "Risparmia il 37%",
    btn_trial: "Prova gratis",
    btn_semi: "Scegli 6 Mesi",
    btn_yearly: "Abbonati (1 anno)",
  },
  // 🇳🇱 荷兰语
  nl: {
    hero_title_1: "Ontgrendel Microsoft 365",
    hero_title_2: "Copilot Productiviteit.",
    hero_desc: "Verhoog uw productiviteit met Copilot. Krijg toonaangevende apps met ingebouwde AI, geavanceerde beveiliging en 1 TB cloudopslag.",
    email_placeholder: "Voer uw e-mail in...",
    cta_start: "Aan de slag",
    hero_badge_1: "7 dagen gratis proberen",
    hero_badge_2: "Eerst gebruiken, later betalen",
    section_apps_title: "Alles wat u nodig hebt",
    section_apps_desc: "Krijg de premium apps, cloudopslag en beveiliging die u nodig hebt.",
    pricing_promo: "Geniet van Microsoft 365 tegen een gunstige prijs",
    pricing_title: "Eenvoudige Prijzen",
    footer_region: "Nederlands (Nederland)",
    footer_copy: "© 2026 365ShareHub Operations. Alle rechten voorbehouden.",
    badge_flexible: "FLEXIBEL",
    badge_popular: "POPULAIR",
    badge_best_value: "BESTE WAARDE",
    plan_monthly: "Maandplan",
    plan_semi: "Halfjaarlijks",
    plan_annual: "Jaarlijks Pro",
    tag_trial: "7 dagen gratis",
    tag_save_25: "Bespaar 25%",
    tag_save_37: "Bespaar 37%",
    feat_copilot: "Inclusief Copilot & Apps",
    feat_storage: "1TB OneDrive-opslag",
    feat_devices: "Verbind 5 apparaten",
    feat_platform: "PC, Mac, iOS & Android",
    feat_pay_monthly: "Annuleer op elk moment",
    feat_save_semi: "Bespaar 25%",
    feat_save_yearly: "Bespaar 37%",
    btn_trial: "Gratis proberen",
    btn_semi: "Kies 6 Maanden",
    btn_yearly: "Jaarlijks abonneren",
  },
  // 🇵🇹 葡萄牙语
  pt: {
    hero_title_1: "Desbloqueie o Microsoft 365",
    hero_title_2: "Produtividade Copilot.",
    hero_desc: "Aumente a produtividade com o Copilot. Obtenha apps líderes com IA integrada, segurança avançada e 1 TB de armazenamento em nuvem.",
    email_placeholder: "Seu e-mail...",
    cta_start: "Começar",
    hero_badge_1: "7 dias de teste grátis",
    hero_badge_2: "Use primeiro, pague depois",
    section_apps_title: "Tudo em um plano",
    section_apps_desc: "Obtenha os apps premium, armazenamento e segurança que você precisa.",
    pricing_promo: "Aproveite o Microsoft 365 por um preço favorável",
    pricing_title: "Preços Simples",
    footer_region: "Português (Brasil)",
    footer_copy: "© 2026 365ShareHub Operations. Todos os direitos reservados.",
    badge_flexible: "FLEXÍVEL",
    badge_popular: "POPULAR",
    badge_best_value: "MELHOR VALOR",
    plan_monthly: "Plano Mensal",
    plan_semi: "Plano Semestral",
    plan_annual: "Pro Anual",
    tag_trial: "7 dias grátis",
    tag_save_25: "Economize 25%",
    tag_save_37: "Economize 37%",
    feat_copilot: "Inclui Copilot e Apps",
    feat_storage: "1TB de armazenamento",
    feat_devices: "Conecte 5 dispositivos",
    feat_platform: "PC, Mac, iOS e Android",
    feat_pay_monthly: "Cancele a qualquer momento",
    feat_save_semi: "Economize 25%",
    feat_save_yearly: "Economize 37%",
    btn_trial: "Teste Grátis",
    btn_semi: "Escolher 6 Meses",
    btn_yearly: "Assinar Anual",
  },
  // 🇯🇵 日语
  jp: {
    hero_title_1: "Microsoft 365 を",
    hero_title_2: "Copilot で解放する",
    hero_desc: "Copilot と共に生産性を向上させましょう。AI 搭載の主要アプリ、高度なセキュリティ、1 TB の大容量クラウドストレージを 1 つのプランで。",
    email_placeholder: "メールアドレスを入力...",
    cta_start: "始める",
    hero_badge_1: "7日間無料体験",
    hero_badge_2: "まずは体験、支払いは後で",
    section_apps_title: "必要なすべてを 1 つのプランで",
    section_apps_desc: "プレミアムアプリ、クラウドストレージ、セキュリティをすべて入手。",
    pricing_promo: "Microsoft 365 の全機能をお得な価格で",
    pricing_title: "シンプルで透明な価格設定",
    footer_region: "日本語 (日本)",
    footer_copy: "© 2026 365ShareHub Operations. 無断複写・転載を禁じます。",
    badge_flexible: "柔軟なプラン",
    badge_popular: "一番人気",
    badge_best_value: "ベストバリュー",
    plan_monthly: "月額プラン",
    plan_semi: "半年プラン",
    plan_annual: "年間プロ",
    tag_trial: "7日間無料体験",
    tag_save_25: "25% お得",
    tag_save_37: "37% お得",
    feat_copilot: "Copilot と全アプリを含む",
    feat_storage: "1TB OneDrive ストレージ",
    feat_devices: "5台のデバイスを接続",
    feat_platform: "PC, Mac, iOS & Android 対応",
    feat_pay_monthly: "いつでもキャンセル可能",
    feat_save_semi: "月額より 25% お得",
    feat_save_yearly: "月額より 37% お得",
    btn_trial: "無料体験を開始",
    btn_semi: "6ヶ月プランを選択",
    btn_yearly: "年間購読する",
  },
  // 🇰🇷 韩语
  kr: {
    hero_title_1: "Microsoft 365 잠금 해제",
    hero_title_2: "Copilot 생산성.",
    hero_desc: "Copilot과 함께 생산성을 높이세요. AI가 내장된 주요 앱, 고급 보안, 1TB 클라우드 스토리지를 하나의 요금제로 이용하세요.",
    email_placeholder: "이메일 입력...",
    cta_start: "시작하기",
    hero_badge_1: "7일 무료 체험",
    hero_badge_2: "먼저 사용, 나중에 결제",
    section_apps_title: "필요한 모든 것을 하나의 플랜으로",
    section_apps_desc: "프리미엄 앱, 클라우드 스토리지 및 보안을 모두 받으세요.",
    pricing_promo: "Microsoft 365의 모든 기능을 합리적인 가격에",
    pricing_title: "간단하고 투명한 가격",
    footer_region: "한국어 (대한민국)",
    footer_copy: "© 2026 365ShareHub Operations. 판권 소유.",
    badge_flexible: "유연한 플랜",
    badge_popular: "인기 선택",
    badge_best_value: "최고의 가치",
    plan_monthly: "월간 플랜",
    plan_semi: "반기 플랜",
    plan_annual: "연간 프로",
    tag_trial: "7일 무료 체험",
    tag_save_25: "25% 할인",
    tag_save_37: "37% 할인",
    feat_copilot: "Copilot 및 모든 앱 포함",
    feat_storage: "1TB OneDrive 스토리지",
    feat_devices: "5대 기기 연결",
    feat_platform: "PC, Mac, iOS 및 Android 지원",
    feat_pay_monthly: "언제든지 취소 가능",
    feat_save_semi: "월간 대비 25% 절약",
    feat_save_yearly: "월간 대비 37% 절약",
    btn_trial: "무료 체험 시작",
    btn_semi: "6개월 플랜 선택",
    btn_yearly: "연간 구독하기",
  },
  // 🇨🇳 简体中文
  zh: {
    hero_title_1: "解锁 Microsoft 365",
    hero_title_2: "Copilot 生产力。",
    hero_desc: "有 Copilot 在您身边，提升您的生产力。在一个计划中获得内置 AI 的领先应用、高级安全性和 1 TB 的超大云存储空间。",
    email_placeholder: "输入您的邮箱...",
    cta_start: "开始试用",
    hero_badge_1: "7天免费试用",
    hero_badge_2: "先使用，后付费",
    section_apps_title: "一个计划，满足所有需求",
    section_apps_desc: "获取您需要的高级应用、云存储和安全性。",
    pricing_promo: "以优惠的价格享受完整的 Microsoft 365 功能",
    pricing_title: "简单透明的定价",
    footer_region: "中文 (简体)",
    footer_copy: "© 2026 365ShareHub Operations. 保留所有权利。",
    badge_flexible: "灵活月付",
    badge_popular: "最受欢迎",
    badge_best_value: "超值首选",
    plan_monthly: "月度计划",
    plan_semi: "半年计划",
    plan_annual: "年度专业版",
    tag_trial: "7天免费试用",
    tag_save_25: "节省 25%",
    tag_save_37: "节省 37%",
    feat_copilot: "包含 Copilot 及所有应用",
    feat_storage: "1TB OneDrive 存储",
    feat_devices: "连接 5 台设备",
    feat_platform: "支持 PC, Mac, iOS & Android",
    feat_pay_monthly: "试用后付费，随时取消",
    feat_save_semi: "比月付节省 25%",
    feat_save_yearly: "比月付节省 37%",
    btn_trial: "开始免费试用",
    btn_semi: "选择半年付",
    btn_yearly: "订阅年付",
  },
  // 🇹🇼 繁体中文
  tw: {
    hero_title_1: "解鎖 Microsoft 365",
    hero_title_2: "Copilot 生產力。",
    hero_desc: "有 Copilot 在您身邊，提升您的生產力。在一個計劃中獲得內置 AI 的領先應用程式、高級安全性和 1 TB 的超大雲端存儲空間。",
    email_placeholder: "輸入您的電子郵件...",
    cta_start: "開始試用",
    hero_badge_1: "7天免費試用",
    hero_badge_2: "先使用，後付費",
    section_apps_title: "一個計劃，滿足所有需求",
    section_apps_desc: "獲取您需要的高級應用程式、雲端存儲和安全性。",
    pricing_promo: "以優惠的價格享受完整的 Microsoft 365 功能",
    pricing_title: "簡單透明的定價",
    footer_region: "中文 (繁體)",
    footer_copy: "© 2026 365ShareHub Operations. 保留所有權利。",
    badge_flexible: "靈活月付",
    badge_popular: "最受歡迎",
    badge_best_value: "超值首選",
    plan_monthly: "月度計劃",
    plan_semi: "半年計劃",
    plan_annual: "年度專業版",
    tag_trial: "7天免費試用",
    tag_save_25: "節省 25%",
    tag_save_37: "節省 37%",
    feat_copilot: "包含 Copilot 及所有應用程式",
    feat_storage: "1TB OneDrive 存儲空間",
    feat_devices: "連接 5 台設備",
    feat_platform: "支援 PC, Mac, iOS & Android",
    feat_pay_monthly: "試用後付費，隨時取消",
    feat_save_semi: "比月付節省 25%",
    feat_save_yearly: "比月付節省 37%",
    btn_trial: "開始免費試用",
    btn_semi: "選擇半年付",
    btn_yearly: "訂閱年付",
  }
};

// --- 2. 应用数据 ---
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

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = translations[lang] || translations["en"];
  const [user, setUser] = useState<any>(null);
  const [emailInput, setEmailInput] = useState("");
  const router = useRouter(); 
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
    
    const browserLang = navigator.language.slice(0, 2);
    if (!localStorage.getItem('lang')) {
       if (browserLang === 'zh') {
          if (navigator.language.toLowerCase().includes('tw') || navigator.language.toLowerCase().includes('hk')) {
             setLang('tw');
          } else {
             setLang('zh');
          }
       } else if (translations[browserLang]) {
          setLang(browserLang);
       }
    } else {
       const saved = localStorage.getItem('lang');
       if (saved && translations[saved]) setLang(saved);
    }
  }, []);

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

  const changeLanguage = (code: string) => {
    const map: any = {
      'us': 'en', 'uk': 'en', 'ca': 'en', 'au': 'en', 'sg': 'en',
      'de': 'de', 'at': 'de', 'ch': 'de',
      'fr': 'fr', 'be': 'fr',
      'es': 'es', 'mx': 'es',
      'it': 'it',
      'nl': 'nl',
      'pt': 'pt', 'br': 'pt',
      'cn': 'zh', 'tw': 'tw', 'hk': 'tw', 'asia_en': 'en',
      'jp': 'jp', 'kr': 'kr'
    };
    const targetLang = map[code] || 'en';
    setLang(targetLang);
    localStorage.setItem('lang', targetLang);
    document.cookie = `lang=${targetLang}; path=/; max-age=31536000`;
  };

  // Language Menu Component
  const LanguageMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-slate-800 transition-colors p-2 rounded-md hover:bg-slate-100">
            <Globe className="w-4 h-4"/> 
            <span className="text-xs font-medium uppercase">{lang}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[750px] grid grid-cols-3 gap-6 p-6 shadow-xl border-slate-100 rounded-xl">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Europe</DropdownMenuLabel>
            <DropdownMenuItem onClick={()=>changeLanguage('uk')} className="cursor-pointer">🇬🇧 English (UK)</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>changeLanguage('de')} className="cursor-pointer">🇩🇪 Deutsch</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>changeLanguage('fr')} className="cursor-pointer">🇫🇷 Français</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>changeLanguage('es')} className="cursor-pointer">🇪🇸 Español</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>changeLanguage('it')} className="cursor-pointer">🇮🇹 Italiano</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>changeLanguage('nl')} className="cursor-pointer">🇳🇱 Nederlands</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Asia Pacific</DropdownMenuLabel>
            <DropdownMenuItem onClick={()=>changeLanguage('asia_en')} className="cursor-pointer">🌏 English (Asia)</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>changeLanguage('jp')} className="cursor-pointer">🇯🇵 日本語</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>changeLanguage('kr')} className="cursor-pointer">🇰🇷 한국어</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>changeLanguage('cn')} className="cursor-pointer">🇨🇳 中文 (简体)</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>changeLanguage('tw')} className="cursor-pointer">🇹🇼 中文 (繁體)</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Americas</DropdownMenuLabel>
            <DropdownMenuItem onClick={()=>changeLanguage('us')} className="cursor-pointer">🇺🇸 English (US)</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>changeLanguage('ca')} className="cursor-pointer">🇨🇦 English (Canada)</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>changeLanguage('es')} className="cursor-pointer">🇲🇽 Español (México)</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>changeLanguage('pt')} className="cursor-pointer">🇧🇷 Português (Brasil)</DropdownMenuItem>
          </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="min-h-screen relative font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden bg-[#fafafa]">
      
      <div className="fixed top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/80 to-transparent -z-10 pointer-events-none"></div>

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <ModernLogo />
            <span className="font-bold text-xl tracking-tight hidden md:block text-slate-800">365ShareHub</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block border-r border-slate-200 pr-4 mr-1">
               <LanguageMenu />
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
                  <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer"><LayoutDashboard className="mr-2 h-4 w-4"/> Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"><LogOut className="mr-2 h-4 w-4"/> Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <button onClick={() => router.push("/login")} className="text-sm font-medium text-slate-600 hover:text-[#0078D4] transition hidden sm:block">Sign in</button>
                <Button onClick={() => router.push("/login")} className="bg-[#0078D4] text-white hover:bg-[#0060aa] rounded-full px-6 h-10 text-sm font-semibold shadow-md shadow-blue-200 transition-all hover:scale-105">Free Trial</Button>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="relative pt-24 pb-20 px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-slate-900 drop-shadow-sm">
            {t.hero_title_1}<br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0078D4] via-[#7048E8] to-[#0078D4] bg-[length:200%_auto] animate-gradient">{t.hero_title_2}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">{t.hero_desc}</p>
          <div className="max-w-md mx-auto relative group mt-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500 pointer-events-none"></div>
            <div className="relative flex bg-white rounded-full p-2 shadow-xl shadow-blue-100 group-hover:shadow-2xl transition-all border border-slate-100 items-center z-10">
              <Input type="email" placeholder={t.email_placeholder} value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="border-0 shadow-none bg-transparent focus-visible:ring-0 text-base pl-4 h-10" onKeyDown={(e) => e.key === 'Enter' && handleGetStarted()}/>
              <Button onClick={handleGetStarted} className="rounded-full px-6 bg-[#0078D4] hover:bg-[#0060aa] text-white font-medium h-10 transition-all whitespace-nowrap">{t.cta_start} <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </div>
            {/* 🔥 Updated Hero Badges */}
            <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-4">
               <span className="flex items-center"><Check className="w-3 h-3 mr-1 text-green-500"/> {t.hero_badge_1}</span>
               <span className="flex items-center"><Check className="w-3 h-3 mr-1 text-green-500"/> {t.hero_badge_2}</span>
            </p>
          </div>
        </div>
      </section>

      <section id="apps" className="py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.section_apps_title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.section_apps_desc}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {APPS_DATA.map((app: any) => (<AppCard key={app.id} item={app} />))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 relative bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-xl md:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#0078D4] via-[#7048E8] to-[#D13438] animate-gradient bg-[length:200%_auto]">{t.pricing_promo}</h3>
            <h2 className="text-xl font-semibold text-slate-600 mb-4">{t.pricing_title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* 1. Monthly */}
            <div className="group relative bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-[#0078D4] to-[#2b88d8] text-white py-1.5 text-center text-xs font-bold uppercase tracking-widest">{t.badge_flexible}</div>
              <div className="p-8 pt-12 flex flex-col h-full"> 
                <h3 className="text-lg font-medium text-slate-500 mb-4">{t.plan_monthly}</h3>
                <div className="flex items-baseline mb-6"><span className="text-4xl font-bold text-slate-900">€3.59</span><span className="text-slate-400 ml-1">/mo</span></div>
                <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg mb-8 border border-green-100 w-fit">{t.tag_trial}</div>
                <ul className="space-y-4 mb-8 text-sm flex-grow">
                  <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.feat_copilot}</li>
                  <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.feat_storage}</li>
                  <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.feat_platform}</li>
                  <li className="flex gap-3 text-slate-600 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.feat_devices}</li>
                  {/* 🔥 Modified Pay Later Text */}
                  <li className="flex gap-3 text-[#0078D4] font-extrabold items-center"><Check className="w-4 h-4 shrink-0 stroke-[3]"/> {t.feat_pay_monthly}</li>
                </ul>
                <Button onClick={() => handleNav(user ? "/dashboard?plan=monthly" : "/login")} className="w-full h-12 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0060aa] hover:from-[#0060aa] hover:to-[#005090] text-white font-bold text-base shadow-md transition-all mt-auto">{t.btn_trial}</Button>
              </div>
            </div>

            {/* 2. Semi-Annual */}
            <div className="group relative bg-white rounded-3xl border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
               <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white py-1.5 text-center text-xs font-bold uppercase tracking-widest">{t.badge_popular}</div>
              <div className="p-8 pt-12 flex flex-col h-full">
                <h3 className="text-lg font-bold text-slate-700 mb-4">{t.plan_semi}</h3>
                <div className="flex items-baseline mb-1"><span className="text-4xl font-bold text-slate-900">€17.90</span></div>
                <p className="text-sm font-medium text-green-600 mb-6">€2.98 / mo</p>
                <div className="flex gap-2 mb-8 flex-wrap">
                   <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-100 w-fit">{t.tag_trial}</div>
                   <div className="inline-block bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 w-fit">{t.tag_save_25}</div>
                </div>
                <ul className="space-y-4 mb-8 text-sm flex-grow">
                  <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.feat_copilot}</li>
                  <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.feat_storage}</li>
                  <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.feat_platform}</li>
                  <li className="flex gap-3 text-slate-700 items-center"><Check className="w-4 h-4 text-blue-500 shrink-0"/> {t.feat_devices}</li>
                  <li className="flex gap-3 text-slate-900 font-bold items-center"><Check className="w-4 h-4 text-green-500 shrink-0"/> {t.feat_save_semi}</li>
                </ul>
                <Button onClick={() => handleNav(user ? "/dashboard?plan=semi" : "/login")} className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold rounded-xl h-12 shadow-lg hover:shadow-xl transition-all text-base mt-auto">{t.btn_semi}</Button>
              </div>
            </div>

            {/* 3. Yearly */}
            <div className="relative group md:-translate-y-4 h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-[24px] blur opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none group-hover:scale-105"></div>
              <div className="relative bg-white rounded-[22px] shadow-2xl h-full flex flex-col border border-purple-100 transform transition-transform duration-300 group-hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold py-2 uppercase tracking-widest text-center">{t.badge_best_value}</div>
                <div className="p-8 pt-12 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">{t.plan_annual}</h3>
                  <div className="flex items-baseline mb-1"><span className="text-5xl font-extrabold text-slate-900">€29.90</span><span className="text-slate-400 ml-1">/yr</span></div>
                  <p className="text-sm font-bold text-pink-600 mb-6">Only €2.49 / mo</p>
                  <div className="flex gap-2 mb-8 flex-wrap">
                     <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-100 w-fit">{t.tag_trial}</div>
                     <div className="inline-block bg-pink-50 text-pink-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-pink-100 w-fit">{t.tag_save_37}</div>
                  </div>
                  <ul className="space-y-4 mb-8 text-sm font-medium flex-grow">
                    <li className="flex gap-3 items-center"><Sparkles className="w-5 h-5 text-purple-500 shrink-0"/> {t.feat_copilot}</li>
                    <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> {t.feat_storage}</li>
                    <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> {t.feat_platform}</li>
                    <li className="flex gap-3 items-center"><Check className="w-5 h-5 text-purple-500 shrink-0"/> {t.feat_devices}</li>
                    <li className="flex gap-3 p-3 bg-pink-50/50 rounded-xl border border-pink-100 font-bold text-slate-900 items-center"><Check className="w-5 h-5 text-red-500 shrink-0"/> {t.feat_save_yearly}</li>
                  </ul>
                  <div className="mt-auto">
                    <Button onClick={() => handleNav(user ? "/dashboard?plan=yearly" : "/login")} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold rounded-xl h-14 shadow-lg shadow-purple-200 text-lg transition-transform active:scale-95">{t.btn_yearly}</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer (Layout Updated & Socials Restored) --- */}
      <footer className="bg-slate-50 pt-16 pb-8 text-xs text-slate-500 border-t border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6">
          
          {/* 🔥 Restored Social Icons Section */}
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
                  <LanguageMenu />
               </div>
            </div>
            <div className="flex gap-6"><Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link><Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link><Link href="#" className="hover:text-blue-600 transition-colors">Sitemap</Link></div>
            <div>{t.footer_copy}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}