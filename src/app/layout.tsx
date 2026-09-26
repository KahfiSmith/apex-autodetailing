import type { Metadata } from "next";
import { Geist, Syne } from "next/font/google";
import "./globals.css";
import { studioData } from "@/data/detailing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  title: `${studioData.name} | ${studioData.tagline}`,
  description: studioData.shortDescription,
  keywords: studioData.seo.keywords,
  openGraph: {
    title: studioData.name,
    description: studioData.shortDescription,
    url: studioData.seo.siteUrl,
    siteName: studioData.name,
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${syne.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0C0E] text-[#E4E4E7] font-sans selection:bg-[#C5A880] selection:text-black">
        {children}
      </body>
    </html>
  );
}
