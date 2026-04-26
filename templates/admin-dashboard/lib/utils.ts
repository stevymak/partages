import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ContactStatus } from "./types";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `il y a ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `il y a ${hrs}h`;
  return `il y a ${Math.floor(hrs / 24)}j`;
}

export const STATUS_CONFIG: Record<ContactStatus, { label: string; bg: string; text: string; dot: string }> = {
  new:         { label: "Nouveau",     bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-500" },
  in_progress: { label: "En cours",   bg: "bg-amber-50",  text: "text-amber-700",  dot: "bg-amber-500" },
  done:        { label: "Traité",      bg: "bg-green-50",  text: "text-green-700",  dot: "bg-green-500" },
  archived:    { label: "Archivé",     bg: "bg-slate-100", text: "text-slate-500",  dot: "bg-slate-400" },
};
