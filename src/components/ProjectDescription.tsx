
import React from 'react';
import { motion } from 'framer-motion';

const ProjectDescription = () => {
  const features = [
    {
      title: 'Zero-Layer Protocol',
      description: 'Revolutionary cross-chain infrastructure that enables seamless interoperability between all major blockchains without compromising security or speed.',
      icon: '⚡',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      title: 'Lightning Fast',
      description: 'Process over 100,000 transactions per second with sub-second finality, making DeFi accessible to mainstream users worldwide.',
      icon: '🚀',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      title: 'Military-Grade Security',
      description: 'Multi-signature validation, formal verification, and quantum-resistant cryptography ensure your assets are always protected.',
      icon: '🛡️',
      gradient: 'from-green-400 to-cyan-500',
    },
    {
      title: 'Developer Friendly',
      description: 'Simple SDKs, comprehensive documentation, and $10M developer fund to accelerate ecosystem growth and innovation.',
      icon: '👨‍💻',
      gradient: 'from-orange-400 to-red-500',
    },
  ];

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
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Why NovaChain?
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            NovaChain enables seamless interoperability between blockchains using our 
            zero-layer protocol — unlocking DeFi at scale. Built for speed, security, 
            and simplicity, we're creating the future of cross-chain finance.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 h-full">
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Specs */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-cyan-400">
            Technical Specifications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'TPS', value: '100,000+', description: 'Transactions per second' },
              { label: 'Finality', value: '<1s', description: 'Transaction confirmation' },
              { label: 'Chains', value: '50+', description: 'Supported blockchains' },
              { label: 'Uptime', value: '99.9%', description: 'Network availability' },
            ].map((spec, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-cyan-400 mb-1">{spec.value}</div>
                <div className="text-lg font-semibold text-white mb-1">{spec.label}</div>
                <div className="text-sm text-gray-400">{spec.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            Real-World Applications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Cross-Chain DEX',
                description: 'Trade any token on any blockchain with instant settlement and minimal fees.',
                icon: '🔄',
              },
              {
                title: 'Universal Wallet',
                description: 'Manage assets across all chains from a single, secure interface.',
                icon: '💼',
              },
              {
                title: 'DeFi Protocols',
                description: 'Access lending, staking, and yield farming across multiple ecosystems.',
                icon: '🌾',
              },
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h4 className="text-lg font-semibold text-purple-400 mb-2">{useCase.title}</h4>
                <p className="text-gray-400 text-sm">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDescription;
