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
        alert("formorlaire enregristré")
    }
  return (
    <div className='p-6'>
        <Bande/>
        <Card className=' shadow-gray-50 border-gray-100 mx-48'>
            <CardHeader className=' mb-5'>
                <CardTitle className='text-[#FF4000]'>FORMULAIRE</CardTitle>
                <CardDescription>Enregristrement d'un nouveau membre d'Administration</CardDescription>
            </CardHeader>
            <CardContent>
                
                <AddMemberForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit}/>      
            </CardContent>
        </Card>

    </div>
  )
}

export default NewMemberTeam