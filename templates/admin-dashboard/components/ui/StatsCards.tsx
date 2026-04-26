import { TrendingUp, Users, Clock, CheckCircle, AlertCircle } from "lucide-react";
import type { DashboardStats } from "@/lib/types";

type Props = { stats: DashboardStats };

export default function StatsCards({ stats }: Props) {
  const cards = [
    {
      label: "Total contacts",
      value: stats.total,
      icon: Users,
      iconBg: "bg-brand-50",
      iconColor: "text-brand-600",
      trend: "+12% ce mois",
      trendUp: true,
    },
    {
      label: "Nouveaux aujourd'hui",
      value: stats.newToday,
      icon: AlertCircle,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "À traiter",
      trendUp: null,
    },
    {
      label: "En cours",
      value: stats.inProgress,
      icon: Clock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      trend: "Attente réponse",
      trendUp: null,
    },
    {
      label: "Taux de réponse",
      value: `${stats.responseRate}%`,
      icon: CheckCircle,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      trend: `Délai moy. ${stats.avgResponseTime}`,
      trendUp: true,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div key={card.label} className="stat-card flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{card.value}</p>
            <div className="mt-2 flex items-center gap-1 text-xs">
              {card.trendUp !== null && (
                <TrendingUp className={`h-3.5 w-3.5 ${card.trendUp ? "text-green-500" : "text-red-500"}`} />
              )}
              <span className="text-slate-400">{card.trend}</span>
            </div>
          </div>
          <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}>
            <card.icon className={`h-5 w-5 ${card.iconColor}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
