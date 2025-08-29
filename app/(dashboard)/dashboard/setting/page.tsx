import CardSetting from '@/src/components/setting/composant_setting'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { generateId } from '@/src/lib/utils'
import { BadgeCheck, ChevronRight, ShieldCheck, TimerReset, UserCog } from 'lucide-react'
import React from 'react'

function Page() {

   const  Content =[
      {
        id : generateId(),
        title : "Permission",
        description : " gestion de la permission des utilisateurs de l&apos;application ",
        icon : <UserCog size={20} className=' text-[#FF4000]/70'/>,
        linkIcon : <ChevronRight size={20} className=' text-gray-500 hover:text-gray-100'/>,
        path : "/allowUsers",
      },
      {
        id : generateId(),
        title : "Role",
        description : "gestion du roles des utilisateurs de l&apos;application",
        icon : <BadgeCheck size={20} className=' text-[#FF4000]/70'/>,
        linkIcon : <ChevronRight size={20} className=' text-gray-500 hover:text-gray-100'/>,
        path : "/roleUsers",
      },
      {
        id : generateId(),
        title : "Campagne",
        description : "gestion du temps de campagne de la tontine",
        icon : <TimerReset  size={20} className=' text-[#FF4000]/70'/>,
        linkIcon : <ChevronRight size={20} className=' text-gray-500 hover:text-gray-100'/>,
        path : "/campagneUsers",
      },
      {
        id : generateId(),
        title : " Administration",
        description : "gestion des administrateurs de l&apos;application",
        icon : <ShieldCheck size={20} className=' text-[#FF4000]/70'/>,
        linkIcon : <ChevronRight size={20} className=' text-gray-500 hover:text-gray-100'/>,
        path : "/admin",
      },
    ]

  return (
    <div className='p-4 md:p-6'>

      <Card className='shadow-none border border-gray-100 mx-0 md:mx-10 lg:mx-20 my-6 md:my-10' >
        <div className=''>
          <CardHeader className="flex justify-center items-center flex-col p-4 md:p-6">
            <CardTitle className="text-[#FF4000] font-bold text-xl md:text-2xl lg:text-[24px] mb-1">
              Parametre
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm text-center -mt-2">
              Gestion des parametres de l&apos;application
            </CardDescription>
          </CardHeader>
        </div>
        <CardContent className='m-3 md:m-5 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5'>
          {
            Content.map((item) =>(
              <CardSetting 
                key={item.id} 
                title={item.title} 
                description={item.description} 
                icon={item.icon} 
                linkIcon={item.linkIcon} 
                path={item.path}
              />
            ))
          }
        </CardContent>
      </Card>

    </div>
  )
}

export default Page