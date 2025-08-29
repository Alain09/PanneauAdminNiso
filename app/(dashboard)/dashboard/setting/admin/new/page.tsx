"use client"
import AddMemberForm from '@/src/components/setting/team/addMemberForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import Bande from '@/src/components/users/bande'
import { generateId } from '@/src/lib/utils'
import { TeamMember } from '@/type'
import React, { useState } from 'react'

function NewMemberTeam() {
     const [formData, setFormData] = useState<TeamMember>({
        id:generateId(),
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        role: "",
        position: "",
        image:""
      });

 // here we wiil put a trust api route 
    const handleSubmit = ()=>{
        alert("formulaire enregistré")
    }
  return (
    <div className='p-4 md:p-6'>
        <Bande/>
        <Card className='shadow-gray-50 border-gray-100 mx-0 md:mx-10 lg:mx-20 xl:mx-48'>
            <CardHeader className='mb-4 md:mb-5'>
                <CardTitle className='text-[#FF4000] text-lg md:text-xl'>FORMULAIRE</CardTitle>
                <CardDescription className='text-sm md:text-base'>
                    Enregistrement d&apos;un nouveau membre d&apos;Administration
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AddMemberForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit}/>      
            </CardContent>
        </Card>
    </div>
  )
}

export default NewMemberTeam