// utils/translations.ts

export type Language = 
  | 'en-US' | 'en-GB' | 'en-CA' | 'en-AS' 
  | 'zh-CN' | 'zh-TW' 
  | 'de' | 'fr' | 'es' | 'es-MX' | 'it' | 'nl' | 'ja' | 'ko' | 'pt-BR';

// ==========================================
// 1. 英语 (Source of Truth - 基础字典)
// ==========================================
const enBase = {
  // 🔥 新增：首页专有文案
  home: {
    hero_title_1: "Unlock Microsoft 365",
    hero_title_2: "Copilot Productivity.",
    hero_desc: "Boost productivity with Copilot alongside you. Get leading apps with built-in AI, advanced security, and spacious 1 TB cloud storage in one plan.",
    cta_start: "Get Started",
    hero_badge_1: "7-day free trial",
    hero_badge_2: "Use first, pay later",
    section_apps_title: "Everything you need in one plan",
    section_apps_desc: "Get the premium apps, cloud storage, and security you need.",
    pricing_promo: "Enjoy full Microsoft 365 features at a favorable price",
    pricing_title: "Simple, Transparent Pricing",
    footer_copy: "© 2026 365ShareHub Operations. All rights reserved."
  },
  // 🔥 新增：认证页 (登录/注册) 专有文案
  auth: {
    email: "Email address",
    password: "Password",
    full_name: "Full Name",
    sign_in: "Sign In",
    sign_in_desc: "Access your 365ShareHub account",
    sign_up: "Sign up",
    create_account: "Create Account",
    create_desc: "Start your Copilot journey today",
    remember_me: "Remember me",
    forgot_password: "Forgot password?",
    no_account: "Don't have an account?",
    have_account: "Already have an account?",
    or_continue: "OR CONTINUE WITH",
    back_home: "Back to Home"
  },
  common: {
    loading: "Loading...", logout: "Logout", my_account: "My Account", dashboard: "Dashboard",
    welcome: "Welcome back,", member_since: "Member since:", joined: "Joined:", days_ago: "days ago",
    install_apps: "Install Apps", install_desc: "Download your apps immediately.",
    locked: "Locked", manage_billing: "Manage Billing / Cancel", connection_failed: "Failed.", network_error: "Network error.",
    // 保留旧 key 防止 Dashboard 遗漏报错
    sign_in: "Sign In", sign_up: "Sign up", email_placeholder: "Email address", password_placeholder: "Password", back_home: "Back to Home",
  },
  status: {
    subscription_status: "Subscription Status", trial_active: "Free Trial Active", active: "Active",
    trial_started: "Trial Started", first_billing: "First Billing Date", trial_ends: "Trial Ends",
    plan_active_since: "Plan Active Since", next_renewal: "Next Renewal", enjoy_trial: "Enjoy your 7-day free access. Cancel anytime before billing.",
    sub_active: "Subscription Active", status_label: "Status", trial_period: "Trial Period", paid: "Active / Paid", you_are_on: "You are on the",
  },
  plans: {
    flexible: "FLEXIBLE", most_popular: "MOST POPULAR", best_value: "BEST VALUE",
    monthly: "Monthly Plan", semi: "Semi-Annual Plan", yearly: "Annual Pro",
    mo: "/mo", yr: "/yr", per_mo: "€2.98 / mo", only_mo: "Only €2.49 / mo",
    trial_7d: "7-Day Free Trial", save_25: "Save 25%", save_37: "Save 37%",
    start_trial: "Start Free Trial", choose_semi: "Choose 6-Months", sub_yearly: "Subscribe Yearly",
    pay_after: "Pay after trial, cancel anytime", save_25_vs: "Save 25% vs Monthly", save_37_vs: "Save 37% vs Monthly",
  },
  features: { copilot: "Includes Copilot & All Apps", storage: "1TB OneDrive Storage", devices: "PC, Mac, iOS & Android", connect: "Connect 5 Devices" },
  apps: { ai_companion: "Your AI Companion", cloud_storage: "Cloud Storage", office_portal: "Office Portal", email_calendar: "Email & Calendar" }
};

