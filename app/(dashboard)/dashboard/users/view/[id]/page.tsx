"use client";

import { useEffect, useState, use, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/src/components/ui/table";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

import { Edit, MoreVertical, Calendar, FileText, Wallet, Eye, AlertCircle, SquareCheckBig, X } from "lucide-react";
import Bande from "@/src/components/users/bande";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Card, CardContent } from "@/src/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { CategoriesStatisquesPayement, TontineOption, UserProfile } from '@/type';
import StatisCardUser from "@/src/components/users/statisCard";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Input } from "@/src/components/ui/input";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "@/src/lib/auth-client";
import { Alert, AlertDescription } from "@/src/components/ui/alert";


export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {

    const route = useRouter();
    const { id } = use(params);

    const [totalWeek, setTotalWeek] = useState(0)

    const { isPending, data } = useSession()
    const [sendError, setSendError] = useState("");
    const [loading, setLoading] = useState(false)

    // declaration des donnees specifique a l'utilisateur
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

    // ROUTE API POUR obtention des information compltete d'un utulisateur
    useEffect(() => {
        const profileGetAllUserUnique = async () => {
            const key_acces = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;
            setLoading(true)

            try {
                const datas = await fetch(`/api/users/${id}`, {
                    method: "GET",
                    headers: { "authorization": `${key_acces}` }
                })

                if (!datas.ok) {
                    setSendError("Erreur lors du chargement de l'utilisateur")
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
                    setTotalWeek(teamData.totalWeeks)
                }

            } catch (error) {
                console.error("Erreur lors de la récupération des profiles :", error);
                setSendError("erreur server");
                setLoading(false);
            }
        };

        profileGetAllUserUnique();
    }, [id])

    // Récupération des catégories - Fixed: Added null safety
    const categories = useMemo(() => {
        if (!userUnique?.categoriesStatistiques || userUnique.categoriesStatistiques.length === 0) {
            return [];
        }
        return userUnique.categoriesStatistiques
            .flatMap((cat) => cat?.category || [])
            .filter(Boolean) // Remove null/undefined values
            .sort();
    }, [userUnique]);

    // Mise à jour sur la catégorie choisie (1ère dispo)
    const [selectCategories, setSelectCategories] = useState<string | undefined>(undefined);

    // Synchroniser le state dès que `categories` change
    useEffect(() => {
        if (categories.length > 0 && !selectCategories) {
            setSelectCategories(categories[0]);
        }
    }, [categories, selectCategories]);

    // Fixed: Use useMemo for uniqueUserData instead of useState
    const uniqueUserData = useMemo<CategoriesStatisquesPayement[]>(() => {
        return userUnique.categoriesStatistiques as CategoriesStatisquesPayement[] || [];
    }, [userUnique.categoriesStatistiques]);

    // Fixed: Use useMemo for OptionsDescriptions with proper null safety
    const OptionsDescriptions = useMemo(() => {
        if (!userUnique?.categoriesStatistiques || userUnique.categoriesStatistiques.length === 0) {
            return [];
        }
        return userUnique.categoriesStatistiques
            .flatMap((items) => items.optionsDescription || [])
            .filter(Boolean); // Remove null/undefined values
    }, [userUnique]);

    // Fixed: Use useMemo for optionTab instead of useState
    const optionTab = useMemo<TontineOption[]>(() => {
        return OptionsDescriptions;
    }, [OptionsDescriptions]);

    // State pour gérer l'affichage du modal des détails en mode mobile/tablette
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Debug logs
    useEffect(() => {
        console.log("userUnique:", userUnique);
        console.log("categories:", categories);
        console.log("uniqueUserData:", uniqueUserData);
        console.log("optionTab:", optionTab);
        console.log("selectCategories:", selectCategories);
    }, [userUnique, categories, uniqueUserData, optionTab, selectCategories]);

    const statuts = [
        { id: "1", name: "Payé" },
        { id: "2", name: "En retard" },
        { id: "3", name: "En cours" },
    ];

    const [selectedStatut, setSelectedStatut] = useState<string>("");

    //------------modal pour la mise a des donnees

    const [modal, setModal] = useState(false);
    const [updateLoad, setUpdateLoad] = useState(false)
    const [sendUpdateError, setSendUpdateError] = useState("");
    const [sendUpdateSuccess, setSendUpdateSuccess] = useState("")


    // pour prendre les donnes du modale
    const [datamodal, setDatamodal] = useState({
        statPaidId: "",
        week: 0,
        category: "",
        statut: "",
        listOptions: [] as string[],
        totalPaidByWeek: 0,
        datePaiement: new Date(Date.now()),
    });

    //--- route api pour la mise de status
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setSendUpdateError("");
        setSendUpdateSuccess("");
        setUpdateLoad(true);
        const statPaidId = datamodal.statPaidId


        try {
            const datas = await fetch(`/api/users/${id}/tontines/paidStatus/${statPaidId}`, {
                method: "PATCH",
                headers: {
                    "authorization": process.env.NEXT_PUBLIC_API_ROUTE_SECRET || "",
                    "Content-Type": "application/json", // Ajout de ce header
                },
                body: JSON.stringify({
                    status: datamodal.statut,
                    datePaiment: datamodal.datePaiement
                })
            });

            const result = await datas.json();

            if (result.success) {
                setSendUpdateSuccess(result.message);

                setTimeout(() => {
                    setSendUpdateSuccess("");
                    setModal(false)
                }, 1500); // Fermer après succès
                route.refresh();

            } else {
                setSendUpdateError(result.message);
            }

        } catch (error) {
            setSendUpdateError("Erreur server");
            console.error(error);
        } finally {
            setUpdateLoad(false);
        }
    };


    // pour refres lalerte d'erreur qui s'affcihe eb cas d'erreur qu s'affiche pour le update 
    useEffect(() => {
        setSendUpdateError("")

    }, [modal])

    // pour affichage de l'image en grand 
    const [openImage, setOpenImage] = useState(false)

    interface struc {
        image?: string,
        name?: string
    }
    const [selectedImage, setSelectedImage] = useState<struc>({
        image: "",
        name: ""
    })

   
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

    // Fixed: Add early return if no data
    if (!userUnique.id) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-600">Aucune donnée utilisateur trouvée</p>
            </div>
        );
    }

    return (
        <div className="px-4 md:px-6 py-3 min-h-screen">
            {/* btn retour */}
            <Bande />
            <div>
                {/* Left Section - User details and transactions */}
                <div className="flex flex-col lg:flex-row gap-6 w-full relative">
                    <Tabs className="flex-1 space-y-6 w-full" defaultValue={categories[0]} orientation="vertical">
                        {/* Fixed: Added proper conditional rendering */}
                        {selectCategories && uniqueUserData?.filter(user => user.category === selectCategories)
                            .map((user, index) => (
                                <Card key={index} className="bg-white px-1 rounded-lg shadow-gray-100 border border-gray-100" >
                                    <CardContent>
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                            <h1 className="text-2xl md:text-4xl font-bold">
                                                Hello,<span className="text-orange-500">{userUnique.firstName} <span>.</span> {userUnique.lastName.toString().charAt(0)}</span>
                                            </h1>

                                            {/* Bouton pour afficher les détails en mode mobile/tablette */}
                                            <div className=" lg:hidden flex gap-4">
                                                <Button
                                                    className=" bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
                                                    onClick={() => setShowDetailsModal(true)}
                                                >
                                                    <Eye className="w-4 h-4" />

                                                </Button>
                                                <Button
                                                    className=" bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
                                                    onClick={() => route.push(`/dashboard/users/edit/${userUnique.id}`)}
                                                >
                                                    <Edit className="w-4 h-4" />

                                                </Button>
                                               

                                            </div>
                                        </div>

                                        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <h2 className="text-lg font-medium">Catégorie(s) choisie(es)</h2>
                                            {categories.length > 0 && (
                                                <TabsList className="h-10 items-center justify-center bg-gray-100 overflow-x-auto">
                                                    {categories.map((item, index) => (
                                                        <TabsTrigger
                                                            onClick={() => { setSelectCategories(item); }}
                                                            key={index}
                                                            value={`${item}`}
                                                            className="text-sm md:text-md text-gray-500 px-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                                                        >
                                                            {item}F
                                                        </TabsTrigger>
                                                    ))}
                                                </TabsList>
                                            )}
                                        </div>

                                        <TabsContent value={selectCategories ?? ""} className="mb-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                <StatisCardUser title="Montant total payé" value={`${String(user.totalPaid)}`} icon={<Wallet className="w-4 h-4 text-orange-500" />} />
                                                <StatisCardUser title="Semaines validées" value={`${String(user.weekValided)}/${totalWeek}`} icon={<Calendar className="w-4 h-4 text-orange-500" />} />
                                                <StatisCardUser title="Total à payer " value={String(user.totalPaidByWeek)} icon={<FileText className="w-4 h-4 text-orange-500" />} />
                                            </div>

                                           

                                            <div className="border rounded-lg overflow-hidden">
                                                <div className=" overflow-x-hidden max-h-[400px] md:max-h-[500px] lg:max-h-[600px] xl:max-h-[700px] 2xl:max-h-[800px] overflow-y-auto">
                                                    <Table>
                                                        <TableHeader className="bg-gray-50">
                                                            <TableRow>
                                                                <TableHead className="w-32">
                                                                    <div className="flex items-center">
                                                                        Date de paiement
                                                                    </div>
                                                                </TableHead>
                                                                <TableHead>
                                                                    <div className="flex items-center">
                                                                        Catégorie
                                                                    </div>
                                                                </TableHead>
                                                                <TableHead className="hidden md:table-cell">
                                                                    <div className="flex items-center">
                                                                        Option(s)
                                                                    </div>
                                                                </TableHead>
                                                                <TableHead>
                                                                    <div className="flex items-center">
                                                                        Semaines
                                                                    </div>
                                                                </TableHead>
                                                                <TableHead>
                                                                    <div className="flex items-center">
                                                                        Montant à payer
                                                                    </div>
                                                                </TableHead>
                                                                <TableHead>Statut</TableHead>
                                                                <TableHead>Action</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {/* Fixed: Added null safety for payment details */}
                                                            {user.detailPaiementOfThisCategorie && user.detailPaiementOfThisCategorie.length > 0 ? (
                                                                user.detailPaiementOfThisCategorie.sort((a, b) => (a?.week || 0) - (b?.week || 0)).map((payment, index) => {
                                                                    return (
                                                                        <TableRow key={index} className="bg-orange-50/30">
                                                                            <TableCell>{new Date(payment?.datePaiement as Date).toLocaleDateString()}</TableCell>
                                                                            <TableCell>{payment?.category} Fcfa</TableCell>
                                                                            <TableCell className="hidden md:table-cell">[{user.listOptions?.join('; ') || 'Aucune option'}]</TableCell>
                                                                            <TableCell>{`sem ${payment?.week}`}</TableCell>
                                                                            <TableCell>{payment?.totalToPayByWeekOfThisCategory} Fcfa</TableCell>
                                                                            <TableCell>
                                                                                <Badge
                                                                                    variant="outline"
                                                                                    className={
                                                                                        payment?.status === "Payé"
                                                                                            ? "text-xs text-green-600 bg-green-100 py-1 px-2 rounded"
                                                                                            : payment?.status === "En retard"
                                                                                                ? "text-xs text-red-600 bg-red-100 py-1 px-2 rounded"
                                                                                                : "text-xs text-blue-600 bg-blue-100 py-1 px-2 rounded"
                                                                                    }
                                                                                >
                                                                                    • {payment?.status}
                                                                                </Badge>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {
                                                                                    data?.user.email != "alain090901@gmail.com" ?
                                                                                        <span className="text-sm text-green-600 font-medium">aucune</span> :
                                                                                        <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => {
                                                                                            setModal(true);
                                                                                            setDatamodal({
                                                                                                statPaidId: payment.id,
                                                                                                week: payment?.week ?? 0,
                                                                                                category: payment?.category,
                                                                                                statut: payment?.status as string,
                                                                                                listOptions: user?.listOptions as string[],
                                                                                                totalPaidByWeek: payment.totalToPayByWeekOfThisCategory as number,
                                                                                                datePaiement: payment.datePaiement as Date,
                                                                                            });
                                                                                        }}>
                                                                                            <MoreVertical className="h-4 w-4" />
                                                                                        </Button>
                                                                                }
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    );
                                                                })
                                                            ) : (
                                                                <TableRow>
                                                                    <TableCell colSpan={7} className="text-center py-4">
                                                                        Aucun paiement trouvé pour cette catégorie
                                                                    </TableCell>
                                                                </TableRow>
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </CardContent>
                                </Card>
                            ))}

                        {/* Fixed: Add fallback when no categories match */}
                        {(!selectCategories || uniqueUserData?.filter(user => user.category === selectCategories).length === 0) && (
                            <Card className="bg-white px-1 rounded-lg shadow-gray-100 border border-gray-100">
                                <CardContent>
                                    <div className="text-center py-8">
                                        <p className="text-gray-600">Aucune donnée trouvée pour la catégorie sélectionnée</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </Tabs>

                    {/* Right Section - User profile (visible seulement sur desktop) */}
                    <div className="hidden lg:block w-96 space-y-6">
                        <Card className="bg-white px-1 shadow-gray-100 border border-gray-100 sticky top-[75px]">
                            <CardContent>
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="text-2xl font-semibold text-orange-500">Profil</h1>
                                    <div className="p-3 bg-orange-100 rounded-full hover:bg-orange-200 cursor-pointer"
                                        onClick={() => route.push(`/dashboard/users/edit/${userUnique.id}`)}
                                    >
                                        <Edit className="w-4 h-4 text-orange-500" />
                                    </div>
                                </div>
                                {/* User Profile Details */}
                                <div>
                                    <div className="flex flex-col items-center mb-6">
                                        <div className="w-32 h-32 rounded-full mb-4 overflow-hidden">
                                            {userUnique?.image &&
                                                typeof userUnique.image === "string" &&
                                                userUnique.image.trim() !== "" &&
                                                userUnique.image !== "null" ? (
                                                // Cas édition (image déjà en DB, string URL)
                                                <Image
                                                    className="rounded-full object-cover cursor-pointer "
                                                    width={150}
                                                    height={150}
                                                    src={userUnique.image}
                                                    alt={userUnique?.firstName || "Utilisateur"}
                                                    sizes="(max-width: 640px) 80px, 96px"
                                                    onClick={() => {

                                                        setSelectedImage({
                                                            image:
                                                                userUnique.image instanceof File
                                                                    ? URL.createObjectURL(userUnique.image) // si c'est un File → on crée un URL temporaire
                                                                    : (userUnique.image ?? ""),
                                                            name: `${userUnique.firstName}  ${userUnique.lastName}`           // si string ou undefined → string
                                                        });
                                                        setOpenImage(true)
                                                    }
                                                    }

                                                />
                                            ) : userUnique?.image instanceof File ? (
                                                // Cas ajout (preview locale avant upload)
                                                <Image
                                                    className="rounded-full object-cover"
                                                    width={150}
                                                    height={150}
                                                    src={URL.createObjectURL(userUnique.image)}
                                                    alt={userUnique?.firstName || "Utilisateur"}
                                                />
                                            ) : (
                                                // Cas pas d’image
                                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-full">
                                                    <svg
                                                        className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>




                                        <h2 className="text-2xl font-bold mb-1">
                                            <span className="font-medium">{userUnique.lastName}</span> {userUnique.firstName}
                                        </h2>
                                    </div>
                                    {/* les coordonnees */}
                                    <div className="flex items-center flex-col gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                            <div className="text-sm font-medium text-gray-600">
                                                <span>Email</span>
                                            </div>
                                            <div className="px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-50">
                                                <span className="text-sm font-medium text-gray-600">{userUnique.email}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                            <div className="text-sm font-medium text-gray-600">
                                                <span>Contact</span>
                                            </div>
                                            <div className="px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-50">
                                                <span className="text-sm font-medium text-gray-600">{userUnique.contact}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                            <div className="text-sm font-medium text-gray-600">
                                                <span>Provenance</span>
                                            </div>
                                            <div className="px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-50">
                                                <span className="text-sm font-medium text-gray-600">{userUnique.provence}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                            <div className="text-sm font-medium text-gray-600">
                                                <span>Position</span>
                                            </div>
                                            <div className="px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-50">
                                                <span className="text-sm font-medium text-gray-600">{userUnique.position}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {selectCategories && (
                                    <>
                                        <div className="mb-4 mt-8 flex justify-between items-center gap-2">
                                            <h3 className="text-md font-medium mb-2">Tontine choisie</h3>
                                            <div className="px-2 py-1 w-fit border border-orange-100 rounded-md bg-orange-500 flex justify-center items-center">
                                                <span className="text-sm font-medium text-gray-50">{selectCategories}Fcfa</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4 max-h-[400px] overflow-y-auto">
                                            {/* Fixed: Added proper filtering and null safety */}
                                            {optionTab && optionTab.length > 0 ? (
                                                optionTab
                                                    .filter(items => items.category === selectCategories)
                                                    .map((items, index) => (
                                                        <div key={index} className="border border-gray-100 rounded-lg p-4 bg-white shadow-gray-100">
                                                            <div className="mb-2">
                                                                <div className="flex justify-between mb-2">
                                                                    <span className="text-[14px] font-medium text-gray-600">Option:</span>
                                                                    <div className="px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center">
                                                                        <span className="text-sm font-medium text-gray-50">{`${items.option === "1" ? items.option + "ère" : items.option + "ème"} `}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-between mb-2">
                                                                    <span className="text-[14px] font-medium text-gray-600">Quantité :</span>
                                                                    <div className="px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center">
                                                                        <span className="text-sm font-medium text-gray-50">{String(items.countOption).padStart(2, "0")}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-between mb-2">
                                                                    <span className="text-[14px] font-medium text-gray-600">A payer par/S :</span>
                                                                    <div className="px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center">
                                                                        <span className="text-sm font-medium text-gray-50">{items.totalToPayByWeekOfThisOption} Fcfa</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col mb-1">
                                                                    <span className="text-[14px] font-medium text-gray-600">Les articles à prendre:</span>
                                                                    <div className="mt-4">
                                                                        <div className="p-2 w-full border border-gray-100 rounded-lg bg-gray-50">
                                                                            <div className="flex flex-wrap gap-1">
                                                                                {items.components && items.components.length > 0 ? (
                                                                                    items.components.map((item) => (
                                                                                        <div key={item.id} className="shadow-gray-100 px-2 py-1 w-fit border border-gray-200 rounded-md bg-white flex justify-center items-center">
                                                                                            <span className="text-sm font-medium text-gray-600">{item.compose}</span>
                                                                                        </div>
                                                                                    ))
                                                                                ) : (
                                                                                    <span className="text-sm text-gray-500">Aucun article</span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                            ) : (
                                                <div className="text-center py-4">
                                                    <p className="text-gray-500">Aucune option trouvée pour cette catégorie</p>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Modal pour afficher les détails en mode mobile/tablette */}
            <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
                <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Détails du profil</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                        {/* User Profile Details */}
                        <div>
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-32 h-32 rounded-full mb-4">
                                    {userUnique.image && (userUnique.image as string).startsWith("http") ? (
                                        <Image className="rounded-full object-cover" width={150} height={150} src={userUnique.image as string} alt={userUnique.firstName} />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-full">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-2xl font-bold mb-1">
                                    <span className="font-medium">{userUnique.lastName}</span> {userUnique.firstName}
                                </h2>
                            </div>
                            {/* les coordonnees */}
                            <div className="flex items-center flex-col gap-4 text-sm text-gray-500 mb-4">
                                <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                    <div className="text-sm font-medium text-gray-600">
                                        <span>Email</span>
                                    </div>
                                    <div className="px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-50">
                                        <span className="text-sm font-medium text-gray-600">{userUnique.email}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                    <div className="text-sm font-medium text-gray-600">
                                        <span>Contact</span>
                                    </div>
                                    <div className="px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-50">
                                        <span className="text-sm font-medium text-gray-600">{userUnique.contact}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                    <div className="text-sm font-medium text-gray-600">
                                        <span>Provenance</span>
                                    </div>
                                    <div className="px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-50">
                                        <span className="text-sm font-medium text-gray-600">{userUnique.provence}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                    <div className="text-sm font-medium text-gray-600">
                                        <span>Position</span>
                                    </div>
                                    <div className="px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-50">
                                        <span className="text-sm font-medium text-gray-600">{userUnique.position}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectCategories && (
                            <>
                                <div className="mb-4 mt-8 flex justify-between items-center gap-2">
                                    <h3 className="text-md font-medium mb-2">Tontine choisie</h3>
                                    <div className="px-2 py-1 w-fit border border-orange-100 rounded-md bg-orange-500 flex justify-center items-center">
                                        <span className="text-sm font-medium text-gray-50">{selectCategories}Fcfa</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {optionTab && optionTab.length > 0 ? (
                                        optionTab
                                            .filter(items => items.category === selectCategories)
                                            .map((items, index) => (
                                                <div key={index} className="border border-gray-100 rounded-lg p-4 bg-white shadow-gray-100">
                                                    <div className="mb-2">
                                                        <div className="flex justify-between mb-2">
                                                            <span className="text-[14px] font-medium text-gray-600">Option:</span>
                                                            <div className="px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center">
                                                                <span className="text-sm font-medium text-gray-50">{`${items.option === "1" ? items.option + "ère" : items.option + "ème"} `}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between mb-2">
                                                            <span className="text-[14px] font-medium text-gray-600">Quantité :</span>
                                                            <div className="px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center">
                                                                <span className="text-sm font-medium text-gray-50">{String(items.countOption).padStart(2, "0")}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between mb-2">
                                                            <span className="text-[14px] font-medium text-gray-600">A payer par/S :</span>
                                                            <div className="px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center">
                                                                <span className="text-sm font-medium text-gray-50">{items.totalToPayByWeekOfThisOption} Fcfa</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col mb-1">
                                                            <span className="text-[14px] font-medium text-gray-600">Les articles à prendre:</span>
                                                            <div className="mt-4">
                                                                <div className="p-2 w-full border border-gray-100 rounded-lg bg-gray-50">
                                                                    <div className="flex flex-wrap gap-1">
                                                                        {items.components && items.components.length > 0 ? (
                                                                            items.components.map((item) => (
                                                                                <div key={item.id} className="shadow-gray-100 px-2 py-1 w-fit border border-gray-200 rounded-md bg-white flex justify-center items-center">
                                                                                    <span className="text-sm font-medium text-gray-600">{item.compose}</span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                            <span className="text-sm text-gray-500">Aucun article</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <div className="text-center py-4">
                                            <p className="text-gray-500">Aucune option trouvée pour cette catégorie</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Fermer</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* modal pour la mise a jour */}
            <Dialog open={modal} onOpenChange={setModal}>
                <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Mis à jour de statut de paiement</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Gestion du compte des particuliers
                        </p>
                        {sendUpdateError &&
                            <Alert className="border-red-200 bg-red-50">
                                <AlertCircle className="h-4 w-4 text-red-500" />
                                <AlertDescription className="text-red-700">
                                    {sendUpdateError}
                                </AlertDescription>
                            </Alert>
                        }
                        {sendUpdateSuccess &&
                            <Alert className="border-green-200 bg-green-50">
                                <SquareCheckBig className="h-4 w-4 text-green-500" />
                                <AlertDescription className="text-green-700">
                                    {sendUpdateSuccess}
                                </AlertDescription>
                            </Alert>
                        }

                        <div className="space-y-4">
                            {/* Sélecteur de tontine */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tontine choisie</label>
                                <Input
                                    value={datamodal.category}
                                    className="w-full"
                                    disabled
                                />
                            </div>
                            {/* Options */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Options </label>
                                <Input
                                    value={`[${datamodal.listOptions?.join("; ") || "Aucune option"}]`}
                                    className="w-full"
                                    disabled
                                />
                            </div>
                            {/* Semaine */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Semaine</label>
                                <Input
                                    value={datamodal.week}
                                    className="w-full"
                                    disabled
                                />
                            </div>

                            {/* Sélecteur de statut*/}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Statut</label>
                                <Select
                                    onValueChange={(value) => {
                                        setSelectedStatut(value);
                                        setDatamodal(prev => ({
                                            ...prev,
                                            statut: value
                                        }));
                                    }}
                                    value={selectedStatut}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionner un statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuts.map((statut) => (
                                            <SelectItem key={statut.id} value={statut.name}>
                                                {statut.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* Montant */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Montant Paye par Semaine</label>
                                <Input
                                    value={datamodal.totalPaidByWeek}
                                    className="w-full"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="mr-2" disabled={updateLoad}>
                                Annuler
                            </Button>
                        </DialogClose>
                        <Button className="bg-[#FF4000] hover:bg-[#FF4000]/80" disabled={updateLoad} type="submit"
                            onClick={handleUpdate}>
                            {updateLoad ? " en cours ..." : "Confirmer"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            { /* pour afficher l'image du  profil en grand */}
            <Dialog open={openImage} onOpenChange={setOpenImage}>
                <DialogContent className=" p-0 bg-white [&>button:last-child]:hidden"  >
                    <DialogHeader >
                        <DialogTitle> </DialogTitle>
                    </DialogHeader>
                    <div className="relative">
                        {/* Bouton de fermeture */}
                        <DialogClose
                            onClick={() => setOpenImage(false)}
                            className="absolute top-0 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </DialogClose>

                        {/* Contenu du modal */}
                        {selectedImage && (
                            <div className="flex flex-col">
                                {/* En-tête avec nom du produit */}
                                <div className="p-6 pb-4 border-b">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                                        {selectedImage.name}
                                    </h2>

                                </div>

                                {/* Image en grand */}
                                <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100">
                                    {selectedImage.image ? (
                                        <Image
                                            src={selectedImage.image as string}
                                            alt={selectedImage?.name ?? " fefe"}
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
                                        Cliquez à l&aposextérieur ou sur x pour fermer
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
};