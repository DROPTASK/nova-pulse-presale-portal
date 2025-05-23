
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            <motion.div
              animate={{ 
                rotateY: 360,
                rotateX: [0, 10, -10, 0],
              }}
              transition={{ 
                rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                rotateX: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-full h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full relative"
              style={{ 
                boxShadow: '0 0 60px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.2)' 
              }}
            >
              <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full animate-pulse" />
              <div className="absolute inset-4 bg-black rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  NOVA
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Join the{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            NovaChain
          </span>
          <br />
          Token Presale
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Own the future of cross-chain finance. Revolutionary DeFi protocol
          enabling seamless interoperability across all blockchains.
        </motion.p>

        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('buy-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-12 py-4 rounded-lg text-xl font-semibold hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">Buy Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { title: '1 NOVA', subtitle: '$0.004', desc: 'Current Price' },
            { title: '$653,452', subtitle: 'Raised', desc: 'Out of $2M Goal' },
            { title: '1,234', subtitle: 'Participants', desc: 'Join Now' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
            >
              <div className="text-2xl font-bold text-cyan-400">{stat.title}</div>
              <div className="text-lg text-purple-400">{stat.subtitle}</div>
              <div className="text-gray-400 text-sm">{stat.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
