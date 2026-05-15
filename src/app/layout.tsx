import type { Metadata } from "next";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import LenisProvider from "@/components/providers/LenisProvider";
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

// Dynamic import — R3F requires browser APIs
const WaveformCanvas = dynamic(
  () => import("@/components/WaveformCanvas").then((m) => m.WaveformCanvas),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "PNGD™",
  description: "AI-Powered Audio. Delivered.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg text-white`}>
        <LenisProvider>
          {/* Fixed 3D canvas — persists across all sections, z-index 0 */}
          <WaveformCanvas />
          {/* Page content sits above at z-index 10+ */}
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
