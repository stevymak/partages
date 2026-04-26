export const RESTAURANT = {
  name: "Le Comptoir de Lyon",
  tagline: "Cuisine bistronomique • Produits du marché • Cave à vins",
  description:
    "Restaurant bistronomique à Lyon. Cuisine du marché, produits frais, vins naturels. Déjeuner du mardi au samedi, dîner du jeudi au samedi. Réservation conseillée.",
  url: "https://lecomptoirdelyon.fr",
  phone: "+33 4 78 00 11 22",
  email: "reservation@lecomptoirdelyon.fr",
  address: {
    streetAddress: "8 rue Mercière",
    addressLocality: "Lyon",
    postalCode: "69002",
    addressCountry: "FR",
  },
  openingHours: [
    "Mardi–Samedi : déjeuner 12h–14h30",
    "Jeudi–Samedi : dîner 19h–22h30",
  ],
  priceRange: "€€€",
  socialLinks: {
    instagram: "https://instagram.com/lecomptoirdelyon",
  },
};

export const MENU_SECTIONS = [
  {
    label: "Entrées",
    items: [
      { name: "Burrata & tomates rôties", description: "Huile d'olive AOP, basilic frais, fleur de sel", price: "14€", tag: "Végétarien" },
      { name: "Carpaccio de saint-Jacques", description: "Citron Meyer, câpres, herbes du moment", price: "18€" },
      { name: "Terrine de campagne maison", description: "Cornichons, moutarde ancienne, pain de campagne grillé", price: "12€" },
      { name: "Velouté de saison", description: "Crème légère, huile parfumée", price: "10€", tag: "Du marché" },
    ],
  },
  {
    label: "Plats",
    items: [
      { name: "Filet de bar sauvage", description: "Beurre blanc, fenouil confit, tuile de riz soufflé", price: "28€", tag: "Pêche durable" },
      { name: "Agneau de lait du Quercy", description: "Jus corsé, polenta crémeuse, légumes de saison", price: "32€" },
      { name: "Risotto aux cèpes & truffe", description: "Parmesan 36 mois, huile de truffe noire du Périgord", price: "26€", tag: "Végétarien" },
      { name: "Entrecôte Black Angus 300g", description: "Beurre café de Paris, frites maison, salade", price: "35€" },
    ],
  },
  {
    label: "Desserts",
    items: [
      { name: "Île flottante signature", description: "Pralin artisanal, caramel beurre salé, amandes torréfiées", price: "9€" },
      { name: "Tarte au citron meringuée", description: "Crème yuzu, meringue italienne, sablé breton", price: "11€" },
      { name: "Fondant chocolat Valrhona", description: "Cœur coulant, glace vanille Bourbon, cacao cru", price: "12€" },
      { name: "Sélection de fromages affinés", description: "3 fromages du moment, confiture, pain aux noix", price: "14€" },
    ],
  },
];
