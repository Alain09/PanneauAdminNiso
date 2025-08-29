"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

interface Structure {
    title: string,
    description: string,
    icon: React.JSX.Element,
    linkIcon : React.JSX.Element,
    path:string
}

function CardSetting({ title, description, icon ,linkIcon,path }: Structure) {

    const route = useRouter()
    return (
        <div className=' p-3 flex items-center gap-x-10 border border-gray-100 rounded-lg shadow-gray-50 w-full'>
            <div className=' w-full flex  items-center  gap-x-3' >
                <div className=' h-fit w-fit p-2 rounded-full bg-[#FF4000]/10'>
                    {icon}
                </div>
                <div className=' w-full'>
                    <div className=' text-[#FF4000]/70 text-[16px] font-medium'>{title}</div>
                    <div className=" text-gray-500 text-sm ">{description}</div>
                </div>
            </div>
            <div className=' h-fit w-fit p-1 rounded-full bg-gray-200 hover:bg-gray-500  cursor-pointer'
                onClick={()=>route.push(`/dashboard/setting/${path}`)}
            >
                {linkIcon}
            </div>

        </div>
    )
}

export default CardSetting