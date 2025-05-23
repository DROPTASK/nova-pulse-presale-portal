
import React from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../contexts/Web3Context';

const WalletAssets = () => {
  const { account, isConnected, balance, currentNetwork } = useWeb3();

  if (!isConnected) {
    return null;
  }

  // Calculate USD value based on the current network
  const getUsdValue = () => {
    if (!currentNetwork) return 0;

    let tokenPrice = 0;
    if (currentNetwork.symbol === 'ETH') {
      tokenPrice = 2000; // Mock ETH price
    } else if (currentNetwork.symbol === 'BNB') {
      tokenPrice = 500; // Mock BNB price
    } else {
      tokenPrice = 1; // Default
    }

    return parseFloat(balance) * tokenPrice;
  };

  return (
    <section className="relative py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20">
            <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Wallet Assets
            </h3>
            
            <div className="space-y-4">
              <div className="bg-black/30 rounded-lg p-4 border border-gray-600">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Wallet Address:</span>
                  <span className="text-cyan-400 font-mono text-sm">
                    {account?.slice(0, 6)}...{account?.slice(-4)}
                  </span>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4 border border-gray-600">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">
                    {currentNetwork ? `${currentNetwork.symbol} Balance:` : 'Balance:'}
                  </span>
                  <span className="text-green-400 font-semibold">
                    {parseFloat(balance).toFixed(4)} {currentNetwork?.symbol || 'ETH'}
                  </span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-500/20">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">Estimated USD Value</div>
                  <div className="text-xl font-bold text-cyan-400">
                    ${getUsdValue().toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="bg-black/30 rounded-lg p-4 border border-gray-600">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Network:</span>
                  <span className="text-purple-400 font-semibold">
                    {currentNetwork?.name || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WalletAssets;
