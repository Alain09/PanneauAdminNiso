"use client"
import AddMemberForm from '@/src/components/setting/team/addMemberForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import Bande from '@/src/components/users/bande'
import { generateId } from '@/src/lib/utils'
import { TeamMember } from '@/type'
import React, { useState, use } from 'react'

export default function NewMemberTeam({ params }: { params: Promise<{ id: string }> }) {
  const [formData, setFormData] = useState<TeamMember>({
    id: generateId(),
    firstName: "Alain",
    lastName: "HOUNGA",
    email: "alain09@gmail.com",
    contact: "+229 0161624396",
    role: "Co-fondateur",
    position: "Chef service informatique",
    image: ""
  });

  const handleSubmit = () => {
    alert("formulaire enregistré")
  }
  
  const {id} = use(params);

  return (
    <div className='p-4 md:p-6'>
      <Bande/>
      <Card className='shadow-gray-50 border-gray-100 mx-0 md:mx-10 lg:mx-20 xl:mx-48'>
        <CardHeader className='mb-4 md:mb-5'>
          <CardTitle className='text-[#FF4000] text-lg md:text-xl'>Edition {id}</CardTitle>
          <CardDescription className='text-sm md:text-base'>
            Mise à jour des coordonnées d&apos;un membre Administratif
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddMemberForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit}/>      
        </CardContent>
      </Card>
    </div>
  )
}