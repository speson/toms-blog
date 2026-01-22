import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tom's Blog",
    template: "%s | Tom's Blog",
  },
  description: "AI 뉴스와 개발 트렌드를 다루는 기술 블로그",
  openGraph: {
    title: "Tom's Blog",
    description: "AI 뉴스와 개발 트렌드를 다루는 기술 블로그",
    url: "https://toms-blog.vercel.app",
    siteName: "Tom's Blog",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
