
import React from 'react';
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
import { Web3Provider } from '../contexts/Web3Context';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <Web3Provider>
        <AnimatedBackground />
        <Header />
        <HeroSection />
        <BuyForm />
        <WalletAssets />
        <PresaleStats />
        <TokenomicsSection />
        <ProjectDescription />
        <RoadmapSection />
        <FAQSection />
        <Footer />
      </Web3Provider>
    </div>
  );
};

export default Index;
