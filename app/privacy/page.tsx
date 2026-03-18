import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6 font-sans text-slate-700">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Privacy Policy</h1>
        </div>
        
        <p className="mb-10 text-sm font-medium text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-6">Last updated: March 2026</p>
        
        <div className="space-y-10 text-base leading-loose text-slate-600">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us when you use our services. This includes your email address (specifically your Microsoft account email) when you sign up for a trial or subscription. We use Stripe for payment processing and <strong className="text-slate-900">do not store your credit card information</strong> on our servers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, including adding your account to our Premium Family Group, processing your transactions, sending you technical notices, and providing customer support.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Microsoft Account Security</h2>
            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl">
              <p className="text-blue-900 mb-0">We do not require or ask for your Microsoft account password. You authenticate directly with Microsoft. We only need your email address to send the Family Group invitation. Your OneDrive data remains strictly private to you; administrators cannot access your personal files.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Third-Party Services</h2>
            <p>We use Stripe to process payments securely. When you make a purchase, you are subject to Stripe's Privacy Policy and Terms of Service. We do not share your personal information with other third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@365sharehub.com" className="text-blue-600 font-semibold hover:underline">support@365sharehub.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}