// ==========================================
// 2. 德语 (Deutsch)
// ==========================================
const deBase = {
  home: { hero_title_1: "Microsoft 365 freischalten", hero_title_2: "Copilot Produktivität.", hero_desc: "Steigern Sie Ihre Produktivität mit Copilot an Ihrer Seite. Erhalten Sie führende Apps, erweiterte Sicherheit und 1 TB Cloud-Speicher.", cta_start: "Jetzt starten", hero_badge_1: "7 Tage kostenlos testen", hero_badge_2: "Erst nutzen, später zahlen", section_apps_title: "Alles in einem Plan", section_apps_desc: "Holen Sie sich Premium-Apps und Cloud-Speicher.", pricing_promo: "Alle Microsoft 365-Funktionen zum günstigen Preis", pricing_title: "Einfache Preise", footer_copy: "© 2026 365ShareHub. Alle Rechte vorbehalten." },
  auth: { email: "E-Mail-Adresse", password: "Passwort", full_name: "Vollständiger Name", sign_in: "Anmelden", sign_in_desc: "Auf Ihr Konto zugreifen", sign_up: "Registrieren", create_account: "Konto erstellen", create_desc: "Starten Sie Ihre Copilot-Reise", remember_me: "Angemeldet bleiben", forgot_password: "Passwort vergessen?", no_account: "Noch kein Konto?", have_account: "Bereits ein Konto?", or_continue: "ODER WEITER MIT", back_home: "Zurück zur Startseite" },
  common: { ...enBase.common, loading: "Laden...", logout: "Abmelden", my_account: "Mein Konto", dashboard: "Übersicht", welcome: "Willkommen zurück,", member_since: "Mitglied seit:", joined: "Beigetreten:", days_ago: "Tagen", install_apps: "Apps installieren", install_desc: "Laden Sie Ihre Apps sofort herunter.", locked: "Gesperrt", manage_billing: "Abo verwalten / Kündigen", sign_in: "Anmelden", sign_up: "Registrieren" },
  status: { ...enBase.status, subscription_status: "Abonnement-Status", trial_active: "Testphase Aktiv", active: "Aktiv", trial_started: "Test gestartet", first_billing: "Erste Abrechnung", trial_ends: "Test endet", plan_active_since: "Aktiv seit", next_renewal: "Nächste Verlängerung", enjoy_trial: "7 Tage kostenlos. Jederzeit kündbar.", sub_active: "Abo Aktiv", status_label: "Status", trial_period: "Testzeitraum", paid: "Bezahlt", you_are_on: "Ihr Plan:" },
  plans: { ...enBase.plans, flexible: "FLEXIBEL", most_popular: "BELIEBT", best_value: "BESTER WERT", monthly: "Monatsplan", semi: "Halbjahresplan", yearly: "Jahresplan Pro", mo: "/Mon", yr: "/Jahr", trial_7d: "7 Tage kostenlos", save_25: "25% Sparen", save_37: "37% Sparen", start_trial: "Kostenlos testen", choose_semi: "6 Monate wählen", sub_yearly: "Jährlich zahlen", pay_after: "Später zahlen, jederzeit kündbar", save_25_vs: "Spar 25%", save_37_vs: "Spar 37%" },
  features: { copilot: "Inklusive Copilot & alle Apps", storage: "1 TB OneDrive-Speicher", devices: "PC, Mac, iOS & Android", connect: "5 Geräte verbinden" },
  apps: { ai_companion: "Ihr KI-Begleiter", cloud_storage: "Cloud-Speicher", office_portal: "Office-Portal", email_calendar: "E-Mail & Kalender" }
};

// ==========================================
// 3. 简体中文 (zh-CN)
// ==========================================
const zhBase = {
  home: { hero_title_1: "解锁 Microsoft 365", hero_title_2: "Copilot 生产力。", hero_desc: "有 Copilot 在您身边，大幅提升生产力。一次获取内置 AI 的领先应用、高级安全性和 1 TB 云存储空间。", cta_start: "开始试用", hero_badge_1: "7天免费试用", hero_badge_2: "先使用，后付费", section_apps_title: "一个计划，满足所有需求", section_apps_desc: "获取您需要的高级应用、云存储和安全性。", pricing_promo: "以优惠价格享受完整功能", pricing_title: "简单透明的定价", footer_copy: "© 2026 365ShareHub. 保留所有权利。" },
  auth: { email: "电子邮箱", password: "密码", full_name: "全名", sign_in: "登录", sign_in_desc: "访问您的账户", sign_up: "注册", create_account: "创建账号", create_desc: "开启您的 Copilot 生产力之旅", remember_me: "记住我", forgot_password: "忘记密码？", no_account: "还没有账号？", have_account: "已有账号？", or_continue: "或者使用以下方式", back_home: "返回首页" },
  common: { ...enBase.common, loading: "加载中...", logout: "退出登录", my_account: "我的账户", dashboard: "仪表盘", welcome: "欢迎回来，", member_since: "注册时间：", joined: "加入时间：", days_ago: "天前", install_apps: "安装应用", install_desc: "立即下载您的应用。仅限有效订阅者。", locked: "未解锁", manage_billing: "管理订阅 / 取消", sign_in: "登录", sign_up: "注册" },
  status: { ...enBase.status, subscription_status: "订阅状态", trial_active: "免费试用中", active: "订阅生效中", trial_started: "试用开始", first_billing: "首次扣款", trial_ends: "试用结束", plan_active_since: "订阅开始于", next_renewal: "下次续费", enjoy_trial: "享受7天免费试用。随时可取消。", sub_active: "会员已激活", status_label: "当前状态", trial_period: "试用期", paid: "已付费", you_are_on: "当前计划:" },
  plans: { ...enBase.plans, flexible: "灵活", most_popular: "最受欢迎", best_value: "超值", monthly: "月付计划", semi: "半年计划", yearly: "年付专业版", mo: "/月", yr: "/年", trial_7d: "7天免费试用", save_25: "省 25%", save_37: "省 37%", start_trial: "开始试用", choose_semi: "选择半年付", sub_yearly: "订阅年付", pay_after: "试用后付款，随时取消", save_25_vs: "省 25%", save_37_vs: "省 37%" },
  features: { copilot: "包含 Copilot 及所有应用", storage: "1TB 云存储", devices: "所有设备", connect: "连接 5 台设备" },
  apps: { ai_companion: "AI 助手", cloud_storage: "云存储", office_portal: "Office 门户", email_calendar: "邮件日历" }
};

