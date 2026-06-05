import React, { useState } from 'react';
import { Row, Col, message } from 'antd';
import { HeartFilled, HeartOutlined, StarFilled } from '@ant-design/icons';
import { history } from 'umi';
import { getImg } from '../utils';

const HeartButton: React.FC<{ onClick: (e: React.MouseEvent) => void }> = ({ onClick }) => {
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    onClick(e);
    setActive(true);
  };

  return (
    <div 
      className="heart-icon" 
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {active || hovered ? <HeartFilled style={{ color: '#ff8e73' }} /> : <HeartOutlined style={{ color: '#ffa78a' }} />}
    </div>
  );
};

const RelatedProducts: React.FC = () => {
  const mockProducts = [
    { id: 1, name: 'Kem dưỡng ẩm Ceramide', price: '450,000đ', rating: 5.0, img: 'anh-san-pham-1.png' },
    { id: 2, name: 'Serum Vitamin C Brightening', price: '450,000đ', rating: 5.0, img: 'anh-san-pham-2.png' },
    { id: 3, name: 'Sữa rửa mặt trà xanh', price: '180,000đ', rating: 4.8, img: 'anh-san-pham-3.png' },
    { id: 4, name: 'Toner cấp ẩm Hyaluronic', price: '260,000đ', rating: 4.9, img: 'anh-san-pham-4.png' },
    { id: 5, name: 'Kem chống nắng SPF50+', price: '390,000đ', rating: 5.0, img: 'anh-san-pham-5.png' },
    { id: 6, name: 'Tinh chất phục hồi B5', price: '350,000đ', rating: 5.0, img: 'anh-san-pham-6.png' },
    { id: 7, name: 'Kem dưỡng mắt Peptide', price: '480,000đ', rating: 4.9, img: 'anh-san-pham-7.png' },
    { id: 8, name: 'Nước tẩy trang dịu nhẹ', price: '220,000đ', rating: 5.0, img: 'anh-san-pham-8.png' },
  ];

  const getDisplayImg = (imgName: string) => {
    if (!imgName) return '';
    if (imgName.startsWith('http://') || imgName.startsWith('https://')) {
      return imgName;
    }
    return getImg(imgName);
  };

  const handleAddToCart = (e: React.MouseEvent, p: typeof mockProducts[0]) => {
    e.stopPropagation();
    try {
      const stored = localStorage.getItem('lunaria_cart_items');
      const cartItems: any[] = stored ? JSON.parse(stored) : [];
      const priceNum = parseInt(p.price.replace(/[^0-9]/g, ''), 10);
      const existingIdx = cartItems.findIndex((item) => item.name === p.name);
      
      if (existingIdx > -1) {
        cartItems[existingIdx].qty += 1;
      } else {
        cartItems.push({
          id: Date.now(),
          name: p.name,
          variant: 'Mặc định',
          price: priceNum,
          qty: 1,
          img: p.img,
        });
      }
      
      localStorage.setItem('lunaria_cart_items', JSON.stringify(cartItems));
      window.dispatchEvent(new Event('cartUpdate'));
      message.success(`Đã thêm sản phẩm "${p.name}" vào giỏ hàng!`);
    } catch (err) {
      message.error('Lỗi khi thêm sản phẩm vào giỏ hàng');
    }
  };

  return (
    <div className="related-products-section">
      <div className="section-header">
        <h2>Sản phẩm <span>phù hợp với bạn</span></h2>
        <a href="#/products" className="view-more-link">Xem thêm</a>
      </div>

      <Row gutter={[24, 32]}>
        {mockProducts.map((p) => (
          <Col xs={24} sm={12} md={8} lg={6} key={p.id}>
            <div 
              className="shop2-product-card" 
              onClick={() => history.push(`/products/${p.id}`)}
            >
              <div className="card-top">
                <HeartButton onClick={(e) => handleAddToCart(e, p)} />
                <div className="rating-badge"><StarFilled /> {p.rating.toFixed(1)}</div>
              </div>
              <div className="card-img-container">
                <img src={getDisplayImg(p.img)} alt={p.name} />
              </div>
              <div className="card-info">
                <h4 className="prod-name">{p.name}</h4>
                <div className="prod-price">{p.price}</div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default RelatedProducts;