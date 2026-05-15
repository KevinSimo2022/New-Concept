import type { Metadata } from "next";
import localFont from "next/font/local";
import LenisProvider from "@/components/providers/LenisProvider";
import { ClientCanvas } from "@/components/ClientCanvas";
import { ClientVideo } from "@/components/ClientVideo";
import { ClientParticles } from "@/components/effects/ClientParticles";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PNGD™",
  description: "AI-Powered Audio. Delivered.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg text-white`}>
        <LenisProvider>
          <ClientVideo />
          <ClientCanvas />
          <ClientParticles />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
