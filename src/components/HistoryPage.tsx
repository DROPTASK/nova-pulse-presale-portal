
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useWeb3 } from '../contexts/Web3Context';

interface HistoryPageProps {
  onBack: () => void;
}

const HistoryPage = ({ onBack }: HistoryPageProps) => {
  const { isConnected } = useWeb3();
  
  const transactions = JSON.parse(localStorage.getItem('novaTransactions') || '[]');
  const CONTRACT_ADDRESS = '0xeD469Cb8d74467aD1c2F566C2067856341e97528';

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getExplorerLink = (hash: string, network: string) => {
    const explorers: { [key: string]: string } = {
      'ETH': 'https://etherscan.io/tx/',
      'BNB': 'https://bscscan.com/tx/',
      'POL': 'https://polygonscan.com/tx/'
    };
    return explorers[network] + hash;
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400">Please connect your wallet to view transaction history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              📜 Transaction History
            </h1>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Purchase Transactions</h2>
              <p className="text-gray-400 text-sm">
                All transactions sent to {CONTRACT_ADDRESS} will be fulfilled with NOVA tokens after launch
              </p>
            </div>

            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No transactions yet</p>
                <p className="text-gray-500 text-sm mt-2">
                  Your purchase history will appear here after you buy NOVA tokens
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((tx: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/30 p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">NOVA Token Purchase</h3>
                        <p className="text-gray-400 text-sm">{formatDate(tx.timestamp)}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-semibold">
                          {tx.novaAmount} NOVA
                        </div>
                        {tx.bonusAmount !== '0' && (
                          <div className="text-purple-400 text-sm">
                            +{tx.bonusAmount} Bonus
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Amount Paid</p>
                        <p className="font-medium">{tx.amount} {tx.token}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Network</p>
                        <p className="font-medium">{tx.token}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Status</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                          Pending Token Launch
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                      <div>
                        <p className="text-gray-400 text-sm">Transaction Hash</p>
                        <p className="font-mono text-sm">{tx.hash}</p>
                      </div>
                      <a
                        href={getExplorerLink(tx.hash, tx.token)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span className="text-sm">View on Explorer</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h3 className="font-semibold text-blue-400 mb-2">📋 Important Information</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• All transactions are recorded on the blockchain</li>
                <li>• NOVA tokens will be distributed after the official token launch</li>
                <li>• Presale bonuses are automatically calculated and included</li>
                <li>• Keep your wallet address safe to receive your tokens</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
