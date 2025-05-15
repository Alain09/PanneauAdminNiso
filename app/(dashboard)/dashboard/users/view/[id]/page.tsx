"use client";

import { useEffect, useState } from "react";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/src/components/ui/dropdown-menu";
import { Edit, MoreVertical, Calendar, FileText, Wallet } from "lucide-react";
import Bande from "@/src/components/users/bande";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { StatsCardProps } from '@/type';
import StatisCardUser from "@/src/components/users/statisCard";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Input } from "@/src/components/ui/input";

import { useRouter } from "next/navigation";

// Types
interface TontinePayment {
    id: string;
    date: string;
    amount: string;
    options: string;
    week: string;
    amountToPay: string;
    status: "Payé" | "Retard" | "En cours";
}

interface TontineItem {
    name: string;
    quantity: string;
}

// les articles a prendre

const Article = [
    {
        id: "1",
        item: "1 canette"

    },
    {
        id: "2",
        item: "6 plats"

    },
    {
        id: "3",
        item: "1 montre man"

    },
    {
        id: "4",
        item: "02 sacs de riz"

    },
    {
        id: "5",
        item: "pagne (6m)"

    },
    {
        id: "6",
        item: "2 glacières"

    },


]

export default function UserProfilePage ({ params,
}: { params: { id: string } }) {
    
const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

    const { id } = params; // Extracting the ID from the URL parameters
    const route = useRouter()

    const [payments, setPayments] = useState<TontinePayment[]>([
        { id: generateId(), date: "03/04/2025", amount: "100 Fcfa", options: "1; 2; 3", week: "Sem 1", amountToPay: "3200", status: "Payé" },
        { id: generateId(), date: "03/04/2025", amount: "100 Fcfa", options: "1; 2; 3", week: "Sem 2", amountToPay: "3000", status: "Payé" },
        { id: generateId(), date: "03/04/2025", amount: "100 Fcfa", options: "1; 2; 3", week: "Sem 3", amountToPay: "3000", status: "Payé" },
        { id: generateId(), date: "03/04/2025", amount: "100 Fcfa", options: "1; 2; 3", week: "Sem 4", amountToPay: "3000", status: "Payé" },
        { id: generateId(), date: "03/04/2025", amount: "100 Fcfa", options: "1; 2; 3", week: "Sem 5", amountToPay: "3000", status: "Payé" },
        { id: generateId(), date: "03/04/2025", amount: "100 Fcfa", options: "1; 2; 3", week: "Sem 6", amountToPay: "3000", status: "Retard" },
        { id: generateId(), date: "03/04/2025", amount: "100 Fcfa", options: "1; 2; 3", week: "Sem 7", amountToPay: "3000", status: "Retard" },
        { id: generateId(), date: "03/04/2025", amount: "100 Fcfa", options: "1; 2; 3", week: "Sem 8", amountToPay: "3000", status: "En cours" },
        { id: generateId(), date: "03/04/2025", amount: "100 Fcfa", options: "1; 2; 3", week: "Sem 9", amountToPay: "3000", status: "En cours" },
        { id: generateId(), date: "03/04/2025", amount: "100 Fcfa", options: "1; 2; 3", week: "Sem 10", amountToPay: "3000", status: "En cours" },
        { id: generateId(), date: "03/04/2025", amount: "100 Fcfa", options: "1; 2; 3", week: "Sem 11", amountToPay: "3000", status: "En cours" },
        { id: generateId(), date: "03/04/2025", amount: "100 Fcfa", options: "1; 2; 3", week: "Sem 12", amountToPay: "3000", status: "En cours" },
        { id: generateId(), date: "03/04/2025", amount: "100 Fcfa", options: "1; 2; 3", week: "Sem 13", amountToPay: "3000", status: "En cours" },
    ]);

   

    const ViewTontine = [
        '100', '200', '300', '500'
    ]

    const tontines = [
        { id: "1", name: "100" },
        { id: "2", name: "200" },
        { id: "3", name: "300" },
        { id: "4", name: "400" },
        { id: "5", name: "500" },
    ];

    const statuts = [
        { id: "1", name: "Payé" },
        { id: "2", name: "Retard" },
        { id: "3", name: "En cours" },
    ]

    const [selectedMontant, setSelectedMontant] = useState<string>("");
    const [selectedStatut, setSelectedStatut] = useState<string>("");

    // la mise a jour sur les details de la tontine choisie
    const [selectTontine, setSelectTontine] = useState("100")

    //modal pour la mise a des donnees
    const [modal, setModal] = useState(false)

    //date de la mise a jour
    const [paymentDate, setPaymentDate] = useState<Date | undefined>(undefined);

    return (
        <div className="px-6 py-3  min-h-screen">
            { /* btn retour  */}
            <Bande />
            <div>
                <div className="flex  gap-6 w-full  relative">
                    {/* Left Section - User details and transactions */}  { /* tab liste */}
                    <Tabs className="flex-1 space-y-6 w-full " defaultValue="100" orientation="vertical">
                        <Card className="bg-white px-1 rounded-lg shadow-gray-100 border border-gray-100">
                            <CardContent>
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-4xl font-bold">
                                        Hello, <span className="text-orange-500">Alain .H</span>
                                    </h1>

                                </div>


                                <div className="mb-6 flex justify-between items-center">
                                    <h2 className="text-lg font-medium mb-3">Tontine(s) choisi(es)</h2>
                                    <TabsList className=" h-10 items-center justify-center bg-gray-100">
                                        {ViewTontine.map((item, index) => (
                                            <TabsTrigger
                                                onClick={() => { setSelectTontine(item) }}
                                                key={index} value={`${item}`} className="text-md text-gray-500 px-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">{item}F</TabsTrigger>
                                        ))}
                                    </TabsList>
                                </div>
                                {
                                    ViewTontine.map((item, index) => (
                                        <TabsContent value={item} className="mb-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                <StatisCardUser title="Montant total payé" value="20500f" icon={<Wallet className="w-4 h-4 text-orange-500" />} />
                                                <StatisCardUser title="Semaines validées" value="5/15" icon={<Calendar className="w-4 h-4 text-orange-500" />} />
                                                <StatisCardUser title="Total à payer " value="3200f" icon={<FileText className="w-4 h-4 text-orange-500" />} />
                                            </div>

                                            <div className="flex justify-end gap-2 mb-4">
                                                <Button className="rounded-md">
                                                    Exporter sous
                                                </Button>
                                                <Button variant="ghost" className="p-2" onClick={() => { setModal(true) }}>
                                                    <MoreVertical className="w-5 h-5" />
                                                </Button>
                                            </div>

                                            <div className="border rounded-lg overflow-hidden">
                                                <Table>
                                                    <TableHeader className="bg-gray-50">
                                                        <TableRow>
                                                            <TableHead className="w-32">
                                                                <div className="flex items-center ">
                                                                    Date
                                                                </div>
                                                            </TableHead>
                                                            <TableHead>
                                                                <div className="flex items-center ">

                                                                    Tontine choisie
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
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {payments.map((payment) => {
                                                            useEffect(() => {
                                                                setSelectedMontant(payment.amountToPay)
                                                            })

                                                            return (
                                                                <TableRow key={payment.id} className="bg-orange-50/30">
                                                                    <TableCell>{payment.date}</TableCell>
                                                                    <TableCell>{payment.amount}</TableCell>
                                                                    <TableCell>{payment.options}</TableCell>
                                                                    <TableCell>{payment.week}</TableCell>
                                                                    <TableCell>{payment.amountToPay}</TableCell>
                                                                    <TableCell>
                                                                        <Badge
                                                                            variant="outline"
                                                                            className={
                                                                                payment.status === "Payé"
                                                                                    ? "text-xs text-green-600 bg-green-100  py-1 px-2 rounded"
                                                                                    : payment.status === "Retard"
                                                                                        ? "text-xs text-red-600 bg-red-100 py-1 px-2 rounded"
                                                                                        : "text-xs text-blue-600 bg-blue-100 py-1 px-2 rounded"
                                                                            }
                                                                        >
                                                                            • {payment.status}
                                                                        </Badge>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </div>

                                        </TabsContent>
                                    ))


                                }

                            </CardContent>

                        </Card>
                    </Tabs>

                    {/* Right Section - User profile */}
                    <div className="w-96 space-y-6">
                        <Card className="bg-white px-1  shadow-gray-100 border border-gray-100 sticky top-[75px]">
                            <CardContent >
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="text-2xl font-semibold text-orange-500">Profil</h1>
                                    <div className="p-3 bg-orange-100  rounded-full hover:bg-orange-200 cursor-pointer"
                                     onClick={()=>route.push(`/dashboard/users/edit/${id}`)}
                                    >
                                        <Edit className="w-4 h-4  text-orange-500 " />
                                    </div>
                                </div>
                                {/* User Profile Details */}
                                <div>
                                    <div className="flex flex-col items-center mb-6">
                                        <div className="w-32 h-32 bg-gray-100 rounded-full mb-4"></div>
                                        <h2 className="text-2xl font-bold mb-1"> <span className=" font-medium">Alain T.</span> HOUNGA</h2>
                                    </div>
                                    { /*  les coordonnees  */}
                                    <div className="flex items-center flex-col gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                            <div className="text-sm font-medium text-gray-600">
                                                <span>Email</span>
                                            </div>

                                            <div className=" px-2 py-1  w-fit border border-gray-100 rounded-md bg-gray-50" >
                                                < span className="text-sm font-medium text-gray-600" >alain090901@gmail.com</span>
                                            </div>

                                        </div>
                                        <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                            <div className="text-sm font-medium text-gray-600">
                                                <span>Contact</span>
                                            </div>

                                            <div className=" px-2 py-1  w-fit border border-gray-100 rounded-md bg-gray-50" >
                                                < span className="text-sm font-medium text-gray-600" >+229 0161624396</span>
                                            </div>

                                        </div>
                                        <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                            <div className="text-sm font-medium text-gray-600">
                                                <span>Provenance</span>
                                            </div>

                                            <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-50" >
                                                < span className="text-sm font-medium text-gray-600" >Cotonou</span>
                                            </div>

                                        </div>
                                        <div className="flex items-center justify-between w-full gap-1 border-b border-gray-200 pb-3">
                                            <div className="text-sm font-medium text-gray-600">
                                                <span>Position</span>
                                            </div>

                                            <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-50" >
                                                < span className="text-sm font-medium text-gray-600" >Etudiant</span>
                                            </div>

                                        </div>

                                    </div>


                                </div>


                                <div className="mb-4 mt-8 flex justify-between items-center gap-2">
                                    <h3 className="text-md font-medium mb-2">Tontine choisie</h3>
                                    <div className=" px-2 py-1 w-fit border border-orange-100 rounded-md bg-orange-500 flex justify-center items-center" >
                                        < span className="text-sm font-medium text-gray-50" >{selectTontine}Fcfa</span>
                                    </div>
                                </div>
                                <div className=" space-y-4">
                                    {/* les details sur les choix */}
                                    <div className="border border-gray-100 rounded-lg p-4 bg-white shadow-gray-100 ">
                                        <div className="mb-2">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-[14px] font-medium text-gray-600 "> Option:</span>
                                                <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center" >
                                                    < span className="text-sm font-medium text-gray-50">1ere</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-[14px] font-medium text-gray-600">Quantité :</span>
                                                <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center" >
                                                    < span className="text-sm font-medium text-gray-50" >01</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-[14px] font-medium text-gray-600 ">A payer par/S :</span>
                                                <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center" >
                                                    < span className="text-sm font-medium text-gray-50" >800 Fcfa</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col mb-1">
                                                <span className="text-[14px] font-medium text-gray-600 ">Les articles à prendre:</span>
                                                <div className=" mt-4">
                                                    <div className=" p-2  w-full border border-gray-100 rounded-lg bg-gray-50" >
                                                        <div className=" flex flex-wrap gap-1 ">

                                                            {Article.map((item) => (
                                                                <div key={item.id} className=" shadow-gray-100 px-2 py-1 w-fit border border-gray-200 rounded-md bg-white flex justify-center items-center" >
                                                                    < span className="text-sm font-medium text-gray-600" >{item.item}</span>
                                                                </div>
                                                            ))}

                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                    {/* les details sur les choix */}
                                    <div className="border border-gray-100 rounded-lg p-4 bg-white shadow-gray-100 ">
                                        <div className="mb-2">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-[14px] font-medium text-gray-600 "> Option:</span>
                                                <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center" >
                                                    < span className="text-sm font-medium text-gray-50">2ème</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-[14px] font-medium text-gray-600">Quantité :</span>
                                                <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center" >
                                                    < span className="text-sm font-medium text-gray-50" >01</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-[14px] font-medium text-gray-600 ">A payer par/S :</span>
                                                <div className=" px-2 py-1 w-fit border border-gray-100 rounded-md bg-gray-800 flex justify-center items-center" >
                                                    < span className="text-sm font-medium text-gray-50" >800 Fcfa</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col mb-1">
                                                <span className="text-[14px] font-medium text-gray-600 ">Les articles à prendre:</span>
                                                <div className=" mt-4">
                                                    <div className=" p-2  w-full border border-gray-100 rounded-lg bg-gray-50" >
                                                        <div className=" flex flex-wrap gap-1 ">

                                                            {Article.map((item) => (
                                                                <div key={item.id} className=" shadow-gray-100 px-2 py-1 w-fit border border-gray-200 rounded-md bg-white flex justify-center items-center" >
                                                                    < span className="text-sm font-medium text-gray-600" >{item.item}</span>
                                                                </div>
                                                            ))}

                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>

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
                        <DialogTitle>Mis à jout</DialogTitle>
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
                                    value={selectTontine}
                                    className=" w-full "
                                    disabled
                                />
                            </div>

                            {/* Sélecteur de statut*/}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Statut</label>
                                <Select onValueChange={setSelectedStatut} value={selectedStatut}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionner un statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuts.map((statut) => (
                                            <SelectItem key={statut.id} value={statut.id}>
                                                {statut.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* Montant */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Montant</label>
                                <Input
                                    value={selectedMontant}
                                    className=" w-full "
                                    disabled
                                />
                            </div>
                            {/* Date de paiement */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Date de paiement</label>
                                <Input
                                    type="date"
                                    value={paymentDate?.toISOString().split("T")[0]}
                                    onChange={(e) => setPaymentDate(new Date(e.target.value))}
                                    className="w-full"
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
                        <Button className="bg-orange-500 hover:bg-orange-600">
                            Confirmer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div >
    );
};