// ==========================================
// 4. 繁体中文 (zh-TW)
// ==========================================
const twBase = {
  ...zhBase,
  home: { ...zhBase.home, hero_title_1: "解鎖 Microsoft 365", hero_title_2: "Copilot 生產力。", hero_desc: "有 Copilot 在您身邊，大幅提升生產力。一次獲取內置 AI 的領先應用、高級安全性和 1 TB 雲端存儲空間。", cta_start: "開始試用", hero_badge_1: "7天免費試用", hero_badge_2: "先使用，後付費", section_apps_title: "一個計劃，滿足所有需求", section_apps_desc: "獲取您需要的高級應用程式、雲端存儲和安全性。" },
  auth: { ...zhBase.auth, email: "電子郵件", password: "密碼", full_name: "全名", sign_in: "登入", sign_in_desc: "訪問您的帳戶", sign_up: "註冊", create_account: "創建帳號", create_desc: "開啟您的 Copilot 之旅", remember_me: "記住我", forgot_password: "忘記密碼？", no_account: "還沒有帳號？", have_account: "已有帳號？", or_continue: "或使用以下方式", back_home: "返回首頁" },
  common: { ...zhBase.common, my_account: "我的帳戶", dashboard: "儀表板", loading: "載入中...", logout: "登出", welcome: "歡迎回來，", install_apps: "安裝應用程式", locked: "未解鎖", manage_billing: "管理訂閱 / 取消" },
  status: { ...zhBase.status, subscription_status: "訂閱狀態", trial_active: "免費試用中", active: "訂閱生效中", trial_period: "試用期", paid: "已付費" }
};

// ==========================================
// 5. 日语 (Japanese)
// ==========================================
const jaBase = {
  home: { hero_title_1: "Microsoft 365 を", hero_title_2: "Copilot で解放", hero_desc: "Copilot と共に生産性を向上。AI 搭載アプリと 1 TB のクラウドストレージを 1 つのプランで。", cta_start: "始める", hero_badge_1: "7日間無料体験", hero_badge_2: "体験後のお支払い", section_apps_title: "必要なすべてを1つのプランで", section_apps_desc: "プレミアムアプリとセキュリティをすべて入手。", pricing_promo: "全機能をお得な価格で", pricing_title: "シンプルな価格設定", footer_copy: "© 2026 365ShareHub. 無断複写・転載を禁じます。" },
  auth: { email: "メールアドレス", password: "パスワード", full_name: "氏名", sign_in: "サインイン", sign_in_desc: "アカウントにアクセス", sign_up: "登録", create_account: "アカウント作成", create_desc: "Copilot の旅を始めましょう", remember_me: "ログイン状態を保持", forgot_password: "パスワードをお忘れですか？", no_account: "アカウントをお持ちでないですか？", have_account: "すでにアカウントをお持ちですか？", or_continue: "または次で続行", back_home: "ホームに戻る" },
  common: { ...enBase.common, my_account: "マイアカウント", dashboard: "ダッシュボード", loading: "読み込み中...", logout: "ログアウト", welcome: "お帰りなさい、", member_since: "登録日:", joined: "加入:", days_ago: "日前", install_apps: "アプリをインストール", install_desc: "アプリを今すぐダウンロード。", locked: "ロック中", manage_billing: "請求管理 / キャンセル", sign_in: "サインイン", sign_up: "登録" },
  status: { ...enBase.status, subscription_status: "サブスクリプション状況", trial_active: "無料トライアル中", active: "有効", trial_started: "開始日", first_billing: "初回請求日", trial_ends: "終了日", plan_active_since: "開始日", next_renewal: "次回更新日", enjoy_trial: "7日間の無料アクセス。いつでもキャンセル可。", sub_active: "サブスクリプション有効", status_label: "ステータス", trial_period: "トライアル期間", paid: "支払い済み", you_are_on: "現在のプラン:" },
  plans: { ...enBase.plans, flexible: "柔軟", most_popular: "一番人気", best_value: "ベストバリュー", monthly: "月額プラン", semi: "半年プラン", yearly: "年間プロ", mo: "/月", yr: "/年", trial_7d: "7日間無料", save_25: "25% お得", save_37: "37% お得", start_trial: "無料体験", choose_semi: "半年プラン", sub_yearly: "年間購読", pay_after: "後払い、キャンセル可", save_25_vs: "25% お得", save_37_vs: "37% お得" },
  features: { copilot: "Copilot 含む", storage: "1TB ストレージ", devices: "5台接続", platform: "全デバイス対応" },
  apps: { ai_companion: "AIコンパニオン", cloud_storage: "クラウド", office_portal: "Officeポータル", email_calendar: "メール & カレンダー" }
};

