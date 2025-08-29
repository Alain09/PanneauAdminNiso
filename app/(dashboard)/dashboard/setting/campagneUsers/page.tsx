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
import { Button } from "@/src/components/ui/button";
import { MoreVertical } from "lucide-react";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";

// Données initiales pour le tableau


const campagnes = [
  {
    id: "camp1",
    nom: "Tontine Printemps",
    status: "EN ATTENTE",
    dureeSelectionJours: 3,
    dureeTontineSemaines: 8,
    selectionStart: new Date("2025-05-15T08:00:00Z"),
    selectionEnd: new Date("2025-05-18T08:00:00Z"),
    tontineStart: new Date("2025-05-18T08:00:00Z"),
    tontineEnd: new Date("2025-07-13T08:00:00Z"),
    createdAt: new Date("2025-05-01T10:00:00Z"),
  },
  {
    id: "camp2",
    nom: "Tontine Été",
    status: "EN COURS DE SELECTION",
    dureeSelectionJours: 4,
    dureeTontineSemaines: 10,
    selectionStart: new Date("2025-05-10T09:00:00Z"),
    selectionEnd: new Date("2025-05-14T09:00:00Z"),
    tontineStart: new Date("2025-05-14T09:00:00Z"),
    tontineEnd: new Date("2025-07-23T09:00:00Z"),
    createdAt: new Date("2025-04-25T12:00:00Z"),
  },
  {
    id: "camp3",
    nom: "Tontine Spéciale Femmes",
    status: "EN COURS DE TONTINE",
    dureeSelectionJours: 5,
    dureeTontineSemaines: 12,
    selectionStart: new Date("2025-04-15T10:00:00Z"),
    selectionEnd: new Date("2025-04-20T10:00:00Z"),
    tontineStart: new Date("2025-04-20T10:00:00Z"),
    tontineEnd: new Date("2025-07-15T10:00:00Z"),
    createdAt: new Date("2025-03-30T08:30:00Z"),
  },
  {
    id: "camp4",
    nom: "Tontine Entrepreneurs",
    status: "TERMINER",
    dureeSelectionJours: 2,
    dureeTontineSemaines: 6,
    selectionStart: new Date("2025-01-01T09:00:00Z"),
    selectionEnd: new Date("2025-01-03T09:00:00Z"),
    tontineStart: new Date("2025-01-03T09:00:00Z"),
    tontineEnd: new Date("2025-02-14T09:00:00Z"),
    createdAt: new Date("2024-12-15T11:00:00Z"),
  },
  {
    id: "camp5",
    nom: "Tontine Jeunesse",
    status: "TERMINER",
    dureeSelectionJours: 3,
    dureeTontineSemaines: 9,
    selectionStart: new Date("2025-06-01T08:00:00Z"),
    selectionEnd: new Date("2025-06-04T08:00:00Z"),
    tontineStart: new Date("2025-06-04T08:00:00Z"),
    tontineEnd: new Date("2025-08-06T08:00:00Z"),
    createdAt: new Date("2025-05-05T10:00:00Z"),
  },
  {
    id: "camp6",
    nom: "Tontine Spéciale Ramadan",
    status: "TERMINER",
    dureeSelectionJours: 7,
    dureeTontineSemaines: 4,
    selectionStart: new Date("2025-05-10T05:00:00Z"),
    selectionEnd: new Date("2025-05-17T05:00:00Z"),
    tontineStart: new Date("2025-05-17T05:00:00Z"),
    tontineEnd: new Date("2025-06-14T05:00:00Z"),
    createdAt: new Date("2025-04-25T07:00:00Z"),
  },
  {
    id: "camp7",
    nom: "Tontine Voyage Été",
    status: "TERMINER",
    dureeSelectionJours: 5,
    dureeTontineSemaines: 8,
    selectionStart: new Date("2025-06-15T08:00:00Z"),
    selectionEnd: new Date("2025-06-20T08:00:00Z"),
    tontineStart: new Date("2025-06-20T08:00:00Z"),
    tontineEnd: new Date("2025-08-15T08:00:00Z"),
    createdAt: new Date("2025-05-15T08:00:00Z"),
  },
  {
    id: "camp8",
    nom: "Tontine Solidarité",
    status: "TERMINER",
    dureeSelectionJours: 3,
    dureeTontineSemaines: 5,
    selectionStart: new Date("2025-04-10T06:00:00Z"),
    selectionEnd: new Date("2025-04-13T06:00:00Z"),
    tontineStart: new Date("2025-04-13T06:00:00Z"),
    tontineEnd: new Date("2025-05-18T06:00:00Z"),
    createdAt: new Date("2025-03-28T08:00:00Z"),
  },
  {
    id: "camp9",
    nom: "Tontine Noël",
    status: "TERMINER",
    dureeSelectionJours: 2,
    dureeTontineSemaines: 6,
    selectionStart: new Date("2024-12-01T08:00:00Z"),
    selectionEnd: new Date("2024-12-03T08:00:00Z"),
    tontineStart: new Date("2024-12-03T08:00:00Z"),
    tontineEnd: new Date("2025-01-14T08:00:00Z"),
    createdAt: new Date("2024-11-15T08:00:00Z"),
  },
  {
    id: "camp10",
    nom: "Tontine Back To School",
    status: "TERMINER",
    dureeSelectionJours: 4,
    dureeTontineSemaines: 7,
    selectionStart: new Date("2025-08-01T08:00:00Z"),
    selectionEnd: new Date("2025-08-05T08:00:00Z"),
    tontineStart: new Date("2025-08-05T08:00:00Z"),
    tontineEnd: new Date("2025-09-23T08:00:00Z"),
    createdAt: new Date("2025-07-10T09:00:00Z"),
  }
];

