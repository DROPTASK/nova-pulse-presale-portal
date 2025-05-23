
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../contexts/Web3Context';
import { toast } from '@/hooks/use-toast';

const ReferralSection = () => {
  const { account, isConnected } = useWeb3();
  const [referralLink, setReferralLink] = useState('');
  const [referralStats, setReferralStats] = useState({
    referrals: 0,
    tokensEarned: 0,
  });

  useEffect(() => {
    if (isConnected && account) {
      const link = `${window.location.origin}/?ref=${account}`;
      setReferralLink(link);
      
      // Load referral stats from localStorage
      const stats = localStorage.getItem(`referral_${account}`);
      if (stats) {
        setReferralStats(JSON.parse(stats));
      } else {
        // Set some demo data
        const demoStats = {
          referrals: 9,
          tokensEarned: 13400,
        };
        setReferralStats(demoStats);
        localStorage.setItem(`referral_${account}`, JSON.stringify(demoStats));
      }
    }
  }, [account, isConnected]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Refer & Earn
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Earn 10% bonus tokens for every user you refer who buys from the presale.
            Share your unique link and grow your NOVA holdings!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Referral Link Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-cyan-400">
              Your Referral Link
            </h3>
            
            {isConnected ? (
              <div className="space-y-4">
                <div className="bg-black/50 border border-gray-600 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">Your unique link:</div>
                  <div className="text-sm text-cyan-400 break-all font-mono">
                    {referralLink}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={copyToClipboard}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Copy Link
                </motion.button>
                
                <div className="text-center">
                  <div className="text-sm text-gray-400">Share on:</div>
                  <div className="flex justify-center space-x-4 mt-2">
                    {['Twitter', 'Telegram', 'Discord'].map((platform, index) => (
                      <motion.button
                        key={platform}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition-all duration-300"
                      >
                        <span className="text-xs">{platform[0]}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">Connect your wallet to get your referral link</div>
                <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl">🔗</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-purple-400">
              Your Earnings
            </h3>
            
            {isConnected ? (
              <div className="space-y-6">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-cyan-400 mb-2"
                  >
                    {referralStats.tokensEarned.toLocaleString()}
                  </motion.div>
                  <div className="text-gray-400">NOVA Tokens Earned</div>
                </div>
                
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-purple-400 mb-2"
                  >
                    {referralStats.referrals}
                  </motion.div>
                  <div className="text-gray-400">Successful Referrals</div>
                </div>
                
                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-500/20">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">Estimated Value</div>
                    <div className="text-xl font-bold text-green-400">
                      ${(referralStats.tokensEarned * 0.004).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">Connect wallet to view your earnings</div>
                <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-white">How Referrals Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Share Your Link',
                description: 'Copy and share your unique referral link with friends and community',
                icon: '🔗',
              },
              {
                step: '2',
                title: 'Friend Purchases',
                description: 'When someone uses your link to buy NOVA tokens during presale',
                icon: '💳',
              },
              {
                step: '3',
                title: 'Earn Rewards',
                description: 'Receive 10% bonus tokens automatically sent to your wallet',
                icon: '🎁',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReferralSection;
