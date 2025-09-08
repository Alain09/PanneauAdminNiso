"use client";

import { useState, use, useEffect, useMemo, useRef } from "react";
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
import { useRouter } from "next/navigation";
import { useSession } from "@/src/lib/auth-client";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { AlertCircle, SquareCheckBig } from "lucide-react";

export default function UserProfilNew({ params }: { params: Promise<{ id: string }> }) {


  // Résolvez la promesse des params et router de next js
  const { id } = use(params);
  const route = useRouter();

  //---------------------
  const [userUnique, setUserUnique] = useState<UserProfile>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    role: "",
    position: "",
    image: "",
    profession: "",

  });

  const { isPending } = useSession()
  const [sendError, setSendError] = useState("");
  const [loading, setLoading] = useState(false)

  // ROUTE API POUR obtention des information compltete d'un utulisateur  d'un 
  useEffect(() => {
    const profileGetAllUserUnique = async () => {
      //recuperation de l'key access
      const key_acces = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;

      // ---------loading before success endpoint
      setLoading(true)

      // try for execution endpoint
      try {
        const datas = await fetch(`/api/users/${id}`, {
          method: "GET",
          headers: { "authorization": `${key_acces}` }
        })

        // erreur de recuperation 
        if (!datas.ok) {
          setSendError(" Erreur lors du chargement de l'utilisateurs ")
          setLoading(false)
          return;
        }

        const teamData = await datas.json();

        if (!teamData.success) {
          setSendError(teamData.message)
          setLoading(false)
        } else {
          setLoading(false);
          setSendError("");
          setUserUnique(teamData.data)
        }

      } catch (error) {
        console.error("Erreur lors de la récupération des  profiles :", error);
        setSendError(" erreur server");
        setLoading(false);
      }
    };

    profileGetAllUserUnique();
  }, [])

  // declaration des donnees specifique a l'utilisateur


  // Récupération des catégories
  const categories = useMemo(() => {
    return (
      userUnique?.categoriesStatistiques
        ?.flatMap((cat) => cat?.category || [])
        .sort() ?? []
    );
  }, [userUnique]);

  // Mise à jour sur la catégorie choisie (1ère dispo)
  const [selectCategories, setSelectCategories] = useState<string | undefined>(undefined);

  // Synchroniser le state dès que `categories` change
  useEffect(() => {
    if (categories.length > 0) {
      setSelectCategories(categories[0]);
    }
  }, [categories]);
  // fonction pour la recuperatin des des otpionsDescriptions a une seule ocurence d'option par categories
  // recuperationsd de tous ls OptionDescriptions
  // Récupération de toutes les options
  const OptionsDescriptions = useMemo(() => {
    return (
      userUnique?.categoriesStatistiques
        ?.flatMap((items) => items.optionsDescription || []) ?? []
    );
  }, [userUnique]);


  // la fonction
  // Filtrer pour n’avoir qu’une seule occurrence par (category-option)
  { /*  
  const OptionsDescriptions = useMemo(() => {
    const unique: TontineOption[] = [];
    const seen = new Set();

    for (const item of OptionsDescriptions) {
      const key = `${item.category}-${item.option}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }
    return unique;
  }, [OptionsDescriptions]);
  */}

  const [modal, setModal] = useState(false);

  const [selectedCategorie, setSelectedCategorie] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const [sendSubmitError, setSendSubmitError] = useState("");
  const [sendSubmitSuccess, setSendSubmitSuccess] = useState("")
  const [chag, setChag] = useState(false);

  const tontines = [
    { id: "1", name: "100" },
    { id: "2", name: "200" },
    { id: "3", name: "300" },
    { id: "4", name: "400" },
    { id: "5", name: "500" },
  ];

  const option = [
    { id: "1", name: 1 },
    { id: "2", name: 2 },
    { id: "3", name: 3 },
    { id: "4", name: 4 },
    { id: "5", name: 5 },
    { id: "6", name: 6 },
    { id: "7", name: 7 },
    { id: "8", name: 8 },
    { id: "9", name: 9 },
    { id: "10", name: 10 },
  ];


  //------------pour la mise a jour des name value 
  interface HandleChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> { }

  interface HandleChangeTarget extends EventTarget {
    name: string;
    value: string;
    type: string;
    files?: FileList;
  }

  const handleChange = (e: HandleChangeEvent) => {
    const { name, value, type, files } = e.target as HandleChangeTarget;

    if (type === 'file') {
      setUserUnique(prev => ({
        ...prev,
        [name]: files && files[0] ? files[0] : null
      }));
    } else if (type === 'number') {
      setUserUnique(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setUserUnique(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  //-----------------route api pour mettre a jour les info perso 
  const formadataUserUnique = new FormData()

  const handleSubmitInfoPerso = async (e: React.FormEvent) => {
    e.preventDefault();  // ⬅️ évite le rechargement de page
    setSendSubmitError("");
    setSendSubmitSuccess("")
    setChag(true)
    //recuperation de l'key access
    const key_acces = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;


    formadataUserUnique.append("firstName", userUnique?.firstName || "")
    formadataUserUnique.append("lastName", String(userUnique?.lastName || ""))
    formadataUserUnique.append("profession", String(userUnique?.profession || ""))
    formadataUserUnique.append("contact", String(userUnique?.contact ?? ""))
    formadataUserUnique.append("provence", String(userUnique?.provence ?? ""))
    formadataUserUnique.append("role", String(userUnique?.role ?? ""))
    formadataUserUnique.append("position", String(userUnique?.position ?? ""))
    formadataUserUnique.append("image", String(userUnique?.image))
    formadataUserUnique.append("description", String(userUnique?.description ?? ""))

    try {

      const datas = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "authorization": `${key_acces}` },
        body: formadataUserUnique,
      });

      if (!datas.ok) {
        setSendSubmitError("Erreur lors de la soumission ")

      }
      const teamData = await datas.json();
      if (!teamData.success) {
        setSendSubmitError(teamData.message)
      } else {
        setChag(false)
        setSendSubmitError("");
        setSendSubmitSuccess(teamData.message)
        setTimeout(() => {
          route.refresh()
        }, 1500)

      }
    } catch (error) {

      setSendSubmitError(`Une erreur s'est produite:${error}`);
    } finally {
      setChag(false)

    }
  }

  //---------- route api pour lajout des categorie-option au info de userUnique

  const [tontine, setTontine] = useState(false)
  const [sendTontError, setSendTontError] = useState("");
  const [sendTontSuccess, setSendTontSuccess] = useState("")
  const [optCat, setOptCat] = useState({
    category: "",
    option: 0,
    quantity: 0
  })

  const handleTontOpt = (e: HandleChangeEvent) => {
    const { name, value, type } = e.target as HandleChangeTarget;

    if (type === 'number') {
      setOptCat(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setOptCat(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  const handleSubmitTontineOption = async (e: React.FormEvent) => {
    e.preventDefault();  // ⬅️ évite le rechargement de page
    setSendTontError("");
    setSendTontSuccess("")
    setTontine(true)
    //recuperation de l'key access
    const key_acces = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;

    try {

      const datas = await fetch(`/api/users/${id}/tontines`, {
        method: "POST",
        headers: { "authorization": `${key_acces}` },
        body: JSON.stringify(optCat),
      });

      if (!datas.ok) {
        setSendTontError("Erreur lors de la soumission ")

      }
      const teamData = await datas.json();
      if (!teamData.success) {
        setSendTontError(teamData.message)
      } else {
        setTontine(false)
        setSendTontError("");
        setSendTontSuccess(teamData.message)
        setTimeout(() => {
          setSendTontError("");
          setSendTontSuccess("");
          setModal(false)
          route.refresh()
        }, 3000)

      }
    } catch (error) {

      setSendTontError(`Une erreur s'est produite:${error}`);
    } finally {
      setTontine(false)

    }

  }

  // pour refres lalerte d'erreur qui s'affcihe eb cas d'erreur qu s'affiche pour la mise a jout
  useEffect(() => {
    setSendTontError("")

  }, [modal])

  ///******************** route api pour la suppression d'option */

  // modalpour la supression
  const ref = useRef<HTMLInputElement>(null)
  const [aut, setAut] = useState(true);
  const [openDeleteModale, setOpenDeleteModale] = useState(false);
  const targetEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reseach = e.target.value.toUpperCase() === "DELETE" ? setAut(false) : setAut(true);
    return reseach;
  };

  const [nameActive, setNameActive] = useState<string | undefined>("");

  const [sendDeleteError, setSendDeleteError] = useState("");
  const [sendDeleteSuccess, setSendDeleteSuccess] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false)
  const [optionId, setOptionId] = useState<string | undefined>(""); /// gestion d'etat pour la suppression d'une categorie

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()
    setSendDeleteError("");
    setSendDeleteSuccess("");
    setLoadSubmit(true);


    try {
      const datas = await fetch(`/api/users/${id}/tontines/${optionId}`, {
        method: "DELETE",
        headers: {
          "authorization": process.env.NEXT_PUBLIC_API_ROUTE_SECRET || "",
          "Content-Type": "application/json", // Ajout de ce header
        },
      });

      const result = await datas.json();

      if (result.success) {
        setSendDeleteSuccess(result.message);

        setTimeout(() => {
          setSendDeleteSuccess("");
          setOpenDeleteModale(false)
        }, 1500); // Fermer après succès
        route.refresh();

      } else {
        setSendSubmitError(result.message);
      }

    } catch (error) {
      setSendDeleteError("Erreur de connexion lors de la suppression");
      console.error(error);
    } finally {
      setLoadSubmit(false);
    }
  };
  
  // pour refres lalerte d'erreur qui s'affcihe eb cas d'erreur qu s'affiche pour la suppression 
  useEffect(() => {
    setSendDeleteError("")

  }, [openDeleteModale])





  //------------for loading before page is trying up 
  if (loading || isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  // ------------ la gestion des erreurs 
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
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <Bande />
      <div className=' flex justify-center items-center mx-0 md:mx-10 lg:mx-20 xl:mx-48 '>
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
              {sendSubmitSuccess} hdhdrhhr
            </AlertDescription>
          </Alert>
        }
      </div>
      <Card className="p-4 md:p-6 shadow-gray-100 border border-gray-100">
        <div className="text-sm text-gray-500 mb-4">ID: {id}</div>
        <form onSubmit={handleSubmitInfoPerso}>

          {/* Information personnelle section */}
          <div>
            <CardHeader className="w-full p-0 mb-4 md:mb-6">
              <CardTitle className="text-[#FF4000] font-medium text-lg md:text-xl">
                Information personnelle
              </CardTitle>
              <CardDescription className="text-gray-500 text-sm">
                ces informations seront conservées dans la base de données
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <div className="bg-white border border-gray-100 rounded-lg p-4 md:p-6 w-full">

                <div className="space-y-4 md:space-y-6">
                  { /* Nom */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-5 border-b border-b-gray-100">
                    <label className="text-sm md:text-md font-normal md:w-[120px]">Nom</label>
                    <Input
                      type="text"
                      name="firstName"
                      value={userUnique?.firstName ?? ""}
                      onChange={handleChange}
                      className="w-full h-10 md:h-[45px]"
                    />
                  </div>
                  { /* Prénom */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-5 border-b border-b-gray-100">
                    <label className="text-sm md:text-md font-normal md:w-[120px]">Prénom(s)</label>
                    <Input
                      type="text"
                      name="lastName"
                      value={userUnique?.lastName ?? " "}
                      onChange={handleChange}
                      className="w-full h-10 md:h-[45px]"
                    />
                  </div>
                  { /* Email */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-5 border-b border-b-gray-100">
                    <label className="text-sm md:text-md font-normal md:w-[120px]">Profession</label>
                    <Input
                      type="text"

                      name="profession"
                      value={userUnique?.profession ?? " "}
                      onChange={handleChange}
                      className="w-full h-10 md:h-[45px]"
                    />
                  </div>

                  { /* Contact */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-5 border-b border-b-gray-100">
                    <label className="text-sm md:text-md font-normal md:w-[120px]">Contact</label>
                    <Input
                      type="tel"
                      name="contact"
                      value={userUnique?.contact ?? " "}
                      onChange={handleChange}
                      className="w-full h-10 md:h-[45px]"
                    />
                  </div>

                  { /* Provenance */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-5 border-b border-b-gray-100">
                    <label className="text-sm md:text-md font-normal md:w-[120px]">Provenance</label>
                    <Input
                      type="text"
                      name="provence"
                      value={userUnique?.provence ?? " "}
                      onChange={handleChange}
                      className="w-full h-10 md:h-[45px]"
                    />
                  </div>

                  { /* Role */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-5 border-b border-b-gray-100">
                    <label className="text-sm md:text-md font-normal md:w-[120px]">Rôle</label>
                    <Input
                      type="text"
                      name="role"
                      value={userUnique?.role ?? " "}
                      onChange={handleChange}
                      className="w-full h-10 md:h-[45px]"
                    />
                  </div>


                  { /* Position */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-5 border-b border-b-gray-100">
                    <label className="text-sm md:text-md font-normal md:w-[120px]">Position</label>
                    <Select
                      value={userUnique?.position ?? " "}
                      onValueChange={(value: string) =>
                        handleChange({
                          target: { name: "position", value, type: "text" }
                        } as any)
                      }
                    >
                      <SelectTrigger className="w-full h-10 md:h-[45px]">
                        <SelectValue placeholder="Sélectionner une position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="autoGestion">Auto-gestion</SelectItem>
                        <SelectItem value="gestion">Gestion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  { /* Image */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-5 border-b border-b-gray-100">
                    <label className="text-sm md:text-md font-normal md:w-[120px]">Image</label>
                    <Input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      accept="image/*"
                      className="w-full h-10 md:h-[45px]"
                      placeholder="entrer un image"
                    />
                  </div>

                  { /* Description */}
                  <div className="flex flex-col md:flex-row gap-3 md:gap-10">
                    <label className="text-sm md:text-md font-normal md:w-[120px] pt-2">Description</label>
                    <Textarea
                      name="description"
                      value={userUnique?.description ?? " "}
                      onChange={handleChange}
                      className="w-full h-24 md:h-[100px]"
                    />
                  </div>

                </div>
                <div className="flex justify-end mt-6 md:mt-10">
                  <button
                    type="submit"
                    disabled={chag}
                    className="px-6 py-2 bg-[#FF4000] text-white rounded-md hover:bg-[#FF4000]/90 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors "
                  >
                    {chag ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        en cours...
                      </div>
                    ) : (
                      "Mettre à jout"
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
          </div>
        </form>

        {/* Choix opérés section */}
        <div className="pt-8 md:pt-15">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
            <CardHeader className="w-full p-0">
              <CardTitle className="text-[#FF4000] font-medium text-lg md:text-xl">
                Choix opérés
              </CardTitle>
              <CardDescription className="text-gray-500 text-sm">
                ces informations seront conservées dans la base de données
              </CardDescription>
            </CardHeader>
            <Button
              className="bg-[#FF4000] hover:bg-[#FF4000]/80 w-full md:w-auto"
              onClick={() => { setModal(true); }}
            >
              Ajouter une catégorie
            </Button>
          </div>

          <CardContent className="p-0 mt-4 md:mt-6">
            {
              OptionsDescriptions.length !== 0 ?
                <div className="bg-white border border-gray-100 rounded-lg p-4 md:p-6 w-full">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0 mb-4 md:mb-3">
                    <h4 className="text-md md:text-lg font-medium">Tontine(s) choisi(es)</h4>
                    <Tabs defaultValue={categories[0]}>
                      <TabsList className="h-8 items-center justify-center bg-gray-50 overflow-x-auto">
                        {categories.map((item) => {
                          return (
                            <TabsTrigger
                              onClick={() => { setSelectCategories(item); }}
                              key={item} value={item} className="text-sm md:text-[16px] text-gray-300 px-2 data-[state=active]:bg-[#FF4000] data-[state=active]:text-white">
                              {item} Fcfa
                            </TabsTrigger>
                          );
                        })}
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="space-y-4 md:space-y-5">
                    {
                      OptionsDescriptions?.map((term) => {
                        if (term.category === selectCategories) {
                          return (
                            <Optionlist setOptionId={setOptionId} opt={term} setOpen={setOpenDeleteModale} setTexteDelete={setNameActive} key={term.category + term.option} />
                          );
                        }
                        return null;
                      })
                    }
                  </div>
                </div>
                :
                <div className="p-3 bg-green-100 w-full flex justify-center items-center text-green-800 text-sm font-medium rounded-md">
                  Pas de choix opéré
                </div>
            }
          </CardContent>
        </div>
      </Card>

      {/* modal pour la mise a jour */}
      <Dialog open={modal} onOpenChange={setModal} >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajout de categories</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              servir pour la mise a jour ou la création des options
            </p>

            {sendTontError &&
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-700">
                  {sendTontError}
                </AlertDescription>
              </Alert>
            }
            {sendTontSuccess &&
              <Alert className="border-green-200 bg-green-50">
                <SquareCheckBig className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700">
                  {sendTontSuccess}
                </AlertDescription>
              </Alert>
            }


            <div className="space-y-4">
              {/* Sélecteur de tontine */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Catégories</label>
                <Select
                  value={optCat?.category ?? " "}
                  onValueChange={(value: string) =>
                    handleTontOpt({
                      target: { name: "category", value, type: "text" }
                    } as any)
                  }
                >
                  <SelectTrigger className="w-full h-10 md:h-[45px]">
                    <SelectValue placeholder="Sélectionner une categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {tontines.map((cat, index) =>
                      <SelectItem key={index} value={`${cat.name}`}>{cat.name}</SelectItem>
                    )}

                  </SelectContent>
                </Select>
              </div>

              {/* Sélecteur d'option*/}
              <div className="space-y-2">
                <label className="text-sm font-medium">Option</label>
                <Select
                  value={String(optCat?.option) ?? " "}
                  onValueChange={(value: string) =>
                    handleTontOpt({
                      target: { name: "option", value, type: "text" }
                    } as any)
                  }
                >
                  <SelectTrigger className="w-full h-10 md:h-[45px]">
                    <SelectValue placeholder="Sélectionner une option" />
                  </SelectTrigger>
                  <SelectContent>
                    {option.map((cat, index) =>
                      <SelectItem key={index} value={`${cat.name}`}>{cat.name}</SelectItem>
                    )}

                  </SelectContent>
                </Select>
              </div>
              {/* Nombre */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantité</label>
                <Input
                  type="number"
                  className="w-full"
                  value={optCat.quantity}
                  onChange={handleTontOpt}
                  name="quantity"
                />
              </div>
            </div>


          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="mr-2" disabled={tontine}>
                Annuler
              </Button>
            </DialogClose>
            <Button className="bg-[#FF4000] hover:bg-[#FF4000]/80" disabled={tontine} type="submit" onClick={handleSubmitTontineOption}>
              {tontine ? " en cours ..." : "Confirmer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      { /* POUR LA SUPPRESSION  */}
      <Dialog open={openDeleteModale} onOpenChange={setOpenDeleteModale} >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>SUPPRESSION</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Pour supprimer <span className='font-semibold text-gray-900'>{nameActive}</span> entrer <span className='text-red-600 font-semibold'>DELETE</span> dans le formulaire ci-dessous
            </p>
            {sendDeleteError &&
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-700">
                  {sendDeleteError}
                </AlertDescription>
              </Alert>
            }
            {sendDeleteSuccess &&
              <Alert className="border-green-200 bg-green-50">
                <SquareCheckBig className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700">
                  {sendDeleteSuccess}
                </AlertDescription>
              </Alert>
            }

            <div className="space-y-4">
              {/* Entrer */}
              <div className="space-y-2">
                <Input
                  ref={ref}
                  className="w-full"
                  onChange={(e) => targetEnter(e)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="mr-2" disabled={loadSubmit}>
                Annuler
              </Button>
            </DialogClose>
            <Button
              disabled={aut || loadSubmit}
              type='submit'
              onClick={(e) => handleDelete(e)}

              className="bg-[#FF4000] hover:bg-[#FF4000]/80">
              {loadSubmit ? "en cour..." : "Confirmer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}