
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../contexts/Web3Context';
import { toast } from '@/hooks/use-toast';

const BuyForm = () => {
  const { account, isConnected, sendTransaction } = useWeb3();
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [novaAmount, setNovaAmount] = useState('0');
  const [isProcessing, setIsProcessing] = useState(false);

  const TOKEN_PRICE_USD = 0.004;
  const ETH_PRICE_USD = 2000; // Mock ETH price
  const USDT_PRICE_USD = 1;
  const CONTRACT_ADDRESS = '0xeD469Cb8d74467aD1c2F566C2067856341e97528';

  useEffect(() => {
    if (amount) {
      const usdValue = selectedCurrency === 'ETH' 
        ? parseFloat(amount) * ETH_PRICE_USD 
        : parseFloat(amount) * USDT_PRICE_USD;
      const tokens = usdValue / TOKEN_PRICE_USD;
      setNovaAmount(tokens.toLocaleString());
    } else {
      setNovaAmount('0');
    }
  }, [amount, selectedCurrency]);

  const handlePurchase = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
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

    const usdValue = selectedCurrency === 'ETH' 
      ? parseFloat(amount) * ETH_PRICE_USD 
      : parseFloat(amount) * USDT_PRICE_USD;

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
      const txHash = await sendTransaction(CONTRACT_ADDRESS, amount);
      
      // Store purchase in localStorage
      const purchase = {
        id: Date.now(),
        date: new Date().toISOString(),
        amount: amount,
        currency: selectedCurrency,
        tokensReceived: novaAmount,
        status: 'Pending',
        txHash: txHash,
        wallet: account,
      };

      const existingPurchases = JSON.parse(localStorage.getItem('purchases') || '[]');
      existingPurchases.push(purchase);
      localStorage.setItem('purchases', JSON.stringify(existingPurchases));

      // Simulate token delivery after 30 seconds
      setTimeout(() => {
        const updatedPurchases = JSON.parse(localStorage.getItem('purchases') || '[]');
        const purchaseIndex = updatedPurchases.findIndex((p: any) => p.id === purchase.id);
        if (purchaseIndex !== -1) {
          updatedPurchases[purchaseIndex].status = 'Completed';
          localStorage.setItem('purchases', JSON.stringify(updatedPurchases));
        }
      }, 30000);

      toast({
        title: "Transaction sent!",
        description: "Your NOVA tokens will be sent automatically to your wallet",
      });

      setAmount('');
    } catch (error) {
      console.error('Transaction failed:', error);
      toast({
        title: "Transaction failed",
        description: "Please try again or check your wallet",
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
              {/* Currency Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Currency
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['ETH', 'USDT'].map((currency) => (
                    <motion.button
                      key={currency}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCurrency(currency)}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        selectedCurrency === currency
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                          : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-lg font-semibold">{currency}</div>
                      <div className="text-sm opacity-75">
                        {currency === 'ETH' ? '$2,000' : '$1.00'}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount ({selectedCurrency})
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Enter ${selectedCurrency} amount`}
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
                  className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-4 rounded-lg border border-cyan-500/20"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">
                      {novaAmount} NOVA
                    </div>
                    <div className="text-sm text-gray-400">
                      You will receive approximately
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Buy Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePurchase}
                disabled={!isConnected || !amount || isProcessing}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  !isConnected || !amount || isProcessing
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                }`}
              >
                {isProcessing
                  ? 'Processing...'
                  : !isConnected
                  ? 'Connect Wallet First'
                  : 'Buy NOVA Tokens'}
              </motion.button>

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
                    ✅ Once you send {selectedCurrency} to {CONTRACT_ADDRESS.slice(0, 10)}..., 
                    your tokens will be sent automatically to your wallet.
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
