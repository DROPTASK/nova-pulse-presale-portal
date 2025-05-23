
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../contexts/Web3Context';
import { toast } from '@/hooks/use-toast';
import { NetworkChain, SUPPORTED_NETWORKS } from '../contexts/Web3Context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BuyForm = () => {
  const { account, isConnected, sendTransaction, currentNetwork, switchNetwork } = useWeb3();
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkChain | null>(null);
  const [amount, setAmount] = useState('');
  const [novaAmount, setNovaAmount] = useState('0');
  const [bonusAmount, setBonusAmount] = useState('0');
  const [isProcessing, setIsProcessing] = useState(false);

  const TOKEN_PRICE_USD = 0.004;
  const ETH_PRICE_USD = 2000; // Mock ETH price
  const BNB_PRICE_USD = 500; // Mock BNB price
  const POL_PRICE_USD = 1; // Mock POL price
  const CONTRACT_ADDRESS = '0xeD469Cb8d74467aD1c2F566C2067856341e97528';

  const getPresaleBonus = (tokenAmount: number) => {
    if (tokenAmount >= 1000000) return tokenAmount; // 1M tokens = 1M bonus
    if (tokenAmount >= 100000) return 100000; // 100K tokens = 100K bonus
    if (tokenAmount >= 10000) return 10000; // 10K tokens = 10K bonus
    if (tokenAmount >= 2500) return 2500; // 2.5K tokens = 2.5K bonus
    return 0;
  };

  useEffect(() => {
    // Initialize with current network if connected
    if (currentNetwork) {
      setSelectedNetwork(currentNetwork);
    } else {
      // Default to Ethereum if not connected
      setSelectedNetwork(SUPPORTED_NETWORKS[0]);
    }
  }, [currentNetwork]);

  useEffect(() => {
    if (amount && selectedNetwork) {
      let tokenPriceUSD = POL_PRICE_USD;
      
      if (selectedNetwork.symbol === 'ETH') {
        tokenPriceUSD = ETH_PRICE_USD;
      } else if (selectedNetwork.symbol === 'BNB') {
        tokenPriceUSD = BNB_PRICE_USD;
      }
      
      const usdValue = parseFloat(amount) * tokenPriceUSD;
      const tokens = usdValue / TOKEN_PRICE_USD;
      const bonus = getPresaleBonus(tokens);
      
      setNovaAmount(tokens.toLocaleString());
      setBonusAmount(bonus.toLocaleString());
    } else {
      setNovaAmount('0');
      setBonusAmount('0');
    }
  }, [amount, selectedNetwork]);

  const handleNetworkChange = async (networkId: string) => {
    const network = SUPPORTED_NETWORKS.find(n => n.id === networkId);
    if (network) {
      setSelectedNetwork(network);
      
      // If wallet is connected, switch the network
      if (isConnected) {
        const success = await switchNetwork(networkId);
        if (success) {
          toast({
            title: "Network switched",
            description: `You are now on ${network.name}`,
          });
        } else {
          toast({
            title: "Network switch failed",
            description: "Failed to switch the network in your wallet",
            variant: "destructive",
          });
        }
      }
    }
  };

  const handlePurchase = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (!selectedNetwork) {
      toast({
        title: "No network selected",
        description: "Please select a network",
        variant: "destructive",
      });
      return;
    }

    // Check if wallet is on the correct network
    if (currentNetwork?.id !== selectedNetwork.id) {
      toast({
        title: "Wrong network",
        description: `Please switch to ${selectedNetwork.name} in your wallet`,
        variant: "destructive",
      });
      await switchNetwork(selectedNetwork.id);
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    // Check minimum transaction for Polygon
    if (selectedNetwork.symbol === 'POL' && parseFloat(amount) < (selectedNetwork.minTransaction || 1)) {
      toast({
        title: "Minimum transaction",
        description: `Minimum transaction amount is ${selectedNetwork.minTransaction} ${selectedNetwork.symbol}`,
        variant: "destructive",
      });
      return;
    }

    let tokenPriceUSD = POL_PRICE_USD;
    if (selectedNetwork.symbol === 'ETH') {
      tokenPriceUSD = ETH_PRICE_USD;
    } else if (selectedNetwork.symbol === 'BNB') {
      tokenPriceUSD = BNB_PRICE_USD;
    }
    
    const usdValue = parseFloat(amount) * tokenPriceUSD;

    if (usdValue < 10) {
      toast({
        title: "Minimum purchase",
        description: "Minimum purchase amount is $10",
        variant: "destructive",
      });
      return;
    }

    if (usdValue > 50000) {
      toast({
        title: "Maximum purchase exceeded",
        description: "Maximum purchase amount is $50,000",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      console.log(`Sending ${amount} ${selectedNetwork.symbol} to ${CONTRACT_ADDRESS}`);
      const txHash = await sendTransaction(CONTRACT_ADDRESS, amount);
      
      // Store transaction in localStorage for history
      const transactions = JSON.parse(localStorage.getItem('novaTransactions') || '[]');
      transactions.push({
        hash: txHash,
        amount: amount,
        token: selectedNetwork.symbol,
        timestamp: Date.now(),
        novaAmount: novaAmount,
        bonusAmount: bonusAmount
      });
      localStorage.setItem('novaTransactions', JSON.stringify(transactions));
      
      toast({
        title: "Transaction sent!",
        description: `Transaction hash: ${txHash.slice(0, 10)}... NOVA tokens will be sent to your wallet after token launch.`,
      });

      setAmount('');
    } catch (error: any) {
      console.error('Transaction failed:', error);
      toast({
        title: "Transaction failed",
        description: error.message || "Please try again or check your wallet",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="buy-form" className="relative py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Buy NOVA Tokens
            </h2>

            <div className="space-y-6">
              {/* Network Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Network
                </label>
                <Select 
                  value={selectedNetwork?.id} 
                  onValueChange={handleNetworkChange}
                >
                  <SelectTrigger className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white">
                    <SelectValue placeholder="Select Network">
                      {selectedNetwork?.name || "Select Network"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border border-gray-600 text-white">
                    {SUPPORTED_NETWORKS.map((network) => (
                      <SelectItem 
                        key={network.id} 
                        value={network.id}
                        className="text-white hover:bg-gray-700"
                      >
                        {network.name} ({network.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount ({selectedNetwork?.symbol})
                  {selectedNetwork?.minTransaction && (
                    <span className="text-yellow-400 ml-2">
                      (Min: {selectedNetwork.minTransaction} {selectedNetwork.symbol})
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Enter ${selectedNetwork?.symbol} amount`}
                  className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-all duration-300"
                  step="0.001"
                  min="0"
                />
              </div>

              {/* Conversion Preview */}
              {amount && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-4 rounded-lg border border-cyan-500/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">
                        {novaAmount} NOVA
                      </div>
                      <div className="text-sm text-gray-400">
                        You will receive
                      </div>
                    </div>
                  </div>
                  
                  {bonusAmount !== '0' && (
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-400">
                          +{bonusAmount} NOVA BONUS! 🎉
                        </div>
                        <div className="text-sm text-gray-400">
                          Presale bonus tokens
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Buy Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePurchase}
                disabled={!isConnected || !amount || isProcessing || !selectedNetwork}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  !isConnected || !amount || isProcessing || !selectedNetwork
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                }`}
              >
                {isProcessing
                  ? 'Processing Transaction...'
                  : !isConnected
                  ? 'Connect Wallet First'
                  : !selectedNetwork
                  ? 'Select Network'
                  : `Buy NOVA with ${selectedNetwork.symbol}`}
              </motion.button>

              {/* Presale Bonus Info */}
              <div className="bg-black/30 rounded-lg p-4 border border-gray-600">
                <h4 className="text-lg font-semibold text-purple-400 mb-2">🎁 Presale Bonuses</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <div>• Buy 2,500+ tokens → Get 2,500 bonus tokens</div>
                  <div>• Buy 10,000+ tokens → Get 10,000 bonus tokens</div>
                  <div>• Buy 100,000+ tokens → Get 100,000 bonus tokens</div>
                  <div>• Buy 1,000,000+ tokens → Get 1,000,000 bonus tokens</div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="text-sm text-gray-400 space-y-2">
                <div className="flex justify-between">
                  <span>Minimum purchase:</span>
                  <span className="text-cyan-400">$10</span>
                </div>
                <div className="flex justify-between">
                  <span>Maximum purchase:</span>
                  <span className="text-cyan-400">$50,000</span>
                </div>
                <div className="text-center pt-4 border-t border-gray-600">
                  <p className="text-green-400">
                    ✅ Tokens will be sent after token launch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BuyForm;
