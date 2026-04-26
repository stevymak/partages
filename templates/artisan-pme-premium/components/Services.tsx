"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Droplets,
  Flame,
  Wrench,
  ShowerHead,
  Thermometer,
  Zap,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    icon: Droplets,
    title: "Plomberie générale",
    description:
      "Fuite d'eau, tuyauterie, robinetterie, WC. Intervention rapide 24h/24 pour les urgences.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    highlight: false,
  },
  {
    icon: Flame,
    title: "Chauffage & Chaudière",
    description:
      "Installation, entretien et dépannage de chaudières gaz, fioul et pompe à chaleur. Certifié RGE.",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    highlight: true,
  },
  {
    icon: Thermometer,
    title: "Climatisation",
    description:
      "Pose et maintenance de systèmes split, réversibles et gainables. Éligible aux aides MaPrimeRénov'.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    highlight: false,
  },
  {
    icon: ShowerHead,
    title: "Salle de bain",
    description:
      "Rénovation complète, douche à l'italienne, baignoire balnéo. Résultat clé en main.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    highlight: false,
  },
  {
    icon: Wrench,
    title: "Dépannage urgent",
    description:
      "Coupure d'eau, fuite sous pression, colonne bouchée. Technicien sur place en moins d'1h.",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
    highlight: false,
  },
  {
    icon: Zap,
    title: "Rénovation énergétique",
    description:
      "Audit, isolation, plancher chauffant, VMC double-flux. Accompagnement complet pour les aides.",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
    highlight: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 bg-slate-50" aria-label="Nos services">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-widest text-brand-600"
          >
            Ce que nous faisons
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-title mt-2"
          >
            Nos prestations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Du dépannage express à la rénovation complète, nous couvrons tous
            vos besoins en plomberie et chauffage sur Lyon et le Rhône.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              className={cn(
                "group card bg-card-gradient cursor-pointer",
                service.highlight &&
                  "ring-2 ring-brand-500 shadow-md shadow-brand-500/10"
              )}
            >
              {service.highlight && (
                <span className="mb-4 inline-block rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                  Service phare
                </span>
              )}
              <div
                className={cn(
                  "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border",
                  service.bg,
                  service.border
                )}
              >
                <service.icon className={cn("h-6 w-6", service.color)} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                En savoir plus <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
