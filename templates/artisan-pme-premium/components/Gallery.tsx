"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ZoomIn } from "lucide-react";
import Lightbox, { type GalleryImage } from "./Lightbox";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Tout", "Plomberie", "Chauffage", "Salle de bain", "Rénovation"] as const;

const IMAGES: GalleryImage[] = [
  { src: "/galerie/chantier-01.jpg", alt: "Installation chaudière gaz condensation", category: "Chauffage", width: 800, height: 600 },
  { src: "/galerie/chantier-02.jpg", alt: "Salle de bain italienne clé en main", category: "Salle de bain", width: 800, height: 1000 },
  { src: "/galerie/chantier-03.jpg", alt: "Remplacement tuyauterie cuivre", category: "Plomberie", width: 800, height: 600 },
  { src: "/galerie/chantier-04.jpg", alt: "Rénovation complète salle d'eau", category: "Salle de bain", width: 800, height: 600 },
  { src: "/galerie/chantier-05.jpg", alt: "Plancher chauffant hydraulique", category: "Chauffage", width: 800, height: 600 },
  { src: "/galerie/chantier-06.jpg", alt: "Dépannage fuite canalisation", category: "Plomberie", width: 800, height: 600 },
  { src: "/galerie/chantier-07.jpg", alt: "Isolation thermique combles", category: "Rénovation", width: 800, height: 600 },
  { src: "/galerie/chantier-08.jpg", alt: "Robinetterie haut de gamme", category: "Salle de bain", width: 800, height: 600 },
  { src: "/galerie/chantier-09.jpg", alt: "Pompe à chaleur air/eau", category: "Chauffage", width: 800, height: 600 },
];

export default function Gallery() {
  const [active, setActive] = useState<string>("Tout");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const filtered = active === "Tout" ? IMAGES : IMAGES.filter((img) => img.category === active);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const nextImage = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  return (
    <section aria-label="Galerie chantiers">
      {/* Filter tabs */}
      <div ref={ref} className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActive(cat); setLightboxIndex(null); }}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              active === cat
                ? "bg-brand-600 text-white shadow-md shadow-brand-600/25"
                : "bg-white border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600"
            )}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-sm text-slate-400 self-center">
          {filtered.length} réalisation{filtered.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Masonry grid */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
      >
        {filtered.map((img, i) => (
          <motion.button
            key={img.src}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            onClick={() => openLightbox(i)}
            className="group relative w-full break-inside-avoid overflow-hidden rounded-2xl bg-slate-100 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-brand-500"
            aria-label={`Voir : ${img.alt}`}
          >
            {/* Image placeholder — remplacer par next/image */}
            <div
              className="w-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"
              style={{ aspectRatio: `${img.width}/${img.height}` }}
            >
              <div className="text-center text-slate-400 p-4">
                <ZoomIn className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs font-medium">{img.alt}</p>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-brand-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4">
              <ZoomIn className="h-8 w-8 text-white" />
              <p className="text-sm font-semibold text-white text-center">{img.alt}</p>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white">
                {img.category}
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <Lightbox
        images={filtered}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </section>
  );
}
