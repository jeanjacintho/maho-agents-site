import type { Metadata, Viewport } from "next";
import { Epilogue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RevealScript } from "./motion";
import { RevealOnScroll } from "./reveal";

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

export const metadata: Metadata = {
  title: "Maho — agents that live on your text thread",
  description:
    "The Founder Times, Meetly and AHA: three agents on one base, Plow + OpenClaw. They never make up what they can't check, and they only act inside the rules you gave them.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
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
