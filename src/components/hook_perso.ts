import { ComposantCatalogue, DataBaseUsersTabs, OptionComponent, OptionsCounts, PaymentDataVariation, ProductCatalogue, StatisticCategories, TontineOption, UserProfile, UsersLatePayment } from "@/type";
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

    //fonction l'evolution des paiements  
    // reception des données de paiement ( sem, montanttotal)
    const VariationPaid = () => {
        const datas: PaymentDataVariation[] = []

        // recuperation de donee { sem , montant}[]
        const choiceliste: PaymentDataVariation[] = enter?.flatMap(prev => prev.DescriptionChoixOfEachUser?.flatMap(nexts => nexts.choix?.filter(choi => choi.status === "Payé")
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
        // boucles -----
        weekss.forEach((sem) => {
            const filteWeek = choiceliste.filter(pro => pro.weeks === sem)
            const taches = {
                weeks: sem,
                value: filteWeek.flatMap(pro => pro.value as number).reduce((acc, val) => acc + val, 0)
            }

            datas.push(taches)
        })

        // recuperation du dernier element de datas ( pour servir total recu dans la week et le total global )
        const TotalWeekActive = datas.at(-1)?.value as number;
        const TotalGobal = datas.flatMap(prev => prev.value).reduce((acc, val) => acc + val, 0)

        return {
            datas,
            TotalWeekActive,
            TotalGobal

        }
    }


    // recuperation des options et categories
    //analyse de contenues des options et catégories
    const StructurationCategorie = () => {

        const dataReturn: StatisticCategories[] = [];
        const choiceliste = enter?.flatMap(prev => prev.DescriptionChoixOfEachUser?.flatMap(nexts => nexts.choix?.flatMap(choi => choi.optionsDescription))) as TontineOption[]
        const categorieListe = [... new Set(choiceliste.flatMap(prev => prev.category))].sort((a, b) => Number(a) - Number(b))
        categorieListe.forEach(each => {
            const listeOpt = () => {
                const servant: OptionsCounts[] = []
                const bars = choiceliste
                    .filter(prev => prev.category === each)
                    .map(prev => ({
                        countOption: prev.countOption,
                        option: prev.option
                    }))

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
        // recuperation de donee { sem , montant}[]
        const choiceliste: UsersLatePayment[] = enter?.flatMap(prev => prev.DescriptionChoixOfEachUser?.flatMap(nexts => nexts.choix?.filter(choi => choi.status === "En retard")
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

        return choiceliste;
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
        const choiceliste: PaymentDataVariation[] = enter?.flatMap(prev => prev.DescriptionChoixOfEachUser?.flatMap(nexts => nexts.choix?.filter(choi => choi.status === "En retard")
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

        // for categories
        const categoriesAll = enter?.flatMap((user) => user.DescriptionChoixOfEachUser?.map((item) => item.category)) as string[]; //ceci c'est un tableau de toutes les categories
        const uniqueCategories = [...new Set(categoriesAll)].sort((a, b) => Number(a) - Number(b));

        // for options
        const statusAll = enter?.flatMap((user) => user.DescriptionChoixOfEachUser?.map((item) => item.status)) as string[]; // ceci c'est un tableau de tous les status
        const uniqueStatuts = [...new Set(statusAll)];

        //
        // graphique en cours et termine
        const valuesEncours = statusAll.filter((status) => status === "En cours").length;
        const valuesTermine = statusAll.filter((status) => status === "Terminé").length;

        //utilisateurs total 
        const UserTotal = enter?.length as number 

        // 

        return {
            uniqueCategories,
            uniqueStatuts,
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
        CaracterisqueUniques
    }
}


interface Subjet {
    value: number
}
export function ConvertInKilo({ value }: Subjet) {

    if (value >= 1000) {
        return `${Math.floor(value / 1000)}K+`
    }

    else if (value >= 1000000) {
        return `${Math.floor(value / 1000000)}M+`
    }
    else return value
   


}