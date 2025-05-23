
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';
import { toast } from '@/hooks/use-toast';

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export type NetworkChain = {
  id: string;
  name: string;
  symbol: string;
  rpcUrl: string;
  explorerUrl: string;
  tokens: ('NATIVE' | 'USDT')[];
  usdt?: string; // USDT contract address
};

export const SUPPORTED_NETWORKS: NetworkChain[] = [
  {
    id: '0x1',
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.infura.io/v3/your-infura-key',
    explorerUrl: 'https://etherscan.io',
    tokens: ['NATIVE', 'USDT'],
    usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
  },
  {
    id: '0x38',
    name: 'BNB Smart Chain',
    symbol: 'BNB',
    rpcUrl: 'https://bsc-dataseed.binance.org',
    explorerUrl: 'https://bscscan.com',
    tokens: ['NATIVE', 'USDT'],
    usdt: '0x55d398326f99059fF775485246999027B3197955'
  },
  {
    id: '0xa',
    name: 'Optimism',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.optimism.io',
    explorerUrl: 'https://optimistic.etherscan.io',
    tokens: ['USDT'],
    usdt: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58'
  },
  {
    id: '0x29a',
    name: 'TON',
    symbol: 'TON',
    rpcUrl: 'https://ton-rpc.gateway.pokt.network',
    explorerUrl: 'https://tonscan.org',
    tokens: ['USDT'],
    usdt: '0x76A797A59Ba2C17726896976B7B3747BfD1d220f'
  }
];

interface Web3ContextType {
  account: string | null;
  provider: BrowserProvider | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signMessage: (message: string) => Promise<string>;
  sendTransaction: (to: string, value: string) => Promise<string>;
  balance: string;
  currentNetwork: NetworkChain | null;
  switchNetwork: (chainId: string) => Promise<boolean>;
  getCurrentNetworkId: () => Promise<string | null>;
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
  const [currentNetwork, setCurrentNetwork] = useState<NetworkChain | null>(null);

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
        
        // Get current network
        const networkId = await getCurrentNetworkId();
        if (networkId) {
          const network = SUPPORTED_NETWORKS.find(n => n.id === networkId);
          if (network) {
            setCurrentNetwork(network);
          }
        }
        
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

  const getCurrentNetworkId = async (): Promise<string | null> => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        return chainId;
      } catch (error) {
        console.error('Error getting chainId:', error);
        return null;
      }
    }
    return null;
  };

  const switchNetwork = async (chainId: string): Promise<boolean> => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request network switch
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        });
        
        // Update current network
        const network = SUPPORTED_NETWORKS.find(n => n.id === chainId);
        if (network) {
          setCurrentNetwork(network);
          
          // Update balance after network switch
          if (account) {
            const browserProvider = new BrowserProvider(window.ethereum);
            const balance = await browserProvider.getBalance(account);
            setBalance(formatEther(balance));
          }
        }
        
        return true;
      } catch (error: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (error.code === 4902) {
          const network = SUPPORTED_NETWORKS.find(n => n.id === chainId);
          if (!network) return false;
          
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId,
                  chainName: network.name,
                  nativeCurrency: {
                    name: network.symbol,
                    symbol: network.symbol,
                    decimals: 18,
                  },
                  rpcUrls: [network.rpcUrl],
                  blockExplorerUrls: [network.explorerUrl],
                },
              ],
            });
            
            // Update current network
            setCurrentNetwork(network);
            return true;
          } catch (addError) {
            console.error('Error adding new network:', addError);
            return false;
          }
        }
        console.error('Error switching network:', error);
        return false;
      }
    }
    return false;
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setBalance('0');
    setCurrentNetwork(null);
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

      // Listen for network changes
      window.ethereum.on('chainChanged', (chainId: string) => {
        const network = SUPPORTED_NETWORKS.find(n => n.id === chainId);
        if (network) {
          setCurrentNetwork(network);
        } else {
          setCurrentNetwork(null);
        }
        connectWallet(); // Refresh account info for the new network
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
        currentNetwork,
        switchNetwork,
        getCurrentNetworkId,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
