"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { TontineOption, Donnees, UserProfile } from "@/type";
import Optionlist from "@/src/components/users/Optionlist";
import Bande from "@/src/components/users/bande";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";

export default function UserProfilNew() {

  // declaration des donnees specifique a l'utilisateur
  const [userUnique] = useState<UserProfile>(Donnees[0]);
  const [userCoordonees, setUserCoordonnees] = useState({
    firstName: userUnique.firstName,
    lastName: userUnique.lastName,
    image: userUnique.image,
    email: userUnique.email,
    contact: userUnique.contact,
    provence: userUnique.provence,
    position: userUnique.position,
    role: userUnique.role,
    description: userUnique.description
  });

  // recuperation des categories 
  const categories = userUnique.DescriptionChoixOfEachUser?.flatMap((cat) => cat.category).sort() as string[];

  // la mise a jour sur les details de la tontine choisie
  const [selectCategories, setSelectCategories] = useState(categories[0]);

  // fonction pour la recuperatin des des otpionsDescriptions a une seule ocurence d'option par categories
  // recuperationsd de tous ls OptionDescriptions
  const OptionsDescriptions = userUnique.DescriptionChoixOfEachUser?.flatMap(items => items.optionsDescription) as TontineOption[];
  
  // la fonction
  const MiseAjout = (model: TontineOption[]) => {
    const unique: TontineOption[] = [];
    const seen = new Set();

    for (const item of model) {
      const key = `${item.category}-${item.option}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }
    return unique;
  };

  // application de la function a optionTab
  const [optionTab] = useState<TontineOption[]>(MiseAjout(OptionsDescriptions));

  const [modal, setModal] = useState(false);

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
    e.target.value.toUpperCase() === "DELETE" ? setAut(false) : setAut(true);
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
                      className="  w-full h-[45px] "
                      value={userCoordonees.firstName}
                      onChange={(e) => setUserCoordonnees((prev) => ({
                        ...prev, firstName: e.target.value
                      }))}
                    />
                  </div>
                  { /* Prénom */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Prénom(s)</label>
                    <Input
                      type="text"
                      className=" w-full h-[45px]  "
                      value={userCoordonees.lastName}
                      onChange={(e) => setUserCoordonnees((prev) => ({
                        ...prev, lastName: e.target.value
                      }))}
                    />
                  </div>
                  { /* Email */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Email</label>
                    <Input
                      type="email"
                      className=" w-full h-[45px]  "
                      value={userCoordonees.email}
                      onChange={(e) => setUserCoordonnees((prev) => ({
                        ...prev, email: e.target.value
                      }))}
                      required
                    />
                  </div>

                  { /* Contact */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Contact</label>
                    <Input
                      type="text"
                      className=" w-full h-[45px] "
                      value={userCoordonees.contact}
                      onChange={(e) => setUserCoordonnees((prev) => ({
                        ...prev, contact: e.target.value
                      }))}
                      required
                    />
                  </div>


                  { /* Provenance */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Provenance</label>
                    <Input
                      type="text"
                      className=" w-full h-[45px] "
                      value={userCoordonees.provence}
                      onChange={(e) => setUserCoordonnees((prev) => ({
                        ...prev, provence: e.target.value
                      }))}
                      required
                    />
                  </div>

                  { /* Role */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Rôle</label>
                    <Input
                      type="text"
                      className=" w-full h-[45px] "
                      value={userCoordonees.role}
                      onChange={(e) => setUserCoordonnees((prev) => ({
                        ...prev, role: e.target.value
                      }))}
                    />
                  </div>

                  { /* Position*/}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Position</label>
                    <Input
                      type="text"
                      className=" w-full h-[45px] "
                      value={userCoordonees.position}
                      onChange={(e) => setUserCoordonnees((prev) => ({
                        ...prev, position: e.target.value
                      }))}
                    />
                  </div>

                  { /* Image */}
                  <div className=" flex  items-center  gap-x-10  mx-5 pb-5 border-b border-b-gray-100">
                    <label className="text-md font-normal w-[120px]">Image</label>
                    <Input
                      type="file"
                      className="  w-full h-[45px] "
                      placeholder=" entrer un image"
                      onChange={(e) => setUserCoordonnees((prev) => ({
                        ...prev, image: e.target.files?.[0]
                      }))}
                    />
                  </div>

                  { /* Description */}
                  <div className=" flex  items-center  gap-x-10  mx-5  ">
                    <label className="text-md font-normal w-[120px]">Description</label>
                    <Textarea
                      value={userCoordonees.description}
                      onChange={(e) => setUserCoordonnees((prev) => ({
                        ...prev, description: e.target.value
                      }))}
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
              optionTab.length !== 0 ?
                <div className="bg-white border border-gray-100 rounded-lg p-6 w-full h-fit  ">
                  <div className="px-6 pt-3 flex justify-between items-center">
                    <h4 className="text-lg font-medium mb-3">Tontine(s) choisi(es)</h4>
                    <Tabs defaultValue={categories[0]}>
                      <TabsList className=" h-8 items-center justify-center bg-gray-50">
                        {categories.map((item) => {
                          return (
                            <TabsTrigger
                              onClick={() => { setSelectCategories(item); }}
                              key={item} value={item} className="text-[16px] text-gray-300 px-2 data-[state=active]:bg-[#FF4000] data-[state=active]:text-white">
                              {item} Fcfa
                            </TabsTrigger>
                          );
                        })}
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className=" space-y-5 p-6 ">
                    {
                      optionTab?.map((term) => {
                        if (term.category === selectCategories) {
                          return (
                            <Optionlist opt={term} setOpen={setOpenDeleteModale} setTexteDelete={setNameActive} key={term.category + term.option} />
                          );
                        }
                        return null;
                      })
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
                  onChange={targetEnter}
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