export default function Campagn() {
  const [data] = useState(campagnes);

  // modalpour la supression
  const [aut, setAut] = useState(true);
  const [openDeleteModale, setOpenDeleteModale] = useState(false);
  const targetEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.toUpperCase() === "DELETE" ? setAut(false) : setAut(true);
  };

  const [nameActive, setNameActive] = useState("");

  // modal pour le formulaire d'ajout de creation de campagne
  const [openNewModale, setOpenNewModale] = useState(false);

  return (
    <div className="w-full flex gap-x-10 transition-all duration-300  p-6">
      <div className="w-full ">
        <div className="flex justify-between items-center mb-4">
          <Button
            className="bg-[#FF4000] hover:bg-[#FF4000]/90 text-white"
            onClick={() => { setOpenNewModale(true); }}
          >
            Créer une Campagne
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="font-medium">Nom</TableHead>
                <TableHead className="font-medium">DébutSelection</TableHead>
                <TableHead className="font-medium">FinSelection</TableHead>
                <TableHead className="font-medium">DébutTontine</TableHead>
                <TableHead className="font-medium">FinTontine</TableHead>
                <TableHead className="font-medium w-16">Statut</TableHead>
                <TableHead className="font-medium w-16">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? "bg-[#FFAE91]/10 " : ""}
                >
                  <TableCell>{row.nom}</TableCell>
                  <TableCell>{new Date(row.selectionStart).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(row.selectionEnd).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(row.tontineStart).toLocaleDateString()}</TableCell>
                  <TableCell >{new Date(row.tontineEnd).toLocaleDateString()}</TableCell>
                  <TableCell >
                    <Badge
                      className={
                        row.status === "TERMINER"
                          ? "text-xs text-green-600 bg-green-100 py-1 px-2 rounded"
                          : "text-xs text-blue-600 bg-blue-100 py-1 px-2 rounded"
                      }
                    >
                      • {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setOpenDeleteModale(true);
                            setNameActive(` ${row.nom} `);
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

      { /* POUR LA SUPPRESSION  */}
      <Dialog open={openDeleteModale} onOpenChange={setOpenDeleteModale} >
        <DialogContent className="sm:max-w-md ">
          <DialogHeader>
            <DialogTitle>SUPPRESSION</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 ">
            <p className="text-sm text-muted-foreground">
              Pour supprimer la campagne <span className=' font-semibold text-gray-900'>{nameActive} </span> entrer <span className='text-red-600 font-semibold'>DELETE</span> dans le formulaire ci-dessous
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
              className="bg-[#FF4000] hover:bg-[#FF4000]/90">
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      { /* POUR LA CREATION DE CAMPAGNE  */}
      <Dialog open={openNewModale} onOpenChange={setOpenNewModale} >
        <DialogContent className="sm:max-w-md ">
          <form action={() => { alert("succes"); }}>
            <DialogHeader className=" mb-5">
              <DialogTitle>CREATION DE CAMPAGNE</DialogTitle>
              <DialogDescription>Ce formulaire sert de création d&apos;une nouvelle campagne</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* nom */}
              <div className="space-y-6">
                <label className="text-sm font-medium">Nom:</label>
                <Input
                  type="text"
                  id="nom"
                  name="nom"
                  className=" w-full "
                  placeholder="entrer un nom"
                  required
                />
              </div>

              {/* StartDate */}
              <div className="space-y-6">
                <label className="text-sm font-medium">Date de démarage</label>
                <Input
                  type="date"
                  id="selectionStart"
                  name="selectionStart"
                  className=" w-full "
                  required
                />
              </div>

              {/* Opération des choix */}
              <div className="">
                <label className="text-sm font-medium ">Total jour pour les choix</label>
                <Input
                  type="number"
                  id="dureeSelectionJours"
                  name="dureeSelectionJours"
                  className=" w-full "
                  required
                />
              </div>

               {/* Opération des tontine*/}
              <div className="">
                <label className="text-sm font-medium ">Total semaine pour tontine </label>
                <Input
                  type="number"
                  id="dureeTontineSemaines"
                  name=" dureeTontineSemaines"
                  className=" w-full "
                  required
                />
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
    </div>
  );
}