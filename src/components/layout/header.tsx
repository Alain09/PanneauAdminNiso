"use client"

import React from 'react'
import { Menu } from "lucide-react"
import { useSession } from '@/src/lib/auth-client'
import { useRouter } from 'next/navigation'

interface Size {
    size: boolean
    isMobile: boolean
    isTablet: boolean
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}


function Header({ size, isMobile, isTablet, setMobileMenuOpen }: Size) {
    const {data}=useSession()
    const route = useRouter()
    return (
        <header 
            className={`
                transition-all duration-300 flex 
                ${isMobile ? "ml-0" : size ? "ml-18" : "ml-56"} 
                bg-white h-16 
                absolute left-0 right-0 z-[998]
            `}
        >
            <div className={`
                h-12 absolute top-2 flex 
                ${isMobile ? "left-2 right-2" : "left-4 lg:left-6 right-4 lg:right-6"} 
                gap-2 lg:gap-3 items-center
            `}>
                {/* Mobile Menu Button */}
                {isMobile && (
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2 bg-white rounded-lg shadow-lg border border-gray-200 flex-shrink-0"
                        aria-label="Open mobile menu"
                    >
                        <Menu size={20} />
                    </button>
                )}

                {/* Dashboard Title */}
                <div className={`
                    flex justify-start px-3 lg:px-5 items-center  h-12
                    ${isMobile ? "flex-1 min-w-0" : isTablet ? "w-[300px]" : "w-full"} 
                    bg-white shadow shadow-gray-50 border border-gray-100 rounded-lg
                `}>
                    <span className="text-sm lg:text-base font-medium text-gray-800 truncate">
                        Admin Panel
                    </span>
                </div>

                {/* Quote Section  */}
                <div className={`
                    ${isMobile ? "w-fit h-12" : "min-w-[100px] h-12"} 
                    shadow shadow-gray-50  px-3 border 
                    border-gray-100 rounded-lg flex justify-center 
                    items-center flex-shrink-0
                `}>
                    <span className="font-medium  text-sm">{data?.user.name}</span>
                </div>

                {/* User Avatar */}
                <div 
                onClick={() => route.push('/dashboard/setting/admin')}
                
                className={`
                    ${isMobile ? "w-12 h-12" : "w-[75px] h-12"} 
                    shadow shadow-gray-50 bg-blue-600 border 
                    border-gray-100 rounded-lg flex justify-center 
                    items-center flex-shrink-0 cursor-pointer
                `}>
                    <span className="font-medium text-white text-sm">{data?.user.name.charAt(0).toUpperCase()}</span>
                </div>
            </div>
        </header>
    )
}

export default Header