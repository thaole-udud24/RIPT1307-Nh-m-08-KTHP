import React from 'react';
import { getImg } from '../utils';

const GallerySection: React.FC = () => {
  return (
    <section className="gallery-section">
      <div className="section-title-wrapper">
        <h2>KHÁCH HÀNG VÀ LUNARIA</h2>
      </div>
      <div className="gallery-container">
        <div className="gallery-col col-large">
          <div className="gallery-item">
            <img src={getImg('anh4-gallery-1.png')} alt="Khách hàng và LUNARIA 1" />
          </div>
        </div>
        <div className="gallery-col col-middle">
          <div className="gallery-item">
            <img src={getImg('anh5-gallery-2.png')} alt="Khách hàng và LUNARIA 2" />
          </div>
          <div className="gallery-item">
            <img src={getImg('anh7-gallery-4.png')} alt="Khách hàng và LUNARIA 4" />
          </div>
        </div>
        <div className="gallery-col col-right">
          <div className="gallery-item">
            <img src={getImg('anh6-gallery-3.png')} alt="Khách hàng và LUNARIA 3" />
          </div>
          <div className="gallery-item">
            <img src={getImg('anh8-gallery-5.png')} alt="Khách hàng và LUNARIA 5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
