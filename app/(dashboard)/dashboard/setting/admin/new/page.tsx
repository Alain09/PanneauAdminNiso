"use client"
import AddMemberForm from '@/src/components/setting/team/addMemberForm'
import { Alert, AlertDescription } from '@/src/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import Bande from '@/src/components/users/bande'
import { generateId } from '@/src/lib/utils'
import { TeamMember } from '@/type'
import { AlertCircle, SquareCheckBig } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function NewMemberTeam() {
    const [loading, setLoading] = useState(false)
    const [sendSubmitError, setSendSubmitError] = useState("");
    const [sendSubmitSuccess, setSendSubmitSuccess] = useState("");
    const [formData, setFormData] = useState<TeamMember>();

    //----------------------
    const formadataTeamMember = new FormData()
    const route = useRouter()
    //------------------

    // api route for creating a new user
    //appel api pour mis a jout des donnees of teamMember
    const handleSubmit = async () => {
        setSendSubmitError("");
        setSendSubmitSuccess("")
        setLoading(true)
        //recuperation de l'key access
        const key_acces = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;


        formadataTeamMember.append("name", formData?.name || "")
        formadataTeamMember.append("image", formData?.image || "")
        formadataTeamMember.append("email", formData?.email || "")
        formadataTeamMember.append("phone", formData?.phone || "")
        formadataTeamMember.append("provence", formData?.provence || "")
        formadataTeamMember.append("position", formData?.position || "")
        formadataTeamMember.append("role", formData?.role || "")
        formadataTeamMember.append("password", formData?.password || "");
        try {

            const datas = await fetch(`/api/settng/adminteam/`, {
                method: "POST",
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
                setLoading(false)
                setSendSubmitError("");
                setSendSubmitSuccess(teamData.message)
                setTimeout(() => {

                }, 5000)
                route.push("/dashboard/setting/admin")


            }
        } catch (error) {

            setSendSubmitError(`Une erreur s'est produite:${error}`);
        } finally {
            setLoading(false)

        }
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
                    <CardTitle className='text-[#FF4000] text-lg md:text-xl'>FORMULAIRE</CardTitle>
                    <CardDescription className='text-sm md:text-base'>
                        Enregistrement d&apos;un nouveau membre d&apos;Administration
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AddMemberForm formData={formData as TeamMember} setFormData={setFormData as React.Dispatch<React.SetStateAction<TeamMember>>} onSubmit={handleSubmit} loading={loading} />
                </CardContent>
            </Card>
        </div>
    )
}

export default NewMemberTeam