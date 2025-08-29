"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TeamMember } from "@/type";
import TeamList from "@/src/components/setting/team/teamList";
import { generateId } from "@/src/lib/utils";
import MemberDetails from "@/src/components/setting/team/memberDetail";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

// Données initiales pour la démo
const initialMembers: TeamMember[] = [
  {
    id: generateId(),
    firstName: "John",
    lastName: "Carter",
    email: "hello@johncarter.com",
    role: "Administrateur"
  },
  {
    id: generateId(),
    firstName: "John",
    lastName: "Carter",
    email: "hello@johncarter.com",
    role: "Sécrétaire"
  },
  {
    id: generateId(),
    firstName: "John",
    lastName: "Carter", 
    email: "hello@johncarter.com",
    role: "developpeur"
  },
  {
    id: generateId(),
    firstName: "  Alain",
    lastName: "Carter",
    email: "hello@johncarter.com",
    role: "Trésorière"
  }
];

export default function Home() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [selectedMember, setSelectedMember] = useState<TeamMember>(members[0]);
  const [memberDelete, setMemberDelete] = useState<TeamMember>(); /// gestion d'etat pour la suppression des membres
  const route = useRouter();


  //  reading when we click on member
  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
  };

  // handle delete member
  const handleDelete = () => {
    const updatedMembers = members.filter(member => member.id !== memberDelete?.id);
    setMembers(updatedMembers);
  };

  // for update setSelectmember
  useEffect(() => {
    setSelectedMember(members[0]);
  }, [members]);


  // modalpour la supression
  const [autButon, setAutButon] = useState(true);
  const [openDeleteModale, setOpenDeleteModale] = useState(false);
  const targetEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.toUpperCase() === "DELETE" ? setAutButon(false) : setAutButon(true);
  };
  const [nameActive, setNameActive] = useState("");


  return (
    <main className=" p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <TeamList
            members={members}
            setMembers={setMembers} //use for update members if members change
            selectmember={selectedMember} // use to notifier the member actif
            onAddClick={() => {
              route.push("/dashboard/setting/admin/new");
            }}
            setNameActive={setNameActive}
            setOpenDeleteModale={setOpenDeleteModale}
            onMemberClick={handleMemberClick}
            setMemberDelete={setMemberDelete}
          />
        </div>


        {selectedMember && (
          <div className="bg-white p-6 rounded-lg shadow">
            <MemberDetails member={selectedMember} />
          </div>
        )}
      </div>


      { /* POUR LA SUPPRESSION  */}
      <Dialog open={openDeleteModale} onOpenChange={setOpenDeleteModale} >
        <DialogContent className="sm:max-w-md ">
          <DialogHeader>
            <DialogTitle>SUPPRESSION</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 ">
            <p className="text-sm text-muted-foreground">
              Pour supprimer <span className=' font-semibold text-gray-900'>{nameActive}</span> entrer <span className='text-red-600 font-semibold'>DELETE</span> dans le formulaire ci-dessous
            </p>

            <div className="space-y-4">
              {/* Entrer */}
              <div className="space-y-2">
                <Input
                  className=" w-full "
                  onChange={targetEnter}
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
            <Button
              disabled={autButon}
              type='submit'
              onClick={() => { 
                handleDelete();
                setOpenDeleteModale(false);
              }}
              className="bg-[#FF4000] hover:bg-[#FF4000]/90">
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}