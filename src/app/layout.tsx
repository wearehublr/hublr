import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import SupabaseAuthListener from "@/app/components/SupabaseAuthListener";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://wearehublr.com",
  ),
  title: "Hublr",
  description:
    "Hublr helps students and early career professionals secure internships, grad roles, and more. Track opportunities, applications, deadlines, and documents in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SupabaseAuthListener />
        <NavBar />
        {children}
        <Footer />
        <Analytics />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
