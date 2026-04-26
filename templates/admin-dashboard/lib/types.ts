export type ContactStatus = "new" | "in_progress" | "done" | "archived";
export type ContactUrgency = "low" | "medium" | "high";

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  urgency: boolean;
  status: ContactStatus;
  createdAt: string;
  source?: string;
};

export type DashboardStats = {
  total: number;
  newToday: number;
  inProgress: number;
  responseRate: number;
  avgResponseTime: string;
};
