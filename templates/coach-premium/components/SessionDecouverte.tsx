"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Sparkles } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Téléphone requis"),
  objectif: z.string().min(1, "Sélectionnez un objectif"),
  message: z.string().min(20, "Décris ta situation en quelques mots (20 car. min)"),
});

type Form = z.infer<typeof schema>;

const OBJECTIFS = [
  "Reconversion professionnelle",
  "Développer mon business",
  "Leadership & management",
  "Confiance en soi",
  "Équilibre vie pro/perso",
  "Projet de vie global",
  "Autre",
];

const inp = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/20 transition-colors";

export default function SessionDecouverte() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="session" className="py-28 bg-white" aria-label="Session découverte gratuite">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div ref={ref} className="text-center mb-12">
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-100 px-5 py-2 mb-6"
          >
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-semibold text-rose-600">100% gratuit · 30 minutes · Sans engagement</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl font-bold text-slate-900">
            Session découverte
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="mt-4 text-slate-500 max-w-md mx-auto">
            30 minutes pour explorer ta situation, définir ton objectif prioritaire et voir si le coaching est fait pour toi. Gratuit, humain, sans pression.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
          {status === "success" ? (
            <div className="text-center py-16 rounded-3xl bg-gradient-to-br from-rose-50 to-purple-50 border border-rose-100">
              <CheckCircle2 className="h-16 w-16 text-rose-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900">C'est parti !</h3>
              <p className="mt-2 text-slate-500">Je te contacte sous 24h pour planifier ta session. Vérifie ta boîte mail.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-slate-100 bg-slate-50 p-8" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Prénom & nom *</label>
                  <input type="text" placeholder="Sarah Dupont" className={inp} {...register("name")} />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Téléphone *</label>
                  <input type="tel" placeholder="06 00 00 00 00" className={inp} {...register("phone")} />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                <input type="email" placeholder="toi@exemple.fr" className={inp} {...register("email")} />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Ton objectif principal *</label>
                <select className={inp} {...register("objectif")}>
                  <option value="">Choisir...</option>
                  {OBJECTIFS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                {errors.objectif && <p className="mt-1 text-xs text-red-500">{errors.objectif.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Décris ta situation en quelques mots *
                </label>
                <textarea rows={4} placeholder="Où en es-tu ? Qu'est-ce qui te bloque ? Qu'est-ce que tu veux changer ?" className={`${inp} resize-none`} {...register("message")} />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>

              {status === "error" && <p className="text-center text-sm text-red-500">Une erreur est survenue. Réessaye ou envoie-moi un email.</p>}

              <button type="submit" disabled={status === "loading"} className="w-full btn-coach justify-center py-4 disabled:opacity-60">
                {status === "loading" ? <><span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Envoi...</> : <><Sparkles className="h-4 w-4" />Réserver ma session gratuite</>}
              </button>
              <p className="text-center text-xs text-slate-400">Aucune carte bancaire requise · Réponse sous 24h · 100% confidentiel</p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
