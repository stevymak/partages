"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const STATS = [
  { value: 20, suffix: " ans", label: "d'expérience" },
  { value: 1200, suffix: "+", label: "clients satisfaits" },
  { value: 98, suffix: "%", label: "de satisfaction" },
  { value: 1, suffix: "h", label: "délai d'intervention" },
];

const GUARANTEES = [
  "Artisan qualifié RGE Qualibat",
  "Assurance décennale incluse",
  "Devis détaillé sans engagement",
  "Travaux propres et soignés",
  "Suivi post-intervention garanti",
  "Paiement en plusieurs fois disponible",
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 bg-white overflow-hidden" aria-label="À propos">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Stats band */}
        <div
          ref={ref}
          className="rounded-3xl bg-hero-gradient p-8 sm:p-12 mb-20"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold text-white">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-sm text-blue-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Notre histoire
            </p>
            <h2 className="section-title mt-2">
              Un artisan, une parole,
              <br />
              un résultat.
            </h2>
            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
              <p>
                Fondée en 2004 par Jean-Marc Dupont, notre entreprise familiale
                est aujourd'hui reconnue comme un acteur incontournable de la
                plomberie et du chauffage sur Lyon et le Grand Lyon.
              </p>
              <p>
                Nous avons bâti notre réputation sur un seul principe : faire
                exactement ce que nous promettons, au prix annoncé, dans les
                délais convenus.
              </p>
            </div>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {GUARANTEES.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-brand-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Visual placeholder — remplace par une vraie photo artisan */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-brand-100 to-brand-200 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-brand-400">
                <div className="text-center">
                  <div className="mx-auto h-24 w-24 rounded-full bg-brand-200 flex items-center justify-center mb-4">
                    <span className="text-4xl">🔧</span>
                  </div>
                  <p className="text-sm font-medium text-brand-600">
                    Photo artisan en intervention
                  </p>
                  <p className="text-xs text-brand-400 mt-1">
                    Remplacer par image réelle
                  </p>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white shadow-xl shadow-slate-200 p-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">+1200 clients</p>
                <p className="text-xs text-slate-500">nous font confiance</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
