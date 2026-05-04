import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--loaded-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nevada County Prescribed Burn Association",
    template: "%s | NCPBA",
  },
  description:
    "The Nevada County Prescribed Burn Association is a community of landowners and volunteers who support each other's burns and build the local knowledge that makes prescribed fire safe in the Sierra Nevada foothills.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Cardea display typeface via Adobe Fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/vzb8arh.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
