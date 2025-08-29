"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { MoreVertical } from "lucide-react";
import { Card } from "@/src/components/ui/card";

import { useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";

// Données initiales pour le tableau

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

const initialData = [
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 1, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "300Fcfa", option: 2, prix: 2400, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "200Fcfa", option: 1, prix: 1600, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 3, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 5, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "500Fcfa", option: 1, prix: 4000, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 1, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 1, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 1, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 1, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 1, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 1, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 1, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 1, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 1, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 1, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 1, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
  { id: generateId(), date: "20/04/2025", categorie: "100Fcfa", option: 1, prix: 800, composants: "2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz, 2 bidon, 1 sac de riz," },
];

export default function Catalogue() {
  const [data] = useState(initialData);
  const [filter, setFilter] = useState("Tout");

  //slide gauche 
  const [open, setOpen] = useState(false);

  // Filtrer les données en fonction de la catégorie sélectionnée
  const filteredData = filter === "Tout"
    ? data
    : data.filter(item => item.categorie === filter);

  // Obtenir les catégories uniques pour le filtre
  const uniqueCategories = ["Tout", ...new Set(data.map(item => item.categorie))];

  //
  const route = useRouter()

  // modalpour la supression
  const [aut, setAut] = useState(true)
  const [openDeleteModale, setOpenDeleteModale] = useState(false)
  const targetEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.toUpperCase() === "DELETE" ? setAut(false) : setAut(true)
  }

  const [nameActive, setNameActive] = useState("")

  return (
    <div className="w-full flex gap-x-10 transition-all duration-300  p-6">
      <div className="w-full ">
        <div className="flex justify-between items-center mb-4">
          <Button
            className="bg-[#FF4000] hover:bg-[#FF4000]/90 text-white"
            onClick={() => { route.push("/dashboard/catalogues/new") }}
          >
            New Catalogue
          </Button>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32 bg-zinc-800 text-white">
              <SelectValue placeholder="Tout" />
            </SelectTrigger>
            <SelectContent>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="font-medium">Date</TableHead>
                <TableHead className="font-medium">Catégorie</TableHead>
                <TableHead className="font-medium">Option</TableHead>
                <TableHead className="font-medium">Prix Hebdo</TableHead>
                <TableHead className="font-medium">Composants</TableHead>
                <TableHead className="font-medium w-16">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? "bg-[#FFAE91]/10 " : ""}
                  onClick={() => setOpen(true)} // Ouvrir le slide gauche au clic
                >
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.categorie}</TableCell>
                  <TableCell>{row.option}</TableCell>
                  <TableCell>{row.prix}</TableCell>
                  <TableCell className="truncate max-w-[150px]">{row.composants}</TableCell>
                  <TableCell>
                    <DropdownMenu >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => route.push(`/dashboard/catalogues/edit/${row.id}`)}
                        >
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setOpenDeleteModale(true);
                            setNameActive(`l'option ${row.option} de ${row.categorie}`)
                          }}
                        >
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {open && (
        <Card className="h-screen transition-all duration-300 p-4 w-[500px]">
          <div className="flex justify-between items-center pb-5  border-b">
            <h2 className="text-medium font-semibold">Détails du catalogue</h2>
            <Button className=" text-sm py-1 px-2" onClick={() => setOpen(false)}>
              Fermer
            </Button>
          </div>
          <div className="p-4">
            {/* Contenu du slide gauche */}
            <p>Contenu du slide gauche</p>
          </div>
        </Card>
      )}

      { /* POUR LA SUPPRESSION  */}
      <Dialog open={openDeleteModale} onOpenChange={setOpenDeleteModale}>
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
              className="bg-[#FF4000] hover:bg-[#FF4000]/90">
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}