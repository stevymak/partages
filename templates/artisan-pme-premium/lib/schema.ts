export type LocalBusinessConfig = {
  name: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: { latitude: number; longitude: number };
  openingHours?: string[];
  priceRange?: string;
  image?: string;
};

export function buildLocalBusinessSchema(cfg: LocalBusinessConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: cfg.name,
    description: cfg.description,
    url: cfg.url,
    telephone: cfg.phone,
    email: cfg.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: cfg.address.streetAddress,
      addressLocality: cfg.address.addressLocality,
      postalCode: cfg.address.postalCode,
      addressCountry: cfg.address.addressCountry,
    },
    ...(cfg.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: cfg.geo.latitude,
        longitude: cfg.geo.longitude,
      },
    }),
    ...(cfg.openingHours && { openingHours: cfg.openingHours }),
    ...(cfg.priceRange && { priceRange: cfg.priceRange }),
    ...(cfg.image && { image: cfg.image }),
  };
}

export const SITE_CONFIG = {
  name: "Dupont & Fils — Plomberie & Chauffage",
  shortName: "Dupont Plomberie",
  description:
    "Artisan plombier chauffagiste à Lyon. Intervention rapide 7j/7, devis gratuit sous 2h. 20 ans d'expérience, travail garanti.",
  url: "https://dupont-plomberie.fr",
  phone: "+33 4 78 00 00 00",
  email: "contact@dupont-plomberie.fr",
  address: {
    streetAddress: "12 rue des Artisans",
    addressLocality: "Lyon",
    postalCode: "69003",
    addressCountry: "FR",
  },
  openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-12:00"],
  priceRange: "€€",
  image: "https://dupont-plomberie.fr/og-image.jpg",
};
