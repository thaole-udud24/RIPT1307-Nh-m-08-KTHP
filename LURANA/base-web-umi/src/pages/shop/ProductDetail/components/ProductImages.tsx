import React, { useState, useEffect } from 'react';
import { getImg } from '../utils';

interface ProductImagesProps {
  images?: string[];
}

const defaultImages = [
  'anh-san-pham-1.png',
  'anh-san-pham-2.png',
  'anh-san-pham-3.png',
  'anh-san-pham-4.png',
  'anh-san-pham-5.png',
];

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const imgList = images && images.length > 0 ? images : defaultImages;
  const [activeImg, setActiveImg] = useState<string>(imgList[0]);

  useEffect(() => {
    if (images && images.length > 0) {
      setActiveImg(images[0]);
    } else {
      setActiveImg(defaultImages[0]);
    }
  }, [images]);

  const getDisplayImg = (imgName: string) => {
    if (!imgName) return '';
    if (imgName.startsWith('http://') || imgName.startsWith('https://')) {
      return imgName;
    }
    return getImg(imgName);
  };

  return (
    <div className="product-images-container">
      {/* Main Large Image */}
      <div className="main-image-display">
        <img src={getDisplayImg(activeImg)} alt="Product Main" className="main-img" />
      </div>

      {/* Thumbnails */}
      <div className="thumbnail-list">
        {imgList.map((img, idx) => (
          <div
            key={idx}
            className={`thumbnail-item ${activeImg === img ? 'active' : ''}`}
            onClick={() => setActiveImg(img)}
          >
            <img src={getDisplayImg(img)} alt={`Thumbnail ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
