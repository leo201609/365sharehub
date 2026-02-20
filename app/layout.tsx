import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "365ShareHub - Unlock Microsoft 365 Copilot",
  description: "Get premium Microsoft 365 apps including Copilot at an unbeatable price.",
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