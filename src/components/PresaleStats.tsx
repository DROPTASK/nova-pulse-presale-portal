
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PresaleStats = () => {
  const [stats, setStats] = useState({
    hardCap: 2000000,
    softCap: 500000,
    raised: 653452,
    participants: 1234,
    remainingTokens: 189234000,
  });

  const [animatedStats, setAnimatedStats] = useState({
    raised: 0,
    participants: 0,
    remainingTokens: 0,
  });

  useEffect(() => {
    // Animate numbers on mount
    const animateNumber = (key: keyof typeof animatedStats, target: number, duration: number = 2000) => {
      const start = 0;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (target - start) * progress);
        
        setAnimatedStats(prev => ({ ...prev, [key]: current }));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    };

    const timer = setTimeout(() => {
      animateNumber('raised', stats.raised, 2000);
      animateNumber('participants', stats.participants, 1500);
      animateNumber('remainingTokens', stats.remainingTokens, 2500);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const progressPercentage = (animatedStats.raised / stats.hardCap) * 100;

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
            Presale Statistics
          </h2>
          <p className="text-xl text-gray-300">Real-time presale progress</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-cyan-400">Progress</span>
              <span className="text-lg font-semibold text-purple-400">
                {progressPercentage.toFixed(1)}%
              </span>
            </div>
            
            <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 2, delay: 1 }}
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </motion.div>
            </div>
            
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>Soft Cap: ${stats.softCap.toLocaleString()}</span>
              <span>Hard Cap: ${stats.hardCap.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Raised',
              value: `$${animatedStats.raised.toLocaleString()}`,
              subtitle: `$${stats.hardCap.toLocaleString()} Goal`,
              icon: '💰',
              color: 'cyan',
            },
            {
              title: 'Participants',
              value: animatedStats.participants.toLocaleString(),
              subtitle: 'Active Investors',
              icon: '👥',
              color: 'purple',
            },
            {
              title: 'Remaining Tokens',
              value: `${animatedStats.remainingTokens.toLocaleString()}`,
              subtitle: 'NOVA Available',
              icon: '🚀',
              color: 'blue',
            },
            {
              title: 'Token Price',
              value: '$0.004',
              subtitle: 'Current Rate',
              icon: '💎',
              color: 'green',
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 0 20px rgba(${
                  stat.color === 'cyan' ? '0, 255, 255' :
                  stat.color === 'purple' ? '139, 92, 246' :
                  stat.color === 'blue' ? '59, 130, 246' :
                  '34, 197, 94'
                }, 0.3)`
              }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-cyan-400 mb-1">
                  {stat.title}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.subtitle}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Updates */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 font-medium">Live Updates Every 5 Seconds</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PresaleStats;
