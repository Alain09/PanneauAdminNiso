// components/team/AddMemberForm.tsx
import React, { useState } from "react";

import { TeamMember } from "@/type";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { generateId } from "@/src/lib/utils";

interface AddMemberFormProps {
  onSubmit: () => void;
  formData:TeamMember;
  setFormData: React.Dispatch<React.SetStateAction<TeamMember>>;
}

export default function AddMemberForm({ onSubmit ,formData,setFormData }: AddMemberFormProps) {
  // Note: Dans un vrai projet, vous utiliseriez react-hook-form avec zod
  // Ici, nous utilisons un formulaire simple pour correspondre aux limitations
 

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({...prev, [name]:value}))

  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <div className="grid grid-cols-1 gap-4 ">
        <div className="space-y-2 border-b border-b-gray-100 gap-x-10  pb-4 flex justify-between items-center ">
          <Label >Nom: </Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="shadow shadow-gray-50 w-[500px] min-w-[200px]   h-[40px]"
          />
        </div>

        <div className="space-y-2 border-b border-b-gray-100  gap-x-10   pb-4 flex justify-between items-center">
          <Label htmlFor="firstName">Prénom(s):</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="shadow shadow-gray-50 w-[500px] min-w-[200px]  h-[40px]"
          />
        </div>

        <div className="space-y-2 border-b border-b-gray-100 gap-x-10   pb-4 flex justify-between items-center">
          <Label htmlFor="email">Email: </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow shadow-gray-50 w-[500px] min-w-[200px] h-[40px]"
          />
        </div>
        <div className="space-y-2 border-b border-b-gray-100 gap-x-10   pb-4 flex justify-between items-center ">
          <Label htmlFor="image">Image:</Label>
          <Input
            type="file"
            id="image"
            name="image"
          
            onChange={(e)=>{setFormData((prev)=>({ ...prev, image: e.target.files?.[0]}))}}
            required
            className="shadow shadow-gray-50 w-[500px] min-w-[200px]  h-[40px]"
          />
        </div>
        <div className="space-y-2 border-b border-b-gray-100 gap-x-10  pb-4 flex justify-between items-center">
          <Label htmlFor="contact">Contact:</Label>
          <Input
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="shadow shadow-gray-50 w-[500px] min-w-[200px]  h-[40px]"
          />
        </div>

        <div className="space-y-2 border-b border-b-gray-100 gap-x-10  pb-4 flex justify-between items-center">
          <Label htmlFor="role">Rôle:</Label>
          <Input
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="shadow shadow-gray-50 max-w-[500px] min-w-[200px]  h-[40px]"
          />
        </div>

        <div className="space-y-2  gap-x-10  pb-4 flex justify-between items-center">
          <Label htmlFor="position">Position:</Label>
          <Input
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="shadow shadow-gray-50 w-[500px] min-w-[200px]  h-[40px]"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-gray-900 hover:bg-gray-700">
          Enregistrer
        </Button>
      </div>
    </form>
  );
}