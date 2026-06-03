import React from 'react';
import { Row, Col } from 'antd';
import { HeartFilled, StarFilled } from '@ant-design/icons';
import { history } from 'umi';
import { getImg } from '../utils';

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
                <div className="heart-icon"><HeartFilled /></div>
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
