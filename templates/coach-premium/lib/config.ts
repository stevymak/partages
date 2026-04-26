export const COACH = {
  name: "Sarah Lemaire",
  title: "Coach de vie & Business Coach certifiée",
  tagline: "Transforme ta vision en résultats concrets.",
  description:
    "Coach certifiée ICF à Lyon. Accompagnement individuel en développement personnel, leadership et performance business. Séances en présentiel ou en ligne.",
  url: "https://sarahlemaire-coaching.fr",
  phone: "+33 6 00 44 55 66",
  email: "hello@sarahlemaire-coaching.fr",
  instagram: "https://instagram.com/sarahlemaire.coach",
  linkedin: "https://linkedin.com/in/sarahlemaire",
};

export const PROGRAMMES = [
  {
    name: "Starter",
    sessions: 4,
    duration: "1 mois",
    price: "490€",
    priceDetail: "4 × 122€",
    desc: "Pour démarrer, clarifier ses objectifs et poser les premières actions concrètes.",
    features: ["4 séances de 60 min", "Support WhatsApp entre séances", "Plan d'action personnalisé", "Accès à la bibliothèque de ressources"],
    highlight: false,
  },
  {
    name: "Transformation",
    sessions: 10,
    duration: "3 mois",
    price: "1 090€",
    priceDetail: "3 × 363€",
    desc: "Le programme phare. 3 mois pour transformer durablement ta trajectoire de vie ou business.",
    features: ["10 séances de 75 min", "Support illimité entre séances", "Plan d'action & suivi hebdo", "Accès à tous les outils et templates", "Bilan final & plan 6 mois"],
    highlight: true,
  },
  {
    name: "Intensif",
    sessions: 1,
    duration: "VIP Day",
    price: "690€",
    priceDetail: "Journée complète",
    desc: "Une journée intensive pour débloquer une situation, lancer un projet ou clarifier ta vision.",
    features: ["Journée 6h en présentiel (Lyon)", "Préparation 2h à distance", "Compte-rendu détaillé", "Suivi 30j post-session"],
    highlight: false,
  },
];

export const TEMOIGNAGES = [
  { name: "Amandine R.", role: "Directrice marketing", text: "En 3 mois avec Sarah, j'ai négocié une promotion, défini ma stratégie de vie et retrouvé confiance en moi. ROI incomparable.", stars: 5 },
  { name: "Thomas D.", role: "Entrepreneur", text: "J'étais bloqué dans mon business depuis 2 ans. 4 séances ont suffi pour débloquer les freins inconscients et relancer ma croissance.", stars: 5 },
  { name: "Julie M.", role: "Chef de projet", text: "Sarah pose les bonnes questions. Elle ne donne pas les réponses — elle t'aide à les trouver toi-même. C'est ça, le vrai coaching.", stars: 5 },
  { name: "Kevin B.", role: "Cadre bancaire", text: "Le VIP Day a été une révélation. Je suis reparti avec 6 mois d'actions claires. Meilleur investissement de l'année.", stars: 5 },
];
