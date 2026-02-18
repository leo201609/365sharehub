// utils/translations.ts

export type Language = 
  | 'en-US' | 'en-GB' | 'en-CA' | 'en-AS' // 英语变体
  | 'zh-CN' | 'zh-TW' // 中文变体
  | 'de' | 'fr' | 'es' | 'es-MX' | 'it' | 'nl' | 'ja' | 'ko' | 'pt-BR';

// 基础英语文案 (作为回退)
const enBase = {
  common: {
    loading: "Loading...",
    logout: "Logout",
    my_account: "My Account",
    dashboard: "Dashboard",
    welcome: "Welcome back,",
    member_since: "Member since:",
    joined: "Joined:",
    days_ago: "days ago",
    install_apps: "Install Apps",
    install_desc: "Download your apps immediately. Available for active subscribers.",
    locked: "Locked",
    manage_billing: "Manage Billing / Cancel",
    connection_failed: "Connection failed. Please try again.",
    network_error: "Network error.",
    login_title: "Sign In",
    login_desc: "Access your 365ShareHub account",
    back_home: "Back to Home",
  },
  status: {
    subscription_status: "Subscription Status",
    trial_active: "Free Trial Active",
    active: "Active",
    trial_started: "Trial Started",
    first_billing: "First Billing Date",
    trial_ends: "Trial Ends",
    plan_active_since: "Plan Active Since",
    next_renewal: "Next Renewal",
    enjoy_trial: "Enjoy your 7-day free access. Cancel anytime before billing.",
    sub_active: "Subscription Active",
    status_label: "Status",
    trial_period: "Trial Period",
    paid: "Active / Paid",
    you_are_on: "You are on the",
  },
  plans: {
    monthly: "Monthly Plan",
    semi: "Semi-Annual Plan",
    yearly: "Annual Pro",
    most_popular: "MOST POPULAR",
    best_value: "BEST VALUE",
    flexible: "FLEXIBLE",
    mo: "/mo",
    yr: "/yr",
    save_25: "Save 25%",
    save_37: "Save 37%",
    save_25_vs: "Save 25% vs Monthly",
    save_37_vs: "Save 37% vs Monthly",
    only_mo: "Only €2.49 / mo",
    per_mo: "€2.98 / mo",
    start_trial: "Start Free Trial",
    choose_semi: "Choose 6-Months",
    sub_yearly: "Subscribe Yearly",
    pay_after: "Pay after trial, cancel anytime",
  },
  features: {
    copilot: "Includes Copilot & All Apps",
    storage: "1TB OneDrive Storage",
    devices: "PC, Mac, iOS & Android",
    connect: "Connect 5 Devices",
  },
  apps: {
    ai_companion: "Your AI Companion",
    cloud_storage: "Cloud Storage",
    office_portal: "Office Portal",
    email_calendar: "Email & Calendar",
  }
};

// 基础中文文案
const zhBase = {
  common: {
    loading: "加载中...",
    logout: "退出登录",
    my_account: "我的账户",
    dashboard: "仪表盘",
    welcome: "欢迎回来，",
    member_since: "注册时间：",
    joined: "加入时间：",
    days_ago: "天前",
    install_apps: "安装应用",
    install_desc: "立即下载您的应用。仅限有效订阅者使用。",
    locked: "未解锁",
    manage_billing: "管理订阅 / 取消",
    connection_failed: "连接失败，请重试。",
    network_error: "网络错误。",
    login_title: "登录",
    login_desc: "访问您的 365ShareHub 账户",
    back_home: "返回首页",
  },
  status: {
    subscription_status: "订阅状态",
    trial_active: "免费试用进行中",
    active: "订阅生效中",
    trial_started: "试用开始于",
    first_billing: "首次扣款日",
    trial_ends: "试用结束",
    plan_active_since: "订阅开始于",
    next_renewal: "下次续费日",
    enjoy_trial: "享受7天免费试用。扣款前可随时取消。",
    sub_active: "会员权益已激活",
    status_label: "当前状态",
    trial_period: "试用期",
    paid: "生效中 / 已付费",
    you_are_on: "您当前订阅的是",
  },
  plans: {
    monthly: "月付计划",
    semi: "半年付计划",
    yearly: "年付专业版",
    most_popular: "最受欢迎",
    best_value: "超值首选",
    flexible: "灵活之选",
    mo: "/月",
    yr: "/年",
    save_25: "省 25%",
    save_37: "省 37%",
    save_25_vs: "比月付省 25%",
    save_37_vs: "比月付省 37%",
    only_mo: "仅 €2.49 / 月",
    per_mo: "€2.98 / 月",
    start_trial: "开始免费试用",
    choose_semi: "选择半年付",
    sub_yearly: "订阅年付",
    pay_after: "试用后付款，随时可取消",
  },
  features: {
    copilot: "包含 Copilot 及所有应用",
    storage: "1TB OneDrive 云存储",
    devices: "支持 PC, Mac, iOS & Android",
    connect: "同时连接 5 台设备",
  },
  apps: {
    ai_companion: "您的 AI 助手",
    cloud_storage: "云存储",
    office_portal: "Office 门户",
    email_calendar: "邮件与日历",
  }
};

