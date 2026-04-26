import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { RESTAURANT } from "@/lib/config";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-playfair" });

export const viewport: Viewport = { themeColor: "#0c0a09" };

export const metadata: Metadata = {
  metadataBase: new URL(RESTAURANT.url),
  title: { default: `${RESTAURANT.name} — Restaurant Lyon`, template: `%s | ${RESTAURANT.name}` },
  description: RESTAURANT.description,
  keywords: ["restaurant bistronomique Lyon", "cuisine du marché Lyon", "restaurant Lyon 2", "réservation restaurant Lyon", "vins naturels Lyon"],
  openGraph: {
    type: "website", locale: "fr_FR", url: RESTAURANT.url, siteName: RESTAURANT.name,
    title: `${RESTAURANT.name} — Bistronomie à Lyon`,
    description: RESTAURANT.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: RESTAURANT.name }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: RESTAURANT.url },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: RESTAURANT.name,
  description: RESTAURANT.description,
  url: RESTAURANT.url,
  telephone: RESTAURANT.phone,
  email: RESTAURANT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: RESTAURANT.address.streetAddress,
    addressLocality: RESTAURANT.address.addressLocality,
    postalCode: RESTAURANT.address.postalCode,
    addressCountry: RESTAURANT.address.addressCountry,
  },
  servesCuisine: "Bistronomique française",
  priceRange: RESTAURANT.priceRange,
  openingHours: RESTAURANT.openingHours,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
