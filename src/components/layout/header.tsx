"use client"
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { SlidingNumber } from '../ui/sliding-number';


interface Size {
    size: boolean
}

function Header({ size }: Size) {

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Mettre en place un intervalle qui met à jour l'heure chaque seconde
        const timer = setInterval(() => {
            const time = new Date();
            // time.setDate(time.getDate() + 5).toString()
            // alert(time.toString())
            setCurrentTime(time);
        }, 1000);

        // Nettoyer l'intervalle quand le composant est démonté
        return () => clearInterval(timer);
    }, []);

    return (

        <header className={`  transition-all duration-300 flex  ${size ? "ml-18" : "ml-56"} bg-white/90 backdrop-blur-lg   h-16  absolute left-0 right-0  `}  >
            <div className=' h-12  absolute top-2  flex left-6 right-6  gap-3' >
                <div className=' flex justify-start px-5 items-center w-full bg-white shadow shadow-gray-50 border border-gray-100 rounded-lg  '>
                    <span>Dashboard</span>

                </div>

                <div className='flex justify-center items-center  w-[350px] shadow shadow-gray-50 border   border-gray-100 bg-white rounded-lg '>
                    <div className=' p-2  flex items-center gap-0.5 font-mono text-sm'>
                        <SlidingNumber value={currentTime.getHours()} padStart={true} />
                        <span className='text-zinc-500'>:</span>
                        <SlidingNumber value={currentTime.getMinutes()} padStart={true} />
                        <span className='text-zinc-500'>:</span>
                        <SlidingNumber value={currentTime.getSeconds()} padStart={true} />
                    </div>
                </div>
                <div className="  w-[70px] shadow shadow-gray-50 bg-blue-600 border border-gray-100 rounded-lg flex justify-center items-center mr-2 ">

                    <span className="font-medium text-white text-sm">JD</span>

                </div>
            </div>
        </header>


    )
}

export default Header