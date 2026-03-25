// utils/translations.ts

export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'de' | 'fr' | 'es' | 'ja' | 'ko' | 'pt';

// ==========================================
// 1. 英语 (en - Source of Truth)
// ==========================================
const enBase = {
  home: { 
    hero_title_1: "Unlock Microsoft 365", hero_title_2: "Copilot Productivity.", hero_desc: "Boost productivity with Copilot alongside you. Get leading apps with built-in AI, advanced security, and spacious 1 TB cloud storage in one plan.", 
    cta_start: "Get Started", hero_badge_1: "7-day free trial", hero_badge_2: "Use first, pay later", 
    section_apps_title: "Everything you need in one plan", section_apps_desc: "Get the premium apps, cloud storage, and security you need.", 
    pricing_promo: "Enjoy full Microsoft 365 features at a favorable price", pricing_title: "Simple, Transparent Pricing", 
    footer_copy: "© 2026 365ShareHub Operations. All rights reserved.",
    email_placeholder: "Your MS Account Email", feature_no_cc: "No credit card required", feature_no_reg: "No registration", feature_instant: "Instant access", questions_btn: "Questions?"
  },
  auth: { email: "Email address", password: "Password", full_name: "Full Name", sign_in: "Sign In", sign_in_desc: "Access your 365ShareHub account", sign_up: "Sign up", create_account: "Create Account", create_desc: "Start your Copilot journey today", remember_me: "Remember me", forgot_password: "Forgot password?", no_account: "Don't have an account?", have_account: "Already have an account?", or_continue: "OR CONTINUE WITH", back_home: "Back to Home", invalid_credentials: "❌ Invalid credentials. Please try again." },
  common: { loading: "Loading...", logout: "Logout", my_account: "My Account", dashboard: "Dashboard", welcome: "Welcome back,", member_since: "Member since:", joined: "Joined:", days_ago: "days ago", install_apps: "Install Apps", install_desc: "Download your apps immediately.", locked: "Locked", manage_billing: "Manage Billing / Cancel", connection_failed: "Failed.", network_error: "Network error.", sign_in: "Sign In", sign_up: "Sign up", email_placeholder: "Email address", password_placeholder: "Password", back_home: "Back to Home", learn_more: "Learn more", join_community: "Join Community" },
  status: { subscription_status: "Subscription Status", trial_active: "Free Trial Active", active: "Active", trial_started: "Trial Started", first_billing: "First Billing Date", trial_ends: "Trial Ends", plan_active_since: "Plan Active Since", next_renewal: "Next Renewal", enjoy_trial: "Enjoy your 7-day free access. Cancel anytime before billing.", sub_active: "Subscription Active", status_label: "Status", trial_period: "Trial Period", paid: "Active / Paid", you_are_on: "You are on the" },
  plans: { flexible: "FLEXIBLE", most_popular: "MOST POPULAR", best_value: "BEST VALUE", monthly: "Monthly Plan", semi: "Semi-Annual Plan", yearly: "Annual Pro", mo: "/mo", yr: "/yr", per_mo: "€2.98 / mo", only_mo: "Only €2.49 / mo", trial_7d: "7-Day Free Trial", save_25: "Save 14%", save_37: "Save 33%", start_trial: "Start Free Trial", choose_semi: "Choose 6-Months", sub_yearly: "Subscribe Yearly", pay_after: "Pay after trial, cancel anytime", save_25_vs: "Save 14%", save_37_vs: "Save 33%" },
  features: { copilot: "Includes Copilot & All Apps", storage: "1TB OneDrive Storage", devices: "PC, Mac, iOS & Android", connect: "Connect 5 Devices" },
  apps: { ai_companion: "Your AI Companion", cloud_storage: "Cloud Storage", office_portal: "Office Portal", email_calendar: "Email & Calendar" },
  faq: { title: "Frequently Asked Questions", desc: "Everything you need to know about the product and billing." },
  support: { title: "Contact Support", btn: "Contact Support", desc: "How can we help you today?", subject: "Subject", subject_placeholder: "Briefly describe your issue", message: "Message", message_placeholder: "Provide more details...", cancel: "Cancel", submit: "Send Message", success: "Message sent successfully!", error: "Failed to send message. Please try again." },
  
  // 🔥 新增：Footer 链接翻译
  footer: { secure_payment: "Secure Payment", privacy: "Privacy Policy", terms: "Terms of Service", sitemap: "Sitemap", rights: "All rights reserved." },
  
  // 🔥 新增：Privacy Policy 页面翻译
  privacy: { 
    title: "Privacy Policy", last_updated: "LAST UPDATED: MARCH 2026", 
    s1_t: "1. Information We Collect", s1_d: "We collect information that you provide directly to us when you use our services. This includes your email address (specifically your Microsoft account email) when you sign up for a trial or subscription. We use Stripe for payment processing and do not store your credit card information on our servers.", 
    s2_t: "2. How We Use Your Information", s2_d: "We use the information we collect to provide, maintain, and improve our services, including adding your account to our Premium Family Group, processing your transactions, sending you technical notices, and providing customer support.", 
    s3_t: "3. Microsoft Account Security", s3_d: "We do not require or ask for your Microsoft account password. You authenticate directly with Microsoft. We only need your email address to send the Family Group invitation. Your OneDrive data remains strictly private to you; administrators cannot access your personal files.", 
    s4_t: "4. Third-Party Services", s4_d: "We use Stripe to process payments securely. When you make a purchase, you are subject to Stripe's Privacy Policy and Terms of Service. We do not share your personal information with other third parties for marketing purposes.", 
    s5_t: "5. Contact Us", s5_d: "If you have any questions about this Privacy Policy, please contact us at support@365sharehub.com." 
  },

  app_list: [
    { name: "Copilot", desc: "Your everyday AI companion." }, { name: "OneDrive", desc: "Save and share safely." },
    { name: "Word", desc: "Elevate your writing." }, { name: "Excel", desc: "Turn data into insights." },
    { name: "PowerPoint", desc: "Create impactful slides." }, { name: "Access", desc: "Create database apps." },
    { name: "Outlook", desc: "Email and calendar." }, { name: "Teams", desc: "Meet, chat, call, collab." },
    { name: "OneNote", desc: "Your digital notebook." }, { name: "Clipchamp", desc: "Video editor with AI." },
    { name: "Designer", desc: "Create stunning graphics." }, { name: "Defender", desc: "Protect data and devices." }
  ],
  faq_list: [
    { question: "How does the 7-day free trial and billing work?", answer: "Welcome to 365ShareHub! You can enjoy a 7-day free trial and pay only after you are 100% satisfied. If you are not satisfied, you can easily cancel anytime before the trial ends without being charged a single cent." },
    { question: "How do I get access after starting a trial/subscription?", answer: "First, please use your Microsoft account email for quick registration. After selecting a plan, you will receive an official Microsoft Family Group invitation email within 24 hours (please check your spam folder). Simply click confirm to join. Once joined, you can instantly use MS Office apps and your 1TB cloud storage." },
    { question: "What devices are supported? Can I choose my language?", answer: "Absolutely! You can install the software in your familiar language. It works seamlessly on Mac, Windows, smartphones, and tablets. You can switch and use it on up to 5 devices simultaneously." },
    { question: "Is my 1TB cloud storage private?", answer: "100% private. Although you join via a Family Group, your 1TB OneDrive storage is completely independent and secured by Microsoft. No one else can access your personal files." },
    { question: "Is the service stable for long-term use?", answer: "We guarantee long-term stable operation and reliable service. We welcome you to join our long-term subscription plans to enjoy continuous productivity." },
    { question: "Is my payment secure? What payment methods do you support?", answer: "Absolutely. All transactions are securely processed with bank-level encryption through Stripe. We never store your credit card data on our servers. We support Credit/Debit Cards, PayPal, Klarna, Apple Pay, Google Pay, and SEPA." }
  ]
};

