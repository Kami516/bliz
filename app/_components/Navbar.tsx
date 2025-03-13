"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Minus } from 'lucide-react';

export default function Navbar() {
    // Korzystamy z hooka useAccount z wagmi do uzyskania informacji o połączonym portfelu
    const { address, isConnected } = useAccount();
    
    // Używamy hooka useMutation z Convex do aktualizacji/tworzenia użytkownika
    const upsertUser = useMutation(api.users.upsertUser);
  
    // Synchronizacja danych portfela z bazą Convex gdy użytkownik się połączy
    useEffect(() => {
        const syncUserData = async () => {
            if (isConnected && address) {
                try {
                    // Generujemy deterministyczny ID oparty na adresie portfela
                    const walletBasedId = `wallet-${address.toLowerCase()}`;
                    
                    // Zapisz adres portfela do Convex
                    await upsertUser({
                        walletAddress: address.toLowerCase(),
                        clerkId: walletBasedId, // Używamy tego jako ID użytkownika
                        username: `User-${address.slice(0, 6)}`,
                    });
                    
                    console.log("User data synced with Convex");
                } catch (err) {
                    console.error("Error syncing user data with Convex:", err);
                }
            }
        };
  
        syncUserData();
    }, [isConnected, address, upsertUser]);
  
    return (
        <div className='flex flex-col items-center w-full z-40'>
            {/* Desktop Navbar (md and larger) */}
            <div className='hidden lg:flex justify-end w-full gap-4 py-4 border-b border-[#1F1F1F] px-4 items-center h-[88px]'>
                <div className='bg-[#0F0F0F] flex-1 items-center px-5 gap-4 flex-wrap py-1 hidden md:flex text-lg h-[40px] rounded-xl text-white'>
                    <span>BLIZZARD v1 Launched</span>
                    <Link 
                        href="https://t.me/yourTelegramGroup" 
                        className="opacity-30 text-[#868686] hover:text-gray-300 flex items-center"
                    >
                        <Minus className='w-5 h-5 mr-3' />
                        READ DOCS
                    </Link>
                </div>
                <div className='h-auto relative'>
                    {/* RainbowKit ConnectButton */}
                    <ConnectButton />
                </div>
            </div>

            {/* Mobile Navbar (less than md) */}
            <div className='flex lg:hidden justify-end w-full py-4 border-b border-[#1F1F1F] px-4 items-center h-[68px]'>
                <div className='h-auto relative'>
                    {/* RainbowKit ConnectButton dla mobile */}
                    <ConnectButton />
                </div>
            </div>
        </div>
    );
}