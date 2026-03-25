"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useLanguage, LanguageProvider } from "@/app/components/LanguageProvider";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { Suspense } from "react";

function PrivacyContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fafafa] relative py-12 px-6">
      
      {/* 右上角语言切换器 */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        <Link href="/" className="inline-flex items-center text-sm text-[#0078D4] hover:text-blue-800 mb-8 font-bold transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {t.auth.back_home || "Back to Home"}
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-50 text-[#0078D4] rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            {t.privacy?.title || "Privacy Policy"}
          </h1>
        </div>
        
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10 pb-6 border-b border-slate-100">
          {t.privacy?.last_updated || "LAST UPDATED: MARCH 2026"}
        </p>

        <div className="space-y-10 text-slate-600">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t.privacy?.s1_t || "1. Information We Collect"}</h2>
            <p className="leading-relaxed">{t.privacy?.s1_d || "We collect information that you provide directly to us when you use our services. This includes your email address (specifically your Microsoft account email) when you sign up for a trial or subscription. We use Stripe for payment processing and do not store your credit card information on our servers."}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t.privacy?.s2_t || "2. How We Use Your Information"}</h2>
            <p className="leading-relaxed">{t.privacy?.s2_d || "We use the information we collect to provide, maintain, and improve our services, including adding your account to our Premium Family Group, processing your transactions, sending you technical notices, and providing customer support."}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t.privacy?.s3_t || "3. Microsoft Account Security"}</h2>
            <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl">
                <p className="leading-relaxed text-blue-900/80">{t.privacy?.s3_d || "We do not require or ask for your Microsoft account password. You authenticate directly with Microsoft. We only need your email address to send the Family Group invitation. Your OneDrive data remains strictly private to you; administrators cannot access your personal files."}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t.privacy?.s4_t || "4. Third-Party Services"}</h2>
            <p className="leading-relaxed">{t.privacy?.s4_d || "We use Stripe to process payments securely. When you make a purchase, you are subject to Stripe's Privacy Policy and Terms of Service. We do not share your personal information with other third parties for marketing purposes."}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t.privacy?.s5_t || "5. Contact Us"}</h2>
            <p className="leading-relaxed">
              {t.privacy?.s5_d || "If you have any questions about this Privacy Policy, please contact us at support@365sharehub.com."}
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fafafa]"></div>}>
      <LanguageProvider>
        <PrivacyContent />
      </LanguageProvider>
    </Suspense>
  );
}