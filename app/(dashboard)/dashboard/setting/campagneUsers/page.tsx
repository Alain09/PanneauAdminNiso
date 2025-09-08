"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { AlertCircle, MoreVertical, SquareCheckBig } from "lucide-react";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import { useSession } from "@/src/lib/auth-client";
import { Campagne } from "@/type";
import { Alert, AlertDescription } from "@/src/components/ui/alert";

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
  const [campagneData, setCampagneData] = useState<Campagne[]>([]); // les donnees  receullir
  const [campPost, setCampPost] = useState<Campagne>()

  const { isPending } = useSession()
  const [sendError, setSendError] = useState("");
  const [loading, setLoading] = useState(false)

  //--------------------------
  const [sendSubmitError, setSendSubmitError] = useState("");
  const [sendSubmitSuccess, setSendSubmitSuccess] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false)
  //------------------------

  //------------------------------
  const [campDelete, setCampDelete] = useState<Campagne>()
  const [nameActive, setNameActive] = useState("");
  //-------------------------------------

  // api pour recuperation des coordonnées de l'admins
  useEffect(() => {

    const getAllCampagne = async () => {
      //recuperation de l'key access
      const key_acces = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;

      // ---------loarding before success endpoint
      setLoading(true)

      // try for execution endpoint
      try {
        const datas = await fetch("/api/settng/campagne/",
          {
            method: "GET",
            headers: { "authorization": `${key_acces}` }
          })

        // erreur de recuperation 
        if (!datas.ok) {
          setSendError(" Erreur lors du chargement de la campagne ")
          setLoading(false)
        }

        const campDt = await datas.json();

        if (!campDt.success) {
          setSendError(campDt.message)
          setLoading(false)
        } else {
          setSendError("");
          //alert(" donnees bien chargé")
          setCampagneData(campDt.data)

        }

      } catch (error) {
        console.error("Erreur lors de la récupération des  profiles :", error);
        setSendError(" erreur server");
      } finally { setLoading(false) }

    };

    getAllCampagne();

  }, [])


  // modalpour la supression
  const ref = useRef<HTMLInputElement>(null)
  const [aut, setAut] = useState(true);
  const [openDeleteModale, setOpenDeleteModale] = useState(false);
  const targetEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reseach = e.target.value.toUpperCase() === "DELETE" ? setAut(false) : setAut(true);
    return reseach;
  };


  // modal pour le formulaire d'ajout de creation de campagne
  const [openNewModale, setOpenNewModale] = useState(false);

  const handleDelete = async () => {
    setSendSubmitError("");
    setSendSubmitSuccess("");
    setLoadSubmit(true);

    try {
      const datas = await fetch(`/api/settng/campagne/${campDelete?.id}`, {
        method: "DELETE",
        headers: {
          "authorization": process.env.NEXT_PUBLIC_API_ROUTE_SECRET || "",
          "Content-Type": "application/json", // Ajout de ce header
        },
      });

      const result = await datas.json();

      if (result.success) {
        setSendSubmitSuccess(result.message);
        setCampagneData(prev => prev.filter(member => member.id !== campDelete?.id));
        setTimeout(() => setOpenDeleteModale(false), 1000); // Fermer après succès
      } else {
        setSendSubmitError(result.message);
      }

    } catch (error) {
      setSendSubmitError("Erreur de connexion lors de la suppression");
      console.error(error);
    } finally {
      setLoadSubmit(false);
    }
  };

  // poour la creaton des campagnes 'lapi route de cretion 

  //------------------les etats----------------//
  const [sendCreatError, setSendCreatError] = useState("");
  const [sendCreatSuccess, setSendCreatSuccess] = useState("");
  const [loadCreat, setLoadCreat] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCampPost((prev) => ({ ...prev, [name]: value }));

  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // empêcher le rechargement

    setSendCreatError("");
    setSendCreatSuccess("");
    setLoadCreat(true);

    try {
      const datas = await fetch(`/api/settng/campagne/`, {
        method: "POST",
        headers: {
          "authorization": process.env.NEXT_PUBLIC_API_ROUTE_SECRET || "",
          "Content-Type": "application/json", // Ajout de ce header
        },
        body: JSON.stringify(campPost)
      });

      const result = await datas.json();

      if (result.success) {
        setSendCreatSuccess(result.message);
        setLoadCreat(false)
        setCampagneData((prev) => [...prev, result.data]);
        setTimeout(() => setOpenNewModale(false), 1000); // Fermer après succès

      } else {
        setSendCreatError(result.message);
      }

    } catch (error) {
      setSendCreatError("Erreur de connexion lors de la suppression");
      console.error(error);
    } finally {
      setLoadCreat(false);
    }
  };

