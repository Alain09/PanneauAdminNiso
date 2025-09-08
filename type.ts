

// pour les statistiques globale de la tontine
export interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: number;
}

// pour la formation des produits

// ici ProductCalogue represente un objet de produit 
// pour chaque  options dans une categories  
export interface ProductCatalogue {
  id: string,
  categorie: string,
  option: number,
  price: number,
  totalweek: number
  composant: ComposantCatalogue[]
}

// ici ComposantCatalogue represente un objet de composant la liste des articles aue constitue une option
export interface ComposantCatalogue {
  id: string,
  product: string,
  quantity: number,
  image?: File | string
}


// pour les membres de l'equipe
export type Role = 'Administrateur' | 'Sécrétaire' | 'developpeur' | 'Trésorière' | string;

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  position?: string;
  image?: File | string;
  provence?:string;
  password?:string
}

// pour la gestion des campagnes de la tontine
export interface Campagne {
  id?: string;
  nom?: string;
  status?: string;
  weekActif?: string;
  campagneStatut?: string | "En cours" | "Terminé";
  dureeSelectionJours?: number;
  dureeTontineSemaines?: number;
  selectionStart?: Date;
  selectionEnd?: Date;
  tontineStart?: Date;
  tontineEnd?: Date;
  createdAt?: Date;
}


//
export interface OptionComponent {
  id?: string,
  compose: string;
}

export interface TontineOption {
  id?: string;
  category: string;
  option: string;
  countOption: number;
  totalToPayByWeekOfThisOption?: number;
  components: OptionComponent[];
}

export interface Categories {
  id: string;
  category: string;
  week?: string;
  status?: string | "Payé" | "En retard" | "En cours";
  totalToPayByWeekOfThisCategory: number;
  datePaiement?: Date;
}

/* here we calculate amount  associate by each category */
export interface CategoriesStatisquesPayement {
  id: string;
  category: string; // 100fcfa
  listOptions?: string[]; // ["1","2","3"]
  status?: string | "En cours" | "Terminé";
  totalPaid: number;// total semaines * montant herbdomadaire
  weekValided: number;// 03/15
  totalPaidByWeek: number;
  optionsDescription?: TontineOption[];   // details des options choisies
  detailPaiementOfThisCategorie?: Categories[]
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  contact?: string;
  role?: string;
  position?: string | "AutoGestion" | "Gestion";
  image?: File | string;
  provence?: string;
  profession?: string;
  description?: string;
  status?: string | "En cours" | "Terminé";
  montantTotalGlobal?: number;
  categoriesStatistiques?: CategoriesStatisquesPayement[];
  createdAt?: Date;
}

export interface DataBaseUsersTabs {
  firstName?: string;
  lastName?: string;
  contact?: string | undefined;
  position?: string;
  provence?: string;
  id?: string;
  category?: string;
  listOptions?: string[];
  status?: string | "En cours" | "Terminé";
  dateEntree: string;
}


export interface UniqueUser {
  tab: CategoriesStatisquesPayement[],
  id: string,
  listOptions?: string[],
  totalPaidByWeek?: number,
  totalPaid?: number
  weekValided?: number,
  category?: string,
}


// ici les typages pour les donnees aui servirons pour l'analyse en diagramme en barre
export interface OptionsCounts {
  option?: string,
  count?: number
}
export interface StatisticCategories {
  id?: string,
  categorie?: string,
  listeOptions?: OptionsCounts[]

}

//------------ ceci pour la courbe d'evolution des paiements par semaine
export interface PaymentDataVariation {
  weeks: string;
  value: number;
}


//----- for the userlast
export interface UsersLatePayment {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: string
  category?: string;
  amountPaidByWeek?: number;
  weekActif?: string;
  lastWeekPaid?: string;
}

//------- for the payment history of weekActif
export interface PaymentHistoryWeekActif {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: string
  category?: string;
  options?: string[];
  amountPaidByWeek?: number;
  weekActif?: string;
}


