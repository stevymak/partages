"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, MapPin } from "lucide-react";
import { RESTAURANT } from "@/lib/config";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" } }),
};

export default function RestaurantHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Bienvenue">
      {/* Background — remplacer par une vraie photo */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-stone-900 to-charcoal-800" />
      <div className="absolute inset-0 bg-restaurant-hero" />

      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
        backgroundSize: "4px 4px",
      }} />

      {/* Gold line top */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-px bg-gold-gradient origin-left"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-28 pb-20 text-center">
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 text-gold-400"
        >
          <div className="h-px w-12 bg-gold-400/50" />
          <UtensilsCrossed className="h-4 w-4" />
          <span className="section-label">Cuisine bistronomique</span>
          <UtensilsCrossed className="h-4 w-4" />
          <div className="h-px w-12 bg-gold-400/50" />
        </motion.div>

        <motion.h1
          custom={1} initial="hidden" animate="visible" variants={fadeUp}
          className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
        >
          {RESTAURANT.name}
        </motion.h1>

        <motion.p
          custom={2} initial="hidden" animate="visible" variants={fadeUp}
          className="mt-6 text-lg text-white/60 tracking-wide font-light"
        >
          {RESTAURANT.tagline}
        </motion.p>

        <motion.p
          custom={3} initial="hidden" animate="visible" variants={fadeUp}
          className="mt-4 text-base text-white/50 max-w-md mx-auto leading-relaxed"
        >
          Une cuisine sincère, portée par les saisons et les producteurs locaux.
          Chaque plat raconte une histoire.
        </motion.p>

        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-gold text-sm"
          >
            Réserver une table
          </button>
          <button
            onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-ghost text-sm"
          >
            Voir la carte
          </button>
        </motion.div>

        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
          className="mt-14 flex flex-wrap justify-center gap-8 text-sm text-white/40"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-gold-500" />
            {RESTAURANT.address.streetAddress}, {RESTAURANT.address.addressLocality}
          </span>
          <span>Mardi–Samedi midi · Jeudi–Samedi soir</span>
          <span>Réservation conseillée</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
