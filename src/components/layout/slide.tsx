"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import {
  ChevronRight,
  ChevronLeft,
  Home,
  Users,
  List,
  CreditCard,
  Settings,
  LogOut,
  X
} from "lucide-react"

interface SidebarProps {
  setSize: React.Dispatch<React.SetStateAction<boolean>>
  isMobile: boolean
  isTablet: boolean
  mobileMenuOpen: boolean
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/dashboard/users', icon: Users, label: 'Utilisateurs' },
  { path: '/dashboard/catalogues', icon: List, label: 'Catalogue' },
  { path: '/dashboard/paiement', icon: CreditCard, label: 'Paiement' },
  { path: '/dashboard/setting', icon: Settings, label: 'Parametre' },
]

function Slide({ setSize, isMobile, isTablet, mobileMenuOpen, setMobileMenuOpen }: SidebarProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()
  
  // Auto-collapse sidebar on tablet
  useEffect(() => {
    if (isTablet && !isMobile) {
      setSidebarCollapsed(true)
      setSize(true)
    }
  }, [isTablet, isMobile, setSize])

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(prev => !prev)
    } else {
      setSidebarCollapsed(prev => !prev)
      setSize(prev => !prev)
    }
  }

  const closeMobileMenu = () => {
    if (isMobile) {
      setMobileMenuOpen(false)
    }
  }

  // Fonction améliorée pour déterminer si un élément est actif
  const isActiveItem = (itemPath: string): boolean => {
    if (pathname === itemPath) return true
    if (itemPath === '/dashboard' && pathname === '/dashboard') return true
    if (itemPath !== '/dashboard' && pathname.startsWith(itemPath)) return true
    return false
  }

  // Mobile: Menu burger avec overlay
  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button - Seulement quand le menu est fermé */}
        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-[999] lg:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Mobile Sidebar */}
        <div 
          className={`
            fixed top-0 left-0 h-full w-64 bg-white z-[1000] 
            transform transition-transform duration-300 ease-in-out lg:hidden
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            shadow-xl
          `}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between min-h-[60px]">
              <h1 className="text-xl font-bold text-gray-800">NISO</h1>
              <button 
                onClick={closeMobileMenu}
                className="p-1.5 rounded-lg hover:bg-orange-100 transition-colors duration-200"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Navigation */}
            <div className="flex-1 py-6 px-2">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = isActiveItem(item.path)
                  const Icon = item.icon
                  
                  return (
                    <Link 
                      href={item.path} 
                      key={item.path}
                      className="block"
                      onClick={closeMobileMenu}
                    >
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={`
                          w-full h-11 px-3 justify-start
                          transition-all duration-200 
                          ${isActive 
                            ? 'bg-[#FF4000] text-white hover:bg-[#e63600] hover:text-white shadow-sm' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                          }
                        `}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span className="ml-3 text-sm font-medium">
                          {item.label}
                        </span>
                      </Button>
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Logout Button */}
            <div className="p-2 border-t border-gray-100">
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full h-11 px-3 justify-start text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-800 transition-all duration-200"
                onClick={() => {
                  console.log('Déconnexion...')
                  closeMobileMenu()
                }}
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3 text-sm font-medium">
                  Déconnexion
                </span>
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Desktop & Tablet: Sidebar normale
  return (
    <div 
      className={`
        ${sidebarCollapsed ? 'w-18' : 'w-56'} 
        bg-white 
        fixed 
        h-screen 
        z-[1000] 
        left-0 
        top-0
        transition-all 
        duration-300 
        ease-in-out
        hidden lg:block
      `}
    >
      {/* Sidebar Content */}
      <div 
        className={`
          h-full 
          bg-white 
          transition-all 
          duration-300 
          ease-in-out 
          flex 
          flex-col 
          shadow-lg 
          shadow-gray-100
          m-2 
          rounded-lg 
          border 
          border-gray-100
          ${sidebarCollapsed ? 'w-14' : 'w-52'}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between min-h-[60px]">
          <div className="flex items-center overflow-hidden">
            {!sidebarCollapsed ? (
              <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">NISO</h1>
            ) : (
              <h1 className="text-xl font-bold text-gray-800">N</h1>
            )}
          </div>
          <button 
            onClick={toggleSidebar} 
            className="p-1.5 rounded-lg hover:bg-orange-100 transition-colors duration-200 flex-shrink-0"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 py-6 px-2">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = isActiveItem(item.path)
              const Icon = item.icon
              
              return (
                <Link 
                  href={item.path} 
                  key={item.path}
                  className="block"
                >
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`
                      w-full 
                      h-11
                      ${sidebarCollapsed ? 'px-2 justify-center' : 'px-3 justify-start'} 
                      transition-all 
                      duration-200 
                      ${isActive 
                        ? 'bg-[#FF4000] text-white hover:bg-[#e63600] hover:text-white shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="ml-3 text-sm font-medium whitespace-nowrap overflow-hidden">
                        {item.label}
                      </span>
                    )}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-2 border-t border-gray-100">
          <Button 
            variant="ghost" 
            size="sm"
            className={`
              w-full 
              h-11
              ${sidebarCollapsed ? 'px-2 justify-center' : 'px-3 justify-start'} 
              text-gray-600 
              bg-gray-50 
              hover:bg-gray-100 
              hover:text-gray-800
              transition-all 
              duration-200
            `}
            onClick={() => {
              console.log('Déconnexion...')
            }}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="ml-3 text-sm font-medium whitespace-nowrap">
                Déconnexion
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Slide