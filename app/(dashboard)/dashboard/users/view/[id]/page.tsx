"use client";

import { useEffect, useState,use } from "react";
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

import { Edit, MoreVertical, Calendar, FileText, Wallet, } from "lucide-react";
import Bande from "@/src/components/users/bande";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Card, CardContent } from "@/src/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { CategoriesStatisquesPayement, Donnees, TontineOption, UserProfile } from '@/type';
import StatisCardUser from "@/src/components/users/statisCard";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Input } from "@/src/components/ui/input";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {

    const route = useRouter();

    // declaration des donnees specifique a l'utilisateur
    const [userUnique] = useState<UserProfile>(Donnees[0]);

    // recuperation des categories 
    const categories = userUnique.DescriptionChoixOfEachUser?.flatMap((cat) => cat.category).sort() as string[];

    // la mise a jour sur les details de la tontine choisie
    const [selectCategories, setSelectCategories] = useState(categories[0]);

    // structuration des données pour l'affichage par selection 
    const [uniqueUserData] = useState<CategoriesStatisquesPayement[]>(userUnique.DescriptionChoixOfEachUser as CategoriesStatisquesPayement[]);

    // recuperationsd de tous ls OptionDescriptions
    const OptionsDescriptions = userUnique.DescriptionChoixOfEachUser?.flatMap(items => items.optionsDescription) as TontineOption[];

    // application de la function a optionTab
    const [optionTab] = useState<TontineOption[]>(OptionsDescriptions);

    useEffect(() => {
        console.log("tab", optionTab);
    }, [optionTab]);

    const statuts = [
        { id: "1", name: "Payé" },
        { id: "2", name: "Retard" },
    ];

    const [selectedStatut, setSelectedStatut] = useState<string>("");

    //modal pour la mise a des donnees
    const [modal, setModal] = useState(false);

    // pour prendre les donnes du modale
    const [datamodal, setDatamodal] = useState({
        id: "",
        week: "",
        category: "",
        statut: "",
        listOptions: [] as string[],
        totalPaidByWeek: 0,
        DatePaiement: new Date(Date.now()),
    });


     // Résolvez la promesse des params
  const {id}=use(params);
    return (
        <div className="px-6 py-3  min-h-screen">
            { /* btn retour  */}
            <Bande />
            <div>
                {/* Left Section - User details and transactions */}
                <div className="flex  gap-6 w-full  relative">
                    <Tabs className="flex-1 space-y-6 w-full " defaultValue={categories[0]} orientation="vertical">
                        {
                            uniqueUserData.filter(user => user.category === selectCategories)
                                .map((user, index) => (
                                    <Card key={index} className="bg-white px-1 rounded-lg shadow-gray-100 border border-gray-100" >
                                        <CardContent>
                                            <div className="flex justify-between items-center mb-6">
                                                <h1 className="text-4xl font-bold">
                                                    Hello, {id} <span className="text-orange-500">{userUnique.firstName} <span>.</span> {userUnique.lastName.toString().charAt(0)}</span>
                                                </h1>
                                            </div>

                                            <div className="mb-6 flex justify-between items-center">
                                                <h2 className="text-lg font-medium mb-3">Catégorie(s) choisi(es)</h2>
                                                <TabsList className=" h-10 items-center justify-center bg-gray-100">
                                                    {categories?.map((item, index) => (
                                                        <TabsTrigger
                                                            onClick={() => { setSelectCategories(item); }}
                                                            key={index} value={`${item}`} className="text-md text-gray-500 px-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">{item}F</TabsTrigger>
                                                    ))}
                                                </TabsList>
                                            </div>

                                            <TabsContent value={selectCategories} className="mb-6">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                    <StatisCardUser title="Montant total payé" value={`${String(user.totalPaid)}`} icon={<Wallet className="w-4 h-4 text-orange-500" />} />
                                                    <StatisCardUser title="Semaines validées" value={`${String(user.weekValided)}/15`} icon={<Calendar className="w-4 h-4 text-orange-500" />} />
                                                    <StatisCardUser title="Total à payer " value={String(user.totalPaidByWeek)} icon={<FileText className="w-4 h-4 text-orange-500" />} />
                                                </div>

                                                <div className="flex justify-end gap-2 mb-4">
                                                    <Button className="rounded-md">
                                                        Exporter sous
                                                    </Button>
                                                </div>

                                                <div className="border rounded-lg overflow-hidden">
                                                    <Table>
                                                        <TableHeader className="bg-gray-50">
                                                            <TableRow>
                                                                <TableHead className="w-32">
                                                                    <div className="flex items-center ">
                                                                        Date de paiement
                                                                    </div>
                                                                </TableHead>
                                                                <TableHead>
                                                                    <div className="flex items-center ">
                                                                        Catégorie
                                                                    </div>
                                                                </TableHead>
                                                                <TableHead>
                                                                    <div className="flex items-center ">
                                                                        Option(s)
                                                                    </div>
                                                                </TableHead>
                                                                <TableHead>
                                                                    <div className="flex items-center">
                                                                        Semaines
                                                                    </div>
                                                                </TableHead>
                                                                <TableHead>
                                                                    <div className="flex items-center ">
                                                                        Montant à payer
                                                                    </div>
                                                                </TableHead>
                                                                <TableHead>Statut</TableHead>
                                                                <TableHead>Action</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {user.detailPaiementOfThisCategorie?.sort()?.map((payment, index) => {
                                                                return (
                                                                    <TableRow key={index} className="bg-orange-50/30">
                                                                        <TableCell>{new Date(payment?.DatePaiement as Date).toLocaleDateString()}</TableCell>
                                                                        <TableCell>{payment?.category} Fcfa</TableCell>
                                                                        <TableCell>[{user.listOptions?.join('; ')}]</TableCell>
                                                                        <TableCell>{payment?.week}</TableCell>
                                                                        <TableCell>{payment?.totalToPayByWeekOfThisCategory} Fcfa</TableCell>
                                                                        <TableCell>
                                                                            <Badge
                                                                                variant="outline"
                                                                                className={
                                                                                    payment?.status === "Payé"
                                                                                        ? "text-xs text-green-600 bg-green-100  py-1 px-2 rounded"
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
                                                                                payment?.status === "Payé" ? <span className="text-sm text-green-600 font-medium">aucune</span> :
                                                                                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => {
                                                                                        setModal(true);
                                                                                        setDatamodal({
                                                                                            id: payment.id,
                                                                                            week: payment.week as string,
                                                                                            category: payment.category,
                                                                                            statut: payment.status as string,
                                                                                            listOptions: user.listOptions as string[],
                                                                                            totalPaidByWeek: payment.totalToPayByWeekOfThisCategory as number,
                                                                                            DatePaiement: payment.DatePaiement as Date,
                                                                                        });
                                                                                    }}>
                                                                                        <MoreVertical className="h-4 w-4" />
                                                                                    </Button>
                                                                            }
                                                                        </TableCell>
                                                                    </TableRow>
                                                                );
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </TabsContent>
                                        </CardContent>
                                    </Card>
                                ))}
                    </Tabs>

                    {/* Right Section - User profile */}
                    <div className="w-96 space-y-6">
                        <Card className="bg-white px-1  shadow-gray-100 border border-gray-100 sticky top-[75px]">
                            <CardContent >
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="text-2xl font-semibold text-orange-500">Profil</h1>
                                    <div className="p-3 bg-orange-100  rounded-full hover:bg-orange-200 cursor-pointer"
                                        onClick={() => route.push(`/dashboard/users/edit/${userUnique.id}`)}
                                    >
                                        <Edit className="w-4 h-4  text-orange-500 " />
                                    </div>
                                </div>
                                {/* User Profile Details */}
                                <div>
                                    <div className="flex flex-col items-center mb-6">
                                        <div className="w-32 h-32  rounded-full mb-4"><Image className=" rounded-full" width={150} height={150} src={`${userUnique.image}`} alt={`${userUnique.firstName}`} /></div>
                                        <h2 className="text-2xl font-bold mb-1"> <span className=" font-medium">{userUnique.lastName}</span> {userUnique.firstName}</h2>
                                    </div>
                                    { /*  les coordonnees  */}
                                    <div className="flex items-center flex-col gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                            <div className="text-sm font-medium text-gray-600">
                                                <span>Email</span>
                                            </div>
                                            <div className=" px-2 py-1  w-fit border border-gray-100 rounded-md bg-gray-50" >
                                                < span className="text-sm font-medium text-gray-600" >{userUnique.email}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                            <div className="text-sm font-medium text-gray-600">
                                                <span>Contact</span>
                                            </div>
                                            <div className=" px-2 py-1  w-fit border border-gray-100 rounded-md bg-gray-50" >
                                                < span className="text-sm font-medium text-gray-600" >{userUnique.contact}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                            <div className="text-sm font-medium text-gray-600">
                                                <span>Provenance</span>
                                            </div>
                                            <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-50" >
                                                < span className="text-sm font-medium text-gray-600" >{userUnique.provence}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                            <div className="text-sm font-medium text-gray-600">
                                                <span>Position</span>
                                            </div>
                                            <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-50" >
                                                < span className="text-sm font-medium text-gray-600" >{userUnique.position}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4 mt-8 flex justify-between items-center gap-2">
                                    <h3 className="text-md font-medium mb-2">Tontine choisie</h3>
                                    <div className=" px-2 py-1 w-fit border border-orange-100 rounded-md bg-orange-500 flex justify-center items-center" >
                                        < span className="text-sm font-medium text-gray-50" >{selectCategories}Fcfa</span>
                                    </div>
                                </div>
                                <div className=" space-y-4">
                                    {
                                        optionTab.filter(items => items.category === selectCategories)
                                            .map((items, index) => (
                                                <div key={index} className="border border-gray-100 rounded-lg p-4 bg-white shadow-gray-100 ">
                                                    <div className="mb-2">
                                                        <div className="flex justify-between mb-2">
                                                            <span className="text-[14px] font-medium text-gray-600 "> Option:</span>
                                                            <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center" >
                                                                < span className="text-sm font-medium text-gray-50">{`${items.option === "1" ? items.option + "ère" : items.option + "ème"} `}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between mb-2">
                                                            <span className="text-[14px] font-medium text-gray-600">Quantité :</span>
                                                            <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center" >
                                                                < span className="text-sm font-medium text-gray-50" >{String(items.countOption).padStart(2, "0")}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between mb-2">
                                                            <span className="text-[14px] font-medium text-gray-600 ">A payer par/S :</span>
                                                            <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center" >
                                                                < span className="text-sm font-medium text-gray-50" >{items.totalToPayByWeekOfThisOption} Fcfa</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col mb-1">
                                                            <span className="text-[14px] font-medium text-gray-600 ">Les articles à prendre:</span>
                                                            <div className=" mt-4">
                                                                <div className=" p-2  w-full border border-gray-100 rounded-lg bg-gray-50" >
                                                                    <div className=" flex flex-wrap gap-1 ">
                                                                        {items.components.map((item) => (
                                                                            <div key={item.id} className=" shadow-gray-100 px-2 py-1 w-fit border border-gray-200 rounded-md bg-white flex justify-center items-center" >
                                                                                < span className="text-sm font-medium text-gray-600" >{item.compose}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* modal pour la mise a jour */}
            <Dialog open={modal} onOpenChange={setModal} >
                <DialogContent className="sm:max-w-md ">
                    <DialogHeader>
                        <DialogTitle>Mis à jout de statut de paiement</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 ">
                        <p className="text-sm text-muted-foreground">
                            Gestion du compte des particuliers
                        </p>

                        <div className="space-y-4">
                            {/* Sélecteur de tontine */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tontine choisie</label>
                                <Input
                                    value={datamodal.category}
                                    className=" w-full "
                                    disabled
                                />
                            </div>
                            {/* Options */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Options </label>
                                <Input
                                    value={`[${datamodal.listOptions?.join("; ")}]`}
                                    className=" w-full "
                                    disabled
                                />
                            </div>
                            {/* Semaine */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Semaine</label>
                                <Input
                                    value={datamodal.week}
                                    className=" w-full "
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
                                    className=" w-full "
                                    disabled
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
                        <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => alert(datamodal.statut)}>
                            Confirmer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    );
};