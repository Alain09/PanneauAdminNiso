"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { TeamMember } from "@/type";
import TeamList from "@/src/components/setting/team/teamList";
import MemberDetails from "@/src/components/setting/team/memberDetail";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useSession } from "@/src/lib/auth-client";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { AlertCircle, SquareCheckBig } from "lucide-react";


export default function Home() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember>();

  const [memberDelete, setMemberDelete] = useState<TeamMember>(); /// gestion d'etat pour la suppression des membres
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Pour mobile/tablette
  const route = useRouter();

  const { isPending } = useSession()

  const [sendError, setSendError] = useState("");
  const [loading, setLoading] = useState(false)

  //--------------------------
  const [sendSubmitError, setSendSubmitError] = useState("");
  const [sendSubmitSuccess, setSendSubmitSuccess] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false)
  //---------------------

  // api pour recuperation des coordonnées de l'admins
  useEffect(() => {

    const profileGetAll = async () => {
      //recuperation de l'key access
      const key_acces = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;

      // ---------loarding before success endpoint
      setLoading(true)

      // try for execution endpoint
      try {
        const datas = await fetch("/api/settng/adminteam/",
          {
            method: "GET",
            headers: { "authorization": `${key_acces}` }
          })

        // erreur de recuperation 
        if (!datas.ok) {
          setSendError(" Erreur lors du chargement de la team ")
          setLoading(false)
        }

        const teamData = await datas.json();

        if (!teamData.success) {
          setSendError(teamData.message)
          setLoading(false)
        } else {
          setLoading(false);
          setSendError("");
          //alert(" donnees bien chargé")
          setMembers(teamData.data)

        }

      } catch (error) {
        console.error("Erreur lors de la récupération des  profiles :", error);
        setSendError(" erreur server");
      }

    };

    profileGetAll();

  }, [])




  //  reading when we click on member
  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    // Sur mobile/tablette, on ouvre le modal au lieu d'afficher le slide
    if (window.innerWidth < 768) {
      setShowDetailsModal(true);
    }
  };

  // handle delete member  endpooint delete

  const handleDelete = async () => {
    setSendSubmitError("");
    setSendSubmitSuccess("");
    setLoadSubmit(true);

    try {
      const datas = await fetch(`/api/settng/adminteam/${memberDelete?.id}`, {
        method: "DELETE",
        headers: {
          "authorization": process.env.NEXT_PUBLIC_API_ROUTE_SECRET || "",
          "Content-Type": "application/json", // Ajout de ce header
        },
      });

      const result = await datas.json();

      if (result.success) {
        setSendSubmitSuccess(result.message);
        setMembers(prev => prev.filter(member => member.id !== memberDelete?.id));
        setTimeout(() => setOpenDeleteModale(false), 1500); // Fermer après succès
      } else {
        setSendSubmitError(result.message);
      }

    } catch (error) {
      setSendSubmitError("Erreur de connexion lors de la suppression");
      console.error(error);
    } finally {
      setLoadSubmit(false);
    }
  };

  // for update setSelectmember when member is delete
  useEffect(() => {
    setSelectedMember(members[0]);
  }, [members]);

  // Fonction pour afficher les détails depuis le menu déroulant
  const handleViewDetails = (member: TeamMember) => {
    setSelectedMember(member);
    setShowDetailsModal(true);
  };

  // modalpour la supression
  const ref = useRef<HTMLInputElement>(null)
  const [autButon, setAutButon] = useState(true);
  const [openDeleteModale, setOpenDeleteModale] = useState(false);
  const targetEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reseach = e.target.value.toUpperCase() === "DELETE" ? setAutButon(false) : setAutButon(true);
    return reseach;
  };
  const [nameActive, setNameActive] = useState("");


  //---------------------
  // ******************* 
    useEffect(()=>{
      if(!openDeleteModale){
        setSendSubmitSuccess("")
      }
    },[openDeleteModale])
  
  
    //*****************  */

    
  //------------for loading before page is tring up 
  if (loading || isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement des tickets...</p>
        </div>
      </div>
    );
  }

  // ------------ la gestion des erreures 
  {/* Messages d'erreur */ }
  if (sendError) {
    return (
      <main className="p-4">
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">
            {sendError}
          </AlertDescription>
        </Alert>
      </main>
    )
  }



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
        <DialogContent className="sm:max-w-md mx-4 w-fit">
          <DialogHeader>
            <DialogTitle>SUPPRESSION</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">




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
                  {sendSubmitSuccess}
                </AlertDescription>
              </Alert>
            }


            <div className="text-sm text-muted-foreground">
              Pour supprimer <span className='font-semibold text-gray-900'>{nameActive}</span> entrer <span className='text-red-600 font-semibold'>DELETE</span> dans le formulaire ci-dessous
            </div>

            <div className="space-y-4">
              {/* Entrer */}
              <div className="space-y-2">
                <Input
                  className="w-full"
                  ref={ref}
                  onChange={(e) => targetEnter(e)}
                  placeholder="Tapez DELETE pour confirmer"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="mr-2" onClick={() => {
                setSendSubmitError(""); setSendSubmitError(""); 
                
                if (ref.current) {
                  ref.current.value = "";        // vide l'input
                }
              }}>
                Annuler
              </Button>
            </DialogClose>
            <Button
              disabled={autButon || loadSubmit}
              type='submit'
              onClick={() => {
                handleDelete();

              }}
              
              className="bg-[#FF4000] hover:bg-[#FF4000]/90">
              {loadSubmit ? " en cour..." : "Confirmer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}