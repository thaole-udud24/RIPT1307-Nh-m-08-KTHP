import React from 'react';
import { Row, Col } from 'antd';
import { HeartOutlined, StarOutlined } from '@ant-design/icons';
import { getImg } from '../utils';

const BestSellerSection: React.FC = () => {
  return (
    <section className="best-seller-section">
      <div className="section-title-wrapper">
        <h2>Sản phẩm bán chạy</h2>
      </div>
      <div className="view-more">
        <a href="#">Xem thêm</a>
      </div>
      <Row gutter={[24, 24]}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Col xs={24} sm={12} md={6} key={item}>
            <div className="product-card">
              <HeartOutlined className="wishlist-icon" />
              {item === 1 && <div className="rating"><StarOutlined /> 5.0</div>}
              <img src={getImg(`anh-san-pham-${item}.png`)} alt={`Sản phẩm ${item}`} />
              <div className="product-name">Bye Bye Lines Foundation</div>
              <div className="product-price">320,000đ</div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default BestSellerSection;
