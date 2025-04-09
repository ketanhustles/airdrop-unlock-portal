
import React, { useState } from 'react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { metaMaskWallet, injectedWallet } from 'wagmi/connectors';
import { useWalletContext } from '../providers/WalletProvider';
import { toast } from '@/hooks/use-toast';

const WalletConnect: React.FC = () => {
  const { connectedAddresses, addAddress, isAddressConnected } = useWalletContext();
  const [isConnecting, setIsConnecting] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      connect({
        connector: metaMaskWallet(),
      });
    } catch (error) {
      console.error('Connection error:', error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to the wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Store address when connected
  React.useEffect(() => {
    if (isConnected && address && !isAddressConnected(address)) {
      addAddress(address);
      toast({
        title: "Success!",
        description: "Wallet connected! You'll receive your airdrop soon.",
        duration: 5000,
      });
    }
  }, [isConnected, address, addAddress, isAddressConnected]);

  if (isConnected && address) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-purple-900/30 backdrop-blur-md rounded-lg p-4 border border-purple-500/30 shadow-lg">
          <h3 className="text-lg font-medium text-purple-100 mb-2">Wallet Connected</h3>
          <p className="text-sm text-purple-200 break-all">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-6 py-2 bg-purple-800/50 hover:bg-purple-700/50 text-white rounded-lg text-sm transition-all duration-200 border border-purple-600/30"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isConnecting ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Connecting...
        </span>
      ) : (
        "Connect Wallet"
      )}
    </button>
  );
};

export default WalletConnect;
