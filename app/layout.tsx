import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 🔥 1. 引入我们刚刚创建的高级 Footer 组件
import Footer from "@/app/components/Footer"; 
// 🔥 5. 新增：引入 LanguageProvider，让多语言状态变成全局可用
import { LanguageProvider } from "@/app/components/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 🔥 基础 SEO (更新了直击痛点的描述)
  title: "365ShareHub - Premium Microsoft 365 & Copilot from €1.65/mo",
  description: "Stop overpaying for Microsoft Office. Join our secure platform to get 1TB OneDrive, premium Office apps, and AI-powered Copilot for just €1.65/month. Start your 7-day free trial today.",
  
  // 🔥 新增：精准的 SEO 关键词，帮助 Google 抓取
  keywords: [
    "Microsoft 365 subscription", 
    "Office 365 family sharing", 
    "cheap Copilot access", 
    "1TB OneDrive storage", 
    "Microsoft 365 discount",
    "Share Microsoft 365",
    "Office 365 alternatives"
  ],

  // 关键：告诉爬虫你的主站域名是什么
  metadataBase: new URL('https://365sharehub.com'),
  
  // 🌍 Open Graph (分享到 WhatsApp, Discord, Facebook 时的卡片)
  openGraph: {
    title: "365ShareHub - Premium Microsoft 365 for €1.65/mo",
    description: "Get full access to Microsoft 365, Copilot, and 1TB OneDrive for a fraction of the cost. 7-day free trial available. Upgrade your workflow today!",
    url: "https://365sharehub.com",
    siteName: "365ShareHub",
    images: [
      {
        url: "/og-image.jpg", // 指向你刚才放在 public 文件夹里的宣传图
        width: 1200,
        height: 630,
        alt: "365ShareHub - Affordable Microsoft 365",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 🐦 Twitter 专属卡片配置
  twitter: {
    card: "summary_large_image", 
    title: "365ShareHub - Premium Microsoft 365 for €1.65/mo",
    description: "Stop overpaying for Office. Get 1TB OneDrive, Copilot, Word, and Excel for just €1.65/month. Start your 7-day free trial today!",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 🔥 Umami 全球流量统计追踪代码 */}
        <script defer src="https://analytics.365sharehub.com/script.js" data-website-id="6d589af2-82e2-4f03-9cbb-39b0198ca809"></script>
      </head>
      {/* 🔥 2. 修改 body 样式为 flex 布局，确保 Footer 始终沉底 */}
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        
        {/* 🔥 6. 新增：用 LanguageProvider 包裹住所有的全局内容，包括 Footer 和主页面 */}
        <LanguageProvider>
          {/* 🔥 3. 用 main 包裹具体页面内容，并让它占据剩余空间 */}
          <main className="flex-1">
            {children}
          </main>

          {/* 🔥 4. 全局挂载我们强大的 Footer */}
          <Footer />
        </LanguageProvider>
        
      </body>
    </html>
  );
}