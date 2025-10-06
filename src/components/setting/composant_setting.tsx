"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Structure {
    title: string,
    description: string,
    icon: React.JSX.Element,
    path: string
}

function CardSetting({ title, description, icon, path }: Structure) {
    const [isClicked, setIsClicked] = useState(false)
    const route = useRouter()

    const handleClick = () => {
        setIsClicked(true)
        setTimeout(() => {
            route.push(`/dashboard/setting/${path}`)
        }, 150) // Délai pour voir l'effet visuel
    }

    return (
        <div 
            onClick={handleClick}
            className={`p-3 flex items-center gap-x-10 border border-gray-100 rounded-lg shadow-gray-50 w-full transition-all duration-200 cursor-pointer
                ${isClicked 
                    ? 'bg-[#FF4000]/10 border-[#FF4000]/30 shadow-md scale-[0.98]' 
                    : 'hover:bg-gray-50 hover:border-gray-200 hover:shadow-sm'
                }`}
        >
            <div className='w-full flex items-center gap-x-3'>
                <div className={`h-fit w-fit p-2 rounded-full transition-colors duration-200
                    ${isClicked ? 'bg-[#FF4000]/20' : 'bg-[#FF4000]/10'}`}>
                    {icon}
                </div>
                <div className='w-full'>
                    <div className={`text-[16px] font-medium transition-colors duration-200
                        ${isClicked ? 'text-[#FF4000]' : 'text-[#FF4000]/70'}`}>
                        {title}
                    </div>
                    <div className="text-gray-500 text-sm">{description}</div>
                </div>
            </div>
        </div>
    )
}

export default CardSetting