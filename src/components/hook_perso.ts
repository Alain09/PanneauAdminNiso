import { ComposantCatalogue, PaymentHistoryWeekActif, DataBaseUsersTabs, OptionComponent, OptionsCounts, PaymentDataVariation, ProductCatalogue, StatisticCategories, TontineOption, UserProfile, UsersLatePayment } from "@/type";
import React from "react";
import { generateId } from "../lib/utils";

interface Structure {
    setOptions: React.Dispatch<React.SetStateAction<ProductCatalogue>>
}

export default function Usehook({ setOptions }: Structure) {

    // suppression d'un composant 
    const remove = (id: string) => {
        setOptions((prev) => (
            {
                ...prev,
                composant: prev.composant?.filter(item => item.id !== id) || []
            }
        ))
    }

    // generate id 
    const generateId = () => {
        return Math.random().toString() + new Date().toString()
    }

    // add composantProduct
    const addProduct = () => {
        setOptions((prev) => ({
            ...prev,
            composant: [
                ...prev.composant,
                {
                    id: generateId(),
                    product: "",
                    quantity: 1,
                    image: undefined
                }
            ]
        }))
    }

    return {
        generateId,
        remove,
        addProduct
    }
}

// export fonction action 

interface StructureAction {
    enter?: UserProfile[]
}

export function DataAction({ enter }: StructureAction) {

    //fonction courbe d'evolution des paiements  par semaine 
    // reception des données de paiement ( sem, montanttotal)
    const VariationPaid = () => {
        const datas: PaymentDataVariation[] = []

        // recuperation de donnee { sem , montant}[]
        const choiceliste: PaymentDataVariation[] = enter?.flatMap(prev => prev.DescriptionChoixOfEachUser?.flatMap(nexts => nexts.detailPaiementOfThisCategorie?.filter(choi => choi.status === "Payé")
            .map(choi => ({
                weeks: choi.week,
                value: choi.totalToPayByWeekOfThisCategory
            } as PaymentDataVariation))

        )) as PaymentDataVariation[]

        //------------- recuperation des semaines dans lordre
        const weekss = [... new Set(choiceliste.flatMap(prev => prev.weeks))].sort((a, b) => {
            const numA = parseInt(a.replace("sem ", ""), 10);
            const numB = parseInt(b.replace("sem ", ""), 10);
            return numA - numB;
        })
        // boucles ----- pour chaque semaine on fait la somme des montants
        weekss.forEach((sem) => {
            const filteWeek = choiceliste.filter(pro => pro.weeks === sem)
            const taches = {
                weeks: sem,
                value: filteWeek.flatMap(pro => pro.value as number).reduce((acc, val) => acc + val, 0)
            }

            datas.push(taches) // pour la courbe de variation des montant recu chaque semaine
        })

        // recuperation des donnees total pour la semaine  et global
        const TotalWeekActive = datas.at(-1)?.value as number;
        const TotalGobal = datas.flatMap(prev => prev.value).reduce((acc, val) => acc + val, 0)

        return {
            datas,
            TotalWeekActive,
            TotalGobal

        }
    }


    // recuperation des options et categories
    //analyse de contenues des options et catégories pour le diagramme en barre
    const StructurationCategorie = () => {
        const dataReturn: StatisticCategories[] = [];
        const choiceliste = enter?.flatMap(prev => prev.DescriptionChoixOfEachUser?.flatMap(nexts => nexts.optionsDescription)) as TontineOption[]
        const categorieListe = [... new Set(choiceliste.flatMap(prev => prev.category))].sort((a, b) => Number(a) - Number(b))
        categorieListe.forEach(each => {
            // cette fonction listeOpt permet de recuper les option et le nombre d'occurence pour chaque categories donnees
            const listeOpt = () => {
                const servant: OptionsCounts[] = []
                // ici bars recupere tous les options et sa recurence associees
                const bars = choiceliste
                    .filter(prev => prev.category === each)
                    .map(prev => ({
                        countOption: prev.countOption,
                        option: prev.option
                    }))
                // ici uniqueOptions pour prendre les options presente dans un vecteur ordonnee
                const uniqueOptions = [... new Set(bars.flatMap(prev => prev?.option))].sort((a, b) => Number(a) - Number(b)) as string[]
                uniqueOptions.forEach(prev => {
                    const tache = bars.filter(pre => pre?.option === prev)
                    if (tache) {
                        const exo = {
                            option: prev,
                            count: tache.flatMap(pro => pro?.countOption as number).reduce((acc, val) => acc + val, 0)
                        }

                        servant.push(exo)

                    }
                })
                return servant
            }
            const rows = {
                id: generateId(),
                categorie: each,
                listeOptions: listeOpt(),

            }

            dataReturn.push(rows);
        })
        return dataReturn;

    }


    // functions du retour des utilisateurs en retard
    const UsersLate = () => {
        // recuperation de donee { id, firstName, lastName, email, status, amountPaidByWeek, category, weekActif, lastWeekPaid}[]
        const choiceliste: UsersLatePayment[] = enter?.flatMap(prev => prev.DescriptionChoixOfEachUser?.flatMap(nexts => nexts.detailPaiementOfThisCategorie?.filter(choi => choi.status === "En retard")
            .map(choi => ({
                id: prev.id,
                firstName: prev.firstName as string,
                lastName: prev.lastName as string,
                email: prev.email as string,
                status: choi.status as string,
                amountPaidByWeek: choi.totalToPayByWeekOfThisCategory as number,
                category: choi.category as string,
                weekActif: "sem 10" as string,
                lastWeekPaid: choi.week as string
            } as UsersLatePayment))

        )) as UsersLatePayment[]

        // recuperationdes status de 

        return choiceliste;
    }

    // fonction de retour des utilisateurs avec statut de paiement en retart ou payé
    interface weekActif {
        weekActived: string
    }


    const UserPaiementHistory = ({ weekActived }: weekActif) => {
        // recuperation de donee a status paye ou en reatrd { id, firstName, lastName, email, status, amountPaidByWeek, option, category, weekActif}[]
        const listeHistoryPaiement: PaymentHistoryWeekActif[] = enter?.flatMap(prev => prev.DescriptionChoixOfEachUser?.flatMap(nexts => nexts.detailPaiementOfThisCategorie?.filter(ccstatus => (ccstatus.status === "Payé" || ccstatus.status === "En retard") && ccstatus.week === weekActived).map(choi => ({
            id: prev.id,
            firstName: prev.firstName as string,
            lastName: prev.lastName as string,
            email: prev.email as string,
            status: choi.status as string,
            amountPaidByWeek: choi.totalToPayByWeekOfThisCategory as number,
            options: nexts.listOptions as string[],
            category: nexts.category as string,
            weekActif: choi.week as string,

        } as PaymentHistoryWeekActif))

        )) as PaymentHistoryWeekActif[]

        // recuperationdes status de liseHistoryPaiement
        const statusAll = listeHistoryPaiement?.flatMap((user) => user.status) as string[]; // ceci c'est un tableau de tous les status
        const uniqueStatuts = [...new Set(statusAll)];

        // recuperation de la liste des categories
        const categoriesAll = listeHistoryPaiement?.flatMap((user) => user.category) as string[]; //ceci c'est un tableau de toutes les categories
        const uniqueCategoriesHistory = [...new Set(categoriesAll)].sort((a, b) => Number(a) - Number(b));

        return {
            uniqueStatuts,
            listeHistoryPaiement,
            uniqueCategoriesHistory
        }

    }

    // creation d'une fonction pour la structure des doneees des utilisateurs pour la page users
    const UsersStructuration = () => {

        const response = enter?.flatMap((user) => user.DescriptionChoixOfEachUser?.map((item) => ({
            id: user.id,
            category: item.category,
            listOptions: item.listOptions,
            status: item.status,
            firstName: user.firstName,
            lastName: user.lastName,
            contact: user.contact,
            email: user.email,
            provence: user.provence,
            dateEntree: new Date(user.createdAt).toLocaleDateString(),
        }))) as DataBaseUsersTabs[]

        return response;
    }


    // les categories disponibles 
    const CaracterisqueUniques = () => {

        // recuperation de donee { sem , montant}[]
        const choiceliste: PaymentDataVariation[] = enter?.flatMap(prev => prev.DescriptionChoixOfEachUser?.flatMap(nexts => nexts.detailPaiementOfThisCategorie?.filter(choi => choi.status === "En retard")
            .map(choi => ({
                weeks: choi.week,
                value: choi.totalToPayByWeekOfThisCategory
            } as PaymentDataVariation))

        )) as PaymentDataVariation[]

        //------------- recuperation des semaines dans lordre
        const weekss = [... new Set(choiceliste.flatMap(prev => prev.weeks))].sort((a, b) => {
            const numA = parseInt(a.replace("sem ", ""), 10);
            const numB = parseInt(b.replace("sem ", ""), 10);
            return numA - numB;
        })

        // for categories pour recuperer les categories uniques
        const categoriesAll = enter?.flatMap((user) => user.DescriptionChoixOfEachUser?.map((item) => item.category)) as string[]; //ceci c'est un tableau de toutes les categories
        const uniqueCategories = [...new Set(categoriesAll)].sort((a, b) => Number(a) - Number(b));

        // for options pour recuperer les status uniques
        const statusAll = enter?.flatMap((user) => user.DescriptionChoixOfEachUser?.map((item) => item.status)) as string[]; // ceci c'est un tableau de tous les status
        const uniqueStatuts = [...new Set(statusAll)];

        // recuperer tooutes les semenaines 
        const weeksAll = enter?.flatMap((user) => user.DescriptionChoixOfEachUser?.flatMap((item) => item.detailPaiementOfThisCategorie?.map((it) => it.week))) as string[]; // ceci c'est un tableau de tous les status
        const uniqueWeeks = [...new Set(weeksAll)].sort((a, b) => {
            const numA = parseInt(a.replace("sem ", ""), 10);
            const numB = parseInt(b.replace("sem ", ""), 10);
            return numA - numB;
        });

        // graphique en cours et termine
        const valuesEncours = statusAll.filter((status) => status === "En cours").length;
        const valuesTermine = statusAll.filter((status) => status === "Terminé").length;

        //utilisateurs total 
        const UserTotal = enter?.length as number

        // 

        return {
            uniqueCategories,
            uniqueStatuts,
            uniqueWeeks,
            valuesEncours,
            valuesTermine,
            categoriesAll,
            weekss,
            UserTotal
        }

    }



    // 

    return {
        VariationPaid,
        StructurationCategorie,
        UsersLate,
        UsersStructuration,
        CaracterisqueUniques,
        UserPaiementHistory
    }
}


interface Subjet {
    value: number
}
export function ConvertInKilo({ value }: Subjet) {
    if (value >= 1000000) {
        return `${Math.floor(value / 1000000)}M+`;
    } else if (value >= 1000) {
        return `${Math.floor(value / 1000)}K+`;
    }
    return value.toString();
}

export const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

/* */

export function calculerIntervalleSemaine(semaineNum: string, dateDebutTontine: Date): string {
  // Extraire le numéro de semaine
  const match = semaineNum.match(/sem\s*(\d+)/i);
  if (!match) throw new Error("Format de semaine invalide. Utilisez 'sem X' où X est un nombre");
  
  const numeroSemaine = parseInt(match[1], 10);
  if (numeroSemaine <= 0) throw new Error("Le numéro de semaine doit être positif");
  
  // Cloner la date de début pour éviter de modifier l'originale
  const dateDebut = new Date(dateDebutTontine);
  
  // Calculer le début de la semaine (lundi de la semaine demandée)
  // Chaque semaine dure 7 jours
  const joursAjoutes = (numeroSemaine - 1) * 7;
  dateDebut.setDate(dateDebut.getDate() + joursAjoutes);
  
  // Trouver le lundi de cette semaine
  const jourSemaine = dateDebut.getDay(); // 0 (dimanche) à 6 (samedi)
  const decalageLundi = jourSemaine === 0 ? -6 : 1 - jourSemaine; // Ajuster pour que lundi soit le premier jour
  dateDebut.setDate(dateDebut.getDate() + decalageLundi);
  
  // Calculer la fin de la semaine (dimanche)
  const dateFin = new Date(dateDebut);
  dateFin.setDate(dateFin.getDate() + 6);
  
  // Formater les dates en français
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  };
  
  const formatter = new Intl.DateTimeFormat('fr-FR', options);
  const dateDebutFormatee = formatter.format(dateDebut);
  const dateFinFormatee = formatter.format(dateFin);
  
  return `${dateDebutFormatee} au ${dateFinFormatee}`;
}




// Exemple d'utilisation :// const dateDebutTontine = new Date('2025-01-01');
// const    resultat = calculerIntervalleSemaine('sem 2', dateDebutTontine);
export function calculerDatesSemaine(semaineNum: string, dateDebutTontine: Date): { dateDebut: Date; dateFin: Date } {
  // Extraire le numéro de semaine
  const match = semaineNum.match(/sem\s*(\d+)/i);
  if (!match) throw new Error("Format de semaine invalide. Utilisez 'sem X' où X est un nombre");
  
  const numeroSemaine = parseInt(match[1], 10);
  if (numeroSemaine <= 0) throw new Error("Le numéro de semaine doit être positif");
  
  // Cloner la date de début pour éviter de modifier l'originale
  const dateDebut = new Date(dateDebutTontine);
  
  // Calculer le début de la semaine demandée
  // Chaque semaine dure 7 jours (semaine 1 = jours 0-6, semaine 2 = jours 7-13, etc.)
  const joursAjoutes = (numeroSemaine - 1) * 7;
  dateDebut.setDate(dateDebut.getDate() + joursAjoutes);
  
  // Trouver le lundi de cette semaine (début de semaine)
  const jourSemaine = dateDebut.getDay(); // 0 (dimanche) à 6 (samedi)
  
  // Ajuster pour que lundi soit le premier jour de la semaine
  let decalageLundi = 0;
  if (jourSemaine === 0) { // dimanche
    decalageLundi = -6; // reculer de 6 jours pour arriver au lundi précédent
  } else {
    decalageLundi = 1 - jourSemaine; // ajuster pour avoir lundi
  }
  
  const dateDebutSemaine = new Date(dateDebut);
  dateDebutSemaine.setDate(dateDebut.getDate() + decalageLundi);
  
  // Calculer la fin de la semaine (dimanche)
  const dateFinSemaine = new Date(dateDebutSemaine);
  dateFinSemaine.setDate(dateDebutSemaine.getDate() + 6);
  
  // Réinitialiser les heures pour avoir des dates précises
  dateDebutSemaine.setHours(0, 0, 0, 0);
  dateFinSemaine.setHours(23, 59, 59, 999);
  
  return {
    dateDebut: dateDebutSemaine,
    dateFin: dateFinSemaine
  };
}
