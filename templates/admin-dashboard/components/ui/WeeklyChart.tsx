"use client";

import { WEEKLY_DATA } from "@/lib/mock-data";

export default function WeeklyChart() {
  const max = Math.max(...WEEKLY_DATA.map((d) => d.contacts));

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-slate-900">Contacts cette semaine</h3>
          <p className="text-sm text-slate-400 mt-0.5">35 contacts au total</p>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">+18% vs semaine passée</span>
      </div>

      <div className="flex items-end gap-3 h-40">
        {WEEKLY_DATA.map((d) => {
          const pct = (d.contacts / max) * 100;
          const isMax = d.contacts === max;
          return (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-medium text-slate-500">{d.contacts}</span>
              <div className="w-full relative rounded-t-lg overflow-hidden" style={{ height: `${Math.max(pct, 8)}%` }}>
                <div className={`absolute inset-0 rounded-t-lg ${isMax ? "bg-brand-600" : "bg-slate-200"} transition-all`} />
              </div>
              <span className="text-xs text-slate-400">{d.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
