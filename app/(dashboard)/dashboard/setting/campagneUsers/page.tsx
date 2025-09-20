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

export default function Campagn() {
  const [campagneData, setCampagneData] = useState<Campagne[]>([]);
  const [campPost, setCampPost] = useState<Partial<Campagne>>({});
  const [campUpdate, setCampUpdate] = useState<Campagne | null>(null);
  const { isPending } = useSession();

  const [sendError, setSendError] = useState("");
  const [loading, setLoading] = useState(false);

  const [sendSubmitError, setSendSubmitError] = useState("");
  const [sendSubmitSuccess, setSendSubmitSuccess] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false);

  const [sendCreatError, setSendCreatError] = useState("");
  const [sendCreatSuccess, setSendCreatSuccess] = useState("");
  const [loadCreat, setLoadCreat] = useState(false);

  const [campDelete, setCampDelete] = useState<Campagne>();
  const [nameActive, setNameActive] = useState("");

  const ref = useRef<HTMLInputElement>(null);
  const [aut, setAut] = useState(true);

  const [openDeleteModale, setOpenDeleteModale] = useState(false);
  const [openNewModale, setOpenNewModale] = useState(false);
  const [openUpdateModale, setOpenUpdateModale] = useState(false);

  //------------------ FETCH CAMPAGNE ------------------
  useEffect(() => {
    const getAllCampagne = async () => {
      setLoading(true);
      try {
        const datas = await fetch("/api/settng/campagne/", {
          method: "GET",
          headers: { "authorization": process.env.NEXT_PUBLIC_API_ROUTE_SECRET || "" },
        });
        if (!datas.ok) throw new Error("Erreur lors du chargement de la campagne");

        const campDt = await datas.json();
        if (!campDt.success) throw new Error(campDt.message);

        setCampagneData(campDt.data);
        setSendError("");
      } catch (error) {
        console.error(error);
        setSendError( "Erreur serveur");
      } finally {
        setLoading(false);
      }
    };
    getAllCampagne();
  }, []);

  //------------------ DELETE ------------------
  const targetEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAut(e.target.value.toUpperCase() !== "DELETE");
  };

  const handleDelete = async () => {
    setSendSubmitError("");
    setSendSubmitSuccess("");
    setLoadSubmit(true);
    try {
      const datas = await fetch(`/api/settng/campagne/${campDelete?.id}`, {
        method: "DELETE",
        headers: {
          "authorization": process.env.NEXT_PUBLIC_API_ROUTE_SECRET || "",
          "Content-Type": "application/json",
        },
      });
      const result = await datas.json();
      if (result.success) {
        setSendSubmitSuccess(result.message);
        setCampagneData(prev => prev.filter(c => c.id !== campDelete?.id));
        setTimeout(() => setOpenDeleteModale(false), 1000);
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

  //------------------ CREATE ------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCampPost(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendCreatError("");
    setSendCreatSuccess("");
    setLoadCreat(true);
    try {
      const datas = await fetch(`/api/settng/campagne/`, {
        method: "POST",
        headers: {
          "authorization": process.env.NEXT_PUBLIC_API_ROUTE_SECRET || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campPost),
      });
      const result = await datas.json();
      if (result.success) {
        setSendCreatSuccess(result.message);
        setCampagneData(prev => [...prev, result.data]);
        setTimeout(() => setOpenNewModale(false), 1000);
      } else {
        setSendCreatError(result.message);
      }
    } catch (error) {
      setSendCreatError("Erreur de connexion lors de la création");
      console.error(error);
    } finally {
      setLoadCreat(false);
    }
  };

  //------------------ UPDATE ------------------
  const handleUpdateCampagne = async (updatedData: Partial<Campagne>) => {
    if (!campUpdate) return;
    setSendSubmitError("");
    setSendSubmitSuccess("");
    setLoadSubmit(true);

    try {
      const response = await fetch(`/api/settng/campagne/${campUpdate.id}`, {
        method: "PATCH",
        headers: {
          "authorization": process.env.NEXT_PUBLIC_API_ROUTE_SECRET || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      if (result.success) {
        setSendSubmitSuccess(result.message);
        setCampagneData(prev =>
          prev.map(c => (c.id === campUpdate.id ? { ...c, ...updatedData, ...result.data } : c))
        );
        setTimeout(() => setOpenUpdateModale(false), 1000);
      } else {
        setSendSubmitError(result.message || "Erreur lors de la mise à jour");
      }
    } catch (error) {
      setSendSubmitError("Erreur de connexion lors de la mise à jour");
      console.error(error);
    } finally {
      setLoadSubmit(false);
    }
  };

  //------------------ LOADING & ERROR ------------------
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

  if (sendError) {
    return (
      <main className="p-4">
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">{sendError}</AlertDescription>
        </Alert>
      </main>
    );
  }
  return (
    <div className="w-full p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <Button
          className="bg-[#FF4000] hover:bg-[#FF4000]/90 text-white text-sm md:text-base"
          onClick={() => setOpenNewModale(true)}
        >
          Créer une Campagne
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>DébutSélection</TableHead>
              <TableHead>FinSélection</TableHead>
              <TableHead>DébutTontine</TableHead>
              <TableHead>FinTontine</TableHead>
              <TableHead>CampagneStatut</TableHead>
              <TableHead>SemaineActive</TableHead>
              <TableHead className="w-16">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campagneData.map((row, index) => (
              <TableRow key={row.id || index} className={index % 2 === 0 ? "bg-[#FFAE91]/10" : ""}>
                <TableCell>{row.nom}</TableCell>
                <TableCell>{row.selectionStart ? new Date(row.selectionStart).toLocaleDateString() : "N/A"}</TableCell>
                <TableCell>{row.selectionEnd ? new Date(row.selectionEnd).toLocaleDateString() : "N/A"}</TableCell>
                <TableCell>{row.tontineStart ? new Date(row.tontineStart).toLocaleDateString() : "N/A"}</TableCell>
                <TableCell>{row.tontineEnd ? new Date(row.tontineEnd).toLocaleDateString() : "N/A"}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      row.campagneStatut === "Terminer"
                        ? "text-xs text-green-600 bg-green-100 py-1 px-2 rounded"
                        : row.campagneStatut === "En cours"
                          ? "text-xs text-blue-600 bg-blue-100 py-1 px-2 rounded"
                          : row.campagneStatut === "En selection"
                            ? "text-xs text-orange-600 bg-orange-100 py-1 px-2 rounded"
                            : "text-xs text-gray-600 bg-gray-100 py-1 px-2 rounded"
                    }
                  >
                    • {row.campagneStatut}
                  </Badge>
                </TableCell>
                <TableCell>{row.weekActif}</TableCell>
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
                          setNameActive(row.nom || "");
                          setCampDelete(row);
                        }}
                      >
                        Supprimer
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-blue-600 text-xs md:text-sm"
                        onClick={() => {
                          setOpenUpdateModale(true);
                          setCampUpdate(row);
                        }}
                      >
                        Modifier
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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

      {/* MODALE MISE À JOUR */}
      <Dialog open={openUpdateModale} onOpenChange={setOpenUpdateModale}>
        <DialogContent className="sm:max-w-md mx-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (!campUpdate) return;

              // Calcul des dates
              const selectionStartDate = campUpdate.selectionStart
                ? new Date(campUpdate.selectionStart)
                : new Date();

              const selectionEndDate = new Date(selectionStartDate);
              selectionEndDate.setDate(
                selectionEndDate.getDate() + (campUpdate.dureeSelectionJours || 0)
              );

              const tontineStartDate = new Date(selectionEndDate);
              tontineStartDate.setDate(tontineStartDate.getDate() + 1);

              const tontineEndDate = new Date(tontineStartDate);
              tontineEndDate.setDate(
                tontineEndDate.getDate() + ((campUpdate.dureeTontineSemaines || 0) * 7)
              );

              handleUpdateCampagne({
                nom: campUpdate.nom,
                selectionStart: campUpdate.selectionStart,
                dureeSelectionJours: campUpdate.dureeSelectionJours,
                dureeTontineSemaines: campUpdate.dureeTontineSemaines,
                campagneStatut: campUpdate.campagneStatut
              });
            }}
          >
            <DialogHeader>
              <DialogTitle>MODIFICATION DE CAMPAGNE</DialogTitle>
              <DialogDescription className="text-sm">
                Modifier les informations de la campagne sélectionnée
              </DialogDescription>
              {sendSubmitError && (
                <Alert className="border-red-200 bg-red-50 my-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-700">{sendSubmitError}</AlertDescription>
                </Alert>
              )}
              {sendSubmitSuccess && (
                <Alert className="border-green-200 bg-green-50 my-2">
                  <SquareCheckBig className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-700">{sendSubmitSuccess}</AlertDescription>
                </Alert>
              )}
            </DialogHeader>

            <div className="space-y-4 mt-2">
              {/* Nom */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom:</label>
                <Input
                  type="text"
                  name="nom"
                  value={campUpdate?.nom || ""}
                  onChange={(e) => setCampUpdate(prev => prev ? { ...prev, nom: e.target.value } : prev)}
                  required
                />
              </div>

              {/* Début sélection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date de démarrage:</label>
                <Input
                  type="date"
                  name="selectionStart"
                  value={campUpdate?.selectionStart ? new Date(campUpdate.selectionStart).toISOString().split('T')[0] : ""}
                  onChange={(e) => setCampUpdate(prev => prev ? { ...prev, selectionStart: e.target.value } : prev)}
                  required
                />
              </div>

              {/* Durée sélection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Durée des choix (jours):</label>
                <Input
                  type="number"
                  name="dureeSelectionJours"
                  value={campUpdate?.dureeSelectionJours || ""}
                  onChange={(e) => setCampUpdate(prev => prev ? { ...prev, dureeSelectionJours: Number(e.target.value) } : prev)}
                  required
                />
              </div>

              {/* Durée tontine */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Durée tontine (semaines):</label>
                <Input
                  type="number"
                  name="dureeTontineSemaines"
                  value={campUpdate?.dureeTontineSemaines || ""}
                  onChange={(e) => setCampUpdate(prev => prev ? { ...prev, dureeTontineSemaines: Number(e.target.value) } : prev)}
                  required
                />
              </div>

              {/* Statut */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Statut de la campagne:</label>
                <Input
                  type="text"
                  name="campagneStatut"
                  value={campUpdate?.campagneStatut || ""}
                  onChange={(e) => setCampUpdate(prev => prev ? { ...prev, campagneStatut: e.target.value } : prev)}
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => setSendSubmitError("")}
                >
                  Annuler
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-[#FF4000]" disabled={loadSubmit}>
                {loadSubmit ? "En cours..." : "Mettre à jour"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}