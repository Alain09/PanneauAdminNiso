"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { MoreVertical,X, AlertCircle, SquareCheckBig } from "lucide-react";
import { Card } from "@/src/components/ui/card";

import { useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { ComposantCatalogue, ProductCatalogue } from "@/type";
import { CardImageProduct } from "@/src/components/composantProduct/cardProducImage";
import Image from "next/image";
import { useSession } from "@/src/lib/auth-client";
import { Alert, AlertDescription } from "@/src/components/ui/alert";


export default function Catalogue() {
  const [data, setData] = useState<ProductCatalogue[]>();
  const [filter, setFilter] = useState("Tout");
  const [selectedRow, setSelectedRow] = useState<ProductCatalogue>();
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Pour mobile/tablette

  // modal pour affiche de l'image en gande ecran adapte sur mobile, table et desktop
  // Modal pour afficher l'image en grand écran
  const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    product: string;
    image?: string;
    quantity: number;
  } | null>(null);

  const route = useRouter();


  //-------------------------
  const { isPending } = useSession()

  const [sendError, setSendError] = useState("");
  const [loading, setLoading] = useState(false)

  // fonction async pour la recuperation des donnees depuis la route api 
  // api pour recuperation des coordonnées de l'admins
  useEffect(() => {

    const getAllCatalogue = async () => {
      //recuperation de l'key access
      const key_acces = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;

      // ---------loarding before success endpoint
      setLoading(true)

      // try for execution endpoint
      try {
        const datas = await fetch("/api/catalogue/",
          {
            method: "GET",
            headers: { "authorization": `${key_acces}` }
          })

        // erreur de recuperation 
        if (!datas.ok) {
          setSendError(" Erreur lors du chargement ")
          setLoading(false)
        }

        const teamData = await datas.json();

        if (!teamData.success) {
          setSendError(teamData.message)
          setLoading(false)
        } else {
          setLoading(false);
          setSendError("");
          //alert(" donnees bien chargé")
          setData(teamData.data)

        }

      } catch (error) {
        console.error("Erreur lors de la récupération:", error);
        setSendError(" erreur server");
      }

    };

    getAllCatalogue();

  }, [])



  // Filtrer les données en fonction de la catégorie sélectionnée
  const filteredData: ProductCatalogue[] | undefined = filter === "Tout"
    ? data
    : data?.filter(item => item.categorie === filter);

  // Obtenir les catégories uniques pour le filtre
  const uniqueCategories = ["Tout", ...new Set(data?.map(item => item.categorie))];

  // Sélectionner la première ligne par défaut
  useEffect(() => {
    if (filteredData?.length as number > 0 && !selectedRow) {
      setSelectedRow(filteredData?.[0] as ProductCatalogue);
    }
  }, [filteredData, selectedRow]);

  // Mettre à jour la sélection lorsque les données filtrées changent
  useEffect(() => {
    if (filteredData?.length as number > 0) {
      // Si la ligne sélectionnée n'existe plus dans les données filtrées, sélectionner la première
      if (!selectedRow || !filteredData?.find(item => item.id === selectedRow.id)) {
        setSelectedRow(filteredData?.[0]);
      }
    } else {
      setSelectedRow(undefined);
    }
  }, [filteredData, selectedRow]);



  // modal pour la suppression
  const [aut, setAut] = useState(true);
  const [openDeleteModale, setOpenDeleteModale] = useState(false);
  const targetEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const research = e.target.value.toUpperCase() === "DELETE" ? setAut(false) : setAut(true);
    return research;
  };

  const [nameActive, setNameActive] = useState("");


  ///-----------------------------
  //--------------------------
  const ref = useRef<HTMLInputElement>(null)
  const [sendSubmitError, setSendSubmitError] = useState("");
  const [sendSubmitSuccess, setSendSubmitSuccess] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false)
  const [catDelete, setCatDelete] = useState<ProductCatalogue>(); /// gestion d'etat pour la suppression d'une categorie
 
  //---------------------


  const handleDelete = async ( e : React.FormEvent) => {
    e.preventDefault()
    setSendSubmitError("");
    setSendSubmitSuccess("");
    setLoadSubmit(true);

    try {
      const datas = await fetch(`/api/catalogue/${catDelete?.id}`, {
        method: "DELETE",
        headers: {
          "authorization": process.env.NEXT_PUBLIC_API_ROUTE_SECRET || "",
          "Content-Type": "application/json", // Ajout de ce header
        },
      });

      const result = await datas.json();

      if (result.success) {
        setSendSubmitSuccess(result.message);
        setData(prev => prev?.filter(content => content.id !== catDelete?.id));
        route.refresh();
        setTimeout(() => setOpenDeleteModale(false), 1500); // Fermer après succès
        
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

  const handleRowClick = (row: ProductCatalogue) => {
    setSelectedRow(row);
    
  };

  const handleViewDetails = (row: ProductCatalogue) => {
    setSelectedRow(row);
    setShowDetailsModal(true);
  };


  // Fonction pour ouvrir le modal d'image
  const handleImageClick = (component: ComposantCatalogue) => {
    setSelectedImage({
      product: component.product,
      image: component.image as string,
      quantity: component.quantity
    });
    setOpenImage(true);
  };

  // ******************* resize for about openModalDetail
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // si on est en desktop, on ferme le modal
        setShowDetailsModal(false);
      }
    };

    // Vérifier dès le montage
    handleResize();

    // Ajouter l’écouteur resize
    window.addEventListener("resize", handleResize);

    // Nettoyer à l’unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setShowDetailsModal]);


  // ******************* 
  useEffect(()=>{
    if(!openDeleteModale){
      setSendSubmitSuccess("")
    }
  },[openDeleteModale])


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
    <div className="w-full flex flex-col lg:flex-row gap-6 transition-all duration-300 p-4 md:p-6">
      <div className="w-full lg:w-2/3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <Button
            className="bg-[#FF4000] hover:bg-[#FF4000]/90 text-white w-full md:w-auto"
            onClick={() => { route.push("/dashboard/catalogues/new"); }}
          >
            New Catalogue
          </Button>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-32 bg-zinc-800 text-white">
              <SelectValue placeholder="Tout" />
            </SelectTrigger>
            <SelectContent>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>

                <TableHead className="font-medium">Catégorie</TableHead>
                <TableHead className="font-medium">Option</TableHead>
                <TableHead className="font-medium">Prix Hebdo</TableHead>
                <TableHead className="font-medium table-cell">Composants</TableHead>
                <TableHead className="font-medium w-16">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData?.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={`
                    ${index % 2 === 0 ? "bg-[#FFAE91]/10 " : ""}
                    ${selectedRow?.id === row.id ? "bg-blue-100 ring-2 ring-blue-300" : ""}
                    cursor-pointer hover:bg-gray-50
                  `}
                  onClick={() => handleRowClick(row)}
                >

                  <TableCell>{row.categorie}</TableCell>
                  <TableCell>{row.option}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell className="truncate max-w-[150px] table-cell">
                    {Array.isArray(row.composant) && row.composant.length > 0
                      ? row.composant.map((c) => c.product).join(" ; ")
                      : "—"}
                  </TableCell>


                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* Option "Voir détails" visible seulement sur mobile/tablette */}
                        <DropdownMenuItem
                          className="lg:hidden flex items-center gap-2"
                          onClick={() => handleViewDetails(row)}
                        >
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => route.push(`/dashboard/catalogues/edit/${row.id}`)}
                        >
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setCatDelete(row)
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

      {/* Slide droit avec les détails (visible seulement sur desktop) */}
      {selectedRow && (
        <Card className="hidden lg:block h-fit transition-all duration-300 p-4 w-1/3 sticky top-6">
          <div className="flex justify-between items-center pb-5 border-b">
            <h2 className="text-medium font-semibold">Détails du catalogue</h2>
          </div>
          <div className="p-4 space-y-2.5">
            <div className=" space-y-2">
              <div className="flex justify-between items-center mb-2 border-b p-1.5">
                <span className="text-[14px] font-medium "><strong>Catégorie:</strong></span>
                <div className=" px-2 py-2 w-fit border border-gray-200 rounded-md bg-gray-50 flex justify-center items-center" >
                  < span className="text-sm font-medium text-gray-500" >{selectedRow.categorie}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2 border-b pb-1.5">
                <span className="text-[14px] font-medium "><strong>Option:</strong></span>
                <div className=" px-2 py-2 w-fit border border-gray-200 rounded-md bg-gray-50 flex justify-center items-center" >
                  < span className="text-sm font-medium text-gray-500" >{selectedRow.option}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2 border-b py-1.5
               ">
                <span className="text-[14px] font-medium "><strong>Prix Hebdo:</strong></span>
                <div className=" px-2 py-2 w-fit border border-gray-200 rounded-md bg-gray-50 flex justify-center items-center" >
                  < span className="text-sm font-medium text-gray-500" >{selectedRow.price}</span>
                </div>
              </div>
              <p className=" border-b py-1.5"> <strong>Constituants:</strong></p>
            </div>
            <div className="grid grid-cols-1  gap-4">
              {selectedRow.composant.map((component, index) => (
                <CardImageProduct
                  key={index}
                  product={component.product}
                  quantity={component.quantity}
                  image={component?.image as string}
                  onClick={() => handleImageClick(component)}
                />
              ))}
            </div>


          </div>
        </Card>
      )}

      {/* Modal pour afficher les détails en mode mobile/tablette */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails du catalogue</DialogTitle>
          </DialogHeader>
          {selectedRow && (
            <div className="space-y-4">
              <div className=" space-y-2">
                <div className="flex justify-between items-center mb-2 border-b  border-t p-1.5">
                  <span className="text-[14px] font-medium "><strong>Catégorie:</strong></span>
                  <div className=" px-2 py-2 w-fit border border-gray-200 rounded-md bg-gray-50 flex justify-center items-center" >
                    < span className="text-sm font-medium text-gray-500" >{selectedRow.categorie}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2 border-b pb-1.5">
                  <span className="text-[14px] font-medium "><strong>Option:</strong></span>
                  <div className=" px-2 py-2 w-fit border border-gray-200 rounded-md bg-gray-50 flex justify-center items-center" >
                    < span className="text-sm font-medium text-gray-500" >{selectedRow.option}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2 border-b py-1.5
               ">
                  <span className="text-[14px] font-medium "><strong>Prix Hebdo:</strong></span>
                  <div className=" px-2 py-2 w-fit border border-gray-200 rounded-md bg-gray-50 flex justify-center items-center" >
                    < span className="text-sm font-medium text-gray-500" >{selectedRow.price}</span>
                  </div>
                </div>
                <p className=" "> <strong>Constituants:</strong></p>
              </div>

              <div>

                <div className="grid grid-cols-1 gap-4">
                  {selectedRow.composant.map((component, index) => (
                    <CardImageProduct
                      key={index}
                      product={component.product}
                      quantity={component.quantity}
                      image={component?.image as string}
                      onClick={() => handleImageClick(component)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Fermer</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal pour la suppression */}
      <Dialog open={openDeleteModale} onOpenChange={setOpenDeleteModale}>
        <DialogContent className="sm:max-w-md">
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
            <p className="text-sm text-muted-foreground">
              Pour supprimer <span className='font-semibold text-gray-900'>{nameActive}</span> entrer <span className='text-red-600 font-semibold'>DELETE</span> dans le formulaire ci-dessous
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  className="w-full"
                  ref={ref}
                  onChange={targetEnter}
                  placeholder="Tapez DELETE pour confirmer"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="mr-2" disabled={loadSubmit} 
               onClick={() => {
                setSendSubmitError(""); setSendSubmitError(""); 
                
                if (ref.current) {
                  ref.current.value="";        // vide l'input
                }
              }}
              >
                Annuler
              </Button>
            </DialogClose>
            <Button
              disabled={aut || loadSubmit}
              type="submit"
              onClick={(e)=>handleDelete(e)}
              className="bg-[#FF4000] hover:bg-[#FF4000]/90"
              
            >
             {loadSubmit ? "en cour..." : "Confirmer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal pour afficher l'image en grand écran */}
      <Dialog open={openImage} onOpenChange={setOpenImage}>
        <DialogContent className=" p-0 bg-white [&>button:last-child]:hidden"  >
          <DialogHeader >
            <DialogTitle> </DialogTitle>
          </DialogHeader>
          <div className="relative">
            {/* Bouton de fermeture */}
            <DialogClose
              onClick={() => setOpenImage(false)}
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </DialogClose>

            {/* Contenu du modal */}
            {selectedImage && (
              <div className="flex flex-col">
                {/* En-tête avec nom du produit */}
                <div className="p-6 pb-4 border-b">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedImage.product}
                  </h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-1">Quantité:</span>
                    <span className="font-semibold text-blue-600">
                      {selectedImage.quantity}
                    </span>
                  </div>
                </div>

                {/* Image en grand */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100">
                  {selectedImage.image ? (
                    <Image
                      src={selectedImage.image as string}
                      alt={selectedImage.product}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                     className="object-contain"
                      priority={true}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <svg
                          className="w-16 h-16 mx-auto mb-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-gray-500">Aucune image disponible</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer optionnel */}
                <div className="p-4  text-center">
                  <p className="text-sm text-gray-600">
                    Cliquez à l\'extérieur ou sur x pour fermer
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}