// Couleurs, icônes par sport et petites fonctions d'affichage.
// Ce fichier est NOUVEAU : il ne remplace le travail de personne.

export const colors = {
  bg: "#F3F5FB",
  surface: "#FFFFFF",
  ink: "#0E1330",
  muted: "#6B7391",
  line: "#E3E7F2",
  primary: "#1F4BFF",
  primarySoft: "#E6ECFF",
  danger: "#E5484D",
};

export const SPORTS = {
  Course: { icon: "🏃", color: "#FF5A4E" },
  Marche: { icon: "🚶", color: "#12B76A" },
  Vélo: { icon: "🚴", color: "#F79009" },
  Natation: { icon: "🏊", color: "#0BA5EC" },
  Fitness: { icon: "💪", color: "#7A5AF8" },
};

export const SPORT_TYPES = Object.keys(SPORTS);

export function sportOf(type) {
  return SPORTS[type] || { icon: "⭐", color: colors.primary };
}

const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

// "2026-10-08" devient "8 oct."
export function formatDate(iso) {
  const [y, m, d] = String(iso).split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]}`;
}

// 75 devient "1 h 15", 30 devient "30 min"
export function formatDuration(min) {
  const total = Math.round(Number(min) || 0);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h} h ${String(m).padStart(2, "0")}` : `${m} min`;
}

// Vérifie le format AAAA-MM-JJ et que la date existe vraiment (pas 2026-13-45)
export function isValidDate(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
}

// Nom affiché pour une activité : la première ligne des notes, sinon le type.
// (Le modèle de données ne change pas : id, type, date, duration, distance, notes.)
export function displayName(activity) {
  const text = String(activity.notes || "").trim();
  if (!text) return activity.type;
  const firstLine = text.split("\n")[0].trim();
  return firstLine.length > 40 ? `${firstLine.slice(0, 40).trim()}…` : firstLine;
}