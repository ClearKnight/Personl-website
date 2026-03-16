import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Clear 晨曦",
  description: "在代码的理性与艺术的感性之间，捕捉数字世界的晨曦。专注于 AI 驱动的产品设计与全栈开发。",
  keywords: ["Clear晨曦", "产品设计", "独立开发者", "AI产品", "全栈开发", "极简主义"],
  authors: [{ name: "Clear 晨曦" }],
  openGraph: {
    title: "Clear 晨曦",
    description: "在代码的理性与艺术的感性之间，捕捉数字世界的晨曦。",
    url: "https://your-domain.com", // 请替换为你的真实域名
    siteName: "Clear 晨曦 Portfolio",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clear 晨曦",
    description: "在代码的理性与艺术的感性之间，捕捉数字世界的晨曦。",
    creator: "@Clear_Chenxi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${notoSerifSC.variable} antialiased bg-white text-black selection:bg-black selection:text-white`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
