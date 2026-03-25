"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { 
  Users, Ticket, CreditCard, CheckCircle2, 
  Loader2, ArrowLeft, Mail, Clock, ShieldCheck, 
  AlertCircle, Send, FileText, Search, ChevronRight, X, BarChart2,
  Filter, Download, CheckSquare, Trash2, History, AlertTriangle, Globe2, 
  Calendar, Box, Languages, Users2, MessageSquarePlus, RefreshCw, Copy, ExternalLink, Link as LinkIcon,
  TrendingUp // 🔥 新增趋势图表图标
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ADMIN_EMAILS = ["ronalgang007@gmail.com", "lanluo1018@gmail.com"]; 

// 邮件模板库 (多语言版)
const EMAIL_TEMPLATES = {
  en: {
    label: "🇬🇧 English",
    invite: { name: "🚀 Day 1: Welcome & Enjoy", subject: "Welcome to 365ShareHub! Your 7-Day Free Trial is Active 🚀", body: "Hi there,\n\nGreat news! An invitation to join our Premium Family Group has been sent to your Microsoft account ({{email}}).\n\n⚠️ IMPORTANT: Microsoft's official invitation email might be in English, German, Chinese, Japanese, etc. Just click 'Accept' or 'Confirm' to join.\n\nOnce confirmed, you will have full access to Microsoft 365 Copilot and 1TB OneDrive storage. Your 7-day free trial is officially active starting today.\n\nIf you haven't registered an account yet, to easily manage your subscription and view billing, please take 1 minute to register on our official website:\n👉 https://365sharehub.com/login\n\nEnjoy your boost in productivity!\n\nBest,\nThe 365ShareHub Team" },
    expiry: { name: "⚠️ Day 6: Action Required", subject: "Action Required: Your 365ShareHub Trial expires in 24 hours ⚠️", body: "Hi there,\n\nWe hope you've been enjoying Microsoft 365 Copilot and your 1TB of cloud storage!\n\nThis is a quick reminder that your 7-day free trial for {{email}} will expire tomorrow. To avoid any interruption, please subscribe to a premium plan today:\n👉 https://365sharehub.com/upgrade?email={{email}}\n\nOnce your trial expires, your account will be automatically removed from the premium group.\n\nBest,\nThe 365ShareHub Team" },
    friendly_expiry: { name: "💖 Trial Expired (Friendly)", subject: "Your trial expired, but we kept your access!", body: "Hi,\n\nYour 7-day free trial has officially expired. However, to not interrupt your work, we have kindly kept you in the Premium Family Group for free temporarily.\n\nTo secure your spot and continue enjoying uninterrupted access to Copilot and 1TB OneDrive, please register and subscribe to a premium plan as soon as possible:\n👉 https://365sharehub.com/upgrade?email={{email}}\n\nThank you for choosing 365ShareHub!\n\nBest,\nThe 365ShareHub Team" },
    register: { name: "📝 Urge to Register", subject: "Please complete your registration", body: "Hi there,\n\nWe noticed you are enjoying the service with {{email}}, but haven't created an official account on our website yet.\n\nTo manage your subscription easily, please take 1 minute to register an account here: https://365sharehub.com/login\n\nBest,\nThe 365ShareHub Team" },
    reply: { name: "💬 Ticket Reply", subject: "Re: Your Support Request", body: "Hi there,\n\nThank you for reaching out regarding your account ({{email}}).\n\n[Insert your answer here...]\n\nLet us know if you need anything else!\n\nBest,\nThe 365ShareHub Support Team" }
  },
  zh: {
    label: "🇨🇳 中文",
    invite: { name: "🚀 Day 1: 欢迎与开通", subject: "欢迎来到 365ShareHub！您的 7 天免费试用已激活 🚀", body: "您好，\n\n好消息！我们已向您的微软账户 ({{email}}) 发送了高级家庭组邀请邮件。\n\n⚠️ 重要提示：微软的官方邀请邮件可能是英语、德语、中文、日语等，点击确认即可加入。\n\n确认加入后，您可以不受限制地使用 Microsoft 365 Copilot 和 1TB OneDrive 云存储。您的 7 天免费试用从今天正式开始。\n\n如果还未注册，为了方便管理您的订阅和查看账单，请花 1 分钟在官网完成注册：\n👉 https://365sharehub.com/login\n\n祝您使用愉快，工作高效！\n\n365ShareHub 团队" },
    expiry: { name: "⚠️ Day 6: 到期提醒", subject: "操作提醒：您的 365ShareHub 试用期将在 24 小时内到期 ⚠️", body: "您好，\n\n希望您对 Copilot 和 1TB 云存储感到满意！\n\n温馨提示，您的 7 天免费试用将于明天到期。为了避免服务中断和保护您的数据，请尽快订阅高级套餐：\n👉 https://365sharehub.com/upgrade?email={{email}}\n\n试用期到期后，您的账户将会被自动移出高级家庭组。\n\n祝好，\n365ShareHub 团队" },
    friendly_expiry: { name: "💖 试用到期 (友好)", subject: "您的试用已到期，但我们为您保留了权限！", body: "您好，\n\n您的 7 天免费试用已经正式到期。不过为了不打断您的工作，我们暂时友好地让您继续免费保持在高级家庭组中。\n\n为了确保您的名额并继续无间断使用 Copilot 和 1TB 云存储，请尽快前往官网注册并订阅高级套餐：\n👉 https://365sharehub.com/upgrade?email={{email}}\n\n感谢您选择 365ShareHub！\n\n祝好，\n365ShareHub 团队" },
    register: { name: "📝 邀请注册", subject: "请完成您的账户注册", body: "您好，\n\n为了方便管理您的订阅和查看账单，请花 1 分钟在官网完成注册：\nhttps://365sharehub.com/login\n\n祝好，\n365ShareHub 团队" },
    reply: { name: "💬 工单回复", subject: "Re: 您的客服工单", body: "您好，\n\n感谢您联系客服 (账号: {{email}})。\n\n[在此输入您的回复...]\n\n如有其他问题，请随时联系我们！\n\n祝好，\n365ShareHub 客服团队" }
  },
  ja: {
    label: "🇯🇵 日本語",
    invite: { name: "🚀 Day 1: ようこそ", subject: "365ShareHubへようこそ！7日間の無料体験が有効になりました 🚀", body: "こんにちは、\n\nMicrosoftアカウント ({{email}}) にファミリーグループの招待状を送信しました。\n\n⚠️ 重要: Microsoftからの公式招待メールは英語、ドイツ語、中国語、日本語などで届く場合があります。確認をクリックするだけで参加できます。\n\n承認後、Microsoft 365 Copilotと1TBのOneDriveストレージをフルに活用できるようになります。7日間の無料体験は本日から正式に開始されます。\n\nまだ登録していない場合は、サブスクリプションと請求の管理を簡単にするため、公式サイトで1分で登録を完了してください：\n👉 https://365sharehub.com/login\n\n生産性の向上をお楽しみください！\n\nよろしくお願いします。\n365ShareHub チーム" },
    expiry: { name: "⚠️ Day 6: 更新の案内", subject: "要確認：無料体験が24時間以内に終了します ⚠️", body: "こんにちは、\n\n無料体験は明日で終了します。サービスの中断を避けるため、本日中にプレミアムプランにご登録ください：\n👉 https://365sharehub.com/upgrade?email={{email}}\n\n試用期間が終了すると、アカウントはプレミアムグループから自動的に削除されます。\n\nよろしくお願いします。\n365ShareHub チーム" },
    friendly_expiry: { name: "💖 試用終了 (フレンドリー)", subject: "試用期間は終了しましたが、アクセスは保持されています！", body: "こんにちは、\n\n7日間の無料体験は終了しました。ただし、作業を中断させないため、特別にプレミアムグループに引き続きご参加いただいています。\n\n枠を確保し、引き続きご利用いただくために、できるだけ早く登録し、プレミアムプランにご加入ください：\n👉 https://365sharehub.com/upgrade?email={{email}}\n\nよろしくお願いします。\n365ShareHub チーム" },
    register: { name: "📝 登録のお願い", subject: "アカウント登録を完了してください", body: "こんにちは、\n\nサブスクリプションを管理するために、公式サイトでアカウントを登録してください：\nhttps://365sharehub.com/login\n\nよろしくお願いします。\n365ShareHub チーム" },
    reply: { name: "💬 チケットの返信", subject: "Re: サポートリクエスト", body: "こんにちは、\n\nお問い合わせいただきありがとうございます ({{email}})。\n\n[ここに回答を入力...]\n\nよろしくお願いします。\n365ShareHub サポートチーム" }
  },
  de: {
    label: "🇩🇪 Deutsch",
    invite: { name: "🚀 Day 1: Willkommen", subject: "Willkommen bei 365ShareHub! Ihr 7-tägiger Test ist aktiv 🚀", body: "Hallo,\n\neine Einladung zur Premium Family Group wurde an Ihr Microsoft-Konto ({{email}}) gesendet.\n\n⚠️ WICHTIG: Die offizielle Microsoft-Einladungs-E-Mail kann auf Englisch, Deutsch, Chinesisch usw. sein. Klicken Sie einfach auf Bestätigen, um beizutreten.\n\nNach der Bestätigung haben Sie vollen Zugriff auf Microsoft 365 Copilot und 1TB OneDrive-Speicher. Ihr 7-tägiger kostenloser Test ist ab heute offiziell aktiv.\n\nWenn Sie noch nicht registriert sind, nehmen Sie sich bitte 1 Minute Zeit, um sich auf unserer Website zu registrieren, um Ihr Abonnement und Ihre Abrechnung einfach zu verwalten:\n👉 https://365sharehub.com/login\n\nViel Spaß und maximale Produktivität!\n\nBeste Grüße,\nIhr 365ShareHub Team" },
    expiry: { name: "⚠️ Day 6: Erinnerung", subject: "Aktion erforderlich: Ihr Test endet in 24 Stunden", body: "Hallo,\n\nIhr kostenloser Testzeitraum läuft morgen ab. Um Unterbrechungen zu vermeiden, abonnieren Sie bitte heute einen Premium-Plan:\n👉 https://365sharehub.com/upgrade?email={{email}}\n\nNach Ablauf der Testphase wird Ihr Konto automatisch aus der Premium-Gruppe entfernt.\n\nBeste Grüße,\nIhr 365ShareHub Team" },
    friendly_expiry: { name: "💖 Test beendet (Freundlich)", subject: "Ihr Test ist abgelaufen, aber wir haben Ihren Zugang behalten!", body: "Hallo,\n\nIhr 7-tägiger Testzeitraum ist abgelaufen. Aus Kulanz haben wir Sie jedoch vorübergehend in der Premium Group belassen, um Ihre Arbeit nicht zu unterbrechen.\n\nUm Ihren Platz zu sichern, registrieren und abonnieren Sie bitte so schnell wie möglich einen Premium-Plan:\n👉 https://365sharehub.com/upgrade?email={{email}}\n\nBeste Grüße,\nIhr 365ShareHub Team" },
    register: { name: "📝 Registrierung", subject: "Bitte schließen Sie Ihre Registrierung ab", body: "Hallo,\n\nbitte registrieren Sie Ihr Konto hier, um Ihr Abonnement zu verwalten: https://365sharehub.com/login\n\nBeste Grüße,\nIhr 365ShareHub Team" },
    reply: { name: "💬 Ticket Antwort", subject: "Re: Ihre Support-Anfrage", body: "Hallo,\n\nvielen Dank für Ihre Nachricht zu ({{email}}).\n\n[Antwort hier einfügen...]\n\nBeste Grüße,\nIhr 365ShareHub Support-Team" }
  },
  es: {
    label: "🇪🇸 Español",
    invite: { name: "🚀 Day 1: Bienvenido", subject: "¡Bienvenido a 365ShareHub! Su prueba está activa 🚀", body: "Hola,\n\n¡Se ha enviado una invitación a su cuenta de Microsoft ({{email}})!\n\n⚠️ IMPORTANTE: El correo oficial de invitación de Microsoft puede estar en inglés, alemán, chino, etc. Simplemente haga clic en confirmar para unirse.\n\nUna vez confirmado, tendrá acceso completo a Microsoft 365 Copilot y 1 TB de almacenamiento en OneDrive. Su prueba gratuita de 7 días está oficialmente activa a partir de hoy.\n\nSi aún no se ha registrado, tómese 1 minuto para registrarse en nuestro sitio web oficial para gestionar su suscripción fácilmente:\n👉 https://365sharehub.com/login\n\n¡Disfrute de su aumento de productividad!\n\nSaludos,\nEl equipo de 365ShareHub" },
    expiry: { name: "⚠️ Day 6: Aviso", subject: "Aviso: Su prueba caduca en 24 horas ⚠️", body: "Hola,\n\nSu prueba gratuita caduca mañana. Para evitar interrupciones, suscríbase a un plan premium hoy:\n👉 https://365sharehub.com/upgrade?email={{email}}\n\nUna vez que expire su prueba, su cuenta será eliminada automáticamente del grupo premium.\n\nSaludos,\nEl equipo de 365ShareHub" },
    friendly_expiry: { name: "💖 Prueba expirada (Amigable)", subject: "¡Su prueba ha expirado, pero hemos mantenido su acceso!", body: "Hola,\n\nSu prueba gratuita ha expirado oficialmente. Sin embargo, como cortesía, lo hemos mantenido temporalmente en el Grupo Premium para no interrumpir su trabajo.\n\nPara asegurar su lugar, regístrese y suscríbase a un plan premium lo antes posible:\n👉 https://365sharehub.com/upgrade?email={{email}}\n\nSaludos,\nEl equipo de 365ShareHub" },
    register: { name: "📝 Registro", subject: "Complete su registro", body: "Hola,\n\nPor favor, registre una cuenta aquí para gestionar su suscripción: https://365sharehub.com/login\n\nSaludos,\nEl equipo de 365ShareHub" },
    reply: { name: "💬 Respuesta", subject: "Re: Su solicitud de soporte", body: "Hola,\n\nGracias por contactarnos ({{email}}).\n\n[Inserte su respuesta aquí...]\n\nSaludos,\nEl equipo de soporte" }
  },
  fr: {
    label: "🇫🇷 Français",
    invite: { name: "🚀 Day 1: Bienvenue", subject: "Bienvenue ! Votre essai gratuit de 7 jours est actif 🚀", body: "Bonjour,\n\nUne invitation a été envoyée à votre compte Microsoft ({{email}}).\n\n⚠️ IMPORTANT: L'e-mail d'invitation officiel peut être en anglais, allemand, chinois, etc. Il suffit de cliquer sur confirmer pour rejoindre.\n\nUne fois confirmé, vous aurez un accès complet à Microsoft 365 Copilot et à 1 To de stockage OneDrive. Votre essai gratuit de 7 jours est officiellement actif à partir d'aujourd'hui.\n\nSi vous n'êtes pas encore inscrit, prenez 1 minute pour vous inscrire sur notre site officiel afin de gérer facilement votre abonnement :\n👉 https://365sharehub.com/login\n\nProfitez d'une productivité maximale !\n\nCordialement,\nL'équipe 365ShareHub" },
    expiry: { name: "⚠️ Day 6: Expiration", subject: "Action requise : Votre essai expire dans 24 heures ⚠️", body: "Bonjour,\n\nVotre essai gratuit expire demain. Pour éviter toute interruption, veuillez vous abonner à un forfait premium dès aujourd'hui :\n👉 https://365sharehub.com/upgrade?email={{email}}\n\nUne fois votre essai expiré, votre compte sera automatiquement retiré du groupe premium.\n\nCordialement,\nL'équipe 365ShareHub" },
    friendly_expiry: { name: "💖 Essai expiré (Amical)", subject: "Votre essai a expiré, mais nous avons conservé votre accès !", body: "Bonjour,\n\nVotre essai gratuit a officiellement expiré. Cependant, à titre de courtoisie, nous vous avons temporairement maintenu dans le groupe Premium.\n\nPour garantir votre place, veuillez vous inscrire et vous abonner à un plan premium dès que possible :\n👉 https://365sharehub.com/upgrade?email={{email}}\n\nCordialement,\nL'équipe 365ShareHub" },
    register: { name: "📝 Inscription", subject: "Veuillez compléter votre inscription", body: "Bonjour,\n\nVeuillez créer un compte ici pour gérer votre abonnement : https://365sharehub.com/login\n\nCordialement,\nL'équipe 365ShareHub" },
    reply: { name: "💬 Réponse Ticket", subject: "Re: Votre demande d'assistance", body: "Bonjour,\n\nMerci de nous avoir contactés concernant votre compte ({{email}}).\n\n[Insérez votre réponse ici...]\n\nCordialement,\nL'équipe d'assistance" }
  }
};

