// components/team/TeamList.tsx
import React from "react";
import { TeamMember } from "@/type";
import { Button } from "@/src/components/ui/button";
import TeamMemberCard from "./teamMembersCard";

interface TeamListProps {
  members: TeamMember[];
  setMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  selectmember: TeamMember;
  onAddClick: () => void;
  onMemberClick: (member: TeamMember) => void;
  onViewDetails(member: TeamMember): void;
  
  setNameActive: React.Dispatch<React.SetStateAction<string>>;
  setOpenDeleteModale: React.Dispatch<React.SetStateAction<boolean>>;
   setMemberDelete: React.Dispatch<React.SetStateAction<TeamMember | undefined>>
}

export default function TeamList({ 
  members, 
  onAddClick, 
  onMemberClick ,
  onViewDetails,
  selectmember ,
  setNameActive,
  setOpenDeleteModale,
  setMemberDelete
  
}: TeamListProps) {


/*  
  const handleDelete = (id: string) => {
    const updatedMembers = members.filter(member => member.id !== id);
    setMembers(updatedMembers);
  }; */


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-[#FF4000]">Administration</h2>
        <Button onClick={onAddClick} className="bg-gray-900 hover:bg-gray-700">
          Ajouter
        </Button>
      </div>
      
      <div className="mt-4">
        {members.map((member) => (
          <TeamMemberCard
          setNameActive={setNameActive}
          setOpenDeleteModale={setOpenDeleteModale}
            key={member.id}
            member={member}
            selectmember={selectmember}
            setMemberDelete={setMemberDelete}
            onClick={() => { onMemberClick(member);  }}
            onViewDetails={onViewDetails}

          />
        ))}
      </div>
    </div>
  );
}
