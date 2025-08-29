"use client";

import React, { useState, useEffect } from "react";
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
  const [selectedRow, setSelectedRow] = useState<CatalogueItem | null>();
  const [open, setOpen] = useState(true); // Ouvrir par défaut

  const route = useRouter();

  interface CatalogueItem {
    id: string; 
    date: string;
    categorie: string;
    option: number;
    prix: number;
    composants: string;
  }




  // Filtrer les données en fonction de la catégorie sélectionnée
  const filteredData : CatalogueItem[] = filter === "Tout"
    ? data
    : data.filter(item => item.categorie === filter);

  // Obtenir les catégories uniques pour le filtre
  const uniqueCategories = ["Tout", ...new Set(data.map(item => item.categorie))];

  // Sélectionner la première ligne par défaut
  useEffect(() => {
    if (filteredData.length > 0 && !selectedRow) {
      setSelectedRow(filteredData[0] as CatalogueItem);
    }
  }, [filteredData, selectedRow]);

  // Mettre à jour la sélection lorsque les données filtrées changent
  useEffect(() => {
    if (filteredData.length > 0) {
      // Si la ligne sélectionnée n'existe plus dans les données filtrées, sélectionner la première
      if (!selectedRow || !filteredData.find(item => item.id === selectedRow.id)) {
        setSelectedRow(filteredData[0]);
      }
    } else {
      setSelectedRow(null);
    }
  }, [filteredData]);

  // modal pour la suppression
  const [aut, setAut] = useState(true);
  const [openDeleteModale, setOpenDeleteModale] = useState(false);
  const targetEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const research = e.target.value.toUpperCase() === "DELETE" ? setAut(false) : setAut(true);
    return research;
  };

  const [nameActive, setNameActive] = useState("");

  const handleRowClick = (row: CatalogueItem) => {
    setSelectedRow(row);
    setOpen(true);
  };

  return (
    <div className="w-full flex gap-x-10 transition-all duration-300 p-6">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <Button
            className="bg-[#FF4000] hover:bg-[#FF4000]/90 text-white"
            onClick={() => { route.push("/dashboard/catalogues/new"); }}
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
                  key={row.id}
                  className={`
                    ${index % 2 === 0 ? "bg-[#FFAE91]/10 " : ""}
                    ${selectedRow?.id === row.id ? "bg-blue-100 ring-2 ring-blue-300" : ""}
                    cursor-pointer hover:bg-gray-50
                  `}
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.categorie}</TableCell>
                  <TableCell>{row.option}</TableCell>
                  <TableCell>{row.prix}</TableCell>
                  <TableCell className="truncate max-w-[150px]">{row.composants}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
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
                            setNameActive(`l'option ${row.option} de ${row.categorie}`);
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

      {/* Slide droit avec les détails */}
      {open && selectedRow && (
        <Card className="h-screen transition-all duration-300 p-4 w-[500px] sticky top-6">
          <div className="flex justify-between items-center pb-5 border-b">
            <h2 className="text-medium font-semibold">Détails du catalogue</h2>
            <Button className="text-sm py-1 px-2" onClick={() => setOpen(false)}>
              Fermer
            </Button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700">Informations</h3>
              <p><strong>Date:</strong> {selectedRow.date}</p>
              <p><strong>Catégorie:</strong> {selectedRow.categorie}</p>
              <p><strong>Option:</strong> {selectedRow.option}</p>
              <p><strong>Prix Hebdo:</strong> {selectedRow.prix} Fcfa</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700">Composants</h3>
              <p className="whitespace-normal break-words">{selectedRow.composants}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Modal pour la suppression */}
      <Dialog open={openDeleteModale} onOpenChange={setOpenDeleteModale}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>SUPPRESSION</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Pour supprimer <span className='font-semibold text-gray-900'>{nameActive}</span> entrer <span className='text-red-600 font-semibold'>DELETE</span> dans le formulaire ci-dessous
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  className="w-full"
                  onChange={targetEnter}
                  placeholder="Tapez DELETE pour confirmer"
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
              onClick={() => { console.log("Suppression confirmée"); }}
              className="bg-[#FF4000] hover:bg-[#FF4000]/90"
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}