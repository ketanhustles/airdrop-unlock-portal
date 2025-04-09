
import React, { useState } from 'react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useWalletContext } from '../providers/WalletProvider';
import { toast } from '@/hooks/use-toast';
import { Wallet, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WalletConnect: React.FC = () => {
  const { connectedAddresses, addAddress, isAddressConnected } = useWalletContext();
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  const { address, isConnected } = useAccount();
  const { connect, status } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    setIsConnecting(true);
    setConnectionError(null);
    
    try {
      console.log('Attempting to connect wallet...');
      
      if (!window.ethereum) {
        throw new Error('No Ethereum wallet detected. Please install MetaMask or another wallet.');
      }
      
      connect({
        connector: injected(),
      });
    } catch (error) {
      console.error('Connection error:', error);
      
      let errorMessage = 'Could not connect to the wallet. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setConnectionError(errorMessage);
      
      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Store address when connected
  React.useEffect(() => {
    if (isConnected && address && !isAddressConnected(address)) {
      console.log('Address connected:', address);
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
        <Button
          onClick={() => disconnect()}
          variant="outline"
          className="border-purple-600/30 bg-purple-800/50 hover:bg-purple-700/50 text-white"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className="px-8 py-4 h-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          <>
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </>
        )}
      </Button>
      
      {connectionError && (
        <div className="mt-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start gap-2 max-w-md">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-200">{connectionError}</p>
        </div>
      )}
      
      <div className="text-center text-sm text-purple-300/80 max-w-md">
        <p>Note: You'll need a wallet like MetaMask installed to connect. Some features may be limited in preview mode.</p>
      </div>
    </div>
  );
};

export default WalletConnect;
