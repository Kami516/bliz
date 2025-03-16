// app/buy/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther, parseUnits } from 'viem';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FaEthereum } from 'react-icons/fa';

// Constants for Uniswap Router and USDT
// These are for Ethereum mainnet
const UNISWAP_V3_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
// const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
// const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const WETH_ADDRESS = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"; // Sepolia WETH
const USDT_ADDRESS = "0x6175a8471C2122f778445e7E07A164250a19E661"; // Sepolia USDT

// Simplified Uniswap V3 Router ABI for the exactInputSingle function
const UNISWAP_ROUTER_ABI = [
  {
    "inputs": [
      {
        "components": [
          { "internalType": "address", "name": "tokenIn", "type": "address" },
          { "internalType": "address", "name": "tokenOut", "type": "address" },
          { "internalType": "uint24", "name": "fee", "type": "uint24" },
          { "internalType": "address", "name": "recipient", "type": "address" },
          { "internalType": "uint256", "name": "deadline", "type": "uint256" },
          { "internalType": "uint256", "name": "amountIn", "type": "uint256" },
          { "internalType": "uint256", "name": "amountOutMinimum", "type": "uint256" },
          { "internalType": "uint160", "name": "sqrtPriceLimitX96", "type": "uint160" }
        ],
        "internalType": "struct ISwapRouter.ExactInputSingleParams",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "exactInputSingle",
    "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          { "internalType": "bytes", "name": "path", "type": "bytes" },
          { "internalType": "address", "name": "recipient", "type": "address" },
          { "internalType": "uint256", "name": "deadline", "type": "uint256" },
          { "internalType": "uint256", "name": "amountIn", "type": "uint256" },
          { "internalType": "uint256", "name": "amountOutMinimum", "type": "uint256" }
        ],
        "internalType": "struct ISwapRouter.ExactInputParams",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "exactInput",
    "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }],
    "stateMutability": "payable",
    "type": "function"
  }
];

export default function Buy() {
  const [ethAmount, setEthAmount] = useState<string>('0.01');
  const [estimatedUsdt, setEstimatedUsdt] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(0.5); // 0.5% slippage tolerance
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  // Add this new state to store the ETH price
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [isPriceFetching, setIsPriceFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchEthPrice = async () => {
      setIsPriceFetching(true);
      try {
        // Using CoinGecko API to get ETH price in USD
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        const data = await response.json();
        if (data && data.ethereum && data.ethereum.usd) {
          setEthPrice(data.ethereum.usd);
        } else {
          // Fallback price if API fails
          console.warn('Using fallback ETH price');
          setEthPrice(3000);
        }
      } catch (err) {
        console.error('Failed to fetch ETH price:', err);
        // Fallback price if API fails
        setEthPrice(3000);
      } finally {
        setIsPriceFetching(false);
        console.log(isPriceFetching);
      }
    };
  
    fetchEthPrice();
    
    // Refresh price every minute
    const intervalId = setInterval(fetchEthPrice, 60000);
    return () => clearInterval(intervalId);
  }, []);
  
  
  // Get user's ETH balance
  const { data: ethBalance } = useBalance({
    address,
  });

  // Set up the contract write hook
  const { writeContract, isPending, data: writeData } = useWriteContract();

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash: writeData });

  // Save transaction details to Convex when successful
  const saveTransaction = useMutation(api.users.updateChainPreference);

