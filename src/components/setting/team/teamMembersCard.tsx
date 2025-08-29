// components/team/TeamMemberCard.tsx
"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Eye, MoreVertical } from "lucide-react";
import { TeamMember } from "@/type";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Avatar } from "@/src/components/ui/avatar";

export interface TeamMemberCardProps {
  member: TeamMember;
  onClick: () => void;
  onViewDetails(member: TeamMember): void;
  selectmember: TeamMember;
  setNameActive: React.Dispatch<React.SetStateAction<string>>;
  setOpenDeleteModale: React.Dispatch<React.SetStateAction<boolean>>
  setMemberDelete: React.Dispatch<React.SetStateAction<TeamMember | undefined>>
}

export default function TeamMemberCard({
  member,
  selectmember,
  onClick,
  setNameActive,
  setOpenDeleteModale,
  setMemberDelete,
  onViewDetails
}: TeamMemberCardProps) {
  const initials = member.firstName.charAt(0).toUpperCase();
  const route = useRouter()

  return (
    <div
      className={`${selectmember === member && "bg-gray-50/50"} flex items-center justify-between p-3 md:p-4 rounded-lg border mb-2 cursor-pointer hover:bg-gray-50`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
        <Avatar className="bg-gray-100 h-8 w-8 md:h-10 md:w-10 flex justify-center items-center flex-shrink-0">
          <span className="text-xs md:text-sm">{initials}</span>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-xs md:text-sm truncate">
            {member.firstName} {member.lastName}
          </p>
          <p className="text-xs md:text-sm text-[#FF4000] truncate">{member.email}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 flex-shrink-0">
        <span className="px-2 py-1 text-xs md:text-sm rounded-full bg-gray-100 hidden sm:inline-block">
          {member.role}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:h-10 md:w-10"
              onClick={(e) => {
                e.stopPropagation(); // Empêche le déclenchement du onClick du parent
              }}
            >
              <MoreVertical className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              className="lg:hidden flex items-center gap-2 text-xs md:text-sm"
              onClick={() => onViewDetails(member)}
            >
              <Eye className="h-3 w-3 md:h-4 md:w-4" />
              Voir détails
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs md:text-sm"
              onClick={(e) => {
                e.stopPropagation();
                route.push(`/dashboard/setting/admin/edit/${member.id}`)
              }}
            >
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 text-xs md:text-sm"
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