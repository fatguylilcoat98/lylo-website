import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mylylo.pro"),
  title: "Lylo — AI companionship that remembers",
  description:
    "Lylo helps seniors and families stay connected through warm, continuity-focused conversations designed to help loved ones feel remembered, supported, and emotionally connected.",
  keywords: [
    "Lylo",
    "Mattie",
    "AI companion",
    "senior care",
    "aging in place",
    "caregiver support",
    "compassionate AI",
    "Love Your Loved One",
  ],
  openGraph: {
    title: "Lylo — AI companionship that remembers",
    description:
      "Warm, continuity-focused AI companionship for seniors and the families who love them.",
    url: "https://mylylo.pro",
    siteName: "Lylo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lylo — AI companionship that remembers",
    description:
      "Warm, continuity-focused AI companionship for seniors and the families who love them.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-cream-50 text-ink-900 antialiased">{children}</body>
    </html>
  );
}
