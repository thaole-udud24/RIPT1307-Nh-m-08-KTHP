import React from 'react';
import { Row, Col } from 'antd';
import { getImg } from '../utils';

const StepsSection: React.FC = () => {
  return (
    <section className="steps-section">
      <div className="section-title-wrapper">
        <h2>CÁC BƯỚC CHĂM SÓC DA CÙNG LUNARIA</h2>
      </div>
      <Row gutter={[24, 24]} justify="center">
        {[
          { step: 'Bước 01', img: 'icon-step-1.png', title: 'Làm sạch', desc: 'Nhẹ nhàng loại bỏ bụi bẩn, giữ lại độ ẩm tự nhiên.' },
          { step: 'Bước 02', img: 'icon-step-2.png', title: 'Cấp ẩm', desc: 'Làm dịu da, chuẩn bị cho các bước dưỡng tiếp theo.' },
          { step: 'Bước 03', img: 'icon-step-3.png', title: 'Nuôi dưỡng', desc: 'Cấp ẩm và phục hồi làn da từ bên trong.' },
          { step: 'Bước 04', img: 'icon-step-4.png', title: 'Bảo vệ', desc: 'Cấp ẩm và phục hồi làn da từ bên trong.' }
        ].map((item, idx) => (
          <Col xs={12} sm={6} key={idx}>
            <div className="step-item">
              <div className="step-badge">{item.step}</div>
              <div className="step-icon">
                <img src={getImg(item.img)} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
              </div>
              <h5>{item.title}</h5>
              <p>{item.desc}</p>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default StepsSection;