// Update the existing calculateEstimate function to use the fetched price
useEffect(() => {
  const calculateEstimate = async () => {
    try {
      // Use the fetched ETH price instead of hardcoded value
      const ethPriceInUsd = ethPrice || 3000; // Fallback to 3000 if price is not yet fetched
      const parsedEthAmount = parseFloat(ethAmount) || 0;
      const estimatedUsdAmount = (parsedEthAmount * ethPriceInUsd).toFixed(2);
      setEstimatedUsdt(estimatedUsdAmount);
    } catch (err) {
      console.error("Error estimating USDT amount:", err);
      setEstimatedUsdt('');
    }
  };

  calculateEstimate();
}, [ethAmount, ethPrice]);

  // Handle the swap
  const handleSwap = async () => {
    if (!isConnected || !address) {
      openConnectModal?.();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Convert ETH amount to wei
      const amountIn = parseEther(ethAmount);
      
      // Calculate minimum amount out based on slippage tolerance
      // In a real app, you'd get this from a quote API
      const amountOutMinimum = parseUnits(
        (parseFloat(estimatedUsdt) * (1 - slippage / 100)).toFixed(6),
        6 // USDT has 6 decimals
      );

      // Set deadline to 10 minutes from now
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 600);

      // Prepare transaction parameters
      writeContract({
        address: UNISWAP_V3_ROUTER_ADDRESS,
        abi: UNISWAP_ROUTER_ABI,
        functionName: 'exactInputSingle',
        args: [{
          tokenIn: WETH_ADDRESS,
          tokenOut: USDT_ADDRESS,
          fee: 3000, // 0.3% fee tier
          recipient: address,
          deadline,
          amountIn,
          amountOutMinimum,
          sqrtPriceLimitX96: 0 // No price limit
        }],
        value: amountIn, // Send ETH with the transaction
      });

      // Reset form
      setTxHash(writeData?.toString() || null);

      // Save the transaction info to our database
      if (address && writeData) {
        await saveTransaction({
          walletAddress: address.toLowerCase(),
          chainPreference: 'ethereum', // You could make this dynamic based on the connected chain
        });
      }
    } catch (err) {
      console.error("Swap error:", err);
      setError("Failed to execute swap. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate max amount user can swap based on their balance
  const handleMaxAmount = () => {
    if (ethBalance) {
      // Leave a small amount for gas
      const maxAmount = parseFloat(formatEther(ethBalance.value)) - 0.01;
      if (maxAmount > 0) {
        setEthAmount(maxAmount.toFixed(4));
      }
    }
  };

  return (
    <div className="bg-black text-white p-3 sm:p-5 my-10 sm:my-40 mx-auto max-w-5xl lg:py-0 lg:mt-26">
      <div>
        {/* Header tabs - BUY and BOND */}
        <div className="grid grid-cols-2 border-b border-[#1F1F1F]">
          <div className="py-3 text-center border-b-2 border-blue-600 font-mono bg-linear-to-b from-[#1F1F1F]/10 to-[#2234d1]/7">
            BUY $BLIZZ
          </div>
          <div className="py-3 text-center text-gray-500 font-mono hover:text-gray-300">
            SELL $BLIZZ
          </div>
        </div>

        {/* Main swap container */}
        <div className="mt-10 mb-10 border border-[#1F1F1F] bg-[#0F0F0F] p-6 rounded-sm">
          <div className="text-lg mb-6 font-mono">Swap ETH to USDT</div>
          
          {/* From token input */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="text-sm text-[#868686]">From</label>
              {ethBalance && (
                <span className="text-sm text-[#868686]">
                  Balance: {parseFloat(formatEther(ethBalance.value)).toFixed(4)} ETH
                </span>
              )}
            </div>
            <div className="flex items-center bg-[#0A0A0A] border border-[#1F1F1F] p-3">
              <input 
                type="number"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                className="flex-grow bg-transparent outline-none mr-2"
                placeholder="0.0"
                min="0"
              />
              <div className="flex items-center">
                <button 
                  onClick={handleMaxAmount}
                  className="mr-2 text-xs text-blue-500 hover:text-blue-400"
                >
                  MAX
                </button>
                <div className="flex items-center bg-[#1F1F1F] px-3 py-1 rounded-sm">
                    <FaEthereum className="w-5 h-5 mr-2 text-[#627EEA]" />
                  <span>ETH</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Arrow down icon */}
          <div className="flex justify-center mb-6">
            <div className="p-2 bg-[#1F1F1F] rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L18 13M12 19L6 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* To token input */}
          <div className="mb-6">
            <label className="text-sm text-[#868686] mb-2 block">To (estimated)</label>
            <div className="flex items-center bg-[#0A0A0A] border border-[#1F1F1F] p-3">
              <input 
                type="text"
                value={estimatedUsdt}
                disabled
                className="flex-grow bg-transparent outline-none"
                placeholder="0.0"
              />
              <div className="flex items-center bg-[#1F1F1F] px-3 py-1 rounded-sm">
                <img 
                  src="https://cryptologos.cc/logos/tether-usdt-logo.png" 
                  alt="USDT" 
                  className="w-5 h-5 mr-2" 
                />
                <span>USDT</span>
              </div>
            </div>
          </div>
          
          {/* Slippage settings */}
          <div className="mb-6">
            <label className="text-sm text-[#868686] mb-2 block">Slippage Tolerance</label>
            <div className="flex space-x-2">
              {[0.1, 0.5, 1.0].map((value) => (
                <button
                  key={value}
                  onClick={() => setSlippage(value)}
                  className={`px-3 py-1 text-sm rounded-sm ${
                    slippage === value
                      ? "bg-blue-600 text-white"
                      : "bg-[#1F1F1F] text-[#868686] hover:bg-[#2A2A2A]"
                  }`}
                >
                  {value}%
                </button>
              ))}
              <div className="flex items-center bg-[#1F1F1F] px-2 rounded-sm">
                <input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(parseFloat(e.target.value) || 0.5)}
                  className="w-12 bg-transparent outline-none text-center"
                  min="0.1"
                  max="20"
                  step="0.1"
                />
                <span className="text-[#868686]">%</span>
              </div>
            </div>
          </div>
          
          {/* Transaction status */}
          {(isPending || isConfirming) && (
            <div className="mb-4 p-3 bg-blue-900/20 border border-blue-800 rounded-sm">
              <p className="text-blue-400 text-sm">
                {isPending ? "Waiting for approval..." : "Transaction in progress..."}
              </p>
            </div>
          )}
          
          {isConfirmed && txHash && (
            <div className="mb-4 p-3 bg-green-900/20 border border-green-800 rounded-sm">
              <p className="text-green-400 text-sm">
                Swap completed! Transaction hash: {txHash.slice(0, 10)}...{txHash.slice(-8)}
              </p>
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-sm">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          {/* Swap button */}
          <button
            onClick={handleSwap}
            disabled={!isConnected || isLoading || !ethAmount || parseFloat(ethAmount) <= 0}
            className={`w-full py-3 font-mono text-center ${
              !isConnected || isLoading || !ethAmount || parseFloat(ethAmount) <= 0
                ? "bg-[#1F1F1F] text-[#868686]"
                : "bg-[#2234d1] hover:bg-[#2234d1]/85 text-white"
            }`}
          >
            {!isConnected
              ? "Connect Wallet"
              : isLoading
              ? "Processing..."
              : "Swap ETH to USDT"}
          </button>
          
          {/* Disclaimer */}
          <div className="mt-4 text-[#868686] text-xs">
            Note: This is a direct interface to Uniswap V3. Be aware of gas fees and price impact.
            The actual amount of USDT received may vary due to market conditions.
          </div>
        </div>
      </div>
    </div>
  );
}