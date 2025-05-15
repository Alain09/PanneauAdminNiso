"use client"
import { Startscard } from '@/src/components/dash_composant/staticard';
import { CalendarIcon, Eye, FileText, Pencil, Trash2, UserCogIcon, Users } from 'lucide-react';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Search, MoreVertical, Filter, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/src/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/src/components/ui/table";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

import { Badge } from "@/src/components/ui/badge";
import { Card } from '@/src/components/ui/card';

import { useRouter } from 'next/navigation';
// Types
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  amountbyMouth: number;
  amount: string;
  amountbyWeek: number;
  date: string;
  status: "succès" | "succès";
}




function page() {
  const route = useRouter()
  const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);
  const [users, setUsers] = useState<User[]>(
    
    

   [
        {
          id: generateId(),
          name: "John Carter",
          email: "hello@johncarter.com",
          phone: "+229 0162538947",
          amountbyMouth: 3500,
          amount: "100 fcfa",
          amountbyWeek: 1600,
          date: "03/04/2025",
          status: "succès",
        },
        {
          id: generateId(),
          name: "John Carter",
          email: "hello@johncarter.com",
          phone: "+229 0162538947",
          amountbyMouth: 3500,
          amount: "100 fcfa",
          amountbyWeek: 1600,
          date: "03/04/2025",
          status: "succès",
        },
        {
          id: generateId(),
          name: "John Carter",
          email: "hello@johncarter.com",
          phone: "+229 0162538947",
          amountbyMouth: 3500,
          amount: "100 fcfa",
          amountbyWeek: 1600,
          date: "03/04/2025",
          status: "succès",
        },
        {
          id: generateId(),
          name: "John Carter",
          email: "hello@johncarter.com",
          phone: "+229 0162538947",
          amountbyMouth: 3500,
          amount: "200 fcfa",
          amountbyWeek: 1600,
          date: "03/04/2025",
          status: "succès",
        },
        {
          id: generateId(),
          name: "John Carter",
          email: "hello@johncarter.com",
          phone: "+229 0162538947",
          amountbyMouth: 3500,
          amount: "100 fcfa",
          amountbyWeek: 1600,
          date: "03/04/2025",
          status: "succès",
        },
        {
          id: generateId(),
          name: "John Carter",
          email: "hello@johncarter.com",
          phone: "+229 0162538947",
          amountbyMouth: 3500,
          amount: "100 fcfa",
          amountbyWeek: 1600,
          date: "03/04/2025",
          status: "succès",
        },
        {
          id: generateId(),
          name: "John Carter",
          email: "hello@johncarter.com",
          phone: "+229 0162538947",
          amountbyMouth: 3500,
          amount: "100 fcfa",
          amountbyWeek: 1600,
          date: "03/04/2025",
          status: "succès",
        },
        {
          id: generateId(),
          name: "John Carter",
          email: "hello@johncarter.com",
          phone: "+229 0162538947",
          amountbyMouth: 3500,
          amount: "100 fcfa",
          amountbyWeek: 1600,
          date: "03/04/2025",
          status: "succès",
        },
        {
          id: generateId(),
          name: "John Carter",
          email: "hello@johncarter.com",
          phone: "+229 0162538947",
          amountbyMouth: 3500,
          amount: "100 fcfa",
          amountbyWeek: 1600,
          date: "03/04/2025",
          status: "succès",
        },
        {
          id: generateId(),
          name: "John Carter",
          email: "hello@johncarter.com",
          phone: "+229 0162538947",
          amountbyMouth: 3500,
          amount: "100 fcfa",
          amountbyWeek: 1600,
          date: "03/04/2025",
          status: "succès",
        },
        {
          id: generateId(),
          name: "John Carter",
          email: "hello@johncarter.com",
          phone: "+229 0162538947",
          amountbyMouth: 3500,
          amount: "100 fcfa",
          amountbyWeek: 1600,
          date: "03/04/2025",
          status: "succès",
        },
        {
          id: generateId(),
          name: "John Carter",
          email: "hello@johncarter.com",
          phone: "+229 0162538947",
          amountbyMouth: 3500,
          amount: "100 fcfa",
          amountbyWeek: 1600,
          date: "03/04/2025",
          status: "succès",
        },
    ]);


  const [filter, setFilter] = useState(false)
  const [selectedTontine, setSelectedTontine] = useState<string>("");
  const [selectedStatut, setSelectedStatut] = useState<string>("");
  // Exemple de données de tontines - à remplacer par vos données réelles
  const tontines = [
    { id: "1", name: "100" },
    { id: "2", name: "200" },
    { id: "3", name: "300" },
    { id: "4", name: "400" },
    { id: "5", name: "500" },
  ];

  const statuts = [
    { id: "1", name: "succès" },
    { id: "2", name: "succès" },
  ]

  return (
    <div>
      <main className=' p-6'>
        { /* tableau  */}
        <div className="w-full">
          <Card className='border border-gray-100 shadow-gray-100'>
            <div className="flex items-center gap-10 mb-4 px-4 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-[#FF4000] text-white rounded-md">Effectif</span>
                  <span className="px-2 py-1 border rounded-md">200</span>
                </div>
              </div>
              <div className="relative w-full">
                <Input
                  className="pl-8 w-full "
                  placeholder="rechercher un nom"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center space-x-4">

                <Button
                  variant="destructive"
                  className="flex items-center bg-[#FF4000] hover:bg-[#FF4000]/90"
                  onClick={() => setFilter(true)}
                >
                  <Filter className="mr-2 h-4 w-4"

                  />
                  Filtrer
                </Button>
              </div>
            </div>

            <div className=" overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                <TableRow className="">
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Utilisateurs</TableHead>
                    <TableHead>Numero de transaction</TableHead>
                    <TableHead>Montant payé</TableHead>
                    <TableHead>Tontine choisie</TableHead>
                    <TableHead>A payer/S</TableHead>
                    <TableHead>Date d'entrée</TableHead>
                    <TableHead>Statut</TableHead>
                   </TableRow>
                  
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow
                      key={user.id}
                      className={`${index % 2 === 0 ? "bg-[#FFAE91]/10" : ""}  `}
                    >
                      <TableCell>
                        <div className="flex items-center justify-center w-8 h-8 bg-[#FFAE91] text-white rounded-full">
                          J
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{user.name}</div>
                          <div className="text-[#FF4000] text-sm">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.amountbyMouth}</TableCell>
                      <TableCell>{user.amount}</TableCell>
                      <TableCell>{user.amountbyWeek}</TableCell>
                      <TableCell>{user.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === "succès" ? "default" : "outline"}
                          className={
                            user.status === "succès"
                              ? "text-xs text-green-600 bg-green-100 py-1 px-2 rounded"
                              : "text-xs text-blue-600 bg-blue-100 py-1 px-2 rounded"
                          }
                        >
                          • {user.status === "succès" ? "succès" : "succès"}
                        </Badge>
                      </TableCell>
                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

        </div>


      </main>


      <Dialog open={filter} onOpenChange={setFilter} >
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
              {/* provenance */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date de paiement</label>
                <Input
                type='date'
                  className=" w-full "
                  placeholder="entrer une provenance"
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
  )
}

export default page