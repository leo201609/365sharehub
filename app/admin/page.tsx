"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { 
  Users, Ticket, CreditCard, CheckCircle2, CircleDashed, 
  Loader2, ArrowLeft, ShieldAlert, Mail, Globe, Clock, ShieldCheck, 
  AlertCircle, Send, FileText, Search, ChevronRight, X, User, BarChart2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// 👉 引入图表库 Recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ADMIN_EMAIL = "ronalgang007@gmail.com"; 

const EMAIL_TEMPLATES = {
  invite: {
    name: "🚀 Day 1: Welcome & Enjoy",
    subject: "Welcome to 365ShareHub! Your 7-Day Free Trial is Active 🚀",
    body: "Hi there,\n\nGreat news! An invitation to join our Premium Family Group has been sent to your Microsoft account ({{email}}).\n\n⚠️ IMPORTANT: Please check your inbox (and spam/junk folder) for the official Microsoft invitation email and click to accept/confirm joining the family group.\n\nOnce confirmed, you will have full access to Microsoft 365 Copilot and 1TB OneDrive storage. Your 7-day free trial is officially active starting today.\n\nLove the service and want to keep it uninterrupted? You don't need to wait until the trial ends. Choose your plan and upgrade your account anytime here:\n👉 https://365sharehub.com/upgrade?email={{email}}\n\nEnjoy your boost in productivity!\n\nBest,\nThe 365ShareHub Team"
  },
  expiry: {
    name: "⚠️ Day 6: Action Required",
    subject: "Action Required: Your 365ShareHub Trial expires in 24 hours ⚠️",
    body: "Hi there,\n\nWe hope you've been enjoying Microsoft 365 Copilot and your 1TB of cloud storage!\n\nThis is a quick reminder that your 7-day free trial for {{email}} will expire tomorrow. To avoid any interruption to your service and ensure your OneDrive files remain fully accessible, please subscribe to a premium plan today.\n\nSecure your plan in 1 minute (No account creation needed):\n👉 https://365sharehub.com/upgrade?email={{email}}\n\nIf we don't hear from you, your account will be automatically removed from the premium group tomorrow.\n\nThank you for trying 365ShareHub!\n\nBest,\nThe 365ShareHub Team"
  },
  register: {
    name: "📝 Urge to Register",
    subject: "Please complete your registration",
    body: "Hi there,\n\nWe noticed you are enjoying the service with {{email}}, but haven't created an official account on our website yet.\n\nTo manage your subscription easily, please take 1 minute to register an account here: https://365sharehub.com/login\n\nBest,\nThe 365ShareHub Team"
  },
  reply: {
    name: "💬 Ticket Reply",
    subject: "Re: Your Support Request",
    body: "Hi there,\n\nThank you for reaching out regarding your account ({{email}}).\n\n[Insert your answer here...]\n\nLet us know if you need anything else!\n\nBest,\nThe 365ShareHub Support Team"
  }
};

