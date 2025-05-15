"use client"
import React from "react";
import type { Metadata } from "next";
import Slide from "@/src/components/layout/slide";
import Header from "@/src/components/layout/header";
import { useState } from "react";








export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [size , setSize]=useState(false)


    return (


        <div className="flex h-screen relative  w-full">
            <div className=" flex  fixed top-0 z-[101]  w-screen  ">
                <Slide  setSize={setSize}/> {/* ✅ La sidebar est maintenant globale */}
                <Header size={size}/>

            </div>


            <div className={` transition-all duration-300 flex-1  ${size ? "ml-18" :"ml-56"} mt-[64px]  `}>
                {children} {/* ✅ Contenu des pages */}
            </div>
        </div>



    );
}