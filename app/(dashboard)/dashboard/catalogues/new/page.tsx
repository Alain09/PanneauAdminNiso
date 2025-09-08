"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { ProductCatalogue } from "@/type";
import Bande from "@/src/components/users/bande";
import Subcomposant from "@/src/components/composantProduct/subcomposant";
import Usehook from "@/src/components/hook_perso";
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { AlertCircle, SquareCheckBig } from "lucide-react";

export default function CatalogueFormateNew() {
  const [loading, setLoading] = useState(false)
  const [sendSubmitError, setSendSubmitError] = useState("");
  const [sendSubmitSuccess, setSendSubmitSuccess] = useState("");

  //--------------------------------------------
  //---------------------------------------------
  const formadataCatalogue = new FormData()
  const route = useRouter()
  //------------

  const [options, setOptions] = useState<ProductCatalogue>({
    id: "",
    categorie: "",
    option: 0,
    price: 0,
    totalweek: 0,
    composant: []
  });


  /// ------------ routre api pour la creation de de catalalogue 
  // api route for creating a new user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // ⬅️ évite le rechargement de page

    setSendSubmitError("");
    setSendSubmitSuccess("")
    setLoading(true)
    //recuperation de l'key access
    const key_acces = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;


    formadataCatalogue.append("categorie", options?.categorie || "")
    formadataCatalogue.append("option", String(options?.option || ""))
    formadataCatalogue.append("price", String(options?.price || ""))
    formadataCatalogue.append("totalweek", String(options?.totalweek ?? ""))
    formadataCatalogue.append("composant", options?.composant ? JSON.stringify(options.composant) : "")
    // Ajout des fichiers image
    options?.composant?.forEach((comp, index) => {
      if (comp.image instanceof File) {
        formadataCatalogue.append(`composant_image_${index}`, comp.image);
      }
    });

    try {

      const datas = await fetch(`/api/catalogue/`, {
        method: "POST",
        headers: { "authorization": `${key_acces}` },
        body: formadataCatalogue,
      });

      if (!datas.ok) {
        setSendSubmitError("Erreur lors de la soumission ")

      }
      const teamData = await datas.json();
      if (!teamData.success) {
        setSendSubmitError(teamData.message)
      } else {
        setLoading(false)
        setSendSubmitError("");
        setSendSubmitSuccess(teamData.message)
        setTimeout(() => {
          route.push("/dashboard/catalogues")
        }, 1500)



      }
    } catch (error) {

      setSendSubmitError(`Une erreur s'est produite:${error}`);
    } finally {
      setLoading(false)

    }
  }


  ///---------------------------

  const { remove, addProduct } = Usehook({ setOptions })

  // cette fonction met a jour les etats dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, dataset } = e.target;
    const { sectionIndex } = dataset;

    setOptions((prev) => {
      const defaultCatalogue: ProductCatalogue = {
        id: prev?.id ?? "",
        categorie: prev?.categorie ?? "",
        option: prev?.option ?? 0,
        price: prev?.price ?? 0,
        totalweek: prev?.totalweek ?? 0,
        composant: prev?.composant ?? []
      };

      if (sectionIndex !== undefined) {
        // Mise à jour d'un champ dans "composant"
        const updatedComposants = [...defaultCatalogue.composant];
        updatedComposants[Number(sectionIndex)] = {
          ...updatedComposants[Number(sectionIndex)],
          [name]: name === 'quantity' ? Number(value) : value,
        };
        return { ...defaultCatalogue, composant: updatedComposants };
      } else {
        // Mise à jour d'un champ principal
        return {
          ...defaultCatalogue,
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
      <div className=' flex justify-center items-center mx-0 md:mx-10 lg:mx-20 xl:mx-48 '>
        {sendSubmitError &&
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-700">
              {sendSubmitError}
            </AlertDescription>
          </Alert>
        }
        {sendSubmitSuccess &&
          <Alert className="border-green-200 bg-green-50">
            <SquareCheckBig className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700">
              {sendSubmitSuccess} hdhdrhhr
            </AlertDescription>
          </Alert>
        }
      </div>
      <Card className="p-4 md:p-6 shadow shadow-gray-50">
        <form onSubmit={handleSubmit}>

          {/* Information personnelle section */}
          <div>
            <CardHeader className="w-full p-0 mb-4 md:mb-6">
              <CardTitle className="text-[#FF4000] font-medium text-lg md:text-xl">
                Edition de catalogue
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
                      placeholder="100"
                      value={options?.categorie}
                      name="categorie"
                      id="categorie"
                      onChange={handleChange}
                    />
                  </div>
                  { /* Option */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-5 border-b border-b-gray-100">
                    <label className="text-sm md:text-md font-normal md:w-[200px]">Option</label>
                    <Input
                      type="number"
                      className="shadow shadow-gray-50 w-full h-10 md:h-[45px]"
                      value={options?.option}
                      name="option"
                      id="option"
                      onChange={handleChange}
                    />
                  </div>
                  { /* Prix hebdomendaire */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-5 border-b border-b-gray-100">
                    <label className="text-sm md:text-md font-normal md:w-[200px]">Prix hebdomendaire</label>
                    <Input
                      type="number"
                      className="shadow shadow-gray-50 w-full h-10 md:h-[45px]"
                      value={options?.price}
                      name="price"
                      id="price"
                      onChange={handleChange}
                    />
                  </div>

                  { /* Nombre de semaine */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10">
                    <label className="text-sm md:text-md font-normal md:w-[200px]">Nbr de semaine</label>
                    <Input
                      type="number"
                      className="shadow shadow-gray-50 w-full h-10 md:h-[45px]"
                      value={options?.totalweek}
                      name="totalweek"
                      id="totalweek"
                      onChange={handleChange}
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
              {loading ? " en cours..." : "soumettre"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};