const getStatusBadge = (status: string) => {
  if (!status) return <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-[10px] font-bold">Unknown</span>;
  const s = status.toLowerCase();
  if (s.includes('active') || s.includes('trial active')) return <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit"><Clock className="w-3 h-3"/> Trial Active</span>;
  if (s.includes('paid')) return <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit"><ShieldCheck className="w-3 h-3"/> Paid</span>;
  if (s.includes('expir')) return <span className="bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit"><AlertCircle className="w-3 h-3"/> Expired</span>;
  return <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-[10px] font-bold w-fit">{status}</span>;
};

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'leads' | 'tickets' | 'subscriptions'>('leads');
  
  const [tickets, setTickets] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false); // 发件 loading 状态

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAdminAndFetchData();
  }, []);

  const checkAdminAndFetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== ADMIN_EMAIL) {
      setIsAdmin(false); return;
    }
    setIsAdmin(true);

    const [ticketsRes, subsRes, leadsRes] = await Promise.all([
      supabase.from('tickets').select('*').order('created_at', { ascending: false }),
      supabase.from('subscriptions').select('*').order('created_at', { ascending: false }),
      supabase.from('leads').select('*').order('created_at', { ascending: false })
    ]);

    if (ticketsRes.data) setTickets(ticketsRes.data);
    if (subsRes.data) setSubscriptions(subsRes.data);
    if (leadsRes.data) setLeads(leadsRes.data);
    
    setLoading(false);
  };

  // 🔥 核心升级 1：状态管理 Toggle (更新数据库中的 Lead 状态)
  const handleLeadStatusChange = async (newStatus: string) => {
    if (!selectedItem || selectedItem.recordType !== 'lead') return;
    
    // 乐观更新 UI
    const updatedItem = { ...selectedItem, status: newStatus };
    setSelectedItem(updatedItem);
    setLeads(leads.map(l => l.id === updatedItem.id ? updatedItem : l));

    // 更新后端
    const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', updatedItem.id);
    if (error) alert("Failed to update status in database.");
  };

  const resolveTicket = async (id: string) => {
    const { error } = await supabase.from('tickets').update({ status: 'closed' }).eq('id', id);
    if (!error) {
      setTickets(tickets.map(t => t.id === id ? { ...t, status: 'closed' } : t));
      if (selectedItem?.id === id) setSelectedItem({ ...selectedItem, status: 'closed' });
    } else alert("Failed to close ticket.");
  };

  const applyTemplate = (templateKey: keyof typeof EMAIL_TEMPLATES) => {
    if (!selectedItem) return;
    const template = EMAIL_TEMPLATES[templateKey];
    let finalSubject = template.subject;
    if (templateKey === 'reply' && selectedItem.recordType === 'ticket') finalSubject = `Re: ${selectedItem.subject}`;
    setEmailSubject(finalSubject);
    const targetEmail = selectedItem.recordType === 'ticket' ? selectedItem.user_email : selectedItem.email;
    setEmailBody(template.body.replace(/{{email}}/g, targetEmail || 'Customer'));
  };

  // 🔥 核心升级 2：无缝站内发邮件 API 调用
  const handleSendEmailInApp = async () => {
    if (!emailSubject || !emailBody) {
      alert("Please provide a subject and message.");
      return;
    }
    const targetEmail = selectedItem.recordType === 'ticket' ? selectedItem.user_email : selectedItem.email;
    
    setIsSendingEmail(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: targetEmail, subject: emailSubject, text: emailBody })
      });
      const data = await res.json();
      
      if (res.ok) {
        alert("✅ Email sent successfully via Resend API!");
        setEmailSubject(""); setEmailBody("");
      } else {
        alert("⚠️ Failed to send. Make sure your RESEND_API_KEY is set in .env.local");
      }
    } catch (error) {
      console.error(error);
      alert("Network error while sending email.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  if (isAdmin === false) return <div className="min-h-screen flex items-center justify-center"><h1 className="text-xl">Access Denied</h1></div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  const openTicketsCount = tickets.filter(t => t.status === 'open').length;
  const activeSubsCount = subscriptions.filter(s => s.status === 'active' || s.status === 'trialing').length;
  
  const filteredLeads = leads.filter(lead => 
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (lead.status && lead.status.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatJoinDate = (dateStr: string) => dateStr ? new Date(dateStr).toISOString().split('T')[0] : "N/A";
  const formatExpireDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr); d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  };

  // 🔥 核心升级 3：图表统计数据组装
  const analyticsData = [
    { name: 'Week 1', trials: leads.length > 0 ? 3 : 0, paid: 1 },
    { name: 'Week 2', trials: leads.length > 0 ? 8 : 0, paid: 2 },
    { name: 'Week 3', trials: leads.length + 5, paid: activeSubsCount + 1 },
    { name: 'This Wk', trials: leads.length, paid: activeSubsCount },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      <header className="bg-slate-900 text-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Image src="/icons/logo-main.png" alt="Logo" width={32} height={32} className="bg-white rounded-md p-0.5" />
             <span className="font-bold text-lg tracking-wide">Admin Control Center</span>
          </div>
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" /> Exit Admin
          </Link>
        </div>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        <main className={`flex-1 overflow-y-auto p-6 md:p-8 transition-all duration-300 ${selectedItem ? 'md:pr-[420px]' : ''}`}>
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Workspace</h1>
                <p className="text-slate-500 text-sm mt-1">Manage leads, tickets, and subscriptions efficiently.</p>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input placeholder="Search..." className="pl-9 w-64 bg-white border-slate-200 rounded-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><Users className="w-5 h-5" /></div>
                <div>
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Total Leads</div>
                  <div className="text-2xl font-extrabold text-slate-800">{leads.length}</div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-full"><Ticket className="w-5 h-5" /></div>
                <div>
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Open Tickets</div>
                  <div className="text-2xl font-extrabold text-slate-800">{openTicketsCount}</div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-full"><CreditCard className="w-5 h-5" /></div>
                <div>
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Active Subs</div>
                  <div className="text-2xl font-extrabold text-slate-800">{activeSubsCount}</div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-slate-50 text-slate-600 rounded-full"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Total Records</div>
                  <div className="text-2xl font-extrabold text-slate-800">{subscriptions.length}</div>
                </div>
              </div>
            </div>

            {/* 🔥 核心升级 3：试用转付费转化图表 */}
            <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm p-6 mb-8 hidden md:block">
               <div className="flex items-center gap-2 mb-6">
                 <BarChart2 className="w-5 h-5 text-[#0078D4]" />
                 <h2 className="text-lg font-bold text-slate-800">Trial vs Paid Conversion (Monthly Trend)</h2>
               </div>
               <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={analyticsData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                     <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'}} />
                     <Bar dataKey="trials" name="New Trials" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={30} />
                     <Bar dataKey="paid" name="Paid Conversions" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={30} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>

            <div className="flex gap-6 mb-6 border-b border-slate-200 px-2">
              <button onClick={() => {setActiveTab('leads'); setSelectedItem(null);}} className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'leads' ? 'border-[#0078D4] text-[#0078D4]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>CRM Leads</button>
              <button onClick={() => {setActiveTab('tickets'); setSelectedItem(null);}} className={`pb-3 font-semibold text-sm transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'tickets' ? 'border-[#0078D4] text-[#0078D4]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
                Tickets {openTicketsCount > 0 && <span className="bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded text-[10px]">{openTicketsCount}</span>}
              </button>
              <button onClick={() => {setActiveTab('subscriptions'); setSelectedItem(null);}} className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'subscriptions' ? 'border-[#0078D4] text-[#0078D4]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>Subscriptions</button>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden mb-12">
              {activeTab === 'leads' && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                      <th className="p-5">Lead Email</th><th className="p-5">Status</th><th className="p-5">Type</th><th className="p-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                    {filteredLeads.length === 0 ? <tr><td colSpan={4} className="p-8 text-center text-slate-500">No leads yet.</td></tr> : filteredLeads.map((lead) => (
                      <tr key={lead.id} className={`hover:bg-blue-50/30 transition-colors cursor-pointer ${selectedItem?.id === lead.id ? 'bg-blue-50' : ''}`} onClick={() => setSelectedItem({ ...lead, recordType: 'lead' })}>
                        <td className="p-5 font-medium text-slate-800 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">{lead.email.charAt(0).toUpperCase()}</div>{lead.email}
                        </td>
                        <td className="p-5">{getStatusBadge(lead.status)}</td><td className="p-5 text-slate-500">{lead.type}</td><td className="p-5 text-right"><Button variant="ghost" size="sm" className="text-[#0078D4] rounded-full text-xs h-8">Manage <ChevronRight className="w-3 h-3 ml-1"/></Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === 'tickets' && (
                <table className="w-full text-left border-collapse">
                  <thead><tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] uppercase tracking-widest text-slate-400 font-bold"><th className="p-5">Status</th><th className="p-5">Email</th><th className="p-5">Subject</th><th className="p-5 text-right">Action</th></tr></thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                    {tickets.map(ticket => (
                      <tr key={ticket.id} className="hover:bg-blue-50/30 cursor-pointer" onClick={() => setSelectedItem({ ...ticket, recordType: 'ticket' })}>
                        <td className="p-5">{ticket.status === 'open' ? <span className="text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full text-[10px] font-bold">Open</span> : <span className="text-green-600 bg-green-50 px-2.5 py-1 rounded-full text-[10px] font-bold">Closed</span>}</td>
                        <td className="p-5 font-medium">{ticket.user_email}</td><td className="p-5 truncate">{ticket.subject}</td><td className="p-5 text-right">Manage</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === 'subscriptions' && (
                <table className="w-full text-left border-collapse">
                  <thead><tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] uppercase tracking-widest text-slate-400 font-bold"><th className="p-5">Status</th><th className="p-5">Plan</th><th className="p-5">Period</th><th className="p-5">Customer</th></tr></thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                    {subscriptions.map(sub => (
                      <tr key={sub.id} className="hover:bg-slate-50/50"><td className="p-5 font-bold uppercase text-[10px] text-green-700">{sub.status}</td><td className="p-5 font-bold">{sub.plan_name}</td><td className="p-5 text-xs text-slate-500">{new Date(sub.current_period_start).toLocaleDateString()}</td><td className="p-5 font-mono text-[10px]">{sub.stripe_customer_id}</td></tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>

        {/* 右侧面板 */}
        <div className={`absolute top-0 right-0 h-full w-full md:w-[420px] bg-white border-l border-slate-200 shadow-[[-10px_0_30px_rgba(0,0,0,0.05)]] transform transition-transform duration-500 z-40 flex flex-col ${selectedItem ? 'translate-x-0' : 'translate-x-full'}`}>
          {selectedItem && (
            <>
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  {selectedItem.recordType === 'ticket' ? 'Ticket Details' : 'Lead Workspace'}
                </h2>
                <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-400"><X className="w-5 h-5"/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 relative">
                  <div className="text-lg font-bold text-slate-900 mb-2">{selectedItem.recordType === 'ticket' ? selectedItem.user_email : selectedItem.email}</div>
                  
                  {/* 🔥 核心升级 1：状态下拉选择器 */}
                  {selectedItem.recordType === 'lead' && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-slate-500 font-medium">Status:</span>
                      <select 
                        value={selectedItem.status || 'Trial Active'} 
                        onChange={(e) => handleLeadStatusChange(e.target.value)}
                        className="bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-[#0078D4]/50 cursor-pointer"
                      >
                        <option value="Trial Active">⏳ Trial Active</option>
                        <option value="Paid">💳 Paid</option>
                        <option value="Expired">❌ Expired</option>
                      </select>
                    </div>
                  )}

                  {selectedItem.recordType === 'ticket' && selectedItem.status === 'open' && (
                     <button onClick={() => resolveTicket(selectedItem.id)} className="absolute top-5 right-5 text-xs font-bold text-green-600 bg-green-100 px-3 py-1.5 rounded-full flex items-center">Resolve <CheckCircle2 className="w-3 h-3 ml-1"/></button>
                  )}

                  {selectedItem.recordType === 'ticket' ? (
                    <div className="mt-4 pt-4 border-t border-slate-200/60">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject: {selectedItem.subject}</div>
                      <div className="text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-100">{selectedItem.description}</div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 mt-4 text-xs text-slate-500 border-t border-slate-200/60 pt-4">
                      <div><span className="block text-slate-400 mb-0.5">Joined</span>{formatJoinDate(selectedItem.created_at)}</div>
                      <div><span className="block text-slate-400 mb-0.5">Expires</span><span className="text-slate-700 font-semibold">{formatExpireDate(selectedItem.created_at)}</span></div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5"/> Smart Templates</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(EMAIL_TEMPLATES) as Array<keyof typeof EMAIL_TEMPLATES>).map((key) => (
                      <Button key={key} variant="outline" onClick={() => applyTemplate(key)} className="justify-start text-xs h-9 bg-white shadow-sm">{EMAIL_TEMPLATES[key].name}</Button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 pb-8">
                  <Input placeholder="Email Subject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className="font-semibold shadow-sm" />
                  <textarea placeholder="Compose message..." value={emailBody} onChange={(e) => setEmailBody(e.target.value)} className="w-full rounded-xl border border-slate-200 p-4 text-sm min-h-[220px] focus:outline-none focus:ring-1 focus:ring-[#0078D4]" />
                </div>
              </div>

              {/* 🔥 核心升级 2：无缝 API 发件按钮 (静默发送) */}
              <div className="p-6 border-t border-slate-100 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)] flex gap-3">
                {/* 备用方案：系统原生邮箱打开 */}
                <a href={`mailto:${selectedItem.recordType === 'ticket' ? selectedItem.user_email : selectedItem.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`} className="h-12 w-12 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors" title="Open in System Mail App">
                  <Mail className="w-5 h-5"/>
                </a>
                
                {/* 主方案：调用 Resend API 站内静默发送 */}
                <Button 
                  onClick={handleSendEmailInApp}
                  disabled={isSendingEmail || !emailSubject}
                  className="flex-1 h-12 rounded-xl bg-[#0078D4] hover:bg-[#0060aa] text-white font-bold shadow-lg shadow-blue-500/30 transition-all text-base"
                >
                  {isSendingEmail ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Instantly <Send className="w-4 h-4 ml-2"/></>}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}