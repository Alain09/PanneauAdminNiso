"use client"
import { Startscard } from '@/src/components/dash_composant/staticard';
import { Eye, File, FileText, Loader2, Pencil, Trash2, UserCogIcon, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Search, MoreVertical, Filter, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/src/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/src/components/ui/table";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/src/components/ui/dropdown-menu";
import { Badge } from "@/src/components/ui/badge";
import { Card } from '@/src/components/ui/card';

import { useRouter } from 'next/navigation';
import { Donnees } from '@/type';
import { DataAction } from '@/src/components/hook_perso';

function UserAll() {
  const route = useRouter();


  // la destructuration des dataActions
  const { UsersStructuration, CaracterisqueUniques } = DataAction({ enter: Donnees });

  // destructuration de Caracterisqtique 
  const { uniqueCategories, uniqueStatuts, valuesEncours, valuesTermine } = CaracterisqueUniques();

  // chargement de donnees
  const [dataTabsUsers, setDataTabsUsers] = useState(UsersStructuration()); // les donnees du tableau
  const [dataTabsUsersrRload] = useState(UsersStructuration()); // les donnees du tableau recharger

  const total = valuesEncours + valuesTermine;
  const SectorSat = [
    { name: 'Statut en cours', value: Math.round((valuesEncours / total) * 100), color: '#009CFE' },
    { name: 'Statut Terminé', value: Math.round((valuesTermine / total) * 100), color: '#24D26D' }
  ];

  // modal pour la supression
  // fiiltrage  
  const [filter, setFilter] = useState(false);
  const [aut, setAut] = useState(true);
  const [openDeleteModale, setOpenDeleteModale] = useState(false);
  const targetEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reseach = e.target.value.toUpperCase() === "DELETE" ? setAut(false) : setAut(true);
    return reseach;
  };

  // texte afficher dans la modale de suppression
  const [nameActive, setNameActive] = useState<string | undefined>("");

  /// pour les valeurs du modal servant pour le filtrage
  const [selectedCategorie, setSelectedCategorie] = useState<string>("");
  const [selectedStatutCategorie, setSelectedStatutCategorie] = useState<string>("");

  // fonction de filtrage
  const handleFilter = () => {
    const filteredData = dataTabsUsers.filter((user) => {
      const matchesCategory = selectedCategorie ? user?.category === selectedCategorie : true;
      const matchesStatus = selectedStatutCategorie ? user?.status === selectedStatutCategorie : true;
      return matchesCategory && matchesStatus;
    });
    setDataTabsUsers(filteredData);
    setFilter(false);
  };

  // fonction de rechargement
  const [load, setLoad] = useState(false);
  const handleReload = () => {
    setLoad(true);
    setDataTabsUsers(dataTabsUsersrRload);
    setSelectedCategorie("");
    setSelectedStatutCategorie("");
    setSearchUser("");
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  };

  /// recherche d'un utilisateur
  const [searchUser, setSearchUser] = useState("");

  // Filter references when search query changes
  useEffect(() => {
    if (searchUser.trim() === '') {
      setDataTabsUsers(dataTabsUsersrRload);
    } else {
      const filteredData = dataTabsUsersrRload.filter((user) =>
        user?.firstName?.toLowerCase().includes(searchUser) ||
        user?.lastName?.toLowerCase().includes(searchUser));
      setDataTabsUsers(filteredData);
    }
  }, [searchUser, dataTabsUsersrRload]);

  return (
    <div>
      <main className='p-4 md:p-6'>
        {/* Section des cartes et statistiques */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-6">
          {/* Carte orange avec les statistiques */}
          <div className="bg-gradient-to-l from-[#FFAE91] to-[#FF4000] rounded-lg text-white p-10 md:p-6 w-full lg:w-2/3 h-auto min-h-[250px] md:min-h-[300px]">
            <h1 className="text-xl md:text-2xl font-bold mb-4">Hello, Everyone</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-4">
              <Startscard
                title="Utilisateurs"
                description="utilisateurs enregistrés "
                value={200}
                icon={<Users className="w-4 h-4 text-[#FF4000]" />}
              />
              <Startscard
                title="Cas particuliers"
                description="utilisateurs analphabètes"
                value="20"
                icon={<UserCogIcon className="w-4 h-4 text-[#FF4000]" />}
              />
            </div>
          </div>

          {/* Carte des statistiques des utilisateurs */}
          <Card className="p-4 md:p-6 rounded-lg border border-gray-100 shadow-gray-100 w-full lg:w-1/3 h-auto min-h-[250px] md:min-h-[300px]">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Statut des Utilisateurs</h2>
            <div className="flex flex-col items-center justify-center md:justify-start">
              {/* Graphique */}
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SectorSat}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {SectorSat.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Légende et pourcentages */}
              <div className="ml-0 md:ml-6 mt-4 md:mt-0 flex justify-between gap-6 ">
                <div className="mb-2">
                  <span className="text-xl md:text-2xl font-bold">{SectorSat[0].value}%</span>
                  <div className="flex items-center mt-1">
                    <div className="w-3 h-3 rounded-full bg-[#009CFE] mr-2"></div>
                    <span className="text-sm md:text-base">{SectorSat[0].name}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xl md:text-2xl font-bold">{SectorSat[1].value}%</span>
                  <div className="flex items-center mt-1">
                    <div className="w-3 h-3 rounded-full bg-[#24D26D] mr-2"></div>
                    <span className="text-sm md:text-base">{SectorSat[1].name}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tableau avec défilement horizontal et vertical */}
        <div className="w-full">
          <Card className='border border-gray-100 shadow-gray-100 overflow-hidden'>
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 p-3 md:p-4">
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs md:text-sm bg-[#FF4000] text-white rounded-md">Effectif</span>
                  <span className="px-2 py-1 text-xs md:text-sm border rounded-md">{dataTabsUsers.length.toString().padStart(2, "0")}</span>
                </div>
              </div>

              <div className="relative flex-grow">
                <Input
                  type='text'
                  onChange={(e) => {
                    setSearchUser(e.target.value.toLowerCase());
                  }}
                  value={searchUser}
                  className="pl-8 w-full"
                  placeholder="rechercher un nom"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
                <Button
                  variant="destructive"
                  className="flex items-center bg-[#FF4000] hover:bg-[#FF4000]/90 text-xs md:text-sm h-9"
                  onClick={() => setFilter(true)}
                >
                  <Filter className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                  Filtrer
                </Button>

                <Button
                  variant="destructive"
                  className="flex items-center bg-[#FF4000] hover:bg-[#FF4000]/90 text-xs md:text-sm h-9"
                  onClick={handleReload}
                >
                  <Loader2 className={`mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 ${load ? "animate-spin duration-300" : ""}`} />
                  Recharger
                </Button>

                <Button
                  variant="default"
                  className="flex items-center cursor-pointer text-xs md:text-sm h-9"
                  onClick={() => route.push("/dashboard/users/new")}
                >
                  <Plus className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                  New user
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2 h-9 w-9">
                      <MoreVertical className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-46 rounded-lg shadow-lg border border-gray-200 p-2"
                  >
                    {/* telecharger le pdf */}
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer hover:rounded-lg hover:shadow-gray-200">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-1.5 rounded-full mr-3">
                          <FileText className="h-4 w-4 text-gray-500" />
                        </div>
                        <span>Exporter le pdf</span>
                      </div>
                    </DropdownMenuItem>

                    {/* telecharger le fichier excel */}
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer hover:rounded-lg hover:shadow-gray-200">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-1.5 rounded-full mr-3">
                          <File className="h-4 w-4 text-gray-500" />
                        </div>
                        <span>Exporter l&apos;excel</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Conteneur de tableau avec défilement */}
            <div className="overflow-x-hidden max-h-[400px] md:max-h-[500px] lg:max-h-[600px] xl:max-h-[700px] 2xl:max-h-[800px] overflow-y-auto">
              <Table className="min-w-[1000px]">
                <TableHeader className="bg-gray-50 sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Utilisateurs</TableHead>
                    <TableHead>Contacts</TableHead>
                    <TableHead>Provenance</TableHead>
                    <TableHead>Catégories</TableHead>
                    <TableHead>Option(s)</TableHead>
                    <TableHead>Date d&apos;entrée</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataTabsUsers.map((user, index) => (
                    <TableRow
                      key={index}
                      className={`${index % 2 === 0 ? "bg-[#FFAE91]/10 " : ""}`}
                    >
                      <TableCell>
                        <div className="flex items-center justify-center w-8 h-8 bg-[#FFAE91] text-white rounded-full">
                          {user?.firstName?.charAt(0)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user?.firstName} {user?.lastName}</div>
                          <div className="text-[#FF4000] text-xs md:text-sm">{user?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{user?.contact}</TableCell>
                      <TableCell>{user?.provence}</TableCell>
                      <TableCell>
                        {user?.category} Fcfa
                      </TableCell>
                      <TableCell className="max-w-[150px]">
                        <div className="truncate" title={user?.listOptions?.join('; ')}>
                          [{user?.listOptions?.join('; ')}]
                        </div>
                      </TableCell>
                      <TableCell>{user?.dateEntree}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user?.status === "Terminé"
                              ? "text-xs text-green-600 bg-green-100 py-1 px-2 rounded"
                              : "text-xs text-blue-600 bg-blue-100 py-1 px-2 rounded"
                          }
                        >
                          • {user?.status === "Terminé" ? "Terminé" : "En cours"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-46 rounded-lg shadow-lg border border-gray-200 p-2"
                          >
                            {/* Item Details */}
                            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer hover:rounded-lg hover:shadow-gray-200">
                              <div className="flex items-center"
                                onClick={() => route.push(`/dashboard/users/view/${user?.id}`)}
                              >
                                <div className="bg-gray-100 p-1.5 rounded-full mr-3">
                                  <Eye className="h-4 w-4 text-gray-500" />
                                </div>
                                <span>Details</span>
                              </div>
                            </DropdownMenuItem>

                            {/* Item Editer */}
                            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer hover:rounded-lg hover:shadow-gray-200">
                              <div className="flex items-center"
                                onClick={() => route.push(`/dashboard/users/edit/${user?.id}`)}
                              >
                                <div className="bg-gray-100 p-1.5 rounded-full mr-3">
                                  <Pencil className="h-4 w-4 text-gray-500" />
                                </div>
                                <span>Editer</span>
                              </div>
                            </DropdownMenuItem>

                            {/* Item Supprimer */}
                            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer hover:rounded-lg hover:shadow-gray-200">
                              <div className="flex items-center"
                                onClick={() => {
                                  setOpenDeleteModale(true);
                                  setNameActive(`la catégorie ${user?.category}Fcfa de  ${user?.firstName} ${user?.lastName}`);
                                }}
                              >
                                <div className="bg-gray-100 p-1.5 rounded-full mr-3">
                                  <Trash2 className="h-4 w-4 text-gray-500" />
                                </div>
                                <span>Supprimer</span>
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </main>

      {/* dialogue pour le filtrage */}
      <Dialog open={filter} onOpenChange={setFilter} >
        <DialogContent className="sm:max-w-md ">
          <form action={handleFilter} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Filtrage</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 ">
              <p className="text-sm text-muted-foreground">
                Filtrer selon les critères de sélection
              </p>

              <div className="space-y-4">
                {/* Sélecteur de tontine */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Catégorie</label>
                  <Select onValueChange={setSelectedCategorie} value={selectedCategorie}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueCategories.map((tontine, index) => (
                        <SelectItem key={index} value={tontine as string}>
                          {tontine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sélecteur de statut*/}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Statut</label>
                  <Select onValueChange={setSelectedStatutCategorie} value={selectedStatutCategorie}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueStatuts.map((statut, index) => (
                        <SelectItem key={index} value={statut as string}>
                          {statut}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter className=' mt-5'>
              <DialogClose asChild>
                <Button variant="outline" className="mr-2">
                  Annuler
                </Button>
              </DialogClose>
              <Button type='submit' className="bg-[#FF4000]">
                Confirmer
              </Button>
            </DialogFooter>
          </form>
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
                  onChange={(e) => targetEnter(e)}
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
              className="bg-orange-500 hover:bg-orange-600">
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserAll;