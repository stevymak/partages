"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, Shield, Clock, Star } from "lucide-react";
import { SITE_CONFIG } from "@/lib/schema";

const TRUST_BADGES = [
  { icon: Shield, label: "Garantie 2 ans" },
  { icon: Clock, label: "Devis en 2h" },
  { icon: Star, label: "4.9/5 sur Google" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient"
      aria-label="Présentation"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient overlay bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Badge urgence */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent-500/20 border border-accent-400/30 px-4 py-1.5 text-sm font-medium text-orange-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-400" />
            </span>
            Disponible 7j/7 — Intervention rapide Lyon & environs
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance"
          >
            Votre plombier{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-orange-300">
              de confiance
            </span>{" "}
            à Lyon
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 text-lg sm:text-xl text-blue-100/90 max-w-xl leading-relaxed"
          >
            Dépannage, installation, rénovation. 20 ans d'expérience, travail
            garanti, devis gratuit sous 2h. Faites confiance à un artisan
            qualifié RGE.
          </motion.p>

          {/* CTA double */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="btn-primary text-base px-8 py-4 shadow-2xl shadow-brand-900/40"
            >
              <Phone className="h-5 w-5" />
              Appeler maintenant
            </a>
            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-secondary text-base px-8 py-4"
            >
              Devis gratuit
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-12 flex flex-wrap gap-6"
          >
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-blue-100">
                <Icon className="h-5 w-5 text-sky-300" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
