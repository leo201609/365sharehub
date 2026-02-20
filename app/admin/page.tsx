"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { 
  Users, Ticket, CreditCard, CheckCircle2, CircleDashed, 
  Loader2, ArrowLeft, ShieldAlert, Mail
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ⚠️ 极其重要：将这里替换为你用来当管理员的真实登录邮箱
const ADMIN_EMAIL = "ronalgang007@gmail.com"; 

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'tickets' | 'subscriptions'>('tickets');
  
  const [tickets, setTickets] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAdminAndFetchData();
  }, []);

  const checkAdminAndFetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    // 权限校验拦截 (非管理员会被挡在门外)
    if (!user || user.email !== ADMIN_EMAIL) {
      setIsAdmin(false);
      return;
    }
    
    setIsAdmin(true);

    // 拉取全站工单和订阅数据
    const [ticketsRes, subsRes] = await Promise.all([
      supabase.from('tickets').select('*').order('created_at', { ascending: false }),
      supabase.from('subscriptions').select('*').order('created_at', { ascending: false })
    ]);

    if (ticketsRes.data) setTickets(ticketsRes.data);
    if (subsRes.data) setSubscriptions(subsRes.data);
    
    setLoading(false);
  };

  // 标记工单为已解决
  const resolveTicket = async (id: string) => {
    const { error } = await supabase
      .from('tickets')
      .update({ status: 'closed' })
      .eq('id', id);

    if (!error) {
      setTickets(tickets.map(t => t.id === id ? { ...t, status: 'closed' } : t));
    } else {
      alert("Failed to close ticket.");
    }
  };

  if (isAdmin === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-slate-900">Access Denied</h1>
        <p className="text-slate-500 mt-2 mb-6">You do not have permission to view this page.</p>
        <button onClick={() => router.push('/dashboard')} className="text-blue-600 font-medium hover:underline">Return to Dashboard</button>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  const openTicketsCount = tickets.filter(t => t.status === 'open').length;
  const activeSubsCount = subscriptions.filter(s => s.status === 'active' || s.status === 'trialing').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 顶部导航 */}
      <header className="bg-slate-900 text-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Image src="/icons/logo-main.png" alt="Logo" width={32} height={32} className="bg-white rounded-md p-0.5" />
             <span className="font-bold text-lg tracking-wide">Admin Portal</span>
          </div>
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" /> Exit Admin
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* 数据统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-orange-100 text-orange-600 rounded-full"><Ticket className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase">Pending Tickets</p>
              <h3 className="text-3xl font-bold text-slate-900">{openTicketsCount}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-green-100 text-green-600 rounded-full"><CreditCard className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase">Active Subs</p>
              <h3 className="text-3xl font-bold text-slate-900">{activeSubsCount}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full"><Users className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase">Total Records</p>
              <h3 className="text-3xl font-bold text-slate-900">{subscriptions.length}</h3>
            </div>
          </div>
        </div>

        {/* 标签页切换 */}
        <div className="flex gap-4 mb-6 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('tickets')}
            className={`pb-3 px-2 font-medium text-sm transition-colors border-b-2 ${activeTab === 'tickets' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Support Tickets
          </button>
          <button 
            onClick={() => setActiveTab('subscriptions')}
            className={`pb-3 px-2 font-medium text-sm transition-colors border-b-2 ${activeTab === 'subscriptions' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            All Subscriptions
          </button>
        </div>

        {/* 内容列表区 */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          
          {/* 客服工单表 */}
          {activeTab === 'tickets' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                    <th className="p-4 font-medium whitespace-nowrap">Status</th>
                    <th className="p-4 font-medium whitespace-nowrap">User Email</th>
                    <th className="p-4 font-medium whitespace-nowrap">Subject</th>
                    <th className="p-4 font-medium">Message</th>
                    <th className="p-4 font-medium whitespace-nowrap">Date</th>
                    <th className="p-4 font-medium text-right whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.length === 0 ? (
                    <tr><td colSpan={6} className="p-8 text-center text-slate-500">No tickets found.</td></tr>
                  ) : (
                    tickets.map(ticket => (
                      <tr key={ticket.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition">
                        <td className="p-4">
                          {ticket.status === 'open' 
                            ? <span className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2 py-1 rounded text-xs font-bold w-fit"><CircleDashed className="w-3 h-3"/> Open</span>
                            : <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold w-fit"><CheckCircle2 className="w-3 h-3"/> Closed</span>
                          }
                        </td>
                        <td className="p-4 text-sm font-medium">{ticket.user_email || 'Unknown'}</td>
                        <td className="p-4 text-sm font-bold text-slate-800 whitespace-nowrap">{ticket.subject}</td>
                        <td className="p-4 text-sm text-slate-600 max-w-xs truncate" title={ticket.description}>{ticket.description}</td>
                        <td className="p-4 text-xs text-slate-400 whitespace-nowrap">{new Date(ticket.created_at).toLocaleDateString()}</td>
                        <td className="p-4 text-right">
                          {ticket.status === 'open' ? (
                            <div className="flex justify-end gap-2">
                              {/* 唤起本地邮件客户端 */}
                              <a href={`mailto:${ticket.user_email}?subject=RE: ${ticket.subject}`} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition" title="Reply via Email">
                                <Mail className="w-4 h-4" />
                              </a>
                              {/* 标记为已解决 */}
                              <button onClick={() => resolveTicket(ticket.id)} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition" title="Mark as Resolved">
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 font-medium px-2">Resolved</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* 订阅订单表 */}
          {activeTab === 'subscriptions' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                    <th className="p-4 font-medium whitespace-nowrap">Status</th>
                    <th className="p-4 font-medium whitespace-nowrap">Stripe Customer ID</th>
                    <th className="p-4 font-medium whitespace-nowrap">Plan Name</th>
                    <th className="p-4 font-medium whitespace-nowrap">Current Period Start</th>
                    <th className="p-4 font-medium whitespace-nowrap">Current Period End</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.length === 0 ? (
                    <tr><td colSpan={5} className="p-8 text-center text-slate-500">No subscriptions found.</td></tr>
                  ) : (
                    subscriptions.map(sub => (
                      <tr key={sub.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition text-sm">
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase whitespace-nowrap ${
                            sub.status === 'active' ? 'bg-green-100 text-green-700' :
                            sub.status === 'trialing' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-xs text-slate-500 whitespace-nowrap">{sub.stripe_customer_id || 'N/A'}</td>
                        <td className="p-4 font-semibold text-slate-800 whitespace-nowrap">{sub.plan_name}</td>
                        <td className="p-4 text-slate-600 whitespace-nowrap">{new Date(sub.current_period_start).toLocaleDateString()}</td>
                        <td className="p-4 text-slate-600 whitespace-nowrap">{new Date(sub.current_period_end).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}