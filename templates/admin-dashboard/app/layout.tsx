import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
export const viewport: Viewport = { themeColor: "#4f46e5" };

export const metadata: Metadata = {
  title: { default: "Dashboard Admin", template: "%s | Admin" },
  description: "Interface d'administration — gestion des contacts et demandes clients",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
