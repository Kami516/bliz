"use client";

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme, connectorsForWallets, DisclaimerComponent, } from '@rainbow-me/rainbowkit';
import { 
  metaMaskWallet,
  phantomWallet,
  krakenWallet,
  walletConnectWallet,
  injectedWallet,
  ledgerWallet,
  okxWallet,
  rainbowWallet,
  trustWallet,
  xdefiWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider, createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { http } from 'viem';

// Create a client
const queryClient = new QueryClient();

// Configure custom wallet list
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        krakenWallet,
        phantomWallet,
      ],
    },
    {
      groupName: 'Others',
      wallets: [
        ledgerWallet,
        okxWallet,
        xdefiWallet,
        trustWallet,
        rainbowWallet,
        injectedWallet,
        walletConnectWallet,
      ],
    },
  ],
  { 
    appName: 'Blizzard dApp', 
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '0c36ab291e36d0e06c3c84a16f65b72b',
  }
);

const Disclaimer: DisclaimerComponent = ({ Text }) => (
  <div className='flex justify-center items-center'>
  <Text>
    <img 
        src="/Vector.svg" 
        alt="Blizzard Logo" 
        className="opacity-80 w-40" 
      />
  </Text>
  </div>
);

// Create config with the correct structure for wagmi with viem@2.x
const config = createConfig({
  connectors,
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
});

export function RainbowKitProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
              appInfo={{
                appName: 'RainbowKit Demo',
                disclaimer: Disclaimer,
              }}
          modalSize="compact" 
          showRecentTransactions={true}
          theme={darkTheme({
            overlayBlur: 'small',
            fontStack: 'system',
          })}
          >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}