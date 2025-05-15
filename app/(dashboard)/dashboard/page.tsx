// pages/dashboard.tsx
"use client";

import { useState } from "react";
import {
    ChevronRight,
    ChevronLeft,
    Home,
    Users,
    List,
    Clock,
    CreditCard,
    Settings,
    LogOut,
    Search,
    FileText,
    CalendarIcon,
    Eye, Pencil, Trash2,
    MoreVertical,
    Filter
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from "recharts";
import {
    Card,
    CardContent
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Avatar } from "@/src/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/src/components/ui/dialog";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/src/components/ui/tabs";

import { Calendar } from "@/src/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";

import { Startscard } from "@/src/components/dash_composant/staticard";
import { useRouter } from "next/navigation";

// Données pour le graphique d'évolution
const paymentData = [
    { name: "Sem 1", value: 5000 },
    { name: "Sem 2", value: 10000 },
    { name: "Sem 3", value: 15000 },
    { name: "Sem 4", value: 17000 },
    { name: "Sem 5", value: 30000 },
    { name: "Sem 6", value: 35000 },
    { name: "Sem 7", value: 45000 },
    { name: "Sem 8", value: 48000 },
    { name: "Sem 9", value: 52000 },
    { name: "Sem 10", value: 57000 },
    { name: "Sem 11", value: 62000 },
    { name: "Sem 12", value: 67000 },
    { name: "Sem 13", value: 75000 },
];

// Données pour le graphique d'analyse
const contentAnalysisData = [
    { name: "Opt 1", value: 10, amount: "100F" },
    { name: "Opt 2", value: 40, amount: "200F" },
    { name: "Opt 3", value: 20, amount: "300F" },
    { name: "Opt 4", value: 50, amount: "400F" },
    { name: "Opt 5", value: 12, amount: "500F" },
    { name: "Opt 6", value: 5, amount: "1000F" },
];

// Données des utilisateurs en retard
const lateUsers = [
    {
        id: 1,
        name: "John Carter",
        email: "hello@johnexample.com",
        date: "30 Mars 2025",
        choice: "100 Fcfa",
        timeElapsed: "4ème",
        timeRemaining: "2ème",
        amountPaid: "2000F"
    },
    {
        id: 2,
        name: "Alan Carter",
        email: "hello@alanexample.com",
        date: "30 Mars 2025",
        choice: "100 Fcfa",
        timeElapsed: "4ème",
        timeRemaining: "2ème",
        amountPaid: "2000F"
    },
    {
        id: 3,
        name: "John Carter",
        email: "hello@johnexample.com",
        date: "30 Mars 2025",
        choice: "100 Fcfa",
        timeElapsed: "4ème",
        timeRemaining: "2ème",
        amountPaid: "2000F"
    },
    {
        id: 4,
        name: "John Carter",
        email: "hello@johnexample.com",
        date: "30 Mars 2025",
        choice: "100 Fcfa",
        timeElapsed: "4ème",
        timeRemaining: "2ème",
        amountPaid: "2000F"
    },
    {
        id: 5,
        name: "John Carter",
        email: "hello@johnexample.com",
        date: "30 Mars 2025",
        choice: "100 Fcfa",
        timeElapsed: "4ème",
        timeRemaining: "2ème",
        amountPaid: "2000F"
    },
    {
        id: 6,
        name: "John Carter",
        email: "hello@johnexample.com",
        date: "30 Mars 2025",
        choice: "100 Fcfa",
        timeElapsed: "4ème",
        timeRemaining: "2ème",
        amountPaid: "2000F"
    }
];

export default function Dashboard() {

    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [selectedTontine, setSelectedTontine] = useState<string>("");
    const [paymentDate, setPaymentDate] = useState<Date | undefined>(undefined);

    // Exemple de données de tontines - à remplacer par vos données réelles
    const tontines = [
        { id: "1", name: "100" },
        { id: "2", name: "200" },
        { id: "3", name: "300" },
        { id: "4", name: "400" },
        { id: "5", name: "500" },
    ];

    const route = useRouter()


    return (
        <div className="">


            {/* Main content */}

            <div >

                <main className="p-6">
                    <div className=" flex  gap-4">
                        {/* les cardstat */}
                        <div className="bg-gradient-to-l from-[#FFAE91] to-[#FF4000] rounded-lg text-white p-6 mb-6 w-full h-[300px] ">
                            <h1 className="text-2xl font-bold mb-4">Hello, Everyone</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Startscard title="Utilisateurs" description="utilisateurs enregistrés " value="200" icon={<Users className="w-4 h-4 text-[#FF4000]" />} />
                                <Startscard title="Cette semaine" description="reçu cette semaine" value="20K+" icon={<FileText className="w-4 h-4 text-[#FF4000]" />} />
                                <Startscard title="Montant Total" description="montant total encaissé jusqu'ici" value="210K+" icon={<CreditCard className="w-4 h-4 text-[#FF4000]" />} />
                            </div>

                        </div>
                        {/* Semaine en cours */}
                        <div className="bg-gradient-to-r from-[#FF4000] to-[#FFAE91] rounded-lg text-white p-6 w-1/3 h-[300px]  ">
                            <h2 className="text-lg font-semibold mb-4">Semaine en cours</h2>
                            <div className="flex justify-center flex-col items-center">
                                <div className="relative h-36 w-36">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <p className="text-4xl font-bold">21%</p>

                                        </div>
                                    </div>
                                    <svg className="h-full w-full" viewBox="0 0 100 100">
                                        <circle
                                            cx="50" cy="50" r="40"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.2)"
                                            strokeWidth="10"
                                        />
                                        <circle
                                            cx="50" cy="50" r="40"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="10"
                                            strokeDasharray="251.2"
                                            strokeDashoffset="198.5"
                                            transform="rotate(-90 50 50)"
                                        />
                                    </svg>
                                </div>
                                <div className=" mt-2 flex justify-center items-center flex-col ">
                                    <p className="text-xs">semaines validées</p>
                                    <p className="text-center text-xs mt-4">14 avril au 21 avril 2025</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Graphiques */}
                    <div className="flex  gap-x-6 h-[400px]">
                        <Card className=" h-full  w-full shadow shadow-gray-50 ">
                            <CardContent className=" ">
                                <div className="flex justify-between items-center  mb-4">
                                    <h2 className="font-semibold text-sm ">Évolution des paiements</h2>
                                </div>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={paymentData} margin={{ top: 5, bottom: 5 }}>
                                            <defs>
                                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#FF4000" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#FF4000" stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                            <YAxis tick={{ fontSize: 10 }} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: "8px", backgroundColor: "#fff", border: "1px solid #cccccc" }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#FF4000"
                                                fillOpacity={1}
                                                fill="url(#colorValue)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                            </CardContent>
                        </Card>
                        <Tabs defaultValue="jour" className="w-[700px] h-full">
                            <Card className=" shadow shadow-gray-50 h-full ">
                                <CardContent className="">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="font-semibold text-sm">Analyse de contenus</h2>

                                        <TabsList className=" h-8 items-center justify-center">
                                            <TabsTrigger value="jour" className="text-xs px-2 data-[state=active]:bg-[#FF4000] data-[state=active]:text-white">100F</TabsTrigger>
                                            <TabsTrigger value="mois" className="text-xs px-2 data-[state=active]:bg-[#FF4000] data-[state=active]:text-white">200F</TabsTrigger>
                                            <TabsTrigger value="an" className="text-xs px-2 data-[state=active]:bg-[#FF4000] data-[state=active]:text-white">300F</TabsTrigger>
                                            <TabsTrigger value="tout" className="text-xs px-2 data-[state=active]:bg-[#FF4000] data-[state=active]:text-white">500F</TabsTrigger>
                                        </TabsList>

                                    </div>
                                    <div className="h-[300px] ">
                                        <TabsContent value="jour" className="h-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={contentAnalysisData} margin={{ top: 5, bottom: 5 }}>
                                                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                                    <YAxis tick={{ fontSize: 10 }} />
                                                    <Tooltip
                                                        contentStyle={{ borderRadius: "8px", backgroundColor: "#fff", border: "1px solid #cccccc" }}
                                                        formatter={(value, name, props) => [value, props.payload.amount]}
                                                        labelFormatter={(value) => ` ${value}`}
                                                    />
                                                    <Bar dataKey="value" fill="#FF4000" />
                                                </BarChart>
                                            </ResponsiveContainer>

                                        </TabsContent>

                                    </div>

                                </CardContent>
                            </Card>
                        </Tabs>
                    </div>

                    {/* Tableau des utilisateurs en retard */}
                    <Card className="mt-6 shadow shadow-gray-50 ">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="px-3 py-2 bg-[#FF4000] text-white rounded-md">Utilisateurs en retard</span>
                                        <span className="px-3 py-2 border rounded-md">{lateUsers.length.toString().padStart(2, "0")}</span>
                                    </div>
                                </div>


                                <div className="flex items-center">
                                    <Button className=" flex items-center bg-black" onClick={() => setFilterDialogOpen(true)}>
                                        <Filter className="mr-2 h-4 w-4"></Filter>
                                        Filtrer
                                    </Button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader >
                                        <TableRow className="">
                                            <TableHead className="text-left">Utilisateurs</TableHead>
                                            <TableHead className="text-left">Date d'entrée</TableHead>
                                            <TableHead className="text-left">Tontine choisie</TableHead>
                                            <TableHead className="text-center">Semaine actuelle</TableHead>
                                            <TableHead className="text-center">Dernier paiement</TableHead>
                                            <TableHead className="text-right">Montant payé</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>

                                    </TableHeader>
                                    <TableBody>
                                        {lateUsers.map((user, index) => (
                                            <TableRow key={user.id} className={`${index % 2 === 0 ? "bg-[#FFAE91]/10 " : ""} `} >
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Avatar className="h-8 w-8 bg-[#FFAE91] text-white mr-2 flex items-center justify-center">
                                                            <span className="text-xs">{user.name.charAt(0)}</span>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium">{user.name}</p>
                                                            <p className="text-xs text-gray-500">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{user.date}</TableCell>
                                                <TableCell>{user.choice}</TableCell>
                                                <TableCell className="text-center">
                                                    <span className="text-xs text-green-600 bg-green-100 py-1 px-2 rounded">{user.timeElapsed}</span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className="text-xs text-red-600 bg-red-100 py-1 px-2 rounded">{user.timeRemaining}</span>
                                                </TableCell>
                                                <TableCell className="text-right">{user.amountPaid}</TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            align="end"
                                                            className="w-46 rounded-lg shadow-lg border border-gray-200 p-2"
                                                        >
                                                            {/* Item Details */}
                                                            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer  hover:rounded-lg hover:shadow-gray-200">
                                                                <div className="flex items-center "
                                                                    onClick={() => route.push(`/dashboard/users/edit/${user.id}`)}>
                                                                    <div className="bg-gray-100 p-1.5 rounded-full mr-3">
                                                                        <Eye className="h-4 w-4 text-gray-500" />
                                                                    </div>
                                                                    <span>Details</span>
                                                                </div>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>

            {/* Dialog de filtrage */}

            <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen} >
                <DialogContent className="sm:max-w-md ">
                    <DialogHeader>
                        <DialogTitle>Filtrage</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 ">
                        <p className="text-sm text-muted-foreground">
                            Filtrer selon les critères de sélection
                        </p>

                        <div className="space-y-4">
                            {/* Sélecteur de tontine */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tontine choisie</label>
                                <Select onValueChange={setSelectedTontine} value={selectedTontine}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionner une tontine" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tontines.map((tontine) => (
                                            <SelectItem key={tontine.id} value={tontine.id}>
                                                {tontine.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Sélecteur de date */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Dernier paiement</label>
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
                        <Button className="bg-[#FF4000] hover:bg-[#FF4000]/90">
                            Confirmer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}