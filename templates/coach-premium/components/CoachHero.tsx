"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, Star } from "lucide-react";
import { COACH } from "@/lib/config";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.13, duration: 0.65, ease: "easeOut" } }),
};

export default function CoachHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-coach-hero" aria-label="Présentation">
      {/* Background orbs */}
      <div className="absolute top-20 right-20 h-72 w-72 rounded-full bg-rose-600/20 blur-3xl" />
      <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-purple-700/15 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="mb-6 flex items-center gap-2"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-sm text-white/50">100+ clients accompagnés</span>
          </motion.div>

          <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="font-display text-5xl sm:text-6xl font-bold text-white leading-[1.1]"
          >
            {COACH.tagline.split(" ").slice(0, 3).join(" ")}{" "}
            <span className="text-transparent bg-clip-text bg-coach-gradient">
              {COACH.tagline.split(" ").slice(3).join(" ")}
            </span>
          </motion.h1>

          <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="mt-6 text-lg text-white/60 leading-relaxed max-w-lg"
          >
            Je suis {COACH.name}, {COACH.title.toLowerCase()}. Je t'accompagne à passer du flou à la clarté — et de la clarté à l'action.
          </motion.p>

          <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <button onClick={() => document.querySelector("#programmes")?.scrollIntoView({ behavior: "smooth" })} className="btn-coach">
              Découvrir les programmes <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => document.querySelector("#session")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/5 transition-all">
              Session découverte gratuite
            </button>
          </motion.div>

          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="mt-10 flex items-center gap-6">
            <a href={COACH.instagram} target="_blank" rel="noreferrer" className="text-white/30 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={COACH.linkedin} target="_blank" rel="noreferrer" className="text-white/30 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <span className="h-4 w-px bg-white/10" />
            <span className="text-xs text-white/30">Coach certifiée ICF · PCC · Lyon</span>
          </motion.div>
        </div>

        {/* Photo / visuel coach */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="relative hidden lg:block">
          <div className="relative mx-auto max-w-sm">
            <div className="aspect-[3/4] rounded-[3rem] bg-gradient-to-br from-rose-900/50 to-purple-900/50 border border-white/10 overflow-hidden flex items-center justify-center">
              <div className="text-center text-white/20 p-8">
                <p className="text-6xl mb-4">👩‍💼</p>
                <p className="text-sm">Photo portrait professionnel</p>
                <p className="text-xs mt-1">Format 3:4 recommandé</p>
              </div>
            </div>
            {/* Floating stat cards */}
            <div className="absolute -left-8 top-16 rounded-2xl bg-white p-4 shadow-2xl">
              <p className="text-2xl font-bold text-slate-900">100+</p>
              <p className="text-xs text-slate-500 mt-0.5">clients transformés</p>
            </div>
            <div className="absolute -right-6 bottom-20 rounded-2xl bg-rose-500 p-4 shadow-2xl">
              <p className="text-2xl font-bold text-white">4.9★</p>
              <p className="text-xs text-rose-100 mt-0.5">satisfaction client</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
