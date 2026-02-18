// utils/translations.ts

export type Language = 
  | 'en-US' | 'en-GB' | 'en-CA' | 'en-AS' 
  | 'zh-CN' | 'zh-TW' 
  | 'de' | 'fr' | 'es' | 'es-MX' | 'it' | 'nl' | 'ja' | 'ko' | 'pt-BR';

// --- 1. 英语 (Base - Source of Truth) ---
const enBase = {
  common: {
    loading: "Loading...", logout: "Logout", my_account: "My Account", dashboard: "Dashboard",
    welcome: "Welcome back,", member_since: "Member since:", joined: "Joined:", days_ago: "days ago",
    install_apps: "Install Apps", install_desc: "Download your apps immediately.",
    locked: "Locked", manage_billing: "Manage Billing / Cancel", connection_failed: "Failed.",
    network_error: "Network error.", back_home: "Back to Home", sign_in: "Sign In",
    sign_in_desc: "Access your 365ShareHub account", email_placeholder: "Email address", password_placeholder: "Password",
    remember_me: "Remember me", forgot_password: "Forgot password?", no_account: "Don't have an account?",
    sign_up: "Sign up", or_continue: "OR CONTINUE WITH",
  },
  status: {
    subscription_status: "Subscription Status", trial_active: "Free Trial Active", active: "Active",
    trial_started: "Trial Started", first_billing: "First Billing Date", trial_ends: "Trial Ends",
    plan_active_since: "Plan Active Since", next_renewal: "Next Renewal",
    enjoy_trial: "Enjoy your 7-day free access. Cancel anytime before billing.", sub_active: "Subscription Active",
    status_label: "Status", trial_period: "Trial Period", paid: "Active / Paid", you_are_on: "You are on the",
  },
  plans: {
    monthly: "Monthly Plan", semi: "Semi-Annual Plan", yearly: "Annual Pro", mo: "/mo", yr: "/yr",
    start_trial: "Start Free Trial", choose_semi: "Choose 6-Months", sub_yearly: "Subscribe Yearly",
    pay_after: "Pay after trial, cancel anytime", flexible: "FLEXIBLE", most_popular: "MOST POPULAR", best_value: "BEST VALUE",
    save_25: "Save 25%", save_37: "Save 37%", save_25_vs: "Save 25% vs Monthly", save_37_vs: "Save 37% vs Monthly",
    only_mo: "Only €2.49 / mo", per_mo: "€2.98 / mo",
  },
  features: {
    copilot: "Includes Copilot & All Apps", storage: "1TB OneDrive Storage",
    devices: "PC, Mac, iOS & Android", connect: "Connect 5 Devices",
  },
  apps: {
    ai_companion: "Your AI Companion", cloud_storage: "Cloud Storage", office_portal: "Office Portal", email_calendar: "Email & Calendar",
  }
};

