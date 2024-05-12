import { DateTime } from "luxon";
import { RegionDepartment } from "../core/entities/request.entities";

export const tableA: any[] = [
  {
    id: 1,
    name: "Alice",
    table: "A",
    seat: false,
  },
  {
    id: 2,
    name: "Bob",
    table: "A",
    seat: true,
  },
  {
    id: 3,
    name: "Charlie",
    table: "A",
    seat: false,
  },
  {
    id: 4,
    name: "David",
    table: "A",
    seat: true,
  },
  {
    id: 5,
    name: "Eva",
    table: "A",
    seat: true,
  },
  {
    id: 6,
    name: "Frank",
    table: "A",
    seat: false,
  },
  {
    id: 7,
    name: "Grace",
    table: "A",
    seat: false,
  },
  {
    id: 8,
    name: "Hank",
    table: "A",
    seat: false,
  },
  {
    id: 9,
    name: "Ivy",
    table: "A",
    seat: false,
  },
  {
    id: 10,
    name: "Jack",
    table: "A",
    seat: false,
  },
];

export const tableB = [
  {
    id: 11,
    name: "Alice",
    table: "B",
    seat: true,
  },
  {
    id: 12,
    name: "Bob",
    table: "B",
    seat: true,
  },
  {
    id: 13,
    name: "Charlie",
    table: "B",
    seat: true,
  },
  {
    id: 14,
    name: "David",
    table: "B",
    seat: false,
  },
  {
    id: 15,
    name: "Eva",
    table: "B",
    seat: false,
  },
  {
    id: 16,
    name: "Frank",
    table: "B",
    seat: false,
  },
  {
    id: 17,
    name: "Grace",
    table: "B",
    seat: false,
  },
  {
    id: 18,
    name: "Hank",
    table: "B",
    seat: true,
  },
  {
    id: 19,
    name: "Ivy",
    table: "B",
    seat: true,
  },
  {
    id: 20,
    name: "Jack",
    table: "B",
    seat: true,
  },
];

