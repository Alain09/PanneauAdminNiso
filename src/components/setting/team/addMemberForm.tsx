// components/team/AddMemberForm.tsx
import React from "react";
import { TeamMember } from "@/type";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";

interface AddMemberFormProps {
  onSubmit: () => void;
  formData: TeamMember;
  setFormData: React.Dispatch<React.SetStateAction<TeamMember>>;
}

export default function AddMemberForm({ onSubmit, formData, setFormData }: AddMemberFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 border-b border-b-gray-100">
          <Label className="text-sm md:text-base w-full md:w-1/3">Nom:</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="shadow shadow-gray-50 w-full md:max-w-[500px] h-10 md:h-[40px]"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 border-b border-b-gray-100">
          <Label htmlFor="firstName" className="text-sm md:text-base w-full md:w-1/3">Prénom(s):</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
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
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow shadow-gray-50 w-full md:max-w-[500px] h-10 md:h-[40px]"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 border-b border-b-gray-100">
          <Label htmlFor="image" className="text-sm md:text-base w-full md:w-1/3">Image:</Label>
          <Input
            type="file"
            id="image"
            name="image"
            onChange={(e) => { setFormData((prev) => ({ ...prev, image: e.target.files?.[0] })) }}
            required
            className="shadow shadow-gray-50 w-full md:max-w-[500px] h-10 md:h-[40px] pt-1"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 border-b border-b-gray-100">
          <Label htmlFor="contact" className="text-sm md:text-base w-full md:w-1/3">Contact:</Label>
          <Input
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="shadow shadow-gray-50 w-full md:max-w-[500px] h-10 md:h-[40px]"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4 border-b border-b-gray-100">
          <Label htmlFor="role" className="text-sm md:text-base w-full md:w-1/3">Rôle:</Label>
          <Input
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="shadow shadow-gray-50 w-full md:max-w-[500px] h-10 md:h-[40px]"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 pb-4">
          <Label htmlFor="position" className="text-sm md:text-base w-full md:w-1/3">Position:</Label>
          <Input
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="shadow shadow-gray-50 w-full md:max-w-[500px] h-10 md:h-[40px]"
          />
        </div>
      </div>

      <div className="flex justify-center md:justify-end pt-4">
        <Button type="submit" className="bg-gray-900 hover:bg-gray-700 w-full md:w-auto">
          Enregistrer
        </Button>
      </div>
    </form>
  );
}