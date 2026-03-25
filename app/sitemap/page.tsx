"use client";

import Link from "next/link";
import { ArrowLeft, Map } from "lucide-react";
import { useLanguage, LanguageProvider } from "@/app/components/LanguageProvider";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { Suspense } from "react";

function SitemapContent() {
  const { t } = useLanguage();

  const links = [
    { name: t.sitemap_page?.home || "Home", path: "/" },
    { name: t.sitemap_page?.pricing || "Pricing", path: "/#pricing" },
    { name: t.sitemap_page?.faq || "FAQ", path: "/#faq" },
    { name: t.sitemap_page?.sign_in || "Sign In", path: "/login" },
    { name: t.sitemap_page?.sign_up || "Sign Up", path: "/register" },
    { name: t.sitemap_page?.dashboard || "Dashboard", path: "/dashboard" },
    { name: t.sitemap_page?.privacy || "Privacy Policy", path: "/privacy" },
    { name: t.sitemap_page?.terms || "Terms of Service", path: "/terms" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] relative py-12 px-6">
      
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        <Link href="/" className="inline-flex items-center text-sm text-[#0078D4] hover:text-blue-800 mb-8 font-bold transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {t.auth.back_home || "Back to Home"}
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-50 text-[#0078D4] rounded-xl flex items-center justify-center">
            <Map className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            {t.sitemap_page?.title || "Sitemap"}
          </h1>
        </div>
        
        <p className="text-slate-500 mb-10 pb-6 border-b border-slate-100">
          {t.sitemap_page?.desc || "Navigate through 365ShareHub."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((link, index) => (
            <Link 
              key={index} 
              href={link.path}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-100 transition-colors flex items-center text-slate-700 hover:text-[#0078D4] font-medium"
            >
              <div className="w-2 h-2 rounded-full bg-[#0078D4] mr-3 opacity-50"></div>
              {link.name}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

export default function SitemapPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fafafa]"></div>}>
      <LanguageProvider>
        <SitemapContent />
      </LanguageProvider>
    </Suspense>
  );
}