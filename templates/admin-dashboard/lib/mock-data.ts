import type { Contact, DashboardStats } from "./types";

export const MOCK_CONTACTS: Contact[] = [
  { id: "1", name: "Sophie Martin", email: "sophie.m@gmail.com", phone: "06 12 34 56 78", service: "Dépannage urgent", message: "Fuite sous l'évier cuisine, eau partout, urgent svp", urgency: true, status: "new", createdAt: "2025-04-26T08:23:00Z", source: "Formulaire contact" },
  { id: "2", name: "Patrick Dubois", email: "p.dubois@orange.fr", phone: "07 98 76 54 32", service: "Chauffage", message: "Chaudière en panne depuis 2 jours, besoin devis remplacement", urgency: false, status: "in_progress", createdAt: "2025-04-25T14:10:00Z", source: "Google Ads" },
  { id: "3", name: "Marie-Claire Tissot", email: "mc.tissot@hotmail.fr", service: "Salle de bain", message: "Souhait rénovation complète salle de bain, budget ~8000€", urgency: false, status: "done", createdAt: "2025-04-25T09:45:00Z", source: "Bouche à oreille" },
  { id: "4", name: "Thomas Lefèvre", email: "thomas.l@entreprise.fr", phone: "06 11 22 33 44", service: "Plomberie générale", message: "Plusieurs robinets à changer dans notre bureau. 3 WC à réviser.", urgency: false, status: "new", createdAt: "2025-04-26T07:05:00Z", source: "Formulaire contact" },
  { id: "5", name: "Isabelle Rondeau", email: "isa.rondeau@gmail.com", phone: "06 55 44 33 22", service: "Dépannage urgent", message: "Colonne d'eau bouchée immeuble 6 étages, locataires mécontents", urgency: true, status: "in_progress", createdAt: "2025-04-26T06:30:00Z", source: "Appel → formulaire" },
  { id: "6", name: "François Bernard", email: "f.bernard@laposte.net", service: "Rénovation énergétique", message: "Intéressé par PAC air/eau + plancher chauffant maison 120m²", urgency: false, status: "archived", createdAt: "2025-04-24T16:20:00Z", source: "SEO" },
];

export const MOCK_STATS: DashboardStats = {
  total: 6,
  newToday: 2,
  inProgress: 2,
  responseRate: 94,
  avgResponseTime: "1h42",
};

export const WEEKLY_DATA = [
  { day: "Lun", contacts: 4 },
  { day: "Mar", contacts: 7 },
  { day: "Mer", contacts: 5 },
  { day: "Jeu", contacts: 9 },
  { day: "Ven", contacts: 6 },
  { day: "Sam", contacts: 3 },
  { day: "Dim", contacts: 1 },
];
