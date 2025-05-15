import { ComposantCatalogue, OptionComponent, ProductCatalogue } from "@/type";
import React from "react";

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