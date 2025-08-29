"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";

import { ProductCatalogue } from "@/type";
import Bande from "@/src/components/users/bande";
import Subcomposant from "@/src/components/composantProduct/subcomposant";
import Usehook from "@/src/components/hook_perso";

export default function CatalogueFormateEdit( { params }: { params: { id: string } }) {  
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
    <div className=" max-w-4xl mx-auto p-6 ">
      <Bande />
      <Card className=" p-6 shadow shadow-gray-50">
        <form action="">

          {/* Information personnelle section */}
          <div>
            <CardHeader className=" w-full">
              <CardTitle className="text-[#FF4000] font-medium mb-1"
              >
                Edition de catalogue {params.id}
              </CardTitle>
              <CardDescription className="text-gray-500 text-sm  ">
                ces informations seront conservées dans la base de données
              </CardDescription>
            </CardHeader>

            <CardContent className=" mt-6">
              <div className="bg-white  border border-gray-100 rounded-lg p-6 w-full h-fit  ">

                <div className="space-y-6">
                  { /* Catégorie */}
                  <div className=" flex  items-center gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[200px]">Catégorie</label>
                    <Input
                      type="text"
                      className=" shadow shadow-gray-50 w-full h-[45px]  "
                      placeholder=" 100f"
                      value={options.categorie}
                      name="categorie"
                      id="categorie"
                      onChange={(e) => setOptions((prev) => ({ ...prev, categorie: e.target.value }))}
                    />
                  </div>
                  { /* Option */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[200px]">Option</label>
                    <Input
                      type="number"
                      className="shadow shadow-gray-50 w-full h-[45px]  "
                      value={options.option}
                      name="option"
                      id="option"
                      onChange={(e) => setOptions((prev) => ({ ...prev, option: Number(e.target.value) }))}
                    />
                  </div>
                  { /* Prix hebdomendaire */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[200px]">Prix hebdomendaire </label>
                    <Input
                      type="number"
                      className="shadow shadow-gray-50  w-full h-[45px]  "
                      value={options.price}
                      name="price"
                      id="price"
                      onChange={(e) => setOptions((prev) => ({ ...prev, price: Number(e.target.value) }))}
                    />
                  </div>

                  { /* Nombre de semaine */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 ">
                    <label className="text-md font-normal w-[200px]">Nbr de semaine</label>
                    <Input
                      type="number"
                      className="shadow shadow-gray-50  w-full h-[45px] "
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
          <div className=" pt-15">
            <div className="flex justify-between items-center">
              <CardHeader className="  w-full">
                <CardTitle className="text-[#FF4000] font-medium mb-1">
                  Composants
                </CardTitle>
                <CardDescription className="text-gray-500 text-sm  ">
                  ces informations seront conservées dans la base de données
                </CardDescription>
              </CardHeader>
              <Button className="bg-[#FF4000] hover:bg-[#FF4000]/90 mr-6"
                type="button"
                onClick={addProduct}
              >
                Ajoute un produit
              </Button>
            </div>

            <CardContent className=" mt-6">
              {
                options?.composant?.length !== 0 ?
                  <div className="bg-white border border-gray-100 rounded-lg p-6 w-full h-fit  shadow-gray-100 ">
                    <div className=" space-y-10 p-3 ">
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
                  <div className=" p-2 bg-green-100 w-full flex justify-center items-center text-green-800 text-sm font-medium "> pas de composant </div>
              }
            </CardContent>
          </div>

          {/* soumission */}
          <Button className="bg-[#FF4000] hover:bg-[#FF4000]/90   mx-6 mt-10"
            type="submit" 
          > soumettre</Button>
        </form>
      </Card>
    </div>
  );
};