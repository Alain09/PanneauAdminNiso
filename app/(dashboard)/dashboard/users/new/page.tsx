"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { TontineOption } from "@/type";
import Optionlist from "@/src/components/users/Optionlist";
import Bande from "@/src/components/users/bande";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";

export default function UserProfilNew() {
  const [modal, setModal] = useState(false);
  const [options] = useState<TontineOption[]>([]);

  const [selectedCategorie, setSelectedCategorie] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const tontines = [
    { id: "1", name: "100" },
    { id: "2", name: "200" },
    { id: "3", name: "300" },
    { id: "4", name: "400" },
    { id: "5", name: "500" },
  ];

  const statuts = [
    { id: "1", name: "1" },
    { id: "2", name: "2" },
    { id: "3", name: "3" },
    { id: "4", name: "4" },
    { id: "5", name: "5" },
    { id: "6", name: "6" },
  ];

  // modalpour la supression
  const [aut, setAut] = useState(true);
  const [openDeleteModale, setOpenDeleteModale] = useState(false);
  const targetEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reseach= e.target.value.toUpperCase() === "DELETE" ? setAut(false) : setAut(true);
    return reseach;
  };

  const [nameActive, setNameActive] = useState<string | undefined>("");

  return (
    <div className=" max-w-4xl mx-auto p-6 ">
      <Bande />
      <Card className=" p-6 shadow-gray-100 border border-gray-100">
        <form action="">

          {/* Information personnelle section */}
          <div>
            <CardHeader className=" w-full">
              <CardTitle className="text-[#FF4000] font-medium mb-1">
                Information personnelle
              </CardTitle>
              <CardDescription className="text-gray-500 text-sm  ">
                ces informations seront conservées dans la base de données
              </CardDescription>
            </CardHeader>

            <CardContent className=" mt-6">
              <div className="bg-white border border-gray-100 rounded-lg p-6 w-full h-fit  ">

                <div className="space-y-6">
                  { /* Nom */}
                  <div className=" flex  items-center gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Nom</label>
                    <Input
                      type="text"
                      className="  w-full h-[45px]  "
                    />
                  </div>
                  { /* Prénom */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Prénom(s)</label>
                    <Input
                      type="text"
                      className=" w-full h-[45px]  "
                    />
                  </div>
                  { /* Email */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Email</label>
                    <Input
                      type="email"
                      className=" w-full h-[45px]  "
                    />
                  </div>

                  { /* Contact */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Contact</label>
                    <Input
                      type="text"
                      className=" w-full h-[45px] "
                    />
                  </div>

                  { /* Provenance */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Provenance</label>
                    <Input
                      type="text"
                      className=" w-full h-[45px] "
                    />
                  </div>

                  { /* Role */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Rôle</label>
                    <Input
                      type="text"
                      className=" w-full h-[45px] "
                    />
                  </div>

                  { /* Position*/}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Position</label>
                    <Input
                      type="text"
                      className=" w-full h-[45px] "
                    />
                  </div>

                  { /* Image */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Image</label>
                    <Input
                      type="file"
                      className="  w-full h-[45px] "
                      placeholder=" entrer un image"
                    />
                  </div>

                  { /* Description */}
                  <div className=" flex  items-center  gap-x-10  mx-5  ">
                    <label className="text-md font-normal w-[120px]">Description</label>
                    <Textarea
                      className=" w-full h-[100px] "
                    />
                  </div>

                </div>
                <div className=" flex justify-end mt-10">
                  <Button className=" w-full">
                    Confirmer
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
        </form>

        {/* Choix opérés section */}
        <div className=" pt-15">
          <div className="flex justify-between items-center">
            <CardHeader className=" w-full">
              <CardTitle className="text-[#FF4000] font-medium mb-1">
                Choix opérés
              </CardTitle>
              <CardDescription className="text-gray-500 text-sm  ">
                ces informations seront conservées dans la base de données
              </CardDescription>
            </CardHeader>
            <Button className="bg-[#FF4000] hover:bg-[#FF4000]/80 mr-6"
              onClick={() => { setModal(true); }}
            >
              Ajouter une catégorie
            </Button>
          </div>

          <CardContent className=" mt-6">
            {
              options.length !== 0 ?
                <div className="bg-white border border-gray-100 rounded-lg p-6 w-full h-fit  ">
                  <div className="px-6 pt-3 flex justify-between items-center">
                    <h4 className="text-lg font-medium mb-3">Tontine(s) choisi(es)</h4>
                    <Tabs defaultValue={options[0]?.category}>
                      <TabsList className=" h-8 items-center justify-center bg-gray-50">
                        {options.map((item, index) => (
                          <TabsTrigger
                            key={index} value={`${item.category}`} className="text-[16px] text-gray-300 px-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">{item.category}F</TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className=" space-y-5 p-6 ">
                    {
                      options?.map((term, index) => (
                        <Optionlist opt={term} setOpen={setOpenDeleteModale} setTexteDelete={setNameActive} key={index} />
                      ))
                    }
                  </div>
                </div>
                :
                <div className=" p-2 bg-green-100 w-full flex justify-center items-center text-green-800 text-sm font-medium "> pas de choix opéré </div>
            }
          </CardContent>
        </div>
      </Card>

      {/* modal pour la mise a jour */}
      <Dialog open={modal} onOpenChange={setModal} >
        <DialogContent className="sm:max-w-md ">
          <DialogHeader>
            <DialogTitle>Ajout de categories</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 ">
            <p className="text-sm text-muted-foreground">
              servir pour la mise a jour ou la création des options
            </p>

            <div className="space-y-4">
              {/* Sélecteur de tontine */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Catégories</label>
                <Select onValueChange={setSelectedCategorie} value={selectedCategorie}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner une option " />
                  </SelectTrigger>
                  <SelectContent>
                    {tontines.map((tont) => (
                      <SelectItem key={tont.id} value={tont.id}>
                        {tont.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sélecteur d'option*/}
              <div className="space-y-2">
                <label className="text-sm font-medium">Option</label>
                <Select onValueChange={setSelectedOption} value={selectedOption}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner une option " />
                  </SelectTrigger>
                  <SelectContent>
                    {statuts.map((statut) => (
                      <SelectItem key={statut.id} value={statut.id}>
                        {statut.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Nombre */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantité</label>
                <Input
                  type=" number"
                  className=" w-full "
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="mr-2">
                Annuler
              </Button>
            </DialogClose>
            <Button className="bg-[#FF4000] hover:bg-[#FF4000]/80">
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      { /* POUR LA SUPPRESSION  */}
      <Dialog open={openDeleteModale} onOpenChange={setOpenDeleteModale} >
        <DialogContent className="sm:max-w-md ">
          <DialogHeader>
            <DialogTitle>SUPPRESSION</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 ">
            <p className="text-sm text-muted-foreground">
              Pour supprimer <span className=' font-semibold text-gray-900'>{nameActive}</span> entrer <span className='text-red-600 font-semibold'>DELETE</span> dans le formulaire ci-dessous
            </p>

            <div className="space-y-4">
              {/* Entrer */}
              <div className="space-y-2">
                <Input
                  className=" w-full "
                  onChange={(e)=>targetEnter(e)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="mr-2">
                Annuler
              </Button>
            </DialogClose>
            <Button
              disabled={aut}
              type='submit'
              onClick={() => { console.log("dddd"); }}
              className="bg-[#FF4000] hover:bg-[#FF4000]/80">
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}