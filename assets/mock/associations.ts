export type Association = {
  id: number;
  name: string;
  avatarURL?: string;
  tags?: string[];
};

export default [
  {
    id: 1,
    name: "Amicale CORE",
    avatarURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK0ZbzXLTveWA1AMLtj9XNi4J1d-Uq1M7FGA&s",
    tags: [
      "Snack bar",
      "A emporter",
      "Événementiel",
      "Étudiants",
    ],
  },
  {
    id: 2,
    name: "AFGES",
    avatarURL: "https://upload.wikimedia.org/wikipedia/commons/9/91/Logo_gtrasnp.png",
    tags: [
      "Fédération",
      "Strasbourg",
      "Intégration",
      "Renseignements",
      "Accompagnement",
    ],
  },
  {
    id: 3,
    name: "AIUS",
    avatarURL: "https://pbs.twimg.com/profile_images/1510623864245694476/OHNyVdaK_400x400.jpg",
  },
] as Association[];