// ==========================================
// 6. 西班牙语 (Spanish)
// ==========================================
const esBase = {
  home: { hero_title_1: "Desbloquea Microsoft 365", hero_title_2: "Productividad Copilot.", hero_desc: "Aumenta la productividad con Copilot. Obtén apps con IA integrada y 1 TB de almacenamiento.", cta_start: "Empezar", hero_badge_1: "Prueba gratis de 7 días", hero_badge_2: "Usa primero, paga después", section_apps_title: "Todo en un solo plan", section_apps_desc: "Obtén las apps premium que necesitas.", pricing_promo: "Disfruta de Microsoft 365 a un gran precio", pricing_title: "Precios Simples", footer_copy: "© 2026 365ShareHub. Todos los derechos reservados." },
  auth: { email: "Correo electrónico", password: "Contraseña", full_name: "Nombre completo", sign_in: "Iniciar sesión", sign_in_desc: "Accede a tu cuenta", sign_up: "Registrarse", create_account: "Crear cuenta", create_desc: "Inicia tu viaje con Copilot", remember_me: "Recuérdame", forgot_password: "¿Olvidaste tu contraseña?", no_account: "¿No tienes cuenta?", have_account: "¿Ya tienes cuenta?", or_continue: "O CONTINUAR CON", back_home: "Volver al inicio" },
  common: { ...enBase.common, my_account: "Mi Cuenta", dashboard: "Panel", loading: "Cargando...", logout: "Cerrar sesión", welcome: "Bienvenido,", member_since: "Miembro desde:", joined: "Unido:", days_ago: "días", install_apps: "Instalar apps", install_desc: "Descarga tus aplicaciones inmediatamente.", locked: "Bloqueado", manage_billing: "Gestionar facturación", sign_in: "Iniciar sesión", sign_up: "Registrarse" },
  status: { ...enBase.status, subscription_status: "Estado de suscripción", trial_active: "Prueba Activa", active: "Activo", trial_started: "Inicio de prueba", first_billing: "Primer cobro", trial_ends: "Fin de prueba", plan_active_since: "Activo desde", next_renewal: "Renovación", enjoy_trial: "Disfruta 7 días gratis. Cancela cuando quieras.", sub_active: "Suscripción Activa", status_label: "Estado", trial_period: "Período de prueba", paid: "Pagado", you_are_on: "Tu plan:" },
  plans: { ...enBase.plans, flexible: "FLEXIBLE", most_popular: "POPULAR", best_value: "MEJOR VALOR", monthly: "Plan Mensual", semi: "Plan Semestral", yearly: "Pro Anual", mo: "/mes", yr: "/año", trial_7d: "Prueba 7 días", save_25: "Ahorra 25%", save_37: "Ahorra 37%", start_trial: "Prueba gratis", choose_semi: "Elegir 6 Meses", sub_yearly: "Suscribirse Anual", pay_after: "Cancela cuando quieras", save_25_vs: "Ahorra 25%", save_37_vs: "Ahorra 37%" },
  features: { copilot: "Incluye Copilot y Apps", storage: "1 TB de almacenamiento", devices: "Conecta 5 dispositivos", platform: "PC, Mac, iOS y Android" },
  apps: { ai_companion: "Tu IA", cloud_storage: "Nube", office_portal: "Portal Office", email_calendar: "Correo y Calendario" }
};

