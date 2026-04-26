"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/schema";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#about" },
  { label: "Avis clients", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass shadow-lg shadow-slate-900/5 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2 font-bold text-lg"
            aria-label={SITE_CONFIG.name}
          >
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                scrolled ? "bg-brand-600 text-white" : "bg-white/20 text-white"
              )}
            >
              <Wrench className="h-5 w-5" />
            </span>
            <span className={scrolled ? "text-slate-900" : "text-white"}>
              {SITE_CONFIG.shortName}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                  scrolled
                    ? "text-slate-600 hover:text-brand-600 hover:bg-brand-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className={cn(
                "hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                scrolled
                  ? "bg-brand-600 text-white hover:bg-brand-700"
                  : "bg-white text-brand-700 hover:bg-brand-50"
              )}
            >
              <Phone className="h-4 w-4" />
              {SITE_CONFIG.phone}
            </a>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                "md:hidden p-2 rounded-xl transition-colors",
                scrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              )}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-4 right-4 z-40 rounded-2xl glass shadow-2xl shadow-slate-900/20 p-4 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="mt-2 btn-primary justify-center text-center"
                onClick={() => setMobileOpen(false)}
              >
                <Phone className="h-4 w-4" />
                Appeler maintenant
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