export const regionsDepartments: RegionDepartment[] = [
  {
    region: "Adamaoua",
    departments: ["Sélectionner", "Faro et Déo", "Mayo-Banyo", "Mbéré", "Vina"],
    court: [
      "Sélectionner",
      "TPGI Banyo",
      "TPI Ngaoundéré",
      "TPGI Meinganga",
      "TPGI Tignère",
      "TPGI Tibati",
    ],
  },
  {
    region: "Centre",
    departments: [
      "Sélectionner",
      "Haute-Sanaga",
      "Lekié",
      "Mbam-et-Inoubou",
      "Mbam-et-Kim",
      "Méfou-et-Afamba",
      "Méfou-et-Akono",
      "Mfoundi",
      "Nyong-et-Kéllé",
      "Nyong-et-Mfoumou",
      "Nyong-et-So'o",
    ],
    court: [
      "Sélectionner",
      "TPGI Mbalmayo",
      "TPGI Akonolinga",
      "TPGI Bafia",
      "TPGI Eséka",
      "TPGI Mfou",
      "TPGI Monatélé",
      "TPGI Nanga- Eboko",
      "TPGI Ngoumou",
      "TPGI Ntui",
      "TPI Yaoundé- Centre- Administratif",
      "TPI Yaoundé- Ekounou",
      "TPI Yaoundé- Mendong",
    ],
  },
  {
    region: "Est",
    departments: [
      "Sélectionner",
      "Boumba-et-Ngoko",
      "Haut-Nyong",
      "Kadey",
      "Lom-et-Djérem",
      "Djoum",
    ],
  },
  {
    region: "Extreme-Nord",
    departments: [
      "Sélectionner",
      "Diamaré",
      "Logone-et-Chari",
      "Mayo-Danay",
      "Mayo-Kani",
      "Mayo-Sava",
      "Mayo-Tsanaga",
    ],
    court: [
      "Sélectionner",
      "TPGI Kaélé",
      "TPI Maroua",
      "TPI Makary",
      "TPI Doukoula",
    ],
  },
  {
    region: "Littoral",
    departments: ["Sélectionner", "Moungo", "Nkam", "Sanaga-Maritime", "Wouri"],
    court: [
      "Sélectionner",
      "TPGI Edéa",
      "TPGI Yabassi",
      "TPI Douala- Bonanjo",
      "TPI Douala Ndonkoti",
      "TPI Douala Bonabéri",
      "TPI Mbanga",
      "TPI Nkongsamba",
    ],
  },
  {
    region: "Nord",
    departments: [
      "Sélectionner",
      "Bénoué",
      "Faro",
      "Mayo-Louti",
      "Mayo-Rey",
      "Mayo-Tsanaga",
    ],
    court: [
      "Sélectionner",
      "TPGI Guider",
      "TPGI Tcholliré",
      "TPGI Poli",
      "TPI Garoua",
      "TPI Touboro",
    ],
  },
  {
    region: "Nord-Ouest",
    departments: [
      "Sélectionner",
      "Boyo",
      "Bui",
      "Donga-Mantung",
      "Menchum",
      "Mezam",
      "Momo",
      "Ngo-Ketunjia",
    ],
    court: [
      "Sélectionner",
      "TPGI Ndop",
      "TPGI Kumbo",
      "TPGI Mbengwi",
      "TPGI Nkambé",
      "TPGI Wum",
      "TPGI Fundung",
      "TPI Bamenda",
      "TPI Batibo",
      "TPI Bali",
    ],
  },
  {
    region: "Ouest",
    departments: [
      "Sélectionner",
      "Bamboutos",
      "Hauts-Plateaux",
      "Koung-Khi",
      "Menoua",
      "Mifi",
      "Ndé",
    ],
    court: [
      "Sélectionner",
      "TPGI Foumban",
      "TPGI Bafang",
      "TPGI Bagangté",
      "TPGI Dschang",
      "TPGI Mbouda",
      "TPGI Bandjoun",
      "TPGI Baham",
      "TPGI Foumban",
      "TPI Bafoussam",
      "TPI Foumbot",
    ],
  },
  {
    region: "Sud",
    departments: ["Sélectionner", "Dja-et-Lobo", "Mvila", "Ntem", "Ocean"],
    court: [
      "Sélectionner",
      "TPGI Ambam",
      "TPGI Kribi",
      "TPGI Sangmelima",
      "TPI Ebolowa",
      "TPI Djoum",
      "TPI Bengbis",
    ],
  },
  {
    region: "Sud-Ouest",
    departments: [
      "Sélectionner",
      "Fako",
      "Koupé-Manengouba",
      "Lebialem",
      "Manyu",
      "Meme",
      "Ndian",
    ],
    court: [
      "Sélectionner",
      "TPGI Bangem",
      "TPGI Manfé",
      "TPGI Mudemba",
      "TPGI Menji",
      "TPI Buéa",
      "TPI Limbé",
      "TPI Munyuka",
      "TPI Tiko",
      "TPI Kumba",
      "TPI Tombel",
    ],
  },
];

export function getDepartmentsByRegion(regionName: string): string[] {
  for (const region of regionsDepartments) {
    if (region.region === regionName) {
      return [...region.departments];
    }
  }
  return [];
}

export function getCourtByRegion(regionName: string): string[] {
  for (const region of regionsDepartments) {
    if (region.region === regionName && region.court) {
      return [...region.court];
    }
  }
  return [];
}

export const centralFiles = () => {
  return ["Sélectionner", "Fichier Central Exterieur", "Fichier Central NOSO"];
};

export const requestStatus = [
  { value: "Sélectionner", name: "Sélectionner" },
  { value: "STARTED", name: "Soumis" },
  { value: "STARTED", name: "Payé" },
  { value: "COMMITED", name: "Initié" },
  { value: "REJECTED", name: "Rejeté" },
  { value: "INCORRECT", name: "Erroné" },
  { value: "COMPLETED", name: "Établi" },
  { value: "SHIPPED", name: "Expédié" },
  { value: "RECEIVED", name: "Réceptionné" },
  { value: "DELIVERED", name: "Livré" },
];

export const formatToYYYYMMDD = (dateString: string) => {
  const date = DateTime.fromISO(dateString);
  if (date.isValid) {
    return date.toFormat("yyyy-MM-dd");
  } else {
    return "";
  }
};