const getStatusBadge = (status: string) => {
  if (!status) return <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[11px] font-bold">Unknown</span>;
  const s = status.toLowerCase();
  if (s.includes('active') || s.includes('trial active')) return <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 w-fit"><Clock className="w-3 h-3"/> Trial Active</span>;
  if (s.includes('paid')) return <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 w-fit"><ShieldCheck className="w-3 h-3"/> Paid Plan</span>;
  if (s.includes('expir')) return <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 w-fit"><AlertCircle className="w-3 h-3"/> Expired</span>;
  if (s.includes('open') || s.includes('pending')) return <span className="bg-orange-100 text-orange-600 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 w-fit"><Ticket className="w-3 h-3"/> Open</span>;
  if (s.includes('closed') || s.includes('resolved')) return <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 w-fit"><CheckCircle2 className="w-3 h-3"/> Closed</span>;
  return <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[11px] font-bold w-fit uppercase tracking-wider">{status}</span>;
};

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'leads' | 'tickets' | 'subscriptions'>('leads');
  
  const [tickets, setTickets] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  
  const [activityLogs, setActivityLogs] = useState<Record<string, {date: string, action: string, content?: string}[]>>({});
  const [manualNote, setManualNote] = useState("");
  const [templateLang, setTemplateLang] = useState<keyof typeof EMAIL_TEMPLATES>("en");

  // 🔥 新增：图表时间维度状态
  const [chartTimeframe, setChartTimeframe] = useState<'Daily' | 'Monthly' | 'Yearly'>('Monthly');

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAdminAndFetchData();
  }, []);

  const checkAdminAndFetchData = async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
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
    if (refresh) setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleUpdateField = async (table: string, id: string, field: string, value: any) => {
    if (!selectedItem) return;
    
    const updatedItem = { ...selectedItem, [field]: value };
    setSelectedItem(updatedItem);
    
    if (table === 'leads') setLeads(leads.map(l => l.id === id ? updatedItem : l));
    if (table === 'tickets') setTickets(tickets.map(t => t.id === id ? updatedItem : t));

    if (field === 'status') addLog(id, `Status updated to: ${value}`);
    if (field === 'family_group') addLog(id, `Assigned to Family Group: ${value}`);
    if (field === 'actual_join_date') addLog(id, `Actual join date set to: ${value}`);

    const { error } = await supabase.from(table).update({ [field]: value }).eq('id', id);
    if (error) alert(`Failed to update ${field} in database.`);
  };

  const resolveTicket = async (id: string) => {
    const { error } = await supabase.from('tickets').update({ status: 'closed' }).eq('id', id);
    if (!error) {
      setTickets(tickets.map(t => t.id === id ? { ...t, status: 'closed' } : t));
      if (selectedItem?.id === id) {
        setSelectedItem({ ...selectedItem, status: 'closed' });
        addLog(id, 'Ticket marked as Closed');
      }
    } else {
      alert("Failed to close ticket.");
    }
  };

  const applyTemplate = (templateKey: string) => {
    if (!selectedItem) return;
    
    // 🔥 关键修改：通过类型断言 (any) 绕过复杂的嵌套对象推导
    const langData = EMAIL_TEMPLATES[templateLang as keyof typeof EMAIL_TEMPLATES] as any;
    const template = langData[templateKey];

    // 检查模板是否存在且不是那个 label 字符串
    if (!template || typeof template === 'string') return;

    let finalSubject = template.subject;
    
    if (templateKey === 'reply' && selectedItem.recordType === 'ticket') {
      finalSubject = `Re: ${selectedItem.subject}`;
    }
    
    setEmailSubject(finalSubject);
    
    const targetEmail = selectedItem.recordType === 'ticket' ? selectedItem.user_email : selectedItem.email;
    setEmailBody(template.body.replace(/{{email}}/g, targetEmail || 'Customer'));
  };

  const handleSendEmailInApp = async () => {
    if (!emailSubject || !emailBody) {
      alert("Please provide a subject and message."); return;
    }
    const targetEmail = selectedItem.recordType === 'ticket' ? selectedItem.user_email : selectedItem.email;
    
    setIsSendingEmail(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: targetEmail, subject: emailSubject, text: emailBody })
      });
      if (res.ok) {
        alert("✅ Email sent successfully!");
        addLog(selectedItem.id, `Sent email: "${emailSubject}"`, emailBody);
        setEmailSubject(""); setEmailBody("");
      } else alert("⚠️ Failed to send. Make sure your RESEND_API_KEY is set in .env.local");
    } catch (error) {
      console.error(error); alert("Network error while sending email.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const addLog = (id: string, action: string, content?: string) => {
    setActivityLogs(prev => ({
      ...prev, [id]: [{ date: new Date().toLocaleString(), action, content }, ...(prev[id] || [])]
    }));
  };

  const handleAddManualNote = () => {
    if (!manualNote.trim() || !selectedItem) return;
    addLog(selectedItem.id, "Internal Note Added", manualNote);
    setManualNote("");
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) return;
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete this ${selectedItem.recordType}?`);
    if (!confirmDelete) return;
    const tableName = selectedItem.recordType === 'ticket' ? 'tickets' : (selectedItem.recordType === 'subscription' ? 'subscriptions' : 'leads');
    const { error } = await supabase.from(tableName).delete().eq('id', selectedItem.id);
    if (!error) {
      if (tableName === 'leads') setLeads(leads.filter(l => l.id !== selectedItem.id));
      else if (tableName === 'tickets') setTickets(tickets.filter(t => t.id !== selectedItem.id));
      else setSubscriptions(subscriptions.filter(s => s.id !== selectedItem.id));
      setSelectedItem(null);
    } else alert("Failed to delete record.");
  };

  const handleBatchDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to completely delete ${selectedLeads.size} leads?`);
    if (!confirmDelete) return;
    const idsToDelete = Array.from(selectedLeads);
    const { error } = await supabase.from('leads').delete().in('id', idsToDelete);
    if (!error) {
      setLeads(leads.filter(l => !selectedLeads.has(l.id)));
      setSelectedLeads(new Set());
      if (selectedItem && selectedLeads.has(selectedItem.id)) setSelectedItem(null);
    } else alert("Failed to batch delete.");
  };

  const handleSelectAll = (checked: boolean, displayLeads: any[]) => {
    if (checked) setSelectedLeads(new Set(displayLeads.map(l => l.id)));
    else setSelectedLeads(new Set());
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSet = new Set(selectedLeads);
    if (checked) newSet.add(id); else newSet.delete(id);
    setSelectedLeads(newSet);
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const navigateToCRM = (email: string) => {
    setActiveTab('leads');
    setSearchQuery(email);
    setSelectedItem(null);
  };

  if (isAdmin === false) return <div className="min-h-screen flex items-center justify-center"><h1 className="text-xl font-bold text-red-500">Access Denied: You are not an admin.</h1></div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  const openTicketsCount = tickets.filter(t => t.status === 'open').length;
  const activeSubsCount = subscriptions.filter(s => s.status === 'active' || s.status === 'trialing').length;
  
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (lead.status && lead.status.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredTickets = tickets.filter(t => t.user_email?.toLowerCase().includes(searchQuery.toLowerCase()) || t.subject?.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredSubs = subscriptions.filter(s => s.stripe_customer_id?.toLowerCase().includes(searchQuery.toLowerCase()) || s.user_email?.toLowerCase().includes(searchQuery.toLowerCase()));

  const formatJoinDate = (dateStr: string) => dateStr ? new Date(dateStr).toISOString().split('T')[0] : "N/A";
  
  const getRegisteredDays = (dateStr: string) => {
    if (!dateStr) return 0;
    const diffTime = new Date().getTime() - new Date(dateStr).getTime();
    return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  };

  const getDaysRemaining = (leadObj: any) => {
    const baseDate = leadObj.actual_join_date || leadObj.created_at;
    if (!baseDate) return 0;
    const expires = new Date(baseDate);
    expires.setDate(expires.getDate() + 7);
    const diffTime = expires.getTime() - new Date().getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getLanguageGuess = (regionStr: string) => {
    if (!regionStr) return "English (Auto)";
    if (regionStr.includes('DE') || regionStr.includes('AT') || regionStr.includes('CH')) return "German";
    if (regionStr.includes('FR')) return "French";
    if (regionStr.includes('ES') || regionStr.includes('MX')) return "Spanish";
    if (regionStr.includes('JP')) return "Japanese";
    if (regionStr.includes('CN') || regionStr.includes('TW') || regionStr.includes('HK')) return "Chinese";
    return "English (Auto)";
  };

  // 🔥 核心升级 1：根据选择的维度真实渲染图表数据
  const getChartData = () => {
    const data = [];
    const now = new Date();

    if (chartTimeframe === 'Daily') {
      // 最近 7 天
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const label = d.toLocaleDateString('en-US', { weekday: 'short' });
        const trials = leads.filter(l => l.created_at?.startsWith(dateStr)).length;
        const paid = subscriptions.filter(s => s.created_at?.startsWith(dateStr)).length;
        data.push({ name: label, trials, paid });
      }
    } else if (chartTimeframe === 'Monthly') {
      // 最近 6 个月
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthStr = d.toISOString().slice(0, 7);
        const label = d.toLocaleDateString('en-US', { month: 'short' });
        const trials = leads.filter(l => l.created_at?.startsWith(monthStr)).length;
        const paid = subscriptions.filter(s => s.created_at?.startsWith(monthStr)).length;
        data.push({ name: label, trials, paid });
      }
    } else if (chartTimeframe === 'Yearly') {
      // 最近 3 年
      for (let i = 2; i >= 0; i--) {
        const yearStr = (now.getFullYear() - i).toString();
        const trials = leads.filter(l => l.created_at?.startsWith(yearStr)).length;
        const paid = subscriptions.filter(s => s.created_at?.startsWith(yearStr)).length;
        data.push({ name: yearStr, trials, paid });
      }
    }
    return data;
  };

  const chartData = getChartData();
  
  // 🔥 核心升级 2：动态计算漏斗转化率
  const conversionRate = leads.length > 0 ? ((activeSubsCount / leads.length) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col font-sans overflow-hidden">
      <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Image src="/icons/logo-main.png" alt="Logo" width={32} height={32} className="bg-white rounded-md p-0.5" />
             <span className="font-bold text-lg tracking-wide">Admin Control Center</span>
          </div>
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition bg-white/10 px-4 py-1.5 rounded-full">
            <ArrowLeft className="w-4 h-4" /> Exit Admin
          </Link>
        </div>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        <main className={`flex-1 overflow-y-auto p-6 md:p-8 transition-all duration-300 ${selectedItem ? 'md:pr-[500px] lg:pr-[600px] xl:pr-[680px]' : ''}`}>
          <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900">Workspace</h1>
                  <p className="text-slate-500 text-sm mt-1">Manage leads, tickets, and subscriptions efficiently.</p>
                </div>
                <button onClick={() => checkAdminAndFetchData(true)} className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-[#0078D4] hover:bg-blue-50 transition-colors shadow-sm" title="Refresh Data">
                  <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin text-[#0078D4]' : ''}`} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><Users className="w-5 h-5" /></div>
                <div><div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Total Leads</div><div className="text-2xl font-extrabold text-slate-800">{leads.length}</div></div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-full"><Ticket className="w-5 h-5" /></div>
                <div><div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Open Tickets</div><div className="text-2xl font-extrabold text-slate-800">{openTicketsCount}</div></div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-green-50 text-green-600 rounded-full"><CreditCard className="w-5 h-5" /></div>
                <div><div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Active Subs</div><div className="text-2xl font-extrabold text-slate-800">{activeSubsCount}</div></div>
              </div>
              {/* 🔥 替换原来的无用卡片为转化率统计 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-full"><TrendingUp className="w-5 h-5" /></div>
                <div><div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Conversion Rate</div><div className="text-2xl font-extrabold text-slate-800">{conversionRate}%</div></div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm p-6 mb-8 hidden md:block">
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2">
                   <BarChart2 className="w-5 h-5 text-[#0078D4]" />
                   <h2 className="text-lg font-bold text-slate-800">Trial vs Paid Conversion</h2>
                 </div>
                 {/* 🔥 新增图表时间维度切换器 */}
                 <div className="flex bg-slate-100 p-1 rounded-lg">
                   {['Daily', 'Monthly', 'Yearly'].map(tf => (
                     <button 
                       key={tf}
                       onClick={() => setChartTimeframe(tf as any)}
                       className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${chartTimeframe === tf ? 'bg-white text-[#0078D4] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                     >
                       {tf}
                     </button>
                   ))}
                 </div>
               </div>
               <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
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

            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-4 border-b border-slate-200 pb-3 px-2 gap-4">
              <div className="flex gap-6 w-full md:w-auto">
                <button onClick={() => {setActiveTab('leads'); setSelectedItem(null); setSearchQuery("");}} className={`pb-3 -mb-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'leads' ? 'border-[#0078D4] text-[#0078D4]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>CRM Leads</button>
                <button onClick={() => {setActiveTab('tickets'); setSelectedItem(null); setSearchQuery("");}} className={`pb-3 -mb-3 font-semibold text-sm transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'tickets' ? 'border-[#0078D4] text-[#0078D4]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
                  Tickets {openTicketsCount > 0 && <span className="bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded text-[10px]">{openTicketsCount}</span>}
                </button>
                <button onClick={() => {setActiveTab('subscriptions'); setSelectedItem(null); setSearchQuery("");}} className={`pb-3 -mb-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'subscriptions' ? 'border-[#0078D4] text-[#0078D4]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>Subscriptions</button>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-2 w-4 h-4 text-slate-400" />
                  <Input placeholder={`Search ${activeTab}...`} className="pl-9 h-8 bg-white border-slate-200 rounded-full text-sm shadow-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                
                {activeTab === 'leads' && (
                  <div className="relative">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-8 pl-3 pr-8 rounded-full border border-slate-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#0078D4] appearance-none text-slate-600 cursor-pointer shadow-sm">
                      <option value="All">All Status</option>
                      <option value="Trial Active">Trial Active</option>
                      <option value="Expired">Expired</option>
                      <option value="Paid">Paid</option>
                    </select>
                    <Filter className="absolute right-3 top-2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                )}
              </div>
            </div>

            {activeTab === 'leads' && selectedLeads.size > 0 && (
              <div className="bg-blue-50/90 backdrop-blur-md border border-blue-200 rounded-t-xl px-5 py-3 flex items-center justify-between mb-0 animate-in fade-in slide-in-from-top-2 shadow-sm">
                <div className="flex items-center gap-2 text-blue-700 text-sm font-bold">
                  <CheckSquare className="w-4 h-4" /> {selectedLeads.size} lead(s) selected
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => alert("Batch email opening...")} className="bg-[#0078D4] hover:bg-[#0060aa] text-white shadow-sm h-8 text-xs px-4">
                    <Mail className="w-3.5 h-3.5 mr-1.5" /> Batch Email
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleBatchDelete} className="text-red-500 hover:bg-red-50 hover:text-red-600 h-8 text-xs px-3 bg-white border border-red-100">
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            )}

            <div className={`bg-white border border-slate-200 shadow-sm overflow-hidden mb-12 ${activeTab === 'leads' && selectedLeads.size > 0 ? 'rounded-b-xl border-t-0' : 'rounded-[2rem]'}`}>
              {/* === CRM LEADS TABLE === */}
              {activeTab === 'leads' && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-widest text-slate-500 font-bold">
                      <th className="p-4 w-12 text-center">
                        <input type="checkbox" className="rounded border-slate-300 text-[#0078D4] focus:ring-[#0078D4] cursor-pointer w-4 h-4" checked={selectedLeads.size === filteredLeads.length && filteredLeads.length > 0} onChange={(e) => handleSelectAll(e.target.checked, filteredLeads)} />
                      </th>
                      <th className="p-4">User Profile</th>
                      <th className="p-4 hidden xl:table-cell">Group & Dates</th>
                      <th className="p-4">Plan & Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                    {filteredLeads.length === 0 ? <tr><td colSpan={5} className="p-12 text-center text-slate-500 text-base">No leads match your filter.</td></tr> : filteredLeads.map((lead) => (
                      <tr key={lead.id} className={`hover:bg-blue-50/40 transition-colors cursor-pointer ${selectedItem?.id === lead.id || selectedLeads.has(lead.id) ? 'bg-blue-50/60' : ''}`} onClick={() => setSelectedItem({ ...lead, recordType: 'lead' })}>
                        <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded border-slate-300 text-[#0078D4] focus:ring-[#0078D4] cursor-pointer w-4 h-4" checked={selectedLeads.has(lead.id)} onChange={(e) => handleSelectOne(lead.id, e.target.checked)} />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center font-extrabold uppercase text-sm shadow-inner shrink-0">
                              {lead.email.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-slate-800">{lead.email}</span>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                                <span className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded text-slate-600"><Globe2 className="w-3 h-3"/> {lead.region || 'Global'}</span>
                                <span className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded text-slate-600"><Languages className="w-3 h-3"/> {getLanguageGuess(lead.region)}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 hidden xl:table-cell text-xs text-slate-500 space-y-1.5">
                          <div className="flex items-center gap-1.5 font-medium"><Users2 className="w-3.5 h-3.5 text-blue-400"/> Group: <span className="text-slate-800 font-bold bg-slate-100 px-1.5 rounded">{lead.family_group || 'Unassigned'}</span></div>
                          <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400"/> Joined: <span className="text-slate-700">{formatJoinDate(lead.actual_join_date || lead.created_at)}</span></div>
                          <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400"/> Active: <span className="text-slate-700 font-bold">{getRegisteredDays(lead.actual_join_date || lead.created_at)} Days</span></div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1.5 items-start">
                            {getStatusBadge(lead.status)}
                            {lead.status === 'Paid' ? (
                              <div className="text-green-600 text-xs font-bold pl-1">Lifetime / Active</div>
                            ) : (
                              <div className="text-xs flex items-center gap-1 pl-1">
                                {getDaysRemaining(lead) <= 1 ? (
                                  <span className="text-red-500 font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Expiring Soon</span>
                                ) : (
                                  <span className="text-slate-600 font-medium">Expires in <b className="text-slate-800">{getDaysRemaining(lead)}</b> d</span>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm" className="text-[#0078D4] hover:bg-blue-50 rounded-full font-bold h-8 px-4">
                            Manage <ChevronRight className="w-3 h-3 ml-1"/>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* === TICKETS TABLE === */}
              {activeTab === 'tickets' && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-widest text-slate-500 font-bold">
                      <th className="p-4">User Profile</th>
                      <th className="p-4">Subject</th>
                      <th className="p-4">Status & Time</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                    {filteredTickets.length === 0 ? <tr><td colSpan={4} className="p-12 text-center text-slate-500 text-base">No tickets found.</td></tr> : filteredTickets.map(ticket => (
                      <tr key={ticket.id} className={`hover:bg-blue-50/40 transition-colors cursor-pointer ${selectedItem?.id === ticket.id ? 'bg-blue-50/60' : ''}`} onClick={() => setSelectedItem({ ...ticket, recordType: 'ticket' })}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600 flex items-center justify-center font-extrabold uppercase text-sm shadow-inner shrink-0">
                              {ticket.user_email?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <span className="font-bold text-slate-800">{ticket.user_email}</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-600 font-medium truncate max-w-[250px]">{ticket.subject}</td>
                        <td className="p-4 flex flex-col gap-1.5 items-start">
                          {getStatusBadge(ticket.status)}
                          <span className="text-[10px] text-slate-400 font-medium ml-1">{formatJoinDate(ticket.created_at)}</span>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm" className="text-[#0078D4] hover:bg-blue-50 rounded-full font-bold h-8 px-4">
                            Manage <ChevronRight className="w-3 h-3 ml-1"/>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* === SUBSCRIPTIONS TABLE === */}
              {activeTab === 'subscriptions' && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-widest text-slate-500 font-bold">
                      <th className="p-4">Secure Customer</th>
                      <th className="p-4">Plan & Period</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                    {filteredSubs.length === 0 ? <tr><td colSpan={4} className="p-12 text-center text-slate-500 text-base">No active subscriptions.</td></tr> : filteredSubs.map(sub => {
                      const fallbackEmail = sub.user_email || leads.find(l => l.user_id === sub.user_id)?.email;
                      return (
                        <tr key={sub.id} className={`hover:bg-blue-50/40 transition-colors cursor-pointer ${selectedItem?.id === sub.id ? 'bg-blue-50/60' : ''}`} onClick={() => setSelectedItem({ ...sub, recordType: 'subscription', fallbackEmail })}>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-700 flex items-center justify-center font-extrabold uppercase text-sm shadow-inner shrink-0">
                                {fallbackEmail ? fallbackEmail.charAt(0).toUpperCase() : <ShieldCheck className="w-5 h-5"/>}
                              </div>
                              <div className="flex flex-col gap-1">
                                {fallbackEmail ? (
                                  <span className="font-bold text-slate-800">{fallbackEmail}</span>
                                ) : (
                                  <span className="font-bold text-slate-800">Secure Checkout User</span>
                                )}
                                <span className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">{sub.stripe_customer_id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-slate-700">{sub.plan_name}</span>
                              <span className="text-[10px] text-slate-500 font-medium">
                                Renews: {new Date(sub.current_period_end).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                             {getStatusBadge(sub.status)}
                          </td>
                          <td className="p-4 text-right">
                             <Button variant="ghost" size="sm" className="text-[#0078D4] hover:bg-blue-50 rounded-full font-bold h-8 px-4">
                               Manage <ChevronRight className="w-3 h-3 ml-1"/>
                             </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>

        {/* -------------------- 右侧面板 WORKSPACE -------------------- */}
        <div className={`absolute top-0 right-0 h-full w-full md:w-[500px] lg:w-[600px] xl:w-[680px] bg-white border-l border-slate-200 shadow-[[-20px_0_40px_rgba(0,0,0,0.08)]] transform transition-transform duration-500 z-40 flex flex-col ${selectedItem ? 'translate-x-0' : 'translate-x-full'}`}>
          {selectedItem && (
            <>
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/80">
                <h2 className="font-extrabold text-xl text-slate-800 flex items-center gap-2">
                  {selectedItem.recordType === 'ticket' ? 'Ticket Workspace' : selectedItem.recordType === 'subscription' ? 'Subscription Details' : 'Lead Workspace'}
                </h2>
                <div className="flex gap-2">
                  <button onClick={handleDeleteItem} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full text-slate-400 transition-colors" title="Delete Record"><Trash2 className="w-5 h-5"/></button>
                  <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors bg-white shadow-sm border border-slate-200"><X className="w-5 h-5"/></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#fafafa]">
                
                {/* 顶部全景画像卡片 */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                    <div className={`w-14 h-14 rounded-full text-white flex items-center justify-center font-bold uppercase text-xl shadow-md shrink-0 ${
                        selectedItem.recordType === 'ticket' ? 'bg-gradient-to-br from-orange-400 to-amber-500' : 
                        selectedItem.recordType === 'subscription' ? 'bg-gradient-to-br from-emerald-400 to-green-500' : 'bg-gradient-to-br from-[#0078D4] to-blue-400'
                    }`}>
                      {selectedItem.recordType === 'ticket' ? selectedItem.user_email?.charAt(0).toUpperCase() : 
                       selectedItem.recordType === 'subscription' ? (selectedItem.fallbackEmail ? selectedItem.fallbackEmail.charAt(0).toUpperCase() : <ShieldCheck className="w-6 h-6"/>) : 
                       selectedItem.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="overflow-hidden flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-slate-900 truncate" title={selectedItem.recordType === 'ticket' ? selectedItem.user_email : selectedItem.fallbackEmail || selectedItem.email}>
                          {selectedItem.recordType === 'ticket' ? selectedItem.user_email : selectedItem.recordType === 'subscription' ? (selectedItem.fallbackEmail || 'Secure Checkout User') : selectedItem.email}
                        </div>
                        {/* 一键复制 */}
                        {(selectedItem.email || selectedItem.user_email || selectedItem.fallbackEmail) && (
                          <button onClick={() => copyToClipboard(selectedItem.email || selectedItem.user_email || selectedItem.fallbackEmail)} className="text-slate-400 hover:text-[#0078D4] p-1"><Copy className="w-4 h-4"/></button>
                        )}
                      </div>
                      
                      <div className="text-sm text-slate-500 mt-1 flex items-center justify-between gap-2">
                        {selectedItem.recordType === 'lead' ? (
                          <span className="flex items-center gap-1"><Globe2 className="w-4 h-4"/> {selectedItem.region || 'Global Visitor'}</span>
                        ) : selectedItem.recordType === 'ticket' ? (
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> Opened: {new Date(selectedItem.created_at).toLocaleDateString()}</span>
                        ) : (
                          <span className="flex items-center gap-1 font-mono text-[11px]"><CreditCard className="w-4 h-4"/> {selectedItem.stripe_customer_id}</span>
                        )}

                        {/* 直达 CRM 按钮 */}
                        {selectedItem.recordType !== 'lead' && (selectedItem.user_email || selectedItem.fallbackEmail) && (
                          <Button variant="ghost" size="sm" onClick={() => navigateToCRM(selectedItem.user_email || selectedItem.fallbackEmail)} className="h-6 text-[10px] bg-blue-50 text-blue-600 rounded-full px-2 py-0 hover:bg-blue-100">
                            Find in CRM <LinkIcon className="w-3 h-3 ml-1"/>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* --- Lead Details --- */}
                  {selectedItem.recordType === 'lead' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                      <div>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Status</span>
                        <select 
                          value={selectedItem.status || 'Trial Active'} 
                          onChange={(e) => handleUpdateField('leads', selectedItem.id, 'status', e.target.value)}
                          className="bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-[#0078D4]/50 cursor-pointer w-full"
                        >
                          <option value="Trial Active">⏳ Trial Active</option>
                          <option value="Paid">💳 Paid</option>
                          <option value="Expired">❌ Expired</option>
                        </select>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Family Group</span>
                        <div className="relative">
                          <Users2 className="w-3.5 h-3.5 absolute left-2 top-2 text-slate-400"/>
                          <Input 
                            type="text" placeholder="e.g. 001"
                            value={selectedItem.family_group || ''}
                            onBlur={(e) => handleUpdateField('leads', selectedItem.id, 'family_group', e.target.value)}
                            onChange={(e) => setSelectedItem({...selectedItem, family_group: e.target.value})}
                            className="bg-white border-slate-200 text-sm font-bold h-8 pl-7 text-slate-700" 
                          />
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Actual Join Date</span>
                        <Input 
                          type="date"
                          value={selectedItem.actual_join_date ? selectedItem.actual_join_date.split('T')[0] : ''}
                          onChange={(e) => handleUpdateField('leads', selectedItem.id, 'actual_join_date', e.target.value)}
                          className="bg-white border-slate-200 text-xs font-bold h-8 text-slate-700 w-full" 
                        />
                      </div>
                      
                      <div>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Plan Type</span>
                        <span className="text-sm font-bold text-slate-800 flex items-center h-8">{selectedItem.status === 'Paid' ? 'Premium Subscription' : '7-Day Free Trial'}</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Total Active Days</span>
                        <span className="text-sm font-extrabold text-[#0078D4] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{getRegisteredDays(selectedItem.actual_join_date || selectedItem.created_at)} Days</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Expiration</span>
                        {selectedItem.status === 'Paid' ? (
                          <span className="text-sm font-bold text-green-600">Lifetime / Active</span>
                        ) : (
                          getDaysRemaining(selectedItem) <= 1 ? (
                            <span className="text-sm font-bold text-red-600 flex items-center gap-1"><AlertTriangle className="w-4 h-4"/> Expiring Soon</span>
                          ) : (
                            <span className="text-sm font-bold text-slate-800">{getDaysRemaining(selectedItem)} Days Left</span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* --- Ticket Details --- */}
                  {selectedItem.recordType === 'ticket' && (
                    <div className="relative">
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Status</div>
                        {getStatusBadge(selectedItem.status)}
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <div className="text-sm font-bold text-slate-900 mb-3">Subject: {selectedItem.subject}</div>
                        <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedItem.description}</div>
                      </div>
                      {selectedItem.status === 'open' && (
                        <div className="mt-5 flex gap-3">
                          <Button onClick={() => resolveTicket(selectedItem.id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-10 shadow-sm">
                            <CheckCircle2 className="w-4 h-4 mr-2"/> Mark as Resolved
                          </Button>
                          <select 
                            onChange={(e) => handleUpdateField('tickets', selectedItem.id, 'status', e.target.value)}
                            className="bg-white border border-slate-200 text-sm font-bold text-slate-700 rounded-md px-3 h-10 outline-none cursor-pointer w-32"
                          >
                            <option value="open">Re-open</option>
                            <option value="pending">Pending</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )}

                  {/* --- Subscription Details --- */}
                  {selectedItem.recordType === 'subscription' && (
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                      <div>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Status</span>
                        {getStatusBadge(selectedItem.status)}
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Plan Name</span>
                        <span className="text-sm font-bold text-slate-800">{selectedItem.plan_name}</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Period Start</span>
                        <span className="text-sm font-medium text-slate-700">{new Date(selectedItem.current_period_start).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Period End</span>
                        <span className="text-sm font-bold text-[#0078D4]">{new Date(selectedItem.current_period_end).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="col-span-2 mt-4 pt-6 border-t border-slate-100 flex justify-end">
                         <a href={`https://dashboard.stripe.com/customers/${selectedItem.stripe_customer_id}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
                           View in Stripe Dashboard <ExternalLink className="w-4 h-4"/>
                         </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* --- 模板发件区 (Sub 不显示) --- */}
                {selectedItem.recordType !== 'subscription' && (
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2"><FileText className="w-4 h-4 text-[#0078D4]"/> Smart Templates</h3>
                      
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-slate-400"/>
                        <select 
                          value={templateLang} 
                          onChange={(e) => setTemplateLang(e.target.value as any)}
                          className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 rounded-full px-3 py-1 outline-none focus:ring-1 focus:ring-[#0078D4] cursor-pointer"
                        >
                          {(Object.keys(EMAIL_TEMPLATES) as Array<keyof typeof EMAIL_TEMPLATES>).map(lang => (
                            <option key={lang} value={lang}>{EMAIL_TEMPLATES[lang].label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
                      {(Object.keys(EMAIL_TEMPLATES['en']) as Array<keyof typeof EMAIL_TEMPLATES['en']>).filter(k => k !== 'label').map((key) => (
                        <Button key={key} variant="outline" onClick={() => applyTemplate(key as any)} className="justify-start text-[11px] h-9 bg-slate-50 border-slate-200 shadow-sm hover:border-[#0078D4]/50 hover:bg-blue-50/50 font-bold transition-all px-2 truncate">
                          {EMAIL_TEMPLATES[templateLang][key as any].name}
                        </Button>
                      ))}
                    </div>

                    <div className="flex flex-col gap-4">
                      <Input placeholder="Email Subject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className="font-bold text-sm h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#0078D4]" />
                      <textarea placeholder="Compose your localized message..." value={emailBody} onChange={(e) => setEmailBody(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm min-h-[300px] focus:outline-none focus:ring-2 focus:ring-[#0078D4]/50 leading-relaxed font-medium text-slate-700" />
                    </div>
                  </div>
                )}

                {/* --- 沟通历史与手动日志记录区 --- */}
                <div className="px-2 pb-8">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><History className="w-4 h-4"/> Activity & Comms Log</h3>
                  </div>
                  
                  <div className="mb-8 flex gap-2">
                     <Input placeholder="Add a custom note or communication log..." value={manualNote} onChange={(e) => setManualNote(e.target.value)} className="bg-white border-slate-200 text-sm h-10 shadow-sm"/>
                     <Button onClick={handleAddManualNote} disabled={!manualNote} className="h-10 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-4"><MessageSquarePlus className="w-4 h-4 mr-1.5"/> Add Note</Button>
                  </div>

                  <div className="relative pl-5 border-l-2 border-slate-200 space-y-6 ml-2">
                    <div className="relative">
                      <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-[#fafafa]"></div>
                      <div className="text-xs font-bold text-slate-400 mb-1">{new Date(selectedItem.created_at).toLocaleString()}</div>
                      <div className="text-sm font-bold text-slate-700 bg-white inline-block px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                        {selectedItem.recordType === 'ticket' ? 'Ticket Opened' : selectedItem.recordType === 'subscription' ? 'Subscription Created' : 'Lead Captured'}
                      </div>
                    </div>
                    {(activityLogs[selectedItem.id] || []).map((log, idx) => (
                      <div key={idx} className="relative animate-in fade-in slide-in-from-left-2 group">
                        <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#0078D4] ring-4 ring-[#fafafa]"></div>
                        <div className="text-xs font-bold text-slate-400 mb-1">{log.date}</div>
                        <div className="text-sm font-semibold text-blue-800 bg-blue-50 inline-block px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm w-full">
                          {log.action}
                          {log.content && (
                            <div className="mt-2 pt-2 border-t border-blue-200/50 text-xs text-blue-700/80 whitespace-pre-wrap font-normal leading-relaxed">
                              {log.content}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {selectedItem.recordType !== 'subscription' && (
                <div className="p-6 border-t border-slate-200 bg-white/90 backdrop-blur-md shadow-[0_-10px_20px_rgba(0,0,0,0.03)] flex gap-4">
                  <a href={`mailto:${selectedItem.recordType === 'ticket' ? selectedItem.user_email : selectedItem.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`} className="h-14 w-14 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-all hover:scale-105" title="Open in System Mail App">
                    <Mail className="w-6 h-6"/>
                  </a>
                  <Button 
                    onClick={handleSendEmailInApp}
                    disabled={isSendingEmail || !emailSubject}
                    className="flex-1 h-14 rounded-2xl bg-[#0078D4] hover:bg-[#0060aa] text-white font-extrabold shadow-xl shadow-blue-500/30 transition-all hover:scale-[1.02] text-lg"
                  >
                    {isSendingEmail ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Send Instantly <Send className="w-5 h-5 ml-2"/></>}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}