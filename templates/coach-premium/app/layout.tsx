import type { Metadata, Viewport } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { COACH } from "@/lib/config";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const dm = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-dm" });

export const viewport: Viewport = { themeColor: "#e11d48" };
export const metadata: Metadata = {
  metadataBase: new URL(COACH.url),
  title: { default: `${COACH.name} — Coach certifiée Lyon`, template: `%s | ${COACH.name}` },
  description: COACH.description,
  keywords: ["coach de vie Lyon", "business coach Lyon", "coaching certifié ICF Lyon", "développement personnel Lyon", "coaching individuel Lyon"],
  openGraph: { type: "website", locale: "fr_FR", url: COACH.url, siteName: COACH.name, images: [{ url: "/og-image.jpg", width: 1200, height: 630 }] },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: COACH.name,
  jobTitle: COACH.title,
  description: COACH.description,
  url: COACH.url,
  telephone: COACH.phone,
  email: COACH.email,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${dm.variable}`}>
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></head>
      <body>{children}</body>
    </html>
  );
}
