"use client";

import { SignInButton, SignOutButton, useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useConvexAuth } from "convex/react";
import { useMutation } from "convex/react";

export default function Home() {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl mb-6">Crypto Web3 Authentication Test</h1>
      
      <div className="absolute top-4 right-4">
        <a 
          href="/admin" 
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm"
        >
          Admin Panel
        </a>
      </div>
      
      {isSignedIn ? (
        <div className="flex flex-col items-center gap-4">
          <div className="bg-gray-800 p-4 rounded-md">
            <p>User ID: {userId}</p>
            {user?.web3Wallets && user.web3Wallets.length > 0 && (
              <p className="text-green-400">Wallet connected: {user.web3Wallets[0].web3Wallet}</p>
            )}
            <p>User saved to database</p>
          </div>
          <SignOutButton>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      ) : (
        <SignInButton mode="modal">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium">
            Sign In with Web3
          </button>
        </SignInButton>
      )}
    </div>
  );
}