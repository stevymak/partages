import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import { RESTAURANT } from "@/lib/config";

export default function RestaurantFooter() {
  return (
    <footer className="bg-charcoal-950 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 grid sm:grid-cols-3 gap-10">
        <div>
          <p className="font-serif text-lg font-bold text-gold-400 mb-4">{RESTAURANT.name}</p>
          <p className="text-sm text-white/30 leading-relaxed">{RESTAURANT.tagline}</p>
          <a href={RESTAURANT.socialLinks.instagram} className="mt-4 inline-flex items-center gap-2 text-sm text-white/30 hover:text-gold-400 transition-colors">
            <Instagram className="h-4 w-4" /> Instagram
          </a>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Contact & Accès</p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm text-white/40">
              <MapPin className="h-4 w-4 text-gold-500/50 flex-shrink-0" />
              {RESTAURANT.address.streetAddress}, {RESTAURANT.address.postalCode} {RESTAURANT.address.addressLocality}
            </li>
            <li>
              <a href={`tel:${RESTAURANT.phone}`} className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-gold-500/50" />{RESTAURANT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${RESTAURANT.email}`} className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-gold-500/50" />{RESTAURANT.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Horaires</p>
          <ul className="space-y-2 text-sm text-white/40">
            {RESTAURANT.openingHours.map((h) => <li key={h}>{h}</li>)}
            <li className="mt-3 text-xs text-white/20">Fermé dimanche & lundi</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 px-4 sm:px-6 py-6 text-center text-xs text-white/20">
        © {new Date().getFullYear()} {RESTAURANT.name} — <a href="/mentions-legales" className="hover:text-white/40 transition-colors">Mentions légales</a>
      </div>
    </footer>
  );
}