// 映射所有语言
export const translations: Record<Language, typeof enBase> = {
  'en-US': enBase,
  'en-GB': enBase,
  'en-CA': enBase,
  'en-AS': enBase,
  
  'zh-CN': zhBase,
  'zh-TW': {
    ...zhBase,
    common: { ...zhBase.common, loading: "載入中...", logout: "登出", my_account: "我的帳戶", dashboard: "儀表板", install_apps: "安裝應用程式", locked: "未解鎖" },
    status: { ...zhBase.status, subscription_status: "訂閱狀態", active: "訂閱生效中", trial_active: "免費試用進行中" },
    plans: { ...zhBase.plans, monthly: "月付計畫", semi: "半年付計畫", yearly: "年付專業版" }
  },

  // --- 其他语言 (使用英文作为基础，您可以稍后完善翻译) ---
  'de': { ...enBase, common: { ...enBase.common, dashboard: "Übersicht", logout: "Abmelden", my_account: "Mein Konto" }, plans: { ...enBase.plans, monthly: "Monatsplan", start_trial: "Kostenlos testen" } },
  'fr': { ...enBase, common: { ...enBase.common, dashboard: "Tableau de bord", logout: "Se déconnecter" }, plans: { ...enBase.plans, monthly: "Plan Mensuel", start_trial: "Essai gratuit" } },
  'es': { ...enBase, common: { ...enBase.common, dashboard: "Panel", logout: "Cerrar sesión" }, plans: { ...enBase.plans, start_trial: "Prueba gratis" } },
  'es-MX': { ...enBase, common: { ...enBase.common, dashboard: "Panel", logout: "Cerrar sesión" } },
  'it': { ...enBase, common: { ...enBase.common, dashboard: "Cruscotto", logout: "Disconnettersi" } },
  'nl': { ...enBase, common: { ...enBase.common, dashboard: "Dashboard", logout: "Uitloggen" } },
  'ja': { ...enBase, common: { ...enBase.common, dashboard: "ダッシュボード", logout: "ログアウト", my_account: "マイアカウント" }, plans: { ...enBase.plans, monthly: "月額プラン", start_trial: "無料トライアル" } },
  'ko': { ...enBase, common: { ...enBase.common, dashboard: "대시보드", logout: "로그아웃", my_account: "내 계정" }, plans: { ...enBase.plans, monthly: "월간 요금제", start_trial: "무료 체험" } },
  'pt-BR': { ...enBase, common: { ...enBase.common, dashboard: "Painel", logout: "Sair" }, plans: { ...enBase.plans, start_trial: "Teste grátis" } },
};

export const languageOptions: { code: Language; label: string; flag: string }[] = [
  { code: 'en-US', label: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', label: 'English (UK)', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'en-AS', label: 'English (Asia)', flag: '🌏' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'zh-CN', label: '中文 (简体)', flag: '🇨🇳' },
  { code: 'zh-TW', label: '中文 (繁體)', flag: '🇹🇼' },
  { code: 'en-CA', label: 'English (Canada)', flag: '🇨🇦' },
  { code: 'es-MX', label: 'Español (México)', flag: '🇲🇽' },
  { code: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷' },
];