// ==========================================
// 2. 德语 (de)
// ==========================================
const deBase: typeof enBase = {
  ...enBase,
  home: { ...enBase.home, hero_title_1: "Microsoft 365 freischalten", hero_title_2: "Copilot Produktivität.", hero_desc: "Steigern Sie Ihre Produktivität mit Copilot an Ihrer Seite. Erhalten Sie führende Apps, erweiterte Sicherheit und 1 TB Cloud-Speicher.", cta_start: "Jetzt starten", hero_badge_1: "7 Tage kostenlos testen", hero_badge_2: "Erst nutzen, später zahlen", section_apps_title: "Alles in einem Plan", section_apps_desc: "Holen Sie sich Premium-Apps und Cloud-Speicher.", pricing_promo: "Alle Microsoft 365-Funktionen zum günstigen Preis", pricing_title: "Einfache Preise", email_placeholder: "Ihre Microsoft-Konto-E-Mail", feature_no_cc: "Keine Kreditkarte nötig", feature_no_reg: "Keine Registrierung", feature_instant: "Sofortiger Zugriff", questions_btn: "Fragen?" },
  auth: { ...enBase.auth, email: "E-Mail-Adresse", password: "Passwort", full_name: "Vollständiger Name", sign_in: "Anmelden", sign_in_desc: "Auf Ihr Konto zugreifen", sign_up: "Registrieren", create_account: "Konto erstellen", create_desc: "Starten Sie Ihre Copilot-Reise", remember_me: "Angemeldet bleiben", forgot_password: "Passwort vergessen?", no_account: "Noch kein Konto?", have_account: "Bereits ein Konto?", or_continue: "ODER WEITER MIT", back_home: "Zurück zur Startseite", invalid_credentials: "❌ Ungültige Anmeldedaten. Bitte versuchen Sie es erneut." },
  common: { ...enBase.common, loading: "Laden...", logout: "Abmelden", my_account: "Mein Konto", dashboard: "Übersicht", welcome: "Willkommen zurück,", install_apps: "Apps installieren", manage_billing: "Abo verwalten / Kündigen", learn_more: "Mehr erfahren", sign_in: "Anmelden", join_community: "Community beitreten" },
  status: { ...enBase.status, subscription_status: "Abonnement-Status", trial_active: "Testphase Aktiv", active: "Aktiv", enjoy_trial: "7 Tage kostenlos. Jederzeit kündbar." },
  plans: { ...enBase.plans, flexible: "FLEXIBEL", most_popular: "BELIEBT", best_value: "BESTER WERT", monthly: "Monatsplan", semi: "Halbjahresplan", yearly: "Jahresplan Pro", trial_7d: "7 Tage kostenlos", save_25: "14% Sparen", save_37: "33% Sparen", start_trial: "Kostenlos testen", choose_semi: "6 Monate wählen", sub_yearly: "Jährlich abonnieren", pay_after: "Später zahlen, jederzeit kündbar" },
  features: { copilot: "Inklusive Copilot & alle Apps", storage: "1 TB OneDrive-Speicher", devices: "PC, Mac, iOS & Android", connect: "5 Geräte verbinden" },
  faq: { title: "Häufig gestellte Fragen", desc: "Alles, was Sie über das Produkt und die Abrechnung wissen müssen." },
  support: { ...enBase.support, title: "Support kontaktieren", btn: "Support kontaktieren", desc: "Wie können wir Ihnen helfen?", subject_placeholder: "Wie können wir helfen?", message_placeholder: "Weitere Details...", submit: "Nachricht senden", success: "Nachricht gesendet!" },
  footer: { secure_payment: "Sichere Zahlung", privacy: "Datenschutz", terms: "Nutzungsbedingungen", sitemap: "Sitemap", rights: "Alle Rechte vorbehalten." },
  privacy: { title: "Datenschutzrichtlinie", last_updated: "ZULETZT AKTUALISIERT: MÄRZ 2026", s1_t: "1. Informationen, die wir sammeln", s1_d: "Wir sammeln Ihre Microsoft-E-Mail-Adresse. Wir speichern keine Kreditkartendaten.", s2_t: "2. Verwendung Ihrer Informationen", s2_d: "Wir verwenden die Informationen zur Bereitstellung unserer Dienste und Support.", s3_t: "3. Kontosicherheit", s3_d: "Wir fragen nicht nach Ihrem Passwort. Ihre OneDrive-Daten bleiben absolut privat.", s4_t: "4. Drittanbieter", s4_d: "Wir verwenden Stripe für sichere Zahlungen.", s5_t: "5. Kontakt", s5_d: "Bei Fragen kontaktieren Sie uns unter support@365sharehub.com." },
  app_list: [
    { name: "Copilot", desc: "Ihr täglicher KI-Begleiter." }, { name: "OneDrive", desc: "Sicher speichern und teilen." },
    { name: "Word", desc: "Verbessern Sie Ihr Schreiben." }, { name: "Excel", desc: "Machen Sie Daten zu Erkenntnissen." },
    { name: "PowerPoint", desc: "Erstellen Sie wirkungsvolle Folien." }, { name: "Access", desc: "Erstellen Sie Datenbank-Apps." },
    { name: "Outlook", desc: "E-Mail und Kalender." }, { name: "Teams", desc: "Besprechen, chatten, anrufen." },
    { name: "OneNote", desc: "Ihr digitales Notizbuch." }, { name: "Clipchamp", desc: "Video-Editor mit KI." },
    { name: "Designer", desc: "Atemberaubende Grafiken erstellen." }, { name: "Defender", desc: "Schützen Sie Daten und Geräte." }
  ],
  faq_list: [
    { question: "Wie funktioniert die 7-Tage-Testversion und die Abrechnung?", answer: "Willkommen bei 365ShareHub! Genießen Sie 7 Tage kostenlos und zahlen Sie erst, wenn Sie zu 100 % zufrieden sind. Bei Nichtgefallen können Sie jederzeit vor Ablauf kündigen, ohne dass Kosten anfallen." },
    { question: "Wie erhalte ich Zugang nach Start des Abos/der Testphase?", answer: "Bitte nutzen Sie zunächst die E-Mail-Adresse Ihres Microsoft-Kontos für eine schnelle Registrierung. Nach Auswahl eines Tarifs erhalten Sie innerhalb von 24 Stunden eine offizielle Einladung (bitte Spam prüfen). Einfach bestätigen, und Sie können MS Office und 1 TB Cloud-Speicher sofort nutzen." },
    { question: "Auf welchen Geräten kann ich es nutzen?", answer: "Sie können Ihre bevorzugte Sprache wählen und die Apps auf Mac, Windows, Smartphones und Tablets nutzen – auf bis zu 5 Geräten gleichzeitig." },
    { question: "Ist mein 1 TB Cloud-Speicher privat?", answer: "100 % privat. Obwohl Sie einer Familiengruppe beitreten, ist Ihr 1 TB OneDrive-Speicher völlig unabhängig. Niemand sonst hat Zugriff auf Ihre Dateien." },
    { question: "Ist der Service langfristig stabil?", answer: "Wir garantieren einen langfristig stabilen Betrieb. Wir laden Sie herzlich ein, sich unseren langfristigen Abos anzuschließen." },
    { question: "Ist meine Zahlung sicher?", answer: "Absolut. Alle Transaktionen werden sicher und mit Bankenverschlüsselung über Stripe verarbeitet. Wir speichern niemals Ihre Kreditkartendaten auf unseren Servern." }
  ]
};

