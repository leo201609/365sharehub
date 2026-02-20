import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 基础 SEO
  title: "365ShareHub - Unlock Microsoft 365 Copilot Productivity",
  description: "Boost productivity with Copilot alongside you. Get premium Microsoft 365 apps with built-in AI, advanced security, and 1 TB cloud storage in one plan.",
  
  // 关键：告诉爬虫你的主站域名是什么
  metadataBase: new URL('https://365sharehub.com'),
  
  // 🌍 Open Graph (适用于 Facebook, WhatsApp, Telegram, LinkedIn 等)
  openGraph: {
    title: "365ShareHub - Premium Microsoft 365 & Copilot",
    description: "Upgrade your workflow with Microsoft 365 & Copilot. Flexible plans, instant access, and unbeatable prices.",
    url: "https://365sharehub.com",
    siteName: "365ShareHub",
    images: [
      {
        url: "/og-image.png", // 指向你刚才放在 public 文件夹里的图片
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
    card: "summary_large_image", // 这会让推文显示为超级显眼的大图卡片
    title: "365ShareHub - Premium Microsoft 365 & Copilot",
    description: "Upgrade your workflow with Microsoft 365 & Copilot. Flexible plans, instant access, and unbeatable prices.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 关键修改：添加 suppressHydrationWarning 属性
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 🔥 Umami 全球流量统计追踪代码 */}
        <script defer src="https://analytics.365sharehub.com/script.js" data-website-id="6d589af2-82e2-4f03-9cbb-39b0198ca809"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}