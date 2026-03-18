import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 🔥 1. 引入我们刚刚创建的高级 Footer 组件
import Footer from "@/app/components/Footer"; 
// 🔥 5. 新增：引入 LanguageProvider，让多语言状态变成全局可用
import { LanguageProvider } from "@/app/components/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 基础 SEO
  title: "365ShareHub - Unlock Microsoft 365 Copilot Productivity",
  description: "Boost productivity with Copilot alongside you. Get premium Microsoft 365 apps with built-in AI, advanced security, and 1 TB cloud storage in one plan.",
  
  // 关键：告诉爬虫你的主站域名是什么
  metadataBase: new URL('https://365sharehub.com'),
  
  // 🌍 Open Graph
  openGraph: {
    title: "365ShareHub - Premium Microsoft 365 & Copilot",
    description: "Upgrade your workflow with Microsoft 365 & Copilot. Flexible plans, instant access, and unbeatable prices.",
    url: "https://365sharehub.com",
    siteName: "365ShareHub",
    images: [
      {
        url: "/og-image.jpg", // 指向你刚才放在 public 文件夹里的图片
        width: 1200,
        height: 630,
        alt: "365ShareHub Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 🐦 Twitter 专属卡片配置
  twitter: {
    card: "summary_large_image", 
    title: "365ShareHub - Premium Microsoft 365 & Copilot",
    description: "Upgrade your workflow with Microsoft 365 & Copilot. Flexible plans, instant access, and unbeatable prices.",
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