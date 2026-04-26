import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { SITE_CONFIG } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Galerie de réalisations",
  description:
    "Découvrez nos chantiers : installations de chaudières, salles de bain, rénovations énergétiques sur Lyon. Photos avant/après de nos réalisations.",
  alternates: { canonical: `${SITE_CONFIG.url}/galerie` },
  openGraph: {
    title: `Galerie — ${SITE_CONFIG.shortName}`,
    description: "Nos réalisations en plomberie, chauffage et salle de bain sur Lyon.",
  },
};

export default function GaleriePage() {
  return (
    <main>
      <Header />

      {/* Page hero */}
      <section className="bg-hero-gradient pt-32 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
            Nos réalisations
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white">
            Galerie chantiers
          </h1>
          <p className="mt-4 text-lg text-blue-100/90 max-w-xl mx-auto">
            Chaque photo est un engagement tenu. Retrouvez ici nos derniers
            chantiers plomberie, chauffage et rénovation sur Lyon et le Grand Lyon.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Gallery />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Votre projet ressemble à l'un de ces chantiers ?
          </h2>
          <p className="mt-3 text-slate-600">
            Obtenez un devis gratuit et personnalisé sous 2 heures.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/#contact" className="btn-primary px-8 py-4">
              Demander un devis
            </a>
            <a href={`tel:${SITE_CONFIG.phone}`} className="btn-outline px-8 py-4">
              Appeler maintenant
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
