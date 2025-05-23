
import React from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../contexts/Web3Context';

const Header = () => {
  const { account, isConnected, connectWallet, disconnectWallet } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">N</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            NovaChain
          </span>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isConnected ? disconnectWallet : connectWallet}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            isConnected
              ? 'bg-green-500/20 border border-green-500 text-green-400 hover:bg-green-500/30'
              : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
          }`}
        >
          {isConnected ? formatAddress(account!) : 'Connect Wallet'}
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
