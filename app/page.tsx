// app/login/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"

import { Loader2 } from "lucide-react"
//import { Alert, AlertDescription } from "@/src/components/ui/alert"
import Image from "next/image"
import { useRouter } from 'next/navigation'

import { Globe } from "@/src/components/ui/globe"



export default function LoginPage() {

  const route = useRouter()
  const [isSuccess, setIsSuccess] = useState(false)

  const [email, setEmail] = useState("")



  //simulations 
  const onSubmit = async () => {
    alert(email)
    setIsSuccess(true)
    setTimeout(() => {
      route.push('/dashboard')
    }, 2000)
  }



  return (
    <div className=" w-full  min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-300/80 p-4">
      <div className="absolute inset-0 overflow-hidden z-0">

        
          <span className=" flex justify-center mt-10 text-gray-50 pointer-events-none whitespace-pre-wrap  bg-clip-text text-center text-8xl font-semibold leading-none  ">
           CONNEXION
          </span>
          <Globe className="top-28" />
          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
       

      </div>

      <Card className="  w-[400px] relative z-10  backdrop-blur-sm shadow-xl border border-gray-300">
         {/* 
        <CardHeader className="  space-y-1">
         
          <div className="flex items-center justify-center mb-4">
            LOGO
          </div>
          <CardTitle className=" dark:text-black text-2xl font-bold">CONNEXION </CardTitle>
          <CardDescription className=' dark:text-gray-600'>
            Saisissez votre e-mail pour recevoir un lien de connexion
          </CardDescription>
        </CardHeader>
         */}
        <CardContent>
          {isSuccess ? (
            <div className="bg-green-50 text-green-800 border-green-200 p-5 rounded-lg">
              <CardDescription>
                Lien de connexion envoyé ! Vérifiez votre boîte de réception.
              </CardDescription>
            </div>
          ) : (

            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                name='email'
                type='email'
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                placeholder='alain090901@gmail.com'
                required
              >
              </Input>

              <Button
                type="submit"

                className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-gray-50 disabled:bg-gray-800 disabled:text-gray-50 "
              >
                Recevoir un lien de connexion
              </Button>
            </form>

          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t border-t-gray-200 pt-4">

        </CardFooter>
        <div className="absolute bottom-2 left-0 right-0 text-center text-xs  text-gray-500">
          © 2025, Name
        </div>
      </Card>
    </div>
  )
}