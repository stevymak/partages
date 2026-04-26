"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/schema";

const contactSchema = z.object({
  name: z.string().min(2, "Votre nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{8})$/, "Numéro de téléphone invalide")
    .optional()
    .or(z.literal("")),
  service: z.string().min(1, "Sélectionnez un service"),
  message: z.string().min(10, "Message trop court (10 caractères minimum)"),
  urgency: z.boolean().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const SERVICES_OPTIONS = [
  "Dépannage urgent",
  "Plomberie générale",
  "Chaudière / Chauffage",
  "Climatisation",
  "Salle de bain",
  "Rénovation énergétique",
  "Autre",
];

const INFO_ITEMS = [
  {
    icon: Phone,
    label: "Téléphone",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: MapPin,
    label: "Zone d'intervention",
    value: "Lyon et Grand Lyon (69)",
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun–Ven 8h–18h | Sam 9h–12h",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-white" aria-label="Contact">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-sm font-semibold uppercase tracking-widest text-brand-600"
          >
            Contactez-nous
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mt-2"
          >
            Devis gratuit sous 2h
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Décrivez votre besoin, nous vous rappelons sous 2 heures avec un
            devis détaillé et sans engagement.
          </motion.p>
        </div>

        <div className="mt-16 grid lg:grid-cols-5 gap-12">
          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="rounded-3xl bg-hero-gradient p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Nos coordonnées</h3>
              <ul className="space-y-5">
                {INFO_ITEMS.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <item.icon className="h-4 w-4 text-sky-300" />
                    </span>
                    <div>
                      <p className="text-xs text-blue-200">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium text-white hover:text-sky-300 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-white">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
                </span>
                <p className="text-sm font-bold text-orange-800">Urgence ?</p>
              </div>
              <p className="text-sm text-orange-700 mb-3">
                Pour toute urgence, appelez-nous directement. Nous intervenons
                en moins d'une heure sur Lyon.
              </p>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
              >
                <Phone className="h-4 w-4" />
                {SITE_CONFIG.phone}
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full min-h-64 rounded-3xl border border-green-100 bg-green-50 p-12 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900">
                  Message envoyé !
                </h3>
                <p className="mt-2 text-slate-600">
                  Nous vous rappelons sous 2 heures avec votre devis gratuit.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 btn-outline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 rounded-3xl border border-slate-100 bg-slate-50 p-8"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Nom complet *
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Jean Martin"
                      className="input-field"
                      aria-invalid={!!errors.name}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="06 00 00 00 00"
                      className="input-field"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="vous@exemple.fr"
                    className="input-field"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Type de prestation *
                  </label>
                  <select
                    id="service"
                    className="input-field"
                    aria-invalid={!!errors.service}
                    {...register("service")}
                  >
                    <option value="">Sélectionnez...</option>
                    {SERVICES_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-xs text-red-500">{errors.service.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Décrivez votre besoin *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Décrivez le problème ou les travaux souhaités..."
                    className="input-field resize-none"
                    aria-invalid={!!errors.message}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="urgency"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    {...register("urgency")}
                  />
                  <label htmlFor="urgency" className="text-sm text-slate-600">
                    C'est urgent — j'ai besoin d'une intervention rapide
                  </label>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    Une erreur est survenue. Veuillez réessayer ou nous appeler directement.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Envoyer ma demande
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400">
                  Vos données sont traitées conformément à notre{" "}
                  <a href="/confidentialite" className="underline hover:text-brand-600">
                    politique de confidentialité
                  </a>
                  .
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
