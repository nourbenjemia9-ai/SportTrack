// Dates calculées par rapport à aujourd'hui : l'historique paraît toujours récent.
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// [type, il y a X jours, durée (min), distance (km), notes]
const rows = [
  ["Course", 0, 32, 5.4, "Footing du matin au bord de la mer"],
  ["Fitness", 1, 45, 0, "Circuit training : pompes, squats et gainage"],
  ["Vélo", 2, 75, 26, "Sortie du weekend avec les amis"],
  ["Marche", 3, 40, 3.8, "Marche rapide après le travail"],
  ["Natation", 4, 40, 1.2, "Séance technique crawl"],
  ["Course", 5, 28, 4.6, "Rythme régulier, bonnes sensations"],
  ["Fitness", 6, 50, 0, "Renforcement musculaire du haut du corps"],
  ["Marche", 7, 55, 4.9, "Balade le long de la corniche"],
  ["Vélo", 8, 60, 19, "Parcours vallonné, jambes lourdes"],
  ["Course", 9, 40, 7.1, "Sortie longue du dimanche"],
  ["Natation", 10, 35, 1, "Quelques longueurs en brasse"],
  ["Fitness", 11, 30, 0, "Séance abdos et cardio"],
  ["Marche", 12, 25, 2.2, "Petite marche de récupération"],
  ["Course", 13, 22, 3.5, "Footing léger après une pause"],
  ["Vélo", 14, 90, 33, "Longue sortie, vent de face au retour"],
  ["Natation", 15, 45, 1.5, "Travail de l'endurance, 30 longueurs"],
  ["Fitness", 16, 40, 0, "Full body à la maison"],
  ["Marche", 17, 60, 5.3, "Marche en famille"],
  ["Course", 18, 35, 5.8, "Fractionné court : 8 x 1 minute rapide"],
  ["Vélo", 19, 50, 16, "Trajet vers la fac et retour à vélo"],
  ["Natation", 21, 30, 0.8, "Séance courte, je reprends doucement"],
  ["Fitness", 22, 55, 0, "Séance jambes : fentes et squats"],
  ["Course", 23, 45, 8, "Meilleure distance du mois"],
  ["Marche", 24, 35, 3, "Marche tranquille le soir"],
  ["Vélo", 26, 65, 22, "Sortie en groupe, ambiance sympa"],
  ["Course", 28, 30, 5, "Footing du matin"],
  ["Fitness", 29, 35, 0, "Cardio et étirements"],
  ["Natation", 31, 40, 1.1, "Séance mixte crawl et dos"],
  ["Marche", 33, 70, 6.2, "Longue marche pour changer d'air"],
  ["Vélo", 36, 80, 28, "Découverte d'un nouveau parcours"],
  ["Course", 39, 25, 4, "Reprise après quelques jours de repos"],
  ["Fitness", 42, 45, 0, "Première séance du mois, bon départ"],
];

const activities = rows.map(([type, ago, duration, distance, notes], index) => ({
  id: String(index + 1),
  type,
  date: daysAgo(ago),
  duration,
  distance,
  notes,
}));

export default activities;