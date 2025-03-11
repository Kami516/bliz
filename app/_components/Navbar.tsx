"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { SignInButton, SignOutButton, useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useConvexAuth } from "convex/react";
import { useMutation } from "convex/react";
import { Minus, Wallet } from 'lucide-react';

export default function Navbar() {
    const [showTooltip, setShowTooltip] = useState(false);
    const { isSignedIn, userId } = useAuth();
    const { user } = useUser();
    const { isAuthenticated } = useConvexAuth();
    const upsertUser = useMutation(api.users.upsertUser);
  
    // Synchronize user data with Convex when user is authenticated
    useEffect(() => {
      const syncUserData = async () => {
        if (isAuthenticated && userId && user) {
          // Get wallet address if user has connected a web3 wallet
          let walletAddress = '';
          if (user.web3Wallets && user.web3Wallets.length > 0) {
            walletAddress = user.web3Wallets[0].web3Wallet;
          }
          
          // Save user data to Convex
          await upsertUser({
            clerkId: userId,
            walletAddress: walletAddress || 'No wallet connected',
            username: user.username || user.firstName || 'Anonymous',
          });
          
          console.log("User data synced with Convex");
        }
      };
  
      syncUserData();
    }, [isAuthenticated, userId, user, upsertUser]);
  
    return (
      <div className='flex flex-col items-center w-full z-40'>
        {/* Desktop Navbar (md and larger) */}
        <div className='hidden md:flex justify-end w-full gap-4 py-4 border-b border-[#1F1F1F] px-4 items-center h-[88px]'>
          <div className='bg-[#0F0F0F] flex-1 items-center px-4 gap-4 flex-wrap py-4 hidden md:flex text-xl'>
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
            {isSignedIn ? (
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <SignOutButton>
                    <button 
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-4 font-medium text-xl"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      Disconnect Wallet
                    </button>
                  </SignOutButton>
                  
                  {showTooltip && user?.web3Wallets && user.web3Wallets.length > 0 && (
                    <div className="absolute -left-43.5 top-full mt-2 px-4 py-3 bg-gray-800 text-white text-sm rounded shadow-lg whitespace-nowrap z-50 flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      {user.web3Wallets[0].web3Wallet}
                      <div className="absolute left-[70%] -translate-x-1/2 bottom-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-800"></div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-[#2234d1] hover:bg-[#2234d1]/85 text-white px-4 py-4 font-medium text-xl">
                  Connect Wallet
                </button>
              </SignInButton>
            )}
          </div>
        </div>

        {/* Mobile Navbar (less than md) */}
        <div className='flex md:hidden justify-end w-full py-4 border-b border-[#1F1F1F] px-4 items-center h-[68px]'>
          <div className='h-auto relative'>
            {isSignedIn ? (
              <SignOutButton>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded font-medium">
                  Disconnect Wallet
                </button>
              </SignOutButton>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded font-medium">
                  Connect Wallet
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    );
}