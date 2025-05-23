
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  account: string | null;
  provider: BrowserProvider | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signMessage: (message: string) => Promise<string>;
  sendTransaction: (to: string, value: string) => Promise<string>;
  balance: string;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [balance, setBalance] = useState('0');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const browserProvider = new BrowserProvider(window.ethereum);
        const accounts = await browserProvider.send('eth_requestAccounts', []);
        const signer = await browserProvider.getSigner();
        const address = await signer.getAddress();
        
        setProvider(browserProvider);
        setAccount(address);
        
        // Get balance
        const balance = await browserProvider.getBalance(address);
        setBalance(formatEther(balance));
        
        // Store connection in localStorage
        localStorage.setItem('walletConnected', 'true');
        localStorage.setItem('walletAddress', address);
        
        console.log('Wallet connected:', address);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask to connect your wallet');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setBalance('0');
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
  };

  const signMessage = async (message: string): Promise<string> => {
    if (!provider) throw new Error('Wallet not connected');
    const signer = await provider.getSigner();
    return await signer.signMessage(message);
  };

  const sendTransaction = async (to: string, value: string): Promise<string> => {
    if (!provider) throw new Error('Wallet not connected');
    const signer = await provider.getSigner();
    const tx = await signer.sendTransaction({
      to,
      value: parseEther(value),
    });
    return tx.hash;
  };

  useEffect(() => {
    // Check if wallet was previously connected
    const wasConnected = localStorage.getItem('walletConnected');
    if (wasConnected && typeof window.ethereum !== 'undefined') {
      connectWallet();
    }

    // Listen for account changes
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectWallet();
        }
      });
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        isConnected: !!account,
        connectWallet,
        disconnectWallet,
        signMessage,
        sendTransaction,
        balance,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
