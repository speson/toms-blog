import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header, Footer, WebsiteJsonLd } from "@/components";
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
  metadataBase: new URL("https://toms-blog.co.kr"),
  title: {
    default: "Tom's Blog",
    template: "%s | Tom's Blog",
  },
  description: "AI 뉴스와 개발 트렌드를 다루는 기술 블로그",
  openGraph: {
    title: "Tom's Blog",
    description: "AI 뉴스와 개발 트렌드를 다루는 기술 블로그",
    url: "https://toms-blog.co.kr",
    siteName: "Tom's Blog",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/api/og?title=Tom's Blog&tags=AI",
        width: 1200,
        height: 630,
        alt: "Tom's Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom's Blog",
    description: "AI 뉴스와 개발 트렌드를 다루는 기술 블로그",
    images: ["/api/og?title=Tom's Blog&tags=AI"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      "application/rss+xml": "https://toms-blog.co.kr/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        <WebsiteJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-black font-sans antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
