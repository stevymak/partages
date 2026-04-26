"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sophie M.",
    location: "Lyon 6e",
    rating: 5,
    text: "Intervention en moins d'une heure pour une fuite sous évier. Travail impeccable, propre, et le prix correspondait exactement au devis. Je recommande sans hésitation.",
    service: "Dépannage urgent",
    date: "Mars 2025",
  },
  {
    name: "Patrick D.",
    location: "Villeurbanne",
    rating: 5,
    text: "Remplacement complet de ma chaudière en une journée. Équipe professionnelle, explications claires sur les aides disponibles. Économies réelles sur ma facture.",
    service: "Chauffage",
    date: "Janvier 2025",
    featured: true,
  },
  {
    name: "Marie-Claire T.",
    location: "Caluire",
    rating: 5,
    text: "Salle de bain entièrement refaite, résultat magnifique. Délais respectés, aucune mauvaise surprise. Je n'aurais pas pu faire confiance à meilleur artisan.",
    service: "Salle de bain",
    date: "Février 2025",
  },
  {
    name: "Thomas L.",
    location: "Bron",
    rating: 5,
    text: "Service irréprochable du premier contact jusqu'à la fin du chantier. La mise en place du plancher chauffant est parfaite. Merci à toute l'équipe.",
    service: "Rénovation",
    date: "Décembre 2024",
  },
  {
    name: "Isabelle R.",
    location: "Lyon 3e",
    rating: 5,
    text: "Très réactif, ponctuel, sérieux. Explications claires avant chaque intervention. On sent le vrai professionnel. Tarifs corrects et transparents.",
    service: "Plomberie",
    date: "Avril 2025",
  },
  {
    name: "François B.",
    location: "Tassin",
    rating: 5,
    text: "Dépannage chaudière un dimanche soir, arrivée en 45 minutes. Problème résolu en 1h. Prix raisonnable même pour un appel en urgence week-end.",
    service: "Urgence",
    date: "Novembre 2024",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note: ${rating}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      className="py-24 bg-slate-50"
      aria-label="Avis clients"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-sm font-semibold uppercase tracking-widest text-brand-600"
          >
            Ils nous font confiance
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mt-2"
          >
            Ce que disent nos clients
          </motion.h2>

          {/* Global rating */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white border border-slate-100 shadow-sm px-6 py-3"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">
                4.9/5 — Excellent
              </p>
              <p className="text-xs text-slate-500">Basé sur 140+ avis Google</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`card relative ${t.featured ? "ring-2 ring-brand-500 shadow-md shadow-brand-500/10" : ""}`}
              aria-label={`Avis de ${t.name}`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-4 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                  Avis mis en avant
                </span>
              )}
              <Quote className="h-8 w-8 text-brand-200 mb-3" />
              <StarRating rating={t.rating} />
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                "{t.text}"
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.location}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                    {t.service}
                  </span>
                  <p className="mt-1 text-xs text-slate-400">{t.date}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
