export interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: number;
}


export interface ProductCatalogue {
  id: string,
  categorie: string,
  option: number,
  price: number,
  totalweek: number
  composant: ComposantCatalogue[]
}

export interface ComposantCatalogue {
  id: string,
  product: string,
  quantity: number,
  image?: File | string


}

export type Role = 'Administrateur' | 'Sécrétaire' | 'developpeur' | 'Trésorière' | string;

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contact?: string;
  role: Role;
  position?: string;
  image?: File | string
}

export interface Campagne {
  id: string;
  nom?: string;
  status?: string;
  dureeSelectionJours?: number;
  dureeTontineSemaines?: number;
  selectionStart?: Date;
  selectionEnd?: Date;
  tontineStart?: Date;
  tontineEnd?: Date;
  createdAt?: Date;
}


export interface OptionComponent {
  id: string,
  compose: string;
}

export interface TontineOption {
  id: string;
  category: string;
  option: string;
  countOption: string;
  totalToPayByWeekOfThisOption: number;
  components: OptionComponent[];
}

export interface Categories {
  id: string;
  category: string;
  week?: string;
  status?: string | "payé" | "retard" | "En cours" | "en attente";
  totalToPayByWeekOfThisCategory: number;
  optionsDescription?: TontineOption[];
  DatePaiement?: Date;
}

{/* here we calculate amount  associate by each category */ }
export interface CategoriesStatisquesPayement {
  id: string;
  category: string; // 100fcfa
  listOptions?:string[];
  status?: string | "En cours" | "terminé";
  totalPaid?: number;// total semaines * montant herbdomadaire
  weekValided?: number;// 03/15
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contact?: string;
  role?: string;
  position?: string;
  image?: File | string;
  provence?: string;
  description?: string;
  status?: string | "En cours" | "terminé";
  montantTotalGlobal?: number;
  statisticsByCategory?: CategoriesStatisquesPayement[];
  choix?: Categories[];
  createdAt: Date;
}

export interface DataBaseUsersTabs  {
    firstName?: string;
    lastName?: string;
    contact?: string | undefined;
    email?: string;
    provence?:string;
    id?: string;
    category?: string;
    listOptions?: string[];
    status?: string | "En cours" | "terminé";
    totalPaid?: number;
    weekValided?: number;
    dateEntree: string;
}


export const Datas: UserProfile[] = [
  {
    id: "3171df88-28a7-4695-a9f7-08a2a9e44394",
    firstName: "Awa",
    lastName: "Diop",
    email: "awa.diop@example.com",
    contact: "+229910893092",
    role: "membre",
    position: "Président",
    image: "",
    provence: "Alibori",
    description: "Profil de Awa Diop actif dans la tontine.",
    status: "terminé",
    montantTotalGlobal: 118459,
    statisticsByCategory: [
      {
        id: "9666b989-b26b-439e-b79e-9024f6945505",
        category: "200",
        totalPaid: 19045,
        listOptions:["1","3"],
        status:"En cours",
        weekValided: 9
      },
      {
        id: "25469f48-271a-4235-8bff-43a11dd55367",
        category: "100",
        totalPaid: 14005,
        listOptions:["1","3"],
        status:"En cours",
        weekValided: 9
      }
    ],
    choix: [
      {
        id: "165fb5b8-de98-4a0f-a802-d0ab83f8a85f",
        category: "200",
        week: "sem 6",
        status: "en attente",
        totalToPayByWeekOfThisCategory: 12213,
        optionsDescription: [
          {
            id: "172498b3-136a-4978-b081-4c825e69e87a",
            category: "300",
            option: "6",
            countOption: "1",
            totalToPayByWeekOfThisOption: 10241,
            components: [
              {
                id: "fdb37cb3-d058-43ac-9bb7-161737cf4e32",
                compose: "2 glacières"
              },
              {
                id: "54d5979a-51ce-48b9-8ee2-01862f1954e8",
                compose: "1 montre man"
              },
              {
                id: "7307da91-0d4f-4ff7-bd7d-a01a498fbd07",
                compose: "1 canette"
              },
              {
                id: "7f79e2e5-0925-4b3e-a385-764938baa8e4",
                compose: "02 sacs de riz"
              },
              {
                id: "36dfdabc-4bd1-4df0-9bf9-2be298266b45",
                compose: "6 plats"
              },
              {
                id: "17e5d2f1-7213-4591-a772-765ec41a8d94",
                compose: "pagne (6m)"
              }
            ]
          },
          {
            id: "172498b3-136a-4978-b081-4c825e69e87a",
            category: "300",
            option: "3",
            countOption: "2",
            totalToPayByWeekOfThisOption: 10241,
            components: [
              {
                id: "fdb37cb3-d058-43ac-9bb7-161737cf4e32",
                compose: "2 glacières"
              },
              {
                id: "54d5979a-51ce-48b9-8ee2-01862f1954e8",
                compose: "1 montre man"
              },
              {
                id: "7307da91-0d4f-4ff7-bd7d-a01a498fbd07",
                compose: "1 canette"
              },
              {
                id: "7f79e2e5-0925-4b3e-a385-764938baa8e4",
                compose: "02 sacs de riz"
              },
              {
                id: "36dfdabc-4bd1-4df0-9bf9-2be298266b45",
                compose: "6 plats"
              },
              {
                id: "17e5d2f1-7213-4591-a772-765ec41a8d94",
                compose: "pagne (6m)"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      },
      {
        id: "3317ad57-ee17-4aa1-a3fa-ed56a144adcf",
        category: "100",
        week: "sem 10",
        status: "En cours",
        totalToPayByWeekOfThisCategory: 13859,
        optionsDescription: [
          {
            id: "91ddb48c-70b6-49c2-93f1-c1a3f33c3a5b",
            category: "500",
            option: "2",
            countOption: "3",
            totalToPayByWeekOfThisOption: 10681,
            components: [
              {
                id: "08b77a7e-581c-4144-b47c-7446d77e0d63",
                compose: "pagne (6m)"
              },
              {
                id: "614bedd1-ebdb-43fa-b8b8-f7059374d6ae",
                compose: "1 canette"
              },
              {
                id: "527f1422-03c4-46e6-9941-8de510f00c17",
                compose: "1 montre man"
              },
              {
                id: "4c7ae133-5ad3-4afe-bc38-04b5e9b39874",
                compose: "02 sacs de riz"
              },
              {
                id: "1d159a39-5df9-400e-becb-ab0d4d97425a",
                compose: "6 plats"
              },
              {
                id: "51955050-38be-4d6b-b09c-553dc6a19181",
                compose: "2 glacières"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      }
    ],
    createdAt: new Date(Date.now())
  },
  {
    id: "eb2eb8c0-bad4-492a-8e1f-7b1d76672b40",
    firstName: "Yao",
    lastName: "Zinsou",
    email: "yao.zinsou@example.com",
    contact: "+229964547630",
    role: "admin",
    position: "Président",
    image: "",
    provence: "Zou",
    description: "Profil de Yao Zinsou actif dans la tontine.",
    status: "terminé",
    montantTotalGlobal: 120261,
    statisticsByCategory: [
      {
        id: "d5d35735-1300-41a4-896f-5e061ae89ea9",
        category: "100",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 12286,
        weekValided: 1
      },
      {
        id: "777d7516-4b1c-4fec-8ff9-aeef31f2845c",
        category: "500",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 16249,
        weekValided: 4
      }
    ],
    choix: [
      {
        id: "13d3a385-370f-410b-89d4-3412d3455592",
        category: "100",
        week: "sem 4",
        status: "en attente",
        totalToPayByWeekOfThisCategory: 7452,
        optionsDescription: [
          {
            id: "94eec9cb-c7e4-4165-83d1-5b7cd94c8361",
            category: "100",
            option: "2",
            countOption: "2",
            totalToPayByWeekOfThisOption: 6182,
            components: [
              {
                id: "759c2991-1547-451e-9350-3eb689ce11f1",
                compose: "1 canette"
              },
              {
                id: "4f5b22d9-ec49-4757-ae5d-9e0aa77e890a",
                compose: "1 montre man"
              },
              {
                id: "f59be3ee-c582-45ee-b07a-5b4aa4b9d7a8",
                compose: "2 glacières"
              },
              {
                id: "a679f98d-d7d5-4803-96d2-62541bddf576",
                compose: "02 sacs de riz"
              },
              {
                id: "c3aba26f-c59a-4cf1-ac02-18505c0646f9",
                compose: "pagne (6m)"
              },
              {
                id: "54d7942c-7a3f-40d4-ba58-139a944f2954",
                compose: "6 plats"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      },
      {
        id: "2acf494e-a06d-4e88-b8e3-e14f43d79538",
        category: "500",
        week: "sem 5",
        status: "en attente",
        totalToPayByWeekOfThisCategory: 14954,
        optionsDescription: [
          {
            id: "850f25b0-913b-4d67-affc-42de48c964fc",
            category: "500",
            option: "4",
            countOption: "3",
            totalToPayByWeekOfThisOption: 11914,
            components: [
              {
                id: "7934bb61-05e2-4a13-99bc-45f6dc3357e5",
                compose: "pagne (6m)"
              },
              {
                id: "bcd5908a-ff26-4a66-90c2-c175902385a0",
                compose: "2 glacières"
              },
              {
                id: "42380c01-4856-4042-8f29-8f038f6d199c",
                compose: "02 sacs de riz"
              },
              {
                id: "b209d7cc-435e-4c7a-b981-5a56bdd429d3",
                compose: "1 canette"
              },
              {
                id: "9f0cff7f-80a9-4781-97e4-c54cf559555e",
                compose: "1 montre man"
              },
              {
                id: "28e718cc-6505-4d5f-9eb1-7d92a66dde14",
                compose: "6 plats"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      }
    ],
    createdAt: new Date(Date.now())
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
    montantTotalGlobal: 183974,
    statisticsByCategory: [
      {
        id: "5be85e18-8d39-4e18-a847-c4bd62f558a1",
        category: "300",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 20826,
        weekValided: 8
      },
      {
        id: "b1562dbc-6cf1-4b5d-9eca-37886523b78d",
        category: "500",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 23938,
        weekValided: 2
      }
    ],
    choix: [
      {
        id: "a914652d-c631-4ee8-828c-ab074cf12342",
        category: "100",
        week: "sem 1",
        status: "En cours",
        totalToPayByWeekOfThisCategory: 8589,
        optionsDescription: [
          {
            id: "dffb9021-4e09-4d11-a5fc-a0b3a59e1bcc",
            category: "100",
            option: "6",
            countOption: "3",
            totalToPayByWeekOfThisOption: 4473,
            components: [
              {
                id: "11ea6286-5e08-42fc-b065-9cc7f1447966",
                compose: "pagne (6m)"
              },
              {
                id: "b296d211-3f76-4ba4-b9f8-f5160f321ea5",
                compose: "1 canette"
              },
              {
                id: "695e12bb-6a92-412d-a8e3-be966b6c130c",
                compose: "02 sacs de riz"
              },
              {
                id: "901b15af-a27b-455e-8f07-895c602f5eef",
                compose: "2 glacières"
              },
              {
                id: "8128f246-9dbf-4cdb-8acc-7010e980f339",
                compose: "1 montre man"
              },
              {
                id: "a086d566-5df2-4d43-9dd9-275e0306b9d7",
                compose: "6 plats"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      },
      {
        id: "be8a528e-d170-4e91-bf9b-f765c2576539",
        category: "100",
        week: "sem 1",
        status: "En cours",
        totalToPayByWeekOfThisCategory: 19327,
        optionsDescription: [
          {
            id: "272e85fd-d40d-4c08-9d04-8e6626ca2da8",
            category: "100",
            option: "1",
            countOption: "2",
            totalToPayByWeekOfThisOption: 3249,
            components: [
              {
                id: "36af45e6-f0d6-4873-8610-c6b788a7d398",
                compose: "2 glacières"
              },
              {
                id: "d84c86ca-a96d-41c9-aec4-3a47429b37d3",
                compose: "02 sacs de riz"
              },
              {
                id: "458da1ff-b9d0-46b1-a62f-4ad12d56e42e",
                compose: "1 canette"
              },
              {
                id: "0df70764-02da-49fb-9492-a6ec842e7535",
                compose: "pagne (6m)"
              },
              {
                id: "451a1164-52e6-43d3-8116-f512d35abec1",
                compose: "6 plats"
              },
              {
                id: "1d8973e4-df11-49dd-bf8f-8db57c20fc42",
                compose: "1 montre man"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      }
    ],
    createdAt: new Date(Date.now())
  },
  {
    id: "911e582c-9645-4784-bd25-c3d5ca290e9d",
    firstName: "Fatou",
    lastName: "Bello",
    email: "fatou.bello@example.com",
    contact: "+229985299301",
    role: "membre",
    position: "Trésorier",
    image: "",
    provence: "Plateau",
    description: "Profil de Fatou Bello actif dans la tontine.",
    status: "terminé",
    montantTotalGlobal: 294906,
    statisticsByCategory: [
      {
        id: "98d19c60-9319-409d-8539-3aa65b5416ef",
        category: "300",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 17492,
        weekValided: 4
      },
      {
        id: "9467b215-22b6-406e-9d49-2052a72ba070",
        category: "100",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 16332,
        weekValided: 6
      }
    ],
    choix: [
      {
        id: "48173228-6f69-4a09-b47e-c5f3e76a6163",
        category: "500",
        week: "sem 4",
        status: "en attente",
        totalToPayByWeekOfThisCategory: 17266,
        optionsDescription: [
          {
            id: "43358414-c8c4-4c20-8735-5ace62f93b36",
            category: "500",
            option: "2",
            countOption: "1",
            totalToPayByWeekOfThisOption: 13543,
            components: [
              {
                id: "3837b75d-0d93-4995-9c11-bb013c6b7edc",
                compose: "pagne (6m)"
              },
              {
                id: "a97560b0-b174-491f-994c-0e5a84405a73",
                compose: "02 sacs de riz"
              },
              {
                id: "2c44679f-7845-47c4-a1bd-0ea2eb1def56",
                compose: "1 montre man"
              },
              {
                id: "d77bf0ff-bfb7-4e3f-8f9f-35a8923bf98c",
                compose: "1 canette"
              },
              {
                id: "a1e7e65f-fb36-4f18-93a7-9cfd6dfbf0a9",
                compose: "6 plats"
              },
              {
                id: "5566490a-12a7-4f80-9682-4975e8280975",
                compose: "2 glacières"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      },
      {
        id: "277feb51-e167-48b4-a857-c78b6cb78d3f",
        category: "300",
        week: "sem 7",
        status: "En cours",
        totalToPayByWeekOfThisCategory: 13107,
        optionsDescription: [
          {
            id: "6ca3034a-259e-4c4e-b0e2-db6f354be1d1",
            category: "300",
            option: "5",
            countOption: "1",
            totalToPayByWeekOfThisOption: 14557,
            components: [
              {
                id: "ac20a96a-6800-46fb-8c63-fef849150915",
                compose: "1 montre man"
              },
              {
                id: "777a5b1b-8ed3-497b-9736-1fc94c47a148",
                compose: "6 plats"
              },
              {
                id: "683f0646-8109-4947-b1f6-12308c64fda0",
                compose: "pagne (6m)"
              },
              {
                id: "86707638-ddbe-4515-bc18-d259e7c8bbed",
                compose: "1 canette"
              },
              {
                id: "8021cca5-ce20-4475-acd0-e31aa06ecbb4",
                compose: "02 sacs de riz"
              },
              {
                id: "a4f23ab9-9e55-4da2-8b55-d2a978bde691",
                compose: "2 glacières"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      }
    ],
    createdAt: new Date(Date.now())
  },
  {
    id: "291ec3f5-8469-41f6-87af-8362c66b65ee",
    firstName: "Mariam",
    lastName: "Diallo",
    email: "mariam.diallo@example.com",
    contact: "+229914864281",
    role: "admin",
    position: "Président",
    image: "",
    provence: "Atlantique",
    description: "Profil de Mariam Diallo actif dans la tontine.",
    status: "En cours",
    montantTotalGlobal: 133127,
    statisticsByCategory: [
      {
        id: "8f42d846-5cfa-40ad-aa0d-fb26dd36409c",
        category: "300",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 23296,
        weekValided: 7
      },
      {
        id: "30f7f672-8d74-4ca0-88fa-82f05bd5c5d5",
        category: "200",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 11584,
        weekValided: 8
      }
    ],
    choix: [
      {
        id: "ae31a464-bae4-49b5-8de5-412aeb85029a",
        category: "200",
        week: "sem 9",
        status: "en attente",
        totalToPayByWeekOfThisCategory: 18835,
        optionsDescription: [
          {
            id: "e308013b-ab8a-4d33-9f55-356f717713d1",
            category: "200",
            option: "2",
            countOption: "2",
            totalToPayByWeekOfThisOption: 3671,
            components: [
              {
                id: "9faee03b-04f4-41f7-b6f5-17baba67a403",
                compose: "1 montre man"
              },
              {
                id: "b39a8457-1cb3-43d1-85e6-2e61d88fa74d",
                compose: "pagne (6m)"
              },
              {
                id: "4e75b43e-e373-4076-985f-77b782be2148",
                compose: "2 glacières"
              },
              {
                id: "16f0f38f-d098-452e-90cc-262d1d816daf",
                compose: "6 plats"
              },
              {
                id: "4c25d1ed-69e9-4c32-b2e3-fda927c84ba7",
                compose: "02 sacs de riz"
              },
              {
                id: "a39f859b-e0b8-4e93-a926-4c32b101d63b",
                compose: "1 canette"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      },
      {
        id: "fb47becb-62d5-459b-b29f-3c54926f388b",
        category: "300",
        week: "sem 4",
        status: "en attente",
        totalToPayByWeekOfThisCategory: 17572,
        optionsDescription: [
          {
            id: "5e40a767-e355-4e73-ab83-131735161619",
            category: "300",
            option: "4",
            countOption: "3",
            totalToPayByWeekOfThisOption: 12269,
            components: [
              {
                id: "c06eece6-d8fe-4358-a7d4-0ebf70e48013",
                compose: "1 canette"
              },
              {
                id: "a8d45f5c-830c-4706-9307-1c4009225fda",
                compose: "2 glacières"
              },
              {
                id: "6769907a-fcdd-4c6a-ab3e-725d612b71ba",
                compose: "6 plats"
              },
              {
                id: "defde1f9-6c64-485a-bcb7-45bcfb7e5d15",
                compose: "02 sacs de riz"
              },
              {
                id: "11a0c2f4-0725-46e6-8031-8d2ce49728ca",
                compose: "pagne (6m)"
              },
              {
                id: "28243cfb-04df-4ce1-b1a1-b53613b057bf",
                compose: "1 montre man"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      }
    ],
    createdAt: new Date(Date.now())
  },
  {
    id: "4b80751e-e74e-4548-8a6a-e8500434b82e",
    firstName: "Ibrahim",
    lastName: "Ouattara",
    email: "ibrahim.ouattara@example.com",
    contact: "+229944008973",
    role: "admin",
    position: "Trésorier",
    image: "",
    provence: "Alibori",
    description: "Profil de Ibrahim Ouattara actif dans la tontine.",
    status: "En cours",
    montantTotalGlobal: 134946,
    statisticsByCategory: [
      {
        id: "f339f892-464f-4a34-8f2e-2ffe586cc12c",
        category: "100",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 23536,
        weekValided: 1
      },
      {
        id: "e7611d25-afc3-4fa0-8690-0ec39b898275",
        category: "500",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 11604,
        weekValided: 9
      }
    ],
    choix: [
      {
        id: "0d957812-1667-4c30-8527-9144aeb27969",
        category: "500",
        week: "sem 4",
        status: "payé",
        totalToPayByWeekOfThisCategory: 18649,
        optionsDescription: [
          {
            id: "65bd81b0-8dd9-49a2-b69d-1f902617ec3e",
            category: "500",
            option: "1",
            countOption: "1",
            totalToPayByWeekOfThisOption: 15122,
            components: [
              {
                id: "e6d27a29-1f6b-4c65-a3fc-ceab17d78901",
                compose: "1 montre man"
              },
              {
                id: "f9959023-620c-4520-84ae-c75b279e4d6d",
                compose: "6 plats"
              },
              {
                id: "b3baf9c9-f080-421d-bb3f-47cd62ece242",
                compose: "2 glacières"
              },
              {
                id: "2fc2e7b0-9528-406a-893b-2d927cea75e8",
                compose: "02 sacs de riz"
              },
              {
                id: "eebfa1ed-afed-42db-b373-451070abc1cc",
                compose: "1 canette"
              },
              {
                id: "a07ae565-0fe0-468e-a14e-e7acdb506be6",
                compose: "pagne (6m)"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      },
      {
        id: "c8961c62-2426-4ed6-b38b-df43e4622721",
        category: "300",
        week: "sem 10",
        status: "En cours",
        totalToPayByWeekOfThisCategory: 13572,
        optionsDescription: [
          {
            id: "591e923b-8233-46b1-9800-a65ad33efb48",
            category: "300",
            option: "3",
            countOption: "2",
            totalToPayByWeekOfThisOption: 6437,
            components: [
              {
                id: "c4f8701d-cf9f-4f9c-9960-f2ac8f4a1cbf",
                compose: "02 sacs de riz"
              },
              {
                id: "7e457dfe-c210-4803-9772-a66c2b502318",
                compose: "6 plats"
              },
              {
                id: "3af167c8-4ad0-4840-8340-be9bb9717f93",
                compose: "pagne (6m)"
              },
              {
                id: "2659720b-024d-4b74-9c7d-04734bf7fc9c",
                compose: "1 montre man"
              },
              {
                id: "aaeafcdd-448e-43db-beaf-521165108d25",
                compose: "2 glacières"
              },
              {
                id: "6fb9371f-08c5-49b4-a164-c36a4e5b2309",
                compose: "1 canette"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      }
    ],
    createdAt: new Date(Date.now())
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
    status: "terminé",
    montantTotalGlobal: 232138,
    statisticsByCategory: [
      {
        id: "7cee32e5-f9c5-4ede-a197-d4d102887441",
        category: "200",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 13137,
        weekValided: 10
      },
      {
        id: "6a92d3b1-51dc-4a39-b890-af89bcc9c0f4",
        category: "500",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 19144,
        weekValided: 1
      }
    ],
    choix: [
      {
        id: "bd2ab354-30bf-4bfd-9b6f-595124cfba2f",
        category: "100",
        week: "sem 5",
        status: "en attente",
        totalToPayByWeekOfThisCategory: 12966,
        optionsDescription: [
          {
            id: "f1415a9f-04e7-4641-b2aa-cfef9a8d39b7",
            category: "100",
            option: "3",
            countOption: "3",
            totalToPayByWeekOfThisOption: 14749,
            components: [
              {
                id: "1d724d9a-9009-425e-9315-732cd94fb0da",
                compose: "1 montre man"
              },
              {
                id: "00d4b4f8-ec88-4a14-9a0e-bb9df0938fbd",
                compose: "pagne (6m)"
              },
              {
                id: "4fb5502b-0b4c-4a88-a259-f322526f2e95",
                compose: "2 glacières"
              },
              {
                id: "b0c89dec-da76-4157-8794-42fb5206c49e",
                compose: "1 canette"
              },
              {
                id: "27e9829b-658f-4a1d-9379-fea1a34b7275",
                compose: "02 sacs de riz"
              },
              {
                id: "b9c5bfad-2370-489b-8fd3-d77e5d404a43",
                compose: "6 plats"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      },
      {
        id: "b16bb5a2-e015-4908-b8aa-4c2587ec1715",
        category: "100",
        week: "sem 5",
        status: "payé",
        totalToPayByWeekOfThisCategory: 16501,
        optionsDescription: [
          {
            id: "70b4da16-c85b-4cce-8519-9a10d211a1fd",
            category: "100",
            option: "3",
            countOption: "1",
            totalToPayByWeekOfThisOption: 6073,
            components: [
              {
                id: "0fa157d9-bfd3-49c7-9d28-e862d138b168",
                compose: "1 canette"
              },
              {
                id: "ee579b1e-ec0b-451f-9c64-b3f5c7a5811e",
                compose: "6 plats"
              },
              {
                id: "821fe63d-147d-4578-92d6-e0f49d49875f",
                compose: "2 glacières"
              },
              {
                id: "c57c0fc8-09cd-465e-8c26-bd31dca80aee",
                compose: "02 sacs de riz"
              },
              {
                id: "eddde585-48eb-4563-8693-358919954951",
                compose: "pagne (6m)"
              },
              {
                id: "ff73e876-b6b7-4672-83c7-3916faa0701c",
                compose: "1 montre man"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      }
    ],
    createdAt: new Date(Date.now())
  },
  {
    id: "bb37b7b1-1bd2-4957-b558-f158a1edc82e",
    firstName: "Cynthia",
    lastName: "Gbèdo",
    email: "cynthia.gbèdo@example.com",
    contact: "+229964048466",
    role: "gestionnaire",
    position: "Secrétaire",
    image: "",
    provence: "Borgou",
    description: "Profil de Cynthia Gbèdo actif dans la tontine.",
    status: "terminé",
    montantTotalGlobal: 262665,
    statisticsByCategory: [
      {
        id: "878e7809-5086-45c0-adbb-9d92e11f254e",
        category: "500",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 18597,
        weekValided: 4
      },
      {
        id: "37efc5d0-8c7e-49ee-8d3b-7da36f82826d",
        category: "100",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 14710,
        weekValided: 3
      }
    ],
    choix: [
      {
        id: "df8faaa1-eec6-41a8-9eab-a7adabf72918",
        category: "500",
        week: "sem 10",
        status: "payé",
        totalToPayByWeekOfThisCategory: 19287,
        optionsDescription: [
          {
            id: "7a212f8e-73d2-4ebd-b48e-c5b61cad5271",
            category: "500",
            option: "2",
            countOption: "3",
            totalToPayByWeekOfThisOption: 15390,
            components: [
              {
                id: "7fa942d2-bd06-48ee-8253-d05e8334a5e8",
                compose: "2 glacières"
              },
              {
                id: "6dc63e98-285f-40c3-8618-64f15f494853",
                compose: "pagne (6m)"
              },
              {
                id: "9c0b1401-a4a8-4014-915c-d32381bccd10",
                compose: "1 montre man"
              },
              {
                id: "d29649d3-538a-4dd7-a527-d458824116ff",
                compose: "6 plats"
              },
              {
                id: "6d35b87f-0b6a-4245-8cbe-7a61b3d9c0c4",
                compose: "1 canette"
              },
              {
                id: "2f3fd395-6f1b-4bf2-a533-fbb19c9cd72c",
                compose: "02 sacs de riz"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      },
      {
        id: "aa866624-2676-422a-a4d8-82a76019a6e0",
        category: "300",
        week: "sem 9",
        status: "En cours",
        totalToPayByWeekOfThisCategory: 14924,
        optionsDescription: [
          {
            id: "4c189877-d63f-4acc-b3b6-6553fbeba06d",
            category: "300",
            option: "4",
            countOption: "1",
            totalToPayByWeekOfThisOption: 13642,
            components: [
              {
                id: "09993cd4-09f8-4e19-8d3d-a1c4fd2455a7",
                compose: "02 sacs de riz"
              },
              {
                id: "a897c33a-e753-45af-8c9c-04e76ae57035",
                compose: "6 plats"
              },
              {
                id: "69f77138-5a93-4c86-b7b9-99ccfad7d4b6",
                compose: "1 canette"
              },
              {
                id: "8e38bdd4-b516-49cc-922e-51d04c1b93e9",
                compose: "pagne (6m)"
              },
              {
                id: "4fe93863-3480-43ae-bdd4-bf23581a4e80",
                compose: "1 montre man"
              },
              {
                id: "21bae789-eeb0-4cd1-ab14-bbed1f1b80d2",
                compose: "2 glacières"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      }
    ],
    createdAt: new Date(Date.now())
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
    montantTotalGlobal: 280058,
    statisticsByCategory: [
      {
        id: "fcfefa4f-1251-4f93-8c37-9282bc45e93c",
        category: "300",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 21448,
        weekValided: 3
      },
      {
        id: "f2d92a3b-70af-4988-a330-bf8496afd1c4",
        category: "500",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 23182,
        weekValided: 8
      }
    ],
    choix: [
      {
        id: "0cbf3044-dcbd-4af6-b17a-bafe849da82b",
        category: "300",
        week: "sem 8",
        status: "En cours",
        totalToPayByWeekOfThisCategory: 17165,
        optionsDescription: [
          {
            id: "356c08c2-36ef-47fa-86d3-d5f4e3f6c5d8",
            category: "300",
            option: "4",
            countOption: "2",
            totalToPayByWeekOfThisOption: 14993,
            components: [
              {
                id: "ad4994c5-d7bc-40bf-9460-e2f9a557e648",
                compose: "6 plats"
              },
              {
                id: "55f08a4c-2c76-4b0b-b9e8-e2c8ef021b0c",
                compose: "02 sacs de riz"
              },
              {
                id: "75143a1f-edf9-4a07-ab39-317c13abe613",
                compose: "pagne (6m)"
              },
              {
                id: "e037402f-b568-43a9-9bf1-69764df0dcd6",
                compose: "1 montre man"
              },
              {
                id: "b595f62d-1c3c-47ff-8373-98f14b6effbe",
                compose: "2 glacières"
              },
              {
                id: "fb64e597-1af0-4323-9801-c80ee53c19aa",
                compose: "1 canette"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      },
      {
        id: "c1488dcf-8d8c-4f7c-abab-a226929c44cc",
        category: "100",
        week: "sem 3",
        status: "payé",
        totalToPayByWeekOfThisCategory: 20618,
        optionsDescription: [
          {
            id: "92403f6d-91dd-4e19-b6c6-04503f47930c",
            category: "100",
            option: "6",
            countOption: "2",
            totalToPayByWeekOfThisOption: 9145,
            components: [
              {
                id: "5f420abd-235f-4ef0-8153-7259e509f422",
                compose: "6 plats"
              },
              {
                id: "f02f19ca-a69c-4bae-9422-b17e34f82452",
                compose: "2 glacières"
              },
              {
                id: "f45ddbb8-0abb-40ef-ac7c-5cd60c753092",
                compose: "1 canette"
              },
              {
                id: "6a64dd75-84e4-459c-8d04-65b1787d5c8e",
                compose: "02 sacs de riz"
              },
              {
                id: "b337b91d-3557-44ec-ad7f-3b4ba1946dd4",
                compose: "pagne (6m)"
              },
              {
                id: "eca63cbc-e266-4417-8ca8-2819404d9b01",
                compose: "1 montre man"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      }
    ],
    createdAt: new Date(Date.now())
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
    status: "terminé",
    montantTotalGlobal: 228357,
    statisticsByCategory: [
      {
        id: "5934079d-22a3-4837-b169-d3261643306a",
        category: "100",
        listOptions:["1","3"],
        status:"Terminé",
        totalPaid: 12088,
        weekValided: 10
      },
      {
        id: "f1f2ed85-6d1b-45a2-9cea-67d7a67d333c",
        category: "200",
         listOptions:["1","3"],
        status:"En cours",
        totalPaid: 17484,
        weekValided: 2
      }
    ],
    choix: [
      {
        id: "f93ddc0c-7ae8-46b8-a9a3-a0a2b0442cf6",
        category: "100",
        week: "sem 10",
        status: "En cours",
        totalToPayByWeekOfThisCategory: 7979,
        optionsDescription: [
          {
            id: "7678a4b0-78da-47b3-843b-c3997c9749b5",
            category: "100",
            option: "3",
            countOption: "2",
            totalToPayByWeekOfThisOption: 10604,
            components: [
              {
                id: "bb28ec85-b3d7-4945-8e22-06d6df5af9af",
                compose: "pagne (6m)"
              },
              {
                id: "f0c60b52-03dc-4dd5-a9d3-8cdf34e7be18",
                compose: "1 montre man"
              },
              {
                id: "bb0e84c6-4869-49ee-ab8d-6ee2b94fe063",
                compose: "02 sacs de riz"
              },
              {
                id: "bad0a7e1-e099-48c8-bac1-374331086792",
                compose: "1 canette"
              },
              {
                id: "20ddffa1-9938-499c-be1f-04d49c44dd30",
                compose: "2 glacières"
              },
              {
                id: "f6cb90c4-28e4-48f0-9912-78cd358173dd",
                compose: "6 plats"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      },
      {
        id: "0b11ec38-9589-490b-86e8-07c882994874",
        category: "500",
        week: "sem 7",
        status: "En cours",
        totalToPayByWeekOfThisCategory: 20092,
        optionsDescription: [
          {
            id: "48e5a023-ae00-4873-9d03-fa63d4ac6bdd",
            category: "500",
            option: "6",
            countOption: "3",
            totalToPayByWeekOfThisOption: 8696,
            components: [
              {
                id: "7e92cd33-fed9-40c1-87bb-9fca34479a9e",
                compose: "pagne (6m)"
              },
              {
                id: "65ea3d42-468e-4544-b573-faf3b79ac523",
                compose: "02 sacs de riz"
              },
              {
                id: "4f1d2d0c-8d27-4c1f-8135-9d2e0ff005f1",
                compose: "2 glacières"
              },
              {
                id: "3e5f7ec9-02b5-4acc-8a0c-10b7f0fd1cf9",
                compose: "1 canette"
              },
              {
                id: "feeb8179-7c32-414f-8857-631d7848a365",
                compose: "6 plats"
              },
              {
                id: "311bc94f-aa98-4bf6-9e25-41cf4d42dfec",
                compose: "1 montre man"
              }
            ]
          }
        ],
        DatePaiement: new Date(Date.now())
      }
    ],
    createdAt: new Date(Date.now())
  }
]

