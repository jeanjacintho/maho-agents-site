import type { Metadata, Viewport } from "next";
import { Epilogue, Geist, Geist_Mono, Gochi_Hand } from "next/font/google";
import "./globals.css";
import { RevealScript } from "./motion";
import { RevealOnScroll } from "./reveal";
import { site, siteUrl } from "./site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face, as on plow.co/latch's headline.
const display = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: "500",
  style: ["normal", "italic"],
});

// Handwritten note beside the hero phone.
const hand = Gochi_Hand({
  variable: "--font-gochi",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [site.author],
  creator: site.author.name,
  alternates: {
    canonical: "/",
    types: { "text/plain": [{ url: "/llms.txt", title: "llms.txt" }] },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${hand.variable} h-full antialiased`}
    >
      <head>
        <RevealScript />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <RevealOnScroll />
      </body>
    </html>
  );
}
