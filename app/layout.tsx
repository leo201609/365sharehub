import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 🔥 引入带有路径判断能力的条件渲染 Footer
import ConditionalFooter from "@/app/components/ConditionalFooter"; 
import { LanguageProvider } from "@/app/components/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "365ShareHub - Premium Microsoft 365 & Copilot from €1.65/mo",
  description: "Stop overpaying for Microsoft Office. Join our secure platform to get 1TB OneDrive, premium Office apps, and AI-powered Copilot for just €1.65/month. Start your 7-day free trial today.",
  
  keywords: [
    "Microsoft 365 subscription", 
    "Office 365 family sharing", 
    "cheap Copilot access", 
    "1TB OneDrive storage", 
    "Microsoft 365 discount",
    "Share Microsoft 365",
    "Office 365 alternatives"
  ],

  metadataBase: new URL('https://365sharehub.com'),
  
  openGraph: {
    title: "365ShareHub - Premium Microsoft 365 for €1.65/mo",
    description: "Get full access to Microsoft 365, Copilot, and 1TB OneDrive for a fraction of the cost. 7-day free trial available. Upgrade your workflow today!",
    url: "https://365sharehub.com",
    siteName: "365ShareHub",
    images: [
      {
        url: "/og-image-v2.jpg", 
        width: 1200,
        height: 630,
        alt: "365ShareHub - Affordable Microsoft 365",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image", 
    title: "365ShareHub - Premium Microsoft 365 for €1.65/mo",
    description: "Stop overpaying for Office. Get 1TB OneDrive, Copilot, Word, and Excel for just €1.65/month. Start your 7-day free trial today!",
    images: ["/og-image-v2.jpg"], 
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
        <script defer src="https://analytics.365sharehub.com/script.js" data-website-id="6d589af2-82e2-4f03-9cbb-39b0198ca809"></script>
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#fafafa]`}>
        
        <LanguageProvider>
          <main className="flex-1">
            {children}
          </main>

          {/* 🔥 替换为：在普通页面显示，在 /admin 页面自动隐藏 */}
          <ConditionalFooter />
        </LanguageProvider>
        
      </body>
    </html>
  );
}