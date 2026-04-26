"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { RESTAURANT } from "@/lib/config";

const NAV = [
  { label: "Menu", href: "#menu" },
  { label: "Notre histoire", href: "#histoire" },
  { label: "Réservation", href: "#reservation" },
];

export default function RestaurantHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-400",
          scrolled ? "bg-charcoal-950/95 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-6"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between">
          <a href="#" className="font-serif text-xl font-bold text-gold-400 tracking-wide">
            {RESTAURANT.name}
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="px-5 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go("#reservation")}
              className="hidden sm:inline-flex btn-gold text-xs py-2.5 px-5"
            >
              Réserver une table
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2 text-white/80 hover:text-white"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed top-16 left-4 right-4 z-40 rounded-2xl bg-charcoal-900/95 backdrop-blur-md border border-white/10 p-4 md:hidden"
          >
            {NAV.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button onClick={() => go("#reservation")} className="mt-2 w-full btn-gold justify-center">
              Réserver une table
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
