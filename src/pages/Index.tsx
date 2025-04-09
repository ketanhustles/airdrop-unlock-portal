
import React from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import WalletConnect from '@/components/WalletConnect';
import { useAccount } from 'wagmi';
import { useWalletContext } from '@/providers/WalletProvider';

const Index = () => {
  const { isConnected } = useAccount();
  const { connectedAddresses } = useWalletContext();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black flex flex-col items-center justify-center p-6">
      {/* Logo Area */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl">
          {/* Placeholder for company logo */}
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center">
            <span className="text-xl md:text-2xl font-bold text-white">A</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl w-full mx-auto text-center mb-12 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          You've Unlocked Access to an 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300 ml-2">
            Exclusive Airdrop!
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
          Connect your wallet now — your tokens await! Limited-time offer for early supporters.
        </p>
      </div>

      {/* Countdown Timer */}
      <div className="w-full max-w-md mb-12">
        <CountdownTimer initialHours={3} />
      </div>

      {/* Wallet Connection */}
      <div className="w-full max-w-md flex flex-col items-center space-y-6">
        <WalletConnect />
        
        {isConnected && (
          <div className="mt-6 p-6 bg-green-900/20 border border-green-500/30 rounded-xl backdrop-blur-md animate-fadeIn">
            <h3 className="text-xl text-green-300 font-bold mb-2">
              Wallet Connected Successfully!
            </h3>
            <p className="text-green-200">
              You'll receive your airdrop soon. Your wallet has been registered.
            </p>
          </div>
        )}
      </div>

      {/* Stats Display */}
      <div className="mt-12 text-center text-purple-300 text-sm">
        <p>{connectedAddresses.length} wallets have claimed this drop</p>
      </div>

      <footer className="mt-auto pt-12 text-center text-purple-400/70 text-sm">
        <p>Claim in the next 3 hours before it disappears!</p>
      </footer>
    </div>
  );
};

export default Index;