// ==========================================
// 3. 简体中文 (zh-CN)
// ==========================================
const zhBase: typeof enBase = {
  ...enBase,
  home: { ...enBase.home, hero_title_1: "解锁 Microsoft 365", hero_title_2: "Copilot 生产力。", hero_desc: "有 Copilot 在您身边，大幅提升生产力。一次获取内置 AI 的领先应用、高级安全性和 1 TB 云存储空间。", cta_start: "开始试用", hero_badge_1: "7天免费试用", hero_badge_2: "先使用，后付费", section_apps_title: "一个计划，满足所有需求", section_apps_desc: "获取您需要的高级应用、云存储和安全性。", pricing_promo: "以优惠价格享受完整功能", pricing_title: "简单透明的定价", email_placeholder: "您的微软账户邮箱", feature_no_cc: "无需信用卡", feature_no_reg: "免注册", feature_instant: "即刻访问", questions_btn: "有疑问？" },
  auth: { ...enBase.auth, email: "电子邮箱", password: "密码", full_name: "全名", sign_in: "登录", sign_in_desc: "访问您的账户", sign_up: "注册", create_account: "创建账号", create_desc: "开启您的 Copilot 之旅", remember_me: "记住我", forgot_password: "忘记密码？", no_account: "还没有账号？", have_account: "已有账号？", or_continue: "或使用以下方式", back_home: "返回首页", invalid_credentials: "❌ 账号或密码错误，请重试。" },
  common: { ...enBase.common, loading: "加载中...", logout: "退出登录", my_account: "我的账户", dashboard: "仪表盘", welcome: "欢迎回来，", install_apps: "安装应用", manage_billing: "管理订阅 / 取消", learn_more: "了解更多", sign_in: "登录", join_community: "加入社区" },
  status: { ...enBase.status, subscription_status: "订阅状态", trial_active: "免费试用中", active: "订阅生效中", enjoy_trial: "享受7天免费试用。随时可取消。" },
  plans: { ...enBase.plans, flexible: "灵活", most_popular: "最受欢迎", best_value: "超值", monthly: "月付计划", semi: "半年计划", yearly: "年付专业版", trial_7d: "7天免费试用", save_25: "省 14%", save_37: "省 33%", start_trial: "开始试用", choose_semi: "选择半年付", sub_yearly: "订阅年付", pay_after: "试用后付款，随时取消" },
  features: { copilot: "包含 Copilot 及所有应用", storage: "1TB OneDrive 云存储", devices: "PC、Mac、iOS 和 Android", connect: "可连接 5 台设备" },
  faq: { title: "常见问题解答", desc: "关于产品与订阅，您需要了解的一切。" },
  support: { ...enBase.support, title: "联系客服", btn: "联系客服", desc: "今天需要什么帮助？", subject_placeholder: "您遇到了什么问题？", message_placeholder: "提供更多细节...", submit: "发送消息", success: "消息已发送！" },
  footer: { secure_payment: "安全支付", privacy: "隐私政策", terms: "服务条款", sitemap: "网站地图", rights: "保留所有权利。" },
  privacy: { title: "隐私政策", last_updated: "最后更新：2026年3月", s1_t: "1. 我们收集的信息", s1_d: "当您使用我们的服务时，我们会收集您的电子邮件地址。我们不存储信用卡信息。", s2_t: "2. 我们如何使用您的信息", s2_d: "我们将收集的信息用于提供、维护和改进我们的服务，以及处理家庭组邀请。", s3_t: "3. 微软账户安全", s3_d: "我们绝不要求您提供微软密码。您的 OneDrive 数据绝对私密，管理员无法访问您的个人文件。", s4_t: "4. 第三方服务", s4_d: "我们使用 Stripe 安全地处理付款。我们不与营销机构共享数据。", s5_t: "5. 联系我们", s5_d: "如有疑问，请联系 support@365sharehub.com。" },
  app_list: [
    { name: "Copilot", desc: "您的日常 AI 伴侣。" }, { name: "OneDrive", desc: "安全地保存和分享文件。" },
    { name: "Word", desc: "提升您的写作水平。" }, { name: "Excel", desc: "将数据转化为深刻洞察。" },
    { name: "PowerPoint", desc: "制作极具影响力的幻灯片。" }, { name: "Access", desc: "轻松创建数据库应用程序。" },
    { name: "Outlook", desc: "管理您的电子邮件和日历。" }, { name: "Teams", desc: "开会、聊天、通话和协作。" },
    { name: "OneNote", desc: "您的专属数字笔记本。" }, { name: "Clipchamp", desc: "内置 AI 的视频编辑器。" },
    { name: "Designer", desc: "创作令人惊艳的图形。" }, { name: "Defender", desc: "保护您的数据和设备安全。" }
  ],
  faq_list: [
    { question: "7 天免费试用和付款规则是怎样的？", answer: "欢迎您加入 365ShareHub！您可享受 7 天免费试用期，您 100% 满意后才需要付款。如果不满意，可以随时取消，我们不会向您收取任何费用。" },
    { question: "购买/试用后，我该如何获取使用权限？", answer: "首先，请务必使用您的微软账户邮箱进行快速注册。选择对应套餐后，您将在24小时内收到一封“微软家庭组邀请邮件”（请注意检查垃圾邮件）。点击确认即可加入。加入后，您可以立即使用 MS Office 和 1TB 云存储空间。" },
    { question: "可以在哪些设备上使用？支持我的语言吗？", answer: "当然！您可以选择自己熟悉的语言版本进行安装。支持在 Mac 和 Windows 系统、智能手机、平板电脑上便捷使用，并且最多可在 5 台设备上切换使用。" },
    { question: "我的 1TB 云存储文件是私密的吗？", answer: "绝对私密。虽然您是通过家庭组邀请加入，但您的 1TB OneDrive 存储空间完全独立且受微软最高级别的安全保护，任何人都无法访问您的私人文件。" },
    { question: "服务稳定吗？可以长期订阅吗？", answer: "我们承诺长期稳定运行并提供高质量服务。非常欢迎您在体验后加入我们的长期订阅计划，享受最优惠的折扣。" },
    { question: "我的支付安全吗？支持哪些支付方式？", answer: "绝对安全。所有交易均通过 Stripe 进行银行级加密处理，我们绝不会在服务器上存储您的信用卡数据。支持信用卡、PayPal、Apple Pay 等多种方式。" }
  ]
};

