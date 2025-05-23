
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../contexts/Web3Context';

const ProfileSection = () => {
  const { account, isConnected } = useWeb3();
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState({
    nickname: '',
    joinedDate: '',
    referrals: 0,
    tokensEarned: 0,
  });
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    if (isConnected && account) {
      // Load user profile
      const profile = localStorage.getItem(`profile_${account}`);
      if (profile) {
        setUserProfile(JSON.parse(profile));
      } else {
        const newProfile = {
          nickname: `User${account.slice(-4)}`,
          joinedDate: new Date().toISOString().split('T')[0],
          referrals: 9,
          tokensEarned: 13400,
        };
        setUserProfile(newProfile);
        localStorage.setItem(`profile_${account}`, JSON.stringify(newProfile));
      }

      // Load purchases
      const allPurchases = JSON.parse(localStorage.getItem('purchases') || '[]');
      const userPurchases = allPurchases.filter((p: any) => p.wallet === account);
      setPurchases(userPurchases);
    }
  }, [account, isConnected]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-400 bg-green-500/20';
      case 'Pending':
        return 'text-yellow-400 bg-yellow-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (!isConnected) {
    return (
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h3>
              <p className="text-gray-400 mb-6">
                Connect your wallet to view your profile and purchase history
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-cyan-500/20">
              {[
                { id: 'profile', label: 'My Profile', icon: '👤' },
                { id: 'history', label: 'Purchase History', icon: '📊' },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20"
            >
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">
                    {userProfile.nickname.charAt(0)}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{userProfile.nickname}</h3>
                <p className="text-gray-400">{formatAddress(account!)}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    label: 'Joined Date',
                    value: new Date(userProfile.joinedDate).toLocaleDateString(),
                    icon: '📅',
                    color: 'cyan',
                  },
                  {
                    label: 'Total Referrals',
                    value: userProfile.referrals.toString(),
                    icon: '👥',
                    color: 'purple',
                  },
                  {
                    label: 'Tokens Earned',
                    value: `${userProfile.tokensEarned.toLocaleString()} NOVA`,
                    icon: '🎁',
                    color: 'green',
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/30 rounded-xl p-6 border border-gray-600 hover:border-cyan-500/40 transition-all duration-300 text-center"
                  >
                    <div className="text-3xl mb-3">{stat.icon}</div>
                    <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Purchase History</h3>
              
              {purchases.length > 0 ? (
                <div className="space-y-4">
                  {purchases.map((purchase: any, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-black/30 rounded-xl p-6 border border-gray-600 hover:border-cyan-500/40 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="mb-4 md:mb-0">
                          <div className="text-lg font-semibold text-white mb-1">
                            {purchase.amount} {purchase.currency}
                          </div>
                          <div className="text-cyan-400 font-medium">
                            {purchase.tokensReceived} NOVA
                          </div>
                          <div className="text-sm text-gray-400">
                            {new Date(purchase.date).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(purchase.status)}`}>
                            {purchase.status}
                          </span>
                          {purchase.txHash && (
                            <div className="text-xs text-gray-400 mt-1">
                              TX: {purchase.txHash.slice(0, 10)}...
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-400 mb-2">No purchases yet</h4>
                  <p className="text-gray-500">Your purchase history will appear here</p>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProfileSection;
