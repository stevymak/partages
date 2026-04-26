import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CABINET } from "@/lib/config";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
export const viewport: Viewport = { themeColor: "#0d9488" };

export const metadata: Metadata = {
  metadataBase: new URL(CABINET.url),
  title: { default: `${CABINET.name} — Médecin Lyon`, template: `%s | ${CABINET.name}` },
  description: CABINET.description,
  keywords: ["médecin généraliste Lyon", "cabinet médical Lyon 3", "téléconsultation Lyon", "rendez-vous médecin Lyon", "médecin secteur 1 Lyon"],
  openGraph: {
    type: "website", locale: "fr_FR", url: CABINET.url, siteName: CABINET.name,
    title: `${CABINET.name} — Médecine générale Lyon`,
    description: CABINET.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: CABINET.url },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: CABINET.name,
  description: CABINET.description,
  url: CABINET.url,
  telephone: CABINET.phone,
  email: CABINET.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CABINET.address.streetAddress,
    addressLocality: CABINET.address.addressLocality,
    postalCode: CABINET.address.postalCode,
    addressCountry: CABINET.address.addressCountry,
  },
  openingHours: CABINET.openingHours,
  medicalSpecialty: "GeneralPractice",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
