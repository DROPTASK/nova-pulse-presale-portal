
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I connect my wallet?',
      answer: 'Click the "Connect Wallet" button in the top right corner. We support MetaMask, WalletConnect, and other popular wallets. Make sure you\'re on the Ethereum network.',
    },
    {
      question: 'How are tokens sent to my wallet?',
      answer: 'Once you send ETH or USDT to our presale contract address, our smart contract automatically sends NOVA tokens to your wallet address within 5-10 minutes. No claim button needed!',
    },
    {
      question: 'How does the referral system work?',
      answer: 'Share your unique referral link with friends. When someone purchases NOVA tokens using your link, you earn 10% bonus tokens automatically sent to your wallet. The more you refer, the more you earn!',
    },
    {
      question: 'What wallets are supported?',
      answer: 'We support MetaMask, WalletConnect, Coinbase Wallet, Trust Wallet, and most other Ethereum-compatible wallets. Make sure your wallet is connected to the Ethereum mainnet.',
    },
    {
      question: 'Is there a minimum or maximum purchase amount?',
      answer: 'Yes, the minimum purchase is $10 worth of ETH or USDT, and the maximum is $50,000 per transaction. You can make multiple transactions if needed.',
    },
    {
      question: 'When will NOVA tokens be listed on exchanges?',
      answer: 'NOVA tokens are planned to be listed on major DEXs like Uniswap in Q3 2025, followed by centralized exchanges. Exact dates will be announced to the community.',
    },
    {
      question: 'Is the smart contract audited?',
      answer: 'Yes, our smart contracts have been audited by leading blockchain security firms. The audit reports are available in our documentation section.',
    },
    {
      question: 'What happens if I send funds from an exchange?',
      answer: 'Please only send funds from a wallet you control (like MetaMask). Sending from exchanges may result in loss of tokens as we cannot send tokens back to exchange addresses.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about the NovaChain presale
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => toggleFAQ(index)}
                className="w-full bg-white/5 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 rounded-lg p-6 text-left transition-all duration-300 focus:outline-none"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg
                      className="w-6 h-6 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white/5 border-l border-r border-b border-cyan-500/20 rounded-b-lg p-6 -mt-1">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border border-cyan-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Our team is here to help. Join our community or reach out directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500/20 border border-blue-500 text-blue-400 px-6 py-3 rounded-lg font-medium hover:bg-blue-500/30 transition-all duration-300"
              >
                Join Telegram
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-500/20 border border-purple-500 text-purple-400 px-6 py-3 rounded-lg font-medium hover:bg-purple-500/30 transition-all duration-300"
              >
                Join Discord
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
