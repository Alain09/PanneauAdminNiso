"use client"
import { Startscard } from '@/src/components/dash_composant/staticard';
import { CalendarIcon, Eye, File, FileText, Loader, Loader2, Pencil, Trash2, UserCogIcon, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Search, MoreVertical, Filter, Plus } from "lucide-react";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
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
import { DataBaseUsersTabs, Donnees, UserProfile } from '@/type';
import { set } from 'date-fns';
import { generateId } from '@/src/lib/utils';
import { DataAction } from '@/src/components/hook_perso';




function UserAll() {
  const route = useRouter()
  const [dataUsers, setDataUsers] = useState<UserProfile[]>(Donnees)

  // la destructuration des dataActions
  const { UsersStructuration, CaracterisqueUniques } = DataAction({ enter: Donnees })

  // destructuration de Caracterisqtique 
  const { uniqueCategories, uniqueStatuts, valuesEncours, valuesTermine } = CaracterisqueUniques()


  // chargement de donnees
  const [dataTabsUsers, setDataTabsUsers] = useState(UsersStructuration()) // les donnees du tableau
  const [dataTabsUsersrRload, setDataTabsUsersReload] = useState(UsersStructuration()) // les donnees du tableau recharger

  const total = valuesEncours + valuesTermine;
  const SectorSat = [
    { name: 'Statut en cours', value: Math.round((valuesEncours / total) * 100), color: '#009CFE' },
    { name: 'Statut Terminé', value: Math.round((valuesTermine / total) * 100), color: '#24D26D' }
  ];




  // modal pour la supression
  // fiiltrage  
  const [filter, setFilter] = useState(false)
  const [aut, setAut] = useState(true)
  const [openDeleteModale, setOpenDeleteModale] = useState(false)
  const targetEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.toUpperCase() === "DELETE" ? setAut(false) : setAut(true)
  }


  // texte afficher dans la modale de suppression
  const [nameActive, setNameActive] = useState<string | undefined>("")


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
  const [load, setLoad] = useState(false)
  const handleReload = () => {
    setLoad(true)
    setDataTabsUsers(dataTabsUsersrRload);
    setSelectedCategorie("");
    setSelectedStatutCategorie("");
    setSearchUser("");
    setTimeout(() => {
      setLoad(false)
    }, 1000)

  };





  /// recherche d'un utilisateur
  const [searchUser, setSearchUser] = useState("");

  // Filter references when search query changes
  useEffect(() => {
    if (searchUser.trim() === '') {
      setDataTabsUsers(dataTabsUsersrRload)
    } else {
      const filteredData = dataTabsUsers.filter((user) =>
        user?.firstName?.toLowerCase().includes(searchUser) ||
        user?.lastName?.toLowerCase().includes(searchUser))
      setDataTabsUsers(filteredData);
    }
  }, [searchUser])

  useEffect(() => {
    console.log("tab", dataTabsUsers)
  },)

  return (
    <div>
      <main className=' p-6'>
        <div className=" flex  gap-4">
          {/* les cardstat */}
          <div className="bg-gradient-to-l from-[#FFAE91] to-[#FF4000] rounded-lg text-white p-6 mb-6 w-full h-[300px] ">
            <h1 className="text-2xl font-bold mb-4">Hello, Everyone</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Startscard title="Utilisateurs" description="utilisateurs enregistrés " value={200} icon={<Users className="w-4 h-4 text-[#FF4000]" />} />
              <Startscard title="Cas particuliers" description="utilisateurs analphabètes" value="20" icon={<UserCogIcon className="w-4 h-4 text-[#FF4000]" />} />

            </div>

          </div>
          <Card className=" p-6 rounded-lg sborder border-gray-100 shadow-gray-100  w-2/3 h-[300px]">
            <h2 className="text-2xl font-bold mb-4 ">Statut des Utilisateurs </h2>

            <div className="flex items-center">
              {/* Graphique */}
              <div className="w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SectorSat}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
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
              <div className="ml-6">
                <div className="mb-2">
                  <span className="text-2xl font-bold">{SectorSat[0].value}%</span>
                  <div className="flex items-center mt-1">
                    <div className="w-3 h-3 rounded-full bg-[#009CFE] mr-2"></div>
                    <span>{SectorSat[0].name}</span>
                  </div>
                </div>

                <div>
                  <span className="text-2xl font-bold">{SectorSat[1].value}%</span>
                  <div className="flex items-center mt-1">
                    <div className="w-3 h-3 rounded-full bg-[#24D26D] mr-2"></div>
                    <span>{SectorSat[1].name}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

        </div>
        { /* tableau  */}
        <div className="w-full">
          <Card className='border border-gray-100 shadow-gray-100'>
            <div className="flex items-center gap-10 mb-4 px-4 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-[#FF4000] text-white rounded-md">Effectif</span>
                  <span className="px-2 py-1 border rounded-md">{dataTabsUsers.length.toString().padStart(2, "0")}</span>
                </div>
              </div>
              <div className="relative w-full">
                <Input
                  type='text'
                  onChange={(e) => {
                    setSearchUser(e.target.value.toLowerCase());
                  }}
                  value={searchUser}
                  className="pl-8 w-full "
                  placeholder="rechercher un nom"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center space-x-4">

                <Button
                  variant="destructive"
                  className="flex items-center bg-[#FF4000] hover:bg-[#FF4000]/90"
                  onClick={() => setFilter(true)}
                >
                  <Filter className="mr-2 h-4 w-4"

                  />
                  Filtrer
                </Button>
                <Button
                  variant="destructive"
                  className="flex items-center bg-[#FF4000] hover:bg-[#FF4000]/90"
                  onClick={handleReload}
                >
                  <Loader2 className={`mr-2 h-4 w-4 ${load ? "animate-spin duration-300" : ""}`}

                  />
                  Recharger
                </Button>
                <Button
                  variant="default"
                  className="flex items-center cursor-pointer"
                  onClick={() => route.push("/dashboard/users/new")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New user
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className=" p-2">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-46 rounded-lg shadow-lg border border-gray-200 p-2"
                  >
                    {/* telecharger le pdf */}
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer  hover:rounded-lg hover:shadow-gray-200">
                      <div className="flex items-center"

                      >
                        <div className="bg-gray-100 p-1.5 rounded-full mr-3">
                          <FileText className="h-4 w-4 text-gray-500" />
                        </div>
                        <span>Exporter le pdf</span>
                      </div>
                    </DropdownMenuItem>

                    {/* telecharger le fichier excel */}
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer  hover:rounded-lg hover:shadow-gray-200">
                      <div className="flex items-center"

                      >
                        <div className="bg-gray-100 p-1.5 rounded-full mr-3">
                          <File className="h-4 w-4 text-gray-500" />
                        </div>
                        <span>Exporter l'excel</span>
                      </div>
                    </DropdownMenuItem>

                    {/* Item Supprimer */}

                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className=" overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow className="">
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Utilisateurs</TableHead>
                    <TableHead>Contacts</TableHead>
                    <TableHead>Provenance</TableHead>
                    <TableHead >Catégories</TableHead>
                    <TableHead>Option(s)</TableHead>
                    <TableHead>Date d'entrée</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataTabsUsers.map((user, index) => (
                    <TableRow
                      key={index}
                      className={`${index % 2 === 0 ? "bg-[#FFAE91]/10 " : ""}  `}
                    >
                      <TableCell>
                        <div className="flex items-center justify-center w-8 h-8 bg-[#FFAE91] text-white rounded-full">
                          {user?.firstName?.charAt(0)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{user?.firstName} {user?.lastName}</div>
                          <div className="text-[#FF4000] text-sm">{user?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{user?.contact}</TableCell>
                      <TableCell>{user?.provence}</TableCell>
                      <TableCell >
                        {user?.category} Fcfa
                      </TableCell>
                      <TableCell>[{user?.listOptions?.join('; ')}]</TableCell>
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
                            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer  hover:rounded-lg hover:shadow-gray-200">
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
                            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer  hover:rounded-lg hover:shadow-gray-200">
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
                            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer  hover:rounded-lg hover:shadow-gray-200">
                              <div className="flex items-center"
                                onClick={() => {
                                  setOpenDeleteModale(true);
                                  setNameActive(`la catégorie ${user?.category}Fcfa de  ${user?.firstName} ${user?.lastName}`)
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
              onClick={() => { console.log("dddd") }}

              className="bg-orange-500 hover:bg-orange-600">
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default UserAll