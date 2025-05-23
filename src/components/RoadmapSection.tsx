
import React from 'react';
import { motion } from 'framer-motion';

const RoadmapSection = () => {
  const roadmapItems = [
    {
      quarter: 'Q1 2025',
      title: 'Foundation & Research',
      items: [
        'Whitepaper Release',
        'Technical Documentation',
        'Smart Contract Audit',
        'Core Team Expansion',
      ],
      status: 'completed',
      icon: '📋',
    },
    {
      quarter: 'Q2 2025',
      title: 'Presale & Development',
      items: [
        'Token Presale Launch',
        'Alpha Testnet Deployment',
        'Cross-Chain Bridge MVP',
        'Community Building',
      ],
      status: 'current',
      icon: '🚀',
    },
    {
      quarter: 'Q3 2025',
      title: 'Beta & Partnerships',
      items: [
        'Beta Wallet Release',
        'DEX Listing (Uniswap)',
        'Strategic Partnerships',
        'Developer SDK Launch',
      ],
      status: 'upcoming',
      icon: '🤝',
    },
    {
      quarter: 'Q4 2025',
      title: 'Governance & Ecosystem',
      items: [
        'DAO Governance Launch',
        'NFT Marketplace',
        'Mobile App Release',
        'Mainnet Migration',
      ],
      status: 'upcoming',
      icon: '🏛️',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-400 to-emerald-500';
      case 'current':
        return 'from-cyan-400 to-blue-500';
      case 'upcoming':
        return 'from-purple-400 to-pink-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusBorder = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500/40';
      case 'current':
        return 'border-cyan-500/40';
      case 'upcoming':
        return 'border-purple-500/40';
      default:
        return 'border-gray-500/40';
    }
  };

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Roadmap
          </h2>
          <p className="text-xl text-gray-300">
            Our journey to revolutionize cross-chain DeFi
          </p>
        </motion.div>

        {/* Desktop Roadmap */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 opacity-30" />
            
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className="w-5/12">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border ${getStatusBorder(item.status)} hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getStatusColor(item.status)} rounded-xl flex items-center justify-center text-xl mr-4`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-lg font-bold text-cyan-400">{item.quarter}</div>
                        <div className="text-xl font-semibold text-white">{item.title}</div>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {item.items.map((task, taskIndex) => (
                        <motion.li
                          key={taskIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.2 + taskIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-gray-300"
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${getStatusColor(item.status)} rounded-full mr-3`} />
                          {task}
                        </motion.li>
                      ))}
                    </ul>
                    
                    <div className="mt-4">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        item.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        item.status === 'current' ? 'bg-cyan-500/20 text-cyan-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {item.status === 'completed' ? '✅ Completed' :
                         item.status === 'current' ? '🔄 In Progress' :
                         '📅 Upcoming'}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`w-6 h-6 bg-gradient-to-r ${getStatusColor(item.status)} rounded-full border-4 border-black`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Roadmap */}
        <div className="block lg:hidden space-y-6">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border ${getStatusBorder(item.status)}`}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${getStatusColor(item.status)} rounded-xl flex items-center justify-center text-xl mr-4`}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-lg font-bold text-cyan-400">{item.quarter}</div>
                  <div className="text-xl font-semibold text-white">{item.title}</div>
                </div>
              </div>
              
              <ul className="space-y-2 mb-4">
                {item.items.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-center text-gray-300">
                    <div className={`w-2 h-2 bg-gradient-to-r ${getStatusColor(item.status)} rounded-full mr-3`} />
                    {task}
                  </li>
                ))}
              </ul>
              
              <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                item.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                item.status === 'current' ? 'bg-cyan-500/20 text-cyan-400' :
                'bg-purple-500/20 text-purple-400'
              }`}>
                {item.status === 'completed' ? '✅ Completed' :
                 item.status === 'current' ? '🔄 In Progress' :
                 '📅 Upcoming'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
