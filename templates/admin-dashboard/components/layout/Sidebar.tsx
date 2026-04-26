"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Users, Settings, LogOut, Wrench, Bell, BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Contacts", href: "/contacts", icon: Users },
  { label: "Statistiques", href: "/stats", icon: BarChart3 },
  { label: "Paramètres", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-slate-900 px-4 py-6 fixed left-0 top-0 bottom-0 z-20">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600">
          <Wrench className="h-4 w-4 text-white" />
        </span>
        <div>
          <p className="text-sm font-bold text-white leading-none">Admin Panel</p>
          <p className="text-xs text-slate-500 mt-0.5">Dupont Plomberie</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest text-slate-600">Navigation</p>
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={active ? "sidebar-link-active" : "sidebar-link"}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="space-y-1 border-t border-slate-800 pt-4">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
          <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">JD</div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">Jean Dupont</p>
            <p className="text-xs text-slate-500 truncate">Admin</p>
          </div>
        </div>
        <button className="sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-900/20">
          <LogOut className="h-4 w-4" /> Déconnexion
        </button>
      </div>
    </aside>
  );
}
