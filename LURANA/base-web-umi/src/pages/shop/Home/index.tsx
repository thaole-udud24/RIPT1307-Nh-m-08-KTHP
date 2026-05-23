import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EssenceSection from './components/EssenceSection';
import BestSellerSection from './components/BestSellerSection';
import CommitmentSection from './components/CommitmentSection';
import StatsSection from './components/StatsSection';
import QuoteSection from './components/QuoteSection';
import StepsSection from './components/StepsSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import { getImg } from './utils';
import './index.less';

const Home: React.FC = () => {
  const bgImg = getImg('bg-home.png');

  return (
    <div 
      className="home-container" 
      style={bgImg ? { 
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '1440px auto',
        backgroundPosition: 'top center',
        backgroundAttachment: 'fixed'
      } : {}}
    >
      <HeroSection />
      <AboutSection />
      <EssenceSection />
      <BestSellerSection />
      <CommitmentSection />
      <StatsSection />
      <QuoteSection />
      <StepsSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
};

export default Home;
