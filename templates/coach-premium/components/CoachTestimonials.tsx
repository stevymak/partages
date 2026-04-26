"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TEMOIGNAGES } from "@/lib/config";

export default function CoachTestimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-28 bg-slate-50" aria-label="Témoignages">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className="text-center mb-14">
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-xs font-semibold uppercase tracking-widest text-rose-500">Résultats</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Ce que vivent mes clients
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {TEMOIGNAGES.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-coach"
            >
              <Quote className="h-8 w-8 text-rose-200 mb-4" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, j) => <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-700 leading-relaxed">"{t.text}"</p>
              <footer className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-coach-gradient flex items-center justify-center text-white text-sm font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
