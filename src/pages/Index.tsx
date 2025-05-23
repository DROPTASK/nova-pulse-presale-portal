
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import BuyForm from '../components/BuyForm';
import ReferralSection from '../components/ReferralSection';
import TokenomicsSection from '../components/TokenomicsSection';
import PresaleStats from '../components/PresaleStats';
import ProjectDescription from '../components/ProjectDescription';
import RoadmapSection from '../components/RoadmapSection';
import ProfileSection from '../components/ProfileSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { Web3Provider } from '../contexts/Web3Context';

const Index = () => {
  return (
    <Web3Provider>
      <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
        <AnimatedBackground />
        <Header />
        <HeroSection />
        <BuyForm />
        <PresaleStats />
        <ReferralSection />
        <TokenomicsSection />
        <ProjectDescription />
        <RoadmapSection />
        <ProfileSection />
        <FAQSection />
        <Footer />
      </div>
    </Web3Provider>
  );
};

export default Index;
