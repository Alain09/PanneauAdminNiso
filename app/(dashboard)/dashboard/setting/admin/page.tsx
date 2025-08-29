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
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Pour mobile/tablette
  const route = useRouter();


  //  reading when we click on member
  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    // Sur mobile/tablette, on ouvre le modal au lieu d'afficher le slide
    if (window.innerWidth < 768) {
      setShowDetailsModal(true);
    }
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

  // Fonction pour afficher les détails depuis le menu déroulant
  const handleViewDetails = (member: TeamMember) => {
    setSelectedMember(member);
    setShowDetailsModal(true);
  };

  // modalpour la supression
  const [autButon, setAutButon] = useState(true);
  const [openDeleteModale, setOpenDeleteModale] = useState(false);
  const targetEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
   const reseach= e.target.value.toUpperCase() === "DELETE" ? setAutButon(false) : setAutButon(true);
   return reseach;
  };
  const [nameActive, setNameActive] = useState("");


  return (
    <main className="p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
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
            onViewDetails={handleViewDetails} // Nouvelle prop pour les détails mobiles
          />
        </div>


        {selectedMember && (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow hidden lg:block">
            <MemberDetails member={selectedMember} />
          </div>
        )}
      </div>

      {/* Modal pour afficher les détails en mode mobile/tablette */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails de ladministrateur</DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <MemberDetails member={selectedMember} />
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Fermer</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      { /* POUR LA SUPPRESSION  */}
      <Dialog open={openDeleteModale} onOpenChange={setOpenDeleteModale}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>SUPPRESSION</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Pour supprimer <span className='font-semibold text-gray-900'>{nameActive}</span> entrer <span className='text-red-600 font-semibold'>DELETE</span> dans le formulaire ci-dessous
            </p>

            <div className="space-y-4">
              {/* Entrer */}
              <div className="space-y-2">
                <Input
                  className="w-full"
                  onChange={(e)=>targetEnter(e)}
                  placeholder="Tapez DELETE pour confirmer"
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