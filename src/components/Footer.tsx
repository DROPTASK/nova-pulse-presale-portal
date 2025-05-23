
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-cyan-500/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">N</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                NovaChain
              </span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed mb-6">
              Revolutionizing cross-chain DeFi with our zero-layer protocol. 
              Join the future of decentralized finance today.
            </p>
            <div className="flex space-x-4">
              {[
                { name: 'Telegram', icon: '💬', color: 'blue' },
                { name: 'Twitter', icon: '🐦', color: 'cyan' },
                { name: 'Discord', icon: '👾', color: 'purple' },
                { name: 'GitHub', icon: '💻', color: 'gray' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-${social.color}-500/20 hover:border-${social.color}-500/40 hover:bg-${social.color}-500/10 transition-all duration-300`}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                'Whitepaper',
                'Audit Report',
                'Tokenomics',
                'Roadmap',
                'Team',
                'Blog',
              ].map((link, index) => (
                <motion.li key={index}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-cyan-400 transition-all duration-300 inline-block"
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
            <ul className="space-y-3">
              {[
                'Documentation',
                'Developer API',
                'Support Center',
                'Terms of Service',
                'Privacy Policy',
                'Cookie Policy',
              ].map((link, index) => (
                <motion.li key={index}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-cyan-400 transition-all duration-300 inline-block"
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contract Info */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-6 border border-cyan-500/20 mb-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            Presale Contract Address
          </h3>
          <div className="text-center">
            <div className="bg-black/50 rounded-lg p-4 border border-gray-600 inline-block">
              <div className="text-cyan-400 font-mono text-sm md:text-base break-all">
                0xeD469Cb8d74467aD1c2F566C2067856341e97528
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Always verify this address before sending funds
            </p>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 NovaChain. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm text-center md:text-right">
              <div className="mb-1">
                ⚠️ This is a live presale. Always verify contract addresses.
              </div>
              <div>
                Built with 💜 for the DeFi community
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
