"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import {
  ChevronRight,
  ChevronLeft,
  Home,
  Users,
  List,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

interface Size {
  setSize: React.Dispatch<React.SetStateAction<boolean>>;
}

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Dashboard', exact: true },
  { path: '/dashboard/users', icon: Users, label: 'Utilisateurs' },
  { path: '/dashboard/catalogues', icon: List, label: 'Catalogue' },
  { path: '/dashboard/paiement', icon: CreditCard, label: 'Paiement' },
  { path: '/dashboard/setting', icon: Settings, label: 'Parametre' },
];

function Slide({ setSize }: Size) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    setSize(!sidebarCollapsed);
  };

  // Fonction de navigation
  const handleNavigation = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Navigation vers:', path); // Pour débugger
    router.push(path);
  };

  // Fonction améliorée pour déterminer si un lien est actif
  const isLinkActive = (linkPath: string, exact: boolean = false) => {
    if (exact) {
      return pathname === linkPath;
    }
    return pathname.startsWith(linkPath);
  };

  return (
    <div className={`${sidebarCollapsed ? 'w-18' : 'w-56'} bg-white/90 backdrop-blur-lg absolute h-screen z-[1000] left-0 pt-2 transition-all duration-300`}>
      {/* Sidebar */}
      <div className={`h-screen bg-white transition-all duration-300 flex flex-col shadow shadow-gray-50 absolute top-2 left-2 rounded-lg border border-gray-100`}>
        <div className="p-4 border-b flex items-center justify-between">
          {!sidebarCollapsed ? (
            <h1 className="text-xl font-bold">NISO</h1>
          ) : (
            <h1 className="text-xl font-bold">N</h1>
          )}
          <button 
            onClick={toggleSidebar} 
            className="p-1 rounded-lg hover:bg-orange-100"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        <div className="flex-1 py-6">
          <nav className="space-y-5 px-2">
            {navItems.map((item) => {
              const isActive = isLinkActive(item.path, item.exact);
              const Icon = item.icon;
              
              return (
                <div
                  key={item.path}
                  onClick={(e) => handleNavigation(item.path, e)}
                  className={`block rounded-lg transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-[#FF4000] text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-500'
                  }`}
                >
                  <div className={`flex items-center w-full p-3 rounded-lg ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
                    <Icon className="h-5 w-5" />
                    {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="p-2 pb-10">
          <Button 
            variant="ghost" 
            className={`w-full ${sidebarCollapsed ? 'px-3 justify-center' : 'px-4 justify-start'} text-gray-600 bg-gray-100 hover:bg-gray-200`}
          >
            <LogOut className="h-5 w-5" />
            {!sidebarCollapsed && <span className="ml-3">Déconnexion aaa</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Slide;