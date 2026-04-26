"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MENU_SECTIONS } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function MenuSection() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const section = MENU_SECTIONS[active];

  return (
    <section id="menu" className="py-28 bg-charcoal-950" aria-label="La carte">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div ref={ref} className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="section-label">
            La carte
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-white"
          >
            Une cuisine de saison
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            className="mt-4 text-white/50 max-w-md mx-auto"
          >
            Notre carte évolue au rythme des arrivages et du marché.
            Ce que vous voyez ici est notre sélection du moment.
          </motion.p>
        </div>

        {/* Tab selector */}
        <div className="flex justify-center gap-1 mb-12 bg-white/5 rounded-2xl p-1.5 max-w-sm mx-auto">
          {MENU_SECTIONS.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActive(i)}
              className={cn(
                "flex-1 rounded-xl py-2.5 text-sm font-medium transition-all duration-200",
                active === i
                  ? "bg-gold-500 text-charcoal-900 shadow-md"
                  : "text-white/50 hover:text-white"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Menu items */}
        <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {section.items.map((item, i) => (
            <div key={item.name} className="menu-card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-serif text-lg font-semibold text-white group-hover:text-gold-400 transition-colors">
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span className="rounded-full border border-gold-500/30 px-2.5 py-0.5 text-xs text-gold-400">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-white/40 leading-relaxed">{item.description}</p>
                </div>
                <span className="flex-shrink-0 font-serif text-lg font-semibold text-gold-400">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        <p className="mt-10 text-center text-xs text-white/25">
          Carte susceptible de changer selon les arrivages. Allergènes disponibles sur demande.
        </p>
      </div>
    </section>
  );
}
