export const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
export const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

export type HalfDateOptions = {
  fullMonth?: boolean;
};

export function buildHalfDate(date: Date, options?: HalfDateOptions): string {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${options && options.fullMonth ? month : month.substring(0, 3) + "."} ${year}`;
}