// --- 2. 德语 (Deutsch) - 完整翻译 ---
const deBase = {
  common: {
    loading: "Laden...", logout: "Abmelden", my_account: "Mein Konto", dashboard: "Übersicht",
    welcome: "Willkommen zurück,", member_since: "Mitglied seit:", joined: "Beigetreten:", days_ago: "Tagen",
    install_apps: "Apps installieren", install_desc: "Laden Sie Ihre Apps sofort herunter.",
    locked: "Gesperrt", manage_billing: "Abo verwalten / Kündigen", connection_failed: "Verbindung fehlgeschlagen.",
    network_error: "Netzwerkfehler.", back_home: "Zurück zur Startseite", sign_in: "Anmelden",
    sign_in_desc: "Auf Ihr Konto zugreifen", email_placeholder: "E-Mail-Adresse", password_placeholder: "Passwort",
    remember_me: "Angemeldet bleiben", forgot_password: "Passwort vergessen?", no_account: "Kein Konto?",
    sign_up: "Registrieren", or_continue: "ODER WEITER MIT",
  },
  status: {
    subscription_status: "Abonnement-Status", trial_active: "Testphase Aktiv", active: "Aktiv",
    trial_started: "Test gestartet", first_billing: "Erste Abrechnung", trial_ends: "Test endet",
    plan_active_since: "Aktiv seit", next_renewal: "Nächste Verlängerung",
    enjoy_trial: "Genießen Sie 7 Tage kostenlos. Jederzeit kündbar.", sub_active: "Abo Aktiv",
    status_label: "Status", trial_period: "Testzeitraum", paid: "Bezahlt", you_are_on: "Ihr Plan:",
  },
  plans: {
    monthly: "Monatsplan", semi: "Halbjahresplan", yearly: "Jahresplan Pro", mo: "/Mon", yr: "/Jahr",
    start_trial: "Kostenlos testen", choose_semi: "6 Monate wählen", sub_yearly: "Jährlich zahlen",
    pay_after: "Später zahlen, jederzeit kündbar", flexible: "FLEXIBEL", most_popular: "BELIEBT", best_value: "BESTER WERT",
    save_25: "25% Sparen", save_37: "37% Sparen", save_25_vs: "Spar 25%", save_37_vs: "Spar 37%",
    only_mo: "Nur €2.49 / Mon", per_mo: "€2.98 / Mon",
  },
  features: {
    copilot: "Inklusive Copilot & alle Apps", storage: "1 TB OneDrive-Speicher", devices: "PC, Mac, iOS & Android", connect: "5 Geräte verbinden",
  },
  apps: {
    ai_companion: "Ihr KI-Begleiter", cloud_storage: "Cloud-Speicher", office_portal: "Office-Portal", email_calendar: "E-Mail & Kalender",
  }
};

// --- 3. 中文 (简体) ---
const zhBase = {
  common: {
    loading: "加载中...", logout: "退出登录", my_account: "我的账户", dashboard: "仪表盘",
    welcome: "欢迎回来，", member_since: "注册时间：", joined: "加入时间：", days_ago: "天前",
    install_apps: "安装应用", install_desc: "立即下载您的应用。仅限有效订阅者。",
    locked: "未解锁", manage_billing: "管理订阅 / 取消", connection_failed: "连接失败。",
    network_error: "网络错误。", back_home: "返回首页", sign_in: "登录",
    sign_in_desc: "访问您的 365ShareHub 账户", email_placeholder: "电子邮箱", password_placeholder: "密码",
    remember_me: "记住我", forgot_password: "忘记密码？", no_account: "还没有账号？",
    sign_up: "立即注册", or_continue: "或通过以下方式",
  },
  status: {
    subscription_status: "订阅状态", trial_active: "免费试用中", active: "订阅生效中",
    trial_started: "试用开始", first_billing: "首次扣款", trial_ends: "试用结束",
    plan_active_since: "订阅开始于", next_renewal: "下次续费",
    enjoy_trial: "享受7天免费试用。随时可取消。", sub_active: "会员已激活",
    status_label: "当前状态", trial_period: "试用期", paid: "已付费", you_are_on: "当前计划:",
  },
  plans: {
    monthly: "月付计划", semi: "半年付计划", yearly: "年付专业版", mo: "/月", yr: "/年",
    start_trial: "开始试用", choose_semi: "选择半年付", sub_yearly: "订阅年付",
    pay_after: "试用后付款，随时取消", flexible: "灵活", most_popular: "最受欢迎", best_value: "超值",
    save_25: "省 25%", save_37: "省 37%", save_25_vs: "省 25%", save_37_vs: "省 37%",
    only_mo: "仅 €2.49/月", per_mo: "€2.98/月",
  },
  features: {
    copilot: "包含 Copilot 及所有应用", storage: "1TB 云存储", devices: "所有设备", connect: "连接 5 台设备",
  },
  apps: {
    ai_companion: "AI 助手", cloud_storage: "云存储", office_portal: "Office 门户", email_calendar: "邮件日历",
  }
};

