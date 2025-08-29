// components/team/TeamMemberCard.tsx
"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";
import { TeamMember } from "@/type";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Avatar} from "@/src/components/ui/avatar";

export interface TeamMemberCardProps {
  member: TeamMember;
  onClick: () => void;
  selectmember : TeamMember;
  setNameActive: React.Dispatch<React.SetStateAction<string>>;
  setOpenDeleteModale: React.Dispatch<React.SetStateAction<boolean>>
  setMemberDelete: React.Dispatch<React.SetStateAction<TeamMember | undefined>>
}

export default function TeamMemberCard({ 
  member, 
  selectmember,
  onClick ,
  setNameActive,
  setOpenDeleteModale,
  setMemberDelete
}: TeamMemberCardProps) {
  const initials = member.firstName.charAt(0).toUpperCase();
  const route = useRouter()
  
  return (
    <div 
      className= {`${selectmember === member && "bg-gray-50/50"} flex items-center justify-between p-4 rounded-lg border mb-2 cursor-pointer hover:bg-gray-50`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <Avatar className="bg-gray-100 h-10 w-10 flex justify-center items-center">
          <span className="">{initials}</span>
        </Avatar>
        <div>
          <p className="font-medium text-sm">
            {member.firstName} {member.lastName}
          </p>
          <p className="text-sm text-[#FF4000]">{member.email}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
          {member.role}
        </span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation(); // Empêche le déclenchement du onClick du parent
              }}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation();
                route.push(`/dashboard/setting/admin/edit/${member.id}`)
              }}
            >
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-500" 
              onClick={(e) => {
                e.stopPropagation();
                setNameActive(`${member.firstName} ${member.lastName} de l'équipe`)
                setOpenDeleteModale(true)
               setMemberDelete(member)
              }}
            >
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
