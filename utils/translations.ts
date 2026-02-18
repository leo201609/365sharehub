// utils/translations.ts

export type Language = 
  | 'en-US' | 'en-GB' | 'en-CA' | 'en-AS' 
  | 'zh-CN' | 'zh-TW' 
  | 'de' | 'fr' | 'es' | 'es-MX' | 'it' | 'nl' | 'ja' | 'ko' | 'pt-BR';

// --- 1. 英语基础文案 (作为全站的保底，必须最完整) ---
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
    back_home: "Back to Home",
    sign_in: "Sign In",
    sign_in_desc: "Access your 365ShareHub account",
    email_placeholder: "Email address",
    password_placeholder: "Password",
    remember_me: "Remember me",
    forgot_password: "Forgot password?",
    no_account: "Don't have an account?",
    sign_up: "Sign up",
    or_continue: "OR CONTINUE WITH",
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
    mo: "/mo",
    yr: "/yr",
    start_trial: "Start Free Trial",
    choose_semi: "Choose 6-Months",
    sub_yearly: "Subscribe Yearly",
    pay_after: "Pay after trial, cancel anytime",
    flexible: "FLEXIBLE",
    most_popular: "MOST POPULAR",
    best_value: "BEST VALUE",
    save_25: "Save 25%",
    save_37: "Save 37%",
    save_25_vs: "Save 25% vs Monthly",
    save_37_vs: "Save 37% vs Monthly",
    only_mo: "Only €2.49 / mo",
    per_mo: "€2.98 / mo",
  },
  // 🔥 修复点：添加 features 对象，防止 Dashboard 报错
  features: {
    copilot: "Includes Copilot & All Apps",
    storage: "1TB OneDrive Storage",
    devices: "PC, Mac, iOS & Android",
    connect: "Connect 5 Devices",
  },
  // 🔥 修复点：添加 apps 对象，防止 Dashboard 报错
  apps: {
    ai_companion: "Your AI Companion",
    cloud_storage: "Cloud Storage",
    office_portal: "Office Portal",
    email_calendar: "Email & Calendar",
  }
};

// --- 2. 中文文案 (通过 ...enBase 继承，只改中文部分) ---
const zhBase = {
  ...enBase,
  common: {
    ...enBase.common,
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
    back_home: "返回首页",
    sign_in: "登录",
    sign_in_desc: "访问您的 365ShareHub 账户",
    email_placeholder: "电子邮箱地址",
    password_placeholder: "密码",
    remember_me: "记住我",
    forgot_password: "忘记密码？",
    no_account: "还没有账号？",
    sign_up: "立即注册",
    or_continue: "或者使用以下方式登录",
  },
  status: {
    ...enBase.status,
    subscription_status: "订阅状态",
    trial_active: "免费试用进行中",
    active: "订阅生效中",
    status_label: "当前状态",
    paid: "生效中 / 已付费",
  },
  plans: {
    ...enBase.plans,
    monthly: "月付计划",
    semi: "半年付计划",
    yearly: "年付专业版",
    mo: "/月",
    yr: "/年",
    start_trial: "开始免费试用",
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

// --- 3. 德语文案 ---
const deBase = {
  ...enBase,
  common: {
    ...enBase.common,
    loading: "Wird geladen...",
    logout: "Abmelden",
    my_account: "Mein Konto",
    dashboard: "Übersicht",
    welcome: "Willkommen zurück,",
    member_since: "Mitglied seit:",
    joined: "Beigetreten:",
    days_ago: "Tagen",
    install_apps: "Apps installieren",
    back_home: "Zurück zur Startseite",
    sign_in: "Anmelden",
    or_continue: "ODER WEITER MIT",
  },
  status: {
    ...enBase.status,
    subscription_status: "Abonnement-Status",
    trial_active: "Kostenlose Testversion aktiv",
    active: "Aktiv",
  },
  plans: {
    ...enBase.plans,
    monthly: "Monatsplan",
    start_trial: "Kostenlos testen",
  }
  // features 和 apps 会自动使用 enBase 的内容，不会崩溃
};

// --- 4. 导出映射表 ---
export const translations: Record<Language, typeof enBase> = {
  'en-US': enBase,
  'en-GB': enBase,
  'en-CA': enBase,
  'en-AS': enBase,
  'zh-CN': zhBase,
  'zh-TW': {
    ...zhBase,
    common: { ...zhBase.common, loading: "載入中...", logout: "登出", my_account: "我的帳戶", dashboard: "儀表板" }
  },
  'de': deBase,
  // 其他语言暂时使用全量英文保底，确保不崩溃
  'fr': enBase,
  'es': enBase,
  'es-MX': enBase,
  'it': enBase,
  'nl': enBase,
  'ja': enBase,
  'ko': enBase,
  'pt-BR': enBase,
};

// --- 5. 语言选项 ---
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