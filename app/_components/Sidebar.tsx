"use client";

import { useState, useEffect } from "react";
import { House, Database, CircleDollarSign, MessageCircle, Send, Twitter, BookText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Effect for path changes
  useEffect(() => {
    // Only close sidebar when path changes (mobile navigation)
    setIsOpen(false);
  }, [pathname]);

  // Separate effect for click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const hamburger = document.getElementById('hamburger-button');
      
      // Only close if sidebar is open AND click is outside sidebar AND outside hamburger
      if (
        isOpen && 
        sidebar && 
        hamburger && 
        !sidebar.contains(event.target as Node) && 
        !hamburger.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button (Mobile Only) - Position changes when sidebar is open */}
      <button 
        id="hamburger-button"
        className={`fixed top-4 z-50 p-2 rounded-md bg-[#0A0A0A] border border-[#1F1F1F] md:hidden text-white transition-all duration-300 ${
          isOpen ? 'left-[270px]' : 'left-4'
        }`}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay (Mobile Only) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Desktop Sidebar */}
      <div
        className="hidden md:flex flex-col w-[257px] min-h-screen border-r border-[#1F1F1F] bg-[#0A0A0A] relative"
      >
        <SidebarContent isActive={isActive} />
      </div>

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className={`fixed top-0 left-0 h-screen w-[257px] border-r border-[#1F1F1F] bg-[#0A0A0A] z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent isActive={isActive} closeMenu={() => setIsOpen(false)} />
      </div>
    </>
  );
};

// Define prop types for SidebarContent
interface SidebarContentProps {
  isActive: (path: string) => boolean;
  closeMenu?: () => void;
}

// Extracted sidebar content to avoid duplication
const SidebarContent = ({ isActive, closeMenu }: SidebarContentProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-[#1F1F1F] h-[88px] flex items-center px-5">
        <Link href="/">
          <img
            className="h-[150px] w-[150px]"
            src="/Vector.svg"
            alt="logo"
          />
        </Link>
      </div>
      
      <div className="relative">
        {isActive("/") && (
          <div className="absolute right-0 top-0 w-1 h-full bg-[#2234d1]"></div>
        )}
        <Link 
          href="/"
          onClick={closeMenu}
          className={`h-[61px] flex items-center text-[#868686] border-b border-[#1F1F1F] px-5 text-xl font-normal hover:bg-[#1A1A1A] transition-colors ${isActive("/") ? "bg-linear-to-r from-[#1F1F1F]/20 to-[#2234d1]/15 text-white" : ""}`}
        >
          <House 
            className="w-5 h-5 mr-3"
          />
          Dashboard
        </Link>
      </div>
      
      <div className="relative">
        {isActive("/stake") && (
          <div className="absolute right-0 top-0 w-1 h-full bg-[#2234d1]"></div>
        )}
        <Link 
          href="/stake"
          onClick={closeMenu}
          className={`h-[61px] flex items-center text-[#868686] border-b border-[#1F1F1F] px-5 text-xl font-normal hover:bg-[#1A1A1A] transition-colors ${isActive("/stake") ? "bg-linear-to-r from-[#1F1F1F]/20 to-[#2234d1]/15 text-white" : ""}`}
        >
          <Database 
            className="w-5 h-5 mr-3"
          />
          Stake
        </Link>
      </div>
      
      <div className="relative">
        {isActive("/buy") && (
          <div className="absolute right-0 top-0 w-1 h-full bg-[#2234d1]"></div>
        )}
        <Link 
          href="/buy"
          onClick={closeMenu}
          className={`h-[61px] flex items-center text-[#868686] border-b border-[#1F1F1F] px-5 text-xl font-normal hover:bg-[#1A1A1A] transition-colors ${isActive("/buy") ? "bg-linear-to-r from-[#1F1F1F]/20 to-[#2234d1]/15 text-white" : ""}`}
        >
          <CircleDollarSign
            className="w-5 h-5 mr-3"
          />
          Buy
        </Link>
      </div>
      
      {/* Social links at the bottom */}
      <div className="absolute bottom-0 w-full">
        <div className="relative">
          {isActive("https://twitter.com/yourTwitter") && (
            <div className="absolute right-0 top-0 w-1 h-full bg-blue-600"></div>
          )}
          <Link 
            href="https://twitter.com/yourTwitter" 
            onClick={closeMenu}
            className="h-[61px] flex items-center text-[#868686] px-5 text-l font-normal hover:text-gray-300 transition-colors border-t border-[#1F1F1F] w-full"
          >
            <Twitter
              className="w-5 h-5 mr-3"
            />
            Twitter
          </Link>
        </div>
        
        <div className="relative">
          {isActive("/docs") && (
            <div className="absolute right-0 top-0 w-1 h-full bg-blue-600"></div>
          )}
          <Link 
            href="/docs" 
            onClick={closeMenu}
            className={`h-[61px] flex items-center text-[#868686] px-5 text-l font-normal hover:text-gray-300 transition-colors border-t border-[#1F1F1F] w-full ${isActive("/docs") ? "bg-[#13131F] text-white" : ""}`}
          >
            <BookText 
              className="w-5 h-5 mr-3"
            />
            Docs
          </Link>
        </div>
        
        <div className="relative">
          {isActive("https://t.me/yourTelegramGroup") && (
            <div className="absolute right-0 top-0 w-1 h-full bg-blue-600"></div>
          )}
          <Link 
            href="https://t.me/yourTelegramGroup" 
            onClick={closeMenu}
            className="h-[61px] flex items-center text-[#868686] px-5 text-l font-normal hover:text-gray-300 transition-colors border-t border-[#1F1F1F] w-full"
          >
            <Send
              className="w-5 h-5 mr-3"
            />
            Telegram
          </Link>
        </div>
      </div>
    </div>
  );
};