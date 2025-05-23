
import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import BuyForm from '../components/BuyForm';
import TokenomicsSection from '../components/TokenomicsSection';
import PresaleStats from '../components/PresaleStats';
import ProjectDescription from '../components/ProjectDescription';
import RoadmapSection from '../components/RoadmapSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import WalletAssets from '../components/WalletAssets';
import AirdropPage from '../components/AirdropPage';
import HistoryPage from '../components/HistoryPage';

const Index = () => {
  const [currentView, setCurrentView] = useState<'main' | 'airdrop' | 'history'>('main');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'airdrop':
        return <AirdropPage onBack={() => setCurrentView('main')} />;
      case 'history':
        return <HistoryPage onBack={() => setCurrentView('main')} />;
      default:
        return (
          <>
            <HeroSection />
            <div className="flex justify-center gap-4 py-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('airdrop')}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                🪂 Airdrop
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('history')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                📜 History
              </motion.button>
            </div>
            <BuyForm />
            <WalletAssets />
            <PresaleStats />
            <TokenomicsSection />
            <ProjectDescription />
            <RoadmapSection />
            <FAQSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatedBackground />
      <Header />
      {renderCurrentView()}
      <Footer />
    </div>
  );
};

export default Index;
