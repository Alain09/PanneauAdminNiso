"use client";

import React, { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";


import Bande from "@/src/components/users/bande";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { AlertCircle, SquareCheckBig } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/components/ui/select";

export default function UserProfilNew() {
  const [profil, setProfil] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    role: string;
    position: string;
    image: string;   // URL venant de la DB
    file: File | null; // Nouveau champ pour les uploads
    provence: string;
    profession: string;
    description: string;
    status: string;
  }>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    role: "",
    position: "",
    image: "",      // URL par défaut
    file: null,     // Pas de fichier par défaut
    provence: "",
    profession: "",
    description: "",
    status: "En cours",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sendSubmitError, setSendSubmitError] = useState("");
  const [sendSubmitSuccess, setSendSubmitSuccess] = useState("");


  //------------pour la mise a jour des name value 
 

  interface HandleChangeTarget  {
    name: string;
    value: string;
    type: string;
    files?: FileList;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HandleChangeTarget;

    if (type === 'file') {
      setProfil(prev => ({
        ...prev,
        file: files && files[0] ? files[0] : null
      }));
    } else if (type === 'number') {
      setProfil(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setProfil(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSendSubmitError("");
    setSendSubmitSuccess("");
    setLoading(true);

    // Récupération de la clé d'accès
    const key_acces = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;
    const formDataUser = new FormData();
    formDataUser.append("firstName", profil.firstName);
    formDataUser.append("lastName", profil.lastName);
    formDataUser.append("profession", profil.profession);
    formDataUser.append("contact", profil.contact);
    formDataUser.append("role", profil.role);
    formDataUser.append("position", profil.position);
    formDataUser.append("provence", profil.provence);
    formDataUser.append("description", profil.description);

    // ⚡ Si un fichier est uploadé, on envoie le File
    if (profil.file) {
      formDataUser.append("image", profil.file);
    } else {
      // sinon on envoie l’URL déjà stockée
      formDataUser.append("image", profil.image);
    }

    try {
      const response = await fetch(`/api/users`, {
        method: "POST",
        headers: { "authorization": `${key_acces}` },
        body: formDataUser,
      });

      if (!response.ok) {
        setSendSubmitError("Erreur lors de la soumission");
        return;
      }

      const userData = await response.json();
      if (!userData.success) {
        setSendSubmitError(userData.message);
      } else {
        setLoading(false);
        setSendSubmitError("");
        setSendSubmitSuccess(userData.message);
        setTimeout(() => {
          router.push("/dashboard/users");
        }, 1500);
      }
    } catch (error) {
      setSendSubmitError(`Une erreur s'est produite: ${error}`);
    } finally {
      setLoading(false);
    }
  };


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
        <form onSubmit={handleSubmit}>

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
                      value={profil.firstName}
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
                      value={profil.lastName}
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
                      value={profil.profession}
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
                      value={profil.contact}
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
                      value={profil.provence}
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
                      value={profil.role}
                      onChange={handleChange}
                      className="w-full h-10 md:h-[45px]"
                    />
                  </div>


                  { /* Position */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 md:pb-5 border-b border-b-gray-100">
                    <label className="text-sm md:text-md font-normal md:w-[120px]">Position</label>
                    <Select
                      value={profil.position}
                      onValueChange={(value: string) =>
                        handleChange({
                          target: { name: "position", value, type: "text" }
                        } as React.ChangeEvent<HTMLInputElement>)
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
                      value={profil.description}
                      onChange={handleChange}
                      className="w-full h-24 md:h-[100px]"
                    />
                  </div>

                </div>
                <div className="flex justify-end mt-6 md:mt-10">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-[#FF4000] text-white rounded-md hover:bg-[#FF4000]/90 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors "
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Création...
                      </div>
                    ) : (
                      "Créer le profil"
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
          </div>
        </form>
      </Card>

    </div>
  );
}