import type { Metadata } from "next";
import "./globals.css"; // <--- 这行代码就是连接样式的关键！

export const metadata: Metadata = {
  title: "365ShareHub - 全球顶尖 AI 订阅",
  description: "一站式管理您的 GPT-4, Claude 3, Midjourney 等订阅。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}