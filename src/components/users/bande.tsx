"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

function Bande() {
    const route = useRouter()
    return (
        <div className='flex w-full gap-10 mb-3'>

            <Button className=''
                onClick={() => route.back()}>
                retour
            </Button>

            <div className=' px-3 py-2  w-full'>

            </div>


        </div>
    )
}

export default Bande