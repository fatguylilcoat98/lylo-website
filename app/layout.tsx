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
  title: "LYLO — Love Your Loved One",
  description:
    "LYLO preserves family stories, recipes, voices, life lessons, and memories in a secure, governed legacy vault — so the people you love are never truly forgotten.",
  keywords: [
    "LYLO",
    "Love Your Loved One",
    "family legacy",
    "memory preservation",
    "legacy vault",
    "family stories",
    "senior care",
    "Remember Preserve Cherish",
    "family history",
    "voice recording",
  ],
  openGraph: {
    title: "LYLO — Love Your Loved One",
    description:
      "Preserve family stories, recipes, voices, and life lessons in a secure governed vault — so the people you love are never truly forgotten.",
    url: "https://mylylo.pro",
    siteName: "LYLO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LYLO — Love Your Loved One",
    description:
      "Preserve family stories, recipes, voices, and life lessons in a secure governed vault.",
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