export const Donnees: UserProfile[] = [
  {
    id: "b3a7e8f2-6c4d-4a9b-8e1f-3d0c2b1a9f8e",
    firstName: "Awa",
    lastName: "Diop",
    email: "awa.diop@example.com",
    contact: "+229910893092",
    role: "membre",
    position: "AutoGestion",
    image: "/profil.jpg",
    provence: "Alibori",
    profession: " Etidante",
    description: "Membre fondateur de la tontine",
    status: "Terminé",
    montantTotalGlobal: 350000,
    categoriesStatistiques: [
      {
        id: "c5d6e7f8-9a0b-1c2d-3e4f-5a6b7c8d9e0f",
        category: "500",
        listOptions: ["1", "2", "3"],
        status: "En cours",
        totalPaid: 150000,
        weekValided: 9,
        totalPaidByWeek: 215000,
        optionsDescription: [
          {
            category: "500",
            option: "1",
            countOption: 2,
            totalToPayByWeekOfThisOption: 1500,
            components: [
              { id: "f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c", compose: "Appareil 1" },
              { id: "a7b8c9d0-e1f2-3a4b-5c6d-7e8f9a0b1c2d", compose: "Accessoire 1" },
              { id: "b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e", compose: "Garantie 1 an" },
              { id: "c9d0e1f2-a3b4-5c6d-7e8f-9a0b1c2d3e4f5", compose: "Kit d'entretien 1" },
              { id: "d0e1f2a3-b4c5-6d7e-8f9a-0b1c2d3e4f5a6", compose: "Manuel 1" }
            ]
          },
          {

            category: "500",
            option: "2",
            countOption: 1,
            totalToPayByWeekOfThisOption: 2500,
            components: [
              { id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a", compose: "Appareil 5" },
              { id: "e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b", compose: "Accessoire 5" },
              { id: "f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c", compose: "Garantie 5 an" },
              { id: "a7b8c9d0-e1f2-3a4b-5c6d-7e8f9a0b1c2d", compose: "Kit d'entretien 5" },
              { id: "b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e", compose: "Manuel 5" }
            ]
          },
          {
            category: "500",
            option: "3",
            countOption: 1,
            totalToPayByWeekOfThisOption: 3500,
            components: [
              { id: "b0c1d2e3-f4a5-6b7c-8d9e-0f1a2b3c4d5e", compose: "Appareil 3" },
              { id: "c1d2e3f4-a5b6-7c8d-9e0f-1a2b3c4d5e6f", compose: "Accessoire 3" },
              { id: "d2e3f4a5-b6c7-8d9e-0f1a-2b3c4d5e6f7a", compose: "Garantie 3 an" },
              { id: "e3f4a5b6-c7d8-9e0f-1a2b-3c4d5e6f7a8b", compose: "Kit d'entretien 3" },
              { id: "f4a5b6c7-d8e9-0f1a-2b3c-4d5e6f7a8b9c", compose: "Manuel 3" }
            ]
          }
        ],
        detailPaiementOfThisCategorie: [
          {
            id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a",
            category: "500",
            week: "sem 1",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 3500,
           
            datePaiement: new Date(Date.now() - 86400000 * 28)
          },
          {
            id: "e6f7a8b9-c0d1-2e3f-4a5b-6c7d8e9f0a1b",
            category: "500",
            week: "sem 2",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 2500,
          
            datePaiement: new Date(Date.now() - 86400000 * 21)
          },
          {
            id: "f8a9b0c1-d2e3-4f5a-6b7c-8d9e0f1a2b3c",
            category: "500",
            week: "sem 3",
            status: "En retard",
            totalToPayByWeekOfThisCategory: 5000,
          
            datePaiement: new Date(Date.now() - 86400000 * 14)
          },
          {
            id: "a0b1c2d3-e4f5-6a7b-8c9d-0e1f2a3b4c5d",
            category: "500",
            week: "sem 4",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 4500,
           
            datePaiement: new Date(Date.now() - 86400000 * 7)
          },
          {
            id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
            category: "500",
            week: "sem 5",
            status: "En cours",
            totalToPayByWeekOfThisCategory: 7000,
         
            datePaiement: new Date(Date.now())
          }
        ]
      },
      {
        id: "c5d6e7f8-9a0b-1c2d-3e4f-5a6b7c8d9e0f",
        category: "100",
        listOptions: ["1", "3"],
        status: "Terminé",
        totalPaid: 150000,
        weekValided: 9,
        totalPaidByWeek: 5000,
        optionsDescription: [
          {
            id: "e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b",
            category: "100",
            option: "1",
            countOption: 1,
            totalToPayByWeekOfThisOption: 2500,
            components: [
              { id: "f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c", compose: "Appareil 1" },
              { id: "a7b8c9d0-e1f2-3a4b-5c6d-7e8f9a0b1c2d", compose: "Accessoire 1" },
              { id: "b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e", compose: "Garantie 1 an" },
              { id: "c9d0e1f2-a3b4-5c6d-7e8f-9a0b1c2d3e4f5", compose: "Kit d'entretien 1" },
              { id: "d0e1f2a3-b4c5-6d7e-8f9a-0b1c2d3e4f5a6", compose: "Manuel 1" }
            ]
          },
          {
            id: "e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b",
            category: "100",
            option: "3",
            countOption: 2,
            totalToPayByWeekOfThisOption: 2500,
            components: [
              { id: "f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c", compose: "Appareil 1" },
              { id: "a7b8c9d0-e1f2-3a4b-5c6d-7e8f9a0b1c2d", compose: "Accessoire 1" },
              { id: "b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e", compose: "Garantie 1 an" },
              { id: "c9d0e1f2-a3b4-5c6d-7e8f-9a0b1c2d3e4f5", compose: "Kit d'entretien 1" },
              { id: "d0e1f2a3-b4c5-6d7e-8f9a-0b1c2d3e4f5a6", compose: "Manuel 1" }
            ]
          }
        ],
        detailPaiementOfThisCategorie: [
          {
            id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a",
            category: "100",
            week: "sem 1",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 2500,
           
            datePaiement: new Date(Date.now() - 86400000 * 28)
          },
          {
            id: "e6f7a8b9-c0d1-2e3f-4a5b-6c7d8e9f0a1b",
            category: "100",
            week: "sem 2",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5500,
           
            datePaiement: new Date(Date.now() - 86400000 * 21)
          },
          {
            id: "f8a9b0c1-d2e3-4f5a-6b7c-8d9e0f1a2b3c",
            category: "100",
            week: "sem 3",
            status: "En retard",
            totalToPayByWeekOfThisCategory: 4500,
           
            datePaiement: new Date(Date.now() - 86400000 * 14)
          },
          {
            id: "a0b1c2d3-e4f5-6a7b-8c9d-0e1f2a3b4c5d",
            category: "100",
            week: "sem 4",
            status: "En cours",
            totalToPayByWeekOfThisCategory: 5000,
           
            datePaiement: new Date(Date.now() - 86400000 * 7)
          },
          {
            id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
            category: "100",
            week: "sem 5",
            status: "En attente",
            totalToPayByWeekOfThisCategory: 5000,
          
            datePaiement: new Date(Date.now())
          }
        ]
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 180)
  },
  {
    id: "bf339fb8-4269-4807-a0e7-9451b3bd6f31",
    firstName: "Nadine",
    lastName: "Amoussou",
    email: "nadine.amoussou@example.com",
    contact: "+229949123311",
    role: "gestionnaire",
    position: "Membre",
    image: "",
    provence: "Alibori",
    description: "Profil de Nadine Amoussou actif dans la tontine.",
    status: "Terminé",
    montantTotalGlobal: 350000,
    categoriesStatistiques: [
      {
        id: "c5d6e7f8-9a0b-1c2d-3e4f-5a6b7c8d9e0f",
        category: "500",
        listOptions: ["1", "2", "3"],
        status: "Terminé",
        totalPaid: 150000,
        weekValided: 9,
        totalPaidByWeek: 5000,
        optionsDescription: [
          {
            id: "e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b",
            category: "500",
            option: "1",
            countOption: 1,
            totalToPayByWeekOfThisOption: 25000,
            components: [
              { id: "f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c", compose: "Appareil 1" },
              { id: "a7b8c9d0-e1f2-3a4b-5c6d-7e8f9a0b1c2d", compose: "Accessoire 1" },
              { id: "b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e", compose: "Garantie 1 an" },
              { id: "c9d0e1f2-a3b4-5c6d-7e8f-9a0b1c2d3e4f5", compose: "Kit d'entretien 1" },
              { id: "d0e1f2a3-b4c5-6d7e-8f9a-0b1c2d3e4f5a6", compose: "Manuel 1" }
            ]
          },
          {
            id: "f7a8b9c0-d1e2-3f4a-5b6c-7d8e9f0a1b2c",
            category: "500",
            option: "2",
            countOption: 1,
            totalToPayByWeekOfThisOption: 25000,
            components: [
              { id: "a8b9c0d1-e2f3-4a5b-6c7d-8e9f0a1b2c3d", compose: "Appareil 2" },
              { id: "b9c0d1e2-f3a4-5b6c-7d8e-9f0a1b2c3d4e", compose: "Accessoire 2" },
              { id: "c0d1e2f3-a4b5-6c7d-8e9f-0a1b2c3d4e5f", compose: "Garantie 2 an" },
              { id: "d1e2f3a4-b5c6-7d8e-9f0a-1b2c3d4e5f6a", compose: "Kit d'entretien 2" },
              { id: "e2f3a4b5-c6d7-8e9f-0a1b-2c3d4e5f6a7b", compose: "Manuel 2" }
            ]
          },
          {
            id: "a9b0c1d2-e3f4-5a6b-7c8d-9e0f1a2b3c4d",
            category: "500",
            option: "3",
            countOption: 1,
            totalToPayByWeekOfThisOption: 25000,
            components: [
              { id: "b0c1d2e3-f4a5-6b7c-8d9e-0f1a2b3c4d5e", compose: "Appareil 3" },
              { id: "c1d2e3f4-a5b6-7c8d-9e0f-1a2b3c4d5e6f", compose: "Accessoire 3" },
              { id: "d2e3f4a5-b6c7-8d9e-0f1a-2b3c4d5e6f7a", compose: "Garantie 3 an" },
              { id: "e3f4a5b6-c7d8-9e0f-1a2b-3c4d5e6f7a8b", compose: "Kit d'entretien 3" },
              { id: "f4a5b6c7-d8e9-0f1a-2b3c-4d5e6f7a8b9c", compose: "Manuel 3" }
            ]
          }
        ],
        detailPaiementOfThisCategorie: [
          {
            id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a",
            category: "500",
            week: "sem 1",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 12000,
            datePaiement: new Date(Date.now() - 86400000 * 28)
          },
          {
            id: "e6f7a8b9-c0d1-2e3f-4a5b-6c7d8e9f0a1b",
            category: "500",
            week: "sem 2",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
          
            datePaiement: new Date(Date.now() - 86400000 * 21)
          },
          {
            id: "f8a9b0c1-d2e3-4f5a-6b7c-8d9e0f1a2b3c",
            category: "500",
            week: "sem 3",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
          
            datePaiement: new Date(Date.now() - 86400000 * 14)
          },
          {
            id: "a0b1c2d3-e4f5-6a7b-8c9d-0e1f2a3b4c5d",
            category: "500",
            week: "sem 4",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
         
            datePaiement: new Date(Date.now() - 86400000 * 7)
          },
          {
            id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
            category: "500",
            week: "sem 5",
            status: "En cours",
            totalToPayByWeekOfThisCategory: 5000,
          
            datePaiement: new Date(Date.now())
          }
        ]
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 180)
  },
  {
    id: "6838be1d-1730-4449-bd09-a4e2576845fd",
    firstName: "Jean",
    lastName: "Soglo",
    email: "jean.soglo@example.com",
    contact: "+229915274308",
    role: "admin",
    position: "Membre",
    image: "",
    provence: "Borgou",
    description: "Profil de Jean Soglo actif dans la tontine.",
    status: "En cours",
    montantTotalGlobal: 350000,
    categoriesStatistiques: [
      {
        id: "c5d6e7f8-9a0b-1c2d-3e4f-5a6b7c8d9e0f",
        category: "200",
        listOptions: ["1", "2", "3"],
        status: "Terminé",
        totalPaid: 150000,
        weekValided: 9,
        totalPaidByWeek: 5000,
        optionsDescription: [
          {
            id: "e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b",
            category: "200",
            option: "1",
            countOption: 1,
            totalToPayByWeekOfThisOption: 25000,
            components: [
              { id: "f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c", compose: "Appareil 1" },
              { id: "a7b8c9d0-e1f2-3a4b-5c6d-7e8f9a0b1c2d", compose: "Accessoire 1" },
              { id: "b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e", compose: "Garantie 1 an" },
              { id: "c9d0e1f2-a3b4-5c6d-7e8f-9a0b1c2d3e4f5", compose: "Kit d'entretien 1" },
              { id: "d0e1f2a3-b4c5-6d7e-8f9a-0b1c2d3e4f5a6", compose: "Manuel 1" }
            ]
          },
          {
            id: "f7a8b9c0-d1e2-3f4a-5b6c-7d8e9f0a1b2c",
            category: "200",
            option: "2",
            countOption: 1,
            totalToPayByWeekOfThisOption: 25000,
            components: [
              { id: "a8b9c0d1-e2f3-4a5b-6c7d-8e9f0a1b2c3d", compose: "Appareil 2" },
              { id: "b9c0d1e2-f3a4-5b6c-7d8e-9f0a1b2c3d4e", compose: "Accessoire 2" },
              { id: "c0d1e2f3-a4b5-6c7d-8e9f-0a1b2c3d4e5f", compose: "Garantie 2 an" },
              { id: "d1e2f3a4-b5c6-7d8e-9f0a-1b2c3d4e5f6a", compose: "Kit d'entretien 2" },
              { id: "e2f3a4b5-c6d7-8e9f-0a1b-2c3d4e5f6a7b", compose: "Manuel 2" }
            ]
          },
          {
            id: "a9b0c1d2-e3f4-5a6b-7c8d-9e0f1a2b3c4d",
            category: "200",
            option: "3",
            countOption: 1,
            totalToPayByWeekOfThisOption: 25000,
            components: [
              { id: "b0c1d2e3-f4a5-6b7c-8d9e-0f1a2b3c4d5e", compose: "Appareil 3" },
              { id: "c1d2e3f4-a5b6-7c8d-9e0f-1a2b3c4d5e6f", compose: "Accessoire 3" },
              { id: "d2e3f4a5-b6c7-8d9e-0f1a-2b3c4d5e6f7a", compose: "Garantie 3 an" },
              { id: "e3f4a5b6-c7d8-9e0f-1a2b-3c4d5e6f7a8b", compose: "Kit d'entretien 3" },
              { id: "f4a5b6c7-d8e9-0f1a-2b3c-4d5e6f7a8b9c", compose: "Manuel 3" }
            ]
          }
        ],
        detailPaiementOfThisCategorie: [
          {
            id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a",
            category: "200",
            week: "sem 1",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
          
            datePaiement: new Date(Date.now() - 86400000 * 28)
          },
          {
            id: "e6f7a8b9-c0d1-2e3f-4a5b-6c7d8e9f0a1b",
            category: "200",
            week: "sem 2",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
          
            datePaiement: new Date(Date.now() - 86400000 * 21)
          },
          {
            id: "f8a9b0c1-d2e3-4f5a-6b7c-8d9e0f1a2b3c",
            category: "200",
            week: "sem 3",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
         
            datePaiement: new Date(Date.now() - 86400000 * 14)
          },
          {
            id: "a0b1c2d3-e4f5-6a7b-8c9d-0e1f2a3b4c5d",
            category: "200",
            week: "sem 4",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
         
            datePaiement: new Date(Date.now() - 86400000 * 7)
          },
          {
            id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
            category: "200",
            week: "sem 5",
            status: "En retard",
            totalToPayByWeekOfThisCategory: 5000,
          
            datePaiement: new Date(Date.now())
          }
        ]
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 180)
  },
  {
    id: "6ac40b89-316e-47dc-9e3c-4716c64c52a6",
    firstName: "Koffi",
    lastName: "Mensah",
    email: "koffi.mensah@example.com",
    contact: "+229985837549",
    role: "admin",
    position: "Président",
    image: "",
    provence: "Alibori",
    description: "Profil de Koffi Mensah actif dans la tontine.",
    status: "En cours",
    montantTotalGlobal: 350000,
    categoriesStatistiques: [
      {
        id: "c5d6e7f8-9a0b-1c2d-3e4f-5a6b7c8d9e0f",
        category: "500",
        listOptions: ["1", "2", "3"],
        status: "Terminé",
        totalPaid: 150000,
        weekValided: 9,
        totalPaidByWeek: 5000,
        optionsDescription: [
          {
            id: "e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b",
            category: "500",
            option: "1",
            countOption: 1,
            totalToPayByWeekOfThisOption: 25000,
            components: [
              { id: "f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c", compose: "Appareil 1" },
              { id: "a7b8c9d0-e1f2-3a4b-5c6d-7e8f9a0b1c2d", compose: "Accessoire 1" },
              { id: "b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e", compose: "Garantie 1 an" },
              { id: "c9d0e1f2-a3b4-5c6d-7e8f-9a0b1c2d3e4f5", compose: "Kit d'entretien 1" },
              { id: "d0e1f2a3-b4c5-6d7e-8f9a-0b1c2d3e4f5a6", compose: "Manuel 1" }
            ]
          },
          {
            id: "f7a8b9c0-d1e2-3f4a-5b6c-7d8e9f0a1b2c",
            category: "500",
            option: "2",
            countOption: 1,
            totalToPayByWeekOfThisOption: 25000,
            components: [
              { id: "a8b9c0d1-e2f3-4a5b-6c7d-8e9f0a1b2c3d", compose: "Appareil 2" },
              { id: "b9c0d1e2-f3a4-5b6c-7d8e-9f0a1b2c3d4e", compose: "Accessoire 2" },
              { id: "c0d1e2f3-a4b5-6c7d-8e9f-0a1b2c3d4e5f", compose: "Garantie 2 an" },
              { id: "d1e2f3a4-b5c6-7d8e-9f0a-1b2c3d4e5f6a", compose: "Kit d'entretien 2" },
              { id: "e2f3a4b5-c6d7-8e9f-0a1b-2c3d4e5f6a7b", compose: "Manuel 2" }
            ]
          },
          {
            id: "a9b0c1d2-e3f4-5a6b-7c8d-9e0f1a2b3c4d",
            category: "500",
            option: "3",
            countOption: 1,
            totalToPayByWeekOfThisOption: 25000,
            components: [
              { id: "b0c1d2e3-f4a5-6b7c-8d9e-0f1a2b3c4d5e", compose: "Appareil 3" },
              { id: "c1d2e3f4-a5b6-7c8d-9e0f-1a2b3c4d5e6f", compose: "Accessoire 3" },
              { id: "d2e3f4a5-b6c7-8d9e-0f1a-2b3c4d5e6f7a", compose: "Garantie 3 an" },
              { id: "e3f4a5b6-c7d8-9e0f-1a2b-3c4d5e6f7a8b", compose: "Kit d'entretien 3" },
              { id: "f4a5b6c7-d8e9-0f1a-2b3c-4d5e6f7a8b9c", compose: "Manuel 3" }
            ]
          }
        ],
        detailPaiementOfThisCategorie: [
          {
            id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a",
            category: "500",
            week: "sem 1",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
          
            datePaiement: new Date(Date.now() - 86400000 * 28)
          },
          {
            id: "e6f7a8b9-c0d1-2e3f-4a5b-6c7d8e9f0a1b",
            category: "500",
            week: "sem 2",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
          
            datePaiement: new Date(Date.now() - 86400000 * 21)
          },
          {
            id: "f8a9b0c1-d2e3-4f5a-6b7c-8d9e0f1a2b3c",
            category: "500",
            week: "sem 3",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
          
            datePaiement: new Date(Date.now() - 86400000 * 14)
          },
          {
            id: "a0b1c2d3-e4f5-6a7b-8c9d-0e1f2a3b4c5d",
            category: "500",
            week: "sem 4",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
           
            datePaiement: new Date(Date.now() - 86400000 * 7)
          },
          {
            id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
            category: "500",
            week: "sem 5",
            status: "En retard",
            totalToPayByWeekOfThisCategory: 5000,
           
            datePaiement: new Date(Date.now())
          }
        ]
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 180)
  },
  {
    id: "259a5c27-e632-40e9-8a37-d7d5f37fe517",
    firstName: "Luc",
    lastName: "Adjovi",
    email: "luc.adjovi@example.com",
    contact: "+229954576056",
    role: "membre",
    position: "Secrétaire",
    image: "",
    provence: "Ouémé",
    description: "Profil de Luc Adjovi actif dans la tontine.",
    status: "Terminé",
    montantTotalGlobal: 350000,
    categoriesStatistiques: [
      {
        id: "c5d6e7f8-9a0b-1c2d-3e4f-5a6b7c8d9e0f",
        category: "100",
        listOptions: ["1", "3"],
        status: "En cours",
        totalPaid: 150000,
        weekValided: 9,
        totalPaidByWeek: 5000,
        optionsDescription: [
          {
            id: "e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b",
            category: "100",
            option: "1",
            countOption: 1,
            totalToPayByWeekOfThisOption: 25000,
            components: [
              { id: "f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c", compose: "Appareil 1" },
              { id: "a7b8c9d0-e1f2-3a4b-5c6d-7e8f9a0b1c2d", compose: "Accessoire 1" },
              { id: "b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e", compose: "Garantie 1 an" },
              { id: "c9d0e1f2-a3b4-5c6d-7e8f-9a0b1c2d3e4f5", compose: "Kit d'entretien 1" },
              { id: "d0e1f2a3-b4c5-6d7e-8f9a-0b1c2d3e4f5a6", compose: "Manuel 1" }
            ]
          },
          {
            id: "f7a8b9c0-d1e2-3f4a-5b6c-7d8e9f0a1b2c",
            category: "100",
            option: "3",
            countOption: 1,
            totalToPayByWeekOfThisOption: 25000,
            components: [
              { id: "a8b9c0d1-e2f3-4a5b-6c7d-8e9f0a1b2c3d", compose: "Appareil 3" },
              { id: "b9c0d1e2-f3a4-5b6c-7d8e-9f0a1b2c3d4e", compose: "Accessoire 3" },
              { id: "c0d1e2f3-a4b5-6c7d-8e9f-0a1b2c3d4e5f", compose: "Garantie 3 an" },
              { id: "d1e2f3a4-b5c6-7d8e-9f0a-1b2c3d4e5f6a", compose: "Kit d'entretien 3" },
              { id: "e2f3a4b5-c6d7-8e9f-0a1b-2c3d4e5f6a7b", compose: "Manuel 3" }
            ]
          }

        ],
        detailPaiementOfThisCategorie: [
          {
            id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a",
            category: "100",
            week: "sem 1",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
            
            datePaiement: new Date(Date.now() - 86400000 * 28)
          },
          {
            id: "e6f7a8b9-c0d1-2e3f-4a5b-6c7d8e9f0a1b",
            category: "100",
            week: "sem 2",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
           
            datePaiement: new Date(Date.now() - 86400000 * 21)
          },
          {
            id: "f8a9b0c1-d2e3-4f5a-6b7c-8d9e0f1a2b3c",
            category: "100",
            week: "sem 3",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
           
            datePaiement: new Date(Date.now() - 86400000 * 14)
          },
          {
            id: "a0b1c2d3-e4f5-6a7b-8c9d-0e1f2a3b4c5d",
            category: "100",
            week: "sem 4",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
           
            datePaiement: new Date(Date.now() - 86400000 * 7)
          },
          {
            id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
            category: "100",
            week: "sem 5",
            status: "En retard",
            totalToPayByWeekOfThisCategory: 5000,
           
            datePaiement: new Date(Date.now())
          }
        ]
      },
      {
        id: "c5d6e7f8-9a0b-1c2d-3e4f-5a6b7c8d9e0f",
        category: "200",
        listOptions: ["1", "2"],
        status: "En cours",
        totalPaid: 150000,
        weekValided: 9,
        totalPaidByWeek: 5000,
        optionsDescription: [
          {
            id: "e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b",
            category: "200",
            option: "1",
            countOption: 2,
            totalToPayByWeekOfThisOption: 25000,
            components: [
              { id: "f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c", compose: "Appareil 1" },
              { id: "a7b8c9d0-e1f2-3a4b-5c6d-7e8f9a0b1c2d", compose: "Accessoire 1" },
              { id: "b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e", compose: "Garantie 1 an" },
              { id: "c9d0e1f2-a3b4-5c6d-7e8f-9a0b1c2d3e4f5", compose: "Kit d'entretien 1" },
              { id: "d0e1f2a3-b4c5-6d7e-8f9a-0b1c2d3e4f5a6", compose: "Manuel 1" }
            ]
          },
          {
            id: "f7a8b9c0-d1e2-3f4a-5b6c-7d8e9f0a1b2c",
            category: "200",
            option: "2",
            countOption: 1,
            totalToPayByWeekOfThisOption: 25000,
            components: [
              { id: "a8b9c0d1-e2f3-4a5b-6c7d-8e9f0a1b2c3d", compose: "Appareil 2" },
              { id: "b9c0d1e2-f3a4-5b6c-7d8e-9f0a1b2c3d4e", compose: "Accessoire 2" },
              { id: "c0d1e2f3-a4b5-6c7d-8e9f-0a1b2c3d4e5f", compose: "Garantie 2 an" },
              { id: "d1e2f3a4-b5c6-7d8e-9f0a-1b2c3d4e5f6a", compose: "Kit d'entretien 2" },
              { id: "e2f3a4b5-c6d7-8e9f-0a1b-2c3d4e5f6a7b", compose: "Manuel 2" }
            ]
          }

        ],
        detailPaiementOfThisCategorie: [
          {
            id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a",
            category: "200",
            week: "sem 1",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
           
            datePaiement: new Date(Date.now() - 86400000 * 28)
          },
          {
            id: "e6f7a8b9-c0d1-2e3f-4a5b-6c7d8e9f0a1b",
            category: "200",
            week: "sem 2",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
           
            datePaiement: new Date(Date.now() - 86400000 * 21)
          },
          {
            id: "f8a9b0c1-d2e3-4f5a-6b7c-8d9e0f1a2b3c",
            category: "200",
            week: "sem 3",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
           
            datePaiement: new Date(Date.now() - 86400000 * 14)
          },
          {
            id: "a0b1c2d3-e4f5-6a7b-8c9d-0e1f2a3b4c5d",
            category: "200",
            week: "sem 4",
            status: "Payé",
            totalToPayByWeekOfThisCategory: 5000,
           
            datePaiement: new Date(Date.now() - 86400000 * 7)
          },
          {
            id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
            category: "200",
            week: "sem 5",
            status: "En cours",
            totalToPayByWeekOfThisCategory: 5000,
           
            datePaiement: new Date(Date.now())
          }
        ]
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 180)
  },

]

