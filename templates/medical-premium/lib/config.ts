export const CABINET = {
  name: "Cabinet Médical Voltaire",
  specialty: "Médecine générale & Téléconsultation",
  description:
    "Cabinet médical à Lyon. Médecine générale, suivi chronique, téléconsultation. Prise de rendez-vous en ligne 24h/24. Secteur 1, carte vitale acceptée.",
  url: "https://cabinet-voltaire.fr",
  phone: "+33 4 78 00 33 44",
  email: "secretariat@cabinet-voltaire.fr",
  address: {
    streetAddress: "15 rue Voltaire",
    addressLocality: "Lyon",
    postalCode: "69003",
    addressCountry: "FR",
  },
  openingHours: ["Mo-Fr 08:00-12:30", "Mo-Fr 14:00-19:00", "Sa 09:00-12:00"],
  priceRange: "€",
};

export const PRATICIENS = [
  {
    name: "Dr Sophie Mercier",
    specialty: "Médecin généraliste",
    desc: "Thèse de médecine Paris VI. Spécialisée en médecine du sport et pathologies chroniques. Formatrice DPC.",
    initials: "SM",
    color: "bg-blue-600",
    langues: ["Français", "Anglais"],
    secteur: "Secteur 1",
  },
  {
    name: "Dr Karim Benali",
    specialty: "Médecin généraliste",
    desc: "Ancien interne des hôpitaux de Lyon. Compétence cardiologie préventive et diabétologie.",
    initials: "KB",
    color: "bg-teal-600",
    langues: ["Français", "Arabe"],
    secteur: "Secteur 1",
  },
  {
    name: "Dr Isabelle Roux",
    specialty: "Médecin généraliste — Homéopathie",
    desc: "Médecine intégrative, accompagnement périnatal, gynécologie courante. Consultation de 30 min.",
    initials: "IR",
    color: "bg-purple-600",
    langues: ["Français"],
    secteur: "Secteur 2",
  },
];

export const SERVICES = [
  { label: "Consultation générale", delay: "Sous 48h", icon: "🩺" },
  { label: "Téléconsultation", delay: "Aujourd'hui", icon: "💻" },
  { label: "Suivi maladies chroniques", delay: "Sur dossier", icon: "📋" },
  { label: "Médecine du sport", delay: "Sous 72h", icon: "🏃" },
  { label: "Bilan de santé complet", delay: "Sous 1 semaine", icon: "🔬" },
  { label: "Vaccinations & voyages", delay: "Sous 48h", icon: "💉" },
];
