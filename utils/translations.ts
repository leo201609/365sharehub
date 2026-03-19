// utils/translations.ts

export type Language = 
  | 'en-US' | 'en-GB' | 'en-CA' | 'en-AS' 
  | 'zh-CN' | 'zh-TW' 
  | 'de' | 'fr' | 'es' | 'es-MX' | 'it' | 'nl' | 'ja' | 'ko' | 'pt-BR';

// ==========================================
// 1. 英语 (Source of Truth - 基础字典)
// ==========================================
const enBase = {
  home: {
    hero_title_1: "Unlock Microsoft 365", hero_title_2: "Copilot Productivity.",
    hero_desc: "Boost productivity with Copilot alongside you. Get leading apps with built-in AI, advanced security, and spacious 1 TB cloud storage in one plan.",
    cta_start: "Get Started", hero_badge_1: "7-day free trial", hero_badge_2: "Use first, pay later",
    section_apps_title: "Everything you need in one plan", section_apps_desc: "Get the premium apps, cloud storage, and security you need.",
    pricing_promo: "Enjoy full Microsoft 365 features at a favorable price", pricing_title: "Simple, Transparent Pricing",
    footer_copy: "© 2026 365ShareHub Operations. All rights reserved."
  },
  auth: {
    email: "Email address", password: "Password", full_name: "Full Name",
    sign_in: "Sign In", sign_in_desc: "Access your 365ShareHub account",
    sign_up: "Sign up", create_account: "Create Account", create_desc: "Start your Copilot journey today",
    remember_me: "Remember me", forgot_password: "Forgot password?",
    no_account: "Don't have an account?", have_account: "Already have an account?",
    or_continue: "OR CONTINUE WITH", back_home: "Back to Home"
  },
  common: {
    loading: "Loading...", logout: "Logout", my_account: "My Account", dashboard: "Dashboard",
    welcome: "Welcome back,", member_since: "Member since:", joined: "Joined:", days_ago: "days ago",
    install_apps: "Install Apps", install_desc: "Download your apps immediately.",
    locked: "Locked", manage_billing: "Manage Billing / Cancel", connection_failed: "Failed.", network_error: "Network error.",
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
  // 🔥 标准的 features 结构：copilot, storage, devices, connect
  features: { copilot: "Includes Copilot & All Apps", storage: "1TB OneDrive Storage", devices: "PC, Mac, iOS & Android", connect: "Connect 5 Devices" },
  apps: { ai_companion: "Your AI Companion", cloud_storage: "Cloud Storage", office_portal: "Office Portal", email_calendar: "Email & Calendar" },
  faq: {
    title: "Frequently Asked Questions",
    desc: "Everything you need to know about the product and billing.",
    q1: "How do I get access after starting a trial/subscription?",
    a1: "After selecting a plan, you will receive an official Microsoft Family Group invitation email within 24 hours (please check your spam folder). The email may be in English, German, or Chinese—don't worry, simply click confirm to join. Once joined, you can instantly use MS Office apps and your 1TB cloud storage.",
    q2: "How does the 7-day free trial and billing work?",
    a2: "Welcome to 365ShareHub! You can enjoy a 7-day free trial and pay only after you are 100% satisfied. If you are not satisfied, you can easily cancel anytime before the trial ends without being charged a single cent.",
    q3: "What devices are supported? Can I choose my language?",
    a3: "Absolutely! You can install the software in your familiar language. It works seamlessly on Mac, Windows, smartphones, and tablets. You can switch and use it on up to 5 devices simultaneously.",
    q4: "Is my 1TB cloud storage private?",
    a4: "100% private. Although you join via a Family Group, your 1TB OneDrive storage is completely independent and secured by Microsoft. No one else can access your personal files.",
    q5: "Is the service stable for long-term use?",
    a5: "We guarantee long-term stable operation and reliable service. We welcome you to join our long-term subscription plans to enjoy continuous productivity. Wish you a pleasant experience!",
    q6: "Is my payment secure? What payment methods do you support?",
    a6: "Absolutely. All transactions are securely processed with bank-level encryption through Stripe. We never store your credit card data on our servers. We support Credit/Debit Cards, PayPal, Klarna, Apple Pay, Google Pay, and SEPA."
  },
  support: {
    title: "Contact Support", desc: "How can we help you today?",
    subject: "Subject", subject_placeholder: "Briefly describe your issue",
    message: "Message", message_placeholder: "Provide more details...",
    cancel: "Cancel", submit: "Send Message",
    success: "Message sent successfully! We'll reply via email soon.",
    error: "Failed to send message. Please try again."
  }
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
  apps: { ai_companion: "Ihr KI-Begleiter", cloud_storage: "Cloud-Speicher", office_portal: "Office-Portal", email_calendar: "E-Mail & Kalender" },
  faq: {
    title: "Häufig gestellte Fragen",
    desc: "Alles, was Sie über das Produkt und die Abrechnung wissen müssen.",
    q1: "Wie erhalte ich nach dem Kauf Zugang?",
    a1: "Nach Auswahl eines Tarifs erhalten Sie innerhalb von 24 Stunden eine offizielle Microsoft Family-Einladungs-E-Mail (bitte Spam-Ordner prüfen). Die E-Mail kann auf Englisch, Deutsch oder Chinesisch sein – einfach bestätigen. Danach können Sie MS Office und 1 TB Cloud-Speicher sofort nutzen.",
    q2: "Wie funktioniert die 7-Tage-Testversion?",
    a2: "Willkommen bei 365ShareHub! Genießen Sie 7 Tage kostenlos und zahlen Sie erst, wenn Sie zu 100 % zufrieden sind. Bei Nichtgefallen können Sie jederzeit vor Ablauf kündigen, ohne dass Kosten anfallen.",
    q3: "Auf welchen Geräten kann ich es nutzen?",
    a3: "Sie können Ihre bevorzugte Sprache wählen und die Apps auf Mac, Windows, Smartphones und Tablets nutzen – auf bis zu 5 Geräten gleichzeitig.",
    q4: "Ist mein 1 TB Cloud-Speicher privat?",
    a4: "100 % privat. Obwohl Sie einer Familiengruppe beitreten, ist Ihr 1 TB OneDrive-Speicher völlig unabhängig. Niemand sonst hat Zugriff auf Ihre Dateien.",
    q5: "Ist der Service langfristig stabil?",
    a5: "Wir garantieren einen langfristig stabilen Betrieb. Wir laden Sie herzlich ein, sich unseren langfristigen Abos anzuschließen. Wir wünschen Ihnen viel Freude bei der Nutzung!",
    q6: "Ist meine Zahlung sicher? Welche Zahlungsmethoden werden unterstützt?",
    a6: "Absolut. Alle Transaktionen werden sicher und mit Bankenverschlüsselung über Stripe verarbeitet. Wir speichern niemals Ihre Kreditkartendaten auf unseren Servern. Wir unterstützen Kredit-/Debitkarten, PayPal, Klarna, Apple Pay, Google Pay und SEPA."
  },
  support: {
    title: "Support kontaktieren", desc: "Wie können wir Ihnen heute helfen?",
    subject: "Betreff", subject_placeholder: "Beschreiben Sie kurz Ihr Problem",
    message: "Nachricht", message_placeholder: "Geben Sie weitere Details an...",
    cancel: "Abbrechen", submit: "Nachricht senden",
    success: "Nachricht erfolgreich gesendet! Wir antworten in Kürze per E-Mail.",
    error: "Fehler beim Senden. Bitte versuchen Sie es erneut."
  }
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
  apps: { ai_companion: "AI 助手", cloud_storage: "云存储", office_portal: "Office 门户", email_calendar: "邮件日历" },
  faq: {
    title: "常见问题解答",
    desc: "关于产品与订阅，您需要了解的一切。",
    q1: "购买/试用后，我该如何获取使用权限？",
    a1: "在选择对应套餐后，您将在24小时内收到一封“微软家庭组邀请邮件”（请注意检查广告或垃圾邮件）。邀请邮件来自微软官方，可能是英语/德语/中文等语言，请不必担心，点击确认即可加入。加入后，您可以立即使用 MS Office 和 1TB 云存储空间。",
    q2: "7 天免费试用和付款规则是怎样的？",
    a2: "欢迎您加入 365ShareHub！您可享受 7 天免费试用期，您 100% 满意后才需要付款。如果不满意，可以随时取消，我们不会向您收取任何费用。",
    q3: "可以在哪些设备上使用？支持我的语言吗？",
    a3: "当然！您可以选择自己熟悉的语言版本进行安装。支持在 Mac 和 Windows 系统、智能手机、PC、平板电脑上便捷使用，并且最多可在 5 台设备上切换使用。",
    q4: "我的 1TB 云存储文件是私密的吗？",
    a4: "绝对私密。虽然您是通过家庭组邀请加入，但您的 1TB OneDrive 存储空间完全独立且受微软最高级别的安全保护，任何人都无法访问您的私人文件。",
    q5: "服务稳定吗？可以长期订阅吗？",
    a5: "我们承诺长期稳定运行并提供高质量服务。非常欢迎您在体验后加入我们的长期订阅计划，享受最优惠的折扣。祝您使用愉快！",
    q6: "我的支付安全吗？支持哪些支付方式？",
    a6: "绝对安全。所有交易均通过 Stripe 进行银行级加密处理，我们绝不会在服务器上存储您的信用卡数据。我们支持信用卡/借记卡、PayPal、Klarna、Apple Pay、Google Pay 以及 SEPA 直连汇款。"
  },
  support: {
    title: "联系客服", desc: "请问有什么我们可以帮您的？",
    subject: "主题", subject_placeholder: "简要描述您的问题",
    message: "问题详情", message_placeholder: "请提供更多细节以便我们协助您...",
    cancel: "取消", submit: "发送消息",
    success: "消息发送成功！我们将尽快通过邮件回复您。",
    error: "发送失败，请稍后重试。"
  }
};

// ==========================================
// 4. 繁体中文 (zh-TW)
// ==========================================
const twBase = {
  ...zhBase,
  home: { ...zhBase.home, hero_title_1: "解鎖 Microsoft 365", hero_title_2: "Copilot 生產力。", hero_desc: "有 Copilot 在您身邊，大幅提升生產力。一次獲取內置 AI 的領先應用、高級安全性和 1 TB 雲端存儲空間。", cta_start: "開始試用", hero_badge_1: "7天免費試用", hero_badge_2: "先使用，後付費", section_apps_title: "一個計劃，滿足所有需求", section_apps_desc: "獲取您需要的高級應用程式、雲端存儲和安全性。" },
  auth: { ...zhBase.auth, email: "電子郵件", password: "密碼", full_name: "全名", sign_in: "登入", sign_in_desc: "訪問您的帳戶", sign_up: "註冊", create_account: "創建帳號", create_desc: "開啟您的 Copilot 之旅", remember_me: "記住我", forgot_password: "忘記密碼？", no_account: "還沒有帳號？", have_account: "已有帳號？", or_continue: "或使用以下方式", back_home: "返回首頁" },
  common: { ...zhBase.common, my_account: "我的帳戶", dashboard: "儀表板", loading: "載入中...", logout: "登出", welcome: "歡迎回來，", install_apps: "安裝應用程式", locked: "未解鎖", manage_billing: "管理訂閱 / 取消" },
  status: { ...zhBase.status, subscription_status: "訂閱狀態", trial_active: "免費試用中", active: "訂閱生效中", trial_period: "試用期", paid: "已付費" },
  faq: {
    title: "常見問題解答",
    desc: "關於產品與訂閱，您需要了解的一切。",
    q1: "購買/試用後，我該如何獲取使用權限？",
    a1: "在選擇對應套餐後，您將在24小時內收到一封「微軟家庭組邀請郵件」（請注意檢查廣告或垃圾郵件）。邀請郵件來自微軟官方，可能是英語/德語/中文等語言，請不必擔心，點擊確認即可加入。加入後，您可以立即使用 MS Office 和 1TB 雲端存儲空間。",
    q2: "7 天免費試用和付款規則是怎樣的？",
    a2: "歡迎您加入 365ShareHub！您可享受 7 天免費試用期，您 100% 滿意後才需要付款。如果不滿意，可以隨時取消，我們不會向您收取任何費用。",
    q3: "可以在哪些設備上使用？支援我的語言嗎？",
    a3: "當然！您可以選擇自己熟悉的語言版本進行安裝。支援在 Mac 和 Windows 系統、智慧手機、PC、平板電腦上便捷使用，並且最多可在 5 台設備上切換使用。",
    q4: "我的 1TB 雲端存儲文件是私密的嗎？",
    a4: "絕對私密。雖然您是透過家庭組邀請加入，但您的 1TB OneDrive 存儲空間完全獨立，任何人都無法訪問您的私人文件。",
    q5: "服務穩定嗎？可以長期訂閱嗎？",
    a5: "我們承諾長期穩定運行並提供高品質服務。非常歡迎您在體驗後加入我們的長期訂閱計劃，享受最優惠的折扣。祝您使用愉快！",
    q6: "我的支付安全嗎？支援哪些支付方式？",
    a6: "絕對安全。所有交易均透過 Stripe 進行銀行級加密處理，我們絕不會在伺服器上儲存您的信用卡資料。我們支援信用卡/簽帳金融卡、PayPal、Klarna、Apple Pay、Google Pay 以及 SEPA 直連匯款。"
  },
  support: {
    title: "聯繫客服", desc: "請問有什麼我們可以幫您的？",
    subject: "主題", subject_placeholder: "簡要描述您的問題",
    message: "問題詳情", message_placeholder: "請提供更多細節以便我們協助您...",
    cancel: "取消", submit: "發送訊息",
    success: "訊息發送成功！我們將盡快透過電子郵件回覆您。",
    error: "發送失敗，請稍後重試。"
  }
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
  features: { copilot: "Copilot 含む", storage: "1TB ストレージ", devices: "全デバイス対応", connect: "5台接続" },
  apps: { ai_companion: "AIコンパニオン", cloud_storage: "クラウド", office_portal: "Officeポータル", email_calendar: "メール & カレンダー" },
  faq: {
    title: "よくある質問",
    desc: "製品と請求について知っておくべきこと。",
    q1: "購入後、どのようにアクセスできますか？",
    a1: "プラン選択後、24時間以内にMicrosoft公式の「ファミリーグループ招待メール」が届きます（迷惑メールフォルダもご確認ください）。メールは英語/ドイツ語/中国語などの場合がありますが、確認をクリックするだけで参加できます。参加後はすぐにMS Officeと1TBのクラウドストレージをご利用いただけます。",
    q2: "7日間の無料体験と支払いの仕組みは？",
    a2: "365ShareHubへようこそ！7日間の無料体験をお楽しみいただき、100%ご満足いただいた後にのみお支払いいただきます。ご満足いただけない場合はいつでもキャンセル可能で、料金は一切かかりません。",
    q3: "どのデバイスで使えますか？言語は選べますか？",
    a3: "はい！使い慣れた言語バージョンを選択できます。Mac、Windows、スマートフォン、タブレットで快適に利用でき、最大5台のデバイスで切り替えて使用できます。",
    q4: "1TBのクラウドストレージはプライベートですか？",
    a4: "完全にプライベートです。ファミリーグループを通じて参加しますが、1TBのOneDriveストレージは完全に独立しており、他の誰にもあなたのファイルにはアクセスできません。",
    q5: "サービスは安定していますか？長期契約は可能ですか？",
    a5: "長期的に安定した稼働とサービス提供をお約束します。ご満足いただいた後は、ぜひ長期サブスクリプションプランにご参加ください。快適なご利用をお祈りしております！",
    q6: "支払いは安全ですか？ どの支払い方法に対応していますか？",
    a6: "はい、安全です。すべての取引はStripeを通じて銀行レベルの暗号化で安全に処理されます。クレジットカードデータを当社のサーバーに保存することはありません。クレジットカード/デビットカード、PayPal、Klarna、Apple Pay、Google Pay、およびSEPAに対応しています。"
  },
  support: {
    title: "サポートに連絡", desc: "本日はどのようなご用件でしょうか？",
    subject: "件名", subject_placeholder: "問題を簡単に説明してください",
    message: "メッセージ", message_placeholder: "詳細を入力してください...",
    cancel: "キャンセル", submit: "送信する",
    success: "メッセージを送信しました！メールで返信いたします。",
    error: "送信に失敗しました。もう一度お試しください。"
  }
};

// ==========================================
// 6. 韩语 (Korean) 
// ==========================================
const koBase = {
  home: { hero_title_1: "Microsoft 365 잠금 해제", hero_title_2: "Copilot 생산성", hero_desc: "Copilot과 함께 생산성을 높이세요. AI가 내장된 앱, 고급 보안, 1TB 클라우드 스토리지를 하나의 요금제로 이용하세요.", cta_start: "시작하기", hero_badge_1: "7일 무료 체험", hero_badge_2: "먼저 사용, 나중에 결제", section_apps_title: "모든 것을 하나의 플랜으로", section_apps_desc: "프리미엄 앱, 클라우드 스토리지 및 보안을 모두 받으세요.", pricing_promo: "합리적인 가격으로 기능을 즐기세요", pricing_title: "투명한 가격", footer_copy: "© 2026 365ShareHub. 판권 소유." },
  auth: { email: "이메일", password: "비밀번호", full_name: "이름", sign_in: "로그인", sign_in_desc: "계정에 액세스하세요", sign_up: "가입하기", create_account: "계정 만들기", create_desc: "Copilot 여정을 시작하세요", remember_me: "로그인 유지", forgot_password: "비밀번호 찾기", no_account: "계정이 없으신가요?", have_account: "이미 계정이 있으신가요?", or_continue: "또는", back_home: "홈으로 돌아가기" },
  common: { ...enBase.common, my_account: "내 계정", dashboard: "대시보드", loading: "로딩 중...", logout: "로그아웃", welcome: "환영합니다,", member_since: "가입일:", joined: "가입:", days_ago: "일 전", install_apps: "앱 설치", install_desc: "앱을 즉시 다운로드하세요.", locked: "잠김", manage_billing: "결제 관리 / 취소", sign_in: "로그인", sign_up: "가입하기" },
  status: { ...enBase.status, subscription_status: "구독 상태", trial_active: "무료 체험 중", active: "활성", trial_started: "체험 시작일", first_billing: "첫 결제일", trial_ends: "체험 종료일", plan_active_since: "구독 시작일", next_renewal: "다음 갱신일", enjoy_trial: "7일 무료 체험을 즐기세요. 언제든 취소 가능합니다.", sub_active: "구독 활성", status_label: "상태", trial_period: "체험 기간", paid: "결제됨", you_are_on: "현재 플랜:" },
  plans: { ...enBase.plans, flexible: "유연한", most_popular: "인기", best_value: "최고의 가치", monthly: "월간 플랜", semi: "반기 플랜", yearly: "연간 프로", mo: "/월", yr: "/년", trial_7d: "7일 무료 체험", save_25: "25% 할인", save_37: "37% 할인", start_trial: "무료 체험 시작", choose_semi: "6개월 선택", sub_yearly: "연간 구독", pay_after: "후불, 언제든 취소", save_25_vs: "월간 대비 25% 절약", save_37_vs: "월간 대비 37% 절약" },
  features: { copilot: "Copilot 포함", storage: "1TB 스토리지", devices: "모든 기기 지원", connect: "5대 연결" },
  apps: { ai_companion: "AI 도우미", cloud_storage: "클라우드", office_portal: "Office 포털", email_calendar: "이메일 및 일정" },
  faq: {
    title: "자주 묻는 질문",
    desc: "제품 및 결제에 대해 알아야 할 모든 것.",
    q1: "구매 후 어떻게 이용하나요?",
    a1: "플랜을 선택하시면 24시간 이내에 공식 Microsoft 가족 그룹 초대 이메일을 받게 됩니다(스팸 메일함 확인 요망). 영어, 독일어, 중국어 등으로 올 수 있으며 확인을 누르시면 됩니다. 가입 후 즉시 Office와 1TB 스토리지를 사용할 수 있습니다.",
    q2: "7일 무료 체험과 결제는 어떻게 되나요?",
    a2: "365ShareHub에 오신 것을 환영합니다! 7일 무료 체험을 즐기시고 100% 만족하신 후에만 결제하세요. 불만족시 언제든 무료로 취소할 수 있습니다.",
    q3: "어떤 기기에서 지원되나요?",
    a3: "원하는 언어를 선택할 수 있습니다. Mac, Windows, 스마트폰, 태블릿에서 사용할 수 있으며 최대 5대의 기기에서 동시 연결 가능합니다.",
    q4: "내 1TB 스토리지는 비공개인가요?",
    a4: "100% 비공개입니다. 가족 그룹을 통해 가입하지만 귀하의 1TB 스토리지는 완전히 독립적이며 다른 누구도 액세스할 수 없습니다.",
    q5: "장기적으로 안정적인가요?",
    a5: "장기적이고 안정적인 운영을 보장합니다. 당사의 연간 구독 플랜에 가입하여 지속적인 생산성을 누려보세요.",
    q6: "결제는 안전한가요? 지원하는 결제 수단은 무엇인가요?",
    a6: "절대적으로 안전합니다. 모든 거래는 Stripe를 통해 은행 수준의 암호화로 안전하게 처리됩니다. 당사 서버에는 귀하의 신용카드 데이터가 절대 저장되지 않습니다. 신용/체크카드, PayPal, Klarna, Apple Pay, Google Pay, SEPA를 지원합니다."
  },
  support: {
    title: "고객 지원", desc: "무엇을 도와드릴까요?",
    subject: "제목", subject_placeholder: "문제를 간단히 설명해주세요",
    message: "메시지", message_placeholder: "자세한 내용을 입력해주세요...",
    cancel: "취소", submit: "메시지 전송",
    success: "메시지가 성공적으로 전송되었습니다! 이메일로 답변해 드리겠습니다.",
    error: "메시지 전송에 실패했습니다. 다시 시도해 주세요."
  }
};

// ==========================================
// 7. 西班牙语 (Spanish)
// ==========================================
const esBase = {
  home: { hero_title_1: "Desbloquea Microsoft 365", hero_title_2: "Productividad Copilot.", hero_desc: "Aumenta la productividad con Copilot. Obtén apps con IA integrada y 1 TB de almacenamiento.", cta_start: "Empezar", hero_badge_1: "Prueba gratis de 7 días", hero_badge_2: "Usa primero, paga después", section_apps_title: "Todo en un solo plan", section_apps_desc: "Obtén las apps premium que necesitas.", pricing_promo: "Disfruta de Microsoft 365 a un gran precio", pricing_title: "Precios Simples", footer_copy: "© 2026 365ShareHub. Todos los derechos reservados." },
  auth: { email: "Correo electrónico", password: "Contraseña", full_name: "Nombre completo", sign_in: "Iniciar sesión", sign_in_desc: "Accede a tu cuenta", sign_up: "Registrarse", create_account: "Crear cuenta", create_desc: "Inicia tu viaje con Copilot", remember_me: "Recuérdame", forgot_password: "¿Olvidaste tu contraseña?", no_account: "¿No tienes cuenta?", have_account: "¿Ya tienes cuenta?", or_continue: "O CONTINUAR CON", back_home: "Volver al inicio" },
  common: { ...enBase.common, my_account: "Mi Cuenta", dashboard: "Panel", loading: "Cargando...", logout: "Cerrar sesión", welcome: "Bienvenido,", member_since: "Miembro desde:", joined: "Unido:", days_ago: "días", install_apps: "Instalar apps", install_desc: "Descarga tus aplicaciones inmediatamente.", locked: "Bloqueado", manage_billing: "Gestionar facturación", sign_in: "Iniciar sesión", sign_up: "Registrarse" },
  status: { ...enBase.status, subscription_status: "Estado de suscripción", trial_active: "Prueba Activa", active: "Activo", trial_started: "Inicio de prueba", first_billing: "Primer cobro", trial_ends: "Fin de prueba", plan_active_since: "Activo desde", next_renewal: "Renovación", enjoy_trial: "Disfruta 7 días gratis. Cancela cuando quieras.", sub_active: "Suscripción Activa", status_label: "Estado", trial_period: "Período de prueba", paid: "Pagado", you_are_on: "Tu plan:" },
  plans: { ...enBase.plans, flexible: "FLEXIBLE", most_popular: "POPULAR", best_value: "MEJOR VALOR", monthly: "Plan Mensuel", semi: "Plan Semestral", yearly: "Pro Anual", mo: "/mes", yr: "/año", trial_7d: "Prueba 7 días", save_25: "Ahorra 25%", save_37: "Ahorra 37%", start_trial: "Prueba gratis", choose_semi: "Elegir 6 Meses", sub_yearly: "Suscribirse Anual", pay_after: "Cancela cuando quieras", save_25_vs: "Ahorra 25%", save_37_vs: "Ahorra 37%" },
  features: { copilot: "Incluye Copilot y Apps", storage: "1 TB de almacenamiento", devices: "PC, Mac, iOS y Android", connect: "Conecta 5 dispositivos" },
  apps: { ai_companion: "Tu IA", cloud_storage: "Nube", office_portal: "Portal Office", email_calendar: "Correo y Calendario" },
  faq: {
    title: "Preguntas frecuentes",
    desc: "Todo lo que necesitas saber sobre el producto y la facturación.",
    q1: "¿Cómo obtengo acceso después de la compra?",
    a1: "Recibirás un correo oficial de invitación al Grupo Familiar de Microsoft en 24 horas (revisa tu spam). Puede estar en inglés, alemán o chino, no te preocupes, solo haz clic en confirmar. Luego podrás usar MS Office y 1TB de nube de inmediato.",
    q2: "¿Cómo funciona la prueba de 7 días?",
    a2: "¡Bienvenido a 365ShareHub! Disfruta de 7 días gratis y paga solo si estás 100% satisfecho. Si no lo estás, puedes cancelar fácilmente sin que se te cobre un centavo.",
    q3: "¿Qué dispositivos son compatibles?",
    a3: "¡Por supuesto! Puedes instalarlo en tu idioma preferido. Funciona en Mac, Windows, smartphones y tablets. Úsalo hasta en 5 dispositivos a la vez.",
    q4: "¿Es privado mi almacenamiento de 1TB?",
    a4: "100% privado. Aunque te unes a través de un Grupo Familiar, tu almacenamiento es completamente independiente. Nadie más puede acceder a tus archivos.",
    q5: "¿Es un servicio estable a largo plazo?",
    a5: "Garantizamos un funcionamiento estable a largo plazo. Te invitamos a unirte a nuestros planes de suscripción anual para disfrutar de productividad continua.",
    q6: "¿Es seguro mi pago? ¿Qué métodos de pago aceptan?",
    a6: "Absolutamente. Todas las transacciones se procesan de forma segura con cifrado de nivel bancario a través de Stripe. Nunca almacenamos los datos de su tarjeta de crédito. Aceptamos Tarjetas de Crédito/Débito, PayPal, Klarna, Apple Pay, Google Pay y SEPA."
  },
  support: {
    title: "Contactar Soporte", desc: "¿En qué podemos ayudarte hoy?",
    subject: "Asunto", subject_placeholder: "Describe brevemente tu problema",
    message: "Mensaje", message_placeholder: "Proporciona más detalles...",
    cancel: "Cancelar", submit: "Enviar mensaje",
    success: "¡Mensaje enviado con éxito! Responderemos por correo electrónico.",
    error: "Error al enviar el mensaje. Inténtalo de nuevo."
  }
};

// ==========================================
// 8. 法语 (French)
// ==========================================
const frBase = {
  home: { hero_title_1: "Débloquez Microsoft 365", hero_title_2: "Productivité Copilot.", hero_desc: "Boostez votre productivité avec Copilot. Obtenez des apps avec IA intégrée et 1 To de stockage cloud.", cta_start: "Commencer", hero_badge_1: "Essai gratuit 7 jours", hero_badge_2: "Utilisez d'abord, payez ensuite", section_apps_title: "Tout dans un seul plan", section_apps_desc: "Obtenez les applications premium et le stockage dont vous avez besoin.", pricing_promo: "Profitez de fonctionnalités complètes à bon prix", pricing_title: "Tarification simple", footer_copy: "© 2026 365ShareHub. Tous droits réservés." },
  auth: { email: "Adresse e-mail", password: "Mot de passe", full_name: "Nom complet", sign_in: "Se connecter", sign_in_desc: "Accédez à votre compte", sign_up: "S'inscrire", create_account: "Créer un compte", create_desc: "Commencez votre voyage Copilot", remember_me: "Se souvenir de moi", forgot_password: "Mot de passe oublié ?", no_account: "Pas de compte ?", have_account: "Déjà un compte ?", or_continue: "OU CONTINUER AVEC", back_home: "Retour à l'accueil" },
  common: { ...enBase.common, my_account: "Mon Compte", dashboard: "Tableau de bord", loading: "Chargement...", logout: "Déconnexion", welcome: "Bienvenue,", member_since: "Membre depuis:", joined: "Rejoint:", days_ago: "jours", install_apps: "Installer les apps", install_desc: "Téléchargez vos applications immédiatement.", locked: "Verrouillé", manage_billing: "Gérer la facturation", sign_in: "Se connecter", sign_up: "S'inscrire" },
  status: { ...enBase.status, subscription_status: "Statut de l'abonnement", trial_active: "Essai Actif", active: "Activo", trial_started: "Début de l'essai", first_billing: "Première facturation", trial_ends: "Fin de l'essai", plan_active_since: "Actif depuis", next_renewal: "Renouvellement", enjoy_trial: "Profitez de 7 jours gratuits. Annulez à tout moment.", sub_active: "Abonnement Actif", status_label: "Statut", trial_period: "Période d'essai", paid: "Payé", you_are_on: "Votre plan:" },
  plans: { ...enBase.plans, flexible: "FLEXIBLE", most_popular: "POPULAIRE", best_value: "MEILLEUR PRIX", monthly: "Plan Mensuel", semi: "Plan Semestriel", yearly: "Pro Annuel", mo: "/mois", yr: "/an", trial_7d: "Essai gratuit 7j", save_25: "Économisez 25%", save_37: "Économisez 37%", start_trial: "Essai gratuit", choose_semi: "Choisir 6 Mois", sub_yearly: "S'abonner", pay_after: "Payez après l'essai", save_25_vs: "-25%", save_37_vs: "-37%" },
  features: { copilot: "Inclut Copilot & Apps", storage: "1 To de stockage cloud", devices: "PC, Mac, iOS & Android", connect: "Connectez 5 appareils" },
  apps: { ai_companion: "Compagnon IA", cloud_storage: "Stockage Cloud", office_portal: "Portail Office", email_calendar: "Email & Calendrier" },
  faq: {
    title: "Questions fréquemment posées",
    desc: "Tout ce que vous devez savoir sur le produit et la facturation.",
    q1: "Comment puis-je accéder après l'achat ?",
    a1: "Vous recevrez un e-mail officiel d'invitation au groupe familial Microsoft dans les 24h (vérifiez vos spams). L'e-mail peut être en anglais, allemand ou chinois. Cliquez simplement pour rejoindre, puis profitez d'Office et de 1To de stockage.",
    q2: "Comment fonctionne l'essai gratuit de 7 jours ?",
    a2: "Bienvenue sur 365ShareHub ! Profitez de 7 jours gratuits et ne payez que si vous êtes satisfait à 100%. Sinon, annulez facilement avant la fin de l'essai sans frais.",
    q3: "Quels appareils sont compatibles ?",
    a3: "Vous pouvez choisir votre langue. Il fonctionne sur Mac, Windows, smartphones et tablettes. Utilisez-le sur 5 appareils simultanément.",
    q4: "Mon stockage cloud de 1 To est-il privé ?",
    a4: "100% privé. Bien que vous rejoigniez un groupe familial, votre espace OneDrive est totalement indépendant. Personne d'autre ne peut accéder à vos fichiers.",
    q5: "Le service est-il stable à long terme ?",
    a5: "Nous garantissons un fonctionnement stable à long terme. Nous vous invitons à rejoindre nos plans d'abonnement pour profiter d'une productivité continue.",
    q6: "Mon paiement est-il sécurisé ? Quels modes de paiement acceptez-vous ?",
    a6: "Absolument. Toutes les transactions sont traitées en toute sécurité avec un cryptage de niveau bancaire via Stripe. Nous ne stockons jamais vos données de carte de crédit. Nous acceptons les Cartes de Crédit/Débit, PayPal, Klarna, Apple Pay, Google Pay et SEPA."
  },
  support: {
    title: "Contacter le support", desc: "Comment pouvons-nous vous aider ?",
    subject: "Sujet", subject_placeholder: "Décrivez brièvement votre problème",
    message: "Message", message_placeholder: "Fournissez plus de détails...",
    cancel: "Annuler", submit: "Envoyer le message",
    success: "Message envoyé avec succès ! Nous vous répondrons par e-mail.",
    error: "Échec de l'envoi. Veuillez réessayer."
  }
};

// ==========================================
// 9. 其他语言安全回退 (Fallback to enBase)
// ==========================================
// 确保即使某些语言未完全翻译，也不会导致页面崩溃 (undefined error)
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