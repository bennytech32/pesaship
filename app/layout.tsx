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

// Hapa tumebadilisha jina la mfumo na maelezo yake (SEO)
export const metadata: Metadata = {
  title: "PesaShip | Secure Escrow Payments",
  description: "Lipa kwa usalama mtandaoni. Pesa yako inalindwa kwenye Escrow hadi mzigo utakapokufikia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // Nimeongeza 'bg-slate-50' hapa ili background iwe nzuri mradi mzima
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}