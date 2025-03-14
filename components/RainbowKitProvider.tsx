"use client";

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { http } from 'viem';
import React from 'react';

// Create a client
const queryClient = new QueryClient();

// Get wagmi config
const config = getDefaultConfig({
  appName: 'Blizzard dApp',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '0c36ab291e36d0e06c3c84a16f65b72b', // Potrzebujesz uzyskać Project ID z WalletConnect Cloud
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true,
  // W produkcji powinieneś używać dedykowanych dostawców RPC:
  // transports: {
  //   [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY'),
  //   [polygon.id]: http('https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY'),
  // },
});

export function RainbowKitProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}