
import React from 'react';
import { motion } from 'framer-motion';

const TokenomicsSection = () => {
  const tokenomics = [
    { label: 'Presale', percentage: 30, color: '#00FFFF', amount: '300M' },
    { label: 'Liquidity', percentage: 20, color: '#8B5CF6', amount: '200M' },
    { label: 'Team (Locked)', percentage: 15, color: '#3B82F6', amount: '150M' },
    { label: 'Staking', percentage: 15, color: '#10B981', amount: '150M' },
    { label: 'Marketing', percentage: 10, color: '#F59E0B', amount: '100M' },
    { label: 'Ecosystem', percentage: 10, color: '#EF4444', amount: '100M' },
  ];

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
            Tokenomics
          </h2>
          <p className="text-xl text-gray-300">
            Total Supply: 1,000,000,000 NOVA
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Pie Chart */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-80 h-80 mx-auto relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                {tokenomics.map((item, index) => {
                  const previousPercentages = tokenomics.slice(0, index).reduce((sum, prev) => sum + prev.percentage, 0);
                  const circumference = 2 * Math.PI * 70;
                  const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                  const strokeDashoffset = -((previousPercentages / 100) * circumference);
                  
                  return (
                    <motion.circle
                      key={index}
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke={item.color}
                      strokeWidth="12"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      initial={{ strokeDasharray: `0 ${circumference}` }}
                      whileInView={{ strokeDasharray }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="hover:stroke-[14] transition-all duration-300"
                    />
                  );
                })}
              </svg>
              
              {/* Center Info */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">1B</div>
                  <div className="text-sm text-gray-400">NOVA</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Legend */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {tokenomics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-600 hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-white font-medium">{item.label}</span>
                </div>
                <div className="text-right">
                  <div className="text-cyan-400 font-bold">{item.percentage}%</div>
                  <div className="text-gray-400 text-sm">{item.amount}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Vesting Schedule',
              description: 'Team tokens locked for 12 months with 24-month linear vesting',
              icon: '🔒',
            },
            {
              title: 'Staking Rewards',
              description: 'Earn up to 25% APY by staking NOVA tokens in our platform',
              icon: '💰',
            },
            {
              title: 'Governance',
              description: 'NOVA holders can vote on protocol upgrades and treasury decisions',
              icon: '🗳️',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
