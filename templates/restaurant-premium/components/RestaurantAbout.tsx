"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Wine, Award } from "lucide-react";

const VALUES = [
  { icon: Leaf, title: "Produits du terroir", desc: "Maraîchers, éleveurs et pêcheurs locaux. Moins de 150 km pour l'essentiel de nos produits frais." },
  { icon: Wine, title: "Cave naturelle", desc: "Une sélection de 80 références en vins naturels, biodynamiques et en biodynamie. Accords conseillés." },
  { icon: Award, title: "Savoir-faire", desc: "Chef formé en étoilé, revenu en bistronomie par conviction. La technique au service du goût." },
];

export default function RestaurantAbout() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="histoire" className="py-28 bg-charcoal-900" aria-label="Notre histoire">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Visual */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-stone-800 to-charcoal-950 overflow-hidden flex items-center justify-center">
              <div className="text-center text-white/20 p-8">
                <p className="font-serif text-6xl mb-4">🍽️</p>
                <p className="text-sm">Photo chef / salle</p>
                <p className="text-xs mt-1">Remplacer par image réelle</p>
              </div>
            </div>
            {/* Floating quote */}
            <div className="absolute -right-6 bottom-12 max-w-xs rounded-2xl bg-gold-500 p-6 shadow-2xl">
              <p className="font-serif text-base font-semibold text-charcoal-900 leading-snug">
                "La cuisine, c'est d'abord une histoire de rencontres — entre un produit, un producteur et un convive."
              </p>
              <p className="mt-3 text-xs font-medium text-charcoal-700">— Maxime Dupont, Chef</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="section-label">Notre histoire</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
              Une table sincère,<br />pas une performance.
            </h2>
            <div className="mt-6 space-y-4 text-white/50 leading-relaxed">
              <p>
                Ouvert en 2019 au cœur du vieux Lyon, Le Comptoir est né d'une conviction simple :
                la bistronomie peut allier rigueur technique et générosité sans affectation.
              </p>
              <p>
                Notre chef Maxime Dupont, après dix ans en brigade étoilée, a choisi de revenir
                à l'essentiel — le marché, les saisons, et une salle où l'on aime revenir.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-gold-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{title}</p>
                    <p className="mt-1 text-sm text-white/40 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
