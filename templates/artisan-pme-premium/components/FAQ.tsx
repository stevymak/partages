"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export const FAQ_ITEMS = [
  {
    question: "Intervenez-vous en urgence le week-end et les jours fériés ?",
    answer:
      "Oui. Notre équipe est disponible 7j/7 pour les urgences plomberie et chauffage. Nous intervenons en moins d'une heure sur Lyon et le Grand Lyon, y compris les week-ends et jours fériés. Un supplément urgence peut s'appliquer en dehors des heures ouvrées.",
  },
  {
    question: "Comment obtenir un devis ? Est-il vraiment gratuit ?",
    answer:
      "Le devis est 100 % gratuit et sans engagement. Remplissez notre formulaire en ligne ou appelez-nous directement. Nous vous rappelons sous 2 heures avec une estimation précise. Pour les travaux importants (salle de bain, chaudière), un déplacement gratuit pour évaluation est possible.",
  },
  {
    question: "Proposez-vous des solutions de financement ?",
    answer:
      "Oui, nous proposons le paiement en plusieurs fois sans frais pour les travaux supérieurs à 500 €. Nous vous accompagnons également pour obtenir les aides MaPrimeRénov', l'éco-PTZ et les CEE (Certificats d'Économies d'Énergie) pour les travaux de rénovation énergétique.",
  },
  {
    question: "Êtes-vous certifiés RGE ? Pourquoi est-ce important ?",
    answer:
      "Nous sommes certifiés RGE Qualibat. Cette certification est obligatoire pour que vos travaux de rénovation énergétique ouvrent droit aux aides de l'État (MaPrimeRénov', eco-PTZ). Elle garantit aussi notre compétence et le respect des normes en vigueur.",
  },
  {
    question: "Quelle garantie sur les travaux réalisés ?",
    answer:
      "Tous nos travaux sont couverts par notre garantie de parfait achèvement (1 an), notre assurance décennale pour les gros travaux, et la garantie fabricant sur les équipements installés. Nous intervenons gratuitement si un défaut est constaté dans les délais légaux.",
  },
  {
    question: "Quelle est votre zone d'intervention ?",
    answer:
      "Nous intervenons sur Lyon (tous arrondissements), Villeurbanne, Caluire, Bron, Vaulx-en-Velin, Tassin-la-Demi-Lune, Saint-Priest, Vénissieux, Décines et l'ensemble du département du Rhône (69). Au-delà, contactez-nous pour vérifier la faisabilité.",
  },
  {
    question: "Comment préparer ma maison avant votre intervention ?",
    answer:
      "Rien de particulier n'est nécessaire. Notre équipe apporte tout le matériel requis. Pour les interventions sur canalisation, il peut être utile de repérer l'emplacement du robinet d'arrêt général d'eau. Nous vous informons de toute précaution spécifique lors de la prise de rendez-vous.",
  },
];

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn("border rounded-2xl overflow-hidden transition-colors duration-200", isOpen ? "border-brand-200 bg-brand-50/50" : "border-slate-100 bg-white")}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className={cn("text-sm sm:text-base font-semibold leading-snug transition-colors", isOpen ? "text-brand-700" : "text-slate-900")}>
          {item.question}
        </span>
        <span className={cn("flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full transition-colors", isOpen ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500")}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="faq" className="py-24 bg-white" aria-label="Questions fréquentes">
      {/* Schema.org FAQPage — injecté côté serveur dans layout ou page pour le SEO */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div ref={ref} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-sm font-semibold uppercase tracking-widest text-brand-600"
          >
            On répond à tout
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mt-2"
          >
            Questions fréquentes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Vous ne trouvez pas la réponse ? Appelez-nous directement ou
            envoyez-nous un message.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-3"
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
