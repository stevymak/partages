"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarDays, Users, Clock, CheckCircle2 } from "lucide-react";
import { RESTAURANT } from "@/lib/config";

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Téléphone requis"),
  date: z.string().min(1, "Date requise"),
  time: z.string().min(1, "Heure requise"),
  guests: z.string().min(1, "Nombre de couverts requis"),
  message: z.string().optional(),
});

type Form = z.infer<typeof schema>;

const TIMES = ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const GUESTS = ["1", "2", "3", "4", "5", "6", "7", "8+"];

const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-colors";

export default function ReservationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/reservation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="reservation" className="py-28 bg-charcoal-950" aria-label="Réservation">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div ref={ref} className="text-center mb-12">
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="section-label">Réserver</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="mt-3 font-serif text-4xl font-bold text-white">
            Votre table vous attend
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="mt-4 text-white/40">
            Confirmation par email et SMS sous 2 heures. Pour les groupes de 8+ personnes, appelez-nous directement.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
          {status === "success" ? (
            <div className="text-center py-20 rounded-3xl border border-gold-500/20 bg-gold-500/5">
              <CheckCircle2 className="h-16 w-16 text-gold-400 mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold text-white">Réservation reçue !</h3>
              <p className="mt-2 text-white/50">Vous recevrez une confirmation par email sous 2 heures.</p>
              <button onClick={() => setStatus("idle")} className="mt-6 btn-ghost">Nouvelle réservation</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Nom *</label>
                  <input type="text" placeholder="Marie Dupont" className={inputCls} {...register("name")} />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Téléphone *</label>
                  <input type="tel" placeholder="06 00 00 00 00" className={inputCls} {...register("phone")} />
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Email *</label>
                <input type="email" placeholder="vous@exemple.fr" className={inputCls} {...register("email")} />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" /> Date *
                  </label>
                  <input type="date" className={inputCls} {...register("date")} />
                  {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Heure *
                  </label>
                  <select className={inputCls} {...register("time")}>
                    <option value="">Choisir...</option>
                    {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <p className="mt-1 text-xs text-red-400">{errors.time.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                    <Users className="h-3 w-3" /> Couverts *
                  </label>
                  <select className={inputCls} {...register("guests")}>
                    <option value="">Nb...</option>
                    {GUESTS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                  {errors.guests && <p className="mt-1 text-xs text-red-400">{errors.guests.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Message (allergies, occasion spéciale…)</label>
                <textarea rows={3} placeholder="Anniversaire, allergie gluten, chaise haute..." className={`${inputCls} resize-none`} {...register("message")} />
              </div>

              <button type="submit" disabled={status === "loading"} className="w-full btn-gold justify-center py-4 disabled:opacity-60">
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-charcoal-900/30 border-t-charcoal-900 animate-spin" />
                    Envoi...
                  </span>
                ) : "Confirmer la réservation"}
              </button>

              {status === "error" && (
                <p className="text-center text-sm text-red-400">Une erreur est survenue. Appelez-nous au {RESTAURANT.phone}.</p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
