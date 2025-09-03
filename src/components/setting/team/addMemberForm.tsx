// components/team/AddMemberForm.tsx
import React, { useRef } from "react";
import { TeamMember } from "@/type";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface AddMemberFormProps {
  onSubmit: () => void;
  formData: TeamMember;
  setFormData: React.Dispatch<React.SetStateAction<TeamMember>>;
  loading: boolean
}

export default function AddMemberForm({ onSubmit, formData, setFormData, loading }: AddMemberFormProps) {


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // affcihier des forfulaire en fonction de la page 
  const pathname = usePathname()

  // pour l'affichage des images 
  const fileInputRef = useRef<HTMLInputElement>(null);

  // handle pour la mise ajout des images 
 // 🔥 CORRECTION de la fonction handleLogoChange pour éviter les chaînes vides
const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  
  if (file) {
    // Vérifier que c'est bien un fichier image
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image valide');
      return;
    }
    
    // Vérifier la taille du fichier (ex: max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image est trop volumineuse. Taille maximale: 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      if (imageUrl && imageUrl !== "") {
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      }
    };
    reader.readAsDataURL(file);
    
  } 
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 border-b border-b-gray-100">
          <Label className="text-sm md:text-base w-full md:w-1/3">Nom:</Label>
          <Input
            id="name"
            name="name"
            value={formData?.name || ""}
            onChange={handleChange}
            required
            className="shadow shadow-gray-50 w-full md:max-w-[500px] h-10 md:h-[40px]"
          />

        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 border-b border-b-gray-100">
          <Label htmlFor="email" className="text-sm md:text-base w-full md:w-1/3">Email:</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData?.email || ""}
            onChange={handleChange}
            required
            className="shadow shadow-gray-50 w-full md:max-w-[500px] h-10 md:h-[40px]"
          />
        </div>
        {
          pathname.includes("admin/new") &&
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4">
            <Label htmlFor="position" className="text-sm md:text-base w-full md:w-1/3">Password:</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData?.password || ""}
              onChange={handleChange}
              required
              className="shadow shadow-gray-50 w-full md:max-w-[500px] h-10 md:h-[40px]"
            />
          </div>
        }

        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 border-b border-b-gray-100">
          <Label htmlFor="phone" className="text-sm md:text-base w-full md:w-1/3">phone:</Label>
          <Input
            id="phone"
            name="phone"
            value={formData?.phone || ""}
            onChange={handleChange}
            className="shadow shadow-gray-50 w-full md:max-w-[500px] h-10 md:h-[40px]"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 border-b border-b-gray-100">
          <Label htmlFor="image" className="text-sm md:text-base w-full md:w-1/3">Image:</Label>
          <div
            className="border-2 border-dashed border-gray-500 rounded-md flex cursor-pointer min-h-[250px] md:min-h-[280px] w-[250px] md:min-w-[280px] flex-col justify-center items-center gap-3 md:gap-10 pb-4"
            onClick={() => fileInputRef.current?.click()}
          >
            {/* 🔥 CORRECTION: Vérification plus stricte de l'image */}
            {!formData?.image || formData.image === "" || (typeof formData.image === 'string' && formData.image.trim() === "") ? (
              <>
                <div className="bg-gray-300 dark:bg-gray-900 rounded-full p-10 flex items-center justify-center">
                  <ImageIcon size={32} className="text-gray-500 dark:text-gray-400" />
                </div>
                <span className="mt-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Charger l'image de l'article
                </span>
              </>
            ) : (
              <Image
                title="Changer d'image"
                src={formData.image as string}
                alt={formData?.name || "aperçu"}
                width={300}
                height={300}
                className="rounded-md object-cover"
                onError={() => {
                  // 🔥 Gestion d'erreur si l'image ne se charge pas
                  setFormData((prev) => ({ ...prev, image: "" }));
                }}
              />
            )}
            <Input
              ref={fileInputRef}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
          </div>
        </div>



        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 border-b border-b-gray-100">
          <Label htmlFor="role" className="text-sm md:text-base w-full md:w-1/3">Rôle:</Label>
          <Input
            id="role"
            name="role"
            value={formData?.role || ""}
            onChange={handleChange}
            className="shadow shadow-gray-50 w-full md:max-w-[500px] h-10 md:h-[40px]"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4">
          <Label htmlFor="position" className="text-sm md:text-base w-full md:w-1/3">Position:</Label>
          <Input
            id="position"
            name="position"
            value={formData?.position || ""}
            onChange={handleChange}
            className="shadow shadow-gray-50 w-full md:max-w-[500px] h-10 md:h-[40px]"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4">
          <Label htmlFor="provence" className="text-sm md:text-base w-full md:w-1/3">Provenance:</Label>
          <Input
            id="provence"
            name="provence"
            value={formData?.provence || ""}
            onChange={handleChange}
            className="shadow shadow-gray-50 w-full md:max-w-[500px] h-10 md:h-[40px]"
          />
        </div>

      </div>

      <div className="flex justify-center md:justify-end pt-4">
        <Button disabled={loading} type="submit" className="bg-gray-900 hover:bg-gray-700 w-full md:w-auto">

          {loading ? 'en cours...' : 'Soumettre'}

        </Button>
      </div>
    </form>
  );
}