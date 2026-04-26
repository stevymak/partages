"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe } from "lucide-react";
import { PRATICIENS, SERVICES } from "@/lib/config";

export default function Praticiens() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      {/* Services grid */}
      <section className="py-20 bg-slate-50" aria-label="Nos prestations">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div ref={ref} className="text-center mb-12">
            <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-xs font-semibold uppercase tracking-widest text-medical-600">Nos consultations</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">Tout pour votre santé</motion.h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}
                className="card-medical flex items-center gap-4"
              >
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{s.label}</p>
                  <p className="text-xs text-medical-600 mt-0.5 font-medium">{s.delay}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Praticiens */}
      <section id="equipe" className="py-20 bg-white" aria-label="Notre équipe">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-medical-600">L'équipe</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">Vos médecins</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRATICIENS.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
                className="card-medical text-center"
              >
                <div className={`mx-auto h-20 w-20 rounded-2xl ${p.color} flex items-center justify-center text-2xl font-bold text-white mb-4`}>
                  {p.initials}
                </div>
                <h3 className="font-bold text-slate-900">{p.name}</h3>
                <p className="text-sm text-medical-600 font-medium mt-1">{p.specialty}</p>
                <p className="mt-3 text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{p.secteur}</span>
                  {p.langues.map((l) => (
                    <span key={l} className="flex items-center gap-1 rounded-full bg-medical-50 px-3 py-1 text-xs text-medical-700">
                      <Globe className="h-3 w-3" />{l}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
