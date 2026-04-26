"use client";

import { useState } from "react";
import { Bell, Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/" },
  { label: "Contacts", href: "/contacts" },
];

const BREADCRUMBS: Record<string, string> = {
  "/": "Dashboard",
  "/contacts": "Contacts",
  "/stats": "Statistiques",
  "/settings": "Paramètres",
};

type Props = { notifCount?: number };

export default function Topbar({ notifCount = 3 }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = usePathname();

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 gap-4">
        {/* Mobile menu toggle */}
        <button onClick={() => setMobileOpen((v) => !v)} className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Breadcrumb */}
        <div className="hidden lg:flex items-center gap-2 text-sm text-slate-400">
          <span className="text-slate-600 font-medium">{BREADCRUMBS[path] ?? "—"}</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-sm hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Rechercher un contact..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
            <Bell className="h-5 w-5" />
            {notifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>
          <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">JD</div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-slate-900/50" onClick={() => setMobileOpen(false)}>
          <nav className="absolute left-0 top-0 bottom-0 w-64 bg-slate-900 p-6" onClick={(e) => e.stopPropagation()}>
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className={cn("block rounded-xl px-4 py-3 text-sm font-medium mb-1", path === l.href ? "bg-brand-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white")}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
