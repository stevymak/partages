"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Video, MapPin } from "lucide-react";
import { PRATICIENS, CABINET } from "@/lib/config";

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  birthdate: z.string().min(1, "Date de naissance requise"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Téléphone requis"),
  praticien: z.string().min(1, "Sélectionnez un praticien"),
  motif: z.string().min(1, "Motif requis"),
  type: z.enum(["cabinet", "teleconsultation"]),
  mutuelle: z.string().optional(),
});

type Form = z.infer<typeof schema>;

const MOTIFS = ["Consultation générale", "Renouvellement ordonnance", "Résultats d'analyses", "Certificat médical", "Suivi pathologie chronique", "Bilan de santé", "Vaccination", "Autre"];
const inp = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:border-medical-500 focus:outline-none focus:ring-2 focus:ring-medical-500/20 transition-colors";

export default function RDVForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { type: "cabinet" },
  });

  const onSubmit = async (data: Form) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/rdv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="rdv" className="py-24 bg-slate-50" aria-label="Prise de rendez-vous">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div ref={ref} className="text-center mb-10">
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-xs font-semibold uppercase tracking-widest text-medical-600">Prise de rendez-vous</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Consultation en ligne, 24h/24
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="mt-3 text-slate-500">
            Confirmation immédiate par email. Rappel SMS 24h avant.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
          {status === "success" ? (
            <div className="text-center py-16 rounded-3xl bg-white border border-green-100">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900">Rendez-vous confirmé !</h3>
              <p className="mt-2 text-slate-500">Un email de confirmation vous a été envoyé. Nous vous rappelons 24h avant.</p>
              <button onClick={() => setStatus("idle")} className="mt-6 btn-outline-medical">Nouveau rendez-vous</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white rounded-3xl border border-slate-100 p-8" noValidate>
              {/* Type consultation */}
              <div className="grid grid-cols-2 gap-3">
                {(["cabinet", "teleconsultation"] as const).map((type) => {
                  const checked = watch("type") === type;
                  return (
                    <label key={type} className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${checked ? "border-medical-500 bg-medical-50" : "border-slate-200 hover:border-medical-200"}`}>
                      <input type="radio" value={type} {...register("type")} className="sr-only" />
                      {type === "cabinet" ? <MapPin className={`h-5 w-5 ${checked ? "text-medical-600" : "text-slate-400"}`} /> : <Video className={`h-5 w-5 ${checked ? "text-medical-600" : "text-slate-400"}`} />}
                      <div>
                        <p className={`text-sm font-medium ${checked ? "text-medical-700" : "text-slate-700"}`}>{type === "cabinet" ? "En cabinet" : "Téléconsultation"}</p>
                        <p className="text-xs text-slate-400">{type === "cabinet" ? "Lyon 3e" : "Vidéo sécurisée"}</p>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Nom complet *</label>
                  <input type="text" placeholder="Jean Martin" className={inp} {...register("name")} />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Date de naissance *</label>
                  <input type="date" className={inp} {...register("birthdate")} />
                  {errors.birthdate && <p className="mt-1 text-xs text-red-500">{errors.birthdate.message}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                  <input type="email" placeholder="vous@exemple.fr" className={inp} {...register("email")} />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Téléphone *</label>
                  <input type="tel" placeholder="06 00 00 00 00" className={inp} {...register("phone")} />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Praticien *</label>
                  <select className={inp} {...register("praticien")}>
                    <option value="">Sélectionner...</option>
                    {PRATICIENS.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
                  </select>
                  {errors.praticien && <p className="mt-1 text-xs text-red-500">{errors.praticien.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Motif de consultation *</label>
                  <select className={inp} {...register("motif")}>
                    <option value="">Choisir...</option>
                    {MOTIFS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  {errors.motif && <p className="mt-1 text-xs text-red-500">{errors.motif.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mutuelle / Numéro de sécurité sociale</label>
                <input type="text" placeholder="Optionnel — facilite l'accueil" className={inp} {...register("mutuelle")} />
              </div>

              {status === "error" && <p className="text-sm text-red-500 text-center">Erreur. Appelez-nous : {CABINET.phone}</p>}

              <button type="submit" disabled={status === "loading"} className="w-full btn-medical justify-center py-4 disabled:opacity-60">
                {status === "loading" ? <><span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Envoi...</> : "Confirmer le rendez-vous"}
              </button>
              <p className="text-center text-xs text-slate-400">Données médicales chiffrées · Conforme RGPD · Hébergement HDS</p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
