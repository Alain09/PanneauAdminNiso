"use client"
import React, { useState, useEffect } from "react";
import Slide from "@/src/components/layout/slide";
import Header from "@/src/components/layout/header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [size, setSize] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Hook pour détecter la taille de l'écran
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth
            setIsMobile(width < 1024) // lg breakpoint
            setIsTablet(width >= 768 && width < 1024) // md to lg
        }

        // Vérifier au montage
        checkScreenSize()

        // Écouter les changements de taille
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    // Fermer le menu mobile lors du changement vers desktop
    useEffect(() => {
        if (!isMobile && mobileMenuOpen) {
            setMobileMenuOpen(false)
        }
    }, [isMobile, mobileMenuOpen])

    // Empêcher le scroll quand le menu mobile est ouvert
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        // Cleanup
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [mobileMenuOpen])

    return (
        <div className="flex h-screen relative w-full overflow-hidden">
            {/* Sidebar */}
            <div className="flex fixed top-0 z-[101] w-screen">
                <Slide 
                    setSize={setSize} 
                    isMobile={isMobile}
                    isTablet={isTablet}
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                />
                <Header 
                    size={size} 
                    isMobile={isMobile}
                    isTablet={isTablet}
                    setMobileMenuOpen={setMobileMenuOpen}
                />
            </div>

            {/* Main Content */}
            <div className={`
                transition-all duration-300 flex-1 
                ${isMobile ? "ml-0" : size ? "ml-18" : "ml-56"} 
                mt-[64px] 
                overflow-auto
                ${mobileMenuOpen ? "overflow-hidden" : ""}
            `}>
                <div className="p-4 lg:p-6 min-h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}