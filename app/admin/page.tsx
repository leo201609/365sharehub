"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { 
  Users, Ticket, CreditCard, CheckCircle2, CircleDashed, 
  Loader2, ArrowLeft, ShieldAlert, Mail, Globe, Clock, ShieldCheck, 
  AlertCircle, Send, FileText, Search, Filter, MessageSquare, ChevronRight, X 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// 👉 修复：新增引入 UI 组件
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ⚠️ 极其重要：将这里替换为你用来当管理员的真实登录邮箱
const ADMIN_EMAIL = "ronalgang007@gmail.com"; 

// --- 1. 模拟 Leads 数据 (无注册游客/试用线索) ---
// 未来你可以把这些数据存入 Supabase 的 leads 表单
const MOCK_LEADS = [
  { id: 'l1', email: "ronalgang007@gmail.com", type: "Guest Lead", status: "Trial Active", region: "🇩🇪 Germany", lastMessage: "None", joinDate: "2026-03-18", expiresAt: "2026-03-25" },
  { id: 'l2', email: "alex.smith_88@outlook.com", type: "Registered", status: "Paid Monthly", region: "🇬🇧 UK", lastMessage: "How do I add my iPad?", joinDate: "2026-03-15", expiresAt: "2026-04-15" },
  { id: 'l3', email: "marie_dubois@hotmail.com", type: "Guest Lead", status: "Expiring Soon", region: "🇫🇷 France", lastMessage: "Is this safe?", joinDate: "2026-03-12", expiresAt: "2026-03-19" },
];

// --- 2. 快捷回复模板 (带动态变量) ---
const EMAIL_TEMPLATES = {
  invite: {
    name: "🚀 Trial Invitation",
    subject: "Welcome! Your 365ShareHub Trial is Active",
    body: "Hi there,\n\nGreat news! Your Microsoft account ({{email}}) has been successfully added to our Premium Family Group.\n\nYou now have full access to Microsoft 365 Copilot and 1TB OneDrive storage. Your 7-day free trial is officially active.\n\nEnjoy!\n\nThe 365ShareHub Team"
  },
  expiry: {
    name: "⚠️ Expiry Prompt",
    subject: "Action Required: Trial Expiring Soon",
    body: "Hi there,\n\nWe hope you are enjoying your Microsoft 365 features! This is a quick reminder that the trial for {{email}} expires in 24 hours.\n\nTo avoid any interruption to your service, please subscribe to a premium plan today using this secure link: https://365sharehub.com/#pricing\n\nBest,\nThe 365ShareHub Team"
  },
  register: {
    name: "📝 Urge to Register",
    subject: "Please complete your registration",
    body: "Hi,\n\nWe noticed you are enjoying the service with {{email}}, but haven't created an official account on our website yet.\n\nTo manage your subscription easily, please take 1 minute to register an account here: https://365sharehub.com/login\n\nThanks!"
  },
  reply: {
    name: "💬 Ticket Reply",
    subject: "Re: Your Support Request",
    body: "Hi there,\n\nThank you for reaching out regarding your account ({{email}}).\n\n[Insert your answer here...]\n\nLet us know if you need anything else!\n\nSupport Team"
  }
};