// --- 4. 日语 (Japanese) ---
const jaBase = {
  common: {
    loading: "読み込み中...", logout: "ログアウト", my_account: "マイアカウント", dashboard: "ダッシュボード",
    welcome: "お帰りなさい、", member_since: "登録日:", joined: "加入:", days_ago: "日前",
    install_apps: "アプリをインストール", install_desc: "アプリを今すぐダウンロード。有効なサブスクリプションが必要です。",
    locked: "ロック中", manage_billing: "請求管理 / キャンセル", connection_failed: "接続失敗。",
    network_error: "ネットワークエラー。", back_home: "ホームに戻る", sign_in: "サインイン",
    sign_in_desc: "アカウントにアクセス", email_placeholder: "メールアドレス", password_placeholder: "パスワード",
    remember_me: "ログイン状態を保持", forgot_password: "パスワードをお忘れですか？", no_account: "アカウントをお持ちでないですか？",
    sign_up: "登録", or_continue: "または次で続行",
  },
  status: {
    subscription_status: "サブスクリプション状況", trial_active: "無料トライアル中", active: "有効",
    trial_started: "開始日", first_billing: "初回請求日", trial_ends: "終了日",
    plan_active_since: "開始日", next_renewal: "次回更新日",
    enjoy_trial: "7日間の無料アクセスをお楽しみください。", sub_active: "サブスクリプション有効",
    status_label: "ステータス", trial_period: "トライアル期間", paid: "支払い済み", you_are_on: "現在のプラン:",
  },
  plans: {
    monthly: "月額プラン", semi: "半年プラン", yearly: "年間プロ", mo: "/月", yr: "/年",
    start_trial: "無料体験を始める", choose_semi: "半年プランを選択", sub_yearly: "年間購読",
    pay_after: "後払い、いつでもキャンセル可", flexible: "柔軟", most_popular: "一番人気", best_value: "ベストバリュー",
    save_25: "25% OFF", save_37: "37% OFF", save_25_vs: "月額より25%お得", save_37_vs: "月額より37%お得",
    only_mo: "月額わずか €2.49", per_mo: "€2.98 / 月",
  },
  features: {
    copilot: "Copilotと全アプリを含む", storage: "1TB OneDriveストレージ", devices: "PC, Mac, iOS & Android", connect: "5台まで接続可能",
  },
  apps: {
    ai_companion: "AIコンパニオン", cloud_storage: "クラウドストレージ", office_portal: "Officeポータル", email_calendar: "メール & カレンダー",
  }
};

// --- 5. 西班牙语 (Spanish) ---
const esBase = {
  common: {
    loading: "Cargando...", logout: "Cerrar sesión", my_account: "Mi Cuenta", dashboard: "Panel",
    welcome: "Bienvenido,", member_since: "Miembro desde:", joined: "Unido:", days_ago: "días",
    install_apps: "Instalar aplicaciones", install_desc: "Descarga tus aplicaciones inmediatamente.",
    locked: "Bloqueado", manage_billing: "Gestionar facturación / Cancelar", connection_failed: "Error de conexión.",
    network_error: "Error de red.", back_home: "Volver al inicio", sign_in: "Iniciar sesión",
    sign_in_desc: "Accede a tu cuenta", email_placeholder: "Correo electrónico", password_placeholder: "Contraseña",
    remember_me: "Recuérdame", forgot_password: "¿Olvidaste tu contraseña?", no_account: "¿No tienes cuenta?",
    sign_up: "Registrarse", or_continue: "O CONTINUAR CON",
  },
  status: {
    subscription_status: "Estado de suscripción", trial_active: "Prueba gratuita", active: "Activo",
    trial_started: "Inicio prueba", first_billing: "Primer cobro", trial_ends: "Fin prueba",
    plan_active_since: "Activo desde", next_renewal: "Próxima renovación",
    enjoy_trial: "Disfruta de 7 días gratis. Cancela cuando quieras.", sub_active: "Suscripción Activa",
    status_label: "Estado", trial_period: "Período de prueba", paid: "Pagado", you_are_on: "Tu plan:",
  },
  plans: {
    monthly: "Plan Mensual", semi: "Plan Semestral", yearly: "Anual Pro", mo: "/mes", yr: "/año",
    start_trial: "Empezar prueba gratis", choose_semi: "Elegir 6 meses", sub_yearly: "Suscribirse anualmente",
    pay_after: "Paga después, cancela cuando quieras", flexible: "FLEXIBLE", most_popular: "POPULAR", best_value: "MEJOR VALOR",
    save_25: "Ahorra 25%", save_37: "Ahorra 37%", save_25_vs: "Ahorra 25%", save_37_vs: "Ahorra 37%",
    only_mo: "Solo €2.49 / mes", per_mo: "€2.98 / mes",
  },
  features: {
    copilot: "Incluye Copilot y todas las apps", storage: "1TB Almacenamiento", devices: "PC, Mac, iOS y Android", connect: "Conecta 5 dispositivos",
  },
  apps: {
    ai_companion: "Tu compañero IA", cloud_storage: "Nube", office_portal: "Portal Office", email_calendar: "Correo y Calendario",
  }
};

