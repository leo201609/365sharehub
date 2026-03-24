"use client";

import Link from 'next/link';
import { Mail } from 'lucide-react';

// --- 社交媒体图标 (SVG) ---
const TelegramIcon = ({className}: {className?: string}) => (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>);

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-10 pb-8 text-sm text-slate-500 border-t border-slate-200 mt-auto">
      <div className="max-w-[1600px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            
            {/* 社区与联系邮箱 */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="https://t.me/ShareHub365" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc] hover:text-white px-5 py-2.5 rounded-full transition-all duration-300 group shadow-sm hover:shadow-md border border-[#0088cc]/20"
              >
                <TelegramIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-bold tracking-wide">Join Community</span>
              </a>
              
              <div className="flex items-center gap-2 sm:border-l sm:border-slate-200 sm:pl-5 mt-2 sm:mt-0 text-slate-400 hover:text-slate-700 transition-colors">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@365sharehub.com" className="font-medium hover:underline">
                  support@365sharehub.com
                </a>
              </div>
            </div>

            {/* 支付徽章 */}
            <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-slate-400">
              <span className="font-bold mr-3 uppercase tracking-widest text-[10px]">Secure Payment</span>
              <div className="h-6 px-2 bg-[#1A1F71] rounded flex items-center justify-center text-[9px] font-bold text-white italic tracking-wider" title="Visa">VISA</div>
              <div className="h-6 px-2 bg-[#FF5F00] rounded flex items-center justify-center text-[9px] font-bold text-white" title="MasterCard">MasterCard</div>
              <div className="h-6 px-2 bg-[#2E77BC] rounded flex items-center justify-center text-[9px] font-bold text-white tracking-wide" title="American Express">AMEX</div>
              <div className="h-6 px-2 bg-[#FFB3C7] rounded flex items-center justify-center text-[9px] font-bold text-black" title="Klarna">Klarna</div>
              <div className="h-6 px-2 bg-[#0079C1] rounded flex items-center justify-center text-[9px] font-bold text-white italic" title="PayPal">PayPal</div>
              <div className="h-6 px-2 bg-black rounded flex items-center justify-center text-[10px] font-bold text-white tracking-wide" title="Apple Pay">Apple Pay</div>
              <div className="h-6 px-2 bg-white border border-slate-200 rounded flex items-center justify-center text-[9px] font-bold text-slate-700 tracking-wide" title="Google Pay">Google Pay</div>
              <div className="h-6 px-2 bg-[#00529C] rounded flex items-center justify-center text-[9px] font-bold text-white" title="SEPA Direct Debit">SEPA</div>
            </div>
        </div>

        <div className="w-full h-px bg-slate-200 mb-8"></div>

        {/* 底部链接与版权 (删除了语言切换，完全居中对齐) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-6 font-medium">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-blue-600 transition-colors">Sitemap</Link>
          </div>
          <div>© {new Date().getFullYear()} 365ShareHub. All rights reserved.</div>
        </div>

      </div>
    </footer>
  );
}