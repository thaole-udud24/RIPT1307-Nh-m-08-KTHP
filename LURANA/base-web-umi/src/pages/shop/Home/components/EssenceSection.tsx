import React from 'react';
import { Row, Col } from 'antd';
import { getImg } from '../utils';

const EssenceSection: React.FC = () => {
  return (
    <section className="essence-section">
      <div className="section-title-wrapper">
        <h2>Tinh Hoa Chăm Sóc Da</h2>
      </div>
      <Row gutter={[24, 24]} justify="center">
        {[
          { img: 'icon-lam-sach.png', title: 'Làm sạch da' },
          { img: 'icon-can-bang.png', title: 'Cân bằng da' },
          { img: 'icon-duong-am.png', title: 'Dưỡng ẩm' },
          { img: 'icon-chong-nang.png', title: 'Chống nắng' },
          { img: 'icon-phuc-hoi.png', title: 'Phục hồi' }
        ].map((item, idx) => (
          <Col xs={12} sm={8} md={4} key={idx}>
            <div className="essence-card">
              <div className="icon-wrapper">
                <img src={getImg(item.img)} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
              </div>
              <h4>{item.title}</h4>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default EssenceSection;
