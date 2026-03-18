import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6 font-sans text-slate-700">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Terms of Service</h1>
        </div>
        
        <p className="mb-10 text-sm font-medium text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-6">Last updated: March 2026</p>
        
        <div className="space-y-10 text-base leading-loose text-slate-600">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using 365ShareHub, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
            <p>365ShareHub provides access to Microsoft 365 Copilot and 1TB OneDrive storage by inviting your Microsoft account to our Premium Family Group. We manage the group subscription and billing on your behalf.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Subscription and Billing</h2>
            <p>Services are billed on a subscription basis (Monthly, Semi-Annual, or Annual). You will be billed in advance on a recurring schedule. You can cancel your subscription at any time through your dashboard or the Stripe Customer Portal. There are no refunds for partial billing periods.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Acceptable Use</h2>
            <p>You agree not to use the service for any illegal or unauthorized purpose. You must comply with all Microsoft Terms of Service when using Microsoft products accessed through our family group.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Disclaimer and Non-Affiliation</h2>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <p className="text-slate-700 font-medium mb-0">365ShareHub is an independent group-sharing management service and is <strong className="text-slate-900">NOT affiliated with, endorsed by, or sponsored by Microsoft Corporation</strong>. "Microsoft 365", "Copilot", and "OneDrive" are trademarks of Microsoft Corporation.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}