// ==========================================
// 7. 法语 (French)
// ==========================================
const frBase = {
  home: { hero_title_1: "Débloquez Microsoft 365", hero_title_2: "Productivité Copilot.", hero_desc: "Boostez votre productivité avec Copilot. Obtenez des apps avec IA intégrée et 1 To de stockage cloud.", cta_start: "Commencer", hero_badge_1: "Essai gratuit 7 jours", hero_badge_2: "Utilisez d'abord, payez ensuite", section_apps_title: "Tout dans un seul plan", section_apps_desc: "Obtenez les applications premium et le stockage dont vous avez besoin.", pricing_promo: "Profitez de fonctionnalités complètes à bon prix", pricing_title: "Tarification simple", footer_copy: "© 2026 365ShareHub. Tous droits réservés." },
  auth: { email: "Adresse e-mail", password: "Mot de passe", full_name: "Nom complet", sign_in: "Se connecter", sign_in_desc: "Accédez à votre compte", sign_up: "S'inscrire", create_account: "Créer un compte", create_desc: "Commencez votre voyage Copilot", remember_me: "Se souvenir de moi", forgot_password: "Mot de passe oublié ?", no_account: "Pas de compte ?", have_account: "Déjà un compte ?", or_continue: "OU CONTINUER AVEC", back_home: "Retour à l'accueil" },
  common: { ...enBase.common, my_account: "Mon Compte", dashboard: "Tableau de bord", loading: "Chargement...", logout: "Déconnexion", welcome: "Bienvenue,", member_since: "Membre depuis:", joined: "Rejoint:", days_ago: "jours", install_apps: "Installer les apps", install_desc: "Téléchargez vos applications immédiatement.", locked: "Verrouillé", manage_billing: "Gérer la facturation", sign_in: "Se connecter", sign_up: "S'inscrire" },
  status: { ...enBase.status, subscription_status: "Statut de l'abonnement", trial_active: "Essai Actif", active: "Actif", trial_started: "Début de l'essai", first_billing: "Première facturation", trial_ends: "Fin de l'essai", plan_active_since: "Actif depuis", next_renewal: "Renouvellement", enjoy_trial: "Profitez de 7 jours gratuits. Annulez à tout moment.", sub_active: "Abonnement Actif", status_label: "Statut", trial_period: "Période d'essai", paid: "Payé", you_are_on: "Votre plan:" },
  plans: { ...enBase.plans, flexible: "FLEXIBLE", most_popular: "POPULAIRE", best_value: "MEILLEUR PRIX", monthly: "Plan Mensuel", semi: "Plan Semestriel", yearly: "Pro Annuel", mo: "/mois", yr: "/an", trial_7d: "Essai gratuit 7j", save_25: "Économisez 25%", save_37: "Économisez 37%", start_trial: "Essai gratuit", choose_semi: "Choisir 6 Mois", sub_yearly: "S'abonner", pay_after: "Payez après l'essai", save_25_vs: "-25%", save_37_vs: "-37%" },
  features: { copilot: "Inclut Copilot & Apps", storage: "1 To de stockage cloud", devices: "Connectez 5 appareils", platform: "PC, Mac, iOS & Android" },
  apps: { ai_companion: "Compagnon IA", cloud_storage: "Stockage Cloud", office_portal: "Portail Office", email_calendar: "Email & Calendrier" }
};

// --- 其他语言回退基础配置 ---
const koBase = { ...enBase, common: { ...enBase.common, dashboard: "대시보드", sign_in: "로그인" } };
const itBase = { ...enBase, auth: { ...enBase.auth, sign_in: "Accedi" }, common: { ...enBase.common, dashboard: "Cruscotto" } };
const nlBase = { ...enBase, auth: { ...enBase.auth, sign_in: "Inloggen" }, common: { ...enBase.common, dashboard: "Dashboard" } };
const ptBase = { ...enBase, auth: { ...enBase.auth, sign_in: "Entrar" }, common: { ...enBase.common, dashboard: "Painel" } };

// --- 导出映射表 ---
export const translations: Record<Language, typeof enBase> = {
  'en-US': enBase, 'en-GB': enBase, 'en-CA': enBase, 'en-AS': enBase,
  'zh-CN': zhBase, 'zh-TW': twBase,
  'de': deBase, 'fr': frBase, 'es': esBase, 'es-MX': esBase,
  'ja': jaBase, 'ko': koBase,
  'it': itBase, 'nl': nlBase, 'pt-BR': ptBase,
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