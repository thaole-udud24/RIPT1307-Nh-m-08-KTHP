import React from 'react';
import { Button } from 'antd';
import { Link } from 'umi';
import { getImg } from '../utils';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">Best</div>
        <h1>CLEAN FRESH</h1>
        <p>
          LUNARIA ra đời từ mong muốn mang đến một định nghĩa dịu dàng hơn về vẻ đẹp. 
          Chúng tôi tin rằng, làn da không cần bị che giấu, mà cần được lắng nghe, 
          chăm sóc và nâng niu đúng cách.
        </p>
        <Link to="/products">
          <Button type="primary" className="shop-now-btn">Khám phá ngay</Button>
        </Link>
      </div>
      <div className="hero-image">
        <div className="img-circle">
          <img src={getImg('anh1-hero.png')} alt="Ảnh 1: Hero Banner" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
