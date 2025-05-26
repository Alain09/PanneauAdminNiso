// pages/dashboard.tsx
"use client";

import { useEffect, useState } from "react";
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
    Filter,
    Clock4,
    Clock12,
    User,
    Loader2,
    File
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
import CounTimes from "@/src/components/dash_composant/CounTimes";
import { Donnees, OptionsCounts, PaymentDataVariation, StatisticCategories, TontineOption, UserProfile, UsersLatePayment } from "@/type";
import { generateId } from "@/src/lib/utils";
import { DataAction , ConvertInKilo } from "@/src/components/hook_perso";





export default function Dashboard() {


    // recuperationdes hook definis dans DataAction.ts
    const { StructurationCategorie, VariationPaid, UsersLate  , CaracterisqueUniques} = DataAction({ enter: Donnees })

    // recuperation de les des categorie et des semaines de retard
    const {weekss, uniqueCategories, UserTotal}=CaracterisqueUniques()

    // statisque financieres 

    const { datas, TotalGobal,TotalWeekActive}= VariationPaid()



    //----------------------- les gestionnaires d'etat---------------------------------//
    // gestionnaire d'etat pour les filtres et les options de paiement
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [selectedTontine, setSelectedTontine] = useState<string>("");
    const [paymentDate, setPaymentDate] = useState<Date | undefined>(undefined);

    // gestionnaire d'etat pour les paiements et les statistiques
    const [evolutionPaid, setEvolutionPaid] = useState<PaymentDataVariation[]>(datas)
    const [catCounts, setCatCounts] = useState<StatisticCategories[]>(StructurationCategorie())

    //gestion du categorie active dans les onglets
    const [firstCat, setFirstCat] = useState<string>(catCounts[0].categorie as string)

    // gestion des userLate : utilisateurs en retad de paiement
    const [lateUsers, setLateUsers] = useState<UsersLatePayment[]>(UsersLate())




    // filtre des utilisateurs

    const [searchUser, setSearchUser] = useState<string>("");
    const [selectedCategorie, setSelectedCategorie] = useState<string>("");
    const [lastWeekPaidUser, setLastWeekPaidUser] = useState<string>("");
    const [dataTabsUsers, setDataTabsUsers] = useState<UsersLatePayment[]>(lateUsers);
  
    const [filterModel, setFilterModel] = useState<boolean>(false);

    // fonction de filtrage
    const handleFilter = () => {
        const filteredData = dataTabsUsers.filter((user) => {
            const matchesCategory = selectedCategorie ? user?.category === selectedCategorie : true;
            const matchesStatus = lastWeekPaidUser ? user.lastWeekPaid === lastWeekPaidUser : true;
            return matchesCategory && matchesStatus;
        });
        setDataTabsUsers(filteredData);
        setFilterModel(false);
    };


    // fonction de rechargement
    const [load, setLoad] = useState(false)
    const handleReload = () => {
        setLoad(true)
        setDataTabsUsers(lateUsers);
        setSelectedCategorie("");
        setSearchUser("");
        setLastWeekPaidUser("");
        setTimeout(() => {
            setLoad(false)
        }, 1000)

    };

    /// recherche d'un utilisateur
    // fonction de recherche
    const handleSearch = () => {
        const filteredData = dataTabsUsers.filter((user) => { 
            const searchBolean = searchUser  ?  (user?.firstName?.toLowerCase().includes(searchUser) || user?.lastName?.toLowerCase().includes(searchUser)) : true;
            return searchBolean;
        });

        setDataTabsUsers(filteredData);
    }


 // Filter references when search query changes
  useEffect(() => {
    if (searchUser.trim() === '') {
      setDataTabsUsers(lateUsers)
    } else {
      const filteredData = dataTabsUsers.filter((user) =>
        user?.firstName?.toLowerCase().includes(searchUser) ||
        user?.lastName?.toLowerCase().includes(searchUser))
      setDataTabsUsers(filteredData);
    }
  }, [searchUser])







    // navigation des page --------------------------------------------
    const route = useRouter()

    // le chronometrage---------------------------------------------------------
    const Standard = new Date('2025-06-30T00:00:00');



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
                                <Startscard title="Utilisateurs" description="utilisateurs enregistrés " value={`${ConvertInKilo({value : 500})} `.toString().padStart(2,"0")} icon={<Users className="w-4 h-4 text-[#FF4000]" />} />
                                <Startscard title="Cette semaine" description="reçu cette semaine" value={`${ConvertInKilo({value :TotalWeekActive})}`}  icon={<FileText className="w-4 h-4 text-[#FF4000]" />} />
                                <Startscard title="Montant Total" description="montant total encaissé jusqu'ici" value={`${ConvertInKilo({value : TotalGobal})}`}  icon={<CreditCard className="w-4 h-4 text-[#FF4000]" />} />
                            </div>

                        </div>
                        {/* Campagne / Chrononometre */}
                        <div className="bg-gradient-to-l from-[#FFAE91] to-[#FF4000]/90 shadow shadow-gray-50 border border-gray-100  rounded-lg p-6 w-1/3 h-[300px]  ">
                            <h2 className="text-lg text-center font-semibold mb-4 text-white ">CHRONOMETRE:</h2>
                            <div className="flex justify-center  items-center flex-col  h-fit space-y-2  text-white">

                                <div ><Clock12 className=" text-white  animate-spin duration-1000" strokeWidth={1.25} size={100} /></div>
                                <div className=" ">{<CounTimes expiryTimestamp={Standard} />}</div>
                                <div className=" flex justify-center  items-center flex-col ">
                                    <p className="text-sm">Campagne de selection des articles</p>

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
                                        <AreaChart data={evolutionPaid} margin={{ top: 5, bottom: 5 }}>
                                            <defs>
                                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#FF4000" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#FF4000" stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="weeks" tick={{ fontSize: 10 }} />
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
                        <Tabs defaultValue={firstCat} className="w-[700px] h-full">
                            <Card className=" shadow shadow-gray-50 h-full ">
                                <CardContent className="">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="font-semibold text-sm">Analyse de contenus</h2>

                                        <TabsList className=" h-8 items-center justify-center">
                                            {catCounts.map((cat) => (
                                                <TabsTrigger key={cat.id} value={cat.categorie as string} className="text-xs px-2 data-[state=active]:bg-[#FF4000] data-[state=active]:text-white"
                                                    onClick={() => setFirstCat(cat.categorie as string)}
                                                >
                                                    {cat.categorie}
                                                </TabsTrigger>
                                            ))}
                                        </TabsList>

                                    </div>
                                    <div className="h-[300px] ">
                                        <TabsContent value={firstCat} className="h-full">
                                            {catCounts.map((cat) => {
                                                if (cat.categorie === firstCat) {
                                                    return (
                                                        <ResponsiveContainer key={cat.id} width="100%" height="100%">
                                                            <BarChart data={cat.listeOptions} margin={{ top: 5, bottom: 5 }}>

                                                                <XAxis dataKey="option" tick={{ fontSize: 10 }} />
                                                                <YAxis tick={{ fontSize: 10 }} />
                                                                <Tooltip
                                                                    contentStyle={{ borderRadius: "8px", backgroundColor: "#fff", border: "1px solid #cccccc" }}
                                                                    formatter={(count, option, props) => [count.toString().padStart(2, "0"), "quantité"]}
                                                                    labelFormatter={(count) => ` option ${count}`}
                                                                />
                                                                <Bar dataKey="count" fill="#FF4000" />
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    )
                                                }
                                            }
                                            )
                                            }

                                        </TabsContent>

                                    </div>

                                </CardContent>
                            </Card>
                        </Tabs>
                    </div>

                    {/* Tableau des utilisateurs en retard */}
                    <Card className="mt-6 shadow shadow-gray-50 ">
                        <CardContent className="p-0">
                
                            <div className="flex items-center gap-10 mb-4 px-4 pt-4">
                                <div className="flex items-center space-x-2 w-fit">
                                    <div className="flex items-center space-x-2 w-fit">
                                        <span className="px-3 py-1.5 bg-[#FF4000] text-white rounded-md  w-[180px] ">Utilisateurs en Retard</span>
                                        <span className="px-2 py-1.5 border rounded-md">{dataTabsUsers.length.toString().padStart(2, "0")}</span>
                                    </div>
                                </div>
                                <div className="relative w-full">
                                    <Input
                                        type='text'
                                        onChange={(e) => {
                                            setSearchUser(e.target.value.toLowerCase());
                                            handleSearch();
                                        }}
                                        value={searchUser}
                                        className="pl-8 w-full "
                                        placeholder="rechercher un nom"
                                    />
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                </div>
                                <div className="flex items-center space-x-4">

                                    <Button
                                        variant="destructive"
                                        className="flex items-center bg-[#FF4000] hover:bg-[#FF4000]/90"
                                        onClick={() => setFilterModel(true)}
                                    >
                                        <Filter className="mr-2 h-4 w-4"

                                        />
                                        Filtrer
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="flex items-center bg-[#FF4000] hover:bg-[#FF4000]/90"
                                        onClick={handleReload}
                                    >
                                        <Loader2 className={`mr-2 h-4 w-4 ${load ? "animate-spin duration-300" : ""}`}

                                        />
                                        Recharger
                                    </Button>


                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className=" p-2">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="w-46 rounded-lg shadow-lg border border-gray-200 p-2"
                                        >
                                            {/* telecharger le pdf */}
                                            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer  hover:rounded-lg hover:shadow-gray-200">
                                                <div className="flex items-center"

                                                >
                                                    <div className="bg-gray-100 p-1.5 rounded-full mr-3">
                                                        <FileText className="h-4 w-4 text-gray-500" />
                                                    </div>
                                                    <span>Exporter le pdf</span>
                                                </div>
                                            </DropdownMenuItem>

                                            {/* telecharger le fichier excel */}
                                            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer  hover:rounded-lg hover:shadow-gray-200">
                                                <div className="flex items-center"

                                                >
                                                    <div className="bg-gray-100 p-1.5 rounded-full mr-3">
                                                        <File className="h-4 w-4 text-gray-500" />
                                                    </div>
                                                    <span>Exporter l'excel</span>
                                                </div>
                                            </DropdownMenuItem>

                                            {/* Item Supprimer */}

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader >
                                        <TableRow className="">
                                            <TableHead className="text-left">Utilisateurs</TableHead>
                                            <TableHead className="text-center">Statut</TableHead>
                                            <TableHead className="text-center">Catégorie choisie</TableHead>
                                            <TableHead className="text-center">Semaine actuelle</TableHead>
                                            <TableHead className="text-center">Dernier paiement</TableHead>
                                            <TableHead className="text-center">Montant payé</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>

                                    </TableHeader>
                                    <TableBody>
                                        {dataTabsUsers.map((user, index) => (
                                            <TableRow key={index} className={`${index % 2 === 0 ? "bg-[#FFAE91]/10 " : ""} `} >
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Avatar className="h-8 w-8 bg-[#FFAE91] text-white mr-2 flex items-center justify-center">
                                                            <span className="text-xs">{user.lastName?.charAt(0)}</span>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium">{user.firstName} {user.lastName}</p>
                                                            <p className="text-xs text-gray-500">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className="text-xs text-red-600 bg-red-100 py-1 px-2 rounded">{user.status}</span>
                                                </TableCell>
                                                <TableCell className="text-center">{user.category} Fcfa</TableCell>
                                                <TableCell className="text-center">
                                                    <span className="text-xs text-green-600 bg-green-100 py-1 px-2 rounded">{user.weekActif}</span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className="text-xs text-blue-600 bg-blue-100 py-1 px-2 rounded">{user.lastWeekPaid}</span>
                                                </TableCell>
                                                <TableCell className="text-center">{user.amountPaidByWeek} Fcfa</TableCell>
                                                <TableCell className="text-center">
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
                                                            <DropdownMenuItem className="px-2 py-1 text-sm cursor-pointer  hover:rounded-lg hover:shadow-gray-200">
                                                                <div className="flex items-center "
                                                                    onClick={() => route.push(`/dashboard/users/view/${user.id}`)}>
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

            <Dialog open={filterModel} onOpenChange={setFilterModel} >
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
                                <label className="text-sm font-medium">Catégorie </label>
                                <Select onValueChange={setSelectedCategorie} value={selectedCategorie}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionner une catégorie " />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {uniqueCategories.map((tontine , index) => (
                                            <SelectItem key={index} value={tontine}>
                                                {tontine}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Sélecteur de date */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Semaine</label>
                               <Select onValueChange={setLastWeekPaidUser} value={lastWeekPaidUser}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionner la semaine " />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {weekss.map((week , index) => (
                                            <SelectItem key={index} value={week}>
                                                {week}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                            type="button"
                            onClick={handleFilter}
                        className="bg-[#FF4000] hover:bg-[#FF4000]/90">
                            Confirmer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}