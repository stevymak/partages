"use client";

import { motion } from "framer-motion";
import { Calendar, Phone, Shield, Clock, Video } from "lucide-react";
import { CABINET } from "@/lib/config";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" } }),
};

export default function MedicalHero() {
  return (
    <section className="relative overflow-hidden bg-medical-hero pt-28 pb-20 min-h-[85vh] flex items-center" aria-label="Bienvenue">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23fff' stroke-width='0.5'/%3E%3C/svg%3E")` }} />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-4 py-1.5"
          >
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white/90 font-medium">Accepte nouveaux patients</span>
          </motion.div>

          <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold text-white leading-tight"
          >
            Votre santé, notre priorité
          </motion.h1>

          <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="mt-5 text-lg text-white/80 leading-relaxed max-w-md"
          >
            {CABINET.specialty}. Consultation en cabinet ou en téléconsultation. Prise de rendez-vous en ligne, 24h/24, sans attente téléphonique.
          </motion.p>

          <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => document.querySelector("#rdv")?.scrollIntoView({ behavior: "smooth" })} className="btn-medical bg-white text-medical-700 hover:bg-medical-50 shadow-xl shadow-white/20">
              <Calendar className="h-4 w-4" /> Prendre rendez-vous
            </button>
            <button onClick={() => document.querySelector("#rdv")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all">
              <Video className="h-4 w-4" /> Téléconsultation
            </button>
          </motion.div>

          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="mt-10 grid grid-cols-3 gap-4">
            {[
              { icon: Shield, label: "Secteur 1 conventionné" },
              { icon: Clock, label: "RDV sous 48h" },
              { icon: Phone, label: "Urgence le jour même" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                <Icon className="h-5 w-5 text-white/60" />
                <span className="text-xs text-white/60">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Card RDV rapide */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          className="rounded-3xl bg-white p-8 shadow-2xl shadow-medical-900/30"
        >
          <p className="text-sm font-semibold text-medical-600 mb-1">Prochain créneau disponible</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Consultation rapide</h2>
          <div className="space-y-3">
            {["Aujourd'hui 16h30 — Dr Mercier", "Demain 09h00 — Dr Benali", "Demain 14h15 — Dr Roux"].map((slot) => (
              <button key={slot} className="w-full text-left rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:border-medical-300 hover:bg-medical-50 hover:text-medical-700 transition-all">
                {slot}
              </button>
            ))}
          </div>
          <button
            onClick={() => document.querySelector("#rdv")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-5 w-full btn-medical justify-center"
          >
            Voir tous les créneaux
          </button>
          <p className="mt-3 text-center text-xs text-slate-400">Gratuit · Sans inscription · Confirmation immédiate</p>
        </motion.div>
      </div>
    </section>
  );
}
