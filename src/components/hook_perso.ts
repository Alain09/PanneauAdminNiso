import { PaymentHistoryWeekActif, DataBaseUsersTabs, OptionsCounts, PaymentDataVariation, ProductCatalogue, StatisticCategories, TontineOption, UserProfile, UsersLatePayment } from "@/type";
import React, { useMemo } from "react";
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

    // add composantProduct
    const addProduct = () => {
        setOptions((prev) => ({
            ...prev,
            composant: [
                ...(prev.composant ?? []),
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
    const VariationPaid = (weekActif?: number|null) => {
        if (!enter || enter.length === 0) {
            return {
                datas: [],
                TotalWeekActive: 0,
                TotalGobal: 0,
            };
        }

        // Extraire tous les paiements "Payé"
        const choiceliste: PaymentDataVariation[] = enter.flatMap((prev) =>
            prev.categoriesStatistiques?.flatMap((nexts) =>
                (nexts.detailPaiementOfThisCategorie ?? [])
                    .filter((choi) => choi.status === "Payé")
                    .map(
                        (choi) =>
                        ({
                            weeks: choi.week,
                            value: choi.totalToPayByWeekOfThisCategory,
                        } as PaymentDataVariation)
                    )
            ) ?? []
        );

        // Récupérer les semaines triées
        const weekss = [...new Set(choiceliste.map((p) => p.weeks))].sort(
            (a, b) => a - b
        );

        // Agréger les montants par semaine
        const datas: PaymentDataVariation[] = weekss.map((sem) => {
            const total = choiceliste
                .filter((p) => p.weeks === sem)
                .reduce((acc, val) => acc + (val.value ?? 0), 0);

            return { weeks: sem, value: total };
        });

        return {
            datas,
            TotalWeekActive: weekActif
                ? datas.find((d) => d.weeks === weekActif)?.value ?? 0
                : datas.at(-1)?.value ?? 0,
            TotalGobal: datas.reduce((acc, val) => acc + val.value, 0),
        };
    };

    // recuperation des options et categories
    //analyse de contenues des options et catégories pour le diagramme en barre
    const StructurationCategorie = () => {
        const dataReturn: StatisticCategories[] = [];

        // CORRECTION: Utiliser categoriesStatistiques
        const choiceliste = enter?.flatMap(prev =>
            prev.categoriesStatistiques?.flatMap(nexts => nexts.optionsDescription)
        ) as TontineOption[]

        const categorieListe = [... new Set(choiceliste?.flatMap(prev => prev.category) || [])].sort((a, b) => Number(a) - Number(b))

        categorieListe.forEach(each => {
            // cette fonction listeOpt permet de recuper les option et le nombre d'occurence pour chaque categories donnees
            const listeOpt = () => {
                const servant: OptionsCounts[] = []
                // ici bars recupere tous les options et sa recurence associees
                const bars = choiceliste
                    ?.filter(prev => prev.category === each)
                    .map(prev => ({
                        countOption: prev.countOption,
                        option: prev.option
                    })) || []

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
    interface weekActifCamp {
        weekActived: number | null
    }
    const UsersLate = ({ weekActived }: weekActifCamp) => {
        // CORRECTION: Utiliser categoriesStatistiques
        const choiceliste: UsersLatePayment[] = enter?.flatMap(prev =>
            prev.categoriesStatistiques?.flatMap(nexts =>
                nexts.detailPaiementOfThisCategorie?.filter(choi => choi.status === "En retard")
                    .map(choi => ({
                        id: prev.id,
                        firstName: prev.firstName as string,
                        lastName: prev.lastName as string,
                        email: prev.email as string,
                        status: choi.status as string,
                        amountPaidByWeek: choi.totalToPayByWeekOfThisCategory as number,
                        category: choi.category as string,
                        weekActif: weekActived,
                        lastWeekPaid: choi.week as number
                    } as UsersLatePayment))
            )
        ) as UsersLatePayment[]

        return choiceliste || [];
    }

    // fonction de retour des utilisateurs avec statut de paiement en retart ou payé
    interface weekActif {
        weekActived: number
    }

    const UserPaiementHistory = ({ weekActived }: weekActif) => {
        // CORRECTION: Utiliser categoriesStatistiques
        const listeHistoryPaiement: PaymentHistoryWeekActif[] = enter?.flatMap(prev =>
            prev.categoriesStatistiques?.flatMap(nexts =>
                nexts.detailPaiementOfThisCategorie?.filter(ccstatus =>
                    (ccstatus.status === "Payé" || ccstatus.status === "En retard") &&
                    ccstatus.week === weekActived
                ).map(choi => ({
                    id: prev.id,
                    firstName: prev.firstName as string,
                    lastName: prev.lastName as string,
                    email: prev.email as string,
                    status: choi.status as string,
                    amountPaidByWeek: choi.totalToPayByWeekOfThisCategory as number,
                    options: nexts.listOptions as string[],
                    category: nexts.category as string,
                    weekActif: choi.week as number,
                } as PaymentHistoryWeekActif))
            )
        ) as PaymentHistoryWeekActif[]

        // recuperationdes status de liseHistoryPaiement
        const statusAll = listeHistoryPaiement?.flatMap((user) => user.status) as string[];
        const uniqueStatuts = [...new Set(statusAll)];

        // recuperation de la liste des categories
        const categoriesAll = listeHistoryPaiement?.flatMap((user) => user.category) as string[];
        const uniqueCategoriesHistory = [...new Set(categoriesAll)].sort((a, b) => Number(a) - Number(b));

        return {
            uniqueStatuts,
            listeHistoryPaiement,
            uniqueCategoriesHistory
        }
    }

    // creation d'une fonction pour la structure des doneees des utilisateurs pour la page users /dashboard/users
    const UsersStructuration = () => {
        // CORRECTION: Utiliser categoriesStatistiques et gérer les cas où il n'y en a pas
        const response = useMemo(() => {

            if (enter?.length === 0) return [];

            return enter?.flatMap((user) => {
                // Si pas de categoriesStatistiques, créer une entrée basique
                if (!user.categoriesStatistiques || user.categoriesStatistiques.length === 0) {
                    return [{
                        id: user.id,
                        category: "Non définie",
                        listOptions: [],
                        status: user?.status,
                        position: user?.position,
                        firstName: user?.firstName,
                        lastName: user?.lastName,
                        contact: user?.contact,
                        provence: user?.provence,
                        dateEntree: new Date(user.createdAt ?? new Date()).toLocaleDateString(),
                    }];
                }

                // Sinon utiliser categoriesStatistiques
                return user.categoriesStatistiques.map((item) => ({
                    id: user.id,
                    category: `${item?.category} Fcfa`,
                    listOptions: item.optionsDescription?.map(opt => opt.option) || [],
                    status: user?.status,
                    position: user?.position,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    contact: user?.contact,
                    provence: user?.provence,
                    dateEntree: new Date(user.createdAt ?? new Date()).toLocaleDateString(),
                }));
            }) as DataBaseUsersTabs[]
        }, []);



        // Calcul des statistiques pour le circular a droite
        const statistics = useMemo(() => {
            const totalUsers = enter?.length;
            const statusCounts = response.reduce((acc, user) => {
                if (user.status != undefined)
                    acc[user.status] = (acc[user.status] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const valuesEncours = statusCounts["En cours"] || 0;
            const valuesTermine = statusCounts["Terminé"] || 0;
            const total = valuesEncours + valuesTermine;

            const SectorSat = total > 0
                ? [
                    { name: 'Statut en cours', value: Math.round((valuesEncours / total) * 100), color: '#009CFE' },
                    { name: 'Statut Terminé', value: Math.round((valuesTermine / total) * 100), color: '#24D26D' }
                ]
                : [];

            const uniqueCategories = [...new Set(response.map(user => user.category))].filter(Boolean);
            const uniqueStatuts = [...new Set(response.map(user => user.status))].filter(Boolean);
            //

            //--------------DETRMINATION Du total des users a  position "  AutoGestion " 
            const autoGestionTotal = response.filter((user) => user?.position?.toUpperCase() === "GESTION").length

            //----------LES RETURNS
            return {
                totalUsers,
                SectorSat,
                uniqueCategories,
                uniqueStatuts,
                valuesEncours,
                valuesTermine,
                autoGestionTotal
            };
        }, [response]);


        return { response, statistics }; // dans le cas ou il y aura aucun utilisateur defini
    }

    // les categories disponibles 
    const CaracterisqueUniques = () => {
        // CORRECTION: Utiliser categoriesStatistiques pour les weeks eb retard
        const choiceliste: PaymentDataVariation[] = enter?.flatMap(prev =>
            prev.categoriesStatistiques?.flatMap(nexts =>
                nexts.detailPaiementOfThisCategorie?.filter(choi => choi.status === "En retard")
                    .map(choi => ({
                        weeks: choi.week,
                        value: choi.totalToPayByWeekOfThisCategory
                    } as PaymentDataVariation))
            )
        ) as PaymentDataVariation[]

        //------------- recuperation des semaines dans lordre
        const weekss = [... new Set(choiceliste?.flatMap(prev => prev?.weeks) || [])].sort((a, b) => { return a - b })

        // for categories pour recuperer les categories uniques
        const categoriesAll = enter?.flatMap((user) =>
            user.categoriesStatistiques?.map((item) => item.category) || ["Non définie"]
        ) as string[];
        const uniqueCategories = [...new Set(categoriesAll)].sort((a, b) => Number(a) - Number(b));

        // for options pour recuperer les status uniques
        const statusAll = enter?.flatMap((user) =>
            user.categoriesStatistiques?.map((item) => item.status) || [user.status || "En cours"]
        ) as string[];
        const uniqueStatuts = [...new Set(statusAll)];

        // recuperer tooutes les semenaines 
        const weeksAll = enter?.flatMap((user) =>
            user.categoriesStatistiques?.flatMap((item) =>
                item.detailPaiementOfThisCategorie?.map((it) => it.week)
            )
        ) as number[];

        const uniqueWeeks = [...new Set(weeksAll?.filter(Boolean) || [])].sort((a, b) => { return a - b });

        // graphique en cours et termine
        const valuesEncours = statusAll.filter((status) => status === "En cours").length;
        const valuesTermine = statusAll.filter((status) => status === "Terminé").length;

        //utilisateurs total 
        const UserTotal = enter?.length || 0

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

export function calculerIntervalleSemaine(semaineNum: string, dateDebutTontine: Date) {
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

    return {

        texte: `${dateDebutFormatee} au ${dateFinFormatee}`,
        debut: dateDebut,
        fin: dateFin
    };
}

// le time 
import { useState, useEffect } from 'react';

export function useCountdown({ startTime, endTime }: { startTime: Date | null; endTime: Date | null }) {
    const calcRemaining = () => Math.max(0, (endTime?.getTime() ?? Date.now()) - Date.now());
    const [remaining, setRemaining] = useState(calcRemaining());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemaining(calcRemaining());
        }, 1000);
        return () => clearInterval(intervalId);
    }, [startTime, endTime,calcRemaining]);

    // convertir millisecondes en jrs/hrs/min/sec
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return { remaining, days, hours, minutes, seconds };
}



// Exemple d'utilisation :// const dateDebutTontine = new Date('2025-01-01');
// const    resultat = calculerIntervalleSemaine('sem 2', dateDebutTontine);
// Fonction pour calculer les dates de semaine
export function calculerDatesSemaine(
    semaineNum: string | number | undefined | null,
    dateDebutTontine: Date
): { dateDebut: Date; dateFin: Date; intervalleFormaté: string } {
    if (semaineNum === undefined || semaineNum === null) {
        throw new Error("Le numéro de semaine est manquant");
    }

    let numeroSemaine: number;

    if (typeof semaineNum === "number") {
        numeroSemaine = semaineNum;
    } else {
        const trimmed = semaineNum.trim();
        const match = trimmed.match(/^sem\s*(\d+)$/i);

        if (!match) {
            throw new Error("Format de semaine invalide. Utilisez 'sem X' où X est un nombre");
        }

        numeroSemaine = parseInt(match[1], 10);
    }

    if (numeroSemaine <= 0) {
        throw new Error("Le numéro de semaine doit être positif");
    }

    // Clonage de la date de départ
    const dateDebut = new Date(dateDebutTontine);
    const joursAjoutes = (numeroSemaine - 1) * 7;
    dateDebut.setDate(dateDebut.getDate() + joursAjoutes);

    const dateFin = new Date(dateDebut);
    dateFin.setDate(dateDebut.getDate() + 6);

    dateDebut.setHours(0, 0, 0, 0);
    dateFin.setHours(23, 59, 59, 999);

    const formatter = new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return {
        dateDebut,
        dateFin,
        intervalleFormaté: `${formatter.format(dateDebut)} au ${formatter.format(dateFin)}`
    };
}