// --- 6. 法语 (French) ---
const frBase = {
  common: {
    loading: "Chargement...", logout: "Déconnexion", my_account: "Mon Compte", dashboard: "Tableau de bord",
    welcome: "Bienvenue,", member_since: "Membre depuis:", joined: "Rejoint:", days_ago: "jours",
    install_apps: "Installer les applications", install_desc: "Téléchargez vos applications immédiatement.",
    locked: "Verrouillé", manage_billing: "Gérer facturation / Annuler", connection_failed: "Échec de connexion.",
    network_error: "Erreur réseau.", back_home: "Retour à l'accueil", sign_in: "Se connecter",
    sign_in_desc: "Accédez à votre compte", email_placeholder: "Adresse e-mail", password_placeholder: "Mot de passe",
    remember_me: "Se souvenir de moi", forgot_password: "Mot de passe oublié ?", no_account: "Pas de compte ?",
    sign_up: "S'inscrire", or_continue: "OU CONTINUER AVEC",
  },
  status: {
    subscription_status: "État de l'abonnement", trial_active: "Essai gratuit actif", active: "Actif",
    trial_started: "Début essai", first_billing: "Première facturation", trial_ends: "Fin essai",
    plan_active_since: "Actif depuis", next_renewal: "Prochain renouvellement",
    enjoy_trial: "Profitez de 7 jours gratuits.", sub_active: "Abonnement actif",
    status_label: "Statut", trial_period: "Période d'essai", paid: "Payé", you_are_on: "Votre plan:",
  },
  plans: {
    monthly: "Plan Mensuel", semi: "Plan Semestriel", yearly: "Annuel Pro", mo: "/mois", yr: "/an",
    start_trial: "Essai gratuit", choose_semi: "Choisir 6 mois", sub_yearly: "S'abonner annuellement",
    pay_after: "Payez après, annulez à tout moment", flexible: "FLEXIBLE", most_popular: "POPULAIRE", best_value: "MEILLEUR PRIX",
    save_25: "-25%", save_37: "-37%", save_25_vs: "-25% vs Mensuel", save_37_vs: "-37% vs Mensuel",
    only_mo: "Seulement €2.49 / mois", per_mo: "€2.98 / mois",
  },
  features: {
    copilot: "Inclut Copilot & toutes les apps", storage: "1TB Stockage OneDrive", devices: "PC, Mac, iOS & Android", connect: "Connectez 5 appareils",
  },
  apps: {
    ai_companion: "Votre compagnon IA", cloud_storage: "Stockage Cloud", office_portal: "Portail Office", email_calendar: "Email & Calendrier",
  }
};

// --- 7. 导出映射表 (未完整翻译的语言使用英文保底) ---
export const translations: Record<Language, typeof enBase> = {
  'en-US': enBase, 'en-GB': enBase, 'en-CA': enBase, 'en-AS': enBase,
  'zh-CN': zhBase, 'zh-TW': zhBase, // 繁体暂复用简体结构
  'de': deBase, 
  'ja': jaBase, 
  'es': esBase, 'es-MX': esBase,
  'fr': frBase,
  'ko': { ...enBase, common: { ...enBase.common, dashboard: "대시보드", sign_in: "로그인" } }, // 韩语示例
  'it': enBase, 'nl': enBase, 'pt-BR': enBase, // 其他语言暂时回退英文
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