// ==========================================
// 4. 繁体中文 (zh-TW)
// ==========================================
const twBase: typeof enBase = {
  ...zhBase,
  home: { ...zhBase.home, hero_title_1: "解鎖 Microsoft 365", hero_title_2: "Copilot 生產力。", hero_desc: "有 Copilot 在您身邊，大幅提升生產力。一次獲取內置 AI 的領先應用、高級安全性和 1 TB 雲端存儲空間。", cta_start: "開始試用", section_apps_title: "一個計劃，滿足所有需求", section_apps_desc: "獲取您需要的高級應用程式、雲端存儲和安全性。", email_placeholder: "您的微軟帳戶信箱", feature_no_cc: "無需信用卡", feature_no_reg: "免註冊", feature_instant: "即刻訪問", questions_btn: "有疑問？" },
  auth: { ...zhBase.auth, invalid_credentials: "❌ 帳號或密碼錯誤，請重試。" },
  common: { ...zhBase.common, join_community: "加入社群", learn_more: "了解更多" },
  plans: { ...zhBase.plans, flexible: "靈活", most_popular: "最受歡迎", best_value: "超值", save_25: "省 14%", save_37: "省 33%", choose_semi: "選擇半年付", sub_yearly: "訂閱年付" },
  faq: { title: "常見問題解答", desc: "關於產品與訂閱，您需要了解的一切。" },
  support: { ...zhBase.support, title: "聯繫客服", btn: "聯繫客服", desc: "今天需要什麼協助？", subject_placeholder: "您遇到了什麼問題？", submit: "發送訊息", success: "訊息已發送！" },
  footer: { secure_payment: "安全支付", privacy: "隱私政策", terms: "服務條款", sitemap: "網站地圖", rights: "保留所有權利。" },
  privacy: { title: "隱私政策", last_updated: "最後更新：2026年3月", s1_t: "1. 我們收集的信息", s1_d: "當您使用我們的服務時，我們會收集您的電子郵件地址。我們不儲存信用卡信息。", s2_t: "2. 我們如何使用您的信息", s2_d: "我們將收集的信息用於提供、維護和改進我們的服務，以及處理家庭組邀請。", s3_t: "3. 微軟帳戶安全", s3_d: "我們絕不要求您提供微軟密碼。您的 OneDrive 數據絕對私密，管理員無法訪問您的個人文件。", s4_t: "4. 第三方服務", s4_d: "我們使用 Stripe 安全地處理付款。我們不與行銷機構共享數據。", s5_t: "5. 聯繫我們", s5_d: "如有疑問，請聯繫 support@365sharehub.com。" },
  faq_list: zhBase.faq_list // 繁体问答可以直接复用
};

// ==========================================
// 5. 日语 (ja)
// ==========================================
const jaBase: typeof enBase = {
  ...enBase,
  home: { ...enBase.home, hero_title_1: "Microsoft 365 を", hero_title_2: "Copilot で解放", hero_desc: "Copilot と共に生産性を向上。AI 搭載アプリと 1 TB のクラウドストレージを 1 つのプランで。", cta_start: "始める", hero_badge_1: "7日間無料体験", hero_badge_2: "体験後のお支払い", section_apps_title: "必要なすべてを1つのプランで", section_apps_desc: "プレミアムアプリとセキュリティをすべて入手。", pricing_promo: "お得な価格で全機能をお楽しみください", pricing_title: "シンプルで透明な価格設定", email_placeholder: "Microsoft アカウントのメール", feature_no_cc: "クレジットカード不要", feature_no_reg: "登録不要", feature_instant: "すぐにアクセス", questions_btn: "質問がありますか？" },
  auth: { ...enBase.auth, email: "メールアドレス", password: "パスワード", full_name: "氏名", sign_in: "サインイン", sign_in_desc: "アカウントにアクセス", sign_up: "登録", invalid_credentials: "❌ 認証情報が無効です。もう一度お試しください。" },
  common: { ...enBase.common, my_account: "マイアカウント", dashboard: "ダッシュボード", loading: "読み込み中...", logout: "ログアウト", welcome: "お帰りなさい、", install_apps: "アプリをインストール", manage_billing: "請求管理 / キャンセル", learn_more: "詳細を見る", sign_in: "サインイン", join_community: "コミュニティに参加" },
  status: { ...enBase.status, subscription_status: "サブスクリプション状況", trial_active: "無料トライアル中", active: "有効", enjoy_trial: "7日間の無料アクセス。いつでもキャンセル可。" },
  plans: { ...enBase.plans, flexible: "フレキシブル", most_popular: "一番人気", best_value: "ベストバリュー", monthly: "月額プラン", semi: "半年プラン", yearly: "年間プロ", trial_7d: "7日間無料", save_25: "14% お得", save_37: "33% お得", start_trial: "無料体験", choose_semi: "6ヶ月プラン", sub_yearly: "年間購読する", pay_after: "後払い、キャンセル可" },
  features: { copilot: "Copilot & 全アプリ含む", storage: "1TB OneDrive ストレージ", devices: "PC、Mac、iOS、Android", connect: "5台のデバイスを接続" },
  faq: { title: "よくある質問", desc: "製品と請求について知っておくべきこと。" },
  support: { ...enBase.support, title: "サポートに連絡", btn: "サポートに連絡", desc: "どのようなご用件でしょうか？", subject_placeholder: "どのようにお手伝いできますか？", message_placeholder: "詳細を入力してください...", submit: "送信する", success: "送信されました！" },
  footer: { secure_payment: "安全な決済", privacy: "プライバシーポリシー", terms: "利用規約", sitemap: "サイトマップ", rights: "無断複写・転載を禁じます。" },
  privacy: { title: "プライバシーポリシー", last_updated: "最終更新日: 2026年3月", s1_t: "1. 収集する情報", s1_d: "Microsoftアカウントのメールアドレスを収集します。クレジットカード情報は保存しません。", s2_t: "2. 情報の利用", s2_d: "収集した情報は、サービスの提供やサポートのために利用されます。", s3_t: "3. アカウントのセキュリティ", s3_d: "パスワードは要求しません。OneDriveのデータは完全にプライベートです。", s4_t: "4. サードパーティ", s4_d: "安全な決済のためにStripeを使用しています。", s5_t: "5. お問い合わせ", s5_d: "ご質問は support@365sharehub.com までご連絡ください。" },
  app_list: [
    { name: "Copilot", desc: "毎日の AI コンパニオン。" }, { name: "OneDrive", desc: "安全に保存して共有。" },
    { name: "Word", desc: "ライティングを向上。" }, { name: "Excel", desc: "データをインサイトに変換。" },
    { name: "PowerPoint", desc: "インパクトのあるスライドを作成。" }, { name: "Access", desc: "データベースアプリを作成。" },
    { name: "Outlook", desc: "メールとカレンダー。" }, { name: "Teams", desc: "会議、チャット、通話。" },
    { name: "OneNote", desc: "あなたのデジタルノートブック。" }, { name: "Clipchamp", desc: "AI搭載の動画エディター。" },
    { name: "Designer", desc: "魅力的なグラフィックを作成。" }, { name: "Defender", desc: "データとデバイスを保護。" }
  ],
  faq_list: [
    { question: "7日間の無料体験と支払いの仕組みは？", answer: "7日間の無料体験をお楽しみいただき、100%ご満足いただいた後にのみお支払いいただきます。いつでもキャンセル可能で、料金は一切かかりません。" },
    { question: "購入後、どのようにアクセスできますか？", answer: "まず、迅速な登録のためにMicrosoftアカウントのメールアドレスを使用してください。プラン選択後、24時間以内に公式招待メールが届きます。確認をクリックするだけで参加でき、すぐにMS Officeと1TBストレージをご利用いただけます。" },
    { question: "どのデバイスで使えますか？", answer: "使い慣れた言語バージョンを選択できます。Mac、Windows、スマートフォン、タブレットで快適に利用でき、最大5台のデバイスで使用できます。" },
    { question: "1TBのクラウドストレージはプライベートですか？", answer: "完全にプライベートです。1TBのOneDriveストレージは完全に独立しており、他の誰にもあなたのファイルにはアクセスできません。" },
    { question: "サービスは安定していますか？", answer: "長期的に安定した稼働とサービス提供をお約束します。ご満足いただいた後は、ぜひ長期サブスクリプションプランにご参加ください。" },
    { question: "支払いは安全ですか？", answer: "はい、安全です。すべての取引はStripeを通じて銀行レベルの暗号化で安全に処理されます。クレジットカードデータを当社のサーバーに保存することはありません。" }
  ]
};

// ==========================================
// 6. 韩语 (ko)
// ==========================================
const koBase: typeof enBase = {
  ...enBase,
  home: { ...enBase.home, hero_title_1: "Microsoft 365 잠금 해제", hero_title_2: "Copilot 생산성", hero_desc: "Copilot과 함께 생산성을 높이세요. AI가 내장된 앱, 고급 보안, 1TB 클라우드 스토리지를 하나의 요금제로 이용하세요.", cta_start: "시작하기", hero_badge_1: "7일 무료 체험", hero_badge_2: "먼저 사용, 나중에 결제", section_apps_title: "모든 것을 하나의 플랜으로", section_apps_desc: "프리미엄 앱, 클라우드 스토리지 및 보안을 모두 받으세요.", pricing_promo: "합리적인 가격으로 모든 기능을 즐기세요", pricing_title: "간단하고 투명한 가격", email_placeholder: "Microsoft 계정 이메일", feature_no_cc: "신용카드 불필요", feature_no_reg: "가입 불필요", feature_instant: "즉시 액세스", questions_btn: "질문이 있으신가요?" },
  auth: { ...enBase.auth, email: "이메일", password: "비밀번호", full_name: "이름", sign_in: "로그인", sign_in_desc: "계정에 액세스하세요", sign_up: "가입하기", invalid_credentials: "❌ 자격 증명이 유효하지 않습니다. 다시 시도해 주세요." },
  common: { ...enBase.common, my_account: "내 계정", dashboard: "대시보드", loading: "로딩 중...", logout: "로그아웃", welcome: "환영합니다,", install_apps: "앱 설치", manage_billing: "결제 관리 / 취소", learn_more: "자세히 알아보기", sign_in: "로그인", join_community: "커뮤니티 가입" },
  status: { ...enBase.status, subscription_status: "구독 상태", trial_active: "무료 체험 중", active: "활성", enjoy_trial: "7일 무료 체험을 즐기세요. 언제든 취소 가능합니다." },
  plans: { ...enBase.plans, flexible: "유연한", most_popular: "가장 인기 있는", best_value: "최고의 가치", monthly: "월간 플랜", semi: "반기 플랜", yearly: "연간 프로", trial_7d: "7일 무료 체험", save_25: "14% 절약", save_37: "33% 절약", start_trial: "무료 체험 시작", choose_semi: "6개월 선택", sub_yearly: "연간 구독", pay_after: "후불, 언제든 취소" },
  features: { copilot: "Copilot 및 모든 앱 포함", storage: "1TB OneDrive 스토리지", devices: "PC, Mac, iOS 및 Android", connect: "5대 기기 연결" },
  faq: { title: "자주 묻는 질문", desc: "제품 및 결제에 대해 알아야 할 모든 것." },
  support: { ...enBase.support, title: "고객 지원", btn: "지원팀에 문의", desc: "무엇을 도와드릴까요?", subject_placeholder: "어떤 도움이 필요하신가요?", message_placeholder: "자세한 내용을 입력해주세요...", submit: "메시지 전송", success: "전송 완료!" },
  footer: { secure_payment: "안전한 결제", privacy: "개인정보 처리방침", terms: "서비스 약관", sitemap: "사이트맵", rights: "모든 권리 보유." },
  privacy: { title: "개인정보 처리방침", last_updated: "최종 수정일: 2026년 3월", s1_t: "1. 수집하는 정보", s1_d: "Microsoft 이메일을 수집합니다. 신용카드 정보는 저장하지 않습니다.", s2_t: "2. 정보 사용 방법", s2_d: "수집된 정보는 서비스 제공 및 지원을 위해 사용됩니다.", s3_t: "3. 계정 보안", s3_d: "비밀번호를 요구하지 않습니다. OneDrive 데이터는 완전히 비공개입니다.", s4_t: "4. 타사 서비스", s4_d: "결제 처리를 위해 Stripe를 사용합니다.", s5_t: "5. 문의하기", s5_d: "질문이 있으시면 support@365sharehub.com으로 문의하세요." },
  app_list: [
    { name: "Copilot", desc: "일상적인 AI 도우미." }, { name: "OneDrive", desc: "안전하게 저장하고 공유하세요." },
    { name: "Word", desc: "글쓰기 수준을 높이세요." }, { name: "Excel", desc: "데이터를 인사이트로 전환하세요." },
    { name: "PowerPoint", desc: "영향력 있는 슬라이드를 만드세요." }, { name: "Access", desc: "데이터베이스 앱을 만드세요." },
    { name: "Outlook", desc: "이메일 및 일정." }, { name: "Teams", desc: "회의, 채팅, 통화, 공동 작업." },
    { name: "OneNote", desc: "당신의 디지털 노트북." }, { name: "Clipchamp", desc: "AI가 탑재된 동영상 편집기." },
    { name: "Designer", desc: "멋진 그래픽을 만드세요." }, { name: "Defender", desc: "데이터와 기기를 보호하세요." }
  ],
  faq_list: [
    { question: "7일 무료 체험과 결제는 어떻게 되나요?", answer: "7일 무료 체험을 즐기시고 100% 만족하신 후에만 결제하세요. 불만족시 언제든 무료로 취소할 수 있습니다." },
    { question: "구매 후 어떻게 이용하나요?", answer: "먼저 빠른 등록을 위해 Microsoft 계정 이메일을 사용해 주세요. 플랜을 선택하시면 24시간 이내에 가족 그룹 초대 이메일을 받게 됩니다. 확인을 누르시면 가입 후 즉시 Office와 1TB 스토리지를 사용할 수 있습니다." },
    { question: "어떤 기기에서 지원되나요?", answer: "원하는 언어를 선택할 수 있습니다. Mac, Windows, 스마트폰, 태블릿에서 사용할 수 있으며 최대 5대의 기기에서 동시 연결 가능합니다." },
    { question: "내 1TB 스토리지는 비공개인가요?", answer: "100% 비공개입니다. 귀하의 1TB 스토리지는 완전히 독립적이며 다른 누구도 액세스할 수 없습니다." },
    { question: "장기적으로 안정적인가요?", answer: "장기적이고 안정적인 운영을 보장합니다. 당사의 연간 구독 플랜에 가입하여 지속적인 생산성을 누려보세요." },
    { question: "결제는 안전한가요?", answer: "절대적으로 안전합니다. 모든 거래는 Stripe를 통해 은행 수준의 암호화로 안전하게 처리되며 당사 서버에는 귀하의 신용카드 데이터가 절대 저장되지 않습니다." }
  ]
};

// ==========================================
// 7. 西班牙语 (es)
// ==========================================
const esBase: typeof enBase = {
  ...enBase,
  home: { ...enBase.home, hero_title_1: "Desbloquea Microsoft 365", hero_title_2: "Productividad Copilot.", hero_desc: "Aumenta la productividad con Copilot. Obtén apps con IA integrada y 1 TB de almacenamiento.", cta_start: "Empezar", hero_badge_1: "Prueba gratis de 7 días", hero_badge_2: "Usa primero, paga después", section_apps_title: "Todo en un solo plan", section_apps_desc: "Obtén las apps premium que necesitas.", pricing_promo: "Disfruta de todas las funciones a un excelente precio", pricing_title: "Precios simples y transparentes", email_placeholder: "Tu correo de cuenta Microsoft", feature_no_cc: "Sin tarjeta de crédito", feature_no_reg: "Sin registro", feature_instant: "Acceso instantáneo", questions_btn: "¿Preguntas?" },
  auth: { ...enBase.auth, email: "Correo electrónico", password: "Contraseña", full_name: "Nombre completo", sign_in: "Iniciar sesión", sign_in_desc: "Accede a tu cuenta", sign_up: "Registrarse", create_account: "Crear cuenta", invalid_credentials: "❌ Credenciales no válidas. Por favor, inténtalo de nuevo." },
  common: { ...enBase.common, my_account: "Mi Cuenta", dashboard: "Panel", loading: "Cargando...", logout: "Cerrar sesión", welcome: "Bienvenido,", install_apps: "Instalar apps", manage_billing: "Gestionar facturación", learn_more: "Saber más", sign_in: "Iniciar sesión", join_community: "Únete a la comunidad" },
  status: { ...enBase.status, subscription_status: "Estado de suscripción", trial_active: "Prueba Activa", active: "Activo", enjoy_trial: "Disfruta 7 días gratis. Cancela cuando quieras." },
  plans: { ...enBase.plans, flexible: "FLEXIBLE", most_popular: "MÁS POPULAR", best_value: "MEJOR VALOR", monthly: "Plan Mensual", semi: "Plan Semestral", yearly: "Pro Anual", trial_7d: "Prueba 7 días", save_25: "Ahorra 14%", save_37: "Ahorra 33%", start_trial: "Prueba gratis", choose_semi: "Elegir 6 Meses", sub_yearly: "Suscribirse Anual", pay_after: "Cancela cuando quieras" },
  features: { copilot: "Incluye Copilot y Apps", storage: "1 TB de OneDrive", devices: "PC, Mac, iOS y Android", connect: "Conecta 5 dispositivos" },
  faq: { title: "Preguntas frecuentes", desc: "Todo lo que necesitas saber sobre el producto y la facturación." },
  support: { ...enBase.support, title: "Contactar Soporte", btn: "Contactar Soporte", desc: "¿En qué podemos ayudarte hoy?", subject_placeholder: "¿Cómo podemos ayudar?", message_placeholder: "Más detalles...", submit: "Enviar mensaje", success: "¡Mensaje enviado!" },
  footer: { secure_payment: "Pago Seguro", privacy: "Privacidad", terms: "Términos", sitemap: "Mapa del sitio", rights: "Todos los derechos reservados." },
  privacy: { title: "Política de Privacidad", last_updated: "ÚLTIMA ACTUALIZACIÓN: MARZO 2026", s1_t: "1. Información que recopilamos", s1_d: "Recopilamos su correo de Microsoft. No almacenamos datos de tarjetas.", s2_t: "2. Uso de la información", s2_d: "Usamos la información para brindar servicios y soporte.", s3_t: "3. Seguridad de la cuenta", s3_d: "No pedimos contraseñas. Sus archivos de OneDrive son privados.", s4_t: "4. Servicios de terceros", s4_d: "Usamos Stripe para procesar pagos de forma segura.", s5_t: "5. Contáctenos", s5_d: "Para dudas, escriba a support@365sharehub.com." },
  app_list: [
    { name: "Copilot", desc: "Tu compañero de IA diario." }, { name: "OneDrive", desc: "Guarda y comparte de forma segura." },
    { name: "Word", desc: "Eleva tu escritura." }, { name: "Excel", desc: "Convierte datos en información." },
    { name: "PowerPoint", desc: "Crea presentaciones impactantes." }, { name: "Access", desc: "Crea aplicaciones de bases de datos." },
    { name: "Outlook", desc: "Correo y calendario." }, { name: "Teams", desc: "Reúnete, chatea, llama y colabora." },
    { name: "OneNote", desc: "Tu cuaderno digital." }, { name: "Clipchamp", desc: "Editor de video con IA." },
    { name: "Designer", desc: "Crea gráficos impresionantes." }, { name: "Defender", desc: "Protege datos y dispositivos." }
  ],
  faq_list: [
    { question: "¿Cómo funciona la prueba de 7 días y la facturación?", answer: "Disfruta de 7 días gratis y paga solo si estás 100% satisfecho. Si no lo estás, puedes cancelar fácilmente sin que se te cobre un centavo." },
    { question: "¿Cómo obtengo acceso después de la compra?", answer: "Primero, utilice el correo electrónico de su cuenta de Microsoft para un registro rápido. Recibirás un correo oficial de invitación en 24 horas (revisa tu spam). Solo haz clic en confirmar para usar MS Office y 1TB de nube de inmediato." },
    { question: "¿Qué dispositivos son compatibles?", answer: "Puedes instalarlo en tu idioma preferido. Funciona en Mac, Windows, smartphones y tablets. Úsalo hasta en 5 dispositivos a la vez." },
    { question: "¿Es privado mi almacenamiento de 1TB?", answer: "100% privado. Aunque te unes a través de un Grupo Familiar, tu almacenamiento es completamente independiente. Nadie más puede acceder a tus archivos." },
    { question: "¿Es un servicio estable a largo plazo?", answer: "Garantizamos un funcionamiento estable a largo plazo. Te invitamos a unirte a nuestros planes de suscripción anual." },
    { question: "¿Es seguro mi pago?", answer: "Absolutamente. Todas las transacciones se procesan de forma segura con cifrado a través de Stripe. Nunca almacenamos los datos de su tarjeta de crédito." }
  ]
};

// ==========================================
// 8. 法语 (fr)
// ==========================================
const frBase: typeof enBase = {
  ...enBase,
  home: { ...enBase.home, hero_title_1: "Débloquez Microsoft 365", hero_title_2: "Productivité Copilot.", hero_desc: "Boostez votre productivité avec Copilot. Obtenez des apps avec IA intégrée et 1 To de stockage cloud.", cta_start: "Commencer", hero_badge_1: "Essai gratuit 7 jours", hero_badge_2: "Utilisez d'abord, payez ensuite", section_apps_title: "Tout dans un seul plan", section_apps_desc: "Obtenez les applications premium et le stockage dont vous avez besoin.", pricing_promo: "Profitez de toutes les fonctionnalités à un prix avantageux", pricing_title: "Tarification simple et transparente", email_placeholder: "Votre e-mail Microsoft", feature_no_cc: "Carte de crédit non requise", feature_no_reg: "Aucune inscription", feature_instant: "Accès instantané", questions_btn: "Des questions ?" },
  auth: { ...enBase.auth, email: "Adresse e-mail", password: "Mot de passe", full_name: "Nom complet", sign_in: "Se connecter", sign_in_desc: "Accédez à votre compte", sign_up: "S'inscrire", create_account: "Créer un compte", invalid_credentials: "❌ Identifiants invalides. Veuillez réessayer." },
  common: { ...enBase.common, my_account: "Mon Compte", dashboard: "Tableau de bord", loading: "Chargement...", logout: "Déconnexion", welcome: "Bienvenue,", install_apps: "Installer les apps", manage_billing: "Gérer la facturation", learn_more: "En savoir plus", sign_in: "Se connecter", join_community: "Rejoindre la communauté" },
  status: { ...enBase.status, subscription_status: "Statut de l'abonnement", trial_active: "Essai Actif", active: "Actif", enjoy_trial: "Profitez de 7 jours gratuits. Annulez à tout moment." },
  plans: { ...enBase.plans, flexible: "FLEXIBLE", most_popular: "LE PLUS POPULAIRE", best_value: "MEILLEURE OFFRE", monthly: "Plan Mensuel", semi: "Plan Semestriel", yearly: "Pro Annuel", trial_7d: "Essai gratuit 7j", save_25: "Économisez 14%", save_37: "Économisez 33%", start_trial: "Essai gratuit", choose_semi: "Choisir 6 Mois", sub_yearly: "S'abonner Annuellement", pay_after: "Payez après l'essai" },
  features: { copilot: "Copilot & Apps inclus", storage: "1 To de stockage OneDrive", devices: "PC, Mac, iOS et Android", connect: "Connectez 5 appareils" },
  faq: { title: "Questions fréquemment posées", desc: "Tout ce que vous devez savoir sur le produit et la facturation." },
  support: { ...enBase.support, title: "Contacter le support", btn: "Contacter le support", desc: "Comment pouvons-nous vous aider ?", subject_placeholder: "Comment pouvons-nous aider ?", message_placeholder: "Plus de détails...", submit: "Envoyer le message", success: "Message envoyé !" },
  footer: { secure_payment: "Paiement Sécurisé", privacy: "Confidentialité", terms: "Conditions", sitemap: "Plan du site", rights: "Tous droits réservés." },
  privacy: { title: "Politique de Confidentialité", last_updated: "DERNIÈRE MISE À JOUR : MARS 2026", s1_t: "1. Informations collectées", s1_d: "Nous collectons votre e-mail Microsoft. Aucune donnée de carte n'est stockée.", s2_t: "2. Utilisation des informations", s2_d: "Nous utilisons ces informations pour fournir nos services.", s3_t: "3. Sécurité du compte", s3_d: "Nous ne demandons pas de mot de passe. Vos fichiers OneDrive restent privés.", s4_t: "4. Services tiers", s4_d: "Nous utilisons Stripe pour les paiements sécurisés.", s5_t: "5. Nous contacter", s5_d: "Pour toute question, contactez support@365sharehub.com." },
  app_list: [
    { name: "Copilot", desc: "Votre compagnon IA quotidien." }, { name: "OneDrive", desc: "Enregistrez et partagez en toute sécurité." },
    { name: "Word", desc: "Améliorez votre écriture." }, { name: "Excel", desc: "Transformez les données en informations." },
    { name: "PowerPoint", desc: "Créez des diapositives percutantes." }, { name: "Access", desc: "Créez des applications de base de données." },
    { name: "Outlook", desc: "E-mail et calendrier." }, { name: "Teams", desc: "Réunissez-vous, discutez, appelez et collaborez." },
    { name: "OneNote", desc: "Votre bloc-notes numérique." }, { name: "Clipchamp", desc: "Éditeur vidéo avec IA." },
    { name: "Designer", desc: "Créez des graphiques époustouflants." }, { name: "Defender", desc: "Protégez les données et les appareils." }
  ],
  faq_list: [
    { question: "Comment fonctionne l'essai gratuit de 7 jours et la facturation ?", answer: "Profitez de 7 jours gratuits et ne payez que si vous êtes satisfait à 100%. Sinon, annulez facilement avant la fin de l'essai sans frais." },
    { question: "Comment puis-je accéder après l'achat ?", answer: "Tout d'abord, veuillez utiliser l'adresse e-mail de votre compte Microsoft pour une inscription rapide. Vous recevrez un e-mail officiel d'invitation dans les 24h. Cliquez pour rejoindre, puis profitez d'Office et de 1To de stockage." },
    { question: "Quels appareils sont compatibles ?", answer: "Vous pouvez choisir votre langue. Il fonctionne sur Mac, Windows, smartphones et tablettes. Utilisez-le sur 5 appareils simultanément." },
    { question: "Mon stockage cloud de 1 To est-il privé ?", answer: "100% privé. Votre espace OneDrive est totalement indépendant. Personne d'autre ne peut accéder à vos fichiers." },
    { question: "Le service est-il stable à long terme ?", answer: "Nous garantissons un fonctionnement stable à long terme. Nous vous invitons à rejoindre nos plans d'abonnement pour une productivité continue." },
    { question: "Mon paiement est-il sécurisé ?", answer: "Absolument. Toutes les transactions sont traitées en toute sécurité via Stripe. Nous ne stockons jamais vos données de carte." }
  ]
};

// ==========================================
// 9. 葡萄牙语 (pt) 
// ==========================================
const ptBase: typeof enBase = {
  ...enBase,
  home: { ...enBase.home, hero_title_1: "Desbloqueie o Microsoft 365", hero_title_2: "Produtividade Copilot.", hero_desc: "Aumente sua produtividade com o Copilot. Obtenha aplicativos com IA, segurança avançada e 1 TB de armazenamento.", cta_start: "Começar agora", hero_badge_1: "Teste grátis de 7 dias", hero_badge_2: "Use primeiro, pague depois", section_apps_title: "Tudo em um único plano", section_apps_desc: "Obtenha os aplicativos premium e o armazenamento que você precisa.", pricing_promo: "Aproveite todos os recursos por um ótimo preço", pricing_title: "Preços simples e transparentes", email_placeholder: "Seu e-mail da conta Microsoft", feature_no_cc: "Sem cartão de crédito", feature_no_reg: "Sem registro", feature_instant: "Acesso instantâneo", questions_btn: "Perguntas?" },
  auth: { ...enBase.auth, email: "E-mail", password: "Senha", full_name: "Nome Completo", sign_in: "Entrar", sign_in_desc: "Acesse sua conta", sign_up: "Cadastrar", create_account: "Criar Conta", invalid_credentials: "❌ Credenciais inválidas. Por favor, tente novamente." },
  common: { ...enBase.common, my_account: "Minha Conta", dashboard: "Painel", loading: "Carregando...", logout: "Sair", welcome: "Bem-vindo,", install_apps: "Instalar Apps", manage_billing: "Gerenciar Assinatura", learn_more: "Saiba mais", sign_in: "Entrar", join_community: "Junte-se à comunidade" },
  status: { ...enBase.status, subscription_status: "Status da Assinatura", trial_active: "Teste Ativo", active: "Ativo", enjoy_trial: "Aproveite 7 dias grátis. Cancele a qualquer momento." },
  plans: { ...enBase.plans, flexible: "FLEXÍVEL", most_popular: "MAIS POPULAR", best_value: "MELHOR VALOR", monthly: "Plano Mensal", semi: "Plano Semestral", yearly: "Anual Pro", trial_7d: "Teste 7 dias", save_25: "Economize 14%", save_37: "Economize 33%", start_trial: "Teste Grátis", choose_semi: "Escolher 6 Meses", sub_yearly: "Assinar Anualmente", pay_after: "Pague depois, cancele a qualquer momento" },
  features: { copilot: "Inclui Copilot e Apps", storage: "1 TB no OneDrive", devices: "PC, Mac, iOS e Android", connect: "Conecte 5 Dispositivos" },
  faq: { title: "Perguntas Frequentes", desc: "Tudo o que você precisa saber sobre o produto e o faturamento." },
  support: { ...enBase.support, title: "Contatar Suporte", btn: "Contatar Suporte", desc: "Como podemos ajudar hoje?", subject_placeholder: "Como podemos ajudar?", message_placeholder: "Mais detalhes...", submit: "Enviar Mensagem", success: "Mensagem enviada!" },
  footer: { secure_payment: "Pagamento Seguro", privacy: "Privacidade", terms: "Termos", sitemap: "Mapa do Site", rights: "Todos os direitos reservados." },
  privacy: { title: "Política de Privacidade", last_updated: "ÚLTIMA ATUALIZAÇÃO: MARÇO 2026", s1_t: "1. Informações que coletamos", s1_d: "Coletamos seu e-mail da Microsoft. Não armazenamos dados de cartão.", s2_t: "2. Uso das informações", s2_d: "Usamos as informações para fornecer serviços e suporte.", s3_t: "3. Segurança da conta", s3_d: "Não pedimos senhas. Seus arquivos do OneDrive são totalmente privados.", s4_t: "4. Serviços de terceiros", s4_d: "Usamos a Stripe para processar pagamentos.", s5_t: "5. Contate-nos", s5_d: "Para dúvidas, escreva para support@365sharehub.com." },
  app_list: [
    { name: "Copilot", desc: "Seu companheiro diário de IA." }, { name: "OneDrive", desc: "Salve e compartilhe com segurança." },
    { name: "Word", desc: "Eleve sua escrita." }, { name: "Excel", desc: "Transforme dados em insights." },
    { name: "PowerPoint", desc: "Crie slides impactantes." }, { name: "Access", desc: "Crie aplicativos de banco de dados." },
    { name: "Outlook", desc: "E-mail e calendário." }, { name: "Teams", desc: "Reúna-se, converse, ligue e colabore." },
    { name: "OneNote", desc: "Seu caderno digital." }, { name: "Clipchamp", desc: "Editor de vídeo com IA." },
    { name: "Designer", desc: "Crie gráficos impressionantes." }, { name: "Defender", desc: "Proteja dados e dispositivos." }
  ],
  faq_list: [
    { question: "Como funciona o teste grátis de 7 dias e o faturamento?", answer: "Aproveite 7 dias grátis e pague apenas se estiver 100% satisfeito. Caso contrário, cancele facilmente antes do fim do teste sem cobranças." },
    { question: "Como obtenho acesso após a compra?", answer: "Primeiro, use o e-mail da sua conta da Microsoft para um registro rápido. Você receberá um convite em até 24 horas (verifique o spam). Basta clicar em confirmar para entrar e usar o MS Office instantaneamente." },
    { question: "Quais dispositivos são suportados?", answer: "Você pode instalar no seu idioma. Funciona perfeitamente em Mac, Windows, smartphones e tablets. Use em até 5 dispositivos simultaneamente." },
    { question: "Meu armazenamento de 1 TB é privado?", answer: "100% privado. Embora você entre em um Grupo Familiar, seu armazenamento do OneDrive é totalmente independente. Ninguém mais pode acessar seus arquivos." },
    { question: "O serviço é estável a longo prazo?", answer: "Garantizamos uma operação estável a longo prazo. Convidamos você a participar dos nossos planos de assinatura contínua." },
    { question: "Meu pagamento é seguro?", answer: "Absolutamente. Todas as transações são processadas com segurança por meio da Stripe. Nunca armazenamos os dados do seu cartão." }
  ]
};

// --- 导出映射表 ---
export const translations: Record<Language, typeof enBase> = {
  'en': enBase, 'zh-CN': zhBase, 'zh-TW': twBase, 'de': deBase, 'fr': frBase, 'es': esBase, 'ja': jaBase, 'ko': koBase, 'pt': ptBase,
};

// 🔥 精简后的国家/语言列表
export const languageOptions: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🌐' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'zh-CN', label: '中文 (简体)', flag: '🇨🇳' },
  { code: 'zh-TW', label: '中文 (繁體)', flag: '🇹🇼' }
];