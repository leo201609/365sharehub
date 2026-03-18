import Link from 'next/link';
import { ArrowLeft, Map } from 'lucide-react';

export default function Sitemap() {
const links = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
    { name: "Dashboard (Members Only)", path: "/dashboard" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    // 删除了 Impressum 这一行
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6 font-sans text-slate-700">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-6">
          <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><Map className="w-8 h-8" /></div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Sitemap</h1>
        </div>

        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.path}>
              <Link href={link.path} className="text-lg font-medium text-slate-600 hover:text-[#0078D4] hover:underline transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}