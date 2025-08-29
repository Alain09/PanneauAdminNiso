"use client";

import React, { useState, use } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";

import { ProductCatalogue } from "@/type";
import Bande from "@/src/components/users/bande";
import Subcomposant from "@/src/components/composantProduct/subcomposant";
import Usehook from "@/src/components/hook_perso";

// Ajoutez async à la fonction et await pour les params
export default function CatalogueFormateEdit({ params }: { params: Promise<{ id: string }> }) {  
  // Résolvez la promesse des params
  const {id} = use(params);
  
  // cette fonction permet de generer un id unique pour chaque composant
  const generateId = () => {
    return Math.random().toString() + new Date().toString()
  }

  const [options, setOptions] = useState<ProductCatalogue>({
    id: generateId(),
    price: 0,
    option: 1,
    totalweek: 15,
    categorie: "",
    composant: [
      {
        id: generateId(),
        quantity: 1,
        product: "",
        image: ""
      },
      {
        id: generateId(),
        quantity: 3,
        product: "",
        image: ""
      },
      {
        id: generateId(),
        quantity: 4,
        product: "",
        image: ""
      }
    ]
  });

  const { remove, addProduct } = Usehook({ setOptions })

  // cette fonction met a jour les etats dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, dataset } = e.target;
    const { sectionIndex } = dataset;

    setOptions((prev) => {
      if (sectionIndex !== undefined) {
        // Mise à jour d'un champ dans "composant"
        const updatedComposants = [...prev.composant];
        updatedComposants[Number(sectionIndex)] = {
          ...updatedComposants[Number(sectionIndex)],
          [name]: name === 'quantity' ? Number(value) : value,
        };
        return { ...prev, composant: updatedComposants };
      } else {
        // Mise à jour d'un champ principal
        return {
          ...prev,
          [name]: name === 'option' || name === 'price' || name === 'totalweek'
            ? Number(value)
            : value
        };
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <Bande />
      <Card className="p-4 md:p-6 shadow shadow-gray-50">
        <form action="">

          {/* Information personnelle section */}
          <div>
            <CardHeader className="w-full p-0 mb-4 md:mb-6">
              <CardTitle className="text-[#FF4000] font-medium text-lg md:text-xl">
                Edition de catalogue {id}
              </CardTitle>
              <CardDescription className="text-gray-500 text-sm">
                ces informations seront conservées dans la base de données
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <div className="bg-white border border-gray-100 rounded-lg p-4 md:p-6 w-full">

                <div className="space-y-4 md:space-y-6">
                  { /* Catégorie */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-5 border-b border-b-gray-100">
                    <label className="text-sm md:text-md font-normal md:w-[200px]">Catégorie</label>
                    <Input
                      type="text"
                      className="shadow shadow-gray-50 w-full h-10 md:h-[45px]"
                      placeholder="100f"
                      value={options.categorie}
                      name="categorie"
                      id="categorie"
                      onChange={(e) => setOptions((prev) => ({ ...prev, categorie: e.target.value }))}
                    />
                  </div>
                  { /* Option */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-5 border-b border-b-gray-100">
                    <label className="text-sm md:text-md font-normal md:w-[200px]">Option</label>
                    <Input
                      type="number"
                      className="shadow shadow-gray-50 w-full h-10 md:h-[45px]"
                      value={options.option}
                      name="option"
                      id="option"
                      onChange={(e) => setOptions((prev) => ({ ...prev, option: Number(e.target.value) }))}
                    />
                  </div>
                  { /* Prix hebdomendaire */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-5 border-b border-b-gray-100">
                    <label className="text-sm md:text-md font-normal md:w-[200px]">Prix hebdomendaire</label>
                    <Input
                      type="number"
                      className="shadow shadow-gray-50 w-full h-10 md:h-[45px]"
                      value={options.price}
                      name="price"
                      id="price"
                      onChange={(e) => setOptions((prev) => ({ ...prev, price: Number(e.target.value) }))}
                    />
                  </div>

                  { /* Nombre de semaine */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-0">
                    <label className="text-sm md:text-md font-normal md:w-[200px]">Nbr de semaine</label>
                    <Input
                      type="number"
                      className="shadow shadow-gray-50 w-full h-10 md:h-[45px]"
                      value={options.totalweek}
                      name="total"
                      id="total"
                      onChange={(e) => setOptions((prev) => ({ ...prev, totalweek: Number(e.target.value) }))}
                    />
                  </div>

                </div>

              </div>
            </CardContent>
          </div>

          {/* section des composants */}
          <div className="pt-8 md:pt-15">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
              <CardHeader className="w-full p-0">
                <CardTitle className="text-[#FF4000] font-medium text-lg md:text-xl">
                  Composants
                </CardTitle>
                <CardDescription className="text-gray-500 text-sm">
                  ces informations seront conservées dans la base de données
                </CardDescription>
              </CardHeader>
              <Button 
                className="bg-[#FF4000] hover:bg-[#FF4000]/90 w-full md:w-auto"
                type="button"
                onClick={addProduct}
              >
                Ajoute un produit
              </Button>
            </div>

            <CardContent className="p-0 mt-4 md:mt-6">
              {
                options?.composant?.length !== 0 ?
                  <div className="bg-white border border-gray-100 rounded-lg p-4 md:p-6 w-full shadow-gray-100">
                    <div className="space-y-6 md:space-y-10">
                      {
                        options?.composant?.map((term, index) => (
                          <Subcomposant
                            remote={remove}
                            composant={term}
                            handleChange={handleChange}
                            key={term.id}
                            index={index}
                          />
                        ))
                      }
                    </div>
                  </div>
                  :
                  <div className="p-3 bg-green-100 w-full flex justify-center items-center text-green-800 text-sm font-medium rounded-md"> 
                    pas de composant 
                  </div>
              }
            </CardContent>
          </div>

          {/* soumission */}
          <div className="flex justify-center md:justify-start mt-6 md:mt-10 px-0 md:px-6">
            <Button 
              className="bg-[#FF4000] hover:bg-[#FF4000]/90 w-full md:w-auto"
              type="submit" 
            > 
              soumettre
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};