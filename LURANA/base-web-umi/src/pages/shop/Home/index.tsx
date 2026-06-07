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
<<<<<<< HEAD
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
=======
import './index.less';

const Home: React.FC = () => {
  return (
    <div className="home-page-master-container">
      {/* Nền tổng cục của cả trang đã được chuyển thành màu trắng mặc định (#ffffff) 
        để không làm ảnh hưởng hay đè lên ảnh nền riêng biệt của phần HeroSection.
      */}
>>>>>>> origin/main
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

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> origin/main