// --- 3. UI 辅助函数 ---
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Trial Active': return <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit"><Clock className="w-3 h-3"/> {status}</span>;
    case 'Paid Monthly':
    case 'Paid Yearly': return <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit"><ShieldCheck className="w-3 h-3"/> {status}</span>;
    case 'Expiring Soon': return <span className="bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit"><AlertCircle className="w-3 h-3"/> {status}</span>;
    default: return <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-[10px] font-bold w-fit">{status}</span>;
  }
};

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'leads' | 'tickets' | 'subscriptions'>('leads');
  
  // 数据源
  const [tickets, setTickets] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // CRM 交互状态
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null); // 当前选中的工单或Lead
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

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

    // 拉取全站真实工单和订阅数据
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
      // 如果当前选中的就是这个工单，顺便更新侧边栏状态
      if (selectedItem?.recordType === 'ticket' && selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, status: 'closed' });
      }
    } else {
      alert("Failed to close ticket.");
    }
  };

  // 应用模板并替换变量
  const applyTemplate = (templateKey: keyof typeof EMAIL_TEMPLATES) => {
    if (!selectedItem) return;
    const template = EMAIL_TEMPLATES[templateKey];
    
    // 如果是回复工单，自动拼接原工单标题
    let finalSubject = template.subject;
    if (templateKey === 'reply' && selectedItem.recordType === 'ticket') {
       finalSubject = `Re: ${selectedItem.subject}`;
    }

    setEmailSubject(finalSubject);
    // 动态替换 {{email}} 变量，注意适配 lead 或 ticket 的不同邮箱字段名
    const targetEmail = selectedItem.recordType === 'ticket' ? selectedItem.user_email : selectedItem.email;
    setEmailBody(template.body.replace(/{{email}}/g, targetEmail || 'Customer'));
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
  
  // 搜索过滤 Leads
  const filteredLeads = MOCK_LEADS.filter(lead => 
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lead.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      
      {/* 顶部导航 */}
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
        {/* 左侧/主体：数据区 */}
        <main className={`flex-1 overflow-y-auto p-6 md:p-8 transition-all duration-300 ${selectedItem ? 'md:pr-[420px]' : ''}`}>
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Workspace</h1>
                <p className="text-slate-500 text-sm mt-1">Manage leads, tickets, and subscriptions efficiently.</p>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input 
                    placeholder="Search..." 
                    className="pl-9 w-64 bg-white border-slate-200 focus-visible:ring-[#0078D4] rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* 数据统计卡片 (结合真实与虚拟数据) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><Users className="w-5 h-5" /></div>
                <div>
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Total Leads</div>
                  <div className="text-2xl font-extrabold text-slate-800">{MOCK_LEADS.length}</div>
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

            {/* 标签页切换 */}
            <div className="flex gap-6 mb-6 border-b border-slate-200 px-2">
              <button onClick={() => {setActiveTab('leads'); setSelectedItem(null);}} className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'leads' ? 'border-[#0078D4] text-[#0078D4]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
                CRM Leads (Auto)
              </button>
              <button onClick={() => {setActiveTab('tickets'); setSelectedItem(null);}} className={`pb-3 font-semibold text-sm transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'tickets' ? 'border-[#0078D4] text-[#0078D4]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
                Support Tickets
                {openTicketsCount > 0 && <span className="bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded text-[10px]">{openTicketsCount}</span>}
              </button>
              <button onClick={() => {setActiveTab('subscriptions'); setSelectedItem(null);}} className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'subscriptions' ? 'border-[#0078D4] text-[#0078D4]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
                Paid Subscriptions
              </button>
            </div>

            {/* 内容列表区 */}
            <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden mb-12">
              
              {/* Tab 1: Leads CRM */}
              {activeTab === 'leads' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                        <th className="p-5">Lead Email</th>
                        <th className="p-5">Status</th>
                        <th className="p-5">Type</th>
                        <th className="p-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className={`hover:bg-blue-50/30 transition-colors cursor-pointer ${selectedItem?.id === lead.id ? 'bg-blue-50' : ''}`} onClick={() => setSelectedItem({ ...lead, recordType: 'lead' })}>
                          <td className="p-5 font-medium text-slate-800 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">{lead.email.charAt(0).toUpperCase()}</div>
                            {lead.email}
                          </td>
                          <td className="p-5">{getStatusBadge(lead.status)}</td>
                          <td className="p-5 text-slate-500">{lead.type}</td>
                          <td className="p-5 text-right"><Button variant="ghost" size="sm" className="text-[#0078D4] rounded-full text-xs h-8">Manage <ChevronRight className="w-3 h-3 ml-1"/></Button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 2: 客服工单表 (Supabase 真实数据) */}
              {activeTab === 'tickets' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                        <th className="p-5">Status</th>
                        <th className="p-5">User Email</th>
                        <th className="p-5">Subject</th>
                        <th className="p-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100">
                      {tickets.length === 0 ? (
                        <tr><td colSpan={4} className="p-8 text-center text-slate-500">No tickets found.</td></tr>
                      ) : (
                        tickets.map(ticket => (
                          <tr key={ticket.id} className={`hover:bg-blue-50/30 transition-colors cursor-pointer ${selectedItem?.id === ticket.id ? 'bg-blue-50' : ''}`} onClick={() => setSelectedItem({ ...ticket, recordType: 'ticket' })}>
                            <td className="p-5">
                              {ticket.status === 'open' 
                                ? <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full text-[10px] font-bold w-fit"><CircleDashed className="w-3 h-3"/> Open</span>
                                : <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2.5 py-1 rounded-full text-[10px] font-bold w-fit"><CheckCircle2 className="w-3 h-3"/> Closed</span>
                              }
                            </td>
                            <td className="p-5 font-medium">{ticket.user_email || 'Unknown'}</td>
                            <td className="p-5 font-semibold text-slate-800 max-w-[200px] truncate">{ticket.subject}</td>
                            <td className="p-5 text-right"><Button variant="ghost" size="sm" className="text-[#0078D4] rounded-full text-xs h-8">Reply <ChevronRight className="w-3 h-3 ml-1"/></Button></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 3: 订阅订单表 (Supabase 真实数据) */}
              {activeTab === 'subscriptions' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                        <th className="p-5">Status</th>
                        <th className="p-5">Plan</th>
                        <th className="p-5">Current Period</th>
                        <th className="p-5">Stripe Customer</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100">
                      {subscriptions.length === 0 ? (
                        <tr><td colSpan={4} className="p-8 text-center text-slate-500">No subscriptions found.</td></tr>
                      ) : (
                        subscriptions.map(sub => (
                          <tr key={sub.id} className="hover:bg-slate-50/50 transition">
                            <td className="p-5">
                              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase w-fit ${
                                sub.status === 'active' ? 'bg-green-100 text-green-700' :
                                sub.status === 'trialing' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                              }`}>{sub.status}</span>
                            </td>
                            <td className="p-5 font-bold text-slate-800">{sub.plan_name}</td>
                            <td className="p-5 text-slate-500 text-xs">
                              {new Date(sub.current_period_start).toLocaleDateString()} - {new Date(sub.current_period_end).toLocaleDateString()}
                            </td>
                            <td className="p-5 font-mono text-[10px] text-slate-400">{sub.stripe_customer_id || 'N/A'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </div>
        </main>

        {/* 右侧：丝滑弹出的工单与邮件处理面板 (Slide-over Panel) */}
        <div className={`absolute top-0 right-0 h-full w-full md:w-[420px] bg-white border-l border-slate-200 shadow-[[-10px_0_30px_rgba(0,0,0,0.05)]] transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] z-40 flex flex-col ${selectedItem ? 'translate-x-0' : 'translate-x-full'}`}>
          
          {selectedItem && (
            <>
              {/* Panel Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  {selectedItem.recordType === 'ticket' ? <Ticket className="w-5 h-5 text-orange-500"/> : <User className="w-5 h-5 text-[#0078D4]"/>} 
                  {selectedItem.recordType === 'ticket' ? 'Ticket Details' : 'User Workspace'}
                </h2>
                <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Information Card */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 relative">
                  <div className="text-lg font-bold text-slate-900 mb-1 break-all pr-10">
                    {selectedItem.recordType === 'ticket' ? selectedItem.user_email : selectedItem.email}
                  </div>
                  
                  {selectedItem.recordType === 'ticket' && selectedItem.status === 'open' && (
                     <button onClick={() => resolveTicket(selectedItem.id)} className="absolute top-5 right-5 text-xs font-bold text-green-600 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-full transition flex items-center">
                       Resolve <CheckCircle2 className="w-3 h-3 ml-1"/>
                     </button>
                  )}

                  {/* 差异化展示内容 */}
                  {selectedItem.recordType === 'ticket' ? (
                    <div className="mt-4 pt-4 border-t border-slate-200/60">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject: {selectedItem.subject}</div>
                      <div className="text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-100">
                         {selectedItem.description}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {getStatusBadge(selectedItem.status)}
                        <span className="bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1"><Globe className="w-3 h-3"/> {selectedItem.region}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4 text-xs text-slate-500">
                        <div><span className="block text-slate-400 mb-0.5">Joined</span>{selectedItem.joinDate}</div>
                        <div><span className="block text-slate-400 mb-0.5">Expires</span><span className="text-slate-700 font-semibold">{selectedItem.expiresAt}</span></div>
                      </div>
                    </>
                  )}
                </div>

                {/* Smart Templates */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5"/> Smart Quick Replies
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(EMAIL_TEMPLATES) as Array<keyof typeof EMAIL_TEMPLATES>).map((key) => (
                      <Button 
                        key={key} 
                        variant="outline" 
                        onClick={() => applyTemplate(key)}
                        className="justify-start text-xs h-9 bg-white hover:bg-blue-50 hover:text-[#0078D4] hover:border-blue-200 border-slate-200 rounded-xl transition-all shadow-sm"
                      >
                        {EMAIL_TEMPLATES[key].name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Email Composer */}
                <div className="flex flex-col gap-3 pb-8">
                  <Input 
                    placeholder="Email Subject" 
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="bg-white rounded-xl border-slate-200 focus-visible:ring-[#0078D4] shadow-sm font-semibold"
                  />
                  <textarea 
                    placeholder="Select a template or type your message here..."
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="flex w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0078D4] min-h-[220px] resize-y"
                  />
                </div>

              </div>

              {/* Footer Action - Send via Mailto or API */}
              <div className="p-6 border-t border-slate-100 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                {/* 这里使用 mailto 调起原生邮箱客户端，自动填充已生成的邮件内容，最稳妥、零成本！ */}
                <a 
                  href={`mailto:${selectedItem.recordType === 'ticket' ? selectedItem.user_email : selectedItem.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                  className="w-full h-12 rounded-xl bg-slate-900 hover:bg-[#0078D4] text-white font-bold shadow-lg hover:shadow-blue-500/30 transition-all text-base flex items-center justify-center"
                >
                  Open in Mail App <Send className="w-4 h-4 ml-2"/>
                </a>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}