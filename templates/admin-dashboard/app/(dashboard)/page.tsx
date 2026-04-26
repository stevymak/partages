import StatsCards from "@/components/ui/StatsCards";
import WeeklyChart from "@/components/ui/WeeklyChart";
import ContactsTable from "@/components/ui/ContactsTable";
import { MOCK_CONTACTS, MOCK_STATS } from "@/lib/mock-data";

export default function DashboardPage() {
  const urgent = MOCK_CONTACTS.filter((c) => c.urgency && c.status !== "done" && c.status !== "archived");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
        <p className="text-slate-500 text-sm mt-1">Bienvenue, voici un résumé de l'activité.</p>
      </div>

      {/* Urgent alert */}
      {urgent.length > 0 && (
        <div className="flex items-center gap-3 rounded-2xl bg-orange-50 border border-orange-100 p-4">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            ⚡
          </span>
          <div>
            <p className="text-sm font-semibold text-orange-800">
              {urgent.length} demande{urgent.length > 1 ? "s" : ""} urgente{urgent.length > 1 ? "s" : ""} en attente
            </p>
            <p className="text-xs text-orange-600">Traiter en priorité</p>
          </div>
        </div>
      )}

      <StatsCards stats={MOCK_STATS} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyChart />
        </div>
        <div className="stat-card">
          <h3 className="font-semibold text-slate-900 mb-4">Sources de contact</h3>
          <div className="space-y-3">
            {[
              { label: "Formulaire contact", pct: 52, color: "bg-brand-600" },
              { label: "Google / SEO", pct: 28, color: "bg-green-500" },
              { label: "Bouche à oreille", pct: 12, color: "bg-purple-500" },
              { label: "Réseaux sociaux", pct: 8, color: "bg-orange-500" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>{s.label}</span><span>{s.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactsTable contacts={MOCK_CONTACTS} />
    </div>
  );
}
