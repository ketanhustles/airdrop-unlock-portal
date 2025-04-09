
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

// Create a react-query client
const queryClient = new QueryClient();

// Context to store connected addresses
interface WalletContextType {
  connectedAddresses: string[];
  addAddress: (address: string) => void;
  isAddressConnected: (address: string) => boolean;
}

const WalletContext = createContext<WalletContextType>({
  connectedAddresses: [],
  addAddress: () => {},
  isAddressConnected: () => false,
});

export const useWalletContext = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [connectedAddresses, setConnectedAddresses] = useState<string[]>([]);

  const addAddress = (address: string) => {
    if (!connectedAddresses.includes(address)) {
      setConnectedAddresses((prev) => [...prev, address]);
      console.log('Address added:', address);
      console.log('Current addresses:', [...connectedAddresses, address]);
    }
  };

  const isAddressConnected = (address: string) => {
    return connectedAddresses.includes(address);
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletContext.Provider value={{ connectedAddresses, addAddress, isAddressConnected }}>
          {children}
        </WalletContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
