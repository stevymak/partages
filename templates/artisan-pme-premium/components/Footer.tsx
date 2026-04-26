import { Wrench, Phone, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/schema";

const LINKS = {
  Services: [
    { label: "Plomberie générale", href: "#services" },
    { label: "Chauffage & chaudière", href: "#services" },
    { label: "Climatisation", href: "#services" },
    { label: "Salle de bain", href: "#services" },
    { label: "Dépannage urgent", href: "#services" },
  ],
  Entreprise: [
    { label: "À propos", href: "#about" },
    { label: "Avis clients", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
    { label: "Devis gratuit", href: "#contact" },
  ],
  Légal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
    { label: "CGV", href: "/cgv" },
  ],
};

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300" aria-label="Pied de page">
      {/* CTA band */}
      <div className="bg-hero-gradient">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xl font-bold text-white">
              Besoin d'un artisan de confiance ?
            </p>
            <p className="text-blue-200 mt-1">
              Devis gratuit sous 2h — Intervention rapide sur Lyon
            </p>
          </div>
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-lg hover:bg-brand-50 transition-colors"
          >
            <Phone className="h-4 w-4" />
            {SITE_CONFIG.phone}
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Wrench className="h-5 w-5" />
              </span>
              <span className="font-bold text-white">{SITE_CONFIG.shortName}</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Artisan plombier chauffagiste à Lyon depuis 2004. Travail garanti,
              devis gratuit, intervention rapide.
            </p>
            <ul className="mt-6 space-y-2.5">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-brand-400 flex-shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-brand-400 flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>
                  {SITE_CONFIG.address.streetAddress},{" "}
                  {SITE_CONFIG.address.postalCode}{" "}
                  {SITE_CONFIG.address.addressLocality}
                </span>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {currentYear} {SITE_CONFIG.name}. Tous droits réservés.
            SIRET : 123 456 789 00010
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>Qualibat RGE</span>
            <span>·</span>
            <span>Assurance décennale</span>
            <span>·</span>
            <span>Made in Lyon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
