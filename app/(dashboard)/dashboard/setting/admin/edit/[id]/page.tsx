"use client"
import AddMemberForm from '@/src/components/setting/team/addMemberForm'
import { Alert, AlertDescription } from '@/src/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import Bande from '@/src/components/users/bande'
import { TeamMember } from '@/type'
import { AlertCircle, SquareCheckBig } from 'lucide-react'
import React, { useState, use, useEffect } from 'react'

import { useRouter } from 'next/navigation'

export default function NewMemberTeam({ params }: { params: Promise<{ id: string }> }) {

  const [sendError, setSendError] = useState("");
  const [sendSubmitError, setSendSubmitError] = useState("");
  const [sendSubmitSuccess, setSendSubmitSuccess] = useState("");
  const [loading, setLoading] = useState(false)
  const [loadSubmit, setLoadSubmit] = useState(false)


  const [formData, setFormData] = useState<TeamMember>();
  //----------------------
  const { id } = use(params);

  //-----------------------
  let fileUp: string = ""
  const formadataTeamMember = new FormData()
  const route = useRouter()
  //------------------

  // api de recuperationdes donnnees d'un team specifque
  useEffect(() => {

    const handGetTeamOne = async () => {
      //recuperation de l'key access
      const key_acces = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;
      setLoading(true);

      try {
        const datas = await fetch(`/api/settng/adminteam/${id}`, {
          method: "GET",
          headers: { "authorization": `${key_acces}` }
        });

        // erreur de recuperation 
        if (!datas.ok) {
          setSendError(" Erreur lors du chargement de la team ");
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
          fileUp = teamData.data.image
          setFormData(teamData.data)

        }
      } catch (error) {
        console.error("Erreur lors de la récupération des expertises :", error);
        alert("Une erreur s'est produite lors de la récupération des données.");
      } finally {
        setLoading(false)

      }

    }

    handGetTeamOne();
  }, [])


  //appel api pour mis a jout des donnees of teamMember
  const handleSubmit = async () => {
    setSendSubmitError("");
    setSendSubmitSuccess("")
    setLoadSubmit(true)
    //recuperation de l'key access
    const key_acces = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;

    if (fileUp === formData?.image) {
      formadataTeamMember.append("name", formData.name)
      formadataTeamMember.append("image", formData.image as string)
      formadataTeamMember.append("email", formData.email)
      formadataTeamMember.append("phone", formData.phone as string)
      formadataTeamMember.append("provence", formData.provence as string)
      formadataTeamMember.append("position", formData.position as string)
      formadataTeamMember.append("role", formData.role as string)
      try {

        const datas = await fetch(`/api/settng/adminteam/${id}`, {
          method: "PATCH",
          headers: { "authorization": `${key_acces}` },
          body: formadataTeamMember,
        });

        if (!datas.ok) {
          setSendSubmitError("Erreur lors de la soumission de la team ")

        }
        const teamData = await datas.json();
        if (!teamData.success) {
          setSendSubmitError(teamData.message)
        } else {
          setLoadSubmit(false)
          setSendSubmitError("");
          setSendSubmitSuccess(teamData.message)

          setTimeout(() => {

          }, 5000)
          route.push("/dashboard/setting/admin")
        }
      } catch (error) {

        setSendSubmitError(`Une erreur s'est produite:${error}`);
      } finally {
        setLoadSubmit(false)

      }
    } else {
      formadataTeamMember.append("name", formData?.name as string)
      formadataTeamMember.append("image", formData?.image as File)
      formadataTeamMember.append("email", formData?.email as string)
      formadataTeamMember.append("phone", formData?.phone as string)
      formadataTeamMember.append("provence", formData?.provence as string)
      formadataTeamMember.append("position", formData?.position as string)
      formadataTeamMember.append("role", formData?.role as string)
      try {

        const datas = await fetch(`/api/settng/adminteam/${id}`, {
          method: "PATCH",
          headers: { "authorization": `${key_acces}` },
          body: formadataTeamMember,
        });
        if (!datas.ok) {
          setSendSubmitError("Erreur lors de la soumission de la team ")

        }
        const teamData = await datas.json();
        if (!teamData.success) {
          setSendSubmitError(teamData.message)
        } else {
          setLoadSubmit(false)
          setSendSubmitError("");
          setSendSubmitSuccess(teamData.message)
          setTimeout(() => {

          }, 10000)
          route.push("/dashboard/setting/admin")
        }
      } catch (error) {
        setSendSubmitError(`Une erreur s'est produite:${error}`);
      } finally {
        setLoadSubmit(false)
      }
    }

  };


  //------------for loading before page is tring up 
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement...</p>
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
    <div className='p-4 md:p-6'>
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
      <Card className='shadow-gray-50 border-gray-100 mx-0 md:mx-10 lg:mx-20 xl:mx-48'>

        <CardHeader className='mb-4 md:mb-5'>
          <CardTitle className='text-[#FF4000] text-lg md:text-xl'>Edition {id}</CardTitle>
          <CardDescription className='text-sm md:text-base'>
            Mise à jour des coordonnées d&apos;un membre Administratif
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddMemberForm formData={formData as TeamMember} setFormData={setFormData as React.Dispatch<React.SetStateAction<TeamMember>>} onSubmit={handleSubmit} loading={loadSubmit} />
        </CardContent>

      </Card>
    </div>
  )
}