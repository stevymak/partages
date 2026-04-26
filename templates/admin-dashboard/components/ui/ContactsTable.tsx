"use client";

import { useState } from "react";
import { Phone, Mail, AlertTriangle, ChevronDown, Eye } from "lucide-react";
import type { Contact, ContactStatus } from "@/lib/types";
import { cn, formatDate, timeAgo, STATUS_CONFIG } from "@/lib/utils";

type Props = { contacts: Contact[]; onStatusChange?: (id: string, status: ContactStatus) => void };

const STATUSES: ContactStatus[] = ["new", "in_progress", "done", "archived"];
const FILTERS: Array<{ label: string; value: ContactStatus | "all" }> = [
  { label: "Tous", value: "all" },
  { label: "Nouveaux", value: "new" },
  { label: "En cours", value: "in_progress" },
  { label: "Traités", value: "done" },
];

function StatusBadge({ status }: { status: ContactStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", cfg.bg, cfg.text)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </span>
  );
}

function StatusSelect({ current, onChange }: { current: ContactStatus; onChange: (s: ContactStatus) => void }) {
  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value as ContactStatus)}
      className="appearance-none rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 focus:border-brand-500 focus:outline-none cursor-pointer"
      onClick={(e) => e.stopPropagation()}
    >
      {STATUSES.map((s) => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
    </select>
  );
}

export default function ContactsTable({ contacts: initialContacts, onStatusChange }: Props) {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState<ContactStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "all" ? contacts : contacts.filter((c) => c.status === filter);

  const handleStatus = (id: string, status: ContactStatus) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    onStatusChange?.(id, status);
  };

  return (
    <div className="stat-card p-0 overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-100">
        <div>
          <h3 className="font-semibold text-slate-900">Demandes de contact</h3>
          <p className="text-sm text-slate-400">{filtered.length} demande{filtered.length > 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                filter === f.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-50 bg-slate-50/50">
              {["Contact", "Service", "Statut", "Reçu", "Actions"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((contact) => (
              <>
                <tr
                  key={contact.id}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  onClick={() => setExpanded(expanded === contact.id ? null : contact.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                        {contact.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-slate-900">{contact.name}</p>
                          {contact.urgency && <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />}
                        </div>
                        <p className="text-xs text-slate-400">{contact.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{contact.service}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={contact.status} />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-500">{timeAgo(contact.createdAt)}</p>
                    <p className="text-xs text-slate-300">{formatDate(contact.createdAt)}</p>
                  </td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <StatusSelect current={contact.status} onChange={(s) => handleStatus(contact.id, s)} />
                      {contact.phone && (
                        <a href={`tel:${contact.phone}`} className="btn-sm bg-slate-100 text-slate-600 hover:bg-slate-200">
                          <Phone className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <a href={`mailto:${contact.email}`} className="btn-sm bg-brand-50 text-brand-600 hover:bg-brand-100">
                        <Mail className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>

                {/* Expanded row */}
                {expanded === contact.id && (
                  <tr key={`${contact.id}-expanded`} className="bg-slate-50/50">
                    <td colSpan={5} className="px-6 py-4">
                      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 min-w-24">Message</p>
                          <p className="text-sm text-slate-700 leading-relaxed">{contact.message}</p>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center gap-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 min-w-24">Téléphone</p>
                            <a href={`tel:${contact.phone}`} className="text-sm text-brand-600 hover:underline">{contact.phone}</a>
                          </div>
                        )}
                        {contact.source && (
                          <div className="flex items-center gap-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 min-w-24">Source</p>
                            <p className="text-sm text-slate-500">{contact.source}</p>
                          </div>
                        )}
                        {contact.urgency && (
                          <div className="flex items-center gap-2 rounded-lg bg-orange-50 border border-orange-100 px-3 py-2">
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            <span className="text-xs font-medium text-orange-700">Demande urgente — intervention rapide requise</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-slate-400">
            <p className="text-sm">Aucune demande dans cette catégorie</p>
          </div>
        )}
      </div>
    </div>
  );
}