// ******************* 
  useEffect(()=>{
    if(!openDeleteModale){
      setSendSubmitSuccess("")
    }
  },[openDeleteModale])

  //*****************  */

  //------------------------------ POUR LA FERMETURE DES MESSAGE DE SUCCES OU ERREUR
  // ******************* 
    useEffect(()=>{
      if(!openNewModale){
        setSendCreatSuccess("")
      }
    },[openNewModale])
  
  
    //*****************  */

  //------------for loading before page is tring up 
  if (loading || isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // ------------ la gestion des erreures 
  {/* Messages d'erreur */ }
  if (sendError) {
    return (
      <main className="p-4">
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">
            {sendError}
          </AlertDescription>
        </Alert>
      </main>
    )
  }

  return (
    <div className="w-full p-4 md:p-6">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <Button
            className="bg-[#FF4000] hover:bg-[#FF4000]/90 text-white text-sm md:text-base"
            onClick={() => { setOpenNewModale(true); }}
          >
            Créer une Campagne
          </Button>
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="font-medium">Nom</TableHead>
                <TableHead className="font-medium">DébutSélection</TableHead>
                <TableHead className="font-medium">FinSélection</TableHead>
                <TableHead className="font-medium">DébutTontine</TableHead>
                <TableHead className="font-medium">FinTontine</TableHead>
                <TableHead className="font-medium">CampagneStatut</TableHead>
                <TableHead className="font-medium">SemaineActive</TableHead>
                <TableHead className="font-medium w-16">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campagneData.map((row, index) => (
                <TableRow
                  key={row.id || index}
                  className={index % 2 === 0 ? "bg-[#FFAE91]/10 " : ""}
                >
                  <TableCell className="whitespace-nowrap">{row.nom}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.selectionStart ? new Date(row.selectionStart).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.selectionEnd ? new Date(row.selectionEnd).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.tontineStart ? new Date(row.tontineStart).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.tontineEnd ? new Date(row.tontineEnd).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        row.campagneStatut === "Terminer"
                          ? "text-xs text-green-600 bg-green-100 py-1 px-2 rounded whitespace-nowrap"
                          : row.status === "En cours"
                            ? "text-xs text-blue-600 bg-blue-100 py-1 px-2 rounded whitespace-nowrap"
                            : row.status === "En selection"
                              ? "text-xs text-orange-600 bg-orange-100 py-1 px-2 rounded whitespace-nowrap"
                              : "text-xs text-gray-600 bg-gray-100 py-1 px-2 rounded whitespace-nowrap"
                      }
                    >
                      • {row.campagneStatut}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.weekActif}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-red-600 text-xs md:text-sm"
                          onClick={() => {
                            setOpenDeleteModale(true);
                            setNameActive(` ${row.nom} `);
                            setCampDelete(row);
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
      <Dialog open={openDeleteModale} onOpenChange={setOpenDeleteModale}>
        <DialogContent className="sm:max-w-md mx-4 w-fit">
          <DialogHeader>
            <DialogTitle>SUPPRESSION</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">

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
                  {sendSubmitSuccess}
                </AlertDescription>
              </Alert>
            }


            <div className="text-sm text-muted-foreground">
              Pour supprimer <span className='font-semibold text-gray-900'>{nameActive}</span> entrer <span className='text-red-600 font-semibold'>DELETE</span> dans le formulaire ci-dessous
            </div>
            <div className="space-y-4">
              {/* Entrer */}
              <div className="space-y-2">
                <Input
                  className="w-full"
                  ref={ref}
                  onChange={(e) => targetEnter(e)}
                  placeholder="Tapez DELETE pour confirmer"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="mr-2"
                onClick={() => {
                  setSendSubmitError("");
                  setSendSubmitSuccess("");
                  if (ref.current) {
                    ref.current.value = "";
                  }
                }}>
                Annuler
              </Button>

            </DialogClose>
            <Button
              disabled={aut}
              type='submit'
              onClick={() => {
                handleDelete();

              }}
              className="bg-[#FF4000] hover:bg-[#FF4000]/90">
              {loadSubmit ? " en cour..." : "Confirmer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      { /* POUR LA CREATION DE CAMPAGNE  */}
      <Dialog open={openNewModale} onOpenChange={setOpenNewModale}>
        <DialogContent className="sm:max-w-md mx-4">
          <form onSubmit={handleCreate}>
            <DialogHeader className="mb-4">
              <DialogTitle>CREATION DE CAMPAGNE</DialogTitle>
              <DialogDescription className="text-sm">
                Ce formulaire sert de création d&apos;une nouvelle campagne
              </DialogDescription>
              {sendCreatError &&
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-700">
                    {sendCreatError}
                  </AlertDescription>
                </Alert>
              }
              {sendCreatSuccess &&
                <Alert className="border-green-200 bg-green-50">
                  <SquareCheckBig className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-700">
                    {sendCreatSuccess}
                  </AlertDescription>
                </Alert>
              }
            </DialogHeader>

            <div className="space-y-4">
              {/* nom */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom:</label>
                <Input
                  type="text"
                  id="nom"
                  name="nom"
                  className="w-full"
                  onChange={handleChange}
                  placeholder="entrer un nom"
                  required
                />
              </div>

              {/* StartDate */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date de démarage</label>
                <Input
                  type="date"
                  id="selectionStart"
                  name="selectionStart"
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              {/* Opération des choix */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Total jour pour les choix</label>
                <Input
                  type="number"
                  id="dureeSelectionJours"
                  name="dureeSelectionJours"
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              {/* Opération des tontine*/}
              <div className="space-y-2">
                <label className="text-sm font-medium">Total semaine pour tontine</label>
                <Input
                  type="number"
                  id="dureeTontineSemaines"
                  name="dureeTontineSemaines"
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>
            </div>

            <DialogFooter className='mt-4'>
              <DialogClose asChild>
                <Button variant="outline" className="mr-2"
                  onClick={() => { setSendCreatError(""), setSendCreatSuccess("") }}
                >
                  Annuler
                </Button>
              </DialogClose>
              <Button type='submit' className="bg-[#FF4000]" disabled={loadCreat}>
                {loadCreat ? "en cour ..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}