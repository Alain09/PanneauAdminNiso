"use client"
import {  File, FileText, Loader2} from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Search, MoreVertical, Filter} from "lucide-react";

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

import { Badge } from "@/src/components/ui/badge";
import { Card } from '@/src/components/ui/card';

import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/src/components/ui/dropdown-menu';

// Types
interface UserListPaiement {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentlyPaiement: number;
  categorie: string;
  amountbyWeekOfCategoriy: number;
  date: Date;
  status: "succès" | "succès";
}

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

function Page() {
 
  
  const [usersPaiement] = useState<UserListPaiement[]>(
    [
      {
        id: generateId(),
        name: "Kohn Carter",
        email: "hello@johncarter.com",
        phone: "+229 0162538947",
        currentlyPaiement: 3500,
        categorie: "100",
        amountbyWeekOfCategoriy: 1600,
        date: new Date(),
        status: "succès",
      },
      {
        id: generateId(),
        name: "John Carter",
        email: "hello@johncarter.com",
        phone: "+229 0162538947",
        currentlyPaiement: 3500,
        categorie: "100",
        amountbyWeekOfCategoriy: 1600,
        date: new Date(),
        status: "succès",
      },
      {
        id: generateId(),
        name: "John Carter",
        email: "hello@johncarter.com",
        phone: "+229 0162538947",
        currentlyPaiement: 3500,
        categorie: "100",
        amountbyWeekOfCategoriy: 1600,
        date: new Date(),
        status: "succès",
      },
      {
        id: generateId(),
        name: "John Carter",
        email: "hello@johncarter.com",
        phone: "+229 0162538947",
        currentlyPaiement: 3500,
        categorie: "200",
        amountbyWeekOfCategoriy: 1600,
        date: new Date(),
        status: "succès",
      },
      {
        id: generateId(),
        name: "John Carter",
        email: "hello@johncarter.com",
        phone: "+229 0162538947",
        currentlyPaiement: 3500,
        categorie: "100",
        amountbyWeekOfCategoriy: 1600,
        date: new Date(),
        status: "succès",
      },
      {
        id: generateId(),
        name: "John Carter",
        email: "hello@johncarter.com",
        phone: "+229 0162538947",
        currentlyPaiement: 3500,
        categorie: "100",
        amountbyWeekOfCategoriy: 1600,
        date: new Date(),
        status: "succès",
      },
      {
        id: generateId(),
        name: "John Carter",
        email: "hello@johncarter.com",
        phone: "+229 0162538947",
        currentlyPaiement: 3500,
        categorie: "100",
        amountbyWeekOfCategoriy: 1600,
        date: new Date(),
        status: "succès",
      },
      {
        id: generateId(),
        name: "John Carter",
        email: "hello@johncarter.com",
        phone: "+229 0162538947",
        currentlyPaiement: 3500,
        categorie: "100",
        amountbyWeekOfCategoriy: 1600,
        date: new Date(),
        status: "succès",
      },
      {
        id: generateId(),
        name: "John Carter",
        email: "hello@johncarter.com",
        phone: "+229 0162538947",
        currentlyPaiement: 3500,
        categorie: "100",
        amountbyWeekOfCategoriy: 1600,
        date: new Date(),
        status: "succès",
      },
      {
        id: generateId(),
        name: "John Carter",
        email: "hello@johncarter.com",
        phone: "+229 0162538947",
        currentlyPaiement: 3500,
        categorie: "100",
        amountbyWeekOfCategoriy: 1600,
        date: new Date(),
        status: "succès",
      },
      {
        id: generateId(),
        name: "John Carter",
        email: "hello@johncarter.com",
        phone: "+229 0162538947",
        currentlyPaiement: 3500,
        categorie: "100",
        amountbyWeekOfCategoriy: 1600,
        date: new Date(),
        status: "succès",
      },
      {
        id: generateId(),
        name: "John Carter",
        email: "hello@johncarter.com",
        phone: "+229 0162538947",
        currentlyPaiement: 3500,
        categorie: "100",
        amountbyWeekOfCategoriy: 1600,
        date: new Date(),
        status: "succès",
      },
    ]);

  const [usersData, setUsersData] = useState<UserListPaiement[]>(usersPaiement)
  const [filter, setFilter] = useState(false)
  const [selectedCategorie, setSelectedCategorie] = useState<string>("");
  const [searchUser, setSearchUser] = useState<string>("");
  const [selectDate, setSelectDate] = useState<Date>()
  const [load, setLoad] = useState(false)

  // Exemple de données de tontines - à remplacer par vos données réelles
  const categories = [... new Set(usersPaiement.flatMap(prev => prev.categorie))]

  // Filter references when search query changes
  useEffect(() => {
    if (searchUser.trim() === '') {
      setUsersData(usersPaiement)
    } else {
      const filteredData = usersPaiement.filter((user) =>
        user?.name?.toLowerCase().includes(searchUser))
      setUsersData(filteredData);
    }
  }, [searchUser, usersPaiement])

  // fonction de filtrage
  const handleFilter = () => {
    const filteredData = usersPaiement.filter((user) => {
      const matchesCategory = selectedCategorie ? user.categorie === selectedCategorie : true;
      const matchesDate = selectDate ? user.date === selectDate : true;
      return matchesCategory && matchesDate;
    });
    setUsersData(filteredData);
    setFilter(false);
  };

  //----------------fonction de formatage 
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date?.toISOString().split('T')[0] as string;
  }

  // fonction de rechargement
  const handleReload = () => {
    setLoad(true)
    setUsersData(usersPaiement);
    setSelectedCategorie("");
    setSearchUser("");
    setSelectDate(undefined);
    setTimeout(() => {
      setLoad(false)
    }, 1000)
  };

  return (
    <div>
      <main className=' p-6'>
        { /* tableau  */}
        <div className="w-full">
          <Card className='border border-gray-100 shadow-gray-100'>
            <div className="flex items-center gap-10 mb-4 px-4 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-[#FF4000] text-white rounded-md">Effectif</span>
                  <span className="px-2 py-1 border rounded-md">{usersData.length.toString().padStart(2, "0")}</span>
                </div>
              </div>
              <div className="relative w-full">
                <Input
                  type='text'
                  className="pl-8 w-full "
                  value={searchUser}
                  onChange={(e) => { setSearchUser(e.target.value.toLowerCase()) }}
                  placeholder="rechercher un nom"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center space-x-4">
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
                  variant="destructive"
                  className="flex items-center bg-[#FF4000] hover:bg-[#FF4000]/90"
                  onClick={() => setFilter(true)}
                >
                  <Filter className="mr-2 h-4 w-4"
                  />
                  Filtrer
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
                        <span>Exporter l&apos;excel</span>
                      </div>
                    </DropdownMenuItem>
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
                    <TableHead>Numero de transaction</TableHead>
                    <TableHead>Montant payé</TableHead>
                    <TableHead>Catégorie choisie</TableHead>
                    <TableHead>A payer/S</TableHead>
                    <TableHead>Date d&apos;entrée</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>

                </TableHeader>
                <TableBody>
                  {usersData.map((user, index) => (
                    <TableRow
                      key={user.id}
                      className={`${index % 2 === 0 ? "bg-[#FFAE91]/10" : ""}  `}
                    >
                      <TableCell>
                        <div className="flex items-center justify-center w-8 h-8 bg-[#FFAE91] text-white rounded-full">
                          {user.name.charAt(0)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{user.name}</div>
                          <div className="text-[#FF4000] text-sm">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.currentlyPaiement}</TableCell>
                      <TableCell>{user.categorie} Fcfa</TableCell>
                      <TableCell>{user.amountbyWeekOfCategoriy}</TableCell>
                      <TableCell>{new Date(user.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === "succès" ? "default" : "outline"}
                          className={
                            user.status === "succès"
                              ? "text-xs text-green-600 bg-green-100 py-1 px-2 rounded"
                              : "text-xs text-blue-600 bg-blue-100 py-1 px-2 rounded"
                          }
                        >
                          • {user.status === "succès" ? "succès" : "succès"}
                        </Badge>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

        </div>
      </main>

      <Dialog open={filter} onOpenChange={setFilter} >
        <DialogContent className="sm:max-w-md ">
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
                    <SelectValue placeholder="Sélectionner une tontine" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((tontine, index) => (
                      <SelectItem key={index} value={tontine}>
                        {tontine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* provenance */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date de paiement</label>
                <Input
                  type='date'
                  value={formatDate(selectDate)}
                  onChange={(e) => { setSelectDate(new Date(e.target.value)) }}
                  className=" w-full "
                  placeholder="entrer une provenance"
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
              onClick={handleFilter}
              className="bg-[#FF4000] hover:bg-[#FF4000]/90">
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Page