"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { PROGRAMMES } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function Programmes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="programmes" className="py-28 bg-white" aria-label="Programmes de coaching">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-xs font-semibold uppercase tracking-widest text-rose-500">
            Programmes
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Choisis ton niveau de transformation
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="mt-4 text-slate-500 max-w-lg mx-auto">
            Chaque programme est personnalisé à 100%. Paiement en plusieurs fois disponible sans frais.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {PROGRAMMES.map((prog, i) => (
            <motion.div
              key={prog.name}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={cn(
                "card-coach relative",
                prog.highlight && "ring-2 ring-rose-500 shadow-2xl shadow-rose-500/10 scale-[1.02]"
              )}
            >
              {prog.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-coach-gradient px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                  <Zap className="h-3.5 w-3.5" /> Le plus populaire
                </div>
              )}

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-rose-500">{prog.duration}</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">{prog.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{prog.desc}</p>
              </div>

              <div className="mb-6">
                <p className="text-4xl font-bold text-slate-900">{prog.price}</p>
                <p className="text-sm text-slate-400 mt-1">{prog.priceDetail}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {prog.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Check className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.querySelector("#session")?.scrollIntoView({ behavior: "smooth" })}
                className={cn(
                  "w-full justify-center rounded-2xl py-3.5 text-sm font-bold transition-all duration-200",
                  prog.highlight
                    ? "btn-coach"
                    : "border-2 border-rose-200 text-rose-600 hover:bg-rose-50"
                )}
              >
                Commencer ce programme
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-400">
          Pas sûr(e) de quel programme choisir ? La session découverte est faite pour ça.{" "}
          <button onClick={() => document.querySelector("#session")?.scrollIntoView({ behavior: "smooth" })} className="text-rose-500 font-semibold hover:underline">
            C'est gratuit →
          </button>
        </p>
      </div>
    </section>
  );
}
