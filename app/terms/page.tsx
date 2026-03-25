"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { useLanguage, LanguageProvider } from "@/app/components/LanguageProvider";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { Suspense } from "react";

function TermsContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fafafa] relative py-12 px-6">
      
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
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            {t.terms?.title || "Terms of Service"}
          </h1>
        </div>
        
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10 pb-6 border-b border-slate-100">
          {t.terms?.last_updated || "LAST UPDATED: MARCH 2026"}
        </p>

        <div className="space-y-10 text-slate-600">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t.terms?.s1_t || "1. Acceptance of Terms"}</h2>
            <p className="leading-relaxed">{t.terms?.s1_d || "By accessing and using 365ShareHub, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our service."}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t.terms?.s2_t || "2. Description of Service"}</h2>
            <p className="leading-relaxed">{t.terms?.s2_d || "We provide an automated sharing service for Microsoft 365 Family subscriptions. We are an independent service and are not affiliated with, endorsed by, or sponsored by Microsoft Corporation."}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t.terms?.s3_t || "3. User Responsibilities"}</h2>
            <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl">
                <p className="leading-relaxed text-blue-900/80">{t.terms?.s3_d || "You must provide a valid Microsoft account email to receive the invitation. You agree not to misuse the service or violate Microsoft's own terms of use."}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t.terms?.s4_t || "4. Billing and Cancellation"}</h2>
            <p className="leading-relaxed">{t.terms?.s4_d || "Subscriptions are billed in advance on a recurring basis. You may cancel your subscription at any time through your dashboard. Cancellations take effect at the end of the current billing cycle."}</p>
          </section>
        </div>

      </div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fafafa]"></div>}>
      <LanguageProvider>
        <TermsContent />
      </LanguageProvider>
    </Suspense